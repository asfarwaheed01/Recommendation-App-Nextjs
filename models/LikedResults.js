import mongoose from 'mongoose';

export const LikedResultsSchema = new mongoose.Schema(
  {
    results: [String],
    color: {
      type: String,
      required: [true, 'Color is not provided'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.LikedResults ||
  mongoose.model('LikedResults', LikedResultsSchema);
