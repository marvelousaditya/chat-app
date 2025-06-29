import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import connection from "./db/connection";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 6000;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);

app.listen(PORT, () => {
  connection();
  console.log("listening on port : ", PORT);
});
