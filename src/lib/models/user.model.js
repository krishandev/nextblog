import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    // Clerk user ID
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    firstName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    username: {
      type: String,
      unique: true,
      sparse: true, // allows null but unique when present
      lowercase: true,
      trim: true,
    },

    profilePicture: {
      type: String,
      default: '',
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Prevent model overwrite error in dev / hot reload
export default mongoose.models.User ||
  mongoose.model('User', UserSchema);
