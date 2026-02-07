import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import { updateSettingsSchema } from "../../../../schemas/admin.settings";
import SettingModel from "../../../../models/settings.model";

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
    const validate = updateSettingsSchema.safeParse(body);
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
