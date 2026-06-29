import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  saveApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

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

// Get Single Application
router.get(
  "/application/:id",
  authMiddleware,
  getApplicationById
);

// Update Application Status
router.patch(
  "/application/:id/status",
  authMiddleware,
  updateApplicationStatus
);

export default router;