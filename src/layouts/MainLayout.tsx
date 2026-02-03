/**
 * Main layout
 * - Header, Sidebar, Content
 * - 默认免登录访问；点击「登录」弹出登录模态框，登录后显示「退出登录」
 */
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store";
import { LoginModal } from "@/features/auth/components/LoginModal";
import { Button } from "@/components/Button";

export function MainLayout() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-4">
        <span className="font-medium text-slate-800">React AI Boilerplate</span>
        {token ? (
          <Button variant="ghost" onClick={logout}>
            退出登录
          </Button>
        ) : (
          <Button variant="primary" onClick={() => setLoginModalOpen(true)}>
            登录
          </Button>
        )}
      </header>
      <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      <div className="flex flex-1">
        <aside className="w-52 border-r border-slate-200 bg-slate-50 p-4">
          <nav className="space-y-1 text-sm">
            <a
              href="/"
              className="block rounded px-3 py-2 text-slate-700 hover:bg-slate-200"
            >
              用户列表
            </a>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
