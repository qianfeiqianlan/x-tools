
---

# 🎯 Cursor Workflow Prompt（React AI-Friendly Boilerplate）

> ✅ 直接复制到 Cursor
> ✅ 作为整个项目的总 Prompt
> ✅ Cursor 会按 Phase 执行

---

## 🚀 CURSOR WORKFLOW PROMPT

```
You are a senior React frontend architect and repository generator.

Your task is to generate a complete, runnable, AI-friendly React boilerplate
by following the phases below IN ORDER.

Do NOT jump phases.
Do NOT invent extra architecture.
Keep everything minimal and practical.

====================================
PHASE 0 — PROJECT BASE
====================================

Create a Vite + React + TypeScript project.

Install and configure:

- React
- React Router
- TailwindCSS
- Axios
- Zustand
- ESLint
- Prettier
- Path alias @/*

Ensure:
- npm run dev works
- Tailwind styles apply
- Alias works

------------------------------------

====================================
PHASE 1 — FRONTEND CORE (LIGHTWEIGHT)
====================================

Create:

src/core/
  api/
    client.ts
    auth.ts
  error/
    errorMap.ts
  env/
    env.ts
  storage/
    token.ts
  index.ts

Rules:

- Axios based
- Browser-only
- No plugin system
- No event bus
- No Result/Either abstraction
- Keep code simple

Requirements:

api/client.ts
- Axios instance
- baseURL from env
- Attach token from storage
- Global response error handling

api/auth.ts
- login()
- logout()

storage/token.ts
- getToken
- setToken
- clearToken

errorMap.ts
- backend error code → user message

------------------------------------

====================================
PHASE 2 — API MODELS
====================================

Create:

src/api/
  auth.ts
  user.ts

Each file exports:

- Input interfaces
- Result interfaces
- API functions using core/api/client

Rules:

- No namespaces
- No DTO suffix
- Short names
- Easy to import

------------------------------------

====================================
PHASE 3 — FEATURE MODULES
====================================

Create:

src/features/
  auth/
    store.ts
    pages/LoginPage.tsx
  user/
    store.ts
    pages/UserListPage.tsx

Auth Feature:

- Login form
- Calls api/auth login
- Saves token
- Redirect after success

User Feature:

- Fetch user list
- Display simple table

Use Zustand for stores.

------------------------------------

====================================
PHASE 4 — APP SHELL
====================================

Create:

src/app/
  router.tsx
  providers.tsx

Create:

src/layouts/MainLayout.tsx
src/App.tsx
src/main.tsx

Routing:

/login → LoginPage  
/ → Protected MainLayout → UserListPage  

Unauthenticated users redirect to /login.

------------------------------------

====================================
PHASE 5 — UI BASICS
====================================

Create:

src/components/
  Button.tsx
  Input.tsx

Simple Tailwind components.

------------------------------------

====================================
PHASE 6 — ARCHITECTURE LITE DOC
====================================

Create ARCHITECTURE.md containing:

- Folder responsibilities
- Data flow
- Feature pattern
- State ownership
- Error handling

Keep concise.

------------------------------------

====================================
PHASE 7 — CURSOR RULES
====================================

Create .cursorrules with:

- Feature-based structure
- Prefer hooks
- Keep components simple
- Avoid unnecessary abstractions
- Business logic may live in hooks
- No new architectural layers

------------------------------------

====================================
PHASE 8 — README
====================================

Create README.md with:

- Project intro
- Tech stack
- Folder structure
- How to run
- How to add feature
- API pattern
- State pattern

------------------------------------

OUTPUT RULES:

- Generate real files
- Correct paths
- No explanations
- No markdown wrappers
- Code must compile

====================================
END WORKFLOW
====================================
```
