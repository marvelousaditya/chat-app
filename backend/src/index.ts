import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "http2";
import connectToMongoDb from "./db/connectToMongoDb";
const app = express();
const server = http.createServer(app);
import { addMsgsToConversation } from "./controllers/msgs.controllers";
import msgRouter from "./routes/msgs.routes";
dotenv.config();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use("/msgs", msgRouter);
const PORT = processcheck.env.PORT || 5000;
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
    methods: ["GET", "POST"],
  },
});

type UserSocketMap = {
  [username: string]: Socket;
};

const userSocketMap: UserSocketMap = {};
type Message = {
  textMsg: string;
  sender: string;
  receiver: string;
};
io.on("connection", (socket) => {
  const username = socket.handshake.query.username;
  console.log(`${username} connected`);
  if (typeof username === "string") userSocketMap[username] = socket;
  socket.on("chat msg", (message: Message) => {
    addMsgsToConversation([message.sender, message.receiver], {
      msg: message.textMsg,
      sender: message.sender,
      receiver: message.receiver,
    });
    // socket.broadcast.emit("chat msg", message.textMsg);
    const receiverSocket = userSocketMap[message.receiver];
    if (receiverSocket) receiverSocket.emit("chat msg", message);
    console.log("message recieved : ", message);
  });

  socket.on("disconnect", () => {
    console.log(`${username} disconnected`);
  });
});

app.get("/", (req, res) => {
  res.send("this is a chat app");
});

server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`listening on ${PORT}`);
});
