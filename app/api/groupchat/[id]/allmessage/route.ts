import { Messages } from "@/(models)/Message";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
interface Params {
  id: string; // ID of the parent or child
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  console.log(params, "GETs");

  try {
    await connectToDB();
    // Fetch messages where either the parent or child field matches the user ID
    const messages = await Messages.find({ roomId: params.id });
    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to fetch tasks" }), {
      status: 500,
    });
  }
};
