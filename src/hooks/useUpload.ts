import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { FileFolderType, UploadType } from "../types/UploadType";

type UploadPayload = {
  file: File;
  type: UploadType;
  folderName: FileFolderType;
  oldFile?: string | null;
};

export const useUpload = () => {
  return useMutation({
    mutationFn: async (payload: UploadPayload) => {
      const formData = new FormData();
      formData.append("file", payload.file);
      formData.append("type", payload.type);
      formData.append("folderName", payload.folderName);
      if (payload.oldFile) {
        formData.append("oldFile", payload.oldFile);
      }
      const { data } = await api.post("/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data.data;
    },
  });
};
