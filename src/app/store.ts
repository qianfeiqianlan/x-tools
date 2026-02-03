/**
 * App-level store (optional)
 * - Prefer feature-owned stores; use this only for cross-feature app state
 */
import { create } from "zustand";

type AppState = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
