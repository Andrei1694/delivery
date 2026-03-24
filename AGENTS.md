# Repository Guidelines

## Project Structure & Module Organization
- Backend lives in `src/main/java/com/party/ceva/demo`, organized into `config/`, `controller/`, `dto/`, `model/`, `repository/`, and `service/`. `DemoApplication.java` is the Spring Boot entry point.
- Backend config and seed data live in `src/main/resources/`, especially `application.properties` and `import.sql`.
- Backend tests live in `src/test/java/com/party/ceva/demo`, with package-level coverage currently under `controller/` and `service/`.
- Customer-facing web app lives in `frontend/` and uses Vite + React + TypeScript. Main code is in `frontend/src/` with `pages/`, `components/`, `auth/`, `forms/`, `hooks/`, `models/`, `navigation/`, `queries/`, `service/`, and `util/`.
- Admin web app lives in `admin/` and is a separate Vite + React + TypeScript app. It is still close to the scaffold, with source under `admin/src/`.
- Deployment and runtime assets live at the root: `docker-compose.yml`, `Dockerfile`, `nginx/`, `build/`, and `uploads/`. Avoid hand-editing generated output such as `target/`, `frontend/dist/`, `admin/dist/`, and `node_modules/`.

## Build, Test, and Development Commands
- Backend dev server: `./mvnw spring-boot:run`
- Backend tests: `./mvnw test`
- Backend package: `./mvnw clean package`
- Customer frontend install: `cd frontend && npm install`
- Customer frontend dev server: `cd frontend && npm run dev`
- Customer frontend lint: `cd frontend && npm run lint`
- Customer frontend typecheck: `cd frontend && npm run typecheck`
- Customer frontend build: `cd frontend && npm run build`
- Admin install: `cd admin && npm install`
- Admin dev server: `cd admin && npm run dev`
- Admin lint: `cd admin && npm run lint`
- Admin build: `cd admin && npm run build`
- Full local stack: `docker compose up -d --build` for Postgres, Redis, the Spring Boot backend, and nginx.

## Coding Style & Naming Conventions
- Java: 4-space indentation, standard Spring layering, PascalCase class names, camelCase fields and methods, and suffixes such as `*Controller`, `*Service`, `*Repository`, and `*Dto`. Prefer constructor injection.
- `frontend/`: TypeScript/TSX with 2-space indentation, semicolons, and single quotes. Use PascalCase component files and `useX.ts` hook names.
- `admin/`: TypeScript/TSX as well, but preserve the existing file-local style while the app is still close to the default Vite template. Do not reformat unrelated files just to force consistency.
- Keep client feature code close to its domain: route screens in `pages/`, reusable UI in `components/`, auth logic in `auth/`, and API access in `service/` or `queries/`.

## Testing Guidelines
- Backend testing uses Spring Boot test starters with JUnit. Keep tests in `src/test/java` and follow the `*Test.java` naming convention.
- Run `./mvnw test` before pushing backend changes.
- The customer frontend does not yet have a dedicated test runner. When changing `frontend/`, run `npm run lint` and `npm run typecheck`.
- The admin app also has no dedicated test runner yet. When changing `admin/`, run `npm run lint` and `npm run build` because the build includes TypeScript compilation.
- If you add client-side tests, document the command in the corresponding app README and use `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines
- Recent history already uses Conventional Commit prefixes such as `feat:` and `refactor:`; continue that pattern.
- Use short imperative commit messages with scopes when helpful, for example `feat(auth): add refresh token endpoint`.
- PRs should describe what changed, why it changed, how it was tested, linked issue or task, and screenshots for UI changes in `frontend/` or `admin/`.

## Security & Configuration Tips
- Do not commit real credentials, JWT secrets, or cloud keys. The defaults in `src/main/resources/application.properties` are for local development only.
- Override `SPRING_DATASOURCE_*`, `SPRING_DATA_REDIS_*`, and `app.jwt.secret` outside local development.
- `file.storage.type=local` writes runtime uploads under `uploads/`; avoid committing user-generated content. If you switch to S3 storage, keep bucket credentials in environment variables.
