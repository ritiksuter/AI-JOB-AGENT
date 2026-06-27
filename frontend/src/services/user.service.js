import api from "./axios";

// Get User Profile
export const getUserProfile = async () => {
  const response = await api.get("/user/profile");

  return response.data;
};

// Update User Profile
export const updateUserProfile = async (profileData) => {
  const response = await api.put(
    "/user/profile",
    profileData
  );

  return response.data;
};

// Get Cron Schedule
export const getUserSchedule = async () => {
  const response = await api.get("/user/schedule");

  return response.data;
};

// Update Cron Schedule
export const updateUserSchedule = async (scheduleData) => {
  const response = await api.post(
    "/user/schedule",
    scheduleData
  );

  return response.data;
};