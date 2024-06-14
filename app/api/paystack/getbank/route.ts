import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const banksResponse = await fetch("https://api.paystack.co/bank", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AUTH_KEYs}`,
      },
    });

    if (banksResponse.ok) {
      const banksData = await banksResponse.json();
      return new Response(
        JSON.stringify({ status: "success", banks: banksData.data }),
        { status: 200 }
      );
    } else {
      const errorMessage = await banksResponse.text();
      const errorObject = JSON.parse(errorMessage);
      return new Response(
        JSON.stringify({ status: banksResponse.status, error: errorObject }),
        {
          status: banksResponse.status,
        }
      );
    }
  } catch (error) {}
};
