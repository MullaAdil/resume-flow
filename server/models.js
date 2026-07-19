import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const resumeSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Compound index to ensure that for a given user, resume name is unique.
resumeSchema.index({ user_id: 1, name: 1 }, { unique: true });

export const User = mongoose.model('User', userSchema);
export const Resume = mongoose.model('Resume', resumeSchema);
