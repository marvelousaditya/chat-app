import { create } from "zustand";

type AuthStore = {
  authName: string;
  updateAuthName: (name: string) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  authName: "",
  updateAuthName: (name) => set({ authName: name }),
}));
