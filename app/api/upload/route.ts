import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
// import sha1 from ‘crypto-js/sha1’
export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    // Assuming the file field is named 'file'
    const file = formData.get("file");

    // Upload the file to Cloudinary
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUD_NAME,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Return the secure URL of the uploaded image
    return new Response(JSON.stringify({ url: result.secure_url }), {
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
