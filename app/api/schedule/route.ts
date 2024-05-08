import { Schedule } from "@/(models)/Schedule";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectToDB();
  try {
    const { schedule, userId, familyId } = await req.json();
    console.log(schedule, "schdeule");

    const schdeule = new Schedule({
      user: userId,
      schedule,
      familyId,
    });

    return new Response(JSON.stringify(schdeule), { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to create a new task!" },
      { status: 500 }
    );
  }
};
