import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category") || "ceremony";
  const cursor = parseInt(searchParams.get("photoCursor") || "0", 10);
  const pageSize = 20; // Load 20 images at a time

  const photosDir = path.join(
    process.cwd(),
    "public",
    "images",
    "photos",
    category,
  );

  try {
    // Check if directory exists
    if (!fs.existsSync(photosDir)) {
      return NextResponse.json({ page: [], next: null });
    }

    const files = fs.readdirSync(photosDir);
    const imageFiles = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .sort(); // Sort alphabetically for consistent ordering

    // Paginate results
    const page = imageFiles.slice(cursor, cursor + pageSize).map((file) => ({
      url: `/images/photos/${category}/${file}`,
    }));

    const next =
      cursor + pageSize < imageFiles.length ? cursor + pageSize : null;

    return NextResponse.json({ page, next });
  } catch (error) {
    console.error("Error reading photos directory:", error);
    return NextResponse.json({ page: [], next: null });
  }
}
