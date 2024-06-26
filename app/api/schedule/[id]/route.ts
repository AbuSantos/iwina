import { Schedule } from "@/(models)/Schedule";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }) => {
  try {
    await connectToDB();

    const schedule = await Schedule.find({ familyId: params.id });

    return new Response(JSON.stringify(schedule), { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to create a new task!" },
      { status: 500 }
    );
  }
};
