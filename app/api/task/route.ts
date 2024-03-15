import Task from "@/models/Task";
import { connectToDB } from "@/utils/database";

export const GET = async (req: Request, res: Response) => {
  try {
    await connectToDB();
    const tasks = await Task.find({}).populate("creator");
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all task", { status: 500 });
  }
};
