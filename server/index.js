import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User, Resume, Activity } from './models.js';

// Load .env.local first (prioritized), then load .env for defaults
dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', true);
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

  const cleanEmail = email.trim().toLowerCase();

  try {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
      const existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser) {
        return res.status(400).json({ error: 'An account with this email already exists. Please sign in instead.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email: cleanEmail,
        password: hashedPassword,
        authProvider: 'email',
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });

      return res.status(201).json({
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
        }
      });
    }
  } catch (err) {
    console.warn('DB Signup failed, checking in-memory store fallback:', err.message);
  }

  // In-Memory Fallback
  const existingMem = inMemoryUsers.find(u => u.email === cleanEmail);
  if (existingMem) {
    return res.status(400).json({ error: 'An account with this email already exists. Please sign in instead.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const memUser = { id: 'mem_u_' + Date.now(), email: cleanEmail, password: hashedPassword, authProvider: 'email' };
  inMemoryUsers.push(memUser);

  const token = jwt.sign({ id: memUser.id, email: memUser.email }, JWT_SECRET, { expiresIn: '7d' });
  return res.status(201).json({
    token,
    user: { id: memUser.id, email: memUser.email }
  });
});

// Sign In
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    let user = null;

    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
      user = await User.findOne({ email: cleanEmail });
    }

    // Fallback check in-memory store if DB query returned nothing or DB is disconnected
    if (!user) {
      const memUser = inMemoryUsers.find(u => u.email === cleanEmail);
      if (memUser) {
        const isMatch = await bcrypt.compare(password, memUser.password);
        if (!isMatch) {
          return res.status(401).json({ error: 'Incorrect password. Please double check and try again.' });
        }
        const token = jwt.sign({ id: memUser.id, email: memUser.email }, JWT_SECRET, { expiresIn: '7d' });
        return res.json({
          token,
          user: { id: memUser.id, email: memUser.email }
        });
      }

      return res.status(401).json({ error: 'No account found with this email. Please check your email or click "Create Free Account" below.' });
    }

    // User was found in DB
    if (user.authProvider && user.authProvider !== 'email') {
      return res.status(401).json({
        error: `This account was registered using ${user.authProvider.toUpperCase()} sign-in. Please use the ${user.authProvider.toUpperCase()} button below.`
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password. Please double check and try again.' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      }
    });
  } catch (err) {
    console.error('DB Login error:', err);
    return res.status(500).json({ error: 'An unexpected error occurred during login. Please try again.' });
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

// Helper to get client origin dynamically from query parameter, referer header, or request host
const getClientOrigin = (req) => {
  let origin = req.query.origin || req.headers.origin;
  const serverUrl = getServerUrl(req);

  if (origin) {
    try {
      const originHost = new URL(origin).hostname;
      if ((originHost === 'localhost' || originHost === '127.0.0.1') && !serverUrl.includes('localhost') && !serverUrl.includes('127.0.0.1')) {
        origin = null;
      }
    } catch (e) {}
  }

  if (origin) return origin;

  const referer = req.headers.referer;
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch (e) {}
  }
  if (process.env.CLIENT_URL) return process.env.CLIENT_URL;
  return serverUrl;
};

// Helper to get server's own URL dynamically (protocol + host)
const getServerUrl = (req) => {
  if (process.env.SERVER_URL) {
    return process.env.SERVER_URL;
  }
  let host = req.headers['x-forwarded-host'] || req.headers.host || '';
  if (host.includes(',')) {
    host = host.split(',')[0].trim();
  }
  let proto = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  // Check Cloudflare's cf-visitor header
  if (req.headers['cf-visitor']) {
    try {
      const visitor = JSON.parse(req.headers['cf-visitor']);
      if (visitor.scheme) {
        proto = visitor.scheme;
      }
    } catch (e) {}
  }
  if (proto.includes(',')) {
    proto = proto.split(',')[0].trim();
  }
  return `${proto}://${host}`;
};

