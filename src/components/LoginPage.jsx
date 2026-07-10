import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';
import { FileText, ArrowLeft, Mail, Lock, Sparkles, Loader2 } from 'lucide-react';

const TornEdge = ({ isBottom }) => (
  <svg 
    width="100%" 
    height="10" 
    viewBox="0 0 1200 10" 
    preserveAspectRatio="none"
    style={{ 
      position: 'absolute', 
      left: 0, 
      right: 0, 
      [isBottom ? 'bottom' : 'top']: '-5px', 
      zIndex: 10,
      pointerEvents: 'none'
    }}
  >
    <path 
      d={isBottom 
        ? "M0,5 L20,10 L40,5 L60,10 L80,5 L100,10 L120,5 L140,10 L160,5 L180,10 L200,5 L220,10 L240,5 L260,10 L280,5 L300,10 L320,5 L340,10 L360,5 L380,10 L400,5 L420,10 L440,5 L460,10 L480,5 L500,10 L520,5 L540,10 L560,5 L580,10 L600,5 L620,10 L640,5 L660,10 L680,5 L700,10 L720,5 L740,10 L760,5 L780,10 L800,5 L840,10 L880,5 L920,10 L960,5 L1000,10 L1040,5 L1080,10 L1120,5 L1160,10 L1200,5 L1200,0 L0,0 Z"
        : "M0,5 L20,0 L40,5 L60,0 L80,5 L100,0 L120,5 L140,0 L160,5 L180,0 L200,5 L220,0 L240,5 L260,0 L280,5 L300,0 L320,5 L340,0 L360,5 L380,0 L400,5 L420,0 L440,5 L460,0 L480,5 L500,0 L520,6 L540,0 L560,5 L580,0 L600,5 L620,0 L640,5 L660,0 L680,5 L700,0 L720,5 L740,0 L760,5 L780,0 L800,5 L840,0 L880,5 L920,0 L960,5 L1000,0 L1040,5 L1080,0 L1120,5 L1160,0 L1200,5 L1200,10 L0,10 Z"
      } 
      fill="#FFFFFF" 
      stroke="#CBD5E1"
      strokeWidth="1.5"
    />
  </svg>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!supabase) {
      setError('Supabase is not configured yet. Please enter your API keys in the .env file.');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        if (data?.user && data?.session === null) {
          setMessage('Confirmation email sent! Please check your inbox.');
        } else {
          setMessage('Account created successfully! Redirecting...');
          setTimeout(() => navigate('/templates'), 1500);
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-color)',
      position: 'relative',
      overflow: 'hidden',
      padding: '1.5rem'
    }}>
      {/* Background blobs to match landing page */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(50px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(29, 78, 216, 0.05) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(50px)', zIndex: 0 }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'linear-gradient(90deg, rgba(29, 78, 216, 0.02) 0%, #FFFFFF 15%)',
          borderLeft: '4px solid #059669',
          borderRight: '1.5px solid #CBD5E1',
          borderTop: 'none',
          borderBottom: 'none',
          padding: '3rem 2.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
          position: 'relative',
          zIndex: 10
        }}
      >
        <TornEdge />
        <TornEdge isBottom />

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
            marginBottom: '1.5rem',
            padding: 0
          }}
        >
          <ArrowLeft size={16} /> Back to home
        </button>

        {/* Logo / Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
          <FileText size={32} color="#059669" />
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Elevate Resume
          </h1>
        </div>
        <p style={{ fontSize: '0.95rem', color: '#475569', margin: '0 0 2rem 0', fontWeight: 500 }}>
          {isSignUp ? 'Create your free account to sync resumes.' : 'Sign in to access your saved resumes.'}
        </p>

        {/* Alerts */}
        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', borderRadius: '12px', padding: '0.75rem 1rem', fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: 500 }}>
            ⚠️ {error}
          </div>
        )}
        {message && (
          <div style={{ background: '#ECFDF5', border: '1px solid #6EE7B7', color: '#047857', borderRadius: '12px', padding: '0.75rem 1rem', fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: 600 }}>
            ✨ {message}
          </div>
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
                  border: '1.5px solid #CBD5E1',
                  outline: 'none',
                  fontSize: '1rem',
                  color: '#1E293B',
                  transition: 'border-color 0.15s ease'
                }}
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
                  border: '1.5px solid #CBD5E1',
                  outline: 'none',
                  fontSize: '1rem',
                  color: '#1E293B',
                  transition: 'border-color 0.15s ease'
                }}
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
              background: '#059669',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.9rem',
              borderRadius: '24px 12px 24px 12px',
              fontWeight: 800,
              fontSize: '1.05rem',
              cursor: isLoading ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '0.5rem',
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
            borderRadius: '12px',
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
