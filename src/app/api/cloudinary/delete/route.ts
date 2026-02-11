import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { deleteOnCloudinary } from "../../../../lib/upload/cloudinary";
// import { deleteOnCloudinary } from "@/lib/cloudinary/delete";

export async function POST(request: NextRequest) {
  try {
    // 1. Check auth
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    // 2. Get data
    const { public_id, resource_type = "image" } = await request.json();

    // 3. Validate
    if (!public_id || public_id === "empty") {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // 4. Delete
    const result = await deleteOnCloudinary(public_id, resource_type);

    return NextResponse.json({
      success: result.success,
      message: result.success ? "Deleted" : "Failed",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}