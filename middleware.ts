import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getToken } from "next-auth/jwt";

export async function middleware(req: any) {
  const user = await getToken({ req, secret: process.env.AUTH_SECRET });

  // Konsola kullanıcı bilgilerini yazdır
  console.log("User:", user);

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (user && user.role === "Admin") {
      return auth(req);
    }

    return NextResponse.redirect(new URL("/security", req.url));
  }

  return NextResponse.next();
}
