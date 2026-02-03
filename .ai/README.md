# .ai 目录 - AI 原生 React 规则与约束

本目录存放 **面向 AI 编程** 的规则与模板，供 Cursor / Claude 等工具在生成或修改代码时**必须遵守**。所有规则文件为可执行约束，不是描述性说明。

---

## 规则系统

### 核心规则（始终启用）

| 文件 | 用途 |
|------|------|
| `.ai/00-core.md` | 核心规则（不可违反）：目标、设计原则、AI 友好约定、禁止项、技术选型 |
| `.ai/10-architecture.md` | 架构规则：目录职责、目录结构、数据流、Feature 模式、状态归属、错误处理、新增 Feature 步骤 |
| `.ai/20-api-state.md` | API 与状态约束：请求层、lib/http 约定、Zustand 约定、路由与鉴权 |
| `.ai/30-ui-engineering.md` | UI 与工程化：界面风格、工程化要求、Boilerplate 默认能力 |

### 任务 Playbook（按需加载）

当任务意图匹配时，加载对应 playbook：

| 文件 | 适用任务 |
|------|----------|
| `.ai/90-task-playbooks/add-feature.md` | 添加新 feature / 新模块 / 新业务域 |

### 速查与模板

| 文件 | 用途 |
|------|------|
| `.ai/conventions.md` | 命名、路径、请求、状态、路由、样式等约定速查 |
| `.ai/feature-template.md` | 新增 feature 的详细模板与代码示例 |

---

## 开发原则

1. **规则优先**：所有规则文件都是可执行的，不是描述性的；生成或修改代码前 MUST 遵守。
2. **MUST / MUST NOT**：规则使用明确命令式语言；违反即视为错误。
3. **模块化**：规则按层次组织（00 核心 → 10 架构 → 20 API/状态 → 30 UI/工程 → 90 Playbook），可独立引用。
4. **AI 友好**：规则为 AI 工具优化，便于理解和执行。

---

## 快速参考

- 添加新 feature：参考 `.ai/90-task-playbooks/add-feature.md` 与 `.ai/feature-template.md`
- 架构与目录：参考 `.ai/10-architecture.md`
- 命名与约定速查：参考 `.ai/conventions.md`

---

## 重要提醒

- 所有请求 MUST 经 `@/lib/http`，禁止新建 axios 实例或请求层
- 所有全局状态仅用 Zustand，store 按 feature 放在 `features/<name>/store.ts`
- 禁止跨 feature 内部引用（不 import 其他 feature 的 api/store/types）
- 受保护路由使用 `ProtectedRoute`，未登录重定向 `/login`
- 每个 feature 必须包含：`api.ts`、`store.ts`、`types.ts`、`pages/`
