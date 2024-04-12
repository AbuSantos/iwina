const server = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

server.on("connection", (socket) => {
  // console.log(socket.id, "socket id");
  socket.on("send-message", (message) => {
    socket.broadcast.emit("receive-message", message);
    console.log(message);
  });
});

// module.exports = ioHandler;
