import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "../../../../models/user.model";
import authOptions from "../../auth/[...nextauth]/authOptions";
import dbConnect from "../../../../lib/dbConnect";
import { profileSchema } from "../../../../schemas/admin.profile.schema";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?._id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    await dbConnect();

    const user = await UserModel.findById(session.user._id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, message: "Current user fetched", data: user },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?._id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    await dbConnect();
    const body = await request.json();
    const validate = profileSchema.safeParse(body);
    if (!validate.success) {
      const errors: string[] = [];
      for (const issue of validate.error.issues) {
        errors.push(issue.message);
      }
      return NextResponse.json(
        { success: false, message: "Validation error", errors },
        { status: 400 },
      );
    }

    const user = await UserModel.findByIdAndUpdate(
      session.user._id,
      { $set: validate.data },
      { new: true },
    ).select("-password").lean()

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        data: user,
      },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
