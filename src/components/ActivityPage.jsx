import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Edit3 } from 'lucide-react';
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
      }
    };
    fetchActivities();
    return () => { isMounted = false; };
  }, [user?.email]);

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

  // Construct up to 3 side-by-side last used items
  const recentItems = (() => {
    const list = [];
    const seen = new Set();

    // 1. Add recent items from DB activity logs
    if (Array.isArray(activities)) {
      for (const act of activities) {
        const key = `${act.templateId || 'default'}_${act.resumeName || 'draft'}`;
        if (!seen.has(key)) {
          seen.add(key);
          list.push({
            id: act.id || act._id || Math.random(),
            templateId: act.templateId || selectedTemplate || 'multicolor',
            resumeName: act.resumeName || activeResumeName,
            type: act.type || 'pdf_download',
            created_at: act.created_at
          });
        }
        if (list.length >= 3) break;
      }
    }

    // 2. Supplement with current active session & popular templates if fewer than 3 items
    const defaultFallbacks = [
      { templateId: activeTemplateId, resumeName: activeResumeName },
      { templateId: 'visionary', resumeName: `${resumeData?.personalInfo?.fullName || 'Active Resume'} - Visionary` },
      { templateId: 'aslam', resumeName: `${resumeData?.personalInfo?.fullName || 'Active Resume'} - Elite IT` },
      { templateId: 'multicolor', resumeName: `${resumeData?.personalInfo?.fullName || 'Active Resume'} - MultiColor` }
    ];

    for (const fb of defaultFallbacks) {
      const key = `${fb.templateId}_${fb.resumeName}`;
      if (!seen.has(key)) {
        seen.add(key);
        list.push({
          id: `fb_${fb.templateId}`,
          templateId: fb.templateId,
          resumeName: fb.resumeName,
          type: 'recent_session',
          created_at: null
        });
      }
      if (list.length >= 3) break;
    }

    return list.slice(0, 3);
  })();

  const handleOpenStudioWithTemplate = (targetTemplate, targetName) => {
    const tpl = targetTemplate || activeTemplateId;
    if (tpl) {
      setSelectedTemplate(tpl);
      try {
        const stored = JSON.parse(localStorage.getItem('lumen_recent_download') || '{}');
        localStorage.setItem('lumen_recent_download', JSON.stringify({
          ...stored,
          templateId: tpl,
          resumeName: targetName || stored.resumeName || activeResumeName,
          timestamp: new Date().toISOString()
        }));
      } catch (e) {
        console.warn(e);
      }
    }
    navigate('/builder');
  };

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AuraHeader />

      <main style={{ flex: 1, padding: '2.5rem 2rem 4rem', maxWidth: '1320px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
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
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 0.4rem 0', letterSpacing: '-0.03em' }}>
            LED — Career Activity & Last Used Assets
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem', margin: 0 }}>
            Side-by-side view of your 3 most recently used resume templates & saved drafts.
          </p>
        </div>

        {/* 3 Side-by-Side Horizontal Cards Grid (End-to-End Span) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
          width: '100%'
        }}>
          {recentItems.map((item, index) => {
            const itemTplObj = templates.find(t => t.id === item.templateId) || {
              id: item.templateId,
              name: (item.templateId || 'multicolor').replace(/^[a-z]/, c => c.toUpperCase())
            };

            return (
              <div key={item.id || index} style={{ position: 'relative', width: '100%' }}>
                {/* Sheet 3: Slate bottom layer */}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '24px',
                  background: '#F1F5F9', border: '1px solid #CBD5E1',
                  transform: `translate(${5 + index * 2}px, ${6 + index * 2}px) rotate(${0.6 * (index + 1)}deg)`, zIndex: 0
                }} />

                {/* Sheet 2: Linen middle layer */}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '24px',
                  background: 'var(--primary-light, #FAF9F5)', border: '1.5px solid var(--primary-border, #E7E5E0)',
                  transform: `translate(${2 + index}px, ${3 + index}px) rotate(${0.3 * (index + 1)}deg)`, zIndex: 1
                }} />

                {/* Main Studio Card */}
                <div style={{
                  position: 'relative', zIndex: 2, backgroundColor: '#FFFFFF',
                  borderRadius: '24px', border: '1.5px solid var(--primary-border)',
                  padding: '1.5rem', boxShadow: 'var(--shadow-md)',
                  display: 'flex', flexDirection: 'column', gap: '1.15rem'
                }}>

                  {/* Scaled Template Preview Thumbnail */}
                  <div style={{
                    width: '100%', height: '270px', borderRadius: '14px',
                    border: '1px solid var(--border-color)', backgroundColor: '#F8FAFC',
                    overflow: 'hidden', position: 'relative',
                    boxShadow: 'inset 0 2px 6px rgba(15,23,42,0.04)'
                  }}>
                    <div style={{
                      width: '800px', height: '1131px',
                      transform: 'scale(0.35)',
                      transformOrigin: 'top left',
                      backgroundColor: '#FFFFFF',
                      pointerEvents: 'none'
                    }}>
                      <TemplateRenderer templateId={item.templateId} resumeData={resumeData} />
                    </div>

                    {/* Hover overlay button */}
                    <div 
                      onClick={() => handleOpenStudioWithTemplate(item.templateId, item.resumeName)}
                      style={{
                        position: 'absolute', inset: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.2s ease'
                      }}
                    >
                      <div style={{
                        backgroundColor: '#FFFFFF', padding: '0.45rem 0.9rem', borderRadius: '9999px',
                        display: 'flex', alignItems: 'center', gap: '0.35rem', boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                        fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)'
                      }}>
                        <Edit3 size={14} color="var(--primary)" />
                        <span>Open in Studio</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Metadata */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.resumeName}
                    </h3>
                    <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--primary)' }}>
                      {itemTplObj.name} Template
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleOpenStudioWithTemplate(item.templateId, item.resumeName)}
                    className="aura-btn-primary"
                    style={{ width: '100%', padding: '0.75rem', fontSize: '0.875rem', borderRadius: '10px' }}
                  >
                    <Edit3 size={15} />
                    <span>Rebuild in Studio</span>
                  </button>

                </div>
              </div>
            );
          })}
        </div>

        {/* Future Capabilities Module */}
        <div style={{
          marginTop: '3.5rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1.5px dashed var(--primary-border)',
          padding: '1.5rem 2rem',
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
