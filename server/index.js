import { Messages } from "../(models)/Message.js";
import { Server } from "socket.io";
import mongoose from "mongoose";

// Initialize the server on port 8080 and set up CORS policy
const server = new Server(8080, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

// Map of users to their respective rooms
const userRooms = {};
const userLocations = {};

server.on("connection", (socket) => {
  // Handle users joining a room
  socket.on("join-room", (userId, familyRoomId) => {
    if (userId && familyRoomId) {
      // Add the user to the specified room
      socket.join(familyRoomId);
      // Map the user to the room
      userRooms[socket.id] = familyRoomId;
    } else {
      console.log("User ID or room ID missing");
    }
  });

  socket.on("join-location", (userId, familyId) => {
    if (userId && familyId) {
      socket.join(familyId);

      // Map the user to the location
      userLocations[socket.id] = familyId;
      console.log(userLocations[socket.id], "location");
    } else {
      console.log("User ID or location ID missing");
    }
  });

  // Handle sending messages to a room
  socket.on("send-message", async (message, roomId, userId) => {
    mongoose.set("strictQuery", true);
    try {
      const mongoUri =
        "mongodb+srv://abusomwansantos:ge9px6ar1Xf9Wzb4@cluster0.ak2puyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
      if (!mongoUri) {
        console.log("Mongo uri isnt define");
      }

      await mongoose.connect(`${mongoUri}`, {
        dbName: "iwina",
        bufferCommands: false, // Disable command buffering
        socketTimeoutMS: 10000,
      });
    } catch (error) {
      console.log(error);
    }
    // console.log(userId);

    // await connectToDB();
    const newMessage = new Messages({
      roomId: roomId,
      message: message,
      creator: userId,
    });
    // console.log(newMessage.roomId, "roomId");
    await newMessage.save();

    if (roomId && userRooms[socket.id] === roomId) {
      // Broadcast the message to the specified room
      socket.to(roomId).emit("receive-message", message);

      socket.emit("receive-message", message);
    } else {
      console.log(`User ${socket.id} not in room ${roomId}`);
    }
  });

  socket.on("coordinates", async (familyId, longitude, latitude, accuracy) => {
    console.log(userLocations[socket.id], "userlocatuion socket");

    // Process coordinates
    if (familyId && userLocations[socket.id] === familyId) {
      socket
        .to(familyId)
        .emit("receive-coordinates", longitude, latitude, accuracy);
    } else {
      console.log(`User ${socket.id} not in location room ${familyId}`);
    }
    // Store or use the coordinates as needed
  });
});
