const express = require("express");
const socket = require("socket.io");
const app = express();
var PORT = process.env.PORT || 5000;

app.use(express.static("public"));

//Run the server
const server = app.listen(PORT, () => {
  console.log("Server running at" + PORT);
});

// setup sockets
const io = socket(server);

app.get("/:roomno", (req, res) => {
  res.send(req.params.roomno)
})

io.on("connection", (socket) => {
  console.log("Connected");
  socket.on("update", (data) => {
    console.log(data);
    socket.broadcast.emit("update", data);
  });
  socket.on("play", () => {
    socket.broadcast.emit("play");
  });
  socket.on("pause", () => {
    socket.broadcast.emit("pause");
  });
  socket.on("slider", (data) => {
    socket.broadcast.emit("slider", data);
  });
});
