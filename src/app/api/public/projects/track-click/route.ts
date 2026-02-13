import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/models/project.model";
import mongoose from "mongoose";
import { UAParser } from "ua-parser-js";
import { z } from "zod";

export function getIpAddress(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const connectingIp = req.headers.get("x-vercel-forwarded-for");
  if (connectingIp) return connectingIp.split(",")[0].trim();
  if (forwarded) return forwarded.split(",")[0].trim();
  if (realIp) return realIp;
  return "127.0.0.1";
}

const trackClickSchema = z.object({
  projectId: z.string(),
  linkType: z.enum([
    "liveDemoLink",
    "githubFrontendLink",
    "githubBackendLink",
    "githubMobileLink",
  ]),
});

// ═══════════════════════════════════════════════════════════
// TRACK CLICK - POST /api/public/projects/track-click
// ═══════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validate = trackClickSchema.safeParse(body);

    if (!validate.success) {
      const errors: string[] = [];
      for (const issue of validate.error.issues) {
        errors.push(issue.message);
      }
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors,
        },
        { status: 400 },
      );
    }

    const { projectId, linkType } = validate.data;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return NextResponse.json(
        { success: false, message: "Invalid project ID" },
        { status: 400 },
      );
    }

    await dbConnect();

    const project = await ProjectModel.findById(projectId);
    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 },
      );
    }

    // Collect analytics data
    const ipAddress = getIpAddress(request);
    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";

    const parsedUA = new UAParser(userAgent);
    const browser = parsedUA.getBrowser();
    const os = parsedUA.getOS();
    const device = parsedUA.getDevice();

    const country =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      "Unknown";

    const location = {
      country,
      city: request.headers.get("x-vercel-ip-city"), // "San Francisco"
      region: request.headers.get("x-vercel-ip-country-region"), // "California"
      latitude: request.headers.get("x-vercel-ip-latitude"), // "37.7749"
      longitude: request.headers.get("x-vercel-ip-longitude"), // "-122.4194"
      timezone: request.headers.get("x-vercel-ip-timezone"), // "America/Los_Angeles"
    };

    const clickData = {
      ipAddress,
      userAgent,
      browser: {
        name: browser.name || "Unknown",
        version: browser.version || "Unknown",
      },
      os: {
        name: os.name || "Unknown",
        version: os.version || "Unknown",
      },
      device: {
        type: device.type || "desktop",
        vendor: device.vendor || "Unknown",
        model: device.model || "Unknown",
      },
      location,
      referrer,
      timestamp: new Date(),
    };

    // console.log("Click Data:", clickData);

    // ✅ FIXED: Correct MongoDB $push with $each and $slice syntax
    const updateField = `clickStats.${linkType}`;
    console.log(updateField);

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      {
        // Increment counts
        $inc: {
          [`${updateField}.count`]: 1,
          "clickStats.totalClicks": 1,
        },
        // Push click data (keep last 100)
        $push: {
          [`${updateField}.clicks`]: {
            $each: [clickData],
            $position: 0, // ✅ Add at beginning
            $slice: 100, // ✅ Keep only first 100
          },
        },
      },
      {
        new: true,
        runValidators: false, // ✅ Skip validation for nested updates
      },
    );

    console.log("Updated Project:", updatedProject?.clickStats);

    return NextResponse.json({
      success: true,
      message: "Click tracked successfully",
      data: {
        totalClicks: updatedProject?.clickStats.totalClicks,
        linkClicks: updatedProject?.clickStats[linkType].count,
      },
    });
  } catch (error) {
    console.error("Track click error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════
// GET CLICK STATS - GET /api/admin/projects/[id]/stats
// ═══════════════════════════════════════════════════════════

// export async function GET(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json(
//         { error: "Invalid project ID" },
//         { status: 400 },
//       );
//     }

//     await dbConnect();

//     const project = await ProjectModel.findById(id).select("clickStats title");

//     if (!project) {
//       return NextResponse.json({ error: "Project not found" }, { status: 404 });
//     }

//     // Aggregate stats
//     const stats = {
//       totalClicks: project.clickStats.totalClicks,
//       liveDemo: {
//         count: project.clickStats.liveDemo.count,
//         recentClicks: project.clickStats.liveDemo.clicks.slice(-10), // Last 10
//       },
//       githubFrontend: {
//         count: project.clickStats.githubFrontend.count,
//         recentClicks: project.clickStats.githubFrontend.clicks.slice(-10),
//       },
//       githubBackend: {
//         count: project.clickStats.githubBackend.count,
//         recentClicks: project.clickStats.githubBackend.clicks.slice(-10),
//       },
//       githubMobile: {
//         count: project.clickStats.githubMobile.count,
//         recentClicks: project.clickStats.githubMobile.clicks.slice(-10),
//       },
//     };

//     return NextResponse.json({
//       success: true,
//       data: {
//         projectTitle: project.title,
//         stats,
//       },
//     });
//   } catch (error) {
//     console.error("Get click stats error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch click stats" },
//       { status: 500 },
//     );
//   }
// }
