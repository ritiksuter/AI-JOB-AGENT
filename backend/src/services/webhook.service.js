import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const triggerJobSearch = async (user) => {
  try {
    const payload = {
      userId: user._id,
      name: user.name,
      email: user.email,

      resumeUrl: user.resumeUrl,

      jobRole: user.jobRole,
      location: user.location,
      experience: user.experience,
      remoteOnly: user.remoteOnly,

      cronExpression: user.cronExpression,
    };

    const response = await axios.post(
      process.env.N8N_WEBHOOK_URL,
      payload
    );

    return response.data;
  } catch (error) {
    console.error(
      "n8n Webhook Error:",
      error.response?.data || error.message
    );

    throw new Error("Failed to trigger n8n workflow");
  }
};