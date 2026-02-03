# 30 - UI 与工程化约束

界面风格与工程化能力 MUST 符合本文件。

---

## 界面风格

- **原则**：极简、低对比、留白
- **实现**：背景浅灰/白，主色单一品牌色，圆角 8px，阴影极轻
- **技术**：TailwindCSS；不在项目内引入其他 CSS 方案（除 `styles/globals.css`）
- 适合 AI 生成与后期主题化

---

## 工程化最低要求

- TypeScript
- ESLint + Prettier
- 路径别名：`"@/*": ["src/*"]`（在 tsconfig 与 vite 中配置）

---

## Boilerplate 默认能力

- **Auth**：登录页、Token 存储、axios 自动携带 token
- **Layout**：Header、Sidebar、Content（MainLayout）
- **Route Guard**：未登录跳转登录页
- **通用组件**：Button、Input、Modal（Table、Pagination 可按需添加）
