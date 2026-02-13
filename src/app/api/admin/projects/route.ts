import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/models/project.model";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import {
//   createProjectSchema,
//   updateProjectSchema,
//   trackClickSchema,
// } from "@/schemas/project.schema";
// import { getIpAddress, parseUserAgent, getGeoLocation } from "@/lib/analytics";
// import {  } from "../../../../schemas/admin.project.schema";
import authOptions from "../../auth/[...nextauth]/authOptions";
import { projectSchema } from "../../../../schemas/admin.project.schema";

// ═══════════════════════════════════════════════════════════
// CREATE PROJECT - POST /api/admin/projects
// ═══════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    await dbConnect();

    const body = await request.json();

    // Validate
    const result = projectSchema.safeParse(body);
    if (!result.success) {
      const errors: string[] = [];
      for (const issue of result.error.issues) {
        errors.push(issue.message);
      }
      return NextResponse.json(
        { success: false, message: "Validation error", errors },
        { status: 400 },
      );
    }

    // Generate slug from title
    const slug = result.data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check if slug exists
    const existingProject = await ProjectModel.findOne({ slug });
    if (existingProject) {
      return NextResponse.json(
        { success: false, message: "Project with this title already exists" },
        { status: 400 },
      );
    }

    // Create project
    const project = await ProjectModel.create({
      ...result.data,
      slug,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        data: project,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}

// ═══════════════════════════════════════════════════════════
// GET ALL PROJECTS - GET /api/admin/projects
// ═══════════════════════════════════════════════════════════

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const featured = searchParams.get("featured");
    const status = searchParams.get("status") || "";

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

    if (category) {
      query.category = category;
    }

    if (featured !== null && featured !== undefined) {
      query.featured = featured === "true";
    }

    if (status) {
      query.status = status;
    }

    // Pagination
    const skip = (page - 1) * limit;

    const [projects, totalProjects, publishedCount, featuredCount] =
      await Promise.all([
        ProjectModel.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        ProjectModel.countDocuments(query),
        ProjectModel.countDocuments({ isPublished: true }),
        ProjectModel.countDocuments({ featured: true }),
      ]);

    const totalPages = Math.ceil(totalProjects / limit);

    return NextResponse.json({
      success: true,
      data: {
        projects,
        publishedCount,
        featuredCount,
        pagination: {
          currentPage: page,
          totalPages,
          totalProjects,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Get projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
