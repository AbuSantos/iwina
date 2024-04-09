// import Prompt from "@/models/Prompt";
import Kids from "@/(models)/Kids";
import Task from "@/(models)/Task";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";

import { Knock } from "@knocklabs/node";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

const knock = new Knock(process.env.KNOCK_SECRET_API_KEY);
export const POST = async (req: NextRequest) => {
  const { userId, taskDesc, taskDdl, taskPnt } = await req.json();
  console.log(userId, taskDesc, taskDdl, taskPnt);

  try {
    await connectToDB();

    //we find the parent who created the task
    const parent = await User.findById(userId).exec();
    // console.log(parent, "the task has been created by the parent");

    //we return an error if we don't find the parent
    if (!parent) {
      return Response.json({ message: "Parent not found!" }, { status: 404 });
    }

    const children = await Kids.find({ creator: userId }).exec();
    // console.log(children, "the task has been created by the children");

    const task = new Task({
      creator: userId,
      taskDesc,
      taskDdl,
      taskPnt,
      pickedBy: null,
      user: null,
      children: children.map((child) => child._id),
    });

    await task.save();
    // console.log(children.map((child) => child._id));

    await knock.notify("new-task", {
      actor: userId,
      recipients: children.map((child) => child._id),
      data: {
        newTask: {
          value: task.taskDesc,
          amount: taskPnt,
        },
      },
    });

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to create a new task!" },
      { status: 500 }
    );
  }
};
