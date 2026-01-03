import mongoose from "mongoose";

const SubscribeSchema  = mongoose.Schema(
    {
        email:{
             type: String,
             required:true,
             trim: true,
             lowercase: true,
             unique: true,
        }
    },
     {
    timestamps: true,
  }
)

export default mongoose.models.Subscribe ||
  mongoose.model("Subscribe", SubscribeSchema);