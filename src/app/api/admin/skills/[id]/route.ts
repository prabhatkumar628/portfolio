import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import mongoose from "mongoose";
import SkillModel from "../../../../../models/skill.model";
// import { skillUpdateSchema } from "../../../../../schemas/admin.skill.schema";
import authOptions from "../../../auth/[...nextauth]/authOptions";
import { skillCreateSchema } from "../../../../../schemas/admin.skill.schema";
import { deleteOnCloudinary } from "../../../../../lib/upload/cloudinary";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json(
    //     { success: false, message: "Unauthorized" },
    //     { status: 401 },
    //   );
    // }
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid skill ID" },
        { status: 400 },
      );
    }
    const skill = await SkillModel.findById(id);
    return NextResponse.json(
      { success: true, message: "Skill fetched successfully", data: skill },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json(
    //     { success: false, message: "Unauthorized" },
    //     { status: 401 },
    //   );
    // }
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid skill ID" },
        { status: 400 },
      );
    }
    const body = await request.json();
    const validate = skillCreateSchema.safeParse(body);
    if (!validate.success) {
      const errors: string[] = [];
      for (const issue of validate.error.issues) {
        errors.push(issue.message);
      }
      return NextResponse.json(
        { success: false, message: "Valiation failed" },
        { status: 400 },
      );
    }

    const existingSill = await SkillModel.findById(id);

    if (validate.data.image && existingSill?.image?.public_id) {
      await deleteOnCloudinary(existingSill.image.public_id);
    }
    
    const skill = await SkillModel.findByIdAndUpdate(
      id,
      { $set: validate.data },
      { new: true },
    );
    return NextResponse.json(
      { success: true, message: "Skill updated successfully", data: skill },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
