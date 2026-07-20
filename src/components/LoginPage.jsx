import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FileText, ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Focus states for the inputs (drives the page-on-page rotation under fields)
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      if (isSignUp) {
        await signUp(email, password);
        setMessage('Account created successfully! Redirecting...');
        setTimeout(() => navigate('/templates'), 1500);
      } else {
        await signIn(email, password);
        setMessage('Sign in successful! Redirecting...');
        setTimeout(() => navigate('/templates'), 1000);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-color)',
      position: 'relative',
      overflow: 'hidden',
      padding: '3rem 2rem'
    }}>
      {/* Background Soft Watercolor Lighting Blobs */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(55px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(29, 78, 216, 0.03) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(55px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '30%', left: '30%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(45px)', zIndex: 0 }} />

      {/* ── STACKED PAGES WRAPPER (80% viewport width) ── */}
      <div style={{
        position: 'relative',
        width: isMobile ? '95%' : '80%',
        maxWidth: '1200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        height: isMobile ? 'auto' : '490px'
      }}>
        
        {/* Layer 1: Bottom Colorful Artist Cover (Static backing) */}
        <div style={{
          position: 'absolute',
          inset: isMobile ? '-6px -3px' : '-10px -5px',
          background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 25%, #8B5CF6 50%, #EC4899 75%, #F59E0B 100%)',
          borderRadius: '16px',
          transform: isMobile ? 'rotate(1.2deg) translateY(3px)' : 'rotate(2.2deg) translateY(6px)',
          zIndex: 1,
          boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
          opacity: 0.95
        }} />

        {/* Layer 2: Middle Stacked Document Page (Static backing) */}
        <div style={{
          position: 'absolute',
          inset: '0',
          background: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: '12px',
          transform: isMobile ? 'rotate(-0.8deg) translateY(-2px)' : 'rotate(-1.6deg) translateY(-4px)',
          zIndex: 2,
          boxShadow: '0 8px 25px rgba(0,0,0,0.02)'
        }} />

        {/* ── ANIMATEPRESENCE FOR PAPER SHEETS SLIDING DOWN ── */}
        <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 3 }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={isSignUp ? 'signup-page' : 'signin-page'}
              initial={{ y: -30, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 550, opacity: 0, rotate: -3.5, transition: { duration: 0.45 } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                height: '100%',
                background: '#FFFFFF',
                border: '1.5px solid #CBD5E1',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.04)'
              }}
            >
              {/* ── LEFT PANEL: BRANDING (40% width) ── */}
              <div style={{
                flex: isMobile ? 'none' : '0 0 40%',
                padding: isMobile ? '2.5rem 2rem 1.5rem 2rem' : '3.5rem 3rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: '1.5rem',
                borderRight: isMobile ? 'none' : '1px dashed #E2E8F0',
                borderBottom: isMobile ? '1px dashed #E2E8F0' : 'none'
              }}>
                <div>
                  {/* Back Button */}
                  <button 
                    onClick={() => navigate('/')} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'transparent',
                      border: 'none',
                      color: '#475569',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginBottom: '2rem',
                      padding: 0
                    }}
                  >
                    <ArrowLeft size={16} /> Back to home
                  </button>

                  {/* Logo / Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      padding: '8px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <FileText size={24} color="#FFFFFF" />
                    </div>
                    <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                      Elevate Resume
                    </h1>
                  </div>

                  <p style={{ fontSize: '1rem', color: '#1E293B', fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
                    Upload your old document and let our AI transform it into a professional, job-ready resume in seconds.
                  </p>
                </div>
              </div>

              {/* ── RIGHT PANEL: MAIN FORM & COMPACT SWITCH (60% width) ── */}
              <div style={{
                flex: isMobile ? '1' : '0 0 60%',
                padding: isMobile ? '2.5rem' : '3.5rem 3rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                
                {/* ── NEW DUAL-TAB TOGGLE SELECTOR (NORMAL SEGMENTED TABS) ── */}
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  marginBottom: '1.25rem', 
                  width: '100%',
                  background: '#F1F5F9',
                  padding: '6px',
                  borderRadius: '10px'
                }}>
                  <button
                    type="button"
                    onClick={() => { if (isSignUp) { setIsSignUp(false); setError(''); setMessage(''); } }}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '8px',
                      background: !isSignUp ? '#0F172A' : 'transparent',
                      color: !isSignUp ? '#FFFFFF' : '#475569',
                      border: 'none',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Sign In
                  </button>

                  <button
                    type="button"
                    onClick={() => { if (!isSignUp) { setIsSignUp(true); setError(''); setMessage(''); } }}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '8px',
                      background: isSignUp ? '#0F172A' : 'transparent',
                      color: isSignUp ? '#FFFFFF' : '#475569',
                      border: 'none',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Create Account
                  </button>
                </div>

                <p style={{ fontSize: '0.95rem', color: '#475569', margin: '0 0 1.5rem 0', fontWeight: 500 }}>
                  {isSignUp ? 'Fill in your email and password to register.' : 'Sign in to access saved resumes.'}
                </p>

                {/* Alerts */}
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{ background: '#FEF2F2', border: '2px solid #FCA5A5', color: '#B91C1C', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', marginBottom: '1.25rem', fontWeight: 600 }}
                    >
                      ⚠️ {error}
                    </motion.div>
                  )}
                  {message && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{ background: '#ECFDF5', border: '2px solid #6EE7B7', color: '#047857', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', marginBottom: '1.25rem', fontWeight: 600 }}
                    >
                      ✨ {message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Email input */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Email Address
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '14px', color: '#475569' }}><Mail size={18} /></span>
                      <input 
                        type="email" 
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem 0.75rem 2.75rem',
                          borderRadius: '8px',
                          border: '1.5px solid #CBD5E1',
                          outline: 'none',
                          fontSize: '1rem',
                          color: '#0F172A',
                          boxShadow: 'none',
                          borderColor: emailFocus ? '#3B82F6' : '#CBD5E1',
                          background: '#FFFFFF',
                          transition: 'all 0.15s ease'
                        }}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Password input */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '14px', color: '#475569' }}><Lock size={18} /></span>
                      <input 
                        type="password" 
                        required
                        minLength={6}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem 0.75rem 2.75rem',
                          borderRadius: '8px',
                          border: '1.5px solid #CBD5E1',
                          outline: 'none',
                          fontSize: '1rem',
                          color: '#0F172A',
                          boxShadow: 'none',
                          borderColor: passFocus ? '#3B82F6' : '#CBD5E1',
                          background: '#FFFFFF',
                          transition: 'all 0.15s ease'
                        }}
                        onFocus={() => setPassFocus(true)}
                        onBlur={() => setPassFocus(false)}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* ── NEW NORMAL SUBMIT BUTTON (NO PAINT ANIMATIONS) ── */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.9rem',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      cursor: isLoading ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginTop: '0.5rem',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12)',
                      transition: 'all 0.2s ease',
                      opacity: isLoading ? 0.8 : 1
                    }}
                    onMouseOver={(e) => {
                      if (!isLoading) {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(15, 23, 42, 0.22)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isLoading) {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.12)';
                      }
                    }}
                  >
                    {isLoading && (
                      <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                    )}
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </button>
                </form>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Styled placeholder color injector for cross-browser contrast */}
      <style>{`
        input::placeholder {
          color: #64748B !important;
          opacity: 1 !important;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
