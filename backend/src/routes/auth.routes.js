import express from "express";

import {
  register,
  login,
  getMe,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// Current Logged-in User
router.get("/me", authMiddleware, getMe);

export default router;