import { create } from "zustand";

type ChatReceiver = {
  receiver: string;
  updateReceiver: (receiver: string) => void;
};

export const useChatReceiver = create<ChatReceiver>((set) => ({
  receiver: "",
  updateReceiver: (receiver) => set({ receiver: receiver }),
}));
