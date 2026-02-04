# Claude / AI 项目上下文（React AI-Friendly Boilerplate）

你正在维护一个 **AI 友好** 的 React 前端脚手架，请始终在该项目的约定下生成或修改代码。

---

## 技术栈

- **构建**：Vite
- **UI**：React 18 + TypeScript
- **样式**：TailwindCSS
- **状态**：Zustand（唯一全局状态方案）
- **请求**：Axios，封装在 `src/lib/http.ts`
- **路由**：react-router-dom
- **规范**：ESLint + Prettier，路径别名 `@/*` → `src/*`

---

## 目录结构（必读）

```
src/
├── app/                 # 应用级：router.tsx, providers.tsx, store.ts
├── features/            # 按业务域
│   ├── auth/            # 登录、登出、Token
│   │   ├── api.ts
│   │   ├── store.ts
│   │   ├── types.ts
│   │   └── pages/
│   └── user/            # 用户列表等
│       ├── api.ts, store.ts, types.ts
│       └── pages/
├── components/          # 跨 feature 通用组件（Button, Input, Modal）
├── layouts/             # MainLayout 等
├── lib/                 # http.ts, storage.ts, env.ts
├── hooks/               # useDebounce 等通用 hooks
├── styles/              # globals.css
├── main.tsx
└── App.tsx
```

---

## 核心约定（生成代码时必须遵守）

1. **每个 feature 必须包含**：`api.ts`、`store.ts`、`types.ts`、`pages/`。
2. **不跨 feature 引用**：不要从 feature A 的內部文件 import feature B 的 api/store/types；可通过路由跳转或仅读 store。
3. **请求统一走** `@/lib/http`：在 feature 的 `api.ts` 里用 `http.get/post`，不在组件里直接写 axios。
4. **Zustand 唯一**：不引入 Redux/MobX 等；store 按 feature 放在 `features/<name>/store.ts`。
5. **路由与鉴权**：公开路由 `/login`；其余走 `ProtectedRoute`，未登录重定向到 `/login`。

---

## 如何「添加新 Feature」

1. 在 `src/features/` 下新建目录，如 `billing/`。
2. 新建 `api.ts`（调用 `@/lib/http`）、`store.ts`（Zustand）、`types.ts`。
3. 在 `pages/` 下写页面组件。
4. 在 `src/app/router.tsx` 中注册路由；若需布局，挂在 `MainLayout` 的 `<Outlet />` 下。
5. 在 `src/layouts/MainLayout.tsx` 的导航中增加链接。

---

## API 与状态模式

- **api.ts**：导出 `getXxx`、`createXxx` 等函数，入参/返回值类型写在 `types.ts`，内部使用 `http.get/post`。
- **store.ts**：Zustand `create`，状态 + 方法（如 `setList`、`setLoading`）；需要持久化时用 `lib/storage`（如 token）。

---

## 环境变量

- 仅使用 `VITE_*` 前缀，在 `src/lib/env.ts` 中集中访问。
- 示例：`VITE_API_BASE_URL`，见 `.env.example`。

---

## 产品定位（工具类网站）

本项目同时面向**工具类网站**产品：高效、实用、极简；单页单工具，输入→操作→结果闭环；支持四类核心工具（URL 编解码、JSON 格式化、文本对比、世界时间）及扩展。产品需求与设计约束见 `.ai/40-product-requirements.md`，来源见根目录 `command.md`。

---

## 文档索引

- **架构与数据流**：`ARCHITECTURE.md`（详细规则在 `.ai/10-architecture.md`）
- **产品需求与需求清单**：`.ai/40-product-requirements.md`（含开发优先级 P0/P1/P2/P3）
- **使用与脚本**：`README.md`
- **Cursor 编码规则**：`.cursorrules`
- **AI 上下文（本文件）**：`CLAUDE.md`
- **规则与 Playbook 总览**：`.ai/README.md`
- **添加工具页**：`.ai/90-task-playbooks/add-tool-page.md`

生成或修改任何代码前，请优先遵循上述目录结构和约定；做工具类功能时须同时遵守 `.ai/40-product-requirements.md`，以保持项目对 AI 与人类开发者一致、可预测。
