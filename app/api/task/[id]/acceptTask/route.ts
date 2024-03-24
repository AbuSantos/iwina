import Task from "@/(models)/Task";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

type ParamsType = {
  id: String;
};
export const PATCH = async (
  req: NextRequest,
  { params }: { params: ParamsType }
) => {
  console.log("task id ", params.id);

  try {
    await connectToDB();

    const completedTask = await Task.findById(params.id);
    console.log("Task completed", completedTask);

    if (!completedTask) {
      return Response.json({ message: "Task not found" }, { status: 500 });
    }
    //we check if the task has been completed
    if (completedTask.status !== "Completed") {
      return Response.json({ message: "Task not completed" }, { status: 500 });
    }

    //we find the user who did the task using the username
    const pickedByUser = await completedTask.pickedBy;
    console.log("Picked by ", pickedByUser.toLowerCase());

    const user = await User.findOne({
      username: pickedByUser.toLowerCase(),
    }).exec();
    // console.log("User:", user);

    if (!user) {
      return Response.json({ message: "Userr not found" }, { status: 500 });
    }

    // Update user's points
    const taskPoints = completedTask.taskPnt;
    console.log("taskpoint", taskPoints);

    user.points += taskPoints;

    // Save changes to the user
    await user.save();

    return new Response("Points transferred successfully", { status: 200 });
  } catch (error) {
    console.error("Error transferring points:", error);
    return Response.json(
      { message: "Failed to transfer points" },
      { status: 500 }
    );
  }
};
