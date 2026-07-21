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

// --- ANIMATED BUBBLES CANVAS (WATER MINIMAL VIBE) ---
const WaterBubblesCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth || 150;
      canvas.height = canvas.parentElement.offsetHeight || 40;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let particles = [];
    const maxParticles = 12;

    class Bubble {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 5;
        this.size = Math.random() * 1.5 + 0.8; // tiny micro bubbles
        this.speedY = -(Math.random() * 0.4 + 0.2); // rise slowly
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.alpha = Math.random() * 0.4 + 0.3;
        this.decay = Math.random() * 0.005 + 0.003;
      }

      update() {
        this.x += this.speedX + Math.sin(this.y * 0.02) * 0.1;
        this.y += this.speedY;
        this.alpha -= this.decay;
        return this.alpha > 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
        ctx.fill();
        
        // highlight dot
        ctx.beginPath();
        ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.8})`;
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particles.length < maxParticles && Math.random() < 0.15) {
        particles.push(new Bubble());
      }

      particles = particles.filter(p => {
        const keep = p.update();
        if (keep) p.draw();
        return keep;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

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
        zIndex: 1
      }}
    />
  );
};

// --- ANIMATED FLOWING FIRE FLAMES CANVAS (MINIMAL SPARKS VIBE) ---
const FireFlamesCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth || 150;
      canvas.height = canvas.parentElement.offsetHeight || 40;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let particles = [];
    const maxParticles = 12;

    class Ember {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 5;
        this.size = Math.random() * 1.5 + 0.8; // tiny micro embers
        this.speedY = -(Math.random() * 0.5 + 0.3); // rise slightly faster
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.alpha = 1.0;
        this.decay = Math.random() * 0.008 + 0.004;
        
        const colors = [
          'rgba(239, 68, 68, ',   // red
          'rgba(249, 115, 22, ',  // orange
          'rgba(245, 158, 11, ',  // gold
          'rgba(253, 224, 71, '   // yellow
        ];
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX + Math.sin(this.y * 0.04) * 0.15;
        this.y += this.speedY;
        this.alpha -= this.decay;
        return this.alpha > 0;
      }

      draw() {
        ctx.beginPath();
        const r = Math.max(0.1, this.size);
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 1.5);
        grad.addColorStop(0, `${this.colorBase}${this.alpha})`);
        grad.addColorStop(0.5, `${this.colorBase}${this.alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = grad;
        ctx.arc(this.x, this.y, r * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter'; // blend glowing embers

      if (particles.length < maxParticles && Math.random() < 0.18) {
        particles.push(new Ember());
      }

      particles = particles.filter(p => {
        const keep = p.update();
        if (keep) p.draw();
        return keep;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

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
        zIndex: 1
      }}
    />
  );
};

// --- CUSTOM SVG MATCHSTICK ICON ---
const MatchstickIcon = ({ lit }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ overflow: 'visible' }}>
    {/* Wood stick */}
    <rect x="11" y="9" width="2" height="13" rx="0.5" fill="#D2B48C" transform="rotate(-35 12 15)" />
    {/* Match head */}
    <ellipse cx="7.5" cy="9.5" rx="2" ry="2.5" fill={lit ? '#EF4444' : '#800000'} transform="rotate(-35 7.5 9.5)" />
    {/* Flame overlay when lit */}
    {lit && (
      <g style={{
        transform: 'translate(1px, -2px)',
        filter: 'drop-shadow(0 0 4px rgba(249,115,22,0.8))'
      }}>
        {/* Outer flame */}
        <path
          d="M5 8C4 6.5 4.5 4.5 5.5 3C6.5 4.5 7 6.5 6 8C5.5 8.8 4.5 8.8 5 8Z"
          fill="#EF4444"
          style={{
            animation: 'flicker-outer 0.2s ease-in-out infinite alternate',
            transformOrigin: '5px 8px'
          }}
        />
        {/* Middle flame */}
        <path
          d="M5 8C4.5 7 4.8 5.5 5.5 4.5C6.2 5.5 6.5 7 6 8C5.7 8.5 4.8 8.5 5 8Z"
          fill="#F97316"
          style={{
            animation: 'flicker-middle 0.15s ease-in-out infinite alternate-reverse',
            transformOrigin: '5px 8px'
          }}
        />
        {/* Inner flame core */}
        <path
          d="M5 8C4.7 7.5 4.9 6.5 5.5 5.5C6.1 6.5 6.3 7.5 6 8C5.8 8.3 5.2 8.3 5 8Z"
          fill="#FDE047"
          style={{
            animation: 'flicker-inner 0.1s ease-in-out infinite alternate',
            transformOrigin: '5px 8px'
          }}
        />
      </g>
    )}
  </svg>
);

