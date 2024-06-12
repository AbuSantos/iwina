import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("Yess");
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return Response.redirect("/error?message=No reference provided");
  }

  try {
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AUTH_KEYs}`,
        },
      }
    );

    if (paystackResponse.ok) {
      const responseData = await paystackResponse.json();

      if (responseData.data.status === "success") {
        // Handle successful payment (e.g., update user points, record transaction)
        return Response.redirect(new URL("/paystacksuccess", req.url));
      } else {
        // Handle unsuccessful payment
        return Response.redirect(new URL("/failure", req.url));
      }
    } else {
      const errorMessage = await paystackResponse.text();
      console.error(errorMessage);
      return Response.redirect(
        new URL("/error?message=Payment verification failed", req.url)
      );
    }
  } catch (error) {
    console.error("Error verifying Paystack transaction:", error);
    return Response.redirect(new URL("/error?message=Server error", req.url));
  }
};
