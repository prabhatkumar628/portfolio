import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import MessageModel from "../../../../models/message.model";

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }
  await dbConnect();

  try {
    const searchParams = request.nextUrl.searchParams;

    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    // same filter logic
    const filter: Record<
      string,
      string | Record<string, string | Record<string, string>>[]
    > = {};

    if (status && status !== "all") filter.status = status;
    if (priority) filter.priority = priority;

    if (search) {
      filter.$or = [
        { email: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const result = await MessageModel.aggregate([
      {
        $facet: {
          // messages list
          messages: [
            { $match: filter },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],

          // total messages (same filter)
          totalMessages: [{ $match: filter }, { $count: "count" }],

          // unread
          unreadCount: [{ $match: { status: "new" } }, { $count: "count" }],

          // replied
          replyMessageCount: [
            { $match: { reply: { $exists: true, $ne: null } } },
            { $count: "count" },
          ],

          // spam
          spamCount: [{ $match: { isSpam: true } }, { $count: "count" }],
        },
      },
    ]);

    const data = result[0];

    const totalMessages = data.totalMessages[0]?.count ?? 0;
    const totalPages = Math.ceil(totalMessages / limit);

    return NextResponse.json({
      success: true,
      message: "Messages fetched successfully",
      data: {
        messages: data.messages,
        pagination: {
          totalPages,
          currentPage: page,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
          limit,
        },
        totalMessages,
        unreadCount: data.unreadCount[0]?.count ?? 0,
        replyMessageCount: data.replyMessageCount[0]?.count ?? 0,
        spanCount: data.spamCount[0]?.count ?? 0,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
