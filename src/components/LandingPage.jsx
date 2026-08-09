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
  Clock, History
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
  const { resumeData, resetResume, selectedTemplate } = useResume();
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

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AuraHeader />

      <main style={{ flex: 1 }}>
        {/* HERO SECTION */}
        <section style={{ padding: '4rem 0 3.5rem' }}>
          <div className="aura-container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 460px',
              gap: '3.5rem',
              alignItems: 'center'
            }}>
              {/* Left Column */}
              <div>
                <div style={{ marginBottom: '1.25rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.02em' }}>
                  {'{ Resume Builder }'}
                </div>

                <h1 style={{
                  fontSize: '3.2rem',
                  lineHeight: 1.12,
                  letterSpacing: '-0.04em',
                  marginBottom: '1.25rem',
                  color: 'var(--text-main)'
                }}>
                  Craft an executive resume that <span style={{ color: 'var(--primary)' }}>gets you hired</span>.
                </h1>

                <p style={{
                  fontSize: '1.125rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '2.25rem',
                  maxWidth: '560px'
                }}>
                  High-precision resume builder with real-time live preview, executive templates, and vector PDF export.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigate('/templates')}
                    className="aura-btn-primary"
                    style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
                  >
                    <span>Build Resume Now</span>
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
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>99.4%</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>ATS Pass Rate</div>
                  </div>
                  <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--border-color)' }} />
                  <div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>16+</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>Executive Templates</div>
                  </div>
                  <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--border-color)' }} />
                  <div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>Instant</div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>Vector PDF Export</div>
                  </div>
                </div>
              </div>

              {/* Right Column Sandbox */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <HeroSandbox />
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
                    navigate('/builder');
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
