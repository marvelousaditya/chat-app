import { Schema, model } from "mongoose";

interface user {
  username: String;
  password: String;
}

const userSchema = new Schema<user>({
  username: { type: String, required: true, unique: true, min: 4 },
  password: { type: String, required: true, min: 8 },
});

export const User = model<user>("user", userSchema);
