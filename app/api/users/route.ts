import User from "@/models/User";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcrypt";
export const POST = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const { username, password, email, points } = await req.json();

    const newUser = new User({
      username,
      password,
      email,
      points: 0,
    });

    // check if the values are present
    if (!username || !password || !email || !points) {
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

    // hashjing th password hash
    const hashPassword = await bcrypt.hash(password, 10);
    password = hashPassword;

    await User.create(newUser);
    return new Response({ message: "user created" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response({ message: "Error", error }, { status: 500 });
  }
};
