import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "",
    },

    jobUrl: {
      type: String,
      default: "",
    },

    score: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    coverLetter: {
      type: String,
      default: "",
    },

    resume: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },

      originalName: {
        type: String,
        default: "",
      },

      uploadedAt: {
        type: Date,
        default: null,
      },
    },

    ai: {
      skillsAnalysis: {
        overallScore: {
          type: Number,
          default: 0,
        },

        matchedSkills: {
          type: [String],
          default: [],
        },

        missingSkills: {
          type: [String],
          default: [],
        },

        suggestions: {
          type: [String],
          default: [],
        },
      },

      resumeSuggestions: {
        strengths: {
          type: [String],
          default: [],
        },

        improvements: {
          type: [String],
          default: [],
        },

        missingKeywords: {
          type: [String],
          default: [],
        },
      },

      interviewPreparation: {
        technicalQuestions: {
          type: [String],
          default: [],
        },

        behavioralQuestions: {
          type: [String],
          default: [],
        },

        hrQuestions: {
          type: [String],
          default: [],
        },
      },

      jobInsights: {
        difficulty: {
          type: String,
          default: "",
        },

        estimatedATS: {
          type: Number,
          default: 0,
        },

        recommendation: {
          type: String,
          default: "",
        },
      },

      generatedAt: {
        type: Date,
        default: null,
      },
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Viewed",
        "Shortlisted",
        "Interview",
        "Offer",
        "Accepted",
        "Rejected",
        "Withdrawn",
      ],
      default: "Applied",
    },

    statusHistory: [
      {
        status: {
          type: String,
          enum: [
            "Applied",
            "Viewed",
            "Shortlisted",
            "Interview",
            "Offer",
            "Accepted",
            "Rejected",
            "Withdrawn",
          ],
        },

        updatedAt: {
          type: Date,
          default: Date.now,
        },

        note: {
          type: String,
          default: "",
        },
      },
    ],

    appliedAt: {
      type: Date,
      default: Date.now,
    },

    expiresAt: {
      type: Date,
      required: true,
      expires: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
