// src/app/api/gift/route.ts
import { NextResponse, NextRequest } from "next/server";

// Use same pattern as RSVP - Apps Script handles the Google Sheets interaction
const SCRIPT_URL = process.env.GIFT_SCRIPT_URL || process.env.SCRIPT_URL!;
const SECRET = process.env.GIFT_SECRET || process.env.RSVP_SECRET!;

export async function POST(request: NextRequest) {
  try {
    // 1) Read the gift data from the request body
    const body = await request.json();
    const { name, message, amount, currency, timestamp } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 },
      );
    }

    if (!currency || typeof currency !== "string") {
      return NextResponse.json(
        { error: "Currency is required" },
        { status: 400 },
      );
    }

    console.log("-> Saving gift:", {
      name,
      message,
      amount,
      currency,
      timestamp,
    });

    // 2) Send to Apps Script (same pattern as RSVP)
    const url = `${SCRIPT_URL}?token=${encodeURIComponent(SECRET)}&action=gift`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        message: message?.trim() || "",
        amount: amount,
        currency: currency,
        timestamp: timestamp || new Date().toISOString(),
      }),
    });

    const data = await res.json();

    if (data.error) {
      console.error("Apps Script error:", data.error);
      return NextResponse.json(
        { error: "Failed to save gift" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving gift:", error);
    return NextResponse.json({ error: "Failed to save gift" }, { status: 500 });
  }
}

// Optional: GET endpoint to retrieve gift messages for display
export async function GET() {
  try {
    const url = `${SCRIPT_URL}?token=${encodeURIComponent(SECRET)}&action=giftlist`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      return NextResponse.json([]);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching gift messages:", error);
    return NextResponse.json([]);
  }
}
