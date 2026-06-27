import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  loading: false,
  searching: false,
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",

  initialState,

  reducers: {
    // Find Jobs Now
    searchJobsStart: (state) => {
      state.searching = true;
      state.error = null;
    },

    searchJobsSuccess: (state) => {
      state.searching = false;
      state.error = null;
    },

    searchJobsFailure: (state, action) => {
      state.searching = false;
      state.error = action.payload;
    },

    // Fetch Jobs
    getJobsStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    getJobsSuccess: (state, action) => {
      state.loading = false;
      state.jobs = action.payload;
      state.error = null;
    },

    getJobsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearJobs: (state) => {
      state.jobs = [];
      state.loading = false;
      state.searching = false;
      state.error = null;
    },
    markJobApplied: (state, action) => {
      const job = state.jobs.find(
        (job) => job.link === action.payload
      );

      if (job) {
        job.isApplied = true;
      }
    },
  },
});

export const {
  searchJobsStart,
  searchJobsSuccess,
  searchJobsFailure,
  getJobsStart,
  getJobsSuccess,
  getJobsFailure,
  clearJobs,
  markJobApplied
} = jobSlice.actions;

export default jobSlice.reducer;