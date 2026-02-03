/**
 * Auth Feature - Store
 * - Token state + persistence via lib/storage
 */
import { create } from "zustand";
import { getToken, setToken as persistToken, clearToken } from "@/lib/storage";

type AuthState = {
  token: string | null;
  setToken: (t: string) => void;
  logout: () => void;
  hydrate: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: getToken(),
  setToken: (t) => {
    persistToken(t);
    set({ token: t });
  },
  logout: () => {
    clearToken();
    set({ token: null });
  },
  hydrate: () => set({ token: getToken() }),
}));
