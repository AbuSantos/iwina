import Task from "@/(models)/Task";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }) => {
  console.log(params.id, "params of this is ");

  try {
    await connectToDB();
    const tasks = await Task.find({ user: params.id, status: "In Progress" });
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all task", { status: 500 });
  }
};
