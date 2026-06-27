import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    getProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    getProfileSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = null;
    },

    getProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },

    updateProfileSuccess: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const {
  getProfileStart,
  getProfileSuccess,
  getProfileFailure,
  clearProfile,
  updateProfileSuccess,
} = userSlice.actions;

export default userSlice.reducer;