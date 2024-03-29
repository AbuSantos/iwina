import Kids from "@/(models)/Kids";
import NewMessage from "@/(models)/NewMessage";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
interface Params {
  id: string; // ID of the parent or child
}

// export const GET = async (req: NextRequest, { params }: { params: Params }) => {
//   console.log(params, "GET");

//   try {
//     await connectToDB();
//     // Fetch messages where either the parent or child field matches the user ID
//     const messages = await NewMessage.find({
//       $or: [
//         { creator: params.id }, // Messages sent by the parent
//         { child: params.id }, // Messages sent by children associated with the parent
//       ],
//     }).populate("creator");

//     return new Response(JSON.stringify(messages), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: "Failed to fetch tasks" }), {
//       status: 500,
//     });
//   }
// };
export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  console.log(params, "params");

  try {
    await connectToDB();
    const messages = await NewMessage.find({
      $or: [
        // Messages sent by parents
        { parent: params.id },
        // Messages sent by children
        { child: params.id },
      ],
    })
      .populate({
        path: "parent",
        model: "User",
      })
      .populate({
        path: "child",
        model: "Kids",
      });
    console.log(messages, "messages");

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch messages" }),
      { status: 500 }
    );
  }
};
