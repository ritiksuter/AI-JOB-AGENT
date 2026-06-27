import User from "../models/User.js";

// Get User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.userId
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update User Profile
export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      jobRole,
      location,
      experience,
      remoteOnly,
    } = req.body;

    const user = await User.findById(
      req.user.userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (jobRole !== undefined) {
      user.jobRole = jobRole;
    }

    if (location !== undefined) {
      user.location = location;
    }

    if (experience !== undefined) {
      user.experience = experience;
    }

    if (remoteOnly !== undefined) {
      user.remoteOnly = remoteOnly;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Save Cron Schedule
export const updateSchedule = async (req, res) => {
  try {
    const { cronExpression } = req.body;

    if (!cronExpression) {
      return res.status(400).json({
        success: false,
        message: "Cron expression is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        cronExpression,
      },
      {
        new: true,
      }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Schedule updated successfully",
      cronExpression: user.cronExpression,
    });
  } catch (error) {
    console.error("Schedule Update Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Schedule
export const getSchedule = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.userId
    ).select("cronExpression");

    return res.status(200).json({
      success: true,
      cronExpression:
        user?.cronExpression || "",
    });
  } catch (error) {
    console.error("Get Schedule Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};