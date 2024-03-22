import Task from "@/(models)/Task";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const tasks = await Task.find({}).populate("creator");
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all task", { status: 500 });
  }
};
