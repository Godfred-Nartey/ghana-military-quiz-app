# Deployment Guide

## Recommended Hosting Setup

This repository is best deployed as three separate pieces:

- `frontend/` on Vercel
- `backend/` on Render
- MySQL on Aiven

This is the best fit for the current project structure because:

- the frontend is a standalone Vite single-page app
- the backend is a standalone Spring Boot API
- the frontend already supports a hosted API base URL through `VITE_API_BASE_URL`
- the backend already supports environment-based configuration for database, JWT, port, and CORS

## Architecture

```text
Vercel (frontend)
  -> calls
Render (Spring Boot backend)
  -> connects to
Aiven MySQL
```

## 1. Deploy the Database on Aiven

Create an Aiven MySQL service, then copy the connection details from the service overview page.

Use these values to prepare your backend environment variables:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

For Spring Boot, use the JDBC URL that Aiven provides from its Java / JDBC quick-connect flow. If you prefer to assemble it manually, it should follow this pattern:

```env
DB_URL=jdbc:mysql://YOUR_AIVEN_HOST:YOUR_AIVEN_PORT/YOUR_DATABASE?ssl-mode=REQUIRED
DB_USERNAME=YOUR_USERNAME
DB_PASSWORD=YOUR_PASSWORD
```

### Create the database schema

Load the schema from:

- `database/schema.sql`

Optional seed content is available in:

- `database/sample_questions.sql`
- `database/insert_questions.sql`

You can import those scripts with any MySQL client that can connect to Aiven, or by using Aiven's connection URI with a local MySQL tool.

## 2. Deploy the Backend on Render

Create a new **Web Service** in Render and connect this repository.

Use these settings:

- Root Directory: `backend`
- Runtime: `Docker`
- Dockerfile Path: `./Dockerfile`

### Backend environment variables

Set these in Render:

```env
DB_URL=jdbc:mysql://YOUR_AIVEN_HOST:YOUR_AIVEN_PORT/YOUR_DATABASE?ssl-mode=REQUIRED
DB_USERNAME=YOUR_USERNAME
DB_PASSWORD=YOUR_PASSWORD
JWT_SECRET=generate-a-long-random-secret
JWT_EXPIRATION=86400000
CORS_ALLOWED_ORIGINS=https://YOUR-FRONTEND-DOMAIN.vercel.app
```

Notes:

- Do not set `SERVER_PORT` on Render unless you have a specific reason. Render provides `PORT`, and the app now reads `server.port=${PORT:${SERVER_PORT:8080}}`.
- If you later add a custom frontend domain, append it to `CORS_ALLOWED_ORIGINS` as a comma-separated value.
- After the first deploy, verify the API is up by opening:

```text
https://YOUR-RENDER-SERVICE.onrender.com/swagger-ui.html
```

## 3. Deploy the Frontend on Vercel

Create a new Vercel project and import this repository.

Use these settings:

- Root Directory: `frontend`
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

### Frontend environment variables

Set this in Vercel:

```env
VITE_API_BASE_URL=https://YOUR-RENDER-SERVICE.onrender.com/api
```

Optional values:

```env
VITE_APP_NAME=Ghana Military Quiz
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=false
```

### Why `frontend/vercel.json` was added

This app uses React Router, so Vercel must rewrite unknown routes back to `index.html`. Without that rewrite, direct visits or refreshes on routes like `/login`, `/dashboard`, or `/admin/users` can return 404.

## 4. Connect the Hosted Services

After both deployments are live:

1. Copy the Vercel production URL.
2. Add that exact URL to Render as `CORS_ALLOWED_ORIGINS`.
3. Redeploy the backend if needed.
4. Confirm the frontend `VITE_API_BASE_URL` points to the Render backend `/api` path.

## 5. Production Checklist

- `JWT_SECRET` is long and random
- Aiven schema has been imported successfully
- `CORS_ALLOWED_ORIGINS` contains the exact Vercel domain
- `VITE_API_BASE_URL` ends with `/api`
- Render backend is reachable before testing the frontend
- Frontend routes refresh correctly on Vercel

## 6. Recommended Deployment Order

1. Create Aiven MySQL
2. Import `database/schema.sql`
3. Deploy Render backend with Aiven credentials
4. Verify backend health and Swagger
5. Deploy Vercel frontend with the Render API URL
6. Update backend CORS with the final Vercel domain
7. Test login, quiz flow, leaderboard, and admin pages
