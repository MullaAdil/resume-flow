import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuraHeader from './AuraHeader';
import { FileText, Mail, Lock, ArrowRight, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

const LoginPage = ({ initialMode = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithPassword, signUp, user } = useAuth();

  const isSignUpRoute = location.pathname === '/signup' || initialMode === 'signup';
  const [mode, setMode] = useState(isSignUpRoute ? 'signup' : 'login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (location.pathname === '/signup') {
      setMode('signup');
    } else if (location.pathname === '/login') {
      setMode('login');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (user) {
      navigate('/builder');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await signUp({ email, password });
        if (signUpError) {
          setError(signUpError.message || 'Registration failed. Please try again.');
        } else {
          setSuccessMsg('Account created successfully! Redirecting...');
          setTimeout(() => navigate('/builder'), 1000);
        }
      } else {
        const { error: signInError } = await signInWithPassword({ email, password });
        if (signInError) {
          setError(signInError.message || 'Invalid email or password.');
        } else {
          setSuccessMsg('Successfully signed in! Redirecting...');
          setTimeout(() => navigate('/builder'), 1000);
        }
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    const backendUrl = import.meta.env.VITE_API_BASE_URL || '';
    window.location.href = `${backendUrl}/api/auth/${provider}`;
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AuraHeader />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
        <div className="aura-card" style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          padding: '2.5rem 2rem'
        }}>
          {/* Header Brand */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'var(--primary-light)',
              border: '1px solid var(--primary-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: 'var(--primary)'
            }}>
              <FileText size={24} />
            </div>

            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {mode === 'signup' 
                ? 'Join thousands of professionals crafting ATS-grade resumes.' 
                : 'Access your saved resumes and career intelligence suite.'}
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            backgroundColor: '#F1F5F9',
            borderRadius: '10px',
            padding: '4px',
            marginBottom: '1.75rem'
          }}>
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
              style={{
                padding: '0.55rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: mode === 'login' ? '#FFFFFF' : 'transparent',
                color: mode === 'login' ? 'var(--text-main)' : 'var(--text-muted)',
                fontWeight: mode === 'login' ? 700 : 500,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: mode === 'login' ? 'var(--shadow-xs)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(''); setSuccessMsg(''); }}
              style={{
                padding: '0.55rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: mode === 'signup' ? '#FFFFFF' : 'transparent',
                color: mode === 'signup' ? 'var(--text-main)' : 'var(--text-muted)',
                fontWeight: mode === 'signup' ? 700 : 500,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: mode === 'signup' ? 'var(--shadow-xs)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Sign Up
            </button>
          </div>

          {/* OAuth Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <button
              type="button"
              onClick={() => handleOAuthLogin('google')}
              className="aura-btn-secondary"
              style={{ width: '100%', justifyContent: 'center', gap: '0.6rem' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleOAuthLogin('github')}
              className="aura-btn-secondary"
              style={{ width: '100%', justifyContent: 'center', gap: '0.6rem' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.25rem 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>OR EMAIL</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
          </div>

          {/* Feedback Alerts */}
          {error && (
            <div style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: '#991B1B',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem'
            }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div style={{
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: '#065F46',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem'
            }}>
              <CheckCircle size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label className="aura-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="aura-input"
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
              </div>
            </div>

            <div>
              <label className="aura-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="aura-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="aura-label">Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    className="aura-input"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="aura-btn-primary"
              style={{ width: '100%', padding: '0.8rem', fontSize: '0.975rem', marginTop: '0.5rem' }}
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>{mode === 'signup' ? 'Create Free Account' : 'Sign In'}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer toggle link */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            {mode === 'signup' ? (
              <span>Already have an account? <button onClick={() => setMode('login')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Sign In</button></span>
            ) : (
              <span>Don't have an account? <button onClick={() => setMode('signup')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Sign Up Free</button></span>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
