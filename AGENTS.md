# Repository Guidelines

## Project Structure & Module Organization
- Backend (Spring Boot) lives in `src/main/java/com/party/ceva/demo`, split by package: `controller/`, `service/`, `repository/`, `model/`, `dto/`, `config/`.
- Backend config and seed data are in `src/main/resources/` (`application.properties`, `import.sql`).
- Backend tests are in `src/test/java/...` and currently follow `*Test.java`.
- Frontend (Vite + React) is in `frontend/`, with app code in `frontend/src/` (`pages/`, `components/`, `auth/`, `service/`, `forms/`, `navigation/`).
- Deployment/runtime files are at root: `docker-compose.yml`, `Dockerfile`, `nginx/`, `build/`, and docs in `docs/`.

## Build, Test, and Development Commands
- Backend dev server: `./mvnw spring-boot:run`
- Backend tests: `./mvnw test`
- Backend package: `./mvnw clean package`
- Frontend install: `cd frontend && npm install`
- Frontend dev server: `cd frontend && npm run dev`
- Frontend production build: `cd frontend && npm run build`
- Frontend lint: `cd frontend && npm run lint`
- Full local stack (containers): `docker compose up -d`

## Coding Style & Naming Conventions
- Java: 4-space indentation, standard Spring layering, PascalCase class names, camelCase fields/methods, `*Controller`, `*Service`, `*Repository`, `*Dto` suffixes.
- React/JSX: 2-space indentation, semicolons, single quotes, PascalCase component files (`Login.jsx`), `useX` hook naming (`useAuth.js`).
- Keep feature logic close to domain folders (`frontend/src/pages`, `frontend/src/components`, backend package by concern).
- Run ESLint before opening a PR: `npm run lint`.

## Testing Guidelines
- Primary test stack is Spring Boot test starters with JUnit; keep backend tests in `src/test/java` and name them `*Test.java`.
- Run tests locally with `./mvnw test` before pushing.
- Frontend test runner is not configured yet; if you add one, document commands in `frontend/README.md` and use `*.test.jsx` naming.

## Commit & Pull Request Guidelines
- Git history currently contains a single bootstrap commit (`Initial commit from template`), so no stable convention exists yet.
- Use short imperative commit messages (prefer Conventional Commits, e.g., `feat(auth): add JWT refresh endpoint`).
- PRs should include: what changed, why, how it was tested (commands), linked issue/task, and screenshots for UI changes.

## Security & Configuration Tips
- Do not commit secrets or real credentials; use env vars for `SPRING_DATASOURCE_*` and JWT settings.
- Replace insecure defaults (`app.jwt.secret=secret`, default DB credentials) in non-local environments.
