/**
 * User Feature - API
 * - getUserList and other user endpoints
 */
import { http } from "@/lib/http";
import type { UserListResult } from "./types";

export function getUserList(params?: { page?: number; size?: number }) {
  return http.get<UserListResult>("/users", { params });
}
