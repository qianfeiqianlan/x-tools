/**
 * User Feature - Store
 * - User list and related UI state
 */
import { create } from "zustand";
import type { User } from "./types";

type UserState = {
  list: User[];
  setList: (list: User[]) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
};

export const useUserStore = create<UserState>((set) => ({
  list: [],
  setList: (list) => set({ list }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
