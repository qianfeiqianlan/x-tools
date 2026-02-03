/**
 * Auth Feature - Login form (reusable in page or modal)
 */
import { useState } from "react";
import { login } from "../api";
import { useAuthStore } from "../store";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

type LoginFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
};

export function LoginForm({ onSuccess, onCancel, showCancel }: LoginFormProps) {
  const setToken = useAuthStore((s) => s.setToken);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login({ username, password });
      const token = (res as { token: string }).token;
      setToken(token);
      onSuccess?.();
    } catch (err) {
      setError("登录失败，请检查用户名和密码");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="请输入用户名"
        autoComplete="username"
        required
      />
      <Input
        label="密码"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="请输入密码"
        autoComplete="current-password"
        required
      />
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <div className="flex gap-2 pt-1">
        {showCancel && onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
            取消
          </Button>
        )}
        <Button type="submit" className={showCancel ? "flex-1" : "w-full"} disabled={loading}>
          {loading ? "登录中…" : "登录"}
        </Button>
      </div>
    </form>
  );
}
