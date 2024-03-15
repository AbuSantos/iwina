// import Prompt from "@/models/Prompt";
import Task from "@/models/Task";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  const { userId, taskDesc, taskDdl, taskPnt } = await req.json();
    console.log(userId, taskDesc, taskDdl, taskPnt);

  try {
    await connectToDB();
    const task = new Task({
      creator: userId,
      taskDesc,
      taskDdl,
      taskPnt,
    });
    await task.save();
    return new Response(JSON.stringify(task), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new task", { status: 500 }); //status 500:server error
  }
};
