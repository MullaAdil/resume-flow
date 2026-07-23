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
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', backgroundColor: 'var(--bg-color)', position: 'relative' }}>
      
      {/* Top Multi-Color Accent Line */}
      <div className="bg-multicolor-bar" />

      {/* Header - Modern Clean Navbar */}
      <header style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1rem 3rem', background: '#FFFFFF', 
        borderBottom: '1px solid #E2E8F0',
        position: 'sticky', top: 0, zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.35rem', color: 'var(--text-main)', cursor: 'pointer' }} onClick={() => navigate('/')}>
           <div style={{
             width: '40px', height: '40px', borderRadius: '10px',
             background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
             display: 'flex', alignItems: 'center', justifyContent: 'center'
           }}>
             <FileText size={24} color="#FFFFFF" />
           </div>
           <span className="text-gradient-multicolor">Elevate Resume</span>
        </div>

        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button 
            onClick={() => navigate('/templates', { state: { skipPathSelection: false } })}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', padding: 0 }}
          >
            Templates
          </button>
          <a href="#templates" style={{ color: 'var(--text-main)', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>3D Showcase</a>
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
                  background: 'transparent', border: '1.5px solid #CBD5E1', 
                  color: 'var(--text-muted)', fontWeight: 700, cursor: 'pointer', 
                  padding: '0.5rem 1.25rem', borderRadius: '8px', fontSize: '0.95rem'
                }}
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
                  padding: '0.55rem 1.35rem', 
                  borderRadius: '10px', 
                  fontSize: '0.95rem'
                }}
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/login', { state: { mode: 'signup' } })}
                style={{ 
                  padding: '0.6rem 1.5rem', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 700,
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                  color: '#FFFFFF', border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)'
                }}
              >
                Create Account
              </button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div style={{ position: 'relative', overflow: 'hidden', paddingBottom: '2rem', background: '#FAF9F6' }}>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="container hero-grid"
          style={{ 
            display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'center', 
            paddingTop: '4.5rem', paddingBottom: '4rem', position: 'relative', zIndex: 10
          }}
        >
          {/* Left Side: Content */}
          <div style={{ paddingRight: '2rem' }}>
            <div style={{ marginBottom: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span className="badge-multicolor">
                <Sparkles size={16} color="#4F46E5" /> AI-Powered Resume Builder
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 700, background: 'rgba(16, 185, 129, 0.1)', color: '#047857', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <Zap size={15} /> 100% ATS Approved
              </span>
            </div>

            <h1 className="hero-title" style={{ fontSize: '3.75rem', fontWeight: 800, marginBottom: '1.25rem', lineHeight: 1.1, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Land 3x more interviews with our <span className="text-gradient-multicolor">AI Resume Builder</span>
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.25rem', fontWeight: 500, lineHeight: 1.6, maxWidth: '620px' }}>
              Select professional templates, instant AI resume content generator, and 1-click ATS optimizer designed to impress recruiters.
            </p>

            <div className="hero-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <button 
                onClick={() => navigate('/templates', { state: { skipPathSelection: true } })}
                style={{ 
                  fontSize: '1.2rem', padding: '1.1rem 2.5rem', borderRadius: '14px', 
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)', 
                  color: '#FFFFFF', border: 'none', fontWeight: 800, cursor: 'pointer', 
                  boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)'
                }}
              >
                Build Your Resume Now <ArrowRight size={20} style={{ display: 'inline', marginLeft: '0.5rem', verticalAlign: 'middle' }} />
              </button>
              <button 
                onClick={() => navigate('/import', { state: { skipPathSelection: false } })}
                style={{ 
                  fontSize: '1.1rem', padding: '1rem 2.5rem', borderRadius: '14px', 
                  backgroundColor: '#FFFFFF', color: 'var(--text-main)', 
                  border: '2px solid var(--text-main)',
                  fontWeight: 700, cursor: 'pointer'
                }}
              >
                Upload Existing CV
              </button>
            </div>
          </div>

          {/* Right Side: Clean Visual Preview */}
          <div className="hero-preview" style={{ position: 'relative', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <div 
               style={{ 
                 width: '400px', height: '565px', 
                 background: '#FFFFFF',
                 borderLeft: '4px solid #4F46E5', borderRight: '1.5px solid #CBD5E1',
                 borderTop: 'none', borderBottom: 'none',
                 boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.12)',
                 overflow: 'visible', position: 'relative', zIndex: 10
               }}
             >
               <TornEdge />
               <TornEdge isBottom />
               <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '800px', height: '1131px', background: '#FFFFFF', overflow: 'hidden' }}>
                  <TemplateRenderer templateId="visionary" resumeData={mockResumeData} />
               </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* 3D FlipBook Showcase Section - Down Near Book */}
      <div id="templates" style={{ 
        padding: '4rem 2rem 5rem', 
        background: '#FFFFFF', 
        borderTop: '1px solid var(--border-color)', 
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        position: 'relative'
      }}>
         <div style={{ maxWidth: '1400px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ marginBottom: '0.5rem' }}>
                <span className="badge-multicolor">
                  📖 Interactive 3D Showcase
                </span>
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                 Flip through our <span className="text-gradient-multicolor">Template Showcase</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Click or drag pages to flip through the book below.</p>
            </div>
            <button 
               onClick={() => navigate('/templates', { state: { skipPathSelection: false } })}
               style={{ 
                 background: '#FFFFFF', border: '1px solid #CBD5E1', 
                 color: 'var(--text-main)', fontWeight: 700, fontSize: '1rem', 
                 cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', 
                 padding: '0.75rem 1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
               }}
            >
               See All Templates <ChevronRight size={18} />
            </button>
         </div>

         {/* Render the Clean FlipBook */}
         <div style={{ width: '100%' }}>
           <FlipBook 
             templates={templates}
             onSelect={handleSelectTemplate}
           />
         </div>
      </div>

      {/* Features Section - Multi-Color Glass Cards */}
      <div id="features" style={{ background: 'var(--bg-color)', padding: '5rem 2rem', borderTop: '1px solid var(--border-color)', position: 'relative' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
          <span className="badge-multicolor" style={{ marginBottom: '1rem' }}>⚡ Powerful Features</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
             Everything you need to land your <span className="text-gradient-multicolor">Next Dream Role</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)' }}>Created by industry experts to give your application an unfair advantage.</p>
        </div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Card 1: Blue/Indigo Theme */}
          <div className="multicolor-card" style={{ padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
            <TornEdge />
            <TornEdge isBottom />
            <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(59, 130, 246, 0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <CheckCircle size={32} color="#4F46E5" />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>100% ATS-Optimized</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>Our multi-color templates are tested with top ATS software (Workday, Greenhouse, Taleo) to ensure flawless parsing every time.</p>
          </div>

          {/* Card 2: Pink/Purple Theme */}
          <div className="multicolor-card" style={{ padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
            <TornEdge />
            <TornEdge isBottom />
            <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(168, 85, 247, 0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Zap size={32} color="#EC4899" />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>AI Content Writer</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>Generate tailored bullet points, summary statements, and key skill lists in seconds using artificial intelligence.</p>
          </div>

          {/* Card 3: Emerald/Teal Theme */}
          <div className="multicolor-card" style={{ padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
            <TornEdge />
            <TornEdge isBottom />
            <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <FileText size={32} color="#10B981" />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>1-Click HD Export</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>Download vector-perfect PDF files instantly without watermarks, custom margins, or formatting distortion.</p>
          </div>

        </div>
      </div>

      {/* CTA Banner */}
      <div style={{ 
        padding: '5rem 2rem', 
        background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
        color: '#FFFFFF', textAlign: 'center', position: 'relative'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.25rem', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Ready to build your <span style={{ background: 'linear-gradient(135deg, #38BDF8, #818CF8, #F472B6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Professional Resume</span>?
          </h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2.5rem', fontWeight: 500, lineHeight: 1.6 }}>
            Join thousands of job seekers who landed interviews at top companies.
          </p>
          <button 
            onClick={() => navigate('/templates', { state: { skipPathSelection: true } })}
            style={{ 
              fontSize: '1.25rem', padding: '1.2rem 3rem', borderRadius: '14px', 
              background: '#10B981', 
              color: '#FFFFFF', border: 'none', fontWeight: 800, cursor: 'pointer', 
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
            }}
          >
            Create My Free Resume Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#0F172A', color: '#94A3B8', padding: '3rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '1rem' }}>
           <FileText size={24} color="#6366F1" />
           Elevate Resume
        </div>
        <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>&copy; {new Date().getFullYear()} Elevate Resume. All rights reserved.</p>
      </footer>

    </motion.div>
  );
};

export default LandingPage;
