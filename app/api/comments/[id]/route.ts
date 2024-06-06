import { Comments } from "@/(models)/Comments";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

interface Params {
  id: string; // ID of the parent or child
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  try {
    await connectToDB();

    const comments = await Comments.find({ roomId: params.id })
      .populate("childId")
      .populate("taskId")
      .populate("parentId");

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to fetch messages" }),
      { status: 500 }
    );
  }
};
