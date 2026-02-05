import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import { getServerSession } from "next-auth";
import ExperienceModel from "../../../../models/experience.model";
import { experienceCreateSchema } from "../../../../schemas/admin.experience.schema";
import authOptions from "../../auth/[...nextauth]/authOptions";

export async function GET(request: NextRequest) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json(
    //     { success: false, message: "Unauthorized" },
    //     { status: 401 },
    //   );
    // }
    await dbConnect();
    const searchParams = request.nextUrl.searchParams;

    const limit = parseInt(searchParams.get("limit") || "6");
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search");

    const filter: Record<
      string,
      string | Record<string, string | Record<string, string>>[]
    > = {};

    if (search) {
      filter.$or = [
        { company: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const experiences = await ExperienceModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    const totalExperiences = await ExperienceModel.countDocuments(filter);
    const totalPages = Math.ceil(totalExperiences / limit);

    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json(
      {
        success: true,
        message: "Experience fetched successfully",
        data: {
          experiences,
          totalExperiences,
          pagination: {
            totalPages,
            currentPage: page,
            hasNextPage,
            hasPrevPage,
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

export async function POST(request: NextRequest) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json(
    //     { success: false, message: "Unauthorized" },
    //     { status: 401 },
    //   );
    // }
    await dbConnect();
    const body = await request.json();
    const validate = experienceCreateSchema.safeParse(body);
    if (!validate.success) {
      const errors: string[] = [];
      for (const issue of validate.error.issues) {
        errors.push(issue.message);
      }
      return NextResponse.json(
        { success: false, message: "Valiation failed", errors },
        { status: 400 },
      );
    }
    const skill = await ExperienceModel.create(validate.data);
    return NextResponse.json(
      { success: true, message: "skill created successfully", data: skill },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
