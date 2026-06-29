import User from "../models/User.js";
import {
  uploadResume,
  deleteResume,
} from "../services/cloudinary.service.js";

// Upload Resume
export const uploadUserResume = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Only PDF, DOC and DOCX files are allowed",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete previous resume if it exists
    if (user.resumePublicId) {
      await deleteResume(user.resumePublicId);
    }

    // Upload new resume
    const uploadedFile = await uploadResume(req.file);

    user.resumeUrl = uploadedFile.secure_url;
    user.resumePublicId = uploadedFile.public_id;
    user.resumeOriginalName = req.file.originalname;
    user.resumeUploadedAt = new Date();

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: {
        url: user.resumeUrl,
        publicId: user.resumePublicId,
        originalName: user.resumeOriginalName,
        uploadedAt: user.resumeUploadedAt,
      },
    });
  } catch (error) {
    console.error("Resume Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload resume",
    });
  }
};

// Get Resume
export const getResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "resumeUrl resumePublicId resumeOriginalName resumeUploadedAt"
    );

    return res.status(200).json({
      success: true,
      resume: {
        url: user?.resumeUrl || "",
        publicId: user?.resumePublicId || "",
        originalName: user?.resumeOriginalName || "",
        uploadedAt: user?.resumeUploadedAt || null,
      },
    });
  } catch (error) {
    console.error("Get Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume",
    });
  }
};

// Delete Resume
export const removeResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.resumePublicId) {
      await deleteResume(user.resumePublicId);
    }

    user.resumeUrl = "";
    user.resumePublicId = "";
    user.resumeOriginalName = "";
    user.resumeUploadedAt = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete resume",
    });
  }
};