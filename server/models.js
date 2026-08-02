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

const activitySchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  type: {
    type: String,
    default: 'pdf_download',
  },
  resumeName: {
    type: String,
    default: 'Untitled Resume',
  },
  templateId: {
    type: String,
    default: 'multicolor',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

activitySchema.index({ user_id: 1, created_at: -1 });

export const User = mongoose.model('User', userSchema);
export const Resume = mongoose.model('Resume', resumeSchema);
export const Activity = mongoose.model('Activity', activitySchema);
