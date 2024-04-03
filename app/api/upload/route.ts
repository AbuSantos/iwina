import cloudinary from "cloudinary";
import { Readable } from "stream";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    // Access the fields from FormData
    // const uploadPreset = formData.get("upload_preset") as string;
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file found in form data");
    }

    // Initialize Cloudinary with your configuration
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Convert ArrayBuffer to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create a readable stream from the buffer
    const fileStream = Readable.from(buffer);

    // Upload the file to Cloudinary using upload_stream
    const result = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      });

      // Pipe the file stream to Cloudinary
      fileStream.pipe(stream);
    });

    // Return the secure URL of the uploaded image
    return new Response(JSON.stringify({ url: result }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return new Response(
      JSON.stringify({ message: "Failed to upload image to Cloudinary" }),
      {
        status: 500,
      }
    );
  }
};
