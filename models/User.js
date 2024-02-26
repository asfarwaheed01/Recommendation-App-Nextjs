import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required.'],
      unique: true,
    },
    firstName: String,
    lastname: String,
    imageUrl: String,
    primaryEmail: String,
    likedResults: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LikedResults',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
