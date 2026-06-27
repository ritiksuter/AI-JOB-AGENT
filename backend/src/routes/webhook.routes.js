import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  searchJobs,
  getJobs,
  saveApplication,
  getApplications,
} from "../controllers/webhook.controller.js";

const router = express.Router();

// Find Jobs Now
router.post(
  "/search",
  authMiddleware,
  searchJobs
);

// Get Latest Jobs
router.get(
  "/jobs",
  authMiddleware,
  getJobs
);

// Save Applied Job
router.post(
  "/application",
  authMiddleware,
  saveApplication
);

// Get Application History
router.get(
  "/application",
  authMiddleware,
  getApplications
);

export default router;