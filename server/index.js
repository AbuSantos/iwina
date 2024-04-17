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

server.on("connection", (socket) => {
  // console.log(`User connected: ${socket.id}`);

  // Handle users joining a room
  socket.on("join-room", (userId, familyRoomId) => {
    if (userId && familyRoomId) {
      // Add the user to the specified room
      socket.join(familyRoomId);
      console.log(`User ${userId} joined room ${familyRoomId}`);

      // Map the user to the room
      userRooms[socket.id] = familyRoomId;
    } else {
      console.log("User ID or room ID missing");
    }
  });

  // Handle sending messages to a room
  socket.on("send-message", async (message, roomId, userId) => {
    mongoose.set("strictQuery", true);
    try {
      const mongoUri =
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
    console.log(newMessage.roomId, "roomId");
    await newMessage.save();

    if (roomId && userRooms[socket.id] === roomId) {
      // Broadcast the message to the specified room
      socket.to(roomId).emit("receive-message", message);

      socket.emit("receive-message", message);
    } else {
      console.log(`User ${socket.id} not in room ${roomId}`);
    }
  });

  // Handle user disconnecting
  // socket.on("disconnect", () => {
  //   console.log(`User disconnected: ${socket.id}`);

  //   // Remove the user from the room map
  //   delete userRooms[socket.id];
  // });
});
