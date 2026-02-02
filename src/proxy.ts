import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  if (token && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (!token && pathname.startsWith("/admin")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && pathname.startsWith("/admin")) {
    if (token.role !== "admin") {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher:["/login","/admin/:path*"]
}
