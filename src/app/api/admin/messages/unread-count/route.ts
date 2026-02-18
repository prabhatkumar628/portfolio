import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import MessageModel from "../../../../../models/message.model";

export async function GET() {
  try {
    await dbConnect();
    const [unreadCount, totalCount] = await Promise.all([
      MessageModel.countDocuments({ status: "new" }),
      MessageModel.countDocuments(),
    ]);
    return NextResponse.json(
      {
        success: true,
        data: {
          unreadCount: unreadCount ? unreadCount : 0,
          totalCount: totalCount ? totalCount : 0,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
