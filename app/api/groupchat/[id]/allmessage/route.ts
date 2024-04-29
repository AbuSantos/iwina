import { Messages } from "@/(models)/Message";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
// import { parse } from "url";
interface Params {
  id: string; // ID of the parent or child
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  console.log(params);
  try {
    await connectToDB();
    // Fetch messages where either with the familyRoomId which is the parentID
    const messages = await Messages.find({ roomId: params.id });

    return new Response(JSON.stringify(messages.reverse()), { status: 200 });
  } catch (error) {
    return (
      Response.json({ message: "Failed to fetch tasks" }),
      {
        status: 500,
      }
    );
  }
};
