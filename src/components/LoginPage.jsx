import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FileText, ArrowLeft, Mail, Lock, Sparkles, Loader2, CheckCircle, Zap, Briefcase, Award } from 'lucide-react';

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

// ── DECKLED TORN PAPER EDGES (VERTICAL) ──
const VerticalTornEdge = () => {
  const gradientId = "vertical-paint-gradient";
  const d_white_vertical = "M0,0 L20,15 L6,35 L22,55 L8,75 L24,95 L9,115 L23,135 L7,155 L21,175 L5,195 L22,215 L8,235 L24,255 L9,275 L23,295 L6,315 L22,335 L8,355 L24,375 L9,395 L21,415 L5,435 L22,455 L8,475 L24,495 L9,515 L23,535 L7,555 L21,575 L5,595 L22,615 L8,635 L24,655 L9,675 L23,695 L6,715 L22,735 L8,755 L24,775 L9,795 L21,815 L5,835 L22,855 L8,875 L24,895 L9,915 L23,935 L7,955 L21,975 L5,995 L22,1015 L8,1035 L24,1055 L9,1075 L23,1095 L6,1115 L22,1135 L8,1155 L24,1175 L9,1190 L20,1200 L0,1200 Z";
  const d_paint_vertical = "M0,0 L24,15 L10,35 L26,55 L12,75 L28,95 L13,115 L27,135 L11,155 L25,175 L9,195 L26,215 L12,235 L28,255 L13,275 L27,295 L10,315 L26,335 L12,355 L28,375 L13,395 L25,415 L9,435 L26,455 L12,475 L28,495 L13,515 L27,535 L11,555 L25,575 L9,595 L26,615 L12,635 L28,655 L13,675 L27,695 L10,715 L26,735 L12,755 L28,775 L13,795 L25,815 L9,835 L26,855 L12,875 L28,895 L13,915 L27,935 L11,955 L25,975 L9,995 L26,1015 L12,1035 L28,1055 L13,1075 L27,1095 L10,1115 L26,1135 L12,1155 L28,1175 L13,1190 L24,1200 L0,1200 Z";

  return (
    <svg 
      width="35" 
      height="100%" 
      viewBox="0 0 35 1200" 
      preserveAspectRatio="none"
      style={{ 
        position: 'absolute', 
        top: 0,
        right: '-18px', 
        height: '100%',
        width: '35px',
        zIndex: 10,
        pointerEvents: 'none'
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="20%" stopColor="#3B82F6" />
          <stop offset="40%" stopColor="#8B5CF6" />
          <stop offset="60%" stopColor="#EC4899" />
          <stop offset="80%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
      <path d={d_paint_vertical} fill={`url(#${gradientId})`} opacity="0.85" />
      <path d={d_white_vertical} fill="#FFFFFF" />
      <path d={d_white_vertical} fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
    </svg>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
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

  const handleGuestMode = () => {
    navigate('/templates');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      background: 'var(--bg-color)',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      
      {/* ── LEFT PANEL: AUTH FORM (White Canvas) ── */}
      <div style={{
        flex: isMobile ? '1' : '0 0 42%',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '2.5rem 1.5rem' : '4rem 4.5rem',
        position: 'relative',
        zIndex: 5,
        minHeight: isMobile ? 'auto' : '100vh',
        boxShadow: isMobile ? 'none' : '10px 0 30px rgba(0, 0, 0, 0.02)'
      }}>
        {/* Draw vertical torn edge dividing the panels on desktop */}
        {!isMobile && <VerticalTornEdge />}

        {/* Back Button */}
        <button 
          onClick={() => navigate('/')} 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'transparent',
            border: 'none',
            color: '#64748B',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: '2rem',
            padding: 0,
            alignSelf: 'flex-start'
          }}
        >
          <ArrowLeft size={16} /> Back to home
        </button>

        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          {/* Logo / Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
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
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
              Elevate Resume
            </h1>
          </div>
          
          <p style={{ fontSize: '0.95rem', color: '#475569', margin: '0 0 2rem 0', fontWeight: 500 }}>
            {isSignUp ? 'Create your free account to sync resumes.' : 'Sign in to access your saved resumes.'}
          </p>

          {/* Alerts */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', borderRadius: '12px', padding: '0.75rem 1rem', fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: 500 }}
            >
              ⚠️ {error}
            </motion.div>
          )}
          {message && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: '#ECFDF5', border: '1px solid #6EE7B7', color: '#047857', borderRadius: '12px', padding: '0.75rem 1rem', fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: 600 }}
            >
              ✨ {message}
            </motion.div>
          )}

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '14px', color: '#94A3B8' }}><Mail size={18} /></span>
                <input 
                  type="email" 
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.75rem',
                    borderRadius: '10px',
                    border: '1.5px solid #E2E8F0',
                    outline: 'none',
                    fontSize: '1rem',
                    color: '#1E293B',
                    transition: 'all 0.15s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#059669'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '14px', color: '#94A3B8' }}><Lock size={18} /></span>
                <input 
                  type="password" 
                  required
                  minLength={6}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.75rem',
                    borderRadius: '10px',
                    border: '1.5px solid #E2E8F0',
                    outline: 'none',
                    fontSize: '1rem',
                    color: '#1E293B',
                    transition: 'all 0.15s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#059669'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.9rem',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '1.05rem',
                cursor: isLoading ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '0.5rem',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
                transition: 'all 0.15s ease',
                opacity: isLoading ? 0.8 : 1
              }}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
              ) : (
                <Sparkles size={18} />
              )}
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle between login and signup */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#475569' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#059669',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0
              }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            <span style={{ padding: '0 0.75rem', fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Or</span>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
          </div>

          {/* Guest Mode */}
          <button
            onClick={handleGuestMode}
            style={{
              width: '100%',
              background: 'transparent',
              border: '2px dashed #CBD5E1',
              color: '#475569',
              padding: '0.85rem',
              borderRadius: '10px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#059669'; e.currentTarget.style.color = '#059669'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.color = '#475569'; }}
          >
            Continue as Guest (No Cloud Save)
          </button>
        </div>
      </div>

      {/* ── RIGHT PANEL: INTERACTIVE THEME & SHOWCASE ── */}
      <div style={{
        flex: isMobile ? 'none' : '1',
        background: 'linear-gradient(135deg, #091320 0%, #032b21 50%, #00120d 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        minHeight: isMobile ? '400px' : '100vh',
        zIndex: 1
      }}>
        {/* Soft Radial Ambient Lights */}
        <div style={{ position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '10%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

        <div style={{
          maxWidth: '540px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '2.5rem',
          zIndex: 10
        }}>
          {/* Header Texts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1.5px solid rgba(16, 185, 129, 0.25)',
                color: '#34d399',
                padding: '0.4rem 1rem',
                borderRadius: '30px',
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                alignSelf: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={14} /> AI-Powered Resume Builder
            </motion.div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F8FAFC', margin: 0, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              Create Resumes That <br />
              <span style={{ background: 'linear-gradient(135deg, #34d399 0%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Get You Shortlisted
              </span>
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '1rem', fontWeight: 500, margin: 0, maxWidth: '440px', alignSelf: 'center' }}>
              Upload your old document and let our AI transform it into a gorgeous, job-winning resume in seconds.
            </p>
          </div>

          {/* ── VISUAL RESUME SHOWCASE (Floating Cards) ── */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '240px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Background Sheet 1 */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [-6, -4, -6]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                position: 'absolute',
                width: '160px',
                height: '210px',
                background: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                transform: 'rotate(-6deg) translateX(-110px)',
                zIndex: 2,
                opacity: 0.55,
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ height: '14px', width: '60%', background: '#CBD5E1', borderRadius: '4px' }} />
              <div style={{ height: '8px', width: '40%', background: '#E2E8F0', borderRadius: '2px' }} />
              <div style={{ borderBottom: '1px solid #F1F5F9', margin: '4px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ height: '6px', width: '90%', background: '#F1F5F9', borderRadius: '2px' }} />
                <div style={{ height: '6px', width: '80%', background: '#F1F5F9', borderRadius: '2px' }} />
                <div style={{ height: '6px', width: '85%', background: '#F1F5F9', borderRadius: '2px' }} />
              </div>
            </motion.div>

            {/* Background Sheet 2 */}
            <motion.div
              animate={{ 
                y: [0, -12, 0],
                rotate: [6, 4, 6]
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5
              }}
              style={{
                position: 'absolute',
                width: '160px',
                height: '210px',
                background: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                transform: 'rotate(6deg) translateX(110px)',
                zIndex: 2,
                opacity: 0.55,
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ height: '14px', width: '70%', background: '#A7F3D0', borderRadius: '4px' }} />
              <div style={{ height: '8px', width: '30%', background: '#ECFDF5', borderRadius: '2px' }} />
              <div style={{ borderBottom: '1px solid #F1F5F9', margin: '4px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ height: '6px', width: '80%', background: '#F1F5F9', borderRadius: '2px' }} />
                <div style={{ height: '6px', width: '90%', background: '#F1F5F9', borderRadius: '2px' }} />
                <div style={{ height: '6px', width: '75%', background: '#F1F5F9', borderRadius: '2px' }} />
              </div>
            </motion.div>

            {/* Main Interactive Resume Card */}
            <motion.div
              animate={{ 
                y: [0, -15, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                width: '210px',
                height: '240px',
                background: '#FFFFFF',
                borderRadius: '10px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '16px',
                zIndex: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                textAlign: 'left',
                position: 'relative'
              }}
            >
              {/* Mini Resume Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>
                  AM
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>Alex Morgan</div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#059669' }}>AI Product Designer</div>
                </div>
              </div>

              {/* Decorative Resume Sections */}
              <div style={{ borderBottom: '1.5px solid #F1F5F9', margin: '2px 0' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Briefcase size={10} color="#64748B" />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>Experience</span>
                </div>
                <div style={{ paddingLeft: '6px', borderLeft: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1E293B', lineHeight: 1.1 }}>Senior Lead at Google</div>
                    <div style={{ fontSize: '0.6rem', color: '#94A3B8' }}>2024 - Present</div>
                  </div>
                  <div style={{ height: '4px', width: '90%', background: '#F1F5F9', borderRadius: '1px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Award size={10} color="#64748B" />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>Skills</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                  {['React', 'UI/UX', 'Figma', 'Node'].map((skill, i) => (
                    <span key={i} style={{ fontSize: '0.55rem', fontWeight: 700, padding: '2px 5px', borderRadius: '4px', background: i === 1 ? '#ECFDF5' : '#F1F5F9', color: i === 1 ? '#059669' : '#475569' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Floating Badge on Main Card */}
              <div style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#10B981',
                color: '#FFFFFF',
                fontSize: '0.6rem',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '20px',
                boxShadow: '0 4px 8px rgba(16,185,129,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}>
                <Sparkles size={8} /> AI Active
              </div>
            </motion.div>
          </div>

          {/* Feature Bullets */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            width: '100%',
            textAlign: 'left'
          }}>
            {[
              { icon: <Zap size={16} color="#34d399" />, title: "Instant AI Parsing", desc: "Upload PDF/Word doc" },
              { icon: <Sparkles size={16} color="#60a5fa" />, title: "10+ Pro Templates", desc: "Tailored to roles" },
              { icon: <CheckCircle size={16} color="#a7f3d0" />, title: "Secure Cloud Sync", desc: "Save & edit anywhere" },
              { icon: <FileText size={16} color="#fbbf24" />, title: "A4 PDF Export", desc: "Perfect PDF alignment" }
            ].map((feature, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '0.8rem 1rem',
                borderRadius: '12px',
                alignItems: 'flex-start'
              }}>
                <div style={{ marginTop: '2px' }}>{feature.icon}</div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#E2E8F0' }}>{feature.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Basic rotating spinner animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
