# Auth Starter Template (React + Vite)

This frontend is trimmed to a reusable authentication baseline:

- Public routes: `/login`, `/register`
- Protected route: `/` (authenticated landing page placeholder)
- Auth state managed with `AuthContext` and token persistence in `localStorage`
- API endpoints expected:
  - `POST /auth/login`
  - `POST /auth/register`
  - `GET /auth/me`

## Run locally

```bash
npm install
npm run dev
```

## Build and lint

```bash
npm run lint
npm run build
```

## Environment

Set `VITE_API_URL` to your backend API base URL.  
Default is `http://localhost:8080/api`.
