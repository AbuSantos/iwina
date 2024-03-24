import Task from "@/(models)/Task";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
interface Params {
  id: string;
}
export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  try {
    await connectToDB();
    const tasks = await Task.find({ creator: params.id }).populate("creator");
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "failed to fetch all task" },
      { status: 500 }
    );
  }
};
