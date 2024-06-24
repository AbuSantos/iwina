import Kids from "@/(models)/Kids";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();
    const {
      username,
      password,
      userId,
      image,
      favTeachersName,
      favFood,
      allergies,
      doctorsName,
      birthday,
      favColor,
      bestFriendsName,
      favArtiste,
      favSong,
      favSubject,
    } = await req.json();

    const newKid = new Kids({
      creator: userId,
      username,
      image,
      password,
      points: 0,
      favTeachersName,
      favFood,
      allergies,
      doctorsName,
      birthday,
      favColor,
      bestFriendsName,
      favArtiste,
      favSong,
      favSubject,
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

    const parent = await User.findById(userId).exec();
    if (!parent) {
      return Response.json({ message: "Parent not found" }, { status: 409 });
    }

    parent.kids.push(newKid.id);
    await parent.save();

    newKid.id = newKid.id;
    // hashing the password hash
    const hashPassword = await bcrypt.hash(newKid.password, 10);
    newKid.password = hashPassword;
    await Kids.create(newKid);

    const profile = {
      id: newKid.id,
      email: null, // Set to null if not available
      username: newKid.username,
      image: newKid.image,
    };

    return Response.json({ message: "Kid created", profile }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
