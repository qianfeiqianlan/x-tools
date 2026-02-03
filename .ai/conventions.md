# 项目约定速查（AI 参考）

## 路径与导入

- 路径别名：`@/` → `src/`。
- Feature 内部：相对路径 `./api`、`./store`、`./types`；跨模块用 `@/lib/http`、`@/components/*`、`@/layouts/*`。
- 禁止：从 feature A 的內部文件 import feature B 的 api/store/types（可通过路由或只读 store 交互）。

## 请求层

- 唯一入口：`@/lib/http`（axios 实例，已挂 baseURL、token、response 解包）。
- 每个 feature 一个 `api.ts`，导出 `getXxx`、`createXxx` 等，入参/返回类型在 `types.ts`。

## 状态

- 仅使用 Zustand；store 按 feature 放在 `features/<name>/store.ts`。
- 不引入 Redux、MobX 等；跨 feature 的全局 UI 状态可放在 `app/store.ts`。

## 路由与鉴权

- 定义在 `src/app/router.tsx`。
- 公开：`/login`；受保护：用 `ProtectedRoute` 包裹，未登录重定向 `/login`。
- 新页面：在对应 feature 的 `pages/` 下建组件，再在 router 和 MainLayout 导航中注册。

## 命名

- **接口/函数**：动词前缀 — `getUserList`、`createUser`、`updateUser`、`deleteUser`。
- **组件**：PascalCase，如 `UserListPage.tsx`。
- **Store**：`useXxxStore`，如 `useAuthStore`、`useUserStore`。
- **类型**：PascalCase，如 `User`、`LoginInput`、`UserListResult`。

## 文件头注释（推荐）

每个 feature 或重要模块在文件顶部写简短注释，说明职责，例如：

```ts
/**
 * Auth Feature - API
 * - Login, logout (logout is client-only)
 */
```

## 样式

- 使用 TailwindCSS；不引入其他 CSS 方案（除 globals.css）。
- 组件内用 `className`，保持极简、低对比、留白（见 README 界面风格）。

按上述约定生成或修改代码，可保持项目对 AI 与人类开发者一致、可预测。
