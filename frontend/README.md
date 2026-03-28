# Ghana Military Quiz - Frontend

React frontend for the Ghana Military Quiz application.

## Prerequisites

- Node.js 18+ 
- npm 9+

## Installation

1. Install Node.js from https://nodejs.org/

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

4. Create environment file:
```bash
cp .env.example .env.development
```

5. Start the development server:
```bash
npm run dev
```

The app will be available at http://localhost:3000

## Environment Variables

Create a `.env.development` file with:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Ghana Military Quiz (Dev)
VITE_APP_VERSION=1.0.0-dev
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Features

- User authentication (login/register)
- Quiz categories and questions
- Quiz timer and scoring
- User statistics and progress tracking
- Achievements and badges
- Leaderboard
- Admin dashboard for managing content

## Technology Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router v6 for routing
- TanStack Query for server state
- React Hook Form + Zod for forms
- Recharts for data visualization

## Project Structure

```
src/
├── api/           # API client and endpoints
├── components/    # Reusable React components
├── context/       # React Context providers
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── types/         # TypeScript type definitions
└── index.css     # Global styles
```

## License

MIT