// --- CUSTOM SVG OLDEN STYLE WATER FLASK ---
const FlaskIcon = ({ spilled }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ overflow: 'visible' }}>
    <g style={{
      transform: spilled ? 'rotate(-55deg) translate(-3px, 1px)' : 'none',
      transformOrigin: '12px 14px',
      transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }}>
      {/* Flask Body (Clay/Olden flask look) */}
      <path d="M7 11 C7 8.5, 9 8, 10 7.5 V 4 H 14 V 7.5 C 15 8, 17 8.5, 17 11 C 17 15, 19 18, 17 21 C 15 22.5, 9 22.5, 7 21 C 5 18, 7 15, 7 11 Z" fill="#D2B48C" stroke="#8C6239" strokeWidth="1.5" />
      {/* Leather wrap/band */}
      <rect x="7.8" y="11" width="8.4" height="4" fill="#8C6239" opacity="0.8" rx="0.5" />
      {/* Cork stopper */}
      {!spilled ? (
        <rect x="11" y="2" width="2" height="2.5" rx="0.3" fill="#8C5239" />
      ) : (
        // Cork flying away or removed
        <rect x="17" y="-2" width="2" height="2.5" rx="0.3" fill="#8C5239" style={{ transform: 'rotate(55deg)' }} />
      )}
    </g>
    
    {/* Animated Spilling Water Flow/Droplets */}
    {spilled && (
      <g style={{ filter: 'drop-shadow(0 0 3px rgba(56, 189, 248, 0.75))' }}>
        {/* Drop 1 */}
        <path
          d="M 5 10 C 4.5 10, 4 9.5, 4 9 C 4 8.2, 5 7.2, 5 7.2 C 5 7.2, 6 8.2, 6 9 C 6 9.5, 5.5 10, 5 10 Z"
          fill="#38BDF8"
          style={{
            animation: 'spill-drop 1.1s linear infinite',
            transformOrigin: '5px 10px'
          }}
        />
        {/* Drop 2 */}
        <path
          d="M 2 13 C 1.5 13, 1 12.5, 1 12 C 1 11.2, 2 10.2, 2 10.2 C 2 10.2, 3 11.2, 3 12 C 3 12.5, 2.5 13, 2 13 Z"
          fill="#0EA5E9"
          style={{
            animation: 'spill-drop 1.4s linear infinite 0.25s',
            transformOrigin: '2px 13px'
          }}
        />
        {/* Drop 3 */}
        <path
          d="M 5 14 C 4.5 14, 4 13.5, 4 13 C 4 12.2, 5 11.2, 5 11.2 C 5 11.2, 6 12.2, 6 13 C 6 13.5, 5.5 14, 5 14 Z"
          fill="#7DD3FC"
          style={{
            animation: 'spill-drop 1.2s linear infinite 0.5s',
            transformOrigin: '5px 14px'
          }}
        />
      </g>
    )}
  </svg>
);

