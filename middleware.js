import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl

  // 🔒 Cegah akses ke /login & /register jika udah login
  if (token && (pathname === "/login" || pathname === "/register")) {
    const role = token.role
    const redirectTo = role === "ADMIN" ? "/admin" : "/user"
    return NextResponse.redirect(new URL(redirectTo, req.url))
  }

  // 🔐 Protect /admin
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  // 🔐 Protect /user
  if (pathname.startsWith("/user")) {
    if (!token || token.role !== "USER") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/login", "/register"],
}
