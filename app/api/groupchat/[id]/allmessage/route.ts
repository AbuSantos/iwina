import Kids from "@/(models)/Kids";
import NewMessage from "@/(models)/NewMessage";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
interface Params {
  id: string; // ID of the parent or child
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  console.log(params,"GET");
  
  try {
    await connectToDB();
    const message = await NewMessage.find({
      $or: [{ child: params.id }, { parent: params.id }],
    }).populate("message");
    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to fetch tasks" }), {
      status: 500,
    });
  }
};
