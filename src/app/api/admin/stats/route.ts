import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import MessageModel from "../../../../models/message.model";
import ProjectModel from "../../../../models/project.model";

export async function GET() {
  try {
    await dbConnect();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const startOfCurrentMonth = startOfMonth;

    const [
      unreadMessageCount,
      totalMessageCount,
      recentMessages,
      totalProjectsCount,
      recentProjects,
      thisMonthProjectsCount,

      // NEW 1: total clicks sum
      totalClicksResult,

      // NEW 2: this month clicks
      thisMonthClicksResult,

      // NEW 3: last month clicks
      lastMonthClicksResult,
    ] = await Promise.all([
      MessageModel.countDocuments({ status: "new" }),
      MessageModel.countDocuments(),
      MessageModel.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .select("name email message createdAt") // ✅ lightweight
        .lean(),
      ProjectModel.countDocuments(),
      ProjectModel.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .select("title slug isPublished createdAt") // ✅ lightweight
        .lean(),
      ProjectModel.countDocuments({
        createdAt: {
          $gte: startOfMonth,
          $lt: startOfNextMonth,
        },
      }),

      // ✅ TOTAL clicks sum
      ProjectModel.aggregate([
        {
          $group: {
            _id: null,
            totalClicks: {
              $sum: "$clickStats.totalClicks",
            },
          },
        },
      ]),

      // ✅ THIS month clicks
      ProjectModel.aggregate([
        {
          $project: {
            clicks: {
              $filter: {
                input: {
                  $concatArrays: [
                    "$clickStats.liveDemoLink.clicks",
                    "$clickStats.githubFrontendLink.clicks",
                    "$clickStats.githubBackendLink.clicks",
                    "$clickStats.githubMobileLink.clicks",
                  ],
                },
                as: "click",
                cond: {
                  $and: [
                    { $gte: ["$$click.timestamp", startOfCurrentMonth] },
                    { $lt: ["$$click.timestamp", startOfNextMonth] },
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            count: { $size: "$clicks" },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$count" },
          },
        },
      ]),

      // ✅ LAST month clicks
      ProjectModel.aggregate([
        {
          $project: {
            clicks: {
              $filter: {
                input: {
                  $concatArrays: [
                    "$clickStats.liveDemoLink.clicks",
                    "$clickStats.githubFrontendLink.clicks",
                    "$clickStats.githubBackendLink.clicks",
                    "$clickStats.githubMobileLink.clicks",
                  ],
                },
                as: "click",
                cond: {
                  $and: [
                    { $gte: ["$$click.timestamp", startOfLastMonth] },
                    { $lt: ["$$click.timestamp", startOfCurrentMonth] },
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            count: { $size: "$clicks" },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$count" },
          },
        },
      ]),
    ]);

    const totalClicks = totalClicksResult[0]?.totalClicks || 0;

    const thisMonthClicks = thisMonthClicksResult[0]?.total || 0;

    const lastMonthClicks = lastMonthClicksResult[0]?.total || 0;

    return NextResponse.json(
      {
        success: true,
        data: {
          unreadMessageCount,
          totalMessageCount,
          totalProjectsCount,
          thisMonthProjectsCount,
          recentMessages,
          recentProjects,
          totalClicks,
          thisMonthClicks,
          lastMonthClicks,
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
