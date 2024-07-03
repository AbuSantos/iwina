import BankDetails from "@/(models)/BankDetails";
import Kids from "@/(models)/Kids";
import { connectToDB } from "@/utils/database";
import innitMiddleware from "@/utils/initmiddleware";
import { NextRequest } from "next/server";
import Cors from "cors";

const cors = innitMiddleware(
  Cors({
    origin: "http://localhost:3001",
    methods: ["POST", "GET", "OPTIONS"],
  })
);
export const GET = async (req, { params }, res) => {
  await cors(req, res);

  try {
    await connectToDB();
    const { id } = params;
    const bank = await BankDetails.find({
      $or: [{ creator: id }, { _id: id }],
    }).populate("creator");

    return new Response(JSON.stringify(bank), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Failed to fetch Bank!" }), {
      status: 500,
    });
  }
};

export const OPTIONS = async (req, res) => {
  await cors(req, res);
  res.status(200).end();
};
