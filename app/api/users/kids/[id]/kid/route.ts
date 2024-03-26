import Kids from "@/(models)/Kids";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";

type ParamsType = {
  id: String;
};
export const GET = async (req: Request, { params }: { params: ParamsType }) => {
  console.log(params.id, "Params");

  try {
    await connectToDB();
    const kid = await Kids.findById(params.id).exec();
    console.log(kid.kids, "Kids found");

    // const parent = await User.findById(kid?.creator).lean().exec();
    return new Response(JSON.stringify(kid), { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "failed to fetch all Kid" },
      { status: 500 }
    );
  }
};
