# 新增 Feature 模板（AI 参考）

按本模板在 `src/features/<name>/` 下生成新 feature，保证与项目约定一致。

---

## 1. 目录结构

```
src/features/<FeatureName>/
├── api.ts          # 本 feature 的接口，使用 @/lib/http
├── store.ts        # Zustand store
├── types.ts        # 本 feature 的 TS 类型
└── pages/
    └── <FeatureName>Page.tsx   # 或 ListPage / DetailPage 等
```

可选：若仅本 feature 使用的组件，可加 `components/` 子目录。

---

## 2. types.ts 模板

```ts
/**
 * <FeatureName> Feature - Types
 */
export type <Entity> = {
  id: string;
  // ... 其他字段
};

export type <Entity>ListResult = {
  list: <Entity>[];
  total?: number;
};
```

---

## 3. api.ts 模板

```ts
/**
 * <FeatureName> Feature - API
 */
import { http } from "@/lib/http";
import type { <Entity>ListResult } from "./types";

export function get<Entity>List(params?: { page?: number; size?: number }) {
  return http.get<<Entity>ListResult>("/<path>", { params });
}

export function create<Entity>(data: Create<Entity>Input) {
  return http.post("/<path>", data);
}
```

- 入参/返回值类型从 `./types` 导入。
- 仅使用 `http.get/post/put/delete`，不新建 axios 实例。

---

## 4. store.ts 模板

```ts
/**
 * <FeatureName> Feature - Store
 */
import { create } from "zustand";
import type { <Entity> } from "./types";

type <FeatureName>State = {
  list: <Entity>[];
  setList: (list: <Entity>[]) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
};

export const use<FeatureName>Store = create<<FeatureName>State>((set) => ({
  list: [],
  setList: (list) => set({ list }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
```

---

## 5. 页面组件约定

- 从 `../api`、`../store`、`../types` 导入。
- 使用 `@/components/*`、`@/layouts/*` 的通用组件与布局。
- 不在本 feature 内 import 其他 feature 的 api/store/types。

---

## 6. 注册步骤（AI 执行清单）

- [ ] 在 `src/app/router.tsx` 中为 MainLayout 下增加路由，例如 `<Route path="<path>" element={<XxxPage />} />`。
- [ ] 在 `src/layouts/MainLayout.tsx` 的导航中增加指向该路由的链接。

---

## 7. 命名约定

- **文件名**：PascalCase 组件（如 `UserListPage.tsx`），小写 api/store/types。
- **函数**：动词前缀，如 `getUserList`、`createUser`、`updateUser`、`deleteUser`。
- **Store**：`use<FeatureName>Store` 或 `use<Entity>Store`。

按上述模板生成代码后，请自检：路径别名 `@/`、无跨 feature 内部引用、请求均经 `@/lib/http`、状态仅用 Zustand。
