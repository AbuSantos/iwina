import Kids from "@/(models)/Kids";
import Task from "@/(models)/Task";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
// import { URL } from "url";
type ParamsType = {
  id: String;
};

export const GET = async (
  req: NextRequest,
  { params }: { params: ParamsType }
) => {
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
  { params }: { params: ParamsType }
) => {
  const { status, userId } = await req.json();
  console.log(userId, "userId");

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
        return Response.json({ message: "Task not found" }, { status: 404 });
      }
      existingTask.status = status;
      // if the status is picked, it set the status to the pickedByUsername parameter
      existingTask.pickedBy =
        status === "In Progress" ? pickedByUsername : null;

      existingTask.user = status === "In Progress" ? userId : null;

      const pickedUser = await Kids.findById(userId).exec();
      console.log(existingTask, "picked by username");
      // console.log(pickedUser, "picked");

      if (!pickedUser) {
        return Response.json({ message: "User not found" }, { status: 404 });
      }

      if (pickedUser.ongoingTasks.length > 2) {
        return Response.json(
          { message: "You cannot pick more than 2 tasks" },
          {
            status: 500,
          }
        );
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
        return Response.json({ message: "Task not found" }, { status: 404 });
      }

      existingTask.status = status;
      // if the status is picked, it set the status to the pickedByUsername parameter
      existingTask.pickedBy = status === "Completed" ? pickedByUsername : null;
      existingTask.user = status === "Completed" ? userId : null;

      const pickedUser = await Kids.findById(existingTask.user).exec();
      // console.log(pickedUser, "pickedUser");

      if (!pickedUser) {
        return Response.json({ message: "User not found" }, { status: 404 });
      }

      pickedUser.ongoingTasks.pop(params.id);
      pickedUser.completedTasks.push(params.id);

      await pickedUser.save();
      await existingTask.save();
      return new Response(JSON.stringify(existingTask), { status: 200 });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    // return Response.json({ message: "Failed to update task" }, { status: 404 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const { pathname } = new URL(req.url);
  const segments = pathname.split("/");
  const taskId = segments[segments?.length - 2];
  // console.log(taskId, "Delete");

  try {
    await connectToDB();
    await Task.findByIdAndDelete(taskId);

    return Response.json(
      { message: "Task deleted successfully " },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Failed to delete Task" }, { status: 201 });
  }
};
