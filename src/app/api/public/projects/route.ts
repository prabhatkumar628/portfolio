import { NextRequest, NextResponse } from "next/server";
import ProjectModel from "../../../../models/project.model";
import dbConnect from "../../../../lib/dbConnect";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const skip = (page - 1) * limit;

    // Build query
    const query: Record<
      string,
      string | boolean | Record<string, string | Record<string, string>>[]
    > = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    query.isPublished = true;
    if (category) {
      query.category = category;
    }

    const [projects, totalProjects] = await await Promise.all([
      ProjectModel.find(query)
        .sort({ featured: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ProjectModel.countDocuments(query),
    ]);

    // const slsls = await ProjectModel.find({})
    const totalPages = Math.ceil(totalProjects / limit);

    return NextResponse.json(
      {
        success: true,
        message: "Project fetched successfully",
        data: {
          projects,
          pagination: {
            currentPage: page,
            totalPages,
            totalProjects,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
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
