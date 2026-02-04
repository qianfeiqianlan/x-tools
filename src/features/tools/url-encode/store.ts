/**
 * URL 编解码 - Store（纯前端，无 api）
 */
import { create } from "zustand";
import type { EncodeMode } from "./types";

type UrlEncodeState = {
  mode: EncodeMode;
  setMode: (mode: EncodeMode) => void;
  input: string;
  setInput: (v: string) => void;
  result: string;
  setResult: (v: string) => void;
};

export const useUrlEncodeStore = create<UrlEncodeState>((set) => ({
  mode: "encode",
  setMode: (mode) => set({ mode }),
  input: "",
  setInput: (input) => set({ input }),
  result: "",
  setResult: (result) => set({ result }),
}));
