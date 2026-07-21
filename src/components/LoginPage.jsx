import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FileText, ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';

// --- ANIMATED DUST PARTICLES CANVAS (WITH SMOKE EFFECT) ---
const DustParticles = ({ isFocused, inputValue }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const lastValueRef = useRef(inputValue);

  // Trigger burst when typing (smoke puff explosion)
  useEffect(() => {
    if (!isFocused) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prevVal = lastValueRef.current;
    if (inputValue !== prevVal) {
      // Spawn burst of smoke plumes
      const count = 8;
      for (let i = 0; i < count; i++) {
        const px = Math.random() * Math.max(10, canvas.width - 60) + 30;
        const py = Math.random() * Math.max(10, canvas.height - 15) + 5;
        
        particlesRef.current.push({
          x: px,
          y: py,
          size: Math.random() * 2 + 1,
          growthSpeed: Math.random() * 0.12 + 0.06, // fast growing puffs
          vx: (Math.random() - 0.5) * 1.6,
          vy: -(Math.random() * 0.8 + 0.4),
          alpha: 0.8,
          decay: Math.random() * 0.015 + 0.01,
          colorBase: ['rgba(220, 215, 200, ', 'rgba(194, 178, 128, ', 'rgba(235, 225, 205, ', 'rgba(205, 195, 180, '][Math.floor(Math.random() * 4)]
        });
      }
      lastValueRef.current = inputValue;
    }
  }, [inputValue, isFocused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width || 0;
      canvas.height = rect.height || 0;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial smoke puffs
    if (isFocused) {
      for (let i = 0; i < 10; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * Math.max(10, canvas.height - 10) + 5,
          size: Math.random() * 2 + 1,
          growthSpeed: Math.random() * 0.04 + 0.02, // slow growing background smoke
          vx: (Math.random() - 0.5) * 0.4,
          vy: -(Math.random() * 0.3 + 0.1),
          alpha: Math.random() * 0.5 + 0.1,
          decay: Math.random() * 0.003 + 0.002,
          colorBase: ['rgba(220, 215, 200, ', 'rgba(194, 178, 128, ', 'rgba(235, 225, 205, ', 'rgba(205, 195, 180, '][Math.floor(Math.random() * 4)]
        });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calm background smoke spawn
      if (isFocused && particlesRef.current.length < 25 && Math.random() < 0.12) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height - 2,
          size: Math.random() * 2 + 1,
          growthSpeed: Math.random() * 0.04 + 0.02,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -(Math.random() * 0.2 + 0.1),
          alpha: Math.random() * 0.4 + 0.2,
          decay: Math.random() * 0.003 + 0.002,
          colorBase: ['rgba(220, 215, 200, ', 'rgba(194, 178, 128, ', 'rgba(235, 225, 205, ', 'rgba(205, 195, 180, '][Math.floor(Math.random() * 4)]
        });
      }

      // Update and draw smoky particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += Math.sin(p.y * 0.05) * 0.25 + p.vx; // rising smoke sway
        p.y += p.vy;
        p.size += p.growthSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y < 0 || p.x < 0 || p.x > canvas.width) {
          return false;
        }

        ctx.beginPath();
        // Radial gradient for fluffy puff texture
        const r = Math.max(0.1, p.size);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        grad.addColorStop(0, `${p.colorBase}${p.alpha})`);
        grad.addColorStop(0.3, `${p.colorBase}${p.alpha * 0.5})`);
        grad.addColorStop(0.7, `${p.colorBase}${p.alpha * 0.15})`);
        grad.addColorStop(1, 'rgba(220, 215, 200, 0)');
        
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isFocused]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5
      }}
    />
  );
};

