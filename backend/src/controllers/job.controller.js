import Job from "../models/Job.js";
import User from "../models/User.js";
import { triggerJobSearch } from "../services/webhook.service.js";
import Application from "../models/Application.js";
import { syncJobsFromSheet } from "../services/jobSync.service.js";


export const getJobs = async (req, res) => {
  try {

    // Sync latest jobs from Google Sheet
    await syncJobsFromSheet();

    // Fetch user's jobs
    const jobs = await Job.find({
      userId: req.user.userId,
    }).sort({
      score: -1,
      createdAt: -1,
    });

    // Fetch applied jobs
    const applications = await Application.find({
      user: req.user.userId,
    }).select("jobUrl");

    const appliedUrls = new Set(
      applications.map((app) => app.jobUrl)
    );

    const jobsWithStatus = jobs.map((job) => ({
      ...job.toObject(),
      isApplied: appliedUrls.has(job.link),
    }));

    return res.status(200).json({
      success: true,
      count: jobsWithStatus.length,
      jobs: jobsWithStatus,
    });

  } catch (error) {
    console.error("Get Jobs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

export const searchJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.resumeUrl) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume first",
      });
    }

    await triggerJobSearch(user);

    user.lastSearchAt = new Date();
    await user.save();

    return res.status(202).json({
      success: true,
      message:
        "Job search started. Your jobs will be available shortly.",
    });
  } catch (error) {
    console.error("Search Jobs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to start job search.",
    });
  }
};

export const syncJobs = async (req, res) => {
  try {

    const result = await syncJobsFromSheet();

    return res.status(200).json({
      success: true,
      ...result,
    });

  } catch (error) {

    console.error("Sync Jobs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to sync jobs.",
    });

  }
};