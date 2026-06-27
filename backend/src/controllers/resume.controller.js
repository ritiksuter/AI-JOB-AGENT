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
        message: "Only PDF, DOC, and DOCX files are allowed",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete old resume if available
    if (
      user.resumePublicId &&
      user.resumePublicId.length > 0
    ) {
      await deleteResume(user.resumePublicId);
    }

    // Upload new resume
    const uploadedFile = await uploadResume(req.file);

    console.log(uploadResume);

    user.resumeUrl = uploadedFile.secure_url;
    user.resumePublicId = uploadedFile.public_id;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resumeUrl: user.resumeUrl,
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
    const user = await User.findById(
      req.user.userId
    ).select("resumeUrl");

    return res.status(200).json({
      success: true,
      resumeUrl: user?.resumeUrl || null,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume",
    });
  }
};

// Delete Resume
export const removeResume = async (req, res) => {
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

    if (user.resumePublicId) {
      await deleteResume(user.resumePublicId);
    }

    user.resumeUrl = "";
    user.resumePublicId = "";

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete resume",
    });
  }
};