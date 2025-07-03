import { create } from "zustand";

type User = {
  id: string;
  username: string;
};

type UsersStore = {
  users: User[];
  updateUsersStore: (users: User[]) => void;
};

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  updateUsersStore: (users) => set({ users: users }),
}));
