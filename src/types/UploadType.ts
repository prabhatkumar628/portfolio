import { ControllerRenderProps } from "react-hook-form";
import { PersonalDetailsFormValues } from "../schemas/admin.settings.personal.details";

export type UploadType = "image" | "video" | "document";
export const FILE_FOLDERS = [
  "siteLogo",
  "siteFavicon",
  "heroImage",
  "ogImage",
  "siteVideoLg",
  "siteVideoSm",
  "resume",
] as const;

export const ROOT_FOLDER: Record<UploadType, string> = {
  image: "images",
  video: "videos",
  document: "documents",
};

export type FileFolderType = (typeof FILE_FOLDERS)[number];
export type FieldType = ControllerRenderProps<PersonalDetailsFormValues, any>;

