import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../../auth/[...nextauth]/authOptions";
import dbConnect from "../../../../../lib/dbConnect";
import mongoose from "mongoose";
import ProjectModel from "../../../../../models/project.model";
import { projectUpdateSchema } from "../../../../../schemas/admin.project.schema";
import { deleteOnCloudinary } from "../../../../../lib/upload/cloudinary";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const sesstion = await getServerSession(authOptions);
    if (!sesstion) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalide project Id" },
        { status: 400 },
      );
    }
    await dbConnect();

    const project = await ProjectModel.findById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Project fetched successfully",
        data: project,
      },
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
        { success: false, message: "Invalide experience Id" },
        { status: 400 },
      );
    }
    await dbConnect();

    const body = await request.json();
    const validate = projectUpdateSchema.safeParse(body);
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

    if (validate.data.title) {
      validate.data.slug = validate.data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const existingWithThisSlug = await ProjectModel.findOne({
        slug: validate.data.slug,
        _id: { $ne: id },
      });
      if (existingWithThisSlug) {
        return NextResponse.json(
          { success: false, message: "Project with this slug already exists" },
          { status: 400 },
        );
      }
    }

    const project = await ProjectModel.findByIdAndUpdate(
      id,
      { $set: validate.data },
      { new: true },
    );

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Project updated successfully", data: project },
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
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid project Id" },
        { status: 400 },
      );
    }
    await dbConnect();
    const findProject = await ProjectModel.findById(id);
    if (!findProject) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 },
      );
    }

    if (findProject && findProject.thumbnail.public_id) {
      await deleteOnCloudinary(findProject?.thumbnail.public_id, "image");
    }

    await ProjectModel.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Project deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
