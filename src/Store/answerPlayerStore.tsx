// answeredUsersStore.js
import { create } from 'zustand';

interface IAnsweredUsersStore {
  answeredUsers: string[];
  addAnsweredUser: (user: string) => void;
  resetAnsweredUsers: () => void;
}

const useAnsweredUsersStore = create<IAnsweredUsersStore>((set) => ({
  answeredUsers: [],
  addAnsweredUser: (user) => set((state) => ({ answeredUsers: [...state.answeredUsers, user] })),
  resetAnsweredUsers: () => set({ answeredUsers: [] }),
}));

export default useAnsweredUsersStore;
