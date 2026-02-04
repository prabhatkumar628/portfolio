import dbConnect from "../../../../lib/dbConnect";
import MessageModel from "../../../../models/message.model";
import { messageSchema } from "../../../../schemas/message.schema";
import { UAParser } from "ua-parser-js";

export function getIpAddress(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const connectingIp = req.headers.get("x-vercel-forwarded-for");

  if (connectingIp) return connectingIp.split(",")[0].trim();
  if (forwarded) return forwarded.split(",")[0].trim();
  if (realIp) return realIp;

  return "127.0.0.1";
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const validate = messageSchema.safeParse(body);
    if (!validate.success) {
      const errors: string[] = [];
      for (const issue of validate.error.issues) {
        errors.push(issue.message);
      }
      return Response.json({
        success: false,
        message: "validation error",
        errors,
      });
    }

    const newMessage = new MessageModel(validate.data);
    const ip = getIpAddress(request);
    const userAgent = request.headers.get("user-agent");
    const ua = new UAParser(userAgent || "");
    let geo;
    const country =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      "Unknown";
    // if (ip) {
    //   const res = await fetch(`https://ipapi.co/${ip}/json/`);
    //   geo = await res.json();
    //   newMessage.city = geo.city || "";
    // }
    newMessage.ipAddress = ip;
    newMessage.userAgent = userAgent ?? "";
    newMessage.browser = ua.getBrowser().name ?? "";
    newMessage.os = ua.getOS().name ?? "";
    newMessage.device = ua.getDevice().type ?? "";
    newMessage.country = country;
    await newMessage.save();
    return Response.json(
      {
        success: true,
        message: "contact message send",
        data: validate.data,
      },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return Response.json({ success: false, message }, { status: 500 });
  }
}
