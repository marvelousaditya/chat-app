import express from "express";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const server = http.createServer(http);

dotenv.config();
const PORT = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

io.on("connection", (socket) => {
  console.log("client connected");
  socket.on("message", (message) => {
    console.log("message recieved : ", message);
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("this is a chat app");
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
