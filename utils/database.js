import clientPromise from "@/lib/db";
import mongoose from "mongoose";

//creating a a connection state and track connection status
let isConnected = false;

export const connectToDB = async () => {
  console.log("Connecting to MongoDB...");
  mongoose.set("strictQuery", true); //Ensure that the query shape matches the query shape in the model state object

  if (isConnected) {
    console.log("Mongoose Already Connected");
    return; //to stop it from reconnecting
  }

  if (process.env.NODE_ENV === "development") {
    if (global.isConnected) {
      console.log("Mongoose already connected (global)");
      return;
    }
  }

  try {
    // const mongoUri = process.env.MONGODB_URI;
    // if (!mongoUri) {
    //   console.log("Mongo Uri isnt defined");
    // }
    const client = await clientPromise;
    await mongoose.connect(client.s.url, {
      // await mongoose.connect(`${mongoUri}`, {
      dbName: "iwina",
      bufferCommands: true, // Disable command buffering
      serverSelectionTimeoutMS: 20000, // Example: Increase server selection timeout
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    if (process.env.NODE_ENV !== "production") {
      global.isConnected = true; // Track connection state globally in development
    }
    console.log("Mongo Connected");
  } catch (error) {
    console.log(error);
  }
};
