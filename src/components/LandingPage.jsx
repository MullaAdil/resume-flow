import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { templates } from './templatesList';
import TemplateRenderer from './TemplateRenderer';
import FlipBook from './FlipBook';
import { mockResumeData, templateMockData } from '../utils/mockResumeData';
import AuraHeader from './AuraHeader';
import { 
  ArrowRight, Sparkles, CheckCircle, Zap, FileText, ChevronRight, 
  Layout, Upload, Clock, Edit3, Trash2, ShieldCheck, Award, Eye, Download, Layers 
} from 'lucide-react';

// ── Crisp Interactive Hero Template Playground ──
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
      maxWidth: '460px',
      backgroundColor: '#FFFFFF',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Playground Header Bar */}
      <div style={{
        padding: '0.75rem 1rem',
        backgroundColor: '#F8FAFC',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
          <span style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '0.25rem' }}>
            Live Preview Studio
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.25rem' }}>
          {showcaseOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedId(opt.id)}
              style={{
                padding: '0.25rem 0.55rem',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: selectedId === opt.id ? 'var(--primary-border)' : 'transparent',
                backgroundColor: selectedId === opt.id ? 'var(--primary-light)' : 'transparent',
                color: selectedId === opt.id ? 'var(--primary)' : 'var(--text-muted)',
                fontSize: '0.725rem',
                fontWeight: selectedId === opt.id ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rendered Resume Page Preview Container */}
      <div style={{
        height: '520px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#F1F5F9',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '12px'
      }}>
        <div style={{
          transform: 'scale(0.52)',
          transformOrigin: 'top center',
          width: '794px',
          height: '1123px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
        }}>
          <TemplateRenderer templateId={selectedId} data={mockResumeData} />
        </div>
      </div>

      {/* Footer Badge Bar */}
      <div style={{
        padding: '0.65rem 1rem',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 600 }}>
          <CheckCircle size={14} />
          <span>ATS Compliance: 99.4%</span>
        </div>
        <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>
          A4 Standard • 1-Page Format
        </div>
      </div>
    </div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('All templates');

  const featureCards = [
    {
      icon: <CheckCircle size={22} color="var(--primary)" />,
      title: "100% ATS Parser Compliant",
      desc: "Designed using exact ATS structural standards so your resume gets read by enterprise recruitment algorithms."
    },
    {
      icon: <Sparkles size={22} color="var(--primary)" />,
      title: "AI Bullet Enhancer",
      desc: "Transform plain job duties into high-impact metric statements with our built-in intelligent copilot."
    },
    {
      icon: <Layers size={22} color="var(--primary)" />,
      title: "3D Interactive FlipBook",
      desc: "Review your resume in realistic 3D paper flip mode before downloading high-resolution print PDF."
    },
    {
      icon: <Award size={22} color="var(--primary)" />,
      title: "Tailored Skill Matrices",
      desc: "Auto-organize your tech stack into categorized skills (Languages, Frameworks, Databases, Tools)."
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Parent Header */}
      <AuraHeader />

      <main style={{ flex: 1 }}>
        {/* HERO SECTION */}
        <section style={{
          padding: '4.5rem 0 3.5rem',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div className="aura-container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 460px',
              gap: '3.5rem',
              alignItems: 'center'
            }}>
              {/* Left Hero Copy */}
              <div>
                <div className="aura-badge" style={{ marginBottom: '1.25rem' }}>
                  <Sparkles size={14} />
                  <span>Next-Generation Career Studio</span>
                </div>

                <h1 style={{
                  fontSize: '3.2rem',
                  lineHeight: 1.12,
                  letterSpacing: '-0.035em',
                  marginBottom: '1.25rem',
                  color: 'var(--text-main)'
                }}>
                  Build ATS-grade resumes that get you <span style={{ color: 'var(--primary)' }}>hired faster</span>.
                </h1>

                <p style={{
                  fontSize: '1.125rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '2rem',
                  maxWidth: '560px'
                }}>
                  High-precision resume builder with AI scoring, real-time live preview, 3D paper flip view, and instant high-resolution PDF export.
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
                    onClick={() => navigate('/signup')}
                    className="aura-btn-subtle"
                    style={{ padding: '0.85rem 1.6rem', fontSize: '1rem' }}
                  >
                    <Sparkles size={18} />
                    <span>Create Free Account</span>
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

                {/* Proof Metrics Bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2.5rem',
                  marginTop: '3rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>99.4%</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 500 }}>ATS Pass Rate</div>
                  </div>
                  <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--border-color)' }} />
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>16+</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 500 }}>Executive Templates</div>
                  </div>
                  <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--border-color)' }} />
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>Instant</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 500 }}>Vector PDF Export</div>
                  </div>
                </div>
              </div>

              {/* Right Hero Live Playground */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <HeroPlayground />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE MATRIX SECTION */}
        <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--bg-color)' }}>
          <div className="aura-container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
              <div className="aura-badge" style={{ marginBottom: '0.75rem' }}>
                <Zap size={14} />
                <span>Precision Engineering</span>
              </div>
              <h2 style={{ fontSize: '2.1rem', marginBottom: '0.75rem' }}>
                Everything you need to craft a standout application
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                Built from the ground up for modern software engineers, tech leads, executives, and creative professionals.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              {featureCards.map((feat, idx) => (
                <div key={idx} className="aura-card" style={{ backgroundColor: '#FFFFFF' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--primary-light)',
                    border: '1px solid var(--primary-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem'
                  }}>
                    {feat.icon}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{feat.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.55 }}>{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEMPLATE GALLERY SECTION */}
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
                  <Layout size={14} />
                  <span>Curated Layouts</span>
                </div>
                <h2 style={{ fontSize: '2rem' }}>Professional Resume Templates</h2>
              </div>

              <button
                onClick={() => navigate('/templates')}
                className="aura-btn-subtle"
              >
                <span>View All Templates</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Template Grid Preview */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
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
                  {/* Thumbnail Preview box */}
                  <div style={{
                    height: '240px',
                    borderRadius: '8px',
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
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{tmpl.name}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {tmpl.tags?.join(' • ')}
                      </span>
                    </div>

                    <button
                      className="aura-btn-subtle"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                    >
                      Use Template
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
            <FileText size={18} color="var(--primary)" />
            <span>AURA Resume Studio</span>
          </div>

          <div>
            © {new Date().getFullYear()} AURA Career Intelligence. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
