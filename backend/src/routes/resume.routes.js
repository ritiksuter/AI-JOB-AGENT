import express from "express";
import multer from "multer";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  uploadUserResume,
  getResume,
  removeResume,
} from "../controllers/resume.controller.js";

const router = express.Router();

// Store file in memory before uploading to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

// Upload Resume
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadUserResume
);

// Get Resume
router.get(
  "/",
  authMiddleware,
  getResume
);

// Delete Resume
router.delete(
  "/",
  authMiddleware,
  removeResume
);

export default router;