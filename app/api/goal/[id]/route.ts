import Goal from "@/(models)/Goals";
import { connectToDB } from "@/utils/database";
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { id } = params;

    const goals = await Goal.find({ $or: [{ creator: id }, { _id: id }] });
    return new Response(JSON.stringify(goals), { status: 200 });
  } catch (err) {
    return Response.json({ message: "Failed to Fetch Goal!" }, { status: 500 });
  }
};
