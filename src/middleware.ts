import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("authToken")?.value;

  // Block unauthenticated users from accessing /dashboard
  if (pathname.startsWith("/dashboard") && authToken !== "authenticated") {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from /auth
  if (pathname.startsWith("/auth") && authToken === "authenticated") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 👇 This tells Next.js when to run the middleware
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
