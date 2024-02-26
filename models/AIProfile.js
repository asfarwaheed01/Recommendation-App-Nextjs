import mongoose from 'mongoose';

export const AIProfileSchema = new mongoose.Schema(
  {
    value: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AIProfile ||
  mongoose.model('AIProfile', AIProfileSchema);
