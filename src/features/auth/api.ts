/**
 * Auth Feature - API
 * - Login, logout (logout is client-only)
 */
import { http } from "@/lib/http";
import type { LoginInput, LoginResult } from "./types";

export function login(data: LoginInput) {
  return http.post<LoginResult>("/auth/login", data);
}