// Initiate Google Login
app.get('/api/auth/google', (req, res) => {
  const clientOrigin = getClientOrigin(req);
  if (!GOOGLE_CLIENT_ID) {
    return res.redirect(`${clientOrigin}/login?error=${encodeURIComponent('Google Client ID is not configured on the server.')}`);
  }
  const serverUrl = getServerUrl(req);
  const redirectUri = `${serverUrl}/api/auth/google/callback`;
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email%20profile&state=${encodeURIComponent(clientOrigin)}`;
  res.redirect(url);
});

// Google Callback
app.get('/api/auth/google/callback', async (req, res) => {
  const { code, state } = req.query;
  const clientOrigin = state || getClientOrigin(req);
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
    let user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      const randomPassword = Math.random().toString(36) + Math.random().toString(36);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      user = new User({
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        authProvider: 'google'
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
  const clientOrigin = getClientOrigin(req);
  if (!GITHUB_CLIENT_ID) {
    return res.redirect(`${clientOrigin}/login?error=${encodeURIComponent('GitHub Client ID is not configured on the server.')}`);
  }
  const serverUrl = getServerUrl(req);
  const redirectUri = `${serverUrl}/api/auth/github/callback`;
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email&state=${encodeURIComponent(clientOrigin)}`;
  res.redirect(url);
});

// GitHub Callback
app.get('/api/auth/github/callback', async (req, res) => {
  const { code, state } = req.query;
  const clientOrigin = state || getClientOrigin(req);
  
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
    let user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      const randomPassword = Math.random().toString(36) + Math.random().toString(36);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      user = new User({
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        authProvider: 'github'
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


// --- IN-MEMORY FALLBACK STORE ---
const inMemoryResumes = [];
const inMemoryUsers = [];

// --- RESUME SYNC ROUTES ---

// Get all resumes for a specific sync user key
app.get('/api/resumes', async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'user_id query parameter is required' });
  }

  const key = user_id.toLowerCase();

  try {
    if (mongoose.connection.readyState === 1) {
      const resumes = await Resume.find({ user_id: key })
        .select('_id name updated_at')
        .sort({ updated_at: -1 });

      const formattedResumes = resumes.map(r => ({
        id: r._id,
        name: r.name,
        updated_at: r.updated_at
      }));

      return res.json(formattedResumes);
    }
  } catch (err) {
    console.warn('DB search failed, using in-memory store:', err.message);
  }

  // Fallback to in-memory store
  const filtered = inMemoryResumes
    .filter(r => r.user_id === key)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .map(r => ({ id: r.id, name: r.name, updated_at: r.updated_at }));

  res.json(filtered);
});

// Load a single resume by id
app.get('/api/resumes/:id', async (req, res) => {
  const id = req.params.id;

  try {
    if (mongoose.connection.readyState === 1) {
      const resume = await Resume.findById(id);
      if (resume) {
        return res.json({ name: resume.name, data: resume.data });
      }
    }
  } catch (err) {
    console.warn('DB lookup failed, checking in-memory store:', err.message);
  }

  const memResume = inMemoryResumes.find(r => r.id === id);
  if (memResume) {
    return res.json({ name: memResume.name, data: memResume.data });
  }

  res.status(404).json({ error: 'Resume not found' });
});

