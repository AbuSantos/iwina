import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { amount, userId } = await req.json();

    // Validate required fields
    if (!userId || !amount) {
      return new Response(
        JSON.stringify({
          message: "Missing required fields for Adding new Funds",
        }),
        { status: 400 }
      );
    }
    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    user.points += amount;
    await user.save();

    return Response.json({ message: "Points Added Succesfully " });
  } catch (error) {
    console.log(error);

    // Return error response with detailed message
    return Response.json(
      { message: "Failed to add Point !", error: error.message },
      { status: 500 }
    );
  }
};
