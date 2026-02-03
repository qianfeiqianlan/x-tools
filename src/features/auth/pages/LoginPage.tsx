/**
 * Auth Feature - Login Page (full-page fallback, e.g. direct /login)
 */
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-800 mb-6">登录</h1>
        <LoginForm onSuccess={() => navigate("/", { replace: true })} />
      </div>
    </div>
  );
}
