/**
 * 在线文本对比 - Types
 */
export type DiffLine = {
  type: "add" | "remove" | "same";
  text: string;
  lineA?: number;
  lineB?: number;
};
