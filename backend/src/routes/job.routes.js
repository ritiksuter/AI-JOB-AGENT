import express from "express";
import {
  getJobs,
  searchJobs,
  syncJobs,
} from "../controllers/job.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { verifyInternalApiKey } from "../middlewares/internalAuth.middleware.js";


const router = express.Router();

router.post("/search", verifyJWT, searchJobs);

router.get("/", verifyJWT, getJobs);


router.post(
  "/internal/sync",
  verifyJWT,
  syncJobs
);

export default router;