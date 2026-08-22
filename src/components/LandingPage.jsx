import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { templates } from './templatesList';
import TemplateRenderer from './TemplateRenderer';
import { mockResumeData, templateMockData } from '../utils/mockResumeData';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import AuraHeader from './AuraHeader';
import { apiClient } from '../utils/apiClient';
import { 
  ArrowRight, CheckCircle, Zap, FileText, ChevronRight, 
  Layout, Download, Award, Layers, Heart, Edit3, RotateCcw,
  Clock, History, Sparkles
} from 'lucide-react';

const HeroSandbox = () => {
  const { resumeData, selectedTemplate, setSelectedTemplate } = useResume();
  const [selectedId, setSelectedId] = useState(selectedTemplate || 'multicolor');

  useEffect(() => {
    if (selectedTemplate) {
      setSelectedId(selectedTemplate);
    }
  }, [selectedTemplate]);

  const hasSavedDraft = Boolean(
    resumeData?.personalInfo?.fullName ||
    resumeData?.personalInfo?.email ||
    (resumeData?.experience && resumeData.experience.length > 0) ||
    (resumeData?.projects && resumeData.projects.length > 0) ||
    (resumeData?.skills && (Array.isArray(resumeData.skills) ? resumeData.skills.length > 0 : Object.values(resumeData.skills).flat().filter(Boolean).length > 0))
  );

  const activeTplName = templates.find(t => t.id === selectedId)?.name || selectedId;
  const showcaseOptions = [
    { id: 'multicolor', label: 'Multi Color' },
    { id: 'visionary', label: 'Visionary' },
    { id: 'minimalclassic', label: 'Classic' },
    { id: 'aslam', label: 'Elite IT' }
  ];
  if (selectedId && !showcaseOptions.some(opt => opt.id === selectedId)) {
    showcaseOptions.push({ id: selectedId, label: activeTplName });
  }

  const handleSelect = (id) => {
    setSelectedId(id);
    if (setSelectedTemplate) setSelectedTemplate(id);
  };

  const previewDataToRender = hasSavedDraft
    ? resumeData
    : (templateMockData[selectedId] || mockResumeData);

  return (
    <div style={{
      width: '100%',
      maxWidth: '460px',
      backgroundColor: '#FFFFFF',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden'
    }}>
      {/* Sandbox Header */}
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
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginLeft: '0.35rem' }}>
            Live Preview
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {showcaseOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
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
        height: '540px',
        overflowY: 'auto',
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
          height: 'auto',
          minHeight: '1123px',
          marginBottom: '20px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.08)'
        }}>
          <TemplateRenderer templateId={selectedId} resumeData={previewDataToRender} />
        </div>
      </div>

      {/* Footer Rating */}
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
          <span>ATS Pass Rating: 99.4%</span>
        </div>
        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
          Vector PDF
        </div>
      </div>
    </div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { resumeData, resetResume, selectedTemplate, setSelectedTemplate } = useResume();
  const { user } = useAuth();

  const hasSavedDraft = Boolean(
    resumeData?.personalInfo?.fullName ||
    resumeData?.personalInfo?.email ||
    (resumeData?.experience && resumeData.experience.length > 0) ||
    (resumeData?.projects && resumeData.projects.length > 0) ||
    (resumeData?.skills && (Array.isArray(resumeData.skills) ? resumeData.skills.length > 0 : Object.values(resumeData.skills).flat().filter(Boolean).length > 0))
  );

  const [activities, setActivities] = useState([]);
  const recentDownloadStored = (() => {
    try {
      return JSON.parse(localStorage.getItem('lumen_recent_download') || 'null');
    } catch {
      return null;
    }
  })();

  const [savedResumeName, setSavedResumeName] = useState(() => {
    return recentDownloadStored?.resumeName || localStorage.getItem('lumen_last_pdf_title') || '';
  });

  React.useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await apiClient.activity.list(user?.email || '');
        if (Array.isArray(data)) {
          setActivities(data);
        }
      } catch (e) {
        console.warn('Could not load activity log:', e);
      }
    };
    fetchActivities();
  }, [user?.email]);

  React.useEffect(() => {
    const fetchLatestResumeName = async () => {
      if (!user?.email) return;
      try {
        const list = await apiClient.resumes.list(user.email);
        if (Array.isArray(list) && list.length > 0) {
          // Sort by most recent and grab the name
          const latest = list.sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))[0];
          if (latest?.name) {
            setSavedResumeName(latest.name);
            localStorage.setItem('lumen_last_pdf_title', latest.name);
          }
        }
      } catch (e) {
        console.warn('Could not fetch resume list:', e);
      }
    };
    fetchLatestResumeName();
  }, [user?.email]);

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('template_wishlist') || '[]');
    } catch {
      return [];
    }
  });

  const handleToggleWishlist = (id) => {
    setWishlist((prev) => {
      let next;
      if (prev.includes(id)) {
        next = prev.filter((item) => item !== id);
      } else {
        next = [...prev, id];
      }
      localStorage.setItem('template_wishlist', JSON.stringify(next));
      return next;
    });
  };

  const features = [
    {
      icon: <CheckCircle size={22} color="var(--primary)" />,
      title: "ATS Parser Verified",
      desc: "Single-column & multi-column layouts structured to pass corporate ATS screeners with ease."
    },
    {
      icon: <Zap size={22} color="var(--primary)" />,
      title: "Achievement Bullet Enhancer",
      desc: "Transform basic task summaries into high-impact, data-driven achievement statements."
    },
    {
      icon: <Layers size={22} color="var(--primary)" />,
      title: "Interactive Live Preview",
      desc: "Real-time side-by-side editing with instant live paper re-rendering as you type."
    },
    {
      icon: <Award size={22} color="var(--primary)" />,
      title: "Categorized Tech Skills",
      desc: "Auto-group technical stack into Languages, Frameworks, Cloud, and Database categories."
    }
  ];

  const [heroPrompt, setHeroPrompt] = useState('');
  const [activeBentoTab, setActiveBentoTab] = useState('after');
  const [bentoSalaryImpact, setBentoSalaryImpact] = useState(38);

  const promptSuggestions = [
    "Senior Full Stack React & Node Engineer with 5+ yrs experience",
    "Staff Product Manager scaling B2B SaaS platform from $2M to $15M ARR",
    "AI/ML Engineer specializing in PyTorch, LLMs & Vector Search",
    "VP of Engineering managing 40+ distributed developers",
    "Cloud Solutions Architect with AWS, Kubernetes & Terraform"
  ];

  const handleHeroPromptSubmit = (e) => {
    e?.preventDefault();
    const query = heroPrompt.trim() || promptSuggestions[0];
    navigate(`/services/text-to-resume?prompt=${encodeURIComponent(query)}`);
  };

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AuraHeader />

      <main style={{ flex: 1 }}>
        {/* FRAMER AI HERO SECTION */}
        <section style={{ padding: '4.5rem 0 3.5rem', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle Radial Light Mesh */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '1000px',
            height: '500px',
            background: 'radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.15) 0%, rgba(236, 72, 153, 0.05) 45%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0
          }} />

          <div className="aura-container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
              
              {/* Framer-style Top Pill Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--primary-border)',
                color: 'var(--primary)',
                fontSize: '0.825rem',
                fontWeight: 800,
                marginBottom: '1.5rem',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.12)'
              }}>
                <Sparkles size={14} />
                <span>Next-Gen Framer AI Resume Architecture</span>
              </div>

              <h1 style={{
                fontSize: '3.8rem',
                lineHeight: 1.08,
                letterSpacing: '-0.04em',
                marginBottom: '1.25rem',
                color: 'var(--text-main)',
                fontWeight: 900
              }}>
                Design high-salary resumes with <span style={{
                  background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 50%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>intelligent AI tools</span>.
              </h1>

              <p style={{
                fontSize: '1.25rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '2.5rem',
                maxWidth: '680px',
                margin: '0 auto 2.5rem auto'
              }}>
                Paste notes, generate editable executive templates, optimize XYZ action bullets, and export pixel-perfect vector PDFs.
              </p>

              {/* FRAMER GLOWING AI PROMPT GENERATOR BAR */}
              <form 
                onSubmit={handleHeroPromptSubmit}
                style={{
                  maxWidth: '720px',
                  margin: '0 auto 1.5rem auto',
                  position: 'relative'
                }}
              >
                <div style={{
                  padding: '2px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(90deg, #6366F1, #EC4899, #8B5CF6, #6366F1)',
                  backgroundSize: '300% 100%',
                  animation: 'framerGlowGradient 6s linear infinite',
                  boxShadow: '0 12px 36px -10px rgba(99, 102, 241, 0.35)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '9999px',
                    padding: '0.45rem 0.55rem 0.45rem 1.4rem',
                    gap: '0.75rem'
                  }}>
                    <Sparkles size={20} color="#6366F1" style={{ flexShrink: 0 }} />
                    <input
                      type="text"
                      value={heroPrompt}
                      onChange={(e) => setHeroPrompt(e.target.value)}
                      placeholder="e.g. Senior React Engineer with 5 yrs exp, led cloud migration & improved latency 40%..."
                      style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        fontSize: '1rem',
                        color: 'var(--text-main)',
                        fontWeight: 600,
                        backgroundColor: 'transparent'
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '9999px',
                        padding: '0.8rem 1.5rem',
                        fontSize: '0.925rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        flexShrink: 0,
                        boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <span>Generate Resume</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </form>

              {/* Framer Quick Suggestion Chips */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '3rem'
              }}>
                <span style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  Try prompt:
                </span>
                {promptSuggestions.map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setHeroPrompt(sug);
                      navigate(`/services/text-to-resume?prompt=${encodeURIComponent(sug)}`);
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '9999px',
                      padding: '0.3rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.backgroundColor = 'var(--primary-light)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-main)'; e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; }}
                  >
                    {sug.split(' ')[0]} {sug.split(' ')[1]} {sug.split(' ')[2]} →
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate('/choose')}
                  className="aura-btn-primary"
                  style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}
                >
                  <span>Build From Scratch</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => navigate('/services')}
                  className="aura-btn-secondary"
                  style={{ padding: '0.9rem 1.8rem', fontSize: '1.05rem' }}
                >
                  <Layers size={18} />
                  <span>All 8 AI Engines</span>
                </button>
              </div>

              {/* Metrics Ticker */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2.5rem',
                marginTop: '3.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--border-color)'
              }}>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>99.4%</div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>ATS Screening Pass Rate</div>
                </div>
                <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--border-color)' }} />
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>24</div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>Executive Architectural Formats</div>
                </div>
                <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--border-color)' }} />
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>&lt; 2s</div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>AI Text-to-Template Speed</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FRAMER MODULAR BENTO GRID SECTION */}
        <section style={{ padding: '4.5rem 0 5rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'rgba(248, 250, 252, 0.6)' }}>
          <div className="aura-container">
            
            {/* Bento Section Header */}
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
              <div className="aura-badge" style={{ marginBottom: '0.75rem' }}>
                <Sparkles size={14} />
                <span>Quantum Career Architecture</span>
              </div>
              <h2 style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.035em', margin: '0 0 0.75rem 0' }}>
                Engineered for maximum interview conversion.
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
                Every module is built with quantified formulas, algorithmic ATS auditing, and live canvas editing.
              </p>
            </div>

            {/* Asymmetric Bento Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '1.75rem'
            }}>
              
              {/* Bento Card 1: Large 7-Col Interactive AI Bullet Transformer */}
              <div style={{
                gridColumn: 'span 7',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1.5px solid var(--border-color)',
                padding: '2.25rem',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      ⚡ Google XYZ Formula Engine
                    </span>
                    {/* Interactive Tab Switcher */}
                    <div style={{ display: 'flex', backgroundColor: '#F1F5F9', padding: '3px', borderRadius: '8px', gap: '3px' }}>
                      <button
                        type="button"
                        onClick={() => setActiveBentoTab('before')}
                        style={{
                          border: 'none',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          backgroundColor: activeBentoTab === 'before' ? '#FFFFFF' : 'transparent',
                          color: activeBentoTab === 'before' ? '#1E293B' : '#64748B',
                          boxShadow: activeBentoTab === 'before' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none'
                        }}
                      >
                        Standard Duty
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveBentoTab('after')}
                        style={{
                          border: 'none',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          backgroundColor: activeBentoTab === 'after' ? 'var(--primary)' : 'transparent',
                          color: activeBentoTab === 'after' ? '#FFFFFF' : '#64748B',
                          boxShadow: activeBentoTab === 'after' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none'
                        }}
                      >
                        ✨ AI XYZ Bullet
                      </button>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.6rem 0', letterSpacing: '-0.02em' }}>
                    Turn routine tasks into high-salary impact statements.
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.5, margin: '0 0 1.5rem 0' }}>
                    Accomplished [X], measured by [Y], by doing [Z]. AI re-engineers passive job descriptions into quantified recruiter magnet bullets.
                  </p>

                  {/* Interactive Live Card Preview */}
                  <div style={{
                    padding: '1.25rem',
                    borderRadius: '14px',
                    backgroundColor: activeBentoTab === 'after' ? '#EEF2FF' : '#F8FAFC',
                    border: `1.5px solid ${activeBentoTab === 'after' ? '#C7D2FE' : '#E2E8F0'}`,
                    transition: 'all 0.2s ease'
                  }}>
                    {activeBentoTab === 'after' ? (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4338CA', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                          <CheckCircle size={14} color="#4F46E5" /> AI Enhanced with +38.5% Salary Metric
                        </div>
                        <div style={{ fontSize: '0.95rem', color: '#1E1B4B', fontWeight: 600, lineHeight: 1.5 }}>
                          "Architected distributed React & Node microservices, reducing end-to-end API latency by 42% and supporting 1.2M daily active transactions across 3 cloud regions."
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ color: '#64748B', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                          Standard Passive Task:
                        </div>
                        <div style={{ fontSize: '0.925rem', color: '#475569', lineHeight: 1.5 }}>
                          "Responsible for developing backend APIs and helping maintain web frontend applications for company users."
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Integrated in Resume Studio & AI Text Architect
                  </span>
                  <button
                    onClick={() => navigate('/services/bullet-enhancer')}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 800, fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    Open Studio <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Bento Card 2: 5-Col ATS 99.4% Screener Auditor */}
              <div style={{
                gridColumn: 'span 5',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1.5px solid var(--border-color)',
                padding: '2.25rem',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      🟢 Live Screener Simulation
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '999px', backgroundColor: '#ECFDF5', color: '#059669' }}>
                      Workday & Lever
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.5rem 0' }}>
                    ATS Screening Auditor
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.5, margin: '0 0 1.25rem 0' }}>
                    Real-time verification against corporate parser algorithms with zero keyword stuffing.
                  </p>

                  {/* Meter Display */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'conic-gradient(#10B981 0% 99.4%, #E2E8F0 99.4% 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem', color: '#065F46' }}>
                        99%
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>ATS Grade: AAA+</div>
                      <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Parsed contact, experience hierarchy & skills cleanly.</div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>0 Parsing Traps Found</span>
                  <button
                    onClick={() => navigate('/services/ats-scanner')}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 800, fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    Run ATS Audit <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Bento Card 3: 4-Col Developer Portfolio Website */}
              <div style={{
                gridColumn: 'span 4',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1.5px solid var(--border-color)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{ height: '140px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src="/images/services/service_portfolio_builder.jpg"
                    alt="Portfolio Builder"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 60%)' }} />
                  <span style={{ position: 'absolute', bottom: '10px', left: '12px', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(15,23,42,0.85)', color: '#FFFFFF' }}>
                    1-Click Web
                  </span>
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.4rem 0' }}>Hosted Portfolio Web</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 0.85rem 0' }}>
                      Turn your resume into a live personal developer portfolio indexed on Google.
                    </p>
                    <div style={{ padding: '0.5rem 0.75rem', backgroundColor: '#F1F5F9', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                      alex.developer.dev
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/services/website-builder')}
                    className="framer-btn-shimmer"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '1.25rem', fontSize: '0.825rem' }}
                  >
                    <span>Create Portfolio Web</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Bento Card 4: 4-Col Physical Multi-Paper Stacking */}
              <div style={{
                gridColumn: 'span 4',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1.5px solid var(--border-color)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{ height: '140px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src="/images/services/service_career_map.jpg"
                    alt="Career Roadmaps"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 60%)' }} />
                  <span style={{ position: 'absolute', bottom: '10px', left: '12px', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(15,23,42,0.85)', color: '#FFFFFF' }}>
                    24 Formats
                  </span>
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.4rem 0' }}>24 Executive Formats</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 0.85rem 0' }}>
                      Architectural multi-paper layouts designed for tech, finance, leadership, and startups.
                    </p>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {['Tech Lead', 'Stanford', 'Executive'].map((t, idx) => (
                        <span key={idx} style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '6px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', color: '#475569', fontWeight: 600 }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/templates')}
                    className="framer-btn-shimmer"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '1.25rem', fontSize: '0.825rem' }}
                  >
                    <span>Browse 24 Templates</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Bento Card 5: 4-Col AI Text & Notes Importer */}
              <div style={{
                gridColumn: 'span 4',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1.5px solid var(--border-color)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{ height: '140px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src="/images/services/service_text_architect.jpg"
                    alt="AI Text Importer"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 60%)' }} />
                  <span style={{ position: 'absolute', bottom: '10px', left: '12px', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(15,23,42,0.85)', color: '#FFFFFF' }}>
                    120B AI Model
                  </span>
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.4rem 0' }}>AI Text & Bio Parser</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 0.85rem 0' }}>
                      Paste raw career notes or job dump. 120B AI parses headings and auto-fills your template.
                    </p>
                    <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--primary)' }}>
                      ✨ Auto-detects custom headings & dates
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/services/text-to-resume')}
                    className="framer-btn-shimmer"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '1.25rem', fontSize: '0.825rem' }}
                  >
                    <span>Launch Text Importer</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* LARGE EXPANDED SAVED ASSETS & ACTIVITY VAULT DASHBOARD SECTION */}
        {(hasSavedDraft || user) && (
          <section style={{ padding: '4.5rem 0', backgroundColor: 'transparent', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
            <div className="aura-container">
              
              {/* Section Header */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.03em' }}>
                  LED — Career Assets & Activity
                </h2>
              </div>

              {/* Single Unified Multi-Paper Stacked Card */}
              <div style={{ position: 'relative', width: '100%' }}>
                {/* Paper Sheet 3: Cool Slate */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '24px',
                  background: '#F1F5F9',
                  border: '1px solid #CBD5E1',
                  transform: 'translate(10px, 11px) rotate(1.2deg)',
                  zIndex: 0,
                  boxShadow: '0 4px 14px rgba(15,23,42,0.03)'
                }} />

                {/* Paper Sheet 2: Soft Warm Linen */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '24px',
                  background: 'var(--primary-light, #FAF9F5)',
                  border: '1.5px solid var(--primary-border, #E7E5E0)',
                  transform: 'translate(5px, 6px) rotate(0.6deg)',
                  zIndex: 1,
                  boxShadow: '0 4px 14px rgba(15,23,42,0.04)'
                }} />

                {/* Main Single Card Content */}
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1.5px solid var(--primary-border)',
                  padding: '2.5rem',
                  boxShadow: 'var(--shadow-md)',
                  overflow: 'hidden'
                }}>
                  {/* Background Glow */}
                  <div style={{
                    position: 'absolute',
                    top: '-60px',
                    right: '-60px',
                    width: '240px',
                    height: '240px',
                    borderRadius: '50%',
                    background: 'var(--primary-glow)',
                    filter: 'blur(50px)',
                    pointerEvents: 'none'
                  }} />

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem',
                    alignItems: 'center'
                  }}>
                    {/* Left: Active Draft Info & Mini Preview */}
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                      {/* Mini Live Preview Thumbnail (Clickable to open builder) */}
                      <div 
                        onClick={() => {
                          const targetTpl = recentDownloadStored?.templateId || selectedTemplate;
                          if (targetTpl) setSelectedTemplate(targetTpl);
                          navigate('/builder');
                        }}
                        style={{
                          width: '140px',
                          height: '195px',
                          borderRadius: '14px',
                          backgroundColor: '#FFFFFF',
                          border: '1.5px solid var(--primary-border)',
                          overflow: 'hidden',
                          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
                          position: 'relative',
                          flexShrink: 0,
                          cursor: 'pointer',
                          transition: 'transform 0.15s, box-shadow 0.15s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 12px 28px rgba(15, 23, 42, 0.14)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(15, 23, 42, 0.08)';
                        }}
                        title="Click to open resume in Builder Studio"
                      >
                        <div style={{
                          transform: 'scale(' + (140 / 794) + ')',
                          transformOrigin: 'top left',
                          width: '794px',
                          height: '1123px',
                          pointerEvents: 'none'
                        }}>
                          <TemplateRenderer templateId={recentDownloadStored?.templateId || selectedTemplate || 'multicolor'} resumeData={resumeData} />
                        </div>
                      </div>

                      {/* Resume Details & Metadata */}
                      <div style={{ flex: 1, minWidth: '180px' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.35rem' }}>
                          {user?.email || 'Active Local Resume'}
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.35rem 0', letterSpacing: '-0.02em' }}>
                          {savedResumeName || (resumeData?.personalInfo?.fullName ? `${resumeData.personalInfo.fullName}'s Resume` : 'Active Resume')}
                        </h3>
                        {resumeData?.personalInfo?.jobTitle && (
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', margin: 0, fontWeight: 600 }}>
                            {resumeData.personalInfo.jobTitle}
                          </p>
                        )}

                        {/* PDF Title / Save tag */}
                        {savedResumeName && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            marginTop: '0.75rem',
                            paddingLeft: '0.6rem',
                            borderLeft: '2.5px solid var(--primary)',
                          }}>
                            <FileText size={13} color="var(--primary)" style={{ flexShrink: 0 }} />
                            <span style={{
                              fontSize: '0.825rem',
                              fontWeight: 600,
                              color: 'var(--text-main)',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: '220px',
                            }}>
                              {savedResumeName}
                            </span>
                          </div>
                        )}

                        {/* CTAs */}
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                          <button
                            onClick={() => {
                              const targetTpl = recentDownloadStored?.templateId || selectedTemplate;
                              if (targetTpl) setSelectedTemplate(targetTpl);
                              navigate('/builder');
                            }}
                            className="aura-btn-primary"
                            style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem' }}
                          >
                            <Edit3 size={16} />
                            <span>Rebuild & Edit Resume</span>
                          </button>

                          <button
                            onClick={() => {
                              resetResume();
                              navigate('/choose');
                            }}
                            className="aura-btn-secondary"
                            style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}
                            title="Start Fresh"
                          >
                            <RotateCcw size={16} />
                            <span>Start Fresh</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right: Embedded Recent Activity & Downloads Log */}
                    <div style={{
                      borderLeft: '1px solid var(--border-color)',
                      paddingLeft: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '220px'
                    }}>
                      <div>
                        <div 
                          onClick={() => navigate('/activity')}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '1.1rem', cursor: 'pointer' }}
                          title="Open LED Activity & Export Vault page"
                        >
                          <History size={18} color="var(--primary)" />
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                            Recent Activity & Downloads
                          </h4>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '180px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                          {activities.length > 0 ? (
                            activities.slice(0, 4).map((act, index) => (
                              <div key={act.id || act._id || index} style={{
                                padding: '0.6rem 0',
                                borderBottom: '1px solid var(--border-color)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '0.75rem'
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                  <div style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--primary-light)',
                                    color: 'var(--primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                  }}>
                                    {act.type === 'pdf_download' ? <Download size={14} /> : <FileText size={14} />}
                                  </div>
                                  <div>
                                    <div style={{ fontSize: '0.855rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.2 }}>
                                      {act.resumeName || resumeData?.personalInfo?.fullName || 'Resume Draft'}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                      {act.type === 'pdf_download' ? 'PDF Exported' : 'Draft Saved'} · {act.templateId || selectedTemplate}
                                    </div>
                                  </div>
                                </div>
                                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500, flexShrink: 0 }}>
                                  {act.created_at ? new Date(act.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Saved'}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div style={{ textAlign: 'center', padding: '1.5rem 1rem', color: 'var(--text-muted)' }}>
                              <Clock size={28} color="var(--primary)" style={{ marginBottom: '0.4rem' }} />
                              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>No Downloads Logged Yet</div>
                              <div style={{ fontSize: '0.775rem', marginTop: '3px' }}>Click "Rebuild & Edit Resume" to export your first PDF!</div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => navigate('/activity')}
                          style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', padding: 0 }}
                        >
                          View Full Activity Vault →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TEMPLATE GALLERY */}
        <section style={{ padding: '4.5rem 0' }}>
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
                  <span>Curated Designs</span>
                </div>
                <h2 style={{ fontSize: '2.1rem' }}>Featured Resume Templates</h2>
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
                  onClick={() => {
                    if (setSelectedTemplate) setSelectedTemplate(tmpl.id);
                    navigate('/choose');
                  }}
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
                      <TemplateRenderer templateId={tmpl.id} resumeData={templateMockData[tmpl.id] || mockResumeData} />
                    </div>

                    {/* Top Heart Wishlist Overlay Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWishlist(tmpl.id);
                      }}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: wishlist.includes(tmpl.id) ? '#FFF1F2' : 'rgba(255,255,255,0.92)',
                        border: wishlist.includes(tmpl.id) ? '1.5px solid #FECDD3' : '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                        transition: 'all 0.15s ease',
                        zIndex: 10
                      }}
                      title={wishlist.includes(tmpl.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    >
                      <Heart
                        size={16}
                        color={wishlist.includes(tmpl.id) ? '#E11D48' : '#94A3B8'}
                        fill={wishlist.includes(tmpl.id) ? '#E11D48' : 'none'}
                      />
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{tmpl.name}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {tmpl.tags?.slice(0, 2).join(' • ')}
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
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(4px)',
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
            <span>LED</span>
            <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.85rem' }}>Learning Experience Delivery</span>
          </div>

          <div>
            © {new Date().getFullYear()} LED — Learning Experience Delivery. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
