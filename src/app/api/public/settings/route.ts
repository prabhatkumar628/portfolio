import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import SettingModel from "../../../../models/settings.model";

export async function GET() {
  try {
    await dbConnect();
    const settings = await SettingModel.findOne({ key: "global" });
    if (!settings) {
      return NextResponse.json(
        { success: false, message: "Settings not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Settings fetched successfully",
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
