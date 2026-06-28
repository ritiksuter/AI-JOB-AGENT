import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    score: {
      type: Number,
      default: 0,
    },

    link: {
      type: String,
      required: true,
      trim: true,
    },

    coverLetter: {
      type: String,
      default: "",
    },

    fetchedAt: {
      type: Date,
      default: Date.now,
    },

    expireAt: {
      type: Date,
      required: true,
      index: {
        expires: 0, // MongoDB Atlas TTL
      },
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate jobs for the same user
jobSchema.index({
  userId: 1,
  link: 1,
}, { unique: true });

const Job = mongoose.model("Job", jobSchema);

export default Job;