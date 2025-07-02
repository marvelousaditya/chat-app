import { model, Schema } from "mongoose";

const msgSchema = new Schema({
  msg: { type: String, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

// const Msg = model("Msg", msgSchema);

const conversationSchema = new Schema({
  users: [{ type: String, required: true }],
  msgs: [msgSchema],
});

const conversation = model("Conversation", conversationSchema);

export default conversation;
