import BankDetails from "@/(models)/BankDetails";
import Kids from "@/(models)/Kids";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    const { account_number, email, user_name, bank_name, creator } = req.json();
    const { id } = params;

    const bankDetails = await BankDetails.find({
      $or: [{ creator: id }, { _id: id }],
    });

    if (!bankDetails) {
      return new Response(
        JSON.stringify({ message: "Bank not found!" }),
        { status: 404 }
      );
    }

    // Update the bank details with the new data
    bankDetails.account_number = account_number 
    bankDetails.email = email || bankDetails.email;
    bankDetails.user_name = user_name || bankDetails.user_name;
    bankDetails.bank_name = bank_name || bankDetails.bank_name;
    bankDetails.creator = creator || bankDetails.creator;

    await bankDetails.save();

    return Response.json({ message: "Bank Details Successfully Updated!" });
  } catch (err) {
    return Response.json({ message: "Failed to fetch Bank!" }, { status: 500 });
  }
};
