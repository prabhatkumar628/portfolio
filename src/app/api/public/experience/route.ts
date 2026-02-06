import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import ExperienceModel from "../../../../models/experience.model";

export async function GET() {
  try {
    await dbConnect();
    const experiences = await ExperienceModel.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        message: "Experience fetched successfully",
        data: experiences,
      },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
