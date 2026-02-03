# 10 - 架构规则

项目架构约束，所有目录与数据流 MUST 符合本文件。

---

## 目录职责

| 目录 | 职责 |
|------|------|
| `src/app/` | 应用级：路由（router.tsx）、全局 Provider（providers.tsx）、可选 app store |
| `src/features/` | 按业务域划分的 feature，每个 feature 自包含 api/store/types/pages |
| `src/components/` | 跨 feature 的通用 UI 组件（Button、Input、Modal 等） |
| `src/layouts/` | 布局组件（MainLayout 等） |
| `src/lib/` | 基础设施：http 客户端、storage、env |
| `src/hooks/` | 通用 hooks（如 useDebounce） |
| `src/styles/` | 全局样式（globals.css） |

---

## 推荐目录结构（AI 友好）

```
src/
├── app/
│   ├── router.tsx
│   ├── providers.tsx
│   └── store.ts
├── features/
│   ├── auth/
│   │   ├── api.ts
│   │   ├── store.ts
│   │   ├── types.ts
│   │   └── pages/
│   ├── user/
│   │   ├── api.ts
│   │   ├── store.ts
│   │   ├── types.ts
│   │   └── pages/
├── components/
├── layouts/
├── lib/
│   ├── http.ts
│   ├── env.ts
│   └── storage.ts
├── hooks/
├── styles/
├── main.tsx
└── App.tsx
```

---

## 数据流

- **请求**：页面/组件 → feature 的 `api.ts` → `lib/http.ts`（带 token）→ 后端
- **状态**：Zustand store 按 feature 放在 `features/<name>/store.ts`，仅本 feature 或 layout 使用
- **路由**：`app/router.tsx` 定义公开/受保护路由，未登录重定向到 `/login`

---

## Feature 模式

每个 feature MUST 包含：

- `api.ts`：本 feature 的接口调用，统一使用 `@/lib/http`
- `store.ts`：Zustand store，仅本 feature 状态
- `types.ts`：本 feature 的 TS 类型
- `pages/`：页面组件
- 可选：`components/` 仅本 feature 使用的组件

**约定**：不跨 feature 直接引用其他 feature 的内部模块（除 store 只读、或通过路由跳转）。

---

## 状态归属

- 仅本页面用 → 组件内 `useState`
- 跨组件/需持久化 → 放在对应 feature 的 `store.ts`
- 跨 feature 的全局 UI 状态（如侧栏开关）→ `app/store.ts`

---

## 错误处理

- `lib/http.ts` 的 response 拦截器统一 `res => res.data`，错误通过 `Promise.reject` 抛出
- 页面/组件内对接口调用做 try/catch 或 .catch()，按需展示错误信息

---

## 新增 Feature 步骤

1. 在 `src/features/` 下新建目录，如 `billing/`
2. 添加 `api.ts`、`store.ts`、`types.ts`
3. 在 `pages/` 下写页面组件
4. 在 `app/router.tsx` 中注册路由
5. 在 MainLayout 侧栏（或导航）中增加入口

详细模板与检查清单见 `.ai/90-task-playbooks/add-feature.md`。
