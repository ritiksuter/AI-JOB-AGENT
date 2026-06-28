import User from "../models/User.js";
import Application from "../models/Application.js";

import { triggerJobSearch } from "../services/webhook.service.js";
import { getJobsFromSheet } from "../services/googleSheets.service.js";


// Find Jobs Now
export const searchJobs = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.userId
    );

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

    return res.status(200).json({
      success: true,
      message: "Job search started successfully",
    });
  } catch (error) {
    console.error("Search Jobs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to trigger job search",
    });
  }
};

// Get Jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await getJobsFromSheet();

    const applications = await Application.find({
      user: req.user.userId,
    }).select("jobUrl");

    const appliedUrls = new Set(
      applications.map((app) => app.jobUrl)
    );

    const jobsWithStatus = jobs.map((job) => ({
      ...job,
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

// Save Applied Job
export const saveApplication = async (req, res) => {
  try {
    const {
      company,
      role,
      location,
      jobUrl,
      status,
      score,
      description,
      coverLetter,
    } = req.body;

    const existingApplication = await Application.findOne({
      user: req.user.userId,
      jobUrl
    });

    console.log(existingApplication);

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already marked this job as applied.",
      });
    }

    const expiryDate = new Date();

    expiryDate.setDate(
      expiryDate.getDate() + 10
    );

    const application =
      await Application.create({
        user: req.user.userId,
        company,
        role,
        location,
        jobUrl,
        status,

        score,
        description,
        coverLetter,

        expiresAt: expiryDate,
      });

    return res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(
      "Save Application Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to save application",
    });
  }
};

// Get Application History
export const getApplications = async (
  req,
  res
) => {
  try {
    const applications =
      await Application.find({
        user: req.user.userId,
      }).sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error(
      "Application History Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};


// Get Single Application
export const getApplicationById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const application =
      await Application.findOne({
        _id: id,
        user: req.user.userId,
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(
      "Get Application Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch application",
    });
  }
};