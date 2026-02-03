/**
 * App router
 * - 默认免登录访问；/ 使用 MainLayout，点击「登录」在布局内弹出登录模态框
 * - /login 保留为独立登录页（可选，如从外链进入）
 */
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { MainLayout } from "@/layouts/MainLayout";
import { UserListPage } from "@/features/user/pages/UserListPage";

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<UserListPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
