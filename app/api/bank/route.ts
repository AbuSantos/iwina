import BankDetails from "@/(models)/BankDetails";
import Kids from "@/(models)/Kids";
import User from "@/(models)/User";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectToDB();
  const { account_number, email, user_name, creator, bank_name } =
    await req.json();

  console.log(account_number, email, user_name, creator, bank_name);
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
    return Response.json(
      { message: "Failed to add Bank!", error: error.message },
      { status: 500 }
    );
  }
};
