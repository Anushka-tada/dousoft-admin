import mongoose from "mongoose";

const ServiceSubCategorySchema = new mongoose.Schema(
  {
    
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["general", "city", "technology"],
      required: true,
      index: true,
    },


    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },

    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.models.ServiceSubCategory ||
  mongoose.model("ServiceSubCategory", ServiceSubCategorySchema);
