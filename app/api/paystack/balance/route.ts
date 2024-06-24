import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const paystackResponse = await fetch("https://api.paystack.co/balance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AUTH_KEYs}`,
      },
    });

    if (paystackResponse.ok) {
      const responseData = await paystackResponse.json();
      console.log(responseData);

      return new Response(
        JSON.stringify({ status: "success", balance: responseData.data }),
        {
          status: 200,
        }
      );
    } else {
      const errorMessage = await paystackResponse.text();
      const errorObject = JSON.parse(errorMessage);
      return new Response(
        JSON.stringify({ status: paystackResponse.status, error: errorObject }),
        {
          status: paystackResponse.status,
        }
      );
    }
  } catch (error) {
    console.error("Error checking Paystack balance:", error);

    return new Response("An error occurred while processing your request.", {
      status: 500,
    });
  }
};
