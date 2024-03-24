import Kids from "@/(models)/Kids";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const { username, password, userId } = await req.json();
    console.log(username, password, userId, "OK");

    const newKid = new Kids({
      creator: userId,
      username,
      password,
      points: 0,
      completedTasks: [],
      ongoingTasks: [],
      goal: [],
    });

    // console.log(newKid, "OK kid");

    if (!password || !username) {
      return Response.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    const duplicate = await Kids.findOne({ username: newKid.username })
      .lean()
      .exec();

    if (duplicate) {
      return Response.json(
        { message: "Username not available" },
        { status: 409 }
      );
    }
    const parent = await User.findById(userId).exec();
    if (!parent) {
      return Response.json({ message: "Parent not found" }, { status: 409 });
    }

    parent.kids.push(newKid.id);
    await parent.save();

    // hashing th password hash
    const hashPassword = await bcrypt.hash(newKid.password, 10);
    // console.log(hashPassword);

    newKid.password = hashPassword;

    await Kids.create(newKid);
    return Response.json({ message: "Kid created" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
