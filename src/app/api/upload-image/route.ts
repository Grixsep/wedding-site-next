import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";
import { Readable } from "stream";

// Required to handle FormData correctly
export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file || !(file instanceof File)) {
    return new Response(JSON.stringify({ error: "No file uploaded" }), {
      status: 400,
    });
  }

  const now =
    process.env.NODE_ENV === "development"
      ? new Date("2026-03-29") // 👈 for testing different states
      : new Date();

  const start = new Date("2026-03-07");
  const end = new Date("2026-03-28");

  if (now < start) {
    return new Response(
      JSON.stringify({ error: "Uploads are not yet open." }),
      {
        status: 403,
      },
    );
  }

  if (now > end) {
    return new Response(JSON.stringify({ error: "Uploads are now closed." }), {
      status: 403,
    });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const fileType = file.type;

  if (!allowedTypes.includes(fileType)) {
    return new Response(
      JSON.stringify({
        error: "Only JPG, PNG, or WEBP image files are allowed.",
      }),
      { status: 400 },
    );
  }

  const MAX_FILE_SIZE_MB = 10;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (buffer.length > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return new Response(
      JSON.stringify({ error: "File too large - 10MB limit" }),
      {
        status: 400,
      },
    );
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "website-uploads" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      const readable = new Readable();
      readable._read = () => {};
      readable.push(buffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });

    return new Response(JSON.stringify({ url: (result as any).secure_url }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
    });
  }
}
