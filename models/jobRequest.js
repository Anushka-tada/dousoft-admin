import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: true,
    },


    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    linkedin: String,
    portfolio: String,
    experience: String,

   
    coverLetter: {
      type: String,
      required: true,
    },

    
    resume: {
      type: String,
      required: true,
    },

    
    status: {
      type: String,
      enum: ["pending", "reviewed", "rejected", "selected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.JobApplication ||
  mongoose.model("JobApplication", JobApplicationSchema);