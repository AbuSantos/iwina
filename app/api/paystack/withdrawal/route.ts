import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, name, account_number, bank_code, amount } = await req.json();




  try {
    const paystackResponse = await fetch(
      "https://api.paystack.co/transferrecipient",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AUTH_KEYs}`,
        },
        body: JSON.stringify({
          type: "nuban",
          name,
          account_number,
          bank_code,
          currency: "NGN",
          email,
        }),
      }
    );

    if (!paystackResponse.ok) {
      const errorMessage = await paystackResponse.text();
      const errorObject = JSON.parse(errorMessage);
      return new Response(
        JSON.stringify({ status: paystackResponse.status, error: errorObject }),
        {
          status: paystackResponse.status,
        }
      );
    }

    const recipientData = await paystackResponse.json();
    const recipient_code = recipientData.data.recipient_code;

    //intitiating the transfer
    const transferResponse = await fetch("https://api.paystack.co/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AUTH_KEYs}`,
      },
      body: JSON.stringify({
        source: "balance",
        reason: "Withdrawal",
        amount: amount * 100, // convert to kobo
        recipient: recipient_code,
      }),
    });

    const transactionData = await transferResponse.json();
    console.log(transactionData);

    // return new Response(
    //   JSON.stringify({
    //     status: "success",
    //     balance: balanceData.data,
    //     transactions: transactionData.data,
    //   }),
    //   {
    //     status: 200,
    //   }
    // );
    return new Response(
      JSON.stringify({ status: "success", data: transactionData.data }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating Paystack recipient:", error);

    return new Response("An error occurred while processing your request.", {
      status: 500,
    });
  }
};
