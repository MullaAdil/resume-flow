import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FileText, ArrowLeft, Mail, Lock, Sparkles, Loader2, Briefcase, Award, ArrowRightLeft } from 'lucide-react';

// ── DECKLED TORN PAPER EDGES (VERTICAL) ──
const VerticalTornEdge = ({ isFlipped }) => {
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
        [isFlipped ? 'left' : 'right']: '-18px', 
        height: '100%',
        width: '35px',
        zIndex: 10,
        pointerEvents: 'none',
        transform: isFlipped ? 'scaleX(-1)' : 'none'
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
  const [flipped, setFlipped] = useState(false);
  
  // Custom Hover States for Creative Neo-Brutalist Buttons
  const [submitHover, setSubmitHover] = useState(false);
  const [guestHover, setGuestHover] = useState(false);

  // Focus states for sketch outline inputs
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

  const handleGuestMode = () => {
    navigate('/templates');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: isMobile ? 'column' : (flipped ? 'row-reverse' : 'row'),
      background: 'var(--bg-color)',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      
      {/* ── LEFT/RIGHT PANEL: AUTH FORM (White Canvas) ── */}
      <motion.div 
        layout
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flex: isMobile ? '1' : '0 0 42%',
          background: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: isMobile ? '2.5rem 1.5rem' : '4rem 4.5rem',
          position: 'relative',
          zIndex: 5,
          minHeight: isMobile ? 'auto' : '100vh',
          boxShadow: isMobile ? 'none' : (flipped ? '-10px 0 30px rgba(0, 0, 0, 0.015)' : '10px 0 30px rgba(0, 0, 0, 0.015)')
        }}
      >
        {/* Draw vertical torn edge dividing the panels on desktop */}
        {!isMobile && <VerticalTornEdge isFlipped={flipped} />}

        {/* Top Control Bar (Back Button only, flip happens by clicking resume) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '2.5rem',
          alignSelf: 'flex-start'
        }}>
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
              padding: 0
            }}
          >
            <ArrowLeft size={16} /> Back to home
          </button>
        </div>

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
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ background: '#FEF2F2', border: '2px solid #FCA5A5', color: '#B91C1C', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: 600 }}
              >
                ⚠️ {error}
              </motion.div>
            )}
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ background: '#ECFDF5', border: '2px solid #6EE7B7', color: '#047857', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: 600 }}
              >
                ✨ {message}
              </motion.div>
            )}
          </AnimatePresence>

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
                    borderRadius: '8px',
                    border: '2px solid #E2E8F0',
                    outline: 'none',
                    fontSize: '1rem',
                    color: '#1E293B',
                    boxShadow: emailFocus ? '3px 3px 0px #059669' : '2px 2px 0px rgba(0,0,0,0.02)',
                    borderColor: emailFocus ? '#059669' : '#E2E8F0',
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
                    borderRadius: '8px',
                    border: '2px solid #E2E8F0',
                    outline: 'none',
                    fontSize: '1rem',
                    color: '#1E293B',
                    boxShadow: passFocus ? '3px 3px 0px #059669' : '2px 2px 0px rgba(0,0,0,0.02)',
                    borderColor: passFocus ? '#059669' : '#E2E8F0',
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

            {/* Submit Button (Creative Sketched Border Style) */}
            <button
              type="submit"
              disabled={isLoading}
              onMouseEnter={() => setSubmitHover(true)}
              onMouseLeave={() => setSubmitHover(false)}
              style={{
                background: submitHover ? '#059669' : '#FFFFFF',
                color: submitHover ? '#FFFFFF' : '#059669',
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
                transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
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

          {/* Guest Mode Button (Creative Sketched Border Style) */}
          <button
            onClick={handleGuestMode}
            onMouseEnter={() => setGuestHover(true)}
            onMouseLeave={() => setGuestHover(false)}
            style={{
              width: '100%',
              background: guestHover ? '#475569' : '#FFFFFF',
              color: guestHover ? '#FFFFFF' : '#475569',
              border: '2.5px solid #475569',
              padding: '0.85rem',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: guestHover ? '1px 1px 0px #475569' : '4px 4px 0px #475569',
              transform: guestHover ? 'translate(3px, 3px)' : 'none',
              transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            Continue as Guest (No Cloud Save)
          </button>
        </div>
      </motion.div>

      {/* ── RIGHT/LEFT PANEL: INTERACTIVE THEME & SHOWCASE (Light Multicolor Pastel Canvas) ── */}
      <motion.div 
        layout
        onClick={() => !isMobile && setFlipped(!flipped)}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flex: isMobile ? 'none' : '1',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.02) 0%, rgba(59, 130, 246, 0.02) 25%, rgba(139, 92, 246, 0.02) 55%, rgba(236, 72, 153, 0.02) 80%, rgba(245, 158, 11, 0.01) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2.5rem 2rem',
          position: 'relative',
          overflow: 'hidden',
          minHeight: isMobile ? '360px' : '100vh',
          zIndex: 1,
          cursor: isMobile ? 'default' : 'pointer'
        }}
      >
        {/* Soft Watercolor Radial Ambient Lights */}
        <div style={{ position: 'absolute', top: '15%', right: '15%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '15%', width: '380px', height: '380px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, rgba(255,255,255,0) 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

        <div style={{
          maxWidth: '480px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '2rem',
          zIndex: 10
        }}>
          {/* Header Texts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                background: 'rgba(16, 185, 129, 0.05)',
                border: '1.5px solid rgba(16, 185, 129, 0.1)',
                color: '#047857',
                padding: '0.35rem 0.9rem',
                borderRadius: '30px',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                alignSelf: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Sparkles size={12} /> AI Resume Builder
            </motion.div>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              Create Resumes That <br />
              <span style={{ background: 'linear-gradient(135deg, #059669 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Get You Shortlisted
              </span>
            </h2>
            <p style={{ color: '#475569', fontSize: '0.9rem', fontWeight: 500, margin: 0, maxWidth: '380px', alignSelf: 'center', lineHeight: 1.4 }}>
              Upload your old document and let our AI transform it into a gorgeous, job-winning resume in seconds.
            </p>
          </div>

          {/* ── VISUAL RESUME SHOWCASE (Floating Cards) ── */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '210px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '0.5rem'
          }}>
            {/* Background Sheet 1 */}
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotate: [-6, -4, -6]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                position: 'absolute',
                width: '140px',
                height: '180px',
                background: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                border: '1px solid #F1F5F9',
                transform: 'rotate(-6deg) translateX(-95px)',
                zIndex: 2,
                opacity: 0.65,
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ height: '10px', width: '60%', background: '#E2E8F0', borderRadius: '3px' }} />
              <div style={{ height: '6px', width: '40%', background: '#F1F5F9', borderRadius: '2px' }} />
              <div style={{ borderBottom: '1px solid #F8FAFC', margin: '2px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ height: '4px', width: '90%', background: '#F8FAFC', borderRadius: '1px' }} />
                <div style={{ height: '4px', width: '80%', background: '#F8FAFC', borderRadius: '1px' }} />
              </div>
            </motion.div>

            {/* Background Sheet 2 */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
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
                width: '140px',
                height: '180px',
                background: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                border: '1px solid #F1F5F9',
                transform: 'rotate(6deg) translateX(95px)',
                zIndex: 2,
                opacity: 0.65,
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ height: '10px', width: '70%', background: '#D1FAE5', borderRadius: '3px' }} />
              <div style={{ height: '6px', width: '30%', background: '#ECFDF5', borderRadius: '2px' }} />
              <div style={{ borderBottom: '1px solid #F8FAFC', margin: '2px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ height: '4px', width: '80%', background: '#F8FAFC', borderRadius: '1px' }} />
                <div style={{ height: '4px', width: '85%', background: '#F8FAFC', borderRadius: '1px' }} />
              </div>
            </motion.div>

            {/* Main Interactive Resume Card */}
            <motion.div
              animate={{ 
                y: [0, -12, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                width: '180px',
                height: '210px',
                background: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.06)',
                border: '1px solid #E2E8F0',
                padding: '14px',
                zIndex: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                textAlign: 'left',
                position: 'relative'
              }}
            >
              {/* Mini Resume Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800, color: '#475569' }}>
                  AM
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.1 }}>Alex Morgan</div>
                  <div style={{ fontSize: '0.55rem', fontWeight: 600, color: '#059669' }}>AI Product Designer</div>
                </div>
              </div>

              {/* Decorative Resume Sections */}
              <div style={{ borderBottom: '1.5px solid #F1F5F9', margin: '2px 0' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Briefcase size={8} color="#64748B" />
                  <span style={{ fontSize: '0.55rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>Experience</span>
                </div>
                <div style={{ paddingLeft: '5px', borderLeft: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div>
                    <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#1E293B', lineHeight: 1.1 }}>Senior Lead at Google</div>
                    <div style={{ fontSize: '0.5rem', color: '#94A3B8' }}>2024 - Present</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Award size={8} color="#64748B" />
                  <span style={{ fontSize: '0.55rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>Skills</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                  {['React', 'UI/UX', 'Node'].map((skill, i) => (
                    <span key={i} style={{ fontSize: '0.5rem', fontWeight: 700, padding: '1px 4px', borderRadius: '3px', background: i === 1 ? '#ECFDF5' : '#F1F5F9', color: i === 1 ? '#059669' : '#475569' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Floating Badge on Main Card */}
              <div style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#10B981',
                color: '#FFFFFF',
                fontSize: '0.5rem',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: '20px',
                boxShadow: '0 3px 6px rgba(16,185,129,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '1px'
              }}>
                <Sparkles size={6} /> AI Active
              </div>
            </motion.div>
          </div>

          {/* Interactive Flip Hint */}
          <span style={{
            fontSize: '0.75rem',
            color: '#94A3B8',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            background: 'rgba(241, 245, 249, 0.6)',
            border: '1.5px dashed #E2E8F0',
            padding: '5px 12px',
            borderRadius: '20px',
            marginTop: '0.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <ArrowRightLeft size={10} /> Click anywhere on this panel to flip layout
          </span>

        </div>
      </motion.div>

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
