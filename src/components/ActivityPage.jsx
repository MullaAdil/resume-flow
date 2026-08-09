import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileText, Clock, ArrowLeft, Search, Sparkles, Edit3 } from 'lucide-react';
import AuraHeader from './AuraHeader';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { apiClient } from '../utils/apiClient';
import TemplateRenderer from './TemplateRenderer';
import { templates } from './templatesList';

const ActivityPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedTemplate, setSelectedTemplate, resumeData } = useResume();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchActivities = async () => {
      try {
        const data = await apiClient.activity.list(user?.email || '');
        if (isMounted && Array.isArray(data)) {
          setActivities(data);
        }
      } catch (err) {
        console.warn('Failed to load activity logs:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchActivities();
    return () => { isMounted = false; };
  }, [user?.email]);

  const filteredActivities = activities.filter(act => {
    const matchesType = filterType === 'all' || act.type === filterType;
    const matchesSearch = !searchQuery || 
      (act.resumeName && act.resumeName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (act.templateId && act.templateId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const pdfExportsCount = activities.filter(a => a.type === 'pdf_download').length;

  const recentDownloadStored = (() => {
    try {
      return JSON.parse(localStorage.getItem('lumen_recent_download') || 'null');
    } catch {
      return null;
    }
  })();

  const mostRecentActivity = activities.length > 0 ? activities[0] : null;

  const activeTemplateId = recentDownloadStored?.templateId || selectedTemplate || mostRecentActivity?.templateId || 'multicolor';

  const activeResumeName = recentDownloadStored?.resumeName || (resumeData?.personalInfo?.fullName ? `${resumeData.personalInfo.fullName}'s Resume` : null) || mostRecentActivity?.resumeName || 'Downloaded Resume';

  const currentTemplateObj = templates.find(t => t.id === activeTemplateId) || {
    id: activeTemplateId,
    name: (activeTemplateId || 'multicolor').replace(/^[a-z]/, c => c.toUpperCase())
  };

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AuraHeader />

      <main style={{ flex: 1, padding: '2.5rem 1.5rem 4rem', maxWidth: '1240px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Navigation back bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <button
            onClick={() => navigate('/')}
            className="aura-btn-secondary"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.875rem' }}
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Section Title */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 0.5rem 0', letterSpacing: '-0.03em' }}>
            LED — Career Activity & Assets Vault
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
            Live preview of your recently exported/edited resume template alongside database-logged activity history.
          </p>
        </div>

        {/* ── 2-Column Activity & Assets Vault Dashboard Grid ── */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* ── Left Column: Live Preview Card with Scaled Asset Preview & Metadata ── */}
          <div style={{ flex: '1 1 380px', maxWidth: '440px', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ position: 'relative', width: '100%' }}>
              {/* Sheet 2: Linen backing sheet */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '24px',
                background: 'var(--primary-light, #FAF9F5)', border: '1.5px solid var(--primary-border, #E7E5E0)',
                transform: 'translate(4px, 5px) rotate(0.4deg)', zIndex: 0
              }} />

              {/* Main Top Studio Card */}
              <div style={{
                position: 'relative', zIndex: 1, backgroundColor: '#FFFFFF',
                borderRadius: '24px', border: '1.5px solid var(--primary-border)',
                padding: '1.75rem', boxShadow: 'var(--shadow-md)',
                display: 'flex', flexDirection: 'column', gap: '1.25rem'
              }}>

                {/* Card Header & Status Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 700, color: '#059669', background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '0.25rem 0.65rem', borderRadius: '9999px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                    <span>Recent Active Draft</span>
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                    {currentTemplateObj.name}
                  </span>
                </div>

                {/* Live Scaled Resume Preview Container using Recent Template */}
                <div style={{
                  width: '100%',
                  height: '360px',
                  overflow: 'hidden',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#F8FAFC',
                  position: 'relative',
                  boxShadow: 'inset 0 2px 6px rgba(15,23,42,0.04)'
                }}>
                  <div style={{
                    width: '800px',
                    height: '1131px',
                    transform: 'scale(0.44)',
                    transformOrigin: 'top left',
                    backgroundColor: '#FFFFFF',
                    pointerEvents: 'none'
                  }}>
                    <TemplateRenderer templateId={activeTemplateId} resumeData={resumeData} />
                  </div>

                  {/* Hover Overlay */}
                  <div 
                    onClick={() => {
                      setSelectedTemplate(activeTemplateId);
                      navigate('/builder');
                    }}
                    style={{
                      position: 'absolute', inset: 0,
                      backgroundColor: 'rgba(15, 23, 42, 0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.2s ease'
                    }}
                  >
                    <div style={{
                      backgroundColor: '#FFFFFF', padding: '0.55rem 1rem', borderRadius: '9999px',
                      display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                      fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)'
                    }}>
                      <Edit3 size={15} color="var(--primary)" />
                      <span>Open in Studio</span>
                    </div>
                  </div>
                </div>

                {/* Metadata Summary */}
                <div style={{ backgroundColor: '#F8FAFC', borderRadius: '12px', padding: '1rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {activeResumeName}
                  </div>
                  {resumeData?.personalInfo?.jobTitle ? (
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
                      {resumeData.personalInfo.jobTitle}
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary)' }}>
                      {currentTemplateObj.name} Template
                    </div>
                  )}
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', paddingTop: '0.45rem', borderTop: '1px dashed #CBD5E1' }}>
                    <span>Recent Template: <strong>{currentTemplateObj.name}</strong></span>
                    <span>Status: <strong>Recent Task</strong></span>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={() => {
                    setSelectedTemplate(activeTemplateId);
                    navigate('/builder');
                  }}
                  className="aura-btn-primary"
                  style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem', borderRadius: '10px' }}
                >
                  <span>Rebuild / Modify in Studio</span>
                </button>

              </div>
            </div>

          </div>

          {/* ── Right Column: Database-Logged Activity History List ── */}
          <div style={{ flex: '2 1 500px', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ position: 'relative', width: '100%' }}>
              
              {/* Main Vault History Card */}
              <div style={{
                position: 'relative', zIndex: 1, backgroundColor: '#FFFFFF',
                borderRadius: '24px', border: '1.5px solid var(--primary-border)',
                padding: '2rem 2.25rem', boxShadow: 'var(--shadow-md)',
                display: 'flex', flexDirection: 'column', gap: '1.5rem'
              }}>

                {/* Header & Status Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.02em' }}>
                        Activity Audit Trail
                      </h2>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                        🟢 Database Connected
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                      Timestamped record of PDF exports and saved resume checkpoints.
                    </p>
                  </div>

                  {/* Export Statistics Badges */}
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <div style={{ padding: '0.4rem 0.85rem', backgroundColor: 'var(--primary-light)', borderRadius: '10px', border: '1px solid var(--primary-border)', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Exports</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--primary)' }}>{pdfExportsCount}</div>
                    </div>
                    <div style={{ padding: '0.4rem 0.85rem', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Logs</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-main)' }}>{activities.length}</div>
                    </div>
                  </div>
                </div>

                {/* Search & Filter Toolbar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  {/* Search Box */}
                  <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
                    <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                    <input
                      type="text"
                      placeholder="Search by resume name or template..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="aura-input"
                      style={{ paddingLeft: '2.5rem', height: '40px', fontSize: '0.85rem' }}
                    />
                  </div>

                  {/* Type Filter Pills */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setFilterType('all')}
                      className={filterType === 'all' ? 'aura-btn-primary' : 'aura-btn-secondary'}
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
                    >
                      All Logs ({activities.length})
                    </button>
                    <button
                      onClick={() => setFilterType('pdf_download')}
                      className={filterType === 'pdf_download' ? 'aura-btn-primary' : 'aura-btn-secondary'}
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
                    >
                      PDF Exports ({pdfExportsCount})
                    </button>
                  </div>
                </div>

                {/* Timeline List */}
                {loading ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {[1, 2, 3].map(n => (
                      <div key={n} style={{
                        padding: '1.1rem', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid var(--border-color)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: 0.6
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#CBD5E1' }} />
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ width: '150px', height: '12px', borderRadius: '4px', backgroundColor: '#CBD5E1' }} />
                            <div style={{ width: '220px', height: '10px', borderRadius: '4px', backgroundColor: '#E2E8F0' }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredActivities.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {filteredActivities.map((act, index) => {
                      const actTemplateObj = templates.find(t => t.id === act.templateId) || { name: act.templateId || selectedTemplate };
                      return (
                        <div
                          key={act.id || act._id || index}
                          style={{
                            padding: '1rem 1.15rem',
                            borderRadius: '14px',
                            backgroundColor: '#F8FAFC',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem',
                            flexWrap: 'wrap'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <div style={{
                              width: '40px', height: '40px', borderRadius: '10px',
                              backgroundColor: '#FFFFFF', color: 'var(--primary)',
                              border: '1px solid var(--primary-border)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                            }}>
                              {act.type === 'pdf_download' ? <Download size={18} /> : <FileText size={18} />}
                            </div>

                            <div>
                              <div style={{ fontSize: '0.925rem', fontWeight: 800, color: 'var(--text-main)' }}>
                                {act.resumeName || activeResumeName}
                              </div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                {act.type === 'pdf_download' ? 'PDF Exported' : 'Draft Checkpoint'} • Template: <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{actTemplateObj.name}</span> • User: {act.user_id || user?.email || 'Anonymous'}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                              {act.created_at ? new Date(act.created_at).toLocaleString() : 'Recent'}
                            </span>
                            <button
                              onClick={() => {
                                setSelectedTemplate(act.templateId || activeTemplateId);
                                navigate('/builder');
                              }}
                              className="aura-btn-subtle"
                              style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                    <Clock size={34} color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>No matching logs found</div>
                    <div style={{ fontSize: '0.825rem', marginTop: '4px' }}>Try clearing your search query or exporting a PDF from the builder.</div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

        {/* Future Capabilities Module */}
        <div style={{
          marginTop: '2.5rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1.5px dashed var(--primary-border)',
          padding: '1.75rem 2.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <Sparkles size={18} color="var(--primary)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                Coming Soon to LED Vault
              </h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0, maxWidth: '650px' }}>
              Multi-version resume comparisons, automated cloud backup to Google Drive / OneDrive, and recruiter link sharing metrics.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ActivityPage;
