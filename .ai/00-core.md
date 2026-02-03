# 00 - 核心规则（不可违反）

本文件为项目核心约束，所有代码生成与修改 MUST 遵守。

---

## 目标

- React 技术栈，代码结构简单，AI 易读/易生成/易修改
- 界面简洁优雅，可作为长期 boilerplate 演进
- 功能按**领域**划分，不按技术划分

---

## 设计原则（MUST）

1. **按领域划分**：代码组织在 `src/features/<领域>/`（如 auth、user、billing），每个 feature 自包含 api、store、types、pages。
2. **不按技术分层**：禁止顶层按技术拆成 `components/`、`hooks/`、`services/` 大杂烩；通用组件在 `src/components/`，通用 hooks 在 `src/hooks/`，其余归属 feature。
3. **一个 feature 一个 api.ts**：每个 feature 仅有一个 `api.ts`，所有请求通过 `@/lib/http` 发出。
4. **唯一全局状态方案**：仅使用 Zustand；禁止引入 Redux、MobX 等。
5. **路径别名**：统一使用 `@/` 指向 `src/`。

---

## AI 友好约定（MUST）

- 每个 feature **必须包含**：`api.ts`、`store.ts`、`types.ts`、`pages/`；可选 `components/`（仅本 feature 使用）。
- **文件头部写注释**：每个 feature 或重要模块在文件顶部用简短注释说明职责（如 Auth Feature：Login / Logout / Token 持久化）。
- **函数命名统一动词**：`getUserList`、`createUser`、`updateUser`、`deleteUser`。

---

## 禁止（MUST NOT）

- 禁止跨 feature 从 feature A 内部 import feature B 的 api/store/types（允许通过路由跳转或只读 store）。
- 禁止在项目内新建 axios 实例或请求层；所有请求 MUST 经 `@/lib/http`。
- 禁止引入新的架构层、插件系统、事件总线或 Result/Either 等复杂抽象；保持「app + features + lib」结构。
- 禁止在控制器/页面中写与 UI 无关的复杂业务逻辑块；可抽到 feature 内 hooks 或小模块。

---

## 技术选型（固定）

| 层级     | 技术 |
|----------|------|
| 构建     | Vite |
| 框架     | React + TypeScript |
| 样式     | TailwindCSS |
| 路由     | react-router-dom |
| 状态     | Zustand |
| 请求     | Axios（封装在 `src/lib/http.ts`） |
| 规范     | ESLint + Prettier |

未经约定不得替换上述选型。
