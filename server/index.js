import { Messages } from "../(models)/Message.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { Location } from "../(models)/Location.js";
import User from "../(models)/User.js";
import Kids from "../(models)/Kids.js";

// Initialize the server on port 8080 and set up CORS policy
const server = new Server(8080, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    const mongoUri =
      "mongodb+srv://abusomwansantos:ge9px6ar1Xf9Wzb4@cluster0.ak2puyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    if (!mongoUri) {
      console.log("Mongo uri isnt define");
    }

    await mongoose.connect(`${mongoUri}`, {
      dbName: "iwina",
      bufferCommands: true, // Disable command buffering
      socketTimeoutMS: 10000,
    });
  } catch (error) {
    console.log(error);
  }
};
// Map of users to their respective rooms
const userRooms = {};
const commentRooms = {};
const userLocations = {};

server.on("connection", async (socket) => {
  await connectDB();
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

  socket.on("join-comment", (user, parent, roomId) => {
    console.log(roomId, "room");
    if (user && parent && roomId) {
      socket.join(roomId);
      commentRooms[socket.io] = roomId;
      // console.log(`${socket.id} joined ${roomId}`);
    } else {
      console.log("User Id, room Id or Parent Id missing");
    }
  });

  socket.on("join-location", (userId, familyLocationId) => {
    if (userId && familyLocationId) {
      socket.join(familyLocationId);

      // Map the user to the location
      userLocations[socket.id] = familyLocationId;
      // console.log(`${socket.id} joined ${familyLocationId}`);
    } else {
      console.log("User ID or location ID missing");
    }
  });

  // Handle sending messages to a room
  socket.on("send-message", async (message, roomId, userId) => {
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
      socket.to(roomId).emit("receive-message", message, userId);
      // console.log(userId, "userId");
      socket.emit("receive-message", message, userId);
    } else {
      console.log(`User ${socket.id} not in room ${roomId}`);
    }
  });

  socket.on("send-comment", (message, user, parent, roomId) => {
    // we check if we've roomId, then we check if the id is in the commentroom
    if (roomId && commentRooms[socket.io] === roomId) {
      socket.to(roomId).emit("receive-comment", message, user, parent);
      socket.emit("receive-comment", message, user, parent);
    } else {
      console.log(`User ${socket.id} not in room ${roomId}`);
    }
  });

  socket.on(
    "coordinates",
    async (
      familyLocationId,
      longitude,
      latitude,
      accuracy,
      userId,
      username
    ) => {
      // console.log(`User ${socket.id} is in room ${familyLocationId}`);
      let user;

      if (familyLocationId === userId) {
        user = await User.findById(familyLocationId);
      } else {
        user = await Kids.findById(userId);
      }

      // Create or update the location for the user
      await Location.findOneAndUpdate(
        { user },
        {
          familyLocationId,
          username,
          latitude,
          longitude,
          accuracy,
          timestamp: Date.now(),
        },
        { upsert: true, new: true }
      );

      // await newLocation.save();

      // Process coordinates
      if (familyLocationId && userLocations[socket.id] === familyLocationId) {
        socket.to(familyLocationId).emit("receive-coordinates", {
          longitude,
          latitude,
          accuracy,
          userId,
          username,
        });

        console.log(longitude, latitude, "yes");

        socket.emit("receive-coordinates", {
          longitude,
          latitude,
          accuracy,
          userId,
          username,
        });
      } else {
        console.log(
          `User ${socket.id} not in location room ${familyLocationId}`
        );
      }
      // Store or use the coordinates as needed
    }
  );
});
