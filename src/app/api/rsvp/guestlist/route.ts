// src/app/api/rsvp/guestlist/route.ts
import { NextResponse, NextRequest } from "next/server";

const SCRIPT_URL = process.env.SCRIPT_URL!;
const SECRET = process.env.RSVP_SECRET!;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    // Note: Guest list is publicly viewable (no cookie check required)
    // But we still need the secret for the Apps Script

    const url =
      `${SCRIPT_URL}` +
      `?action=guestlist` +
      `&token=${encodeURIComponent(SECRET)}`;

    console.log("→ Fetching guest list from Apps Script");

    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      return NextResponse.json(
        { error: "Failed to fetch guest list" },
        { status: 500 },
      );
    }

    // Return the guest list
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching guest list:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
