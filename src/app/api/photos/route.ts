// src/app/api/photos/route.ts
import { NextResponse } from "next/server";

const SCRIPT_URL = process.env.SCRIPT_URL!; // your Apps Script URL
const SECRET = process.env.RSVP_SECRET!; // same secret as RSVP

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("photoCursor") || "0";
  const category = encodeURIComponent(searchParams.get("category") || "");

  // include token so your Apps Script won’t reject it
  const url = `${SCRIPT_URL}?token=${encodeURIComponent(
    SECRET,
  )}&photoCursor=${cursor}&category=${category}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  const json = await res.json();
  return NextResponse.json(json);
}
