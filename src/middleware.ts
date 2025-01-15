import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import asyncHandler from "./handlers/asyncHandler";
import jwtDecoder from "./handlers/jwtDecoder";

export function middleware(req: NextRequest) {
  let cookie = req.cookies.get("token");
  let value: any = cookie?.value;
  if (
    req.nextUrl.pathname.startsWith("/user") ||
    (req.nextUrl.pathname == "/" && cookie)
  ) {
    let url = req.nextUrl.clone();
    url.pathname = `/dashboard/${value}`;
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith("/dashboard") && !cookie) {
    let url = req.nextUrl.clone();
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
