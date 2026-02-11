import { ControllerRenderProps } from "react-hook-form";
import { UpdateCompleteSettingsInput } from "../schemas/admin.settings";

export interface CloudinaryAsset {
  url: string;
  public_id: string;
}

export type UploadType = "image" | "video" | "document";

export type FileFolderType =
  | "siteLogo"
  | "siteFavicon"
  | "heroImage"
  | "ogImage"
  | "siteVideoLg"
  | "siteVideoSm"
  | "resume"
  | "skills";

export type UploadFieldType = ControllerRenderProps<UpdateCompleteSettingsInput, any>;
