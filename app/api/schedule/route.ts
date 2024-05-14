import { Schedule } from "@/(models)/Schedule";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
import { Knock } from "@knocklabs/node";
import User from "@/(models)/User";
import Kids from "@/(models)/Kids";

const knock = new Knock(process.env.KNOCK_SECRET_API_KEY);

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    // Parse incoming request body
    const {
      familyId,
      title,
      userId,
      start,
      allDay,
      image,
      username,
      timeLine,
    } = await req.json();
    // console.log(timeLine, "timeline");

    // Validate required fields
    if (!familyId || !title || !userId || !start) {
      throw new Error("Missing required fields for creating a new task.");
    }

    // Create a new instance of the Schedule model
    const newSchedule = new Schedule({
      user: userId,
      title,
      start,
      allDay,
      familyId,
      image,
      username,
      timeLine,
    });

    // Save the new schedule to the database
    await newSchedule.save();
    const family = await Kids.find({ creator: familyId });
    await knock.notify("new-event", {
      actor: userId,
      recipients: family.map((child) => child._id),
      data: {
        newEvent: {
          date: start,
          title: title,
        },
      },
    });

    // Return success message
    return Response.json({ message: "New task created successfully" });
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating new task:", error);

    // Return error response with detailed message
    return Response.json(
      { message: "Failed to create a new task!", error: error.message },
      { status: 500 }
    );
  }
};
