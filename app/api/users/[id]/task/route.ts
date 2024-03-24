import { connectToDB } from "@/utils/database";
import Task from "@/(models)/Task";
import { NextRequest } from "next/server";
type ParamsType = {
  id: String;
  status: string | string[];
};
export const GET = async (
  req: NextRequest,
  { params }: { params: ParamsType }
) => {
  try {
    await connectToDB();

    const tasks = await Task.find({ creator: params.id }).populate(
      params.status,
      "Completed"
    );
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "failed to fetch all Tasks " },
      { status: 500 }
    );
  }
};
