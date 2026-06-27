import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import userReducer from "./userSlice";
import jobReducer from "./jobSlice";
import applicationReducer from "./applicationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    jobs: jobReducer,
    applications: applicationReducer,
  },
  devTools: import.meta.env.DEV,
});