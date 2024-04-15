

import Task from "@/(models)/Task";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

interface Params {
  id: string; // ID of the parent or child
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  try {
    await connectToDB();

    // Find tasks where the creator is the parent or any of the children match the parent's ID
    const tasks = await Task.find({
      $or: [{ creator: params.id }, { children: params.id }],
    }).populate("creator");

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to fetch tasks" }), {
      status: 500,
    });
  }
};
