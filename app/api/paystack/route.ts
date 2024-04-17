import User from "@/(models)/User";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  if (req.method === "POST") {
    const { userId, amount } = await req.json();

    try {
      const user = await User.findById(userId);
      if(!user){
        user 
      }

    } catch (error) {}
  }
};
