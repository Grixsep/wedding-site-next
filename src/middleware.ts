// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Seed the secret cookie if it doesn't exist yet
  if (!request.cookies.has("rsvp_secret")) {
    response.cookies.set("rsvp_secret", process.env.RSVP_SECRET!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/rsvp", // only sent on your RSVP API
    });
  }

  return response;
}

// now fire on both your public pages AND your API route:
export const config = {
  matcher: [
    "/", // home page
    "/rsvp/:path*", // your RSVP page (and any client‑side subpaths)
    "/api/rsvp/:path*", // your API route
  ],
};
