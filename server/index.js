import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User, Resume } from './models.js';

// Load .env.local first (prioritized), then load .env for defaults
dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resume-builder';

app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`[HTTP] ${req.method} ${req.url}`);
  next();
});

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

// --- OAUTH LOGINS ---
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5001';

// Helper to get client origin dynamically from query parameter or referer header
const getClientOrigin = (req) => {
  if (req.query.origin) return req.query.origin;
  const referer = req.headers.referer;
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch (e) {}
  }
  return CLIENT_URL;
};

// Helper to get server's own URL dynamically (protocol + host)
const getServerUrl = (req) => {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || req.protocol;
  return `${proto}://${host}`;
};

// Initiate Google Login
app.get('/api/auth/google', (req, res) => {
  if (!GOOGLE_CLIENT_ID) {
    return res.redirect(`${CLIENT_URL}/login?error=${encodeURIComponent('Google Client ID is not configured on the server.')}`);
  }
  const clientOrigin = getClientOrigin(req);
  const serverUrl = getServerUrl(req);
  const redirectUri = `${serverUrl}/api/auth/google/callback`;
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email%20profile&state=${encodeURIComponent(clientOrigin)}`;
  res.redirect(url);
});

// Google Callback
app.get('/api/auth/google/callback', async (req, res) => {
  const { code, state } = req.query;
  const clientOrigin = state || CLIENT_URL;
  const serverUrl = getServerUrl(req);
  const redirectUri = `${serverUrl}/api/auth/google/callback`;
  
  if (!code) {
    console.log('[Google Auth] Missing code parameter');
    return res.redirect(`${clientOrigin}/login?error=auth_failed`);
  }

  try {
    console.log('[Google Auth] Exchanging code...');
    // Exchange authorization code for token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });
    
    console.log('[Google Auth] Parsing token response...');
    const tokenData = await tokenResponse.json();
    console.log('[Google Auth] Token Data received:', tokenData);
    if (tokenData.error) {
      throw new Error(tokenData.error_description || 'Failed to exchange Google authorization code');
    }

    console.log('[Google Auth] Fetching user profile info...');
    // Retrieve user profile
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const userData = await userResponse.json();
    console.log('[Google Auth] User profile received:', userData.email);

    const email = userData.email;
    if (!email) {
      throw new Error('Email address was not provided by Google');
    }

    // Find or create user in DB
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      const randomPassword = Math.random().toString(36) + Math.random().toString(36);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      user = new User({
        email: email.toLowerCase(),
        password: hashedPassword
      });
      await user.save();
    }

    // Sign JWT session token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    
    console.log('[Google Auth] Redirecting client with token...');
    res.redirect(`${clientOrigin}/login?token=${token}`);
  } catch (err) {
    console.error('Google OAuth Error:', err);
    res.redirect(`${clientOrigin}/login?error=${encodeURIComponent(err.message)}`);
  }
});

// Initiate GitHub Login
app.get('/api/auth/github', (req, res) => {
  if (!GITHUB_CLIENT_ID) {
    return res.redirect(`${CLIENT_URL}/login?error=${encodeURIComponent('GitHub Client ID is not configured on the server.')}`);
  }
  const clientOrigin = getClientOrigin(req);
  const serverUrl = getServerUrl(req);
  const redirectUri = `${serverUrl}/api/auth/github/callback`;
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email&state=${encodeURIComponent(clientOrigin)}`;
  res.redirect(url);
});

// GitHub Callback
app.get('/api/auth/github/callback', async (req, res) => {
  const { code, state } = req.query;
  const clientOrigin = state || CLIENT_URL;
  
  if (!code) {
    return res.redirect(`${clientOrigin}/login?error=auth_failed`);
  }

  try {
    // Exchange authorization code for token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        code,
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET
      })
    });
    
    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      throw new Error(tokenData.error_description || 'Failed to exchange GitHub authorization code');
    }

    // Retrieve user profile
    const userResponse = await fetch('https://api.github.com/user', {
      headers: { 
        Authorization: `Bearer ${tokenData.access_token}`,
        'User-Agent': 'resume-builder-server'
      }
    });
    const userData = await userResponse.json();

    let email = userData.email;

    // Fetch emails list if primary email is private
    if (!email) {
      const emailsResponse = await fetch('https://api.github.com/user/emails', {
        headers: { 
          Authorization: `Bearer ${tokenData.access_token}`,
          'User-Agent': 'resume-builder-server'
        }
      });
      const emails = await emailsResponse.json();
      if (Array.isArray(emails)) {
        const primaryEmailObj = emails.find(e => e.primary && e.verified);
        email = primaryEmailObj ? primaryEmailObj.email : (emails[0] ? emails[0].email : null);
      }
    }

    if (!email) {
      throw new Error('No verified email address could be fetched from your GitHub account.');
    }

    // Find or create user in DB
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      const randomPassword = Math.random().toString(36) + Math.random().toString(36);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      user = new User({
        email: email.toLowerCase(),
        password: hashedPassword
      });
      await user.save();
    }

    // Sign JWT session token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    
    res.redirect(`${clientOrigin}/login?token=${token}`);
  } catch (err) {
    console.error('GitHub OAuth Error:', err);
    res.redirect(`${clientOrigin}/login?error=${encodeURIComponent(err.message)}`);
  }
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
  console.log('Google Client ID Loaded:', GOOGLE_CLIENT_ID ? 'YES' : 'NO');
  console.log('GitHub Client ID Loaded:', GITHUB_CLIENT_ID ? 'YES' : 'NO');
});
