import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/models/project.model";
import { trackClickSchema } from "@/schemas/project.schema";
import { getIpAddress, parseUserAgent, getGeoLocation } from "@/lib/analytics";
import mongoose from "mongoose";

// ═══════════════════════════════════════════════════════════
// TRACK CLICK - POST /api/public/projects/track-click
// ═══════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate
    const result = trackClickSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { projectId, linkType } = result.data;

    // Validate project ID
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    // Find project
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Collect analytics data
    const ipAddress = getIpAddress(request);
    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";

    const parsedUA = parseUserAgent(userAgent);
    const location = getGeoLocation(ipAddress);

    const clickData = {
      ipAddress,
      userAgent,
      browser: parsedUA.browser,
      os: parsedUA.os,
      device: parsedUA.device,
      location,
      referrer,
      timestamp: new Date(),
    };

    // Update click stats based on link type
    const updateField = `clickStats.${linkType}`;

    await ProjectModel.findByIdAndUpdate(
      projectId,
      {
        $inc: {
          [`${updateField}.count`]: 1,
          "clickStats.totalClicks": 1,
        },
        $push: {
          [`${updateField}.clicks`]: {
            $each: [clickData],
            $slice: -100, // Keep last 100 clicks per link type
          },
        },
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Click tracked successfully",
    });
  } catch (error) {
    console.error("Track click error:", error);
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 }
    );
  }
}

// ═══════════════════════════════════════════════════════════
// GET CLICK STATS - GET /api/admin/projects/[id]/stats
// ═══════════════════════════════════════════════════════════

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    await dbConnect();

    const project = await ProjectModel.findById(id).select("clickStats title");

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Aggregate stats
    const stats = {
      totalClicks: project.clickStats.totalClicks,
      liveDemo: {
        count: project.clickStats.liveDemo.count,
        recentClicks: project.clickStats.liveDemo.clicks.slice(-10), // Last 10
      },
      githubFrontend: {
        count: project.clickStats.githubFrontend.count,
        recentClicks: project.clickStats.githubFrontend.clicks.slice(-10),
      },
      githubBackend: {
        count: project.clickStats.githubBackend.count,
        recentClicks: project.clickStats.githubBackend.clicks.slice(-10),
      },
      githubMobile: {
        count: project.clickStats.githubMobile.count,
        recentClicks: project.clickStats.githubMobile.clicks.slice(-10),
      },
    };

    return NextResponse.json({
      success: true,
      data: {
        projectTitle: project.title,
        stats,
      },
    });
  } catch (error) {
    console.error("Get click stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch click stats" },
      { status: 500 }
    );
  }
}