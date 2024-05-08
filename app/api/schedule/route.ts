import { Schedule } from "@/(models)/Schedule";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectToDB();
  try {
    const { familyId, title, userId, start, allDay } = await req.json();
    console.log(title, userId, start, allDay, familyId, "schdeule");

    const newSchedule = new Schedule({
      user: userId,
      title,
      start,
      allDay,
    });

    await newSchedule.save();
    return Response.json({ message: "New task created successfully" });
  } catch (error) {
    return Response.json(
      { message: "Failed to create a new task!" },
      { status: 500 }
    );
  }
};
