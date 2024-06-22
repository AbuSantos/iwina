import BankDetails from "@/(models)/BankDetails";
import Kids from "@/(models)/Kids";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

type bankDetailsType = {
  account_number: number;
  email: string;
  user_name: string;
  creator: string;
  bank_name: string;
};

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    const { account_number, email, user_name, bank_name, creator } = req.json();
    const { id } = params;

    const bankDetails = await BankDetails.find({
      $or: [{ creator: id }, { _id: id }],
    });

    if (!bankDetails) {
      return new Response(JSON.stringify({ message: "Bank not found!" }), {
        status: 404,
      });
    }

    // Update the bank details with the new data
    bankDetails.account_number = account_number;
    bankDetails.email = email ;
    bankDetails.user_name = user_name ;
    bankDetails.bank_name = bank_name ;
    bankDetails.creator = creator ;

    await bankDetails.save();

    return new Response(
      JSON.stringify({ message: "Bank Details Successfully Updated!" }),
      { status: 201 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: "Failed to fetch Bank!" }), {
      status: 500,
    });
  }
};
