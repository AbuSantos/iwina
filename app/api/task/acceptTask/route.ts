import Task from "@/(models)/Task";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const acceptTask = async (req: NextRequest) => {
  try {
    await connectToDB();

    const tasks = await Task.find({ status: "Not Completed" });
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "failed to fetch all task" },
      { status: 500 }
    );
  }
};
