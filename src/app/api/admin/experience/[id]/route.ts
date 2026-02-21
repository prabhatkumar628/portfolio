import { getServerSession } from "next-auth";
import authOptions from "../../../auth/[...nextauth]/authOptions";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import mongoose from "mongoose";
import ExperienceModel from "../../../../../models/experience.model";
import { experienceSchema } from "../../../../../schemas/admin.experience.schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid experience ID" },
        { status: 400 },
      );
    }

    const experience = await ExperienceModel.findById(id);
    return NextResponse.json({
      success: true,
      message: "Experience feted successfully",
      data: experience,
    });
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
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid experience ID" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const validate = experienceSchema.safeParse(body);
    if (!validate.success) {
      const errors: string[] = [];
      for (const issue of validate.error.issues) {
        errors.push(issue.message);
      }
      return NextResponse.json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    const experience = await ExperienceModel.findByIdAndUpdate(
      id,
      { $set: validate.data },
      { new: true },
    );
    return NextResponse.json(
      {
        success: true,
        message: "Experience updated successfully",
        data: experience,
      },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid experience ID" },
        { status: 400 },
      );
    }

    const experience = await ExperienceModel.findByIdAndDelete(id);
    if (!experience) {
      return NextResponse.json(
        { success: false, message: "Experience not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, message: "Experience deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
