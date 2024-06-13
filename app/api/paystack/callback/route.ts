import { NextRequest, NextResponse } from "next/server";
import User from "@/(models)/User";

export const GET = async (req: NextRequest) => {
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
        const email = responseData.data.customer.email;
        const pointAmount = responseData.data.amount;

        console.log(pointAmount);
        const user = await User.findOneAndUpdate(
          { email: email },
          { $inc: { points: pointAmount } },
          { new: true }
        );

        if (!user) {
          return Response.redirect(
            new URL("/error?message=User not found", req.url)
          );
        }
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
