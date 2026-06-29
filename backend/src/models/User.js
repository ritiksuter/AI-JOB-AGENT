import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    resumeUrl: {
      type: String,
      default: "",
    },

    resumePublicId: {
      type: String,
      default: "",
    },

    resumeOriginalName: {
      type: String,
      default: "",
    },

    resumeUploadedAt: {
      type: Date,
      default: null,
    },

    cronExpression: {
      type: String,
      default: "",
    },

    jobRole: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    remoteOnly: {
      type: Boolean,
      default: false,
    },

    lastSearchAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
