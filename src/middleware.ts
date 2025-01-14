import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import asyncHandler from "./handlers/asyncHandler";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("token");
  const isVerified = cookie?.value;
  //frontend
  if (request.nextUrl.pathname.startsWith("/dashboard/:path*")) {
    if (!cookie) {
      const url = request.nextUrl.clone();
      url.pathname = "/signup";
      return NextResponse.rewrite(url);
    }
  }

  //backend
  if (request.nextUrl.pathname.startsWith("/api/chunks")) {
    if (!cookie) {
      return NextResponse.json(asyncHandler(403, "Unauthorized"));
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
