// models/VisitorLog.js
import mongoose from 'mongoose';

const VisitorLogSchema = new mongoose.Schema({
  date: {
    type: String, // "2025-06-05" format
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.VisitorLog ||
  mongoose.model('VisitorLog', VisitorLogSchema);