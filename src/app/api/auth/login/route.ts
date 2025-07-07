import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("authToken", "authenticated", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
