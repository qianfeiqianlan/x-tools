/**
 * 在线文本对比 - Store（纯前端）
 */
import { create } from "zustand";

type TextDiffState = {
  textA: string;
  setTextA: (v: string) => void;
  textB: string;
  setTextB: (v: string) => void;
};

export const useTextDiffStore = create<TextDiffState>((set) => ({
  textA: "",
  setTextA: (textA) => set({ textA }),
  textB: "",
  setTextB: (textB) => set({ textB }),
}));
