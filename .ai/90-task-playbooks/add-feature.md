# Task Playbook - 添加 Feature

当任务意图为「添加新 feature / 新模块 / 新业务域」时，按本 playbook 执行。

---

## 1. 目录与文件

在 `src/features/<FeatureName>/` 下创建：

- `api.ts` - 使用 `@/lib/http`，导出 getXxx/createXxx 等
- `store.ts` - Zustand store
- `types.ts` - 本 feature 的 TS 类型
- `pages/<Xxx>Page.tsx` - 页面组件

可选：仅本 feature 使用的组件放在 `components/` 子目录。

---

## 2. 模板要点

- **types.ts**：导出实体类型（如 `User`）、入参/结果类型（如 `UserListResult`）
- **api.ts**：从 `./types` 导入类型，仅使用 `http.get/post/put/delete`
- **store.ts**：`create` 创建，导出 `use<FeatureName>Store`，状态 + set 方法
- **页面**：从 `../api`、`../store`、`../types` 导入；使用 `@/components/*`、`@/layouts/*`

---

## 3. 注册步骤（执行清单）

- [ ] 在 `src/app/router.tsx` 中为 MainLayout 下增加路由（如 `<Route path="<path>" element={<XxxPage />} />`）
- [ ] 在 `src/layouts/MainLayout.tsx` 的导航中增加指向该路由的链接

---

## 4. 自检

- 路径别名使用 `@/`
- 无跨 feature 内部引用（不 import 其他 feature 的 api/store/types）
- 请求均经 `@/lib/http`
- 状态仅用 Zustand
- 文件头部有简短职责注释

详细模板见 `.ai/feature-template.md`；架构与约定见 `.ai/00-core.md`、`.ai/10-architecture.md`、`.ai/20-api-state.md`。
