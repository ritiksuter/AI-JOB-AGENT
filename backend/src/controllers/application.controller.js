import Application from "../models/Application.js";
import User from "../models/User.js";
import { getJobsFromSheet } from "../services/googleSheets.service.js";
import { analyzeApplication } from "../services/skillsAnalysis.service.js";

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
      jobUrl,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already marked this job as applied.",
      });
    }

    const expiryDate = new Date();

    expiryDate.setDate(expiryDate.getDate() + 10);

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const application = await Application.create({
      user: req.user.userId,

      company,
      role,
      location,
      jobUrl,

      status: "Applied",

      statusHistory: [
        {
          status: "Applied",
          note: "Application submitted",
        },
      ],

      score,
      description,
      coverLetter,

      resume: {
        url: user.resumeUrl,
        publicId: user.resumePublicId,
        originalName: user.resumeOriginalName,
        uploadedAt: user.resumeUploadedAt,
      },

      expiresAt: expiryDate,
    });

    try {
      const aiAnalysis = await analyzeApplication({
        resumeUrl: application.resume.url,
        jobDescription: application.description,
      });

      application.ai = {
        ...aiAnalysis,
        generatedAt: new Date(),
      };

      await application.save();
    } catch (error) {
      console.error("AI Analysis Generation Error:", error);
    }

    return res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Save Application Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save application",
    });
  }
};

// Get Application History
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({
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
    console.error("Application History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

// Get Single Application
export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findOne({
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
    console.error("Get Application Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch application",
    });
  }
};

// Update Application Status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const application = await Application.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;

    application.statusHistory.push({
      status,
      note: note || "",
    });

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully.",
      application,
    });
  } catch (error) {
    console.error("Update Application Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update application status.",
    });
  }
};
