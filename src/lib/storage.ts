/**
 * Browser storage helpers
 * - Token persistence for auth
 * - Theme persistence for dark mode
 */
const TOKEN_KEY = "auth_token";
const THEME_KEY = "theme";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export type Theme = "light" | "dark";

export function getTheme(): Theme {
  const v = localStorage.getItem(THEME_KEY);
  return v === "dark" || v === "light" ? v : "light";
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme);
}

/** 最近使用工具（path 列表，最多 10 个） */
const RECENT_TOOLS_KEY = "recent_tools";
const RECENT_MAX = 10;

export function getRecentToolPaths(): string[] {
  try {
    const v = localStorage.getItem(RECENT_TOOLS_KEY);
    return v ? (JSON.parse(v) as string[]) : [];
  } catch {
    return [];
  }
}

export function addRecentToolPath(path: string): void {
  const list = getRecentToolPaths().filter((p) => p !== path);
  list.unshift(path);
  localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(list.slice(0, RECENT_MAX)));
}
