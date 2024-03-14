// import Prompt from "@/models/Prompt";
import { connectToDB } from "@/utils/database";

export const POST = async (req, res) => {
  const { userId, taskDesc, taskDdl, taskPnt } = await req.json();

  try {
    await connectToDB();
    const task = new Task({
      creator: userId,
      taskDesc,
      taskDdl,
      taskPnt,
    });
  } catch (error) {}
};
