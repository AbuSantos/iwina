import Kids from "@/(models)/Kids";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
import { parse } from "url";
type ParamsType = {
  id: string;
};
export const GET = async (
  req: NextRequest,
  { params }: { params: ParamsType }
) => {
  try {
    //we passed the role from the url
    const { query } = parse(req.url, true);
    const role = query.role;
    // console.log(role, "role");

    await connectToDB();
    //we check for the role, and if its a parent, we return all the kids created by the parent
    if (role === "parent") {
      const kids = await Kids.find({ creator: params.id });
      return new Response(JSON.stringify(kids), { status: 200 });
      //if its a child, we return all the kid, then we check the kid's creator and return all the kids created by that creator
    } else if (role === "child") {
      //   console.log(params.id, "params");

      const kid = await Kids.findById(params.id);
      // console.log(kid, "kids");

      if (!kid) {
        return new Response(JSON.stringify({ message: "Kid not found" }), {
          status: 404,
        });
      }
      const siblings = await Kids.find({ creator: kid.creator });
      return new Response(JSON.stringify(siblings), { status: 200 });
    } else {
      // If the user's role is neither parent nor kid, return an error response
      return new Response(JSON.stringify({ message: "Invalid user role" }), {
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "failed to fetch all Users" },
      { status: 500 }
    );
  }
};
