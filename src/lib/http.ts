/**
 * HTTP Client
 * - Axios instance with baseURL from env
 * - Request: attach token from storage
 * - Response: unwrap data, handle errors
 */
import axios from "axios";
import { getToken } from "./storage";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
  timeout: 10000,
});

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);
