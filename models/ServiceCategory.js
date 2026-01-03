import mongoose from "mongoose";

const ServiceCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    order: {
      type: Number,
      default: 0,
    },

    description: {
     type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.models.ServiceCategory ||
  mongoose.model("ServiceCategory", ServiceCategorySchema);
