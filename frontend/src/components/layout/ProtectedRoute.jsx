import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserProfile } from "../../services/user.service";

import {
  getProfileStart,
  getProfileSuccess,
  getProfileFailure,
} from "../../redux/userSlice";

const ProtectedRoute = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const { profile } = useSelector(
    (state) => state.user
  );

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        dispatch(getProfileStart());

        const data = await getUserProfile();

        dispatch(getProfileSuccess(data.user));
      } catch (error) {
        dispatch(
          getProfileFailure(
            error.response?.data?.message ||
              "Failed to load profile"
          )
        );
      }
    };

    if (token && !profile) {
      loadProfile();
    }
  }, [dispatch, token, profile]);

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;