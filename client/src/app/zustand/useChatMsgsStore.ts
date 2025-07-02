import { create } from "zustand";

type msgs = {
  msg: string;
  sender: string;
  receiver: string;
  createdAt: Date;
};

type ChatMsgs = {
  chatMsgs: msgs[];
  updateChatMsgs: (chatMsgs: msgs[]) => void;
};

export const useChatMsgsStore = create<ChatMsgs>((set) => ({
  chatMsgs: [],
  updateChatMsgs: (chatMsgs) => set({ chatMsgs: chatMsgs }),
}));
