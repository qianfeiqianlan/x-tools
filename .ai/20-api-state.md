# 20 - API 与状态约束

API 层与状态管理 MUST 符合本文件。

---

## API 请求层

- **唯一入口**：`@/lib/http`（axios 实例，baseURL 来自 env，request 自动挂 token，response 解包为 `res.data`）。
- **每个 feature 一个 api.ts**：导出 `getXxx`、`createXxx` 等函数，入参/返回值类型定义在对应 feature 的 `types.ts`。
- **禁止**：在 feature 或组件内新建 axios 实例或封装另一套请求层。

### lib/http.ts 约定

- 使用 `import.meta.env.VITE_API_BASE_URL` 作为 baseURL，timeout 合理设置（如 10000）。
- Request 拦截器：从 `lib/storage` 取 token，挂到 `Authorization: Bearer <token>`。
- Response 拦截器：成功时返回 `res.data`，失败时 `Promise.reject(err)`。

### feature api.ts 示例

```ts
import { http } from "@/lib/http";
import type { LoginInput, LoginResult } from "./types";

export function login(data: LoginInput) {
  return http.post<LoginResult>("/auth/login", data);
}
```

---

## 状态管理

- **唯一方案**：Zustand；禁止 Redux、MobX 等。
- **Store 位置**：按 feature 放在 `features/<name>/store.ts`；跨 feature 的全局 UI 状态放在 `app/store.ts`。
- **持久化**：需要持久化的状态（如 token）通过 `lib/storage` 读写，在 store 的 set 中同步（如 setToken 时 persistToken）。

### store 约定

- 使用 `create` 从 zustand 创建，导出 `useXxxStore`。
- 状态与修改方法同文件内定义，类型清晰（如 `AuthState`）。

---

## 路由与鉴权

- 路由定义在 `src/app/router.tsx`。
- 公开路由：如 `/login`。
- 受保护路由：用 `ProtectedRoute` 包裹，未登录重定向到 `/login`。
- 新页面：在对应 feature 的 `pages/` 下建组件，再在 router 和 MainLayout 导航中注册。
