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
  const { id } = params;
  try {
    await connectToDB();
    const { account_number, email, user_name, bank_name, creator } =
      await req.json();
    console.log(account_number, email, creator);

    const bankDetails = await BankDetails.find({
      $or: [{ creator: id }, { _id: id }],
    });
    console.log(bankDetails[0]);
    if (!bankDetails) {
      return new Response(JSON.stringify({ message: "Bank not found!" }), {
        status: 404,
      });
    }

    // Update the bank details with the new data
    bankDetails[0].account_number = account_number;
    bankDetails[0].email = email;
    bankDetails[0].user_name = user_name;
    bankDetails[0].bank_name = bank_name;
    bankDetails[0].creator = creator;

    await bankDetails[0].save();

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

export const DELETE = async (req: NextRequest, { params }) => {
  const { id } = params;
  try {
    await connectToDB();
    await BankDetails.findByIdAndDelete(id);

    return Response.json(
      { message: "Task deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Failed to delete Task" }, { status: 201 });
  }
};
