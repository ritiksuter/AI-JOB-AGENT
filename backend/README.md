# Backend Documentation

The backend powers the AI Job Search platform with authentication, resume handling, user profile management, and job workflow integrations.

## What it does

- Registers and authenticates users with JWT
- Stores and manages user profile details
- Uploads resumes to Cloudinary
- Exposes REST APIs for job-related workflows and applications
- Connects to MongoDB for persistent data storage

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- Cloudinary + Multer
- Axios + dotenv

## Project Structure

```text
backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── services/
└── package.json
```

## Setup

```bash
cd backend
npm install
```

Create a `.env` file with the required variables, then run:

```bash
npm run dev
```

## Main API Areas

- Auth: `/api/auth`
- Resume: `/api/resume`
- User: `/api/user`
- Webhook/job workflow: `/api/webhook`

## Notes

- The API is expected to run on port `8000` by default.
- Protected routes require a valid JWT token.
- Make sure MongoDB and Cloudinary credentials are configured before starting the service.
