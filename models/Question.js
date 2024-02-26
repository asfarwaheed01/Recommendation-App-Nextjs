import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema(
  {
    questionId: {
      type: Number,
      required: [true, 'Question category is required.'],
    },
    category: {
      type: String,
      required: [true, 'Question category is required.'],
    },
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

export default mongoose.models.Question ||
  mongoose.model('Question', QuestionSchema);
