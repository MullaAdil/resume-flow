import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { templates } from './templatesList';
import TemplateRenderer from './TemplateRenderer';
import { mockResumeData } from '../utils/mockResumeData';
import AuraHeader from './AuraHeader';
import { 
  ArrowRight, Sparkles, CheckCircle, Zap, FileText, ChevronRight, 
  Layout, Upload, Clock, Edit3, Trash2, ShieldCheck, Award, Eye, Download, Layers 
} from 'lucide-react';

// ── Interactive 3D Holographic Hero Playground ──
const HeroPlayground = () => {
  const [selectedId, setSelectedId] = useState('multicolor');
  const showcaseOptions = [
    { id: 'multicolor', label: 'Multi Color' },
    { id: 'visionary', label: 'Visionary' },
    { id: 'minimalclassic', label: 'Minimal Classic' },
    { id: 'aslam', label: 'Elite IT' }
  ];

  return (
    <div style={{
      width: '100%',
      maxWidth: '470px',
      backgroundColor: '#FFFFFF',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Top Controls Bar */}
      <div style={{
        padding: '0.85rem 1.15rem',
        backgroundColor: '#F8FAFC',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
          <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
          <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#10B981' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginLeft: '0.35rem' }}>
            Live Studio Sandbox
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {showcaseOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedId(opt.id)}
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: '9999px',
                border: '1px solid',
                borderColor: selectedId === opt.id ? 'var(--primary-border)' : 'transparent',
                backgroundColor: selectedId === opt.id ? 'var(--primary-light)' : 'transparent',
                color: selectedId === opt.id ? 'var(--primary)' : 'var(--text-muted)',
                fontSize: '0.75rem',
                fontWeight: selectedId === opt.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rendered Template View */}
      <div style={{
        height: '520px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#F1F5F9',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '14px'
      }}>
        <div style={{
          transform: 'scale(0.53)',
          transformOrigin: 'top center',
          width: '794px',
          height: '1123px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.08)'
        }}>
          <TemplateRenderer templateId={selectedId} data={mockResumeData} />
        </div>
      </div>

      {/* Status Bar */}
      <div style={{
        padding: '0.75rem 1.15rem',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.825rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 700 }}>
          <CheckCircle size={15} />
          <span>ATS Score: 99.4%</span>
        </div>
        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
          High-Res Vector Output
        </div>
      </div>
    </div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();

  const featureCards = [
    {
      icon: <CheckCircle size={22} color="var(--primary)" />,
      title: "Enterprise ATS Parser Fit",
      desc: "Architected using exact single-column & multi-column structural standards so your resume passes corporate recruitment screening."
    },
    {
      icon: <Sparkles size={22} color="var(--primary)" />,
      title: "AI Bullet Enhancer",
      desc: "Transform simple task lists into data-backed achievement statements with our intelligent copilot."
    },
    {
      icon: <Layers size={22} color="var(--primary)" />,
      title: "3D Interactive Paper View",
      desc: "Inspect your resume in realistic 3D paper flip format before exporting high-resolution print PDF files."
    },
    {
      icon: <Award size={22} color="var(--primary)" />,
      title: "Categorized Skill Matrix",
      desc: "Automatically separate tech stacks into Languages, Frameworks, Databases, and Infrastructure tools."
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AuraHeader />

      <main style={{ flex: 1 }}>
        {/* HERO SECTION */}
        <section style={{
          padding: '4rem 0 3.5rem'
        }}>
          <div className="aura-container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 470px',
              gap: '3.5rem',
              alignItems: 'center'
            }}>
              {/* Left Column */}
              <div>
                <div className="aura-badge" style={{ marginBottom: '1.5rem' }}>
                  <Sparkles size={15} />
                  <span>Next-Generation Career Intelligence Engine</span>
                </div>

                <h1 style={{
                  fontSize: '3.3rem',
                  lineHeight: 1.1,
                  letterSpacing: '-0.04em',
                  marginBottom: '1.35rem',
                  color: 'var(--text-main)'
                }}>
                  Craft an ATS-grade resume that <span style={{ color: 'var(--primary)' }}>commands attention</span>.
                </h1>

                <p style={{
                  fontSize: '1.15rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '2.25rem',
                  maxWidth: '560px'
                }}>
                  High-precision resume builder with AI scoring, real-time live preview, 3D paper flip view, and single-click high-resolution PDF export.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigate('/builder')}
                    className="aura-btn-primary"
                    style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
                  >
                    <span>Start Building Free</span>
                    <ArrowRight size={18} />
                  </button>

                  <button
                    onClick={() => navigate('/templates')}
                    className="aura-btn-secondary"
                    style={{ padding: '0.85rem 1.6rem', fontSize: '1rem' }}
                  >
                    <Layout size={18} />
                    <span>Explore Templates</span>
                  </button>
                </div>

                {/* Metrics Ticker */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2.5rem',
                  marginTop: '3.5rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <div>
                    <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-main)' }}>99.4%</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>ATS Benchmark Rating</div>
                  </div>
                  <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--border-color)' }} />
                  <div>
                    <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-main)' }}>16+</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>Executive Templates</div>
                  </div>
                  <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--border-color)' }} />
                  <div>
                    <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-main)' }}>Instant</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>Vector PDF Exporter</div>
                  </div>
                </div>
              </div>

              {/* Right Column Interactive Playground */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <HeroPlayground />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE MATRIX SECTION */}
        <section style={{ padding: '4.5rem 0' }}>
          <div className="aura-container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
              <div className="aura-badge" style={{ marginBottom: '0.85rem' }}>
                <Zap size={15} />
                <span>Precision Engineering</span>
              </div>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '0.85rem' }}>
                Built to elevate your career presentation
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
                Every feature engineered for maximum impact during corporate recruitment screening.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.75rem'
            }}>
              {featureCards.map((feat, idx) => (
                <div key={idx} className="aura-card" style={{ backgroundColor: '#FFFFFF' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--primary-light)',
                    border: '1px solid var(--primary-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.35rem'
                  }}>
                    {feat.icon}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.55rem' }}>{feat.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEMPLATES SHOWCASE SECTION */}
        <section style={{
          padding: '4.5rem 0',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div className="aura-container">
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div className="aura-badge" style={{ marginBottom: '0.5rem' }}>
                  <Layout size={15} />
                  <span>Curated Layouts</span>
                </div>
                <h2 style={{ fontSize: '2.1rem' }}>Executive Resume Templates</h2>
              </div>

              <button
                onClick={() => navigate('/templates')}
                className="aura-btn-subtle"
              >
                <span>Explore All Templates</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Template Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '1.75rem'
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
                    height: '240px',
                    borderRadius: '10px',
                    backgroundColor: '#F1F5F9',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden',
                    marginBottom: '1rem',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '8px'
                  }}>
                    <div style={{
                      transform: 'scale(0.32)',
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
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
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
