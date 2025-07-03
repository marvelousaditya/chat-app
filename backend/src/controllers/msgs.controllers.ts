import { Request, Response } from "express";
import conversation from "../models/chat.model";

type Msg = {
  msg: string;
  sender: string;
  receiver: string;
};

export const addMsgsToConversation = async (
  participants: string[],
  msg: Msg
) => {
  try {
    let convs = await conversation.findOne({
      users: { $all: participants },
    });

    if (!convs) convs = await conversation.create({ users: participants });
    convs.msgs.push(msg);
    await convs.save();
  } catch (err: any) {
    console.log("error : ", err.message);
  }
};

export const getMsgsForConversation = async (req: any, res: any) => {
  try {
    const { sender, receiver } = req.query;  
    const convs = await conversation.findOne({
      users: { $all: [sender, receiver] },
    });
    if (!convs) {
      return res.status(409).json({ error: "no conversation" });
    }
    return res.status(200).json(convs.msgs);
  } catch (err: any) {
    console.log("error : ", err.message);
  }
};
