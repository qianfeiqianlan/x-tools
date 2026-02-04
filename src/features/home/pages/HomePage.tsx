/**
 * 首页 - 常用工具 + 搜索栏 + 工具卡片网格（Heroicons，圆角白卡 + 彩色图标）
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  LinkIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  ClockIcon,
  CubeIcon,
  GiftIcon,
  StarIcon,
  SparklesIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { TOOLS, searchTools, type ToolItem } from "@/lib/tools";

const GRID_SIZE = 10;

const TOOL_ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "/tools/url-encode": LinkIcon,
  "/tools/json-format": DocumentTextIcon,
  "/tools/text-diff": Squares2X2Icon,
  "/tools/world-time": ClockIcon,
};

const TOOL_ICON_COLORS: Record<string, string> = {
  "/tools/url-encode": "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  "/tools/json-format": "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  "/tools/text-diff": "bg-pink-500/15 text-pink-600 dark:text-pink-400",
  "/tools/world-time": "bg-orange-500/15 text-orange-600 dark:text-orange-400",
};

const PLACEHOLDER_ICONS = [CubeIcon, GiftIcon, StarIcon, SparklesIcon, HeartIcon];
const PLACEHOLDER_COLORS = [
  "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  "bg-red-500/15 text-red-600 dark:text-red-400",
  "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  "bg-green-500/15 text-green-600 dark:text-green-400",
  "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  "bg-pink-500/15 text-pink-600 dark:text-pink-400",
];

export function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const results = searchTools(search);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const first = results[0];
    if (first) navigate(first.path);
  }

  const gridItems: (ToolItem & { placeholder?: boolean })[] = [...TOOLS];
  while (gridItems.length < GRID_SIZE) {
    gridItems.push({
      path: "",
      name: "敬请期待",
      category: "encode",
      keywords: [],
      placeholder: true,
    } as ToolItem & { placeholder?: boolean });
  }
  const displayGrid = gridItems.slice(0, GRID_SIZE);

  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-[var(--bg)] to-[var(--card-bg)]/50">
      <div className="flex-1 px-4 py-8 md:px-8">
        <h1 className="mb-5 text-lg font-bold text-[var(--text)]">
          常用工具
        </h1>

        <div className="relative mb-8">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 shadow-sm transition focus-within:border-[var(--accent)] focus-within:ring-2 focus-within:ring-[var(--accent)]/20"
          >
            <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-[var(--text-secondary)]" />
            <input
              type="search"
              placeholder="搜索工具, 如 json, url, 对比"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-3 w-full bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-secondary)] focus:outline-none"
            />
          </form>
          {search.trim() && (
            <ul className="absolute left-0 right-0 top-full z-10 mt-2 max-h-56 overflow-auto rounded-xl border border-[var(--border)] bg-[var(--card-bg)] py-2 shadow-lg">
              {results.length === 0 ? (
                <li className="px-4 py-3 text-sm text-[var(--text-secondary)]">无匹配</li>
              ) : (
                results.slice(0, 8).map((t) => (
                  <li key={t.path}>
                    <button
                      type="button"
                      className="w-full px-4 py-2.5 text-left text-sm text-[var(--text)] hover:bg-[var(--border)]"
                      onClick={() => navigate(t.path)}
                    >
                      {t.name}
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {displayGrid.map((item, i) => {
            if (item.path && !item.placeholder) {
              const Icon = TOOL_ICON_MAP[item.path] ?? CubeIcon;
              const colorClass = TOOL_ICON_COLORS[item.path] ?? "bg-slate-500/15 text-slate-600";
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-sm transition hover:border-[var(--accent)]/50 hover:shadow-md"
                >
                  <span
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${colorClass}`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <span className="text-center text-sm font-medium text-[var(--text)]">
                    {item.name}
                  </span>
                </button>
              );
            }
            const PlaceholderIcon = PLACEHOLDER_ICONS[i % PLACEHOLDER_ICONS.length];
            const colorClass = PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length];
            return (
              <div
                key={`placeholder-${i}`}
                className="flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-sm"
              >
                <span
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${colorClass}`}
                >
                  <PlaceholderIcon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <span className="text-center text-sm font-medium text-[var(--text-secondary)]">
                  敬请期待
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <footer className="border-t border-[var(--border)] px-4 py-4 text-center text-sm text-[var(--text-secondary)]">
        ©2024 ToolSite
      </footer>
    </div>
  );
}
