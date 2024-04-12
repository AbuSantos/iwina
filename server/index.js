const server = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

server.on("connection", (socket) => {
  // console.log(socket.id, "socket id");
  socket.on("send-message", (message, room) => {
    server.emit("receive-message", message);
    if (room === "") {
    } else {
      server.to(room).emit("receive-message", message);
    }
    // console.log(room);
  });
});

// module.exports = ioHandler;
