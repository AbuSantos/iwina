import Goal from "@/(models)/Goals";
import { connectToDB } from "@/utils/database";
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { id } = params;

    const goals = await Goal.find({ creator: id });
    return new Response(JSON.stringify(goals), { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "Failed to create a new task!" },
      { status: 500 }
    );
  }
};
