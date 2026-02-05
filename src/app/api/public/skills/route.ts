import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import SkillModel from "../../../../models/skill.model";

export async function GET() {
  try {
    await dbConnect();

    const skills = await SkillModel.find({}).sort({ createdAt: -1 }).lean();

    const data = {
      frontendData: skills.filter((s) => s.category === "frontend").slice(0, 6),
      backendData: skills.filter((s) => s.category === "backend").slice(0, 6),
      toolsData: skills.filter((s) => s.category === "tools").slice(0, 6),
    };

    return NextResponse.json({
      success: true,
      message: "skills fetched successfully",
      data,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}


