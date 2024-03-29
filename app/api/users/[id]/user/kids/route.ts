import Kids from "@/(models)/Kids";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

type ParamsType = {
  id: string;
};
export const GET = async (
  req: NextRequest,
  { params }: { params: ParamsType }
) => {
  try {
    await connectToDB();

    const kids = await Kids.find({ creator: params.id });
  console.log(kids, "parent id");

    return new Response(JSON.stringify(kids), { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "failed to fetch all Users" },
      { status: 500 }
    );
  }
};
