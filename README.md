# Ghana Military Quiz App

A full-stack quiz platform for learning and testing knowledge of the Ghana Military through timed quizzes, category-based practice, progress tracking, and an admin dashboard.

## Overview

This project combines a Spring Boot API with a React frontend to deliver:

- secure authentication with JWT
- category-based quiz experiences
- score and progress tracking
- achievements and statistics
- admin tools for managing questions, categories, and users

The repository is structured for local development with separate `backend` and `frontend` applications.

## Tech Stack

### Backend

- Java 17
- Spring Boot
- Spring Security
- JWT authentication
- Spring Data JPA / Hibernate
- MySQL
- Maven

### Frontend

- React 18
- TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- Axios
- Framer Motion

## Key Features

- User registration and login
- Protected user dashboard
- Quiz flow with results and feedback
- Category browsing
- Achievement and statistics pages
- Leaderboard page
- Admin dashboard
- Question management
- Category management
- User management
- Static content pages in the footer

## Project Structure

```text
.
|-- backend/
|   |-- src/main/java/com/ghanamilitaryquiz/
|   |   |-- config/
|   |   |-- controller/
|   |   |-- dto/
|   |   |-- model/
|   |   |-- repository/
|   |   |-- service/
|   |   `-- util/
|   `-- src/main/resources/
|-- frontend/
|   |-- public/
|   `-- src/
|       |-- api/
|       |-- components/
|       |-- context/
|       |-- hooks/
|       |-- pages/
|       `-- types/
|-- database/
|-- docs/
`-- plans/
```

## Getting Started

### Prerequisites

- Java 17+
- Maven 3.9+
- Node.js 18+
- npm
- MySQL 8+

### 1. Clone the repository

```bash
git clone https://github.com/Godfred-Nartey/ghana-military-quiz-app.git
cd ghana-military-quiz-app
```

### 2. Create the database

Run the schema script:

```bash
mysql -u root -p < database/schema.sql
```

If needed, create the database manually first:

```sql
CREATE DATABASE ghana_military_quiz;
```

Optional seed files are available in [database/schema.sql](./database/schema.sql), [database/sample_questions.sql](./database/sample_questions.sql), and [database/insert_questions.sql](./database/insert_questions.sql).

## Environment Configuration

This project uses local `.env` files that are ignored by Git.

### Backend

Copy [backend/.env.example](./backend/.env.example) to `backend/.env` and update the values:

```env
DB_URL=jdbc:mysql://localhost:3306/ghana_military_quiz?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
DB_USERNAME=root
DB_PASSWORD=your_password
JWT_SECRET=your_long_random_secret
JWT_EXPIRATION=86400000
SERVER_PORT=8080
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend

Copy [frontend/.env.example](./frontend/.env.example) to `frontend/.env` and update as needed:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_PROXY_TARGET=http://localhost:8080
VITE_DEV_PORT=3000
```

## Running the Project

### Start the backend

```bash
cd backend
mvn spring-boot:run
```

Backend default URL:

```text
http://localhost:8080
```

### Start the frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL:

```text
http://localhost:3000
```

## Build Commands

### Backend

```bash
cd backend
mvn clean package
```

### Frontend

```bash
cd frontend
npm run build
```

## API Notes

The frontend consumes the backend under:

```text
http://localhost:8080/api
```

Main API groups include:

- `/api/auth`
- `/api/users`
- `/api/categories`
- `/api/questions`
- `/api/quiz`
- `/api/achievements`
- `/api/admin`

## Documentation

Additional project documentation is available here:

- [docs/implementation-guide.md](./docs/implementation-guide.md)
- [plans/architecture-plan.md](./plans/architecture-plan.md)
- [plans/api-endpoints.md](./plans/api-endpoints.md)
- [plans/database-schema.md](./plans/database-schema.md)
- [plans/frontend-architecture.md](./plans/frontend-architecture.md)
- [plans/setup-guide.md](./plans/setup-guide.md)

## Development Notes

- `.env` files are intentionally ignored by Git
- `frontend/node_modules` and `backend/target` are not tracked
- local editor files such as `.vscode` are ignored
- production secrets should never be committed

## Current Status

The application is set up for local full-stack development and includes both user-facing and admin-facing flows. Some areas may still evolve as the project matures, but the repository now reflects a working application structure rather than an initial scaffold.

## License

This project includes the repository [LICENSE](./LICENSE). Review it before reuse or redistribution.
