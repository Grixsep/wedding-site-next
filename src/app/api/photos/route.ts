import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("category") || "";
  const cursor = parseInt(searchParams.get("photoCursor") || "0", 10);
  const pageSize = 10;

  try {
    const result = await cloudinary.api.resources_by_tag(tag, {
      max_results: 500,
    });

    const all = result.resources
      .sort((a: any, b: any) => a.public_id.localeCompare(b.public_id)) // Sort by name
      .map((r: any) => ({ url: r.secure_url }));

    const page = all.slice(cursor, cursor + pageSize);
    const next =
      cursor + page.length < all.length ? cursor + page.length : null;

    return NextResponse.json({ page, next });
  } catch (e) {
    console.error("Cloudinary Admin API error:", e);
    return NextResponse.json({ page: [], next: null });
  }
}
