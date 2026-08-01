import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { templates } from './templatesList';
import TemplateRenderer from './TemplateRenderer';
import { mockResumeData } from '../utils/mockResumeData';
import AuraHeader from './AuraHeader';
import { 
  ArrowRight, Sparkles, CheckCircle, Zap, FileText, ChevronRight, 
  Layout, Award, Eye, Layers, ShieldCheck, Download, Star, Check 
} from 'lucide-react';

// ── Center-Stage Holographic Hero Preview Canvas ──
const CenterHeroPlayground = () => {
  const [selectedId, setSelectedId] = useState('multicolor');
  const showcaseOptions = [
    { id: 'multicolor', label: 'Multi Color', color: '#2563EB' },
    { id: 'visionary', label: 'Visionary', color: '#059669' },
    { id: 'minimalclassic', label: 'Minimal Classic', color: '#7C3AED' },
    { id: 'aslam', label: 'Elite IT', color: '#D97706' }
  ];

  return (
    <div style={{
      width: '100%',
      maxWidth: '920px',
      margin: '0 auto',
      position: 'relative'
    }}>
      {/* Floating Badge 1: Top Left */}
      <div style={{
        position: 'absolute',
        top: '-18px',
        left: '-10px',
        zIndex: 10,
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: '9999px',
        padding: '0.55rem 1.15rem',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.85rem',
        fontWeight: 700,
        color: 'var(--text-main)'
      }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 8px #10B981' }} />
        <span>ATS Score: 99.4% Match</span>
      </div>

      {/* Floating Badge 2: Top Right */}
      <div style={{
        position: 'absolute',
        top: '-18px',
        right: '-10px',
        zIndex: 10,
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: '9999px',
        padding: '0.55rem 1.15rem',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.85rem',
        fontWeight: 700,
        color: 'var(--text-main)'
      }}>
        <Sparkles size={16} color="var(--primary)" />
        <span>AI Impact Bullet Enhancer</span>
      </div>

      {/* Main Preview Frame */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden'
      }}>
        {/* Top Sandbox Controls */}
        <div style={{
          padding: '0.85rem 1.5rem',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.04em' }}>
              SELECT TEMPLATE STYLE:
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {showcaseOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedId(opt.id)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '9999px',
                  border: '1px solid',
                  borderColor: selectedId === opt.id ? 'var(--primary-border)' : 'var(--border-color)',
                  backgroundColor: selectedId === opt.id ? 'var(--primary-light)' : '#FFFFFF',
                  color: selectedId === opt.id ? 'var(--primary)' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: selectedId === opt.id ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: opt.color }} />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Paper Render Container */}
        <div style={{
          height: '560px',
          overflow: 'hidden',
          backgroundColor: '#F1F5F9',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '16px'
        }}>
          <div style={{
            transform: 'scale(0.58)',
            transformOrigin: 'top center',
            width: '794px',
            height: '1123px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <TemplateRenderer templateId={selectedId} data={mockResumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();

  const featurePillars = [
    {
      num: "01",
      title: "ATS Parser Compatibility",
      desc: "Engineered to single-column & multi-column recruiter parsing standards so your application passes applicant tracking software flawlessly."
    },
    {
      num: "02",
      title: "AI Impact Bullet Writer",
      desc: "Instantly transform simple task lists into high-impact, data-backed bullet points tailored for target job postings."
    },
    {
      num: "03",
      title: "Categorized Skill Matrix",
      desc: "Automatically group your tech stack into Languages, Frameworks, Cloud Infrastructure, and Databases for instant readability."
    },
    {
      num: "04",
      title: "Single-Click Vector Export",
      desc: "Download crisp, high-resolution vector PDF files ready for high-stakes corporate job applications."
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AuraHeader />

      <main style={{ flex: 1 }}>
        {/* CENTER-STAGE HERO BANNER */}
        <section style={{ padding: '4.5rem 0 3.5rem', textAlign: 'center' }}>
          <div className="aura-container">
            <div style={{ maxWidth: '820px', margin: '0 auto 3.5rem' }}>
              <div className="aura-badge" style={{ marginBottom: '1.25rem' }}>
                <Sparkles size={15} />
                <span>NEXT-GEN CAREER INTELLIGENCE • 100% FREE</span>
              </div>

              <h1 style={{
                fontSize: '3.75rem',
                lineHeight: 1.08,
                letterSpacing: '-0.04em',
                marginBottom: '1.25rem',
                color: 'var(--text-main)'
              }}>
                Build an executive resume that <span style={{ color: 'var(--primary)' }}>lands top offers</span>.
              </h1>

              <p style={{
                fontSize: '1.2rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '2.25rem',
                maxWidth: '640px',
                margin: '0 auto 2.25rem'
              }}>
                Engineered with real-time AI scoring, 16+ executive templates, skill auto-categorization, and single-click high-resolution PDF export.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate('/builder')}
                  className="aura-btn-primary"
                  style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}
                >
                  <span>Launch Free Builder</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => navigate('/templates')}
                  className="aura-btn-secondary"
                  style={{ padding: '0.9rem 1.8rem', fontSize: '1.05rem' }}
                >
                  <Layout size={18} />
                  <span>Explore Templates</span>
                </button>
              </div>
            </div>

            {/* Center Stage Playground */}
            <CenterHeroPlayground />

            {/* Key Proof Metrics Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3.5rem',
              marginTop: '4rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--border-color)',
              flexWrap: 'wrap'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-main)' }}>99.4%</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>ATS Screening Rating</div>
              </div>
              <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--border-color)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-main)' }}>16+</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Executive Layouts</div>
              </div>
              <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--border-color)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-main)' }}>Instant</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Vector PDF Export</div>
              </div>
            </div>
          </div>
        </section>

        {/* LUXURY FEATURE PILLARS */}
        <section style={{ padding: '5rem 0', backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-color)' }}>
          <div className="aura-container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
              <div className="aura-badge" style={{ marginBottom: '0.85rem' }}>
                <Zap size={15} />
                <span>Core Engineering</span>
              </div>
              <h2 style={{ fontSize: '2.4rem', marginBottom: '0.85rem' }}>
                Why top engineers & executives choose us
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
                Every feature engineered for maximum impact during recruiter evaluation.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem'
            }}>
              {featurePillars.map((pillar, idx) => (
                <div key={idx} className="aura-card" style={{ backgroundColor: '#FAF9F6', border: '1px solid var(--border-color)' }}>
                  <div style={{
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    color: 'var(--primary)',
                    marginBottom: '1rem',
                    fontFamily: 'monospace'
                  }}>
                    {pillar.num}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>{pillar.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEMPLATE GALLERY SHOWCASE */}
        <section style={{ padding: '5rem 0' }}>
          <div className="aura-container">
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div className="aura-badge" style={{ marginBottom: '0.5rem' }}>
                  <Layout size={15} />
                  <span>Executive Gallery</span>
                </div>
                <h2 style={{ fontSize: '2.25rem' }}>Tested Resume Templates</h2>
              </div>

              <button
                onClick={() => navigate('/templates')}
                className="aura-btn-subtle"
              >
                <span>View All Templates</span>
                <ChevronRight size={16} />
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '2rem'
            }}>
              {templates.slice(0, 4).map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="aura-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onClick={() => navigate('/builder')}
                >
                  <div style={{
                    height: '250px',
                    borderRadius: '12px',
                    backgroundColor: '#F1F5F9',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden',
                    marginBottom: '1.15rem',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '8px'
                  }}>
                    <div style={{
                      transform: 'scale(0.33)',
                      transformOrigin: 'top center',
                      width: '794px',
                      height: '1123px',
                      pointerEvents: 'none'
                    }}>
                      <TemplateRenderer templateId={tmpl.id} data={mockResumeData} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{tmpl.name}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {tmpl.tags?.join(' • ')}
                      </span>
                    </div>

                    <button
                      className="aura-btn-subtle"
                      style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                    >
                      Use
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{
        backgroundColor: '#FFFFFF',
        padding: '2.5rem 0',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.9rem',
        color: 'var(--text-muted)'
      }}>
        <div className="aura-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
            <FileText size={18} color="var(--primary)" />
            <span>NEXUS AI Studio</span>
          </div>

          <div>
            © {new Date().getFullYear()} NEXUS Career Intelligence. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
