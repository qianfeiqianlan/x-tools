/**
 * Main layout - 顶栏：汉堡菜单 + Tools + 分类 Tabs（激活蓝线）+ 右侧搜索 + 深色模式
 */
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { MagnifyingGlassIcon, Bars3Icon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { addRecentToolPath } from "@/lib/storage";
import { useAppStore } from "@/app/store";
import { TOOL_CATEGORIES, TOOLS, searchTools } from "@/lib/tools";

function getActiveCategory(pathname: string): string | null {
  const tool = TOOLS.find((t) => t.path === pathname);
  return tool ? tool.category : null;
}

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);

  const activeCategory = getActiveCategory(location.pathname);
  const searchResults = searchTools(searchQuery);

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/tools/") && path !== "/tools/") {
      addRecentToolPath(path);
    }
  }, [location.pathname]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const first = searchResults[0];
    if (first) navigate(first.path);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--card-bg)] shadow-sm">
        <div className="flex h-14 items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text)]"
              title={sidebarOpen ? "收起侧栏" : "展开侧栏"}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <a
              href="/"
              className="shrink-0 text-lg font-semibold text-[var(--text)] hover:text-[var(--accent)]"
            >
              Tools
            </a>
          </div>

          <nav className="hidden flex-1 justify-center gap-1 md:flex">
            {TOOL_CATEGORIES.map((c) => {
              const isActive = activeCategory === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => {
                    const t = TOOLS.find((x) => x.category === c.key);
                    if (t) navigate(t.path);
                  }}
                  className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text)]"
                  }`}
                >
                  {c.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)]"
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <form
            onSubmit={handleSearchSubmit}
            className="flex max-w-[200px] flex-1 items-center rounded-lg border border-[var(--border)] bg-[var(--input-bg)] px-3 py-2 focus-within:border-[var(--accent)] md:max-w-[240px]"
          >
            <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-[var(--text-secondary)]" />
            <input
              type="search"
              placeholder="搜索工具"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 w-full bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-secondary)] focus:outline-none"
            />
          </form>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--border)]"
            title={theme === "dark" ? "浅色模式" : "深色模式"}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside
          className={`${
            sidebarOpen ? "w-52" : "w-0 overflow-hidden"
          } shrink-0 border-r border-[var(--border)] bg-[var(--card-bg)] transition-all`}
        >
          <div className="w-52 p-4">
            <button
              type="button"
              className="mb-3 text-sm text-[var(--text-secondary)] hover:text-[var(--text)]"
              onClick={() => setSidebarOpen(false)}
            >
              收起侧栏
            </button>
            {TOOL_CATEGORIES.map((c) => (
              <div key={c.key} className="mb-4">
                <div className="mb-1 text-xs font-medium text-[var(--text-secondary)]">
                  {c.label}
                </div>
                <nav className="space-y-0.5">
                  {TOOLS.filter((t) => t.category === c.key).map((t) => (
                    <a
                      key={t.path}
                      href={t.path}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(t.path);
                      }}
                      className={`block rounded-lg px-3 py-2 text-sm ${
                        location.pathname === t.path
                          ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "text-[var(--text)] hover:bg-[var(--border)]"
                      }`}
                    >
                      {t.name}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </aside>
        <main className="min-w-0 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
