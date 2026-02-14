import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink, readdir } from "fs/promises";
import fs from "fs";
import path from "path";
import { FileFolderType, UploadType } from "../../../../types/UploadType";
import { getServerSession } from "next-auth";

export const FILE_FOLDERS = [
  "siteLogo",
  "siteFavicon",
  "heroImage",
  "ogImage",
  "siteVideoLg",
  "siteVideoSm",
  "resume",
  "skills",
  "projects"
] as const;

export const ROOT_FOLDER: Record<UploadType, string> = {
  image: "images",
  video: "videos",
  document: "documents",
};

/* ---------- SAFE DELETE FILE ---------- */
const deleteFileSafe = async (fileUrl: string) => {
  try {
    if (!fileUrl.startsWith("/uploads/")) return;
    const absPath = path.join(process.cwd(), "public", fileUrl);
    if (fs.existsSync(absPath)) {
      await unlink(absPath);
    }
  } catch (err) {
    console.error("Delete file failed:", err);
  }
};

/* ---------- CLEAR FIELD FOLDER ---------- */
const clearFieldFolder = async (type: UploadType, folderName: string) => {
  try {
    const dirPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      ROOT_FOLDER[type],
      folderName,
    );

    if (!fs.existsSync(dirPath)) return;
    const files = await readdir(dirPath);
    await Promise.all(
      files.map((f) => unlink(path.join(dirPath, f)).catch(() => {})),
    );
  } catch (err) {
    console.error("Clear folder failed:", err);
  }
};

/* ---------- POST API ---------- */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as UploadType;
    const folderName = formData.get("folderName") as FileFolderType;
    const oldFile = formData.get("oldFile") as string | null;

    if (!file || !type || !folderName) {
      return NextResponse.json(
        { success: false, message: "file, type, folderName required" },
        { status: 400 },
      );
    }

    /* ---------- MIME VALIDATION ---------- */
    const mimeMap: Record<UploadType, string[]> = {
      image: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
      video: ["video/mp4", "video/webm", "video/ogg"],
      document: ["application/pdf"],
    };

    if (!mimeMap[type].includes(file.type)) {
      throw new Error(`Invalid ${type} file`);
    }

    /* ---------- SIZE LIMIT ---------- */
    const sizeLimit: Record<UploadType, number> = {
      image: 5 * 1024 * 1024,
      video: 10 * 1024 * 1024,
      document: 5 * 1024 * 1024,
    };

    if (file.size > sizeLimit[type]) {
      throw new Error(`${type} max ${sizeLimit[type] / 1024 / 1024}MB allowed`);
    }

    const isSingle = FILE_FOLDERS.includes(folderName);

    /* ---------- CLEAR ONLY SINGLE FILE FOLDER ---------- */
    if (isSingle && !oldFile) {
      await clearFieldFolder(type, folderName);
    }

    /* ---------- SAVE FILE ---------- */
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${Date.now()}-${safeName}`;

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      ROOT_FOLDER[type],
      folderName,
    );

    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    await writeFile(path.join(uploadDir, filename), Buffer.from(bytes));

    /* ---------- DELETE OLD FILE AFTER SUCCESS ---------- */
    if (oldFile) {
      await deleteFileSafe(oldFile);
    }

    /* ---------- PUBLIC URL ---------- */
    const url = `/uploads/${ROOT_FOLDER[type]}/${folderName}/${filename}`;

    return NextResponse.json({ success: true, data: { url } }, { status: 201 });
  } catch (error) {
    // console.log(error);
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
