/**
 * 工具列表配置 - 导航、侧栏、首页快捷入口、搜索
 * 与 .ai/40-product-requirements.md 工具分类一致
 */
export type ToolCategory = "encode" | "format" | "text" | "time";

export type ToolItem = {
  path: string;
  name: string;
  category: ToolCategory;
  /** 搜索用关键词，模糊匹配 */
  keywords: string[];
};

export const TOOL_CATEGORIES: { key: ToolCategory; label: string }[] = [
  { key: "encode", label: "编码解码" },
  { key: "format", label: "数据格式化" },
  { key: "text", label: "文本处理" },
  { key: "time", label: "时间工具" },
];

export const TOOLS: ToolItem[] = [
  {
    path: "/tools/url-encode",
    name: "URL 编解码",
    category: "encode",
    keywords: ["url", "encode", "decode", "编码", "解码"],
  },
  {
    path: "/tools/json-format",
    name: "JSON 格式化",
    category: "format",
    keywords: ["json", "格式化", "压缩", "校验"],
  },
  {
    path: "/tools/text-diff",
    name: "在线文本对比",
    category: "text",
    keywords: ["文本", "对比", "diff", "比较"],
  },
  {
    path: "/tools/world-time",
    name: "世界时间",
    category: "time",
    keywords: ["时间", "时区", "world", "time"],
  },
];

/** 首页常用工具快捷入口（取前 4 个） */
export const SHORTCUT_TOOLS = TOOLS.slice(0, 4);

/** 按关键词模糊搜索工具，返回匹配的 path */
export function searchTools(query: string): ToolItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return TOOLS;
  return TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.toLowerCase().includes(q))
  );
}
