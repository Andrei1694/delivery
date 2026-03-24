# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server on http://localhost:3121
npm run build        # Type-check + production build to dist/
npm run lint         # ESLint check
npm run preview      # Preview production build
```

## Architecture

Admin dashboard for the delivery platform — a separate React 19 + TypeScript SPA, sibling to `../frontend/`.

### Stack

- **React 19** + **TypeScript** via **Vite 8** (with React Compiler via Babel)
- **TanStack Router** — type-safe routing; router instance + `queryClient` are exported from `src/router.ts` and consumed in `App.tsx`
- **TanStack Query** — server state / data fetching
- **TanStack Form** — form handling and validation

### Entry Points

`main.tsx` → `App.tsx` wraps everything in `<QueryClientProvider>` and `<RouterProvider>`. The `router` and `queryClient` instances live in `src/router.ts`.

### Conventions

- `.tsx` for components, `.ts` for non-JSX modules
- PascalCase component files; `useX` naming for hooks
- 2-space indent, semicolons, single quotes (mirrors the sibling frontend)
- Strict TypeScript (`noUnusedLocals`, `noUnusedParameters` enabled)

### Relation to Parent Project

The parent project (`../`) is a Spring Boot + React delivery app. The admin app is a separate frontend — it will hit the same Spring Boot API at `:8080`. See `../CLAUDE.md` for backend architecture and auth details (JWT Bearer tokens, `/api/*` endpoints).
