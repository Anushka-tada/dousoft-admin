const mongoose = require("mongoose");

const PrivacyPolicySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String, 
      required: true,
    },
    order: {
      type: Number,
      default: 0, 
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PrivacyPolicy", PrivacyPolicySchema);