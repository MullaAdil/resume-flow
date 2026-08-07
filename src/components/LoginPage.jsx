import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuraHeader from './AuraHeader';
import { Sparkles, Mail, Lock, ArrowRight, CheckCircle, AlertCircle, ShieldCheck, Zap, BarChart3, Layers, Eye, EyeOff, Check, X } from 'lucide-react';

const LoginPage = ({ initialMode = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithPassword, signUp, user, refreshUser } = useAuth();

  const isSignUpRoute = location.pathname === '/signup' || initialMode === 'signup';
  const [isSignUp, setIsSignUp] = useState(isSignUpRoute);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const isAuthActionRef = useRef(false);

  useEffect(() => {
    setIsSignUp(location.pathname === '/signup' || initialMode === 'signup');
  }, [location.pathname, initialMode]);

  // Handle OAuth Redirect URL search parameters (?token=... or ?error=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const oauthToken = params.get('token');
    const oauthError = params.get('error');

    if (oauthToken) {
      localStorage.setItem('auth_token', oauthToken);
      setSuccessMsg('Google / OAuth authentication successful! Entering Home Page...');
      if (refreshUser) refreshUser();
      setTimeout(() => navigate('/'), 600);
    } else if (oauthError) {
      setError(decodeURIComponent(oauthError));
    }
  }, [location.search, refreshUser, navigate]);

  useEffect(() => {
    if (user && !location.search.includes('token=') && !isAuthActionRef.current) {
      navigate('/');
    }
  }, [user, navigate, location.search]);

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      isAuthActionRef.current = true;
      if (isSignUp) {
        await signUp(email, password);
        setSuccessMsg('Account created successfully! Directing to Home...');
        setTimeout(() => navigate('/'), 700);
      } else {
        await signInWithPassword(email, password);
        setSuccessMsg('Signed in successfully! Directing to Home...');
        setTimeout(() => navigate('/'), 700);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    let backendUrl = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
    const currentOrigin = window.location.origin;
    window.location.href = `${backendUrl}/api/auth/${provider}?origin=${encodeURIComponent(currentOrigin)}`;
  };

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AuraHeader />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3.5rem 1.5rem' }}>
        {/* Large Horizontal Card Container */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '960px' }}>
          
          {/* Stacked paper backing layer 2 — Soft Cool Studio Slate (#F1F5F9) */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            background: '#F1F5F9',
            border: '1px solid #CBD5E1',
            transform: 'translate(12px, 14px) rotate(1.2deg)',
            zIndex: -2,
            boxShadow: '0 6px 20px rgba(15, 23, 42, 0.04)'
          }} />

          {/* Stacked paper backing layer 1 — Soft Warm Linen Ivory (#FAF9F5) */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            background: '#FAF9F5',
            border: '1px solid #E7E5E0',
            transform: 'translate(6px, 7px) rotate(0.6deg)',
            zIndex: -1,
            boxShadow: '0 6px 20px rgba(15, 23, 42, 0.05)'
          }} />

          {/* Main Horizontal Card */}
          <div style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 50px -12px rgba(15, 23, 42, 0.12)',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))'
          }}>
            
            {/* Left Side: Brand Feature Showcase Panel */}
            <div style={{
              backgroundColor: 'var(--primary-light)',
              borderRight: '1px solid var(--primary-border)',
              padding: '3.25rem 2.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Subtle background glow circle */}
              <div style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                background: 'var(--primary-glow)',
                filter: 'blur(40px)',
                pointerEvents: 'none'
              }} />

              <div>
                {/* Brand Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--primary-border)',
                  color: 'var(--primary)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  marginBottom: '2rem',
                  boxShadow: '0 2px 10px var(--primary-glow)'
                }}>
                  <Sparkles size={16} />
                  <span>LUMEN CAREER STUDIO</span>
                </div>

                <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.25, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
                  Craft Precision ATS Resumes Powered by AI.
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem', lineHeight: 1.6, marginBottom: '2.25rem' }}>
                  Join thousands of top engineers, managers, and designers building job-winning resumes in minutes.
                </p>

                {/* Feature Bullet Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FFFFFF', border: '1px solid var(--primary-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>100% ATS Optimized</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Scannable by Workday, Greenhouse & Lever</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FFFFFF', border: '1px solid var(--primary-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                      <Zap size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>AI Executive Writer</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Generate impact metrics & role descriptions</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FFFFFF', border: '1px solid var(--primary-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                      <BarChart3 size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>Live Benchmark Score</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Audit content against 10,000+ top resumes</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Testimonial Pill */}
              <div style={{
                marginTop: '2.5rem',
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid var(--primary-border)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem'
              }}>
                <div style={{ fontSize: '1.4rem' }}>🌟</div>
                <div>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)' }}>"Landed 4 interviews in 1 week"</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Senior Software Engineer</div>
                </div>
              </div>
            </div>

            {/* Right Side: Form Panel */}
            <div style={{ padding: '3.25rem 2.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              
              <div style={{ marginBottom: '1.75rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  {isSignUp ? 'Create Studio Account' : 'Welcome Back'}
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {isSignUp ? 'Sign up to start building your ATS-ready resume.' : 'Sign in to access your saved resume drafts & AI tools.'}
                </p>
              </div>

              {/* Feedback Alerts */}
              {error && (
                <div style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  borderRadius: '10px',
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
                  borderRadius: '10px',
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

              {/* Form */}
              <form onSubmit={handleSingleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label className="aura-label">Work Email</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      className="aura-input"
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ paddingLeft: '2.5rem', height: '50px' }}
                    />
                    <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '16px' }} />
                  </div>
                </div>

                <div>
                  <label className="aura-label">Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="aura-input"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem', height: '50px' }}
                    />
                    <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '16px' }} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '12px',
                        background: 'none',
                        border: 'none',
                        padding: '6px',
                        cursor: 'pointer',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px'
                      }}
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="aura-btn-primary"
                  style={{
                    width: '100%',
                    height: '50px',
                    fontSize: '1rem',
                    borderRadius: '9999px',
                    marginTop: '0.5rem'
                  }}
                >
                  {loading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>{isSignUp ? 'Create Free Account' : 'Sign In to Studio'}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0 1.25rem' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>OR CONTINUE WITH</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
              </div>

              {/* OAuth Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('google')}
                  className="aura-btn-secondary"
                  style={{ padding: '0.7rem 1rem', fontSize: '0.875rem', justifyContent: 'center', gap: '0.5rem', borderRadius: '12px' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuthLogin('github')}
                  className="aura-btn-secondary"
                  style={{ padding: '0.7rem 1rem', fontSize: '0.875rem', justifyContent: 'center', gap: '0.5rem', borderRadius: '12px' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>

              {/* Mode Toggle Footer */}
              <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {isSignUp ? (
                  <span>Already have an account? <button onClick={() => { setIsSignUp(false); setError(''); }} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Sign In</button></span>
                ) : (
                  <span>New to Studio? <button onClick={() => { setIsSignUp(true); setError(''); }} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>Create Free Account</button></span>
                )}
              </div>
            </div>

          </div>{/* Main Horizontal Card */}
        </div>{/* Paper Stack Outer Container */}
      </main>
    </div>
  );
};

export default LoginPage;
