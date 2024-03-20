import Task from "@/(models)/Task";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
// import { URL } from "url";

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
  // console.log(params, "Params");

  const { status, userId } = await req.json();
  const session = await getServerSession({ req });
  // console.log("This is the session", session.name);

  try {
    await connectToDB();
    const existingTask = await Task.findById(params.id);
    // console.log(existingTask);

    // Extract the username from the authentication data
    const pickedByUsername = session?.user?.name || null;
    console.log(pickedByUsername, "Picked by");

    if (!existingTask)
      return new Response("Could not find task with that Id", { status: 404 });

    existingTask.status = status;
    existingTask.pickedBy = pickedByUsername;

    await existingTask.save();

    return new Response(JSON.stringify(existingTask), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 201 });
  }
};

export const DELETE = async (req) => {
  const { pathname } = new URL(req.url);
  const segments = pathname.split("/");
  const taskId = segments[segments?.length - 2];
  // console.log(taskId, "Delete");

  try {
    await connectToDB();
    await Task.findByIdAndDelete(taskId);

    return new Response("Task deleted successfully ", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete Task", { status: 201 });
  }
};
