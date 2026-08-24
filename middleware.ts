import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, expectedSessionValue } from "./lib/auth";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (cookie && cookie === expectedSessionValue()) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("next", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/scan/:path*"],
};
