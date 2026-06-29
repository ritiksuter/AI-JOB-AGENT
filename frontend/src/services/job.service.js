import api from "./axios";

// Trigger Find Jobs Now
export const searchJobs = async () => {
  const response = await api.post("/jobs/search");

  return response.data;
};

// Get Jobs
export const getJobs = async () => {
  const response = await api.get("/jobs");

  return response.data;
};

// Save Application
export const saveApplication = async (applicationData) => {
  const response = await api.post(
    "/applications/application",
    applicationData
  );

  return response.data;
};

// Get Application History
export const getApplications = async () => {
  const response = await api.get("/applications/application");

  return response.data;
};

// Get Single Application
export const getApplicationById = async (id) => {
  const response = await api.get(
    `/applications/application/${id}`
  );

  return response.data;
};

// Update Application Status
export const updateApplicationStatus = async (
  id,
  status,
  note = ""
) => {
  const response = await api.patch(
    `/applications/application/${id}/status`,
    {
      status,
      note,
    }
  );

  return response.data;
};