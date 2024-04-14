const { Server } = require("socket.io");

// Initialize the server on port 8080 and set up CORS policy
const server = new Server(8080, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

// Map of users to their respective rooms
const userRooms = {};

server.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

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
  socket.on("send-message", (message, roomId) => {
    console.log(`Received message: ${message} in room ${roomId}`);

    if (roomId && userRooms[socket.id] === roomId) {
      // Broadcast the message to the specified room
      socket.to(roomId).emit("receive-message", message);
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
