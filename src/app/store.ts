/**
 * App-level store
 * - Sidebar, theme (dark mode)
 */
import { create } from "zustand";
import { getTheme, setTheme as persistTheme, type Theme } from "@/lib/storage";

type AppState = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  theme: getTheme(),
  setTheme: (theme) => {
    persistTheme(theme);
    set({ theme });
    document.documentElement.classList.toggle("dark", theme === "dark");
  },
  toggleTheme: () => {
    set((s) => {
      const next = s.theme === "dark" ? "light" : "dark";
      persistTheme(next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return { theme: next };
    });
  },
}));
