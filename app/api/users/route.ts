import NewUser from "@/(models)/NewUser";
// import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDB();

    const { username, password, email } = await req.json();
    // console.log(username, password, email, "Testinfg ");

    const newUser = new NewUser({
      username,
      password,
      email,
      // points: 0,
      // completedTasks: [],
      // ongoingTasks: [],
      // kids: [],
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
    const duplicate = await NewUser.findOne({ email: newUser.email })
      .lean()
      .exec();

    if (duplicate) {
      return Response.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // hashing the password hash
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    console.log(hashPassword);

    newUser.password = hashPassword;

    await NewUser.create(newUser);
    return Response.json({ message: "user created" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "error" }, { status: 400 });
  }
};
