👉 Cursor 自动生成一个：
**Vite + React + TypeScript + Tailwind + Zustand + Axios 的 AI-friendly Boilerplate 仓库**

并且：

* 目录结构正确
* 代码能直接跑
* README 完整
* 具备示例 Auth Feature

---

**Prompt 开始**

You are a senior front-end architect.

Generate a complete, production-ready React boilerplate repository with the following requirements:

============================
GOALS
=====

* Simple, clean, AI-friendly codebase
* Feature-based architecture
* Easy to extend
* Minimal but solid engineering setup

============================
TECH STACK
==========

* Vite
* React
* TypeScript
* TailwindCSS
* Zustand (state management)
* Axios (HTTP client)
* React Router
* ESLint + Prettier
* Path alias @/*

============================
PROJECT STRUCTURE
=================

Create this folder structure:

src/
app/
router.tsx
providers.tsx
store.ts
features/
auth/
api.ts
store.ts
types.ts
pages/
LoginPage.tsx
user/
api.ts
store.ts
types.ts
pages/
UserListPage.tsx
components/
Button.tsx
Input.tsx
Modal.tsx
layouts/
MainLayout.tsx
lib/
http.ts
env.ts
storage.ts
hooks/
useDebounce.ts
styles/
globals.css
main.tsx
App.tsx

============================
ARCHITECTURE RULES
==================

* Each feature must own its own:

  * api.ts
  * store.ts
  * types.ts
  * pages folder

* No cross-feature imports

* All API requests must go through lib/http.ts

* Zustand is the only global state solution

============================
IMPLEMENTATION DETAILS
======================

1. Vite + React + TS setup

2. Tailwind configured and working

3. Path alias configured

4. Axios instance with:

   * baseURL from env
   * request interceptor to attach token
   * response interceptor to unwrap data

5. Auth feature:

   * Login page UI
   * login API function
   * auth store with token persistence

6. Router:

   * Public route: /login
   * Protected route: /
   * Redirect unauthenticated users to /login

7. MainLayout:

   * Simple header
   * Sidebar
   * Content area

8. Example User feature:

   * getUserList API
   * simple user list page

9. Minimal but elegant UI using Tailwind

============================
README CONTENT
==============

Generate a full README.md containing:

* Project introduction
* Tech stack
* Folder structure explanation
* Architecture principles
* How to run
* How to add a new feature
* API convention
* State management convention

============================
OUTPUT FORMAT
=============

* Generate all files with correct paths
* Provide package.json
* Provide vite.config.ts
* Provide tsconfig.json
* Provide tailwind.config.js
* Provide postcss.config.js
* Provide eslint and prettier configs
* Code must compile

You must behave as if you are generating a real repository.

Do not explain.

Only output file contents.

**Prompt End**
