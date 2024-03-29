import Kids from "@/(models)/Kids";
import NewMessage from "@/(models)/NewMessage";
import Task from "@/(models)/Task";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, { params }) => {
  const { message, userId, creatorType } = await req.json();

  // console.log(message, userId, creatorType, "query");

  try {
    await connectToDB();

    // Validate input parameters
    if (!message || !userId || !creatorType) {
      return new Response(
        JSON.stringify({ message: "Message and userId are required" }),
        { status: 404 }
      );
    }
    let parent, child;

    // //checking for the logged in user
    // parent = await User.findById(userId);

    // if (!parent) {
    //   // if it doesnt belong to the parent, it belongs to the user
    //   child = await Kids.findById(userId);
    // }

    // // console.log(child, parent, "parent and child ");

    // // If neither parent nor child is found, return an error
    // if (!parent && !child) {
    //   return new Response(
    //     JSON.stringify({ message: `User not found for userId ${userId}` }),
    //     { status: 404 }
    //   );
    // }
    let creator;
    if (creatorType === "parent") {
      creator = await User.findById(userId);
      console.log(creator, "user id paretn");
    } else if (creatorType === "child") {
      creator = await Kids.findById(userId);
      console.log(creator, "user id child");
    } else {
      return new Response(JSON.stringify({ message: "Invalid creatorType" }), {
        status: 400,
      });
    }
    if (!creator) {
      return new Response(
        JSON.stringify({ message: `Creator not found for userId ${userId}` }),
        { status: 404 }
      );
    }
    // Create a new message with the appropriate parent or child
    const newMessage = new NewMessage({
      creator: userId,
      creatorType,
      message,
      // parent,
      // child: child ? [child._id] : [],
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
