import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../components/layout/DashboardLayout";
import ResumeUploader from "../components/resume/ResumeUploader";

import {
  uploadResume,
  deleteResume,
} from "../services/resume.service";

import { updateProfileSuccess } from "../redux/userSlice";

const Resume = () => {
  const dispatch = useDispatch();

  const { profile } = useSelector(
    (state) => state.user
  );

  const [uploading, setUploading] =
    useState(false);

  const handleUpload = async (file) => {
    try {
      setUploading(true);

      const data = await uploadResume(file);

      dispatch(
        updateProfileSuccess({
          ...profile,
          resumeUrl: data.resumeUrl,
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteResume();

      dispatch(
        updateProfileSuccess({
          ...profile,
          resumeUrl: "",
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout title="Resume">
      <ResumeUploader
        resumeUrl={profile?.resumeUrl}
        uploading={uploading}
        onUpload={handleUpload}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  );
};

export default Resume;