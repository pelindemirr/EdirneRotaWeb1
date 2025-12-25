import { create } from "zustand";

interface RegisterState {
  isRegistered: boolean;
  user: {
    fullname: string;
    email: string;
  } | null;
  register: (fullname: string, email: string) => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  isRegistered: false,
  user: null,
  register: (fullname, email) =>
    set({ isRegistered: true, user: { fullname, email } }),
  reset: () => set({ isRegistered: false, user: null }),
}));
