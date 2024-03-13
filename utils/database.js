import mongoose from "mongoose";

//creating a a connection state and track connection status
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); //Ensure that the query shape matches the query shape in the model state object

  if (isConnected) {
    console.log("Mongoose Already Connected");
    return; //to stop it from reconnecting
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("Mongo Connected");
    
  } catch (error) {
    console.log(error.message);
  }
};
