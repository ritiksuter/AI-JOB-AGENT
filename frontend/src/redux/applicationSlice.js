import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: [],
  loading: false,
  saving: false,
  error: null,
};

const applicationSlice = createSlice({
  name: "applications",

  initialState,

  reducers: {
    // Fetch Applications
    getApplicationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    getApplicationsSuccess: (state, action) => {
      state.loading = false;
      state.applications = action.payload;
      state.error = null;
    },

    getApplicationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Save Application
    saveApplicationStart: (state) => {
      state.saving = true;
      state.error = null;
    },

    saveApplicationSuccess: (state, action) => {
      state.saving = false;
      state.applications.unshift(action.payload);
      state.error = null;
    },

    saveApplicationFailure: (state, action) => {
      state.saving = false;
      state.error = action.payload;
    },

    clearApplications: (state) => {
      state.applications = [];
      state.loading = false;
      state.saving = false;
      state.error = null;
    },
  },
});

export const {
  getApplicationsStart,
  getApplicationsSuccess,
  getApplicationsFailure,
  saveApplicationStart,
  saveApplicationSuccess,
  saveApplicationFailure,
  clearApplications,
} = applicationSlice.actions;

export default applicationSlice.reducer;