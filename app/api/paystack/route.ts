import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  if (req.method === "POST") {
    const { email, pointAmount, emailredirect_url, points } = await req.json();

    try {
      const paystackResponse = await fetch(
        "https://api.paystack.co/transaction/initialize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.AUTH_KEYs}`,
          },
          body: JSON.stringify({
            email,
            amount: pointAmount * 100,
            callback_url: "http://localhost:3000/api/paystack/callback",
            // currency:"NGN"
          }),
        }
      );

      if (paystackResponse.ok) {
        const responseData = await paystackResponse.json();
        return Response.json({
          status: "success",
          authorization_url: responseData.data.authorization_url,
          // amount: responseData.data.amount,
        });
      } else {
        const errorMessage = await paystackResponse.text();
        const errorObject = JSON.parse(errorMessage); // Parse the error message into JSON
        return Response.json({
          status: paystackResponse.status.toString(),
          error: errorObject,
        });
      }
    } catch (error) {
      console.error("Error creating Paystack session:", error);

      return new Response("An error occurred while processing your request.", {
        status: 500,
      });
    }
  } else {
    return Response.json({ status: "405", error: "Method Not Allowed" });
  }
};
