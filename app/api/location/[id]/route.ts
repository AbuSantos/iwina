import { Location } from "@/(models)/Location";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
interface Params {
  id: string;
}
export const POST = async (req: NextRequest) => {
  await connectToDB();
  try {
    const { latitude, longitude, accuracy, familyLocationId, userId } =
      await req.json();
    console.log(latitude, familyLocationId, "location");

    // const location = new Location({
    //   user: userId,
    //   latitude,
    //   longitude,
    //   accuracy,
    //   familyLocationId,
    // });
    // return new Response(JSON.stringify(location), { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to create a new task!" },
      { status: 500 }
    );
  }
};
