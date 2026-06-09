import mongoose from "mongoose";

const SubscribeSchema  = mongoose.Schema(
    {
        email:{
             type: String,
             required:true,
             trim: true,
             lowercase: true,
             unique: true,
        },
          source: {
      type: String,
      enum: ["footer", "blog"],
      default: "footer",
    },

    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      default: null,
    },
    },
     {
    timestamps: true,
  }
)

export default mongoose.models.Subscribe ||
  mongoose.model("Subscribe", SubscribeSchema);