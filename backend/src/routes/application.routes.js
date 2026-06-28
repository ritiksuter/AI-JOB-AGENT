import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  saveApplication,
  getApplications,
  getApplicationById,
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

router.get(
  "/application/:id",
  authMiddleware,
  getApplicationById
);

export default router;