import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const { public_id, resource_type = "image" } = await request.json();

    if (!public_id || public_id === "empty") {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type,
    });

    return NextResponse.json({ success: result.result === "ok" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Signature failed";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
