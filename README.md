太好了，这个目标非常清晰，而且**非常符合你现在在做的 AI-native 平台方向** 👍
我会从「**选型 → 架构原则 → 工程化能力 → AI 友好设计 → 目录结构 → 基础大纲**」一步一步帮你拆出来。

> 🎯 目标总结
>
> * React 技术栈
> * 代码结构简单
> * AI 易读 / 易生成 / 易修改
> * 界面简洁优雅
> * 可作为长期 boilerplate 演进

---

# ✅ 一、推荐技术选型（强烈建议）

### ✅ 框架：**Vite + React + TypeScript**

为什么不用 CRA / Next.js 作为基础？

| 方案               | 评价            |
| ---------------- | ------------- |
| CRA              | 过时            |
| Next.js          | 偏重全栈/SSR，结构复杂 |
| **Vite + React** | ✅ 极简、纯前端、快、可控 |

👉 Boilerplate 目标是「干净前端骨架」，Vite 是最合适的。

---

### ✅ UI 层

推荐组合：

```
TailwindCSS + shadcn/ui
```

理由：

* 原子化样式，AI 很容易生成
* shadcn 是源码级组件，不是黑盒
* 不强制主题体系，灵活

---

### ✅ 路由

```
react-router-dom
```

保持简单，不引入 meta-framework。

---

### ✅ 状态管理

优先：

```
zustand
```

理由：

* API 极简
* 无样板代码
* AI 非常容易写对

---

### ✅ 请求层

```
axios
```

封装一层：

```
/src/lib/http.ts
```

---

### ✅ 表单

```
react-hook-form + zod
```

---

### ✅ 代码规范

```
eslint
prettier
```

---

# ✅ 二、核心设计理念（非常重要）

你的 boilerplate 应该遵循：

> ✅ **功能按“领域”划分，不按技术划分**

❌ 不要：

```
components/
hooks/
services/
```

✅ 要：

```
features/
  auth/
  user/
  billing/
```

这点对 AI 生成代码极其重要。

---

# ✅ 三、推荐目录结构（AI 友好）

```
src/
├── app/                 # 应用级配置
│   ├── router.tsx
│   ├── providers.tsx
│   └── store.ts
│
├── features/            # 业务域
│   ├── auth/
│   │   ├── api.ts
│   │   ├── store.ts
│   │   ├── types.ts
│   │   └── pages/
│   │       └── LoginPage.tsx
│   │
│   ├── user/
│   │   ├── api.ts
│   │   ├── store.ts
│   │   └── pages/
│   │       └── UserListPage.tsx
│
├── components/          # 跨业务通用组件
│   ├── Button.tsx
│   └── DataTable.tsx
│
├── layouts/
│   └── MainLayout.tsx
│
├── lib/
│   ├── http.ts          # axios 实例
│   ├── env.ts
│   └── storage.ts
│
├── hooks/
│   └── useDebounce.ts
│
├── styles/
│   └── globals.css
│
├── main.tsx
└── App.tsx
```

---

# ✅ 四、API 请求层标准化

### lib/http.ts

```ts
import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

http.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err)
);
```

---

### features/auth/api.ts

```ts
import { http } from "@/lib/http";

export function login(data: {
  username: string;
  password: string;
}) {
  return http.post("/auth/login", data);
}
```

---

👉 原则：

```
一个 feature 只有一个 api.ts
```

---

# ✅ 五、状态管理标准模式

### features/auth/store.ts

```ts
import { create } from "zustand";

type AuthState = {
  token?: string;
  setToken: (t: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: undefined,
  setToken: (t) => set({ token: t }),
  logout: () => set({ token: undefined }),
}));
```

---

# ✅ 六、AI 友好约定（非常关键）

你要在 README 中写清楚：

### ✅ 每个 feature 必须包含：

```
api.ts
store.ts
types.ts
pages/
components/
```

---

### ✅ 文件头部写注释

```ts
/**
 * Auth Feature
 * Responsibility:
 * - Login
 * - Logout
 * - Token persistence
 */
```

---

### ✅ 函数命名统一动词

```
getUserList
createUser
updateUser
deleteUser
```

---

# ✅ 七、工程化能力

最低配：

* TypeScript
* ESLint
* Prettier
* Path Alias

```json
"paths": {
  "@/*": ["src/*"]
}
```

---

进阶：

* Husky + lint-staged
* commitlint
* changeset
* env 校验（zod）

---

# ✅ 八、基础功能模块（Boilerplate 默认提供）

### 1️⃣ Auth 模块

* 登录页
* Token 存储
* axios 自动携带 token

### 2️⃣ Layout 系统

* Header
* Sidebar
* Content

### 3️⃣ Route Guard

* 未登录跳转登录页

### 4️⃣ 通用组件

* Button
* Input
* Modal
* Table
* Pagination

---

# ✅ 九、界面风格建议

> 极简、低对比、留白

* 背景：浅灰 / 白
* 主色：单一品牌色
* 圆角：8px
* 阴影极轻

适合 AI 生成 & 后期主题化。

---

# ✅ 十、README 大纲（你可以直接放仓库）

```
# React AI-Friendly Boilerplate

## Tech Stack
- Vite
- React
- TypeScript
- TailwindCSS
- Zustand
- Axios

## Design Principles
- Feature-based architecture
- Simple and predictable structure
- AI-friendly conventions

## Folder Structure

## How To Add New Feature

## API Layer Convention

## State Management Convention

## Environment Variables

## Scripts
```

---

# ✅ 十一、可扩展方向（后续演进）

* RBAC 权限系统
* OpenAPI 自动生成 api.ts
* 国际化 i18n
* 微前端
* SSR（可切到 Next）

---

# ✅ 十二、你的下一步建议

1️⃣ 先搭一个最小仓库
2️⃣ 写好 README 规范
3️⃣ 固化目录模板
4️⃣ 再逐步加能力

