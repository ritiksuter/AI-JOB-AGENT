import api from "./axios";

// Trigger Find Jobs Now
export const searchJobs = async () => {
  const response = await api.post("/webhook/search");

  return response.data;
};

// Get Jobs
export const getJobs = async () => {
  const response = await api.get("/webhook/jobs");

  return response.data;
};

// Save Application
export const saveApplication = async (applicationData) => {
  const response = await api.post(
    "/webhook/application",
    applicationData
  );

  return response.data;
};

// Get Application History
export const getApplications = async () => {
  const response = await api.get("/webhook/application");

  return response.data;
};