import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import SkillModel from "../../../../models/skill.model";
import { getServerSession } from "next-auth";
import { skillCreateSchema } from "../../../../schemas/admin.skill.schema";
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

    const limit = parseInt(searchParams.get("limit") || "30");
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    const filter: Record<
      string,
      string | Record<string, string | Record<string, string>>[]
    > = {};

    if (search) {
      filter.$or = [{ name: { $regex: search, $options: "i" } }];
    }
    if (category) filter.category = category;

    const skip = (page - 1) * limit;

    const skills = await SkillModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    const totalSkills = await SkillModel.countDocuments(filter);
    const totalPages = Math.ceil(totalSkills / limit);

    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json(
      {
        success: true,
        message: "skills fetched successfully",
        data: {
          skills,
          totalSkills,
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
    const validate = skillCreateSchema.safeParse(body);
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
    const experience = await SkillModel.create(validate.data);
    return NextResponse.json(
      {
        success: true,
        message: "Experience created successfully",
        data: experience,
      },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
