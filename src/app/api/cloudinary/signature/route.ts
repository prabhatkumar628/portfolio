import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/authOptions";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    // publicId,use_filename:false,unique_filename:false
    const {
      public_id,
      use_filename = false,
      unique_filename = false,
      folder = "portfolio",
      resource_type = "image",
    } = body;
    // resource_type can be: "image", "video", or "raw" (for PDFs)

    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder, public_id, use_filename, unique_filename },
      process.env.CLOUDINARY_API_SECRET!,
    );

    return NextResponse.json({
      success: true,
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Signature failed";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
