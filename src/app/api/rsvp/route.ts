// src/app/api/rsvp/route.ts
import { NextResponse, NextRequest } from "next/server";

// Your Apps Script URL (server-only)
const SCRIPT_URL = process.env.SCRIPT_URL!;
// Your shared secret (server-only)
const SECRET = process.env.RSVP_SECRET!;

export async function GET(request: NextRequest) {
  // 0) Validate our HTTP-only cookie
  const cookie = request.cookies.get("rsvp_secret");
  if (cookie?.value !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1) Extract query params
  const { searchParams } = new URL(request.url);
  const first = searchParams.get("first")?.trim() || "";
  const last = searchParams.get("last")?.trim() || "";

  // 2) Proxy the lookup to your Apps Script, including the token
  const url =
    `${SCRIPT_URL}` +
    `?token=${encodeURIComponent(SECRET)}` +
    `&first=${encodeURIComponent(first)}` +
    `&last=${encodeURIComponent(last)}`;
  console.log("→ Proxying RSVP GET to:", url);

  const res = await fetch(url);
  const data = await res.json();

  // 3) "Not found" from your sheet becomes a 404
  if (data.error) {
    return NextResponse.json(data, { status: 404 });
  }

  // 4) Success – return the guest list
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  // 0) Validate our HTTP-only cookie
  const cookie = request.cookies.get("rsvp_secret");
  if (cookie?.value !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1) Read the RSVP submission from the request body
  const body = await request.json();
  console.log("→ Proxying RSVP POST to Apps Script with body:", body);

  // 2) Proxy the POST to your Apps Script, including the token
  const url = `${SCRIPT_URL}?token=${encodeURIComponent(SECRET)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  // 3) Map any Apps Script error to a 502
  if (data.error) {
    return NextResponse.json(data, { status: 502 });
  }

  // 4) Success – return confirmation
  return NextResponse.json(data);
}
