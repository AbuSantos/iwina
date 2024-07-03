import BankDetails from "@/(models)/BankDetails";
import Kids from "@/(models)/Kids";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import initMiddleware from "@/utils/initmiddleware";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await connectToDB();
  const { account_number, email, user_name, creator, bank_name } =
    await req.json();

  const kid = await Kids.findById(creator);
  console.log(kid);
  try {
    const bankDetails = new BankDetails({
      account_number,
      email,
      user_name,
      bank_name,
      creator,
    });
    kid.BankDetails.push(bankDetails.id);

    await kid.save();
    await bankDetails.save();

    return Response.json({ message: "New Goal created successfully" });
  } catch (error) {
    console.error("Error Adding Bank:", error);
    // Return error response with detailed message
    return Response.json({ message: "Failed to add Bank!" }, { status: 500 });
  }
};
