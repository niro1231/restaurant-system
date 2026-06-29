import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  const isLoginPage = path === "/";

  const isProtectedRoute =
    path.startsWith("/admin") ||
    path.startsWith("/Pages/Home") ||
    path.startsWith("/Pages/about") ||
    path.startsWith("/Pages/contact") ||
    path.startsWith("/menu");

  // ❌ Not logged in → block protected routes
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ❌ Logged in → cannot go back to login page
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/Pages/Home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/Pages/:path*", "/menu/:path*"],
};