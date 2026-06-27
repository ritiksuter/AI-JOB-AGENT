# AI Job Search Platform

A full-stack job search application that helps users discover opportunities, upload resumes, track applications, and manage their profile information. The project is split into a React-based frontend and a Node.js/Express backend that work together to provide a smooth job-search experience.

## Overview

This application includes:

- User authentication and protected routes
- A dashboard for tracking job activity
- Resume upload and profile management
- Job search workflow integration
- Application history tracking
- n8n automation for real-time resume parsing and LinkedIn job search workflows

## Tech Stack

### Frontend

- React 19
- Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Lucide Icons

### Backend

- Node.js
- Express 5
- MongoDB with Mongoose
- JWT authentication
- Cloudinary for resume storage
- Multer for file uploads
- Axios and dotenv

## Project Structure

```text
ai-job-search/
├── backend/           # Express API and MongoDB integration
├── frontend/          # React + Vite client application
└── README.md          # Project overview and setup guide
```

## Getting Started

### 1. Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 2. Configure environment variables

Create a `.env` file inside the backend folder with values such as:

```env
PORT=8000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
N8N_WEBHOOK_URL=<your-webhook-url>
```

### 3. Run the application

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Then open:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## Main Features

### Frontend

- Login and registration screens
- Protected dashboard and profile pages
- Resume upload experience
- Job browsing and application flow
- Responsive UI with reusable components

### Backend

- Authentication endpoints
- User profile management
- Resume upload and retrieval
- Webhook-based job search integration
- Application history storage
- n8n-powered automation for real-time resume parsing and LinkedIn job discovery

## Useful Scripts

### Backend

- `npm run dev` – start the API with nodemon
- `npm start` – start the API in production mode

### Frontend

- `npm run dev` – start the Vite development server
- `npm run build` – create a production build
- `npm run preview` – preview the production build locally

## Notes

- The frontend expects the backend to be available when authentication and job APIs are used.
- Resume files are uploaded to Cloudinary through the backend.
- A valid MongoDB connection is required for the application to function properly.
- The platform uses n8n automation to process resumes and trigger real-time job search flows for LinkedIn-based opportunities.
