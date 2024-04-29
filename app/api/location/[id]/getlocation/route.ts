import { Location } from "@/(models)/Location";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
interface Params {
  id: string;
}
export const GET = async (req: NextRequest, { params }: { params: Params }) => {
//   console.log(params.id, "params");

  try {
    await connectToDB();
    const location = await Location.find({ familyLocationId: params.id });
    // console.log(location);
    
    return new Response(JSON.stringify(location), { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch location!" },
      { status: 500 }
    );
  }
};
