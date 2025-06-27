import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { userSchema } from "../schemas/user.schema";
import { Request, Response } from "express";

const signup = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;
    const result = userSchema.safeParse({ username, password });
    if (result.success) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userExists = await User.findOne({ username });
      if (userExists) {
        return res.status(409).json({ msg: "username in use" });
      } else {
        const createUser = await User.create({
          username,
          password: hashedPassword,
        });
        res.status(201).json({ msg: "account created" });
      }
    } else {
      return res.status(400).json(result.error);
    }
  } catch (err) {
    res.status(500).json({ msg: `error occured : `, err });
  }
};

export default signup;
