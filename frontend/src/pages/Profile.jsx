import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProfileForm from "../components/profile/ProfileForm";
import { useNavigate } from "react-router-dom";
import {
  updateUserProfile,
  updateUserSchedule,
} from "../services/user.service";

import { updateProfileSuccess } from "../redux/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile } = useSelector(
    (state) => state.user
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      // Update profile
      await updateUserProfile({
        name: formData.name,
        jobRole: formData.jobRole,
        location: formData.location,
        experience: formData.experience,
        remoteOnly: formData.remoteOnly,
      });

      // Update schedule
      await updateUserSchedule({
        cronExpression: formData.cronExpression,
      });

      // Update Redux
      dispatch(
        updateProfileSuccess({
          ...profile,
          ...formData,
        })
      );

      navigate("/dashboard");
    } 
    catch (error) {
      console.error(
        error.response?.data?.message ||
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Profile">
      <div className="mx-auto max-w-4xl">
        <ProfileForm
          profile={profile}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </div>
    </DashboardLayout>
  );
};

export default Profile;