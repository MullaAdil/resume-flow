import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuraHeader from './AuraHeader';
import { Sparkles, Mail, Lock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const LoginPage = ({ initialMode = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithPassword, signUp, user } = useAuth();

  const isSignUpRoute = location.pathname === '/signup' || initialMode === 'signup';
  const [isSignUp, setIsSignUp] = useState(isSignUpRoute);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setIsSignUp(location.pathname === '/signup' || initialMode === 'signup');
  }, [location.pathname, initialMode]);

  useEffect(() => {
    if (user) {
      navigate('/builder');
    }
  }, [user, navigate]);

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await signUp({ email, password });
        if (signUpError) {
          setError(signUpError.message || 'Account creation failed. Please check details.');
        } else {
          setSuccessMsg('Account created successfully! Entering Studio...');
          setTimeout(() => navigate('/builder'), 800);
        }
      } else {
        const { error: signInError } = await signInWithPassword({ email, password });
        if (signInError) {
          setError(signInError.message || 'Invalid email or password.');
        } else {
          setSuccessMsg('Access granted! Entering Studio...');
          setTimeout(() => navigate('/builder'), 800);
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AuraHeader />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
        <div className="aura-card" style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#FFFFFF',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {/* Top Brand Identity */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-light)',
              border: '1px solid var(--primary-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: 'var(--primary)',
              boxShadow: '0 0 16px var(--primary-glow)'
            }}>
              <Sparkles size={22} />
            </div>

            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
              {isSignUp ? 'Create Studio Account' : 'Access Studio'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              {isSignUp ? 'Enter your credentials to start building.' : 'Sign in to access your saved career assets.'}
            </p>
          </div>

          {/* Feedback Alerts */}
          {error && (
            <div style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: '#991B1B',
              fontSize: '0.85rem',
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
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem'
            }}>
              <CheckCircle size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Single Form with ONLY ONE Primary Action Button */}
          <form onSubmit={handleSingleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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

            {/* ONLY ONE PRIMARY ACTION BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="aura-btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '0.975rem',
                borderRadius: '9999px',
                marginTop: '0.5rem'
              }}
            >
              {loading ? (
                <span>Entering Studio...</span>
              ) : (
                <>
                  <span>{isSignUp ? 'Create Account & Continue' : 'Continue to Studio'}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Minimal Mode Toggle Link */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {isSignUp ? (
              <span>Already have an account? <button onClick={() => { setIsSignUp(false); setError(''); }} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Sign In</button></span>
            ) : (
              <span>New to Studio? <button onClick={() => { setIsSignUp(true); setError(''); }} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Create Account</button></span>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