// --- ANIMATED WATER FLOW WAVES OVERLAY (LIGHT NATURAL VIBE) ---
const WaterWaves = () => (
  <div style={{
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 1
  }}>
    {/* Wave 1 */}
    <svg
      viewBox="0 0 240 30"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '200%',
        height: '80%',
        fill: 'rgba(255, 255, 255, 0.55)', // higher opacity white foam
        animation: 'flow-wave-1 6s linear infinite',
        opacity: 0.85
      }}
    >
      <path d="M 0 15 Q 30 10, 60 15 T 120 15 T 180 15 T 240 15 V 30 H 0 Z" />
    </svg>
    {/* Wave 2 */}
    <svg
      viewBox="0 0 200 30"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '200%',
        height: '90%',
        fill: 'rgba(255, 255, 255, 0.4)',
        animation: 'flow-wave-2 9s linear infinite',
        opacity: 0.7
      }}
    >
      <path d="M 0 15 Q 25 8, 50 15 T 100 15 T 150 15 T 200 15 V 30 H 0 Z" />
    </svg>
    {/* Wave 3 */}
    <svg
      viewBox="0 0 280 30"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '200%',
        height: '100%',
        fill: 'rgba(255, 255, 255, 0.25)',
        animation: 'flow-wave-3 12s linear infinite',
        opacity: 0.55
      }}
    >
      <path d="M 0 15 Q 35 12, 70 15 T 140 15 T 210 15 T 280 15 V 30 H 0 Z" />
    </svg>
  </div>
);

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(location.state?.mode === 'signup');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Focus states for the inputs (drives the page-on-page rotation under fields)
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  // Sync mode state when location changes
  useEffect(() => {
    if (location.state?.mode === 'signup') {
      setIsSignUp(true);
    } else if (location.state?.mode === 'signin') {
      setIsSignUp(false);
    }
  }, [location.state]);

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
      {/* Background Soft Watercolor Lighting Blobs (Multicolor Mesh style) */}
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(67, 56, 202, 0.15) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(65px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(65px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(65px)', zIndex: 0 }} />

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
                      background: isSignUp ? 'linear-gradient(270deg, #bae6fd, #7dd3fc, #99f6e4, #a5f3fc, #bae6fd)' : 'transparent',
                      backgroundSize: '400% 400%',
                      animation: isSignUp ? 'water-gradient 8s ease infinite' : 'none',
                      color: isSignUp ? '#0369a1' : '#475569',
                      border: 'none',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {isSignUp && <WaterWaves />}
                    <span style={{ position: 'relative', zIndex: 2 }}>Create Account</span>
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
                    <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#4A3B32', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Email Address
                    </label>
                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '14px', color: emailFocus ? '#8B7E66' : '#8C8273', zIndex: 6 }}>
                        <Mail size={18} />
                      </span>
                      <input 
                        type="email" 
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem 0.75rem 2.75rem',
                          borderRadius: '8px',
                          border: '1.5px solid',
                          outline: 'none',
                          fontSize: '1rem',
                          color: '#4A3B32',
                          boxShadow: 'none',
                          borderColor: emailFocus ? '#C2B280' : '#E3DEC3',
                          background: emailFocus ? '#F7F5F0' : '#FCFAF6',
                          transition: 'all 0.15s ease',
                          position: 'relative',
                          zIndex: 2
                        }}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <DustParticles isFocused={emailFocus} inputValue={email} />
                    </div>
                  </div>

                  {/* Password input */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#4A3B32', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Password
                    </label>
                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '14px', color: passFocus ? '#8B7E66' : '#8C8273', zIndex: 6 }}>
                        <Lock size={18} />
                      </span>
                      <input 
                        type="password" 
                        required
                        minLength={6}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem 0.75rem 2.75rem',
                          borderRadius: '8px',
                          border: '1.5px solid',
                          outline: 'none',
                          fontSize: '1rem',
                          color: '#4A3B32',
                          boxShadow: 'none',
                          borderColor: passFocus ? '#C2B280' : '#E3DEC3',
                          background: passFocus ? '#F7F5F0' : '#FCFAF6',
                          transition: 'all 0.15s ease',
                          position: 'relative',
                          zIndex: 2
                        }}
                        onFocus={() => setPassFocus(true)}
                        onBlur={() => setPassFocus(false)}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <DustParticles isFocused={passFocus} inputValue={password} />
                    </div>
                  </div>

                  {/* ── NEW NORMAL SUBMIT BUTTON (NO PAINT ANIMATIONS) ── */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      background: isSignUp 
                        ? 'linear-gradient(270deg, #bae6fd, #7dd3fc, #99f6e4, #a5f3fc, #bae6fd)' 
                        : 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                      backgroundSize: isSignUp ? '400% 400%' : 'auto',
                      animation: isSignUp ? 'water-gradient 8s ease infinite' : 'none',
                      color: isSignUp ? '#0369a1' : '#FFFFFF',
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
                      boxShadow: isSignUp 
                        ? '0 4px 12px rgba(125, 211, 252, 0.3)' 
                        : '0 4px 12px rgba(15, 23, 42, 0.12)',
                      transition: 'all 0.2s ease',
                      opacity: isLoading ? 0.8 : 1,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                      if (!isLoading) {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = isSignUp 
                          ? '0 6px 16px rgba(125, 211, 252, 0.5)' 
                          : '0 6px 16px rgba(15, 23, 42, 0.22)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isLoading) {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = isSignUp 
                          ? '0 4px 12px rgba(125, 211, 252, 0.3)' 
                          : '0 4px 12px rgba(15, 23, 42, 0.12)';
                      }
                    }}
                  >
                    {isSignUp && <WaterWaves />}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', position: 'relative', zIndex: 2 }}>
                      {isLoading && (
                        <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                      )}
                      {isSignUp ? 'Create Account' : 'Sign In'}
                    </div>
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
          color: #8C8273 !important;
          opacity: 1 !important;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes water-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes flow-wave-1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes flow-wave-2 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes flow-wave-3 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
