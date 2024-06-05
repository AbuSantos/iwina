import Goal from "@/(models)/Goals";
import Kids from "@/(models)/Kids";
import Task from "@/(models)/Task";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

type ParamsType = {
  id: String;
};
export const PATCH = async (
  req: NextRequest,
  { params }: { params: ParamsType }
) => {
  // console.log("task id ", params.id);

  try {
    await connectToDB();

    const completedTask = await Task.findById(params.id);
    // console.log("Task completed", completedTask);

    //we check if there is a completed task
    if (!completedTask) {
      return Response.json({ message: "Task not found" }, { status: 500 });
    }

    //then we check if the task has been completed
    if (completedTask.status !== "Completed") {
      return Response.json({ message: "Task not completed" }, { status: 500 });
    }
    //fetching the parent
    const parent = await User.findById(completedTask.creator);
    //We return null if no user was found
    if (!parent) {
      return Response.json({ message: "No Parent was found" }, { status: 500 });
    }
    if (completedTask.taskPnt > parent.points) {
      return Response.json(
        {
          message:
            "You do not have enough Points for this reward, please Buy more",
        },
        { status: 500 }
      );
    }

    //we find the user who did the task using the username
    const pickedByUser = await completedTask.pickedBy;

    const user = await Kids.findOne({
      username: pickedByUser.toLowerCase(),
    }).exec();

    // console.log("User:", user);
    // if()

    //We return null if no user was found
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 500 });
    }

    //update the task status
    // completedTask.status = "Rewarded";
    let userSavings: number;
    let totalSavingPoints = 0;

    //we check if the user has set a goal
    if (user.goal && user.goal.length > 0) {
      //we mapped through the user goal and calculated the total points
      // then we fetch each goal associated with the goal id in the array and
      //then we calculate the points for each goal and save them to the user
      //we then add the total points and deduct them from the total points
      for (const goalId of user.goal) {
        const userGoal = await Goal.findById(goalId);
        // console.log("Goal:", userGoal.amount, userGoal.rate);
        if (userGoal && userGoal.amount > userGoal.amountSaved) {
          //we deduct the amount already saved from the goal target
          const remainingAmount = userGoal.amount - userGoal.amountSaved;

          //we check for the smallest value to make sure we dont oversave
          userSavings = Math.min(
            (userGoal.amount * userGoal.rate) / 100,
            remainingAmount
          );
          // console.log(userSavings, "total left");

          totalSavingPoints += userSavings;
          userGoal.amountSaved += userSavings;
          userGoal.depositCount += 1;

          userGoal.save();
        }
      }
    } else {
      console.log("User Has no goals");
    }
    //get the parent total point
    const taskPoints = completedTask.taskPnt;
    //check how many points was deducted after and before the goal was udpated

    user.points += taskPoints;
    // console.log(user.points, "task user points");

    //parent point deduction
    parent.points -= taskPoints;

    user.points -= totalSavingPoints;

    // console.log(user.points, "user points");
    // Save changes to the user'
    completedTask.save();
    parent.save();

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
