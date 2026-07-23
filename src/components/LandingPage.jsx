import React, { useRef, useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { templates } from './templatesList';
import TemplateRenderer from './TemplateRenderer';
import FlipBook from './FlipBook';
import { mockResumeData, templateMockData } from '../utils/mockResumeData';
import { apiClient } from '../utils/apiClient';
import { ArrowRight, Sparkles, CheckCircle, Zap, FileText, ChevronRight, Layout, Upload, Clock, Edit3, Trash2 } from 'lucide-react';


// ── Deckled Torn Paper Edges ──
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

// ── Hero Animated Transformation Component ──
const HeroAnimatedCard = () => {
  const [phase, setPhase] = useState('resume'); // 'resume' | 'tearing' | 'letter'

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase('tearing');
    }, 4000);

    const timer2 = setTimeout(() => {
      setPhase('letter');
    }, 4800);

    const timer3 = setTimeout(() => {
      setPhase('resume');
    }, 9000);

    const interval = setInterval(() => {
      setPhase('resume');
      setTimeout(() => setPhase('tearing'), 4000);
      setTimeout(() => setPhase('letter'), 4800);
    }, 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '450px', height: '636px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      {/* Floating Confetti Shards during tearing */}
      {phase === 'tearing' && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
              animate={{
                x: (i % 2 === 0 ? 1 : -1) * (60 + Math.random() * 120),
                y: -50 - Math.random() * 100,
                opacity: 0,
                scale: 0.2,
                rotate: Math.random() * 360
              }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: `${12 + (i % 4) * 6}px`,
                height: `${16 + (i % 3) * 8}px`,
                background: i % 3 === 0 ? '#10B981' : i % 3 === 1 ? '#F59E0B' : '#6366F1',
                borderRadius: '3px',
                zIndex: 30
              }}
            />
          ))}
        </>
      )}

      {/* Phase 1: Full Elon Musk Resume Card */}
      {phase !== 'letter' && (
        <motion.div
          key="resume-card"
          initial={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
          animate={
            phase === 'tearing'
              ? {
                  scale: [1, 1.03, 0.85],
                  rotate: [0, -4, 6, -10],
                  opacity: [1, 0.9, 0],
                  filter: ['blur(0px)', 'blur(2px)', 'blur(8px)']
                }
              : { opacity: 1, scale: 1, rotate: 0, y: 0 }
          }
          transition={{ duration: phase === 'tearing' ? 0.75 : 0.4 }}
          style={{
            width: '450px',
            height: '636px',
            background: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.18)',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 10
          }}
        >
          {/* Status Badge */}
          <div style={{
            position: 'absolute', top: '12px', right: '12px', zIndex: 20,
            background: 'rgba(5, 150, 105, 0.9)', color: '#FFFFFF',
            padding: '0.35rem 0.85rem', borderRadius: '9999px',
            fontSize: '0.8rem', fontWeight: 700, backdropFilter: 'blur(6px)',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
            display: 'flex', alignItems: 'center', gap: '0.35rem'
          }}>
            <Sparkles size={14} /> Elon Musk ATS Resume
          </div>

          {/* Full Resume Render scaled to fit container completely without cropping */}
          <div style={{
            transform: 'scale(0.5625)',
            transformOrigin: 'top left',
            width: '800px',
            height: '1131px',
            background: '#FFFFFF',
            overflow: 'hidden'
          }}>
            <TemplateRenderer templateId="visionary" resumeData={templateMockData['visionary'] || mockResumeData} />
          </div>
        </motion.div>
      )}

      {/* Phase 2: Official Job Offer Letter Card (Spawns after tear down) */}
      {phase !== 'resume' && (
        <motion.div
          key="letter-card"
          initial={{ opacity: 0, scale: 0.8, y: 30, rotate: 5 }}
          animate={
            phase === 'letter'
              ? { opacity: 1, scale: 1, y: 0, rotate: 0 }
              : { opacity: 0, scale: 0.85, y: 20 }
          }
          transition={{ duration: 0.5, ease: 'backOut' }}
          style={{
            width: '450px',
            height: '636px',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(5, 150, 105, 0.25)',
            border: '2px solid #10B981',
            padding: '2.25rem 2rem',
            boxSizing: 'border-box',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 15,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {/* Top Status Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px dashed #E2E8F0', paddingBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #10B981, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                <CheckCircle size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>SPACEX & TESLA</h4>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>OFFICIAL OFFER OF EMPLOYMENT</span>
              </div>
            </div>
            <span style={{ background: '#D1FAE5', color: '#047857', fontSize: '0.75rem', fontWeight: 800, padding: '0.35rem 0.75rem', borderRadius: '9999px' }}>
              PASSED ATS (99%)
            </span>
          </div>

          {/* Letter Body */}
          <div style={{ margin: '1.25rem 0', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600, marginBottom: '0.5rem' }}>Date: July 23, 2026</p>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', lineHeight: 1.3 }}>
              Dear Elon Musk,
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              We were thoroughly impressed by your ATS-formatted resume created with <strong>Elevate Resume</strong>!
            </p>
            <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              We are thrilled to formally offer you the role of <strong>Chief Executive Engineer</strong> with an annual compensation package of <strong>$250,000 + Equity Stock Options</strong>.
            </p>

            {/* Official Stamp Box */}
            <div style={{
              border: '2px solid #10B981',
              borderRadius: '12px',
              padding: '1rem',
              background: 'rgba(16, 185, 129, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 700, display: 'block' }}>RECRUITMENT STATUS</span>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>OFFER ACCEPTED 🎉</span>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px dashed #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-12deg)', color: '#10B981', fontWeight: 900, fontSize: '0.7rem', textAlign: 'center' }}>
                APPROVED
              </div>
            </div>
          </div>

          {/* Footer Signatures */}
          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>Verified ATS Candidate</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>Elevate Resume System</span>
            </div>
            <button 
              onClick={() => setPhase('resume')}
              style={{ background: '#10B981', color: '#FFFFFF', border: 'none', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Replay Visual 🔄
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { setSelectedTemplate, setResumeData } = useResume();
  const { user, signOut } = useAuth();
  const templatesRef = useRef(null);

  const [userResumes, setUserResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      setLoadingResumes(true);
      apiClient.resumes.list(user.id)
        .then(res => setUserResumes(res))
        .catch(err => console.error("Failed to load user resumes:", err))
        .finally(() => setLoadingResumes(false));
    }
  }, [user]);

  const handleEditResume = async (id) => {
    try {
      const savedResume = await apiClient.resumes.get(id);
      if (savedResume && savedResume.data) {
        setResumeData(savedResume.data);
        if (savedResume.data.settings?.template) {
           setSelectedTemplate(savedResume.data.settings.template);
        }
        navigate('/editor');
      }
    } catch (err) {
      console.error("Failed to load resume for editing", err);
    }
  };

  const handleDeleteResume = async (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await apiClient.resumes.delete(id);
        setUserResumes(prev => prev.filter(r => r.id !== id));
      } catch (err) {
        console.error("Failed to delete resume", err);
      }
    }
  };

  const scrollToTemplates = () => {
    templatesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
    navigate('/choose');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', backgroundColor: 'var(--bg-color)' }}>
      
      {/* Header - Green Style */}
      <header style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1rem 3rem', background: 'var(--card-bg)', 
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-main)' }}>
           <FileText size={28} color="var(--primary)" />
           Elevate Resume
        </div>

        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button 
            onClick={() => navigate('/templates', { state: { skipPathSelection: false } })}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', padding: 0 }}
          >
            Templates
          </button>
          <a href="#features" style={{ color: 'var(--text-main)', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>Features</a>
        </nav>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {user ? (
            <>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {user.email}
              </span>
              <button 
                onClick={signOut}
                style={{ 
                  background: 'transparent', border: '1px solid #CBD5E1', 
                  color: 'var(--text-muted)', fontWeight: 700, cursor: 'pointer', 
                  padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.95rem',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#F8FAFC'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate('/login', { state: { mode: 'signin' } })} 
                style={{ 
                  background: 'transparent', 
                  border: '1.5px solid #CBD5E1', 
                  color: 'var(--text-main)', 
                  fontWeight: 700, 
                  cursor: 'pointer', 
                  padding: '0.5rem 1.25rem', 
                  borderRadius: '6px', 
                  fontSize: '0.95rem',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#94A3B8'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
              >
                Sign In
              </button>
              <button 
                className="btn-primary" 
                onClick={() => navigate('/login', { state: { mode: 'signup' } })}
                style={{ padding: '0.5rem 1.25rem', borderRadius: '6px', fontSize: '0.95rem' }}
              >
                Create Account
              </button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section - Simple Minimal Multicolor Background Mesh */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Simple Minimal Gradient Mesh Background */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(67, 56, 202, 0.12) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(60px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(60px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(60px)', zIndex: 0 }} />

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="container hero-grid"
          style={{ 
            display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem', alignItems: 'center', 
            paddingTop: '5rem', paddingBottom: '5rem', position: 'relative', zIndex: 10
          }}
        >
          {/* Left Side: Content */}
          <div style={{ paddingRight: '1.5rem' }}>
            <h1 className="hero-title" style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Land more interviews with our <span style={{ color: 'var(--primary)' }}>Resume Builder</span>
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', fontWeight: 500, lineHeight: 1.6, maxWidth: '600px' }}>
              ATS Check, AI Writer, and One-Click Job Tailoring make your resume stand out to recruiters instantly.
            </p>

            <div className="hero-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <button 
                className="btn-primary" 
                onClick={() => navigate('/templates', { state: { skipPathSelection: true } })}
                style={{ fontSize: '1.2rem', padding: '1.1rem 2.5rem', borderRadius: '24px 12px 24px 12px', background: '#059669', color: '#FFFFFF', border: 'none', fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(5,150,105,0.3)' }}
              >
                Build Your Resume
              </button>
              <button 
                onClick={() => navigate('/import', { state: { skipPathSelection: false } })}
                style={{ 
                  fontSize: '1.1rem', padding: '1rem 2.5rem', borderRadius: '8px', 
                  backgroundColor: 'transparent', color: 'var(--text-main)', border: '2px solid var(--text-main)',
                  fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--text-main)'; e.currentTarget.style.color = 'var(--card-bg)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-main)'; }}
              >
                Upload Existing CV
              </button>
            </div>
          </div>

          {/* Right Side: Animated Hero Card (Full Resume -> Tears down into pieces -> Spawns Job Offer Letter) */}
          <div className="hero-preview" style={{ position: 'relative', height: '640px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <HeroAnimatedCard />
          </div>
        </motion.div>
      </div>

      {/* 3D FlipBook Showcase Inline */}
      <div id="templates" style={{ position: 'relative', overflow: 'hidden', padding: '4rem 2rem', background: 'var(--bg-color)', borderTop: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         {/* Simple Minimal Gradient Mesh Background matching hero */}
         <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(67, 56, 202, 0.08) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(60px)', zIndex: 0 }} />
         <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(60px)', zIndex: 0 }} />

         <div style={{ maxWidth: '1400px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
            <div>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
                 Get started with a template
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Select a design below to jump right into the builder.</p>
            </div>
            <button 
               onClick={() => navigate('/templates', { state: { skipPathSelection: false } })}
               style={{ 
                 background: '#FFFFFF', border: '1px solid #E2E8F0', color: 'var(--primary)', 
                 fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', 
                 alignItems: 'center', gap: '0.35rem', padding: '0.6rem 1.25rem', borderRadius: '9999px',
                 boxShadow: '0 2px 6px rgba(0,0,0,0.04)', transition: 'all 0.2s ease'
               }}
               onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
               onMouseOut={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
               See All <ChevronRight size={18} />
            </button>
         </div>

         {/* Render the FlipBook in the landing page! */}
         <div style={{ marginTop: '0.5rem', width: '100%', position: 'relative', zIndex: 10 }}>
           <FlipBook 
             templates={templates}
             onSelect={handleSelectTemplate}
           />
         </div>
      </div>

      {/* Features Section */}
      <div id="features" style={{ background: 'var(--bg-color)', padding: '4rem 2rem 5rem', borderTop: 'none' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#FFFFFF', borderRadius: '20px', padding: '2.5rem 2rem', boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.05)', border: '1px solid #E2E8F0', position: 'relative' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(5, 150, 105, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <CheckCircle size={30} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>ATS-Friendly</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>Our templates are parsed perfectly by Applicant Tracking Systems, ensuring recruiters actually see your resume.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#FFFFFF', borderRadius: '20px', padding: '2.5rem 2rem', boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.05)', border: '1px solid #E2E8F0', position: 'relative' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Zap size={30} color="var(--danger)" />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>Lightning Fast</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>No sign-ups, no friction. Just start typing or upload your old PDF, and let AI extract your data instantly.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#FFFFFF', borderRadius: '20px', padding: '2.5rem 2rem', boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.05)', border: '1px solid #E2E8F0', position: 'relative' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <FileText size={30} color="var(--success)" />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>1-Click Export</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>Once you're happy with your design, export it to a pixel-perfect PDF with a single click, completely free.</p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--card-bg)', padding: '2.5rem 2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>&copy; {new Date().getFullYear()} Elevate Resume. All rights reserved.</p>
      </footer>

    </motion.div>
  );
};

export default LandingPage;
