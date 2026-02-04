/**
 * App router
 * - / 首页；/tools/* 工具页；/login 独立登录页
 */
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/features/home/pages/HomePage";
import { UrlEncodePage } from "@/features/tools/url-encode/pages/UrlEncodePage";
import { JsonFormatPage } from "@/features/tools/json-format/pages/JsonFormatPage";
import { TextDiffPage } from "@/features/tools/text-diff/pages/TextDiffPage";
import { WorldTimePage } from "@/features/tools/world-time/pages/WorldTimePage";

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tools/url-encode" element={<UrlEncodePage />} />
        <Route path="tools/json-format" element={<JsonFormatPage />} />
        <Route path="tools/text-diff" element={<TextDiffPage />} />
        <Route path="tools/world-time" element={<WorldTimePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
