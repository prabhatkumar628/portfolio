import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteOnCloudinary = async (
  public_id: string,
  resource_type?: string,
) => {
  try {
    const response = await cloudinary.uploader.destroy(public_id, {
      resource_type,invalidate:true,
    });
    return { success: response.result === "ok" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "faild to delete on cloudinary";
    throw new Error(message);
  }
};


