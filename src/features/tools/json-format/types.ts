/**
 * JSON 格式化 - Types
 */
export type JsonViewMode = "formatted" | "compressed";

export type JsonError = {
  message: string;
  line?: number;
  column?: number;
} | null;
