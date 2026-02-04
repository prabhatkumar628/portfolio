import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import { getServerSession } from "next-auth";
import MessageModel from "../../../../../models/message.model";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession();
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
        { success: false, message: "Invalide message ID" },
        { status: 400 },
      );
    }

    const message = await MessageModel.findById(id);

    if (!message) {
      return NextResponse.json(
        { success: false, message: "Message not found" },
        { status: 404 },
      );
    }

    if (message.status === "new") {
      message.status = "read";
      message.readAt = new Date();
      await message.save();
    }

    return NextResponse.json({
      success: true,
      message: "Message fetched successfully",
      data: message,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
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
        { success: false, message: "Invalide message ID" },
        { status: 400 },
      );
    }

    await MessageModel.findByIdAndDelete(id);
    return NextResponse.json(
      { success: true, message: "Message deleted successfully" },
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
  { params }: { params: { id: string } },
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
        { success: false, message: "Invalide message ID" },
        { status: 400 },
      );
    }
    await dbConnect();
    const body = await request.json();
    const updatedMessage = await MessageModel.findByIdAndUpdate(
      id,
      { $set: body }, 
      { new: true }, 
    );

    if (!updatedMessage) {
      return NextResponse.json(
        { success: false, message: "Message not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Message updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
