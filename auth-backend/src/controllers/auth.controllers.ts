import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { userSchema } from "../schemas/user.schema";
import { Request, Response } from "express";
import generateJwtAndSetCookie from "../utils/generateToken";

const signup = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;
    const result = userSchema.safeParse({ username, password });
    if (result.success) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userExists = await User.findOne({ username });
      if (userExists) {
        return res.json({ msg: "username in use" });
      } else {
        const createUser = await User.create({
          username,
          password: hashedPassword,
        });
        generateJwtAndSetCookie(createUser._id, res);
        res.status(201).json({ msg: "account created" });
      }
    } else {
      return res.status(400).json(result.error);
    }
  } catch (err) {
    res.status(500).json({ msg: `error occured : `, err });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;
    const result = userSchema.safeParse({ username, password });
    if (result.success) {
      const userExists = await User.findOne({ username });
      if (!userExists) {
        return res.status(401).json({ error: "username doesn't exist" });
      }
      //@ts-ignore
      const valid = await bcrypt.compare(password, userExists?.password);
      if (!valid) {
        return res.status(401).json({ erro: "wrong password" });
      }
      generateJwtAndSetCookie(userExists._id, res);
      res.status(200).json({ msg: "success" });
    } else {
      return res.status(400).json(result.error);
    }
  } catch (err) {
    res.status(500).json({ msg: `error occured : `, err });
  }
};

export default signup;
