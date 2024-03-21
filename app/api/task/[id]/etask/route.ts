import Task from "@/(models)/Task";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
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

export const PATCH = async (
  req: NextRequest,
  res: NextResponse,
  { params }
) => {
  // console.log(params);
  const { status, userId } = await req.json();
  try {
    //we check if the inputed values is one of the allowed values
    if (!status || !["In Progress", "Completed"].includes(status)) {
      return new Response("Invalid status", { status: 400 });
    }

    const session = await getServerSession({ req });
    const pickedByUsername = session?.user?.name || null;

    await connectToDB();
    if (status === "In Progress") {
      // console.log(userId, "UserId");

      // console.log(status);

      const existingTask = await Task.findById(params.id);
      // console.log(existingTask.user, "existingTask");

      if (!existingTask) {
        return new Response("Task not found", { status: 404 });
      }
      existingTask.status = status;
      // if the status is picked, it set the status to the pickedByUsername parameter
      existingTask.pickedBy =
        status === "In Progress" ? pickedByUsername : null;
      existingTask.user = status === "In Progress" ? userId : null;

      const pickedUser = await User.findById(existingTask.user).exec();
      // console.log(pickedUser, "picked");
      if (!pickedUser) {
        throw new Error("User not found");
      }

      if (pickedUser.ongoingTasks.length > 2) {
        return res.status(404).json({
          message: "You cannot pick more than 2 tasks",
          status: 404,
        });
      }
      pickedUser.ongoingTasks.push(params.id);

      await pickedUser.save();
      await existingTask.save();
      return new Response(JSON.stringify(existingTask), { status: 200 });
    }

    if (status === "Completed") {
      const existingTask = await Task.findById(params.id);
      // console.log(existingTask.user, "existingTask");

      if (!existingTask) {
        return new Response("Task not found", { status: 404 });
      }

      existingTask.status = status;
      // if the status is picked, it set the status to the pickedByUsername parameter
      existingTask.pickedBy = status === "Completed" ? pickedByUsername : null;
      existingTask.user = status === "Completed" ? userId : null;

      const pickedUser = await User.findById(existingTask.user).exec();
      // console.log(pickedUser, "pickedUser");

      if (!pickedUser) {
        throw new Error("User not found");
      }
      pickedUser.ongoingTasks.pop(params.id);
      pickedUser.completedTasks.push(params.id);

      if (!pickedUser) {
        throw new Error("User not found");
      }

      await pickedUser.save();
      await existingTask.save();
      return new Response(JSON.stringify(existingTask), { status: 200 });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    return new Response("Failed to update task", { status: 500 });
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
