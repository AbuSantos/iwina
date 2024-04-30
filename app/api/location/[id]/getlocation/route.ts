import { Location } from "@/(models)/Location";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";
interface Params {
  id: string;
}
export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  //   console.log(params.id, "params");
  try {
    //connnecting to the database
    await connectToDB();

    // Aggregate pipeline to group locations by user and select the latest location for each user
    const location = await Location.aggregate([
      //filter by family location ID
      { $match: { familyLocationId: params.id } },
      // Sort locations by timestamp in descending order
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$user", // Group by user
          latitude: { $first: "$latitude" }, // Select latitude of latest location
          longitude: { $first: "$longitude" }, // Select longitude of latest location
          accuracy: { $first: "$accuracy" }, // Select accuracy of latest location
          timestamp: { $first: "$timestamp" }, // Select timestamp of latest location
        },
      },
    ]);
    // const location = await Location.find({ familyLocationId: params.id });
    // console.log(location);

    return new Response(JSON.stringify(location), { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch location!" },
      { status: 500 }
    );
  }
};
