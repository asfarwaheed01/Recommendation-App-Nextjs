import mongoose from 'mongoose';

const AnswerLevelSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Question is required.'],
    },
    choices: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AnswerLevel ||
  mongoose.model('AnswerLevel', AnswerLevelSchema);
