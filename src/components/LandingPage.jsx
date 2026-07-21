import React, { useRef } from 'react';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { templates } from './templatesList';
import TemplateRenderer from './TemplateRenderer';
import { mockResumeData, templateMockData } from '../utils/mockResumeData';
import { ArrowRight, Sparkles, CheckCircle, Zap, FileText, ChevronRight, Layout, Upload } from 'lucide-react';


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
  const { setSelectedTemplate } = useResume();
  const { user, signOut } = useAuth();
  const templatesRef = useRef(null);

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
      
      {/* Header - Compact */}
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

      {/* Hero Section - Left Aligned with Vibrant Mesh */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Abstract Gradient Mesh Background */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(67, 56, 202, 0.15) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(60px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(60px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, rgba(255,255,255,0) 60%)', filter: 'blur(60px)', zIndex: 0 }} />

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="container hero-grid"
          style={{ 
            display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'center', 
            paddingTop: '6rem', paddingBottom: '6rem', position: 'relative', zIndex: 10
          }}
        >
          {/* Left Side: Content */}
          <div style={{ paddingRight: '2rem' }}>
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

          {/* Right Side: Visual Preview */}
          <div className="hero-preview" style={{ position: 'relative', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <motion.div 
               initial={{ y: 20, rotate: -2 }}
               animate={{ y: 0, rotate: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               style={{ 
                 width: '400px', height: '565px', 
                 background: 'linear-gradient(90deg, rgba(29, 78, 216, 0.03) 0%, #FFFFFF 15%)',
                 borderLeft: '4px solid #1D4ED8', borderRight: '1.5px solid #CBD5E1',
                 borderTop: 'none', borderBottom: 'none',
                 boxShadow: '0 30px 60px -15px rgba(15, 23, 42, 0.15)',
                 overflow: 'visible', position: 'relative', zIndex: 10
               }}
             >
               <TornEdge />
               <TornEdge isBottom />
               <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '800px', height: '1131px', background: '#FFFFFF', overflow: 'hidden' }}>
                  <TemplateRenderer templateId="visionary" resumeData={mockResumeData} />
               </div>
             </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Inline Templates Section - Medium sized actual renders */}
      <div ref={templatesRef} id="templates" style={{ padding: '3rem 2rem', background: 'var(--card-bg)', borderTop: '1px solid var(--border-color)' }}>
         <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
               <div>
                 <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
                    Get started with a template
                 </h2>
                 <p style={{ color: 'var(--text-muted)' }}>Select a design below to jump right into the builder.</p>
               </div>
               <button 
                  onClick={() => navigate('/templates', { state: { skipPathSelection: false } })}
                  style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', paddingBottom: '0.5rem' }}
               >
                  See All <ChevronRight size={18} />
               </button>
            </div>

            {/* Horizontal Scrollable Container */}
            <div style={{ 
               display: 'flex', gap: '2.5rem', overflowX: 'auto', paddingBottom: '2.5rem', paddingTop: '1rem',
               scrollbarWidth: 'none', msOverflowStyle: 'none'
            }}>
               {templates.slice(0, 8).map((template, index) => {
                  const cardWidth = 340;
                  const scale = cardWidth / 800;
                  const scaledHeight = 1131 * scale;

                  return (
                     <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ y: -6 }}
                        onClick={() => handleSelectTemplate(template.id)}
                        style={{
                           flex: '0 0 auto',
                           width: `${cardWidth}px`,
                           background: 'linear-gradient(90deg, rgba(29, 78, 216, 0.03) 0%, #FFFFFF 15%)',
                           borderLeft: '4px solid #1D4ED8',
                           borderRight: '1.5px solid #CBD5E1',
                           borderTop: 'none',
                           borderBottom: 'none',
                           boxShadow: '0 12px 30px -10px rgba(15, 23, 42, 0.08)',
                           cursor: 'pointer',
                           display: 'flex',
                           flexDirection: 'column',
                           transition: 'all 0.2s ease',
                           position: 'relative'
                        }}
                     >
                        <TornEdge />
                        <TornEdge isBottom />
                        <div style={{ 
                           height: `${scaledHeight}px`,
                           width: '100%',
                           background: 'var(--bg-color)',
                           overflow: 'hidden',
                           borderBottom: '1px solid var(--border-color)',
                           position: 'relative'
                        }}>
                           <div style={{ 
                             width: '800px', height: '1131px', 
                             transform: `scale(${scale})`, transformOrigin: 'top left',
                             background: 'var(--card-bg)'
                           }}>
                              <TemplateRenderer templateId={template.id} resumeData={templateMockData[template.id] || mockResumeData} />
                           </div>
                        </div>

                        <div style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <div>
                             <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>{template.name}</h3>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                Chosen by {Math.floor(Math.random() * 8 + 2)}.{Math.floor(Math.random() * 9)}K users
                             </div>
                           </div>
                           <div style={{ display: 'flex', gap: '0.25rem' }}>
                             {template.colors?.map((color, i) => (
                               <div key={i} style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: color, border: '1px solid var(--border-color)' }} />
                             ))}
                           </div>
                        </div>
                     </motion.div>
                  );
               })}
            </div>
         </div>
      </div>

      {/* Features Section */}
      <div id="features" style={{ background: 'var(--bg-color)', padding: '4rem 2rem', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(90deg, rgba(29, 78, 216, 0.03) 0%, #FFFFFF 15%)', borderLeft: '4px solid #1D4ED8', borderRight: '1.5px solid #CBD5E1', borderTop: 'none', borderBottom: 'none', padding: '2.5rem 1.5rem', boxShadow: '0 10px 25px -10px rgba(15, 23, 42, 0.06)', position: 'relative' }}>
            <TornEdge />
            <TornEdge isBottom />
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(120, 113, 108, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <CheckCircle size={28} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>ATS-Friendly</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.5 }}>Our templates are parsed perfectly by Applicant Tracking Systems, ensuring recruiters actually see your resume.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(90deg, rgba(29, 78, 216, 0.03) 0%, #FFFFFF 15%)', borderLeft: '4px solid #1D4ED8', borderRight: '1.5px solid #CBD5E1', borderTop: 'none', borderBottom: 'none', padding: '2.5rem 1.5rem', boxShadow: '0 10px 25px -10px rgba(15, 23, 42, 0.06)', position: 'relative' }}>
            <TornEdge />
            <TornEdge isBottom />
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(220, 38, 38, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Zap size={28} color="var(--danger)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>Lightning Fast</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.5 }}>No sign-ups, no friction. Just start typing or upload your old PDF, and let AI extract your data instantly.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(90deg, rgba(29, 78, 216, 0.03) 0%, #FFFFFF 15%)', borderLeft: '4px solid #1D4ED8', borderRight: '1.5px solid #CBD5E1', borderTop: 'none', borderBottom: 'none', padding: '2.5rem 1.5rem', boxShadow: '0 10px 25px -10px rgba(15, 23, 42, 0.06)', position: 'relative' }}>
            <TornEdge />
            <TornEdge isBottom />
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(22, 163, 74, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <FileText size={28} color="var(--success)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>1-Click Export</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.5 }}>Once you're happy with your design, export it to a pixel-perfect PDF with a single click, completely free.</p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--card-bg)', padding: '2rem 2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>&copy; {new Date().getFullYear()} Elevate Resume. All rights reserved.</p>
      </footer>
      {/* Clean Formal Login Modal */}



    </motion.div>
  );
};

export default LandingPage;
