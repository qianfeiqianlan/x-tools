/**
 * JSON 格式化 - Store（纯前端）
 */
import { create } from "zustand";
import type { JsonViewMode, JsonError } from "./types";

type JsonFormatState = {
  input: string;
  setInput: (v: string) => void;
  output: string;
  setOutput: (v: string) => void;
  viewMode: JsonViewMode;
  setViewMode: (v: JsonViewMode) => void;
  error: JsonError;
  setError: (v: JsonError) => void;
};

export const useJsonFormatStore = create<JsonFormatState>((set) => ({
  input: "",
  setInput: (input) => set({ input }),
  output: "",
  setOutput: (output) => set({ output }),
  viewMode: "formatted",
  setViewMode: (viewMode) => set({ viewMode }),
  error: null,
  setError: (error) => set({ error }),
}));
