import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema(
 {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String, 
      required: true,
    },
    time: {
      type: String, 
      required: true,
    },
    } ,{
    timestamps: true,
  }
)

export default mongoose.models.Meeting ||
  mongoose.model("Meeting", MeetingSchema);