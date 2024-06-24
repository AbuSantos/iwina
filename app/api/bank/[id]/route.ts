import BankDetails from "@/(models)/BankDetails";
import Kids from "@/(models)/Kids";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { id } = params;
    console.log(id, "id");

    const bank = await BankDetails.find({
      $or: [{ creator: id }, { _id: id }],
    });

    return new Response(JSON.stringify(bank), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Failed to fetch Bank!" }), {
      status: 500,
    });
  }
};
