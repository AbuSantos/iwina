import Task from "@/models/Task";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const task = await Task.find({ _id: params.id }).populate("_id");

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("failed to fetch all prompts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { status } = await req.json();

  try {
    await connectToDB();
    const existingTask = await Task.findById(params.id);

    if (!existingTask)
      return new Response("Could not find task with that Id", { status: 404 });

    existingTask.status = status;
    await existingTask.save();

    return new Response(JSON.stringify(existingTask), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 201 });
  }
};
