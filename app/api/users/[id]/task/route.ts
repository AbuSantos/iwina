import { connectToDB } from "@/utils/database";
import Task from "@/(models)/Task";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }) => {
  try {
    await connectToDB();

    const tasks = await Task.find({ creator: params.id }).populate(
      params.status,
      "Completed"
    );
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("failed to fetch all prompts", { status: 500 });
  }
};
