import Goal from "@/(models)/Goals";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const Route = async (req: NextRequest) => {
  try {
    await connectToDB();
    const data = await req.json();
    const newGoal = new Goal(data);

    await newGoal.save();
    return Response.json({ message: "New task created successfully" });
  } catch (error) {
    console.error("Error creating new task:", error);

    // Return error response with detailed message
    return Response.json(
      { message: "Failed to create a Goal!", error: error.message },
      { status: 500 }
    );
  }
};
