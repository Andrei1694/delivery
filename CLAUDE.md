# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend (Spring Boot)
```bash
./mvnw spring-boot:run        # Start dev server on :8080
./mvnw test                   # Run all tests
./mvnw test -Dtest=UserServiceTest  # Run a single test class
./mvnw clean package          # Build JAR
```

### Frontend (React + Vite)
```bash
cd frontend && npm install    # Install dependencies
cd frontend && npm run dev    # Dev server on http://localhost:5173
cd frontend && npm run build  # Production build to dist/
cd frontend && npm run lint   # ESLint check (run before PRs)
```

### Full Stack (Docker)
```bash
docker compose up -d          # Start postgres, redis, backend, nginx
docker compose down           # Stop all containers
```

## Architecture

This is a full-stack SPA: **Spring Boot 4 REST API** + **React 19 frontend**, backed by PostgreSQL and Redis, deployed via Docker Compose + Nginx.

### Backend (`src/main/java/com/party/ceva/demo/`)

Stateless REST API with JWT auth. Packages by concern:
- `controller/` — AuthController, UserController, FileUploadController
- `service/` — JwtService, UserService, CustomUserDetailsService, FileStorageService (abstract), LocalFileStorageService, AwsS3FileStorageService, CodeGenerationService
- `repository/` — JPA repositories (Spring Data)
- `model/` — User, UserProfile, Role, RoleTypes (JPA entities)
- `dto/` — Request/response DTOs (AuthRequest/Response, UserDto, UserProfileDto, EventDto, etc.)
- `config/` — SecurityConfig (JWT filter chain, CORS for `:5173`), JwtAuthenticationFilter, MapperConfig, WebResourceConfig

**Auth flow**: JWT token extracted from `Authorization: Bearer <token>` header by `JwtAuthenticationFilter`, validated by `JwtService`. Sessions are stateless. Frontend stores token in localStorage.

**File storage**: `FileStorageService` abstraction with local and S3 implementations. Uploaded files served from `/uploads/` as static resources.

**Seed data**: `src/main/resources/import.sql` runs on startup (creates admin@admin.com user).

### Frontend (`frontend/src/`)

- `pages/` — 9 pages (Login, Register, Home, News, NewsArticle, Events, Users, Profile, Chat); lazy-loaded via `React.lazy + Suspense`
- `auth/` — `AuthContext.jsx` (global auth state), `useAuth.js` hook, `ProtectedRoute`/`PublicOnlyRoute` guards
- `service/` — axios API client; `requests.js` has all API calls
- `queries/` — TanStack Query hooks wrapping `requests.js`
- `components/` — Shared UI: `MobileLayout` (bottom nav), `NormalLayout` (sidebar + top navbar); responsive via `useIsPhone()` hook
- `router.jsx` — TanStack Router; root route renders layout shell, nested routes are protected/public
- `forms/` — TanStack Form components
- `navigation/` — Nav config

**Dev proxy**: Vite proxies `/api` → `http://localhost:8080`, so frontend calls `/api/*` which hits the Spring Boot server.

### Key Config
- `src/main/resources/application.properties` — DB, Redis, JWT, upload settings; env vars override: `SPRING_DATASOURCE_*`, `APP_JWT_SECRET`, `APP_JWT_EXPIRATION_MS`
- `frontend/vite.config.js` — API proxy
- `docker-compose.yml` — postgres:13, redis:7, backend, nginx

## Conventions

**Java**: 4-space indent, `PascalCase` classes, `camelCase` fields/methods. Suffix conventions: `*Controller`, `*Service`, `*Repository`, `*Dto`.

**React/JSX**: 2-space indent, semicolons, single quotes. `PascalCase` component files (`Login.jsx`), `useX` hook naming (`useAuth.js`).

**Commits**: Conventional Commits format — `feat(auth): add JWT refresh endpoint`.

**Tests**: Backend test files named `*Test.java` in `src/test/java/`. Run `./mvnw test` before pushing.
