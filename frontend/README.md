# Frontend Documentation

The frontend is a React + Vite application that provides the user interface for the AI Job Search platform.

## What it includes

- Login and registration pages
- Protected dashboard, profile, and resume pages
- Job browsing and application views
- Responsive UI built with reusable components
- Redux-powered state management

## Tech Stack

- React 19
- Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- ESLint

## Project Structure

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at:

```text
http://localhost:5173
```

## Main Pages

- `/login` – login screen
- `/register` – registration screen
- `/dashboard` – main user dashboard
- `/resume` – resume upload and management
- `/profile` – account profile settings
- `/jobs` – job browsing
- `/applications` – application history

## Useful Commands

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run preview` – preview the built app
- `npm run lint` – check for lint issues
