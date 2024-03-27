import Kids from "@/(models)/Kids";
import NewMessage from "@/(models)/NewMessage";
import Task from "@/(models)/Task";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, { params }) => {
  const { message, userId } = await req.json();
  // console.log(message, userId, "query");

  try {
    await connectToDB();

    // Validate input parameters
    if (!message || !userId) {
      return new Response(
        JSON.stringify({ message: "Message and userId are required" }),
        { status: 404 }
      );
    }
    let parent, child;

    if (userId) {
      parent = await User.findById(userId);
      child = await Kids.findById(userId);
    }

    if (!parent && !child) {
      return new Response(
        JSON.stringify({ message: `User not found for userId ${userId}` }),
        { status: 404 }
      );
    }

    const newMessage = new NewMessage({
      message,
      parent,
      child,
    });

    await newMessage.save();
    return new Response(JSON.stringify(newMessage), { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to create a message!" },
      { status: 500 }
    );
  }
};
