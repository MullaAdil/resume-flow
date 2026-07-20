import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FileText, ArrowLeft, Mail, Lock, Sparkles, Loader2 } from 'lucide-react';

// ── CREATIVE ANIMATED PAINT DRIPS & SLASHES ──
const CrossedPaintSlashes = ({ isHovered, primaryColor, secondaryColor }) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: '6px' }}>
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <motion.path
        d="M-10,5 L110,35"
        stroke={primaryColor}
        strokeWidth="10"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isHovered ? 1 : 0, opacity: isHovered ? 0.18 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </motion.svg>
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <motion.path
        d="M-10,35 L110,5"
        stroke={secondaryColor}
        strokeWidth="10"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isHovered ? 1 : 0, opacity: isHovered ? 0.18 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
      />
    </motion.svg>
  </div>
);

const PaintDrips = ({ isHovered, colors, offset = "-12px", height = "14px" }) => (
  <div style={{ position: 'absolute', bottom: offset, left: 0, right: 0, height: height, display: 'flex', justifyContent: 'center', gap: '22px', pointerEvents: 'none', zIndex: 2 }}>
    {colors.map((color, idx) => (
      <motion.svg
        key={idx}
        width="16"
        height={height.replace('px', '')}
        viewBox={`0 0 16 ${height.replace('px', '')}`}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: isHovered ? 1.25 : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ delay: idx * 0.05, duration: 0.25, ease: 'easeOut' }}
        style={{ originY: 0 }}
      >
        <path
          d={`M0,0 C1.5,0 1.5,${height.replace('px', '')} 8,${height.replace('px', '')} C14.5,${height.replace('px', '')} 14.5,0 16,0 Z`}
          fill={color}
        />
      </motion.svg>
    ))}
  </div>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Hover & Focus states
  const [submitHover, setSubmitHover] = useState(false);
  const [toggleHover, setToggleHover] = useState(false);
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

      {/* ── STACKED PAGES WRAPPER (70% width) ── */}
      <div style={{
        position: 'relative',
        width: isMobile ? '95%' : '70%',
        maxWidth: '1000px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible'
      }}>
        
        {/* Layer 1: Bottom Colorful Artist Cover */}
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

        {/* Layer 2: Middle Stacked Document Page */}
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

        {/* Layer 3: Top Main Card Container (Containing the formal login layout) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            width: '100%',
            background: '#FFFFFF',
            border: '1.5px solid #CBD5E1',
            borderRadius: '12px',
            position: 'relative',
            zIndex: 3,
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
            padding: isMobile ? '2rem' : '3.5rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.4rem 0' }}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#475569', margin: '0 0 1.5rem 0', fontWeight: 500 }}>
              {isSignUp ? 'Fill in details to get started.' : 'Sign in to access saved resumes.'}
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
                      border: '2px solid #CBD5E1',
                      outline: 'none',
                      fontSize: '1rem',
                      color: '#0F172A',
                      boxShadow: 'none',
                      borderColor: emailFocus ? '#94A3B8' : '#CBD5E1',
                      transition: 'all 0.15s ease'
                    }}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {/* Paint Drips under input field when focused */}
                  <PaintDrips isHovered={emailFocus} colors={['#10b981', '#3b82f6', '#ec4899']} offset="-8px" height="10px" />
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
                      border: '2px solid #CBD5E1',
                      outline: 'none',
                      fontSize: '1rem',
                      color: '#0F172A',
                      boxShadow: 'none',
                      borderColor: passFocus ? '#94A3B8' : '#CBD5E1',
                      transition: 'all 0.15s ease'
                    }}
                    onFocus={() => setPassFocus(true)}
                    onBlur={() => setPassFocus(false)}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {/* Paint Drips under input field when focused */}
                  <PaintDrips isHovered={passFocus} colors={['#8b5cf6', '#ec4899', '#f59e0b']} offset="-8px" height="10px" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                onMouseEnter={() => setSubmitHover(true)}
                onMouseLeave={() => setSubmitHover(false)}
                style={{
                  background: '#FFFFFF',
                  color: '#0F172A',
                  border: '2.5px solid #0F172A',
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
                  boxShadow: submitHover ? '1px 1px 0px #0F172A' : '4px 4px 0px #0F172A',
                  transform: submitHover ? 'translate(3px, 3px)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: isLoading ? 0.8 : 1,
                  position: 'relative'
                }}
              >
                {/* Background Crossed Paint Slashes */}
                <CrossedPaintSlashes isHovered={submitHover} primaryColor="#3b82f6" secondaryColor="#ec4899" />
                
                {/* Bottom Growing Paint Drips */}
                <PaintDrips isHovered={submitHover} colors={['#10b981', '#3b82f6', '#ec4899']} />

                <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isLoading && (
                    <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                  )}
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </span>
              </button>
            </form>

            {/* Inline Compact Switch Mode Callout Block */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: '8px',
              padding: '0.85rem 1.25rem',
              marginTop: '1.5rem',
              width: '100%',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>
                {isSignUp ? 'Already have an account?' : 'New to Elevate Resume?'}
              </span>
              <button
                type="button"
                onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }}
                onMouseEnter={() => setToggleHover(true)}
                onMouseLeave={() => setToggleHover(false)}
                style={{
                  background: '#FFFFFF',
                  color: isSignUp ? '#475569' : '#2563EB',
                  border: isSignUp ? '1.5px solid #CBD5E1' : '1.5px solid #2563EB',
                  padding: '0.4rem 1rem',
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: toggleHover ? '1px 1px 0px currentColor' : '3px 3px 0px currentColor',
                  transform: toggleHover ? 'translate(2px, 2px)' : 'none',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
              >
                {/* Background Crossed Paint Slashes */}
                <CrossedPaintSlashes isHovered={toggleHover} primaryColor="#3b82f6" secondaryColor="#ec4899" />
                {/* Bottom Growing Paint Drips */}
                <PaintDrips isHovered={toggleHover} colors={['#3b82f6', '#ec4899']} offset="-6px" height="8px" />
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {isSignUp ? 'Sign In' : 'Create Account'}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
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