// Save or Update a resume (Upsert)
app.post('/api/resumes', async (req, res) => {
  const { user_id, name, data } = req.body;

  if (!user_id || !name || !data) {
    return res.status(400).json({ error: 'user_id, name, and data are required fields' });
  }

  const lowercaseUser = user_id.toLowerCase();
  const trimmedName = name.trim();

  try {
    if (mongoose.connection.readyState === 1) {
      let resume = await Resume.findOne({ user_id: lowercaseUser, name: trimmedName });

      if (resume) {
        resume.data = data;
        resume.updated_at = new Date();
        await resume.save();
      } else {
        resume = new Resume({
          user_id: lowercaseUser,
          name: trimmedName,
          data,
        });
        await resume.save();
      }

      return res.status(200).json({
        message: 'Resume saved successfully',
        id: resume._id
      });
    }
  } catch (err) {
    console.warn('DB save failed, falling back to in-memory store:', err.message);
  }

  // Fallback in-memory save
  let existingIndex = inMemoryResumes.findIndex(r => r.user_id === lowercaseUser && r.name === trimmedName);
  const now = new Date().toISOString();
  if (existingIndex !== -1) {
    inMemoryResumes[existingIndex].data = data;
    inMemoryResumes[existingIndex].updated_at = now;
    return res.status(200).json({ message: 'Resume saved successfully (memory)', id: inMemoryResumes[existingIndex].id });
  } else {
    const newId = 'mem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    const newResume = { id: newId, user_id: lowercaseUser, name: trimmedName, data, updated_at: now };
    inMemoryResumes.push(newResume);
    return res.status(200).json({ message: 'Resume saved successfully (memory)', id: newId });
  }
});

// Delete a saved resume
app.delete('/api/resumes/:id', async (req, res) => {
  const id = req.params.id;

  try {
    if (mongoose.connection.readyState === 1) {
      const result = await Resume.findByIdAndDelete(id);
      if (result) {
        return res.json({ message: 'Resume deleted successfully' });
      }
    }
  } catch (err) {
    console.warn('DB delete failed, checking in-memory store:', err.message);
  }

  const idx = inMemoryResumes.findIndex(r => r.id === id);
  if (idx !== -1) {
    inMemoryResumes.splice(idx, 1);
    return res.json({ message: 'Resume deleted successfully (memory)' });
  }

  res.status(404).json({ error: 'Resume not found' });
});

// --- USER ACTIVITY & DOWNLOAD TRACKING ROUTES ---
const inMemoryActivities = [];

// Log User Activity (e.g. PDF Download, Resume Save)
app.post('/api/activity', optionalAuthenticate, async (req, res) => {
  const { user_id, type, resumeName, templateId } = req.body;
  const targetUser = req.user?.email || user_id || 'anonymous';
  const key = targetUser.toLowerCase();

  try {
    if (mongoose.connection.readyState === 1) {
      const newAct = new Activity({
        user_id: key,
        type: type || 'pdf_download',
        resumeName: resumeName || 'Untitled Resume',
        templateId: templateId || 'multicolor',
      });
      await newAct.save();
      return res.status(201).json({ message: 'Activity logged', activity: newAct });
    }
  } catch (err) {
    console.warn('DB activity log failed, using memory store fallback:', err.message);
  }

  const memAct = {
    id: 'act_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    user_id: key,
    type: type || 'pdf_download',
    resumeName: resumeName || 'Untitled Resume',
    templateId: templateId || 'multicolor',
    created_at: new Date().toISOString()
  };
  inMemoryActivities.push(memAct);
  res.status(201).json({ message: 'Activity logged (memory)', activity: memAct });
});

// Get User Activity History
app.get('/api/activity', optionalAuthenticate, async (req, res) => {
  const user_id = req.query.user_id || req.user?.email || 'anonymous';
  const key = user_id.toLowerCase();

  try {
    if (mongoose.connection.readyState === 1) {
      const activities = await Activity.find({ user_id: key })
        .sort({ created_at: -1 })
        .limit(20);
      return res.json(activities);
    }
  } catch (err) {
    console.warn('DB activity fetch failed, using memory store fallback:', err.message);
  }

  const filtered = inMemoryActivities
    .filter(a => a.user_id === key || a.user_id === 'anonymous')
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 20);

  res.json(filtered);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Serve Vite build output if dist directory exists
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // SPA fallback — serve index.html for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Google Client ID Loaded:', GOOGLE_CLIENT_ID ? 'YES' : 'NO');
  console.log('GitHub Client ID Loaded:', GITHUB_CLIENT_ID ? 'YES' : 'NO');
});
