import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  getProfile,
  updateProfile,
  getSchedule,
  updateSchedule,
} from "../controllers/user.controller.js";

const router = express.Router();

// Profile
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

// Schedule
router.get(
  "/schedule",
  authMiddleware,
  getSchedule
);

router.post(
  "/schedule",
  authMiddleware,
  updateSchedule
);

export default router;