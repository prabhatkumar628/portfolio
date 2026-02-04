import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import MessageModel from "../../../../../models/message.model";

export async function PATCH() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const response = await MessageModel.updateMany(
      { status: "new" },
      { status: "read", readAt: new Date() },
    );

    return NextResponse.json({
      success: true,
      message: "All new messages marked as read",
      data: {
        matched: response.matchedCount,
        modified: response.modifiedCount,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
