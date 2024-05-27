import { connectToDB } from "@/utils/database";

export const PATCH = async () => {
  try {
    await connectToDB();

    
  } catch (error) {}
};
