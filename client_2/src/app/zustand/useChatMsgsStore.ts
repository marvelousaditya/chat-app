import { create } from "zustand";

type Msg = {
  msg: string;
  sender: string;
  receiver: string;
  _id?: string;
  createdAt?: string;
};
type ChatMsgsStore = {
  chatMsgs: Msg[];
  updateChatMsgs: (chatMsgs: Msg[] | ((prev: Msg[]) => Msg[])) => void;
};

export const useChatMsgsStore = create<ChatMsgsStore>((set) => ({
  chatMsgs: [],
  updateChatMsgs: (chatMsgs) =>
    set((state) => ({
      chatMsgs:
        typeof chatMsgs === "function" ? chatMsgs(state.chatMsgs) : chatMsgs,
    })),
}));
