import Task from "@/(models)/Task";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
type ParamsType = {
  id: String;
};

export const GET = async (
  req: NextRequest,
  { params }: { params: ParamsType }
) => {
  console.log(params, "GET");

  try {
    await connectToDB();
    const tasks = await Task.find({
      user: params.id,
      status: "Completed",
    });
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "failed to fetch all task" },
      { status: 500 }
    );
  }
};
