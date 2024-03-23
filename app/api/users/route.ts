import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDB();

    const { username, password, email } = await req.json();
    console.log(username, password, email, "Testinfg ");

    const newUser = new User({
      username,
      password,
      email,
      points: 0,
      completedTasks: [],
      ongoingTasks: [],
    });
    console.log(newUser.points, "password");

    // check if the values are present
    if (!password || !email) {
      return Response.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    //checking for duplicates
    const duplicate = await User.findOne({ email: newUser.email })
      .lean()
      .exec();

    if (duplicate) {
      return Response.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // hashing th password hash
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    console.log(hashPassword);

    newUser.password = hashPassword;

    await User.create(newUser);
    return new Response("user created", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