// --- CUSTOM SVG GITHUB ICON ---
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
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
  const [showPassword, setShowPassword] = useState(false);

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
                padding: isMobile ? '2.5rem 2rem 2.5rem 2rem' : '3.5rem 3rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: isMobile ? 'flex-start' : 'space-between',
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

                {/* ── OAUTH LOGIN OPTIONS ── */}
                <div style={{ marginTop: isMobile ? '1.5rem' : 'auto' }}>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 800, 
                    color: '#64748B', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em', 
                    marginBottom: '0.75rem' 
                  }}>
                    Or continue with
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {/* Google OAuth Button */}
                    <button
                      type="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        width: '100%',
                        padding: '0.65rem',
                        borderRadius: '8px',
                        background: '#FFFFFF',
                        border: '1.5px solid #E2E8F0',
                        color: '#334155',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#F8FAFC';
                        e.currentTarget.style.borderColor = '#CBD5E1';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = '#FFFFFF';
                        e.currentTarget.style.borderColor = '#E2E8F0';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" style={{ flexShrink: 0 }}>
                        <path fill="#EA4335" d="M9 3.6c1.6 0 3 .6 4.1 1.6l3.1-3.1C14.3.7 11.8 0 9 0 5.5 0 2.4 2 1 5l3.5 2.7C5.4 5.3 7 3.6 9 3.6z" />
                        <path fill="#4285F4" d="M17.6 9.2c0-.6-.1-1.2-.2-1.7H9v3.4h4.8c-.2 1.1-.8 2-1.8 2.6l2.8 2.2c1.7-1.6 2.8-3.9 2.8-6.5z" />
                        <path fill="#FBBC05" d="M4.5 10.3c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2L1 3.6C.3 5 .0 6.5.0 8s.3 3 1 4.4l3.5-2.7z" />
                        <path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.8-2.2c-.8.5-1.9.8-3.2.8-2 0-3.6-1.7-4.2-4.1L1.3 13C2.7 16 5.6 18 9 18z" />
                      </svg>
                      Google
                    </button>

                    {/* GitHub OAuth Button */}
                    <button
                      type="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        width: '100%',
                        padding: '0.65rem',
                        borderRadius: '8px',
                        background: '#181717',
                        border: '1.5px solid #181717',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#272626';
                        e.currentTarget.style.borderColor = '#272626';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = '#181717';
                        e.currentTarget.style.borderColor = '#181717';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <GithubIcon />
                      GitHub
                    </button>
                  </div>
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
                      background: !isSignUp ? 'linear-gradient(270deg, #dc2626, #ea580c, #f59e0b, #ef4444, #dc2626)' : 'transparent',
                      backgroundSize: '400% 400%',
                      animation: !isSignUp ? 'water-gradient 8s ease infinite' : 'none',
                      color: !isSignUp ? '#FFFFFF' : '#475569',
                      border: 'none',
                      boxShadow: !isSignUp ? '0 4px 12px rgba(234, 88, 12, 0.25)' : 'none',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      textShadow: !isSignUp ? '0 1px 2px rgba(0, 0, 0, 0.3)' : 'none'
                    }}
                  >
                    {!isSignUp && <FireFlamesCanvas />}
                    <span style={{ position: 'relative', zIndex: 2 }}>Sign In</span>
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
                      boxShadow: isSignUp ? '0 4px 12px rgba(125, 211, 252, 0.2)' : 'none',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      textShadow: 'none'
                    }}
                  >
                    {isSignUp && <WaterBubblesCanvas />}
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
                        type={showPassword ? 'text' : 'password'} 
                        required
                        minLength={6}
                        style={{
                          width: '100%',
                          padding: '0.75rem 3rem 0.75rem 2.75rem',
                          borderRadius: '8px',
                          border: '1.5px solid',
                          outline: 'none',
                          fontSize: '1rem',
                          color: '#4A3B32',
                          boxShadow: 'none',
                          borderColor: passFocus 
                            ? (showPassword ? (isSignUp ? '#38bdf8' : '#ea580c') : '#C2B280') 
                            : (showPassword ? (isSignUp ? '#38bdf8' : '#ea580c') : '#E3DEC3'),
                          background: passFocus 
                            ? (showPassword ? (isSignUp ? '#f0f9ff' : '#fffaf0') : '#F7F5F0') 
                            : (showPassword ? (isSignUp ? '#f4fbfd' : '#fffaf8') : '#FCFAF6'),
                          boxShadow: passFocus 
                            ? (showPassword 
                              ? (isSignUp ? '0 0 12px rgba(56, 189, 248, 0.35), 0 0 0 3px rgba(56, 189, 248, 0.2)' : '0 0 12px rgba(234, 88, 12, 0.35), 0 0 0 3px rgba(234, 88, 12, 0.2)')
                              : '0 0 0 3px rgba(194, 178, 128, 0.25)')
                            : (showPassword ? (isSignUp ? '0 0 8px rgba(56, 189, 248, 0.2)' : '0 0 8px rgba(234, 88, 12, 0.2)') : 'none'),
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
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '9px',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          zIndex: 10,
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          outline: 'none'
                        }}
                      >
                        {isSignUp ? (
                          <FlaskIcon spilled={showPassword} />
                        ) : (
                          <MatchstickIcon lit={showPassword} />
                        )}
                      </button>
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
                        : 'linear-gradient(270deg, #dc2626, #ea580c, #f59e0b, #ef4444, #dc2626)',
                      backgroundSize: '400% 400%',
                      animation: 'water-gradient 8s ease infinite',
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
                        ? '0 4px 12px rgba(125, 211, 252, 0.25)' 
                        : '0 4px 12px rgba(234, 88, 12, 0.25)',
                      transition: 'all 0.2s ease',
                      opacity: isLoading ? 0.8 : 1,
                      position: 'relative',
                      overflow: 'hidden',
                      textShadow: isSignUp ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                    onMouseOver={(e) => {
                      if (!isLoading) {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = isSignUp 
                          ? '0 6px 16px rgba(125, 211, 252, 0.4)' 
                          : '0 6px 16px rgba(234, 88, 12, 0.4)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isLoading) {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = isSignUp 
                          ? '0 4px 12px rgba(125, 211, 252, 0.25)' 
                          : '0 4px 12px rgba(234, 88, 12, 0.25)';
                      }
                    }}
                  >
                    {isSignUp ? <WaterBubblesCanvas /> : <FireFlamesCanvas />}
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
        @keyframes spill-drop {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-10px, 12px) scale(0.3);
            opacity: 0;
          }
        }
        @keyframes flicker-outer {
          0% { transform: scale(1) rotate(-3deg); }
          100% { transform: scale(1.15) rotate(3deg); }
        }
        @keyframes flicker-middle {
          0% { transform: scale(1) rotate(2deg); }
          100% { transform: scale(1.1) rotate(-2deg); }
        }
        @keyframes flicker-inner {
          0% { transform: scale(1) translateY(0); }
          100% { transform: scale(1.05) translateY(-0.5px); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
