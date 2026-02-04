# .ai 目录 - AI 原生 React 规则与约束（工具类网站）

本目录存放 **面向 AI 编程** 的规则、产品需求与模板，供 Cursor / Claude 等工具在生成或修改代码时**必须遵守**。所有规则文件为可执行约束，不是描述性说明。产品需求来源见根目录 `command.md`。

---

## 规则系统

### 核心规则（始终启用）

| 文件 | 用途 |
|------|------|
| `.ai/00-core.md` | 核心规则（不可违反）：目标、设计原则、AI 友好约定、禁止项、技术选型 |
| `.ai/10-architecture.md` | 架构规则：目录职责、目录结构、数据流、Feature 模式、状态归属、错误处理、新增 Feature 步骤 |
| `.ai/20-api-state.md` | API 与状态约束：请求层、lib/http 约定、Zustand 约定、路由与鉴权 |
| `.ai/30-ui-engineering.md` | UI 与工程化：界面风格、工具类视觉（配色/字体/组件/响应式）、工程化要求、Boilerplate 默认能力 |
| `.ai/40-product-requirements.md` | **产品需求与设计约束**：工具类网站定位、核心原则、整体架构、工具分类、首页、单工具页交互（四类工具）、视觉规范、细节优化、开发友好约定、**需求清单与开发优先级** |

### 任务 Playbook（按需加载）

当任务意图匹配时，加载对应 playbook：

| 文件 | 适用任务 |
|------|----------|
| `.ai/90-task-playbooks/add-feature.md` | 添加新 feature / 新模块 / 新业务域 |
| `.ai/90-task-playbooks/add-tool-page.md` | 添加新工具页 / 单工具功能（输入区+操作区+结果区、一键复制、错误精准提示等） |

### 速查与模板

| 文件 | 用途 |
|------|------|
| `.ai/conventions.md` | 命名、路径、请求、状态、路由、样式等约定速查 |
| `.ai/feature-template.md` | 新增 feature 的详细模板与代码示例 |

---

## 开发原则

1. **规则优先**：所有规则文件都是可执行的，不是描述性的；生成或修改代码前 MUST 遵守。
2. **产品需求优先**：做工具类相关功能时，以 `.ai/40-product-requirements.md` 为准。
3. **MUST / MUST NOT**：规则使用明确命令式语言；违反即视为错误。
4. **模块化**：规则按层次组织（00 核心 → 10 架构 → 20 API/状态 → 30 UI/工程 → 40 产品需求 → 90 Playbook），可独立引用。
5. **AI 友好**：规则为 AI 工具优化，便于理解和执行。

---

## 快速参考

- **产品需求与需求清单（后续开发排期）**：`.ai/40-product-requirements.md`（第九节为需求清单与 P0/P1/P2/P3）
- 添加新 feature：`.ai/90-task-playbooks/add-feature.md` 与 `.ai/feature-template.md`
- 添加新工具页：`.ai/90-task-playbooks/add-tool-page.md` 与 `.ai/40-product-requirements.md` 第四、五节
- 架构与目录：`.ai/10-architecture.md`
- 约定速查：`.ai/conventions.md`

---

## 重要提醒

- 所有请求 MUST 经 `@/lib/http`（纯前端工具无接口时可无 api.ts）
- 所有全局状态仅用 Zustand，store 按 feature 放在 `features/<name>/store.ts`
- 禁止跨 feature 内部引用（不 import 其他 feature 的 api/store/types）
- 当前应用默认免登录访问；登录通过 Header「登录」按钮弹出模态框
- 单工具页 MUST：输入区+操作区+结果区、即时反馈、一键复制、错误精准提示、视觉与 40 产品需求一致
