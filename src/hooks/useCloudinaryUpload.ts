import { useState } from "react";
import { toast } from "sonner";
import { FileFolderType, UploadType } from "../types/UploadType";
import { api } from "../lib/axios";

export interface CloudinaryAsset {
  url: string;
  public_id: string;
}

export const useCloudinaryUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressKey, setProgressKey] = useState<FileFolderType>("heroImage");

  const uploadToCloudinary = async ({
    file,
    type,
    folderName,
  }: {
    file: File;
    type: UploadType;
    folderName: FileFolderType;
  }): Promise<CloudinaryAsset> => {
    setIsUploading(true);
    setProgress(0);
    setProgressKey(folderName);
    try {
      const resourceType = type === "document" ? "raw" : type;
      const originalName = file.name
        .split(".")
        .slice(0, -1)
        .join(".")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      const publicId = `${Date.now()}---${originalName}`;
      // 2. Get signature
      const { data } = await api.post("/cloudinary/signature", {
        folder: `portfolio/${folderName}`,
        resource_type: resourceType,
        //these thre field fron custome name on cloudinary other waise they give randam name...
        public_id: publicId,
        use_filename: false,
        unique_filename: false,
      });
      const { signature, timestamp, cloudName, apiKey, folder } = data;

      // 3. Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp.toString());
      formData.append("api_key", apiKey);
      formData.append("folder", folder);
      //these thre field fron custome name on cloudinary other waise they give randam name...
      formData.append("public_id", publicId);
      formData.append("use_filename", "false");
      formData.append("unique_filename", "false");

      const uploadPromise = new Promise<CloudinaryAsset>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            resolve({ url: data.secure_url, public_id: data.public_id });
          } else {
            reject(new Error("Upload failed"));
          }
        });

        xhr.addEventListener("error", () => reject(new Error("Upload failed")));

        xhr.open(
          "POST",
          `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        );
        xhr.send(formData);
      });

      const result = await uploadPromise;

      const payload = {
        [folderName]: {
          url: result.url,
          public_id: result.public_id,
        },
      };
      await api.patch("/admin/settings", payload);

      toast.success("Uploaded successfully!");
      return result;
    } catch (error) {
      toast.error("Upload failed");
      throw error;
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return { uploadToCloudinary, isUploading, progress, progressKey };
};
