import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import SettingModel from "../../../../models/settings.model";
import { updateCompleteSettingsSchema } from "../../../../schemas/admin.settings";
import { deleteOnCloudinary } from "../../../../lib/upload/cloudinary";

export async function PATCH(request: NextRequest) {
  try {
    // const session = await getServerSession();
    // if (!session) {
    //   return NextResponse.json(
    //     { success: false, message: "Unauthorized" },
    //     { status: 401 },
    //   );
    // }

    await dbConnect();
    const body = await request.json();
    const validate = updateCompleteSettingsSchema.safeParse(body);
    if (!validate.success) {
      const errors: string[] = [];
      for (const issue of validate.error.issues) {
        errors.push(issue.message);
      }
      return NextResponse.json(
        { success: false, message: "Validation error", errors },
        { status: 400 },
      );
    }

    const oldSettings = await SettingModel.findOne({ key: "global" });
    if (!oldSettings) {
      return NextResponse.json(
        { success: false, message: "Settings not found" },
        { status: 404 },
      );
    }

    if (validate.data.siteLogo) {
      await deleteOnCloudinary(oldSettings.siteLogo.public_id);
    }
    if (validate.data.siteFavicon) {
      await deleteOnCloudinary(oldSettings.siteFavicon.public_id);
    }
    if (validate.data.siteVideoLg) {
      await deleteOnCloudinary(oldSettings.siteVideoLg.public_id);
    }
    if (validate.data.siteVideoSm) {
      await deleteOnCloudinary(oldSettings.siteVideoSm.public_id);
    }
    if (validate.data.ogImage) {
      await deleteOnCloudinary(oldSettings.ogImage.public_id);
    }
    if (validate.data.resume) {
      await deleteOnCloudinary(oldSettings.resume.public_id, "raw");
    }
    if (validate.data.heroImage) {
      await deleteOnCloudinary(oldSettings.heroImage.public_id);
    }

    const settings = await SettingModel.findOneAndUpdate(
      { key: "global" },
      { $set: validate.data },
      { new: true, upsert: true },
    );
    return NextResponse.json(
      {
        success: true,
        message: "Settings updated successfully",
        data: settings,
      },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
