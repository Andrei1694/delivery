# Gemini Project Context: Delivery App

This document provides a comprehensive overview of the full-stack Delivery App project for effective collaboration with the Gemini CLI.

## Project Overview

The Delivery App is a modern web application featuring a Java/Spring Boot backend and a React/Vite frontend. It uses PostgreSQL for persistence, Redis for caching, and is containerized using Docker.

### Core Technologies

#### Backend
- **Framework:** Spring Boot (v4.0.2)
- **Language:** Java 17
- **Database:** PostgreSQL 13 (via JPA/Hibernate)
- **Caching:** Redis 7
- **Security:** Spring Security with JWT & OAuth2 Client
- **API Documentation:** OpenAPI/Swagger (springdoc-openapi)
- **Mapping:** ModelMapper

#### Frontend
- **Framework:** React (v19)
- **Build Tool:** Vite (v7)
- **Routing:** @tanstack/react-router
- **State Management:** @tanstack/react-query
- **Forms:** @tanstack/react-form
- **Styling:** Tailwind CSS (v4)
- **HTTP Client:** Axios

#### Infrastructure
- **Containerization:** Docker & Docker Compose
- **Reverse Proxy:** Nginx (serves frontend and proxies API requests)

## Building and Running

### Prerequisites
- Docker & Docker Compose
- Java 17 (for local backend development)
- Node.js & npm (for local frontend development)

### Using Docker (Full Stack)
To start the entire application (Postgres, Redis, Backend, Nginx):
```bash
docker compose up -d --build
```
Access the application at `http://localhost`.

### Local Development (Incremental)
1. **Start Infrastructure:**
   ```bash
   docker compose up -d postgres redis
   ```
2. **Run Backend:**
   ```bash
   ./mvnw spring-boot:run
   ```
3. **Run Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Other Commands
- **Lint Frontend:** `npm run lint` (in `frontend` directory)
- **Build Frontend:** `npm run build` (in `frontend` directory)
- **Reset Database:** `docker compose down -v`

## Development Conventions

### Backend
- **Architecture:** Standard Spring Boot layering:
  - `controller/`: REST API endpoints.
  - `service/`: Business logic.
  - `repository/`: Data access (JPA).
  - `dto/`: Data Transfer Objects for API communication.
  - `model/`: JPA Entities.
- **Authentication:** JWT-based authentication. Filters and security config are in `com.party.ceva.demo.config`.
- **File Storage:** Supports both local and AWS S3 storage (configured via `file.storage.type`).

### Frontend
- **Routing:** Uses TanStack Router for type-safe routing. Route definitions are in `src/router.jsx`.
- **Data Fetching:** Primarily uses `@tanstack/react-query`.
- **Styling:** Tailwind CSS 4 is used for styling.
- **Components:** Functional components with React 19 hooks.
- **API Base URL:** Configured via `VITE_API_URL` (defaults to `/api` in production/Nginx).

### Key Files
- `pom.xml`: Backend dependencies and build configuration.
- `frontend/package.json`: Frontend dependencies and scripts.
- `docker-compose.yml`: Service orchestration.
- `src/main/resources/application.properties`: Backend configuration.
- `frontend/src/router.jsx`: Frontend route definitions.
- `frontend/src/requests.js`: Axios configuration and API calls.
