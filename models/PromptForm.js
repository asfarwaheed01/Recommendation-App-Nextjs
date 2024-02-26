import mongoose from 'mongoose';

const PromptFormSchema = new mongoose.Schema(
  {
    promptId: {
      type: String,
      required: [true, 'PromptId is required.'],
      unique: true,
    },
    label: {
      type: String,
      required: [true, 'Label is required.'],
    },
    color: {
      type: String,
      required: [true, 'Color is required.'],
    },
    answerLevel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AnswerLevel',
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PromptForm ||
  mongoose.model('PromptForm', PromptFormSchema);
