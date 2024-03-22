import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }) => {
  // console.log(params, "params of id");

  try {
    await connectToDB();
    const user = await User.findById(params.id).lean().exec();
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("failed to fetch all prompts", { status: 500 });
  }
};
