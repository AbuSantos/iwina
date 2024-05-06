import Task from "@/(models)/Task";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
import { parse } from "url";
type ParamsType = {
  id: String;
};

export const GET = async (
  req: NextRequest,
  { params }: { params: ParamsType }
) => {
  const { query } = parse(req.url, true);
  const role = query.role;

  try {
    await connectToDB();
    let tasks: any;

    if (role === "parent") {
      tasks = await Task.find({
        creator: params.id,
        status: "Completed",
      });
    } else {
      tasks = await Task.find({
        user: params.id,
        status: "Completed",
      });
    }
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "failed to fetch all task" },
      { status: 500 }
    );
  }
};
