# 30 - UI 与工程化约束

界面风格与工程化能力 MUST 符合本文件。工具类产品视觉须同时满足 `.ai/40-product-requirements.md` 第六、七、八节。

---

## 界面风格（通用）

- **原则**：极简、低对比、留白；工具类额外遵循「极简高效、功能聚焦、即时反馈、一致性」
- **技术**：TailwindCSS；不在项目内引入其他 CSS 方案（除 `styles/globals.css`）
- 适合 AI 生成与后期主题化

---

## 工具类产品视觉（与 40 产品需求对齐）

### 配色（CSS 变量，2 套主题）

- **浅色模式（默认）**：背景 `#F8F9FA`；文字主 `#212529`、次 `#6C757D`；强调 `#165DFF`；功能色成功 `#00B42A`、错误 `#F53F3F`、警告 `#FF7D00`
- **深色模式**：背景 `#121212`；文字主 `#E0E0E0`、次 `#909090`；强调 `#4D89FF`；功能色可降饱和度
- 实现：在 `styles/globals.css` 或 Tailwind 中用 CSS 变量定义，便于一键切换

### 字体与排版

- 字体：无衬线优先（如 Inter、Roboto、PingFang SC）；代码区可用等宽（Consolas）
- 字号：标题 18px 粗体；正文/输入/结果 14px（代码可 13px）；按钮/提示 12px
- 间距：输入框内边距 12px，模块 16px，按钮 8px 16px

### 组件样式

- 输入框：细灰边框 1px，圆角 4px，聚焦蓝色高亮，无多余阴影
- 主按钮：蓝底白字，圆角 4px，hover 加深
- 次按钮：浅灰底深灰字，hover 变深灰
- 卡片：圆角 8px，轻阴影

### 响应式

- 断点：仅 2 个——PC ≥768px，移动端 <768px；优先保证 PC 端体验

---

## 工程化最低要求

- TypeScript
- ESLint + Prettier
- 路径别名：`"@/*": ["src/*"]`（tsconfig 与 vite 中配置）

---

## Boilerplate 默认能力

- **Auth**：登录模态框（默认免登录访问）、Token 存储、axios 自动携带 token
- **Layout**：Header、Sidebar、Content（MainLayout）
- **通用组件**：Button、Input、Modal（Table、Pagination 可按需添加）
- **工具页**：输入区 + 操作区 + 结果区、一键复制、清空/交换等通用模式，见 `.ai/40-product-requirements.md` 与 `.ai/90-task-playbooks/add-tool-page.md`
