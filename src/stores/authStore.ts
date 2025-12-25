// Basit bir auth store örneği (zustand ile)
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  email: null,
  login: (email) => set({ isLoggedIn: true, email }),
  logout: () => set({ isLoggedIn: false, email: null }),
}));
