import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../../auth/[...nextauth]/authOptions";
import dbConnect from "../../../../../lib/dbConnect";
import { updatePasswordSchema } from "../../../../../schemas/admin.profile.schema";
import bcrypt from "bcryptjs";
import UserModel from "../../../../../models/user.model";

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?._id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const body = await request.json();
    const validate = updatePasswordSchema.safeParse(body);
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
    await dbConnect();

    const { oldPassword, newPassword } = validate.data;
    const user = await UserModel.findById(session.user._id).select("+password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const isMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isMatched) {
      return NextResponse.json(
        { success: false, message: "Old password is incorrect" },
        { status: 400 },
      );
    }
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New password must be different from old password",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.findByIdAndUpdate(session.user._id, {
      $set: { password: hashedPassword },
      $inc: { tokenVersion: 1 }, 
    });

    return NextResponse.json(
      { success: true, message: "Password updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
