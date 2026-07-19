import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User, Resume } from './models.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resume-builder';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    console.log('Ensure your MongoDB server is running. Running without active DB connection...');
  });

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = decoded;
    next();
  });
};

// Optional Authentication Middleware (adds user to req if token is valid, but does not block)
const optionalAuthenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return next();

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (!err) {
      req.user = decoded;
    }
    next();
  });
};

// --- AUTHENTICATION ROUTES ---

// Sign Up
app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// Sign In
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error during authentication' });
  }
});

// Get Current User
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
    }
  });
});


// --- RESUME SYNC ROUTES ---

// Get all resumes for a specific sync user key
app.get('/api/resumes', async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'user_id query parameter is required' });
  }

  try {
    const resumes = await Resume.find({ user_id: user_id.toLowerCase() })
      .select('_id name updated_at')
      .sort({ updated_at: -1 });

    // Map _id to id to match Supabase's format
    const formattedResumes = resumes.map(r => ({
      id: r._id,
      name: r.name,
      updated_at: r.updated_at
    }));

    res.json(formattedResumes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve resumes' });
  }
});

// Load a single resume by id
app.get('/api/resumes/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json({
      name: resume.name,
      data: resume.data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch resume details' });
  }
});

// Save or Update a resume (Upsert)
app.post('/api/resumes', async (req, res) => {
  const { user_id, name, data } = req.body;

  if (!user_id || !name || !data) {
    return res.status(400).json({ error: 'user_id, name, and data are required fields' });
  }

  try {
    const lowercaseUser = user_id.toLowerCase();
    
    // Find if a resume exists with the same user_id and name
    let resume = await Resume.findOne({ user_id: lowercaseUser, name: name.trim() });

    if (resume) {
      resume.data = data;
      resume.updated_at = new Date();
      await resume.save();
    } else {
      resume = new Resume({
        user_id: lowercaseUser,
        name: name.trim(),
        data,
      });
      await resume.save();
    }

    res.status(200).json({
      message: 'Resume saved successfully',
      id: resume._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save resume' });
  }
});

// Delete a saved resume
app.delete('/api/resumes/:id', async (req, res) => {
  try {
    const result = await Resume.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json({ message: 'Resume deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
