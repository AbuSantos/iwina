import Kids from "@/(models)/Kids";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

type ParamsType = {
  id: String;
};
export const POST = async (
  req: NextRequest,
  { params }: { params: ParamsType }
) => {
  try {
    await connectToDB();
    const { username, password } = req.json();
    const newKid = new Kids({
      username,
      password,
      points: 0,
      completedTasks: [],
      ongoingTasks: [],
      goal: [],
    });

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

    // hashing th password hash
    const hashPassword = await bcrypt.hash(newKid.password, 10);
    console.log(hashPassword);

    newKid.password = hashPassword;

    await Kids.create(newKid);
    return Response.json({ message: "Kid created" }, { status: 409 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
