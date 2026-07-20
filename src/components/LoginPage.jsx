import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FileText, ArrowLeft, Mail, Lock, Sparkles, Loader2, ArrowRightLeft } from 'lucide-react';

// ── DECKLED TORN PAPER EDGES (HORIZONTAL) ──
const TornEdge = ({ isBottom }) => {
  const gradientId = isBottom ? "paint-gradient-bottom" : "paint-gradient-top";
  
  const d_white_top = "M0,18 L15,4 L35,22 L50,6 L70,24 L85,9 L100,19 L120,4 L138,22 L155,7 L175,20 L190,5 L210,24 L225,8 L245,17 L260,3 L280,21 L295,6 L315,24 L330,9 L350,18 L365,4 L385,22 L400,7 L420,20 L435,5 L455,24 L470,8 L490,17 L505,3 L525,21 L540,6 L560,24 L575,9 L595,18 L610,4 L630,22 L645,7 L665,20 L680,5 L700,24 L715,8 L735,17 L750,3 L770,21 L785,6 L805,24 L820,9 L840,18 L855,4 L875,22 L890,7 L910,20 L925,5 L945,24 L960,8 L980,17 L995,3 L1015,21 L1030,6 L1050,24 L1065,9 L1085,18 L1100,4 L1120,22 L1135,7 L1155,20 L1170,5 L1190,24 L1200,9 L1200,35 L0,35 Z";
  const d_paint_top = "M0,14 L15,0 L35,18 L50,2 L70,20 L85,5 L100,15 L120,0 L138,18 L155,3 L175,16 L190,1 L210,20 L225,4 L245,13 L260,0 L280,17 L295,2 L315,20 L330,5 L350,14 L365,0 L385,18 L400,3 L420,16 L435,1 L455,20 L470,4 L490,13 L505,0 L525,17 L540,2 L560,20 L575,5 L595,14 L610,0 L630,18 L645,3 L665,16 L680,1 L700,20 L715,4 L735,13 L750,0 L770,17 L785,2 L805,20 L820,5 L840,14 L855,0 L875,18 L890,3 L910,16 L925,1 L945,20 L960,4 L980,13 L995,0 L1015,17 L1030,2 L1050,20 L1065,5 L1085,14 L1100,0 L1120,18 L1135,3 L1155,16 L1170,1 L1190,20 L1200,5 L1200,35 L0,35 Z";
  
  const d_white_bottom = "M0,12 L15,26 L35,8 L50,24 L70,6 L85,21 L100,11 L120,26 L138,8 L155,23 L175,10 L190,25 L210,6 L225,22 L245,13 L260,27 L280,9 L295,24 L315,6 L330,21 L350,12 L365,26 L385,8 L400,23 L420,10 L435,25 L455,6 L470,22 L490,13 L505,27 L525,9 L540,24 L560,6 L575,21 L595,12 L610,26 L630,8 L645,23 L665,10 L680,25 L700,6 L715,22 L735,13 L750,27 L770,9 L785,24 L805,6 L820,21 L840,12 L855,26 L875,8 L890,23 L910,10 L925,25 L945,6 L960,22 L980,13 L995,27 L1015,9 L1030,24 L1050,6 L1065,21 L1085,12 L1100,26 L1120,8 L1135,23 L1155,10 L1170,25 L1190,6 L1200,21 L1200,0 L0,0 Z";
  const d_paint_bottom = "M0,16 L15,30 L35,12 L50,28 L70,10 L85,25 L100,15 L120,30 L138,12 L155,27 L175,14 L190,29 L210,10 L225,26 L245,17 L260,31 L280,13 L295,28 L315,10 L330,25 L350,16 L365,30 L385,12 L400,27 L420,14 L435,29 L455,10 L470,26 L490,17 L505,31 L525,13 L540,28 L560,10 L575,25 L595,16 L610,30 L630,12 L645,27 L665,14 L680,29 L700,10 L715,26 L735,17 L750,31 L770,13 L785,28 L805,10 L820,25 L840,16 L855,30 L875,12 L890,27 L910,14 L925,29 L945,10 L960,26 L980,17 L995,31 L1015,13 L1030,28 L1050,10 L1065,25 L1085,16 L1100,30 L1120,12 L1135,27 L1155,14 L1170,29 L1190,10 L1200,25 L1200,0 L0,0 Z";

  return (
    <svg 
      width="100%" 
      height="35" 
      viewBox="0 0 1200 35" 
      preserveAspectRatio="none"
      style={{ 
        position: 'absolute', 
        left: 0, 
        right: 0, 
        [isBottom ? 'bottom' : 'top']: '-18px', 
        zIndex: 10,
        pointerEvents: 'none'
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="20%" stopColor="#3B82F6" />
          <stop offset="40%" stopColor="#8B5CF6" />
          <stop offset="60%" stopColor="#EC4899" />
          <stop offset="80%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
      <path d={isBottom ? d_paint_bottom : d_paint_top} fill={`url(#${gradientId})`} opacity="0.85" />
      <path d={isBottom ? d_white_bottom : d_white_top} fill="#FFFFFF" />
      <path d={isBottom ? d_white_bottom : d_white_top} fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
    </svg>
  );
};

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
      padding: '2.5rem 1.5rem'
    }}>
      {/* Background Soft Watercolor Lighting Blobs */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(55px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(29, 78, 216, 0.03) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(55px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '30%', left: '30%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(45px)', zIndex: 0 }} />

      {/* ── CARD CONTAINER (Tri-fold Horizontal Landscape, 960px wide) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          width: '100%',
          maxWidth: '960px',
          background: '#FFFFFF',
          borderLeft: '4px solid #059669',
          borderRight: '1.5px solid #CBD5E1',
          borderTop: 'none',
          borderBottom: 'none',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.06)',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          overflow: 'visible'
        }}
      >
        {/* Horizontal Torn Edges with Watercolor Paint Backing */}
        <TornEdge />
        <TornEdge isBottom />

        {/* ── COLUMN 1: BRANDING (Left, 28% width) ── */}
        <div style={{
          flex: isMobile ? 'none' : '0 0 28%',
          padding: isMobile ? '2.5rem 2rem 1.5rem 2rem' : '3.5rem 2.5rem',
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
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                Elevate
              </h1>
            </div>

            <p style={{ fontSize: '0.95rem', color: '#1E293B', fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
              Upload your old document and let our AI transform it into a professional, job-ready resume in seconds.
            </p>
          </div>
        </div>

        {/* ── COLUMN 2: CREDENTIALS FORM (Middle, 40% width) ── */}
        <div style={{
          flex: isMobile ? '1' : '0 0 40%',
          padding: isMobile ? '2rem' : '3.5rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.4rem 0' }}>
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#475569', margin: '0 0 1.5rem 0', fontWeight: 500 }}>
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
                    boxShadow: emailFocus ? '3px 3px 0px #059669' : '2px 2px 0px rgba(0,0,0,0.02)',
                    borderColor: emailFocus ? '#059669' : '#CBD5E1',
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
                    boxShadow: passFocus ? '3px 3px 0px #059669' : '2px 2px 0px rgba(0,0,0,0.02)',
                    borderColor: passFocus ? '#059669' : '#CBD5E1',
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

            {/* Submit Button (White background on hover so green doesn't hide slashes & drips) */}
            <button
              type="submit"
              disabled={isLoading}
              onMouseEnter={() => setSubmitHover(true)}
              onMouseLeave={() => setSubmitHover(false)}
              style={{
                background: '#FFFFFF',
                color: '#059669',
                border: '2.5px solid #059669',
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
                boxShadow: submitHover ? '1px 1px 0px #059669' : '4px 4px 0px #059669',
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
        </div>

        {/* ── COLUMN 3: CALLOUT BLOCK / SWITCH MODE (Right, 32% width) ── */}
        <div style={{
          flex: isMobile ? 'none' : '0 0 32%',
          padding: isMobile ? '1.5rem 2rem 2.5rem 2rem' : '3.5rem 2.5rem',
          background: '#F8FAFC',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1rem',
          borderLeft: isMobile ? 'none' : '1px dashed #E2E8F0',
          borderTop: isMobile ? '1px dashed #E2E8F0' : 'none'
        }}>
          {isSignUp ? (
            <>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>
                Already have an account?
              </span>
              <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 500, lineHeight: 1.45 }}>
                Sign in with your email to load and continue editing your saved resumes.
              </span>
              <button
                type="button"
                onClick={() => { setIsSignUp(false); setError(''); setMessage(''); }}
                onMouseEnter={() => setToggleHover(true)}
                onMouseLeave={() => setToggleHover(false)}
                style={{
                  background: '#FFFFFF',
                  color: '#475569',
                  border: '2.5px solid #475569',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: toggleHover ? '1px 1px 0px #475569' : '4px 4px 0px #475569',
                  transform: toggleHover ? 'translate(3px, 3px)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  width: '100%',
                  maxWidth: '220px'
                }}
              >
                <CrossedPaintSlashes isHovered={toggleHover} primaryColor="#64748b" secondaryColor="#475569" />
                <PaintDrips isHovered={toggleHover} colors={['#64748b', '#475569', '#334155']} />
                <span style={{ position: 'relative', zIndex: 1 }}>
                  Sign In Instead
                </span>
              </button>
            </>
          ) : (
            <>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>
                New to Elevate Resume?
              </span>
              <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 500, lineHeight: 1.45 }}>
                Create a free account to securely save and back up your resumes in the cloud.
              </span>
              <button
                type="button"
                onClick={() => { setIsSignUp(true); setError(''); setMessage(''); }}
                onMouseEnter={() => setToggleHover(true)}
                onMouseLeave={() => setToggleHover(false)}
                style={{
                  background: '#FFFFFF',
                  color: '#2563EB',
                  border: '2.5px solid #2563EB',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: toggleHover ? '1px 1px 0px #2563EB' : '4px 4px 0px #2563EB',
                  transform: toggleHover ? 'translate(3px, 3px)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  width: '100%',
                  maxWidth: '220px'
                }}
              >
                <CrossedPaintSlashes isHovered={toggleHover} primaryColor="#3b82f6" secondaryColor="#8b5cf6" />
                <PaintDrips isHovered={toggleHover} colors={['#3b82f6', '#8b5cf6', '#ec4899']} />
                <span style={{ position: 'relative', zIndex: 1 }}>
                  Create an Account
                </span>
              </button>
            </>
          )}
        </div>
      </motion.div>

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
