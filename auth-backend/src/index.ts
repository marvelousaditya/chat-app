import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import connectToMongoDb from "./db/connectToMongoDb";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/users.routes";
dotenv.config();
const PORT = process.env.PORT || 6000;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
  })
);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  connectToMongoDb();
  console.log("listening on port : ", PORT);
});
