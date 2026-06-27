# Job Agent Backend

This backend service is part of the AI Job Search project. It provides authentication, user profile management, resume upload and retrieval, job search/webhook integration, and saved application tracking.

## Overview

- Built with Node.js, Express, and MongoDB.
- Uses JWT authentication for protected routes.
- Stores user resumes in Cloudinary.
- Integrates with n8n via webhook to trigger job search workflows.
- Exposes REST APIs under `/api/*`.

## Features

- User registration and login
- Protected user profile endpoints
- Resume upload, fetch, and delete
- Job search webhook integration
- Save and list applied job applications
- Health check endpoint at `/`

## Tech Stack

- Node.js
- Express 5
- MongoDB / Mongoose
- JWT authentication
- Cloudinary file upload
- Multer for resume upload handling
- Axios for webhook requests
- dotenv for environment variables

## Installation

1. Open a terminal in the `backend` folder.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in `backend/` with the required keys.
4. Start the server in development mode:

```bash
npm run dev
```

Or start production mode:

```bash
npm start
```

## Environment Variables

Create a `.env` file with at least the following values:

```env
PORT=8000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
FRONTEND_URL=<frontend-origin-url>
CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET=<cloudinary-api-secret>
N8N_WEBHOOK_URL=<n8n-webhook-url>
```

Optional environment values may include frontend origin and other integration settings.

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT token
- `GET /api/auth/me` — Get current authenticated user

### Resume

- `POST /api/resume/upload` — Upload resume file (protected)
- `GET /api/resume` — Get resume details for logged-in user
- `DELETE /api/resume` — Remove resume for logged-in user

### User

- `GET /api/user/profile` — Get user profile
- `PUT /api/user/profile` — Update user profile
- `GET /api/user/schedule` — Get schedule settings
- `POST /api/user/schedule` — Update schedule settings

### Webhook / Job Search

- `POST /api/webhook/search` — Trigger job search workflow
- `GET /api/webhook/jobs` — Get latest jobs
- `POST /api/webhook/application` — Save applied job
- `GET /api/webhook/application` — Get application history

## Project Structure

- `src/app.js` — Express app configuration and routes
- `src/server.js` — MongoDB connection and server startup
- `src/routes/` — API route definitions
- `src/controllers/` — Route handlers
- `src/models/` — Mongoose models
- `src/middlewares/` — Authentication middleware
- `src/services/` — Cloudinary, webhook, and external service helpers

## Notes

- The app uses in-memory file upload via `multer.memoryStorage()` before sending files to Cloudinary.
- All protected endpoints require a valid JWT token in the authorization header.
- Ensure MongoDB and Cloudinary credentials are valid before running the service.
