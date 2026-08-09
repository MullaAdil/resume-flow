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

  const currentTemplateObj = templates.find(t => t.id === activeTemplateId) || {
    id: activeTemplateId,
    name: (activeTemplateId || 'multicolor').replace(/^[a-z]/, c => c.toUpperCase())
  };

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

      <main style={{ flex: 1, padding: '2.5rem 1.5rem 4rem', maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
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
          <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 0.5rem 0', letterSpacing: '-0.03em' }}>
            LED — Career Activity & Recent Asset
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
            Live scaled preview of your active resume draft and recently selected template layout.
          </p>
        </div>

        {/* Centered Scaled Asset Preview Card */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ position: 'relative', width: '100%' }}>
              {/* Sheet 3: Slate bottom layer */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '24px',
                background: '#F1F5F9', border: '1px solid #CBD5E1',
                transform: 'translate(8px, 9px) rotate(1.2deg)', zIndex: 0
              }} />

              {/* Sheet 2: Linen middle layer */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '24px',
                background: 'var(--primary-light, #FAF9F5)', border: '1.5px solid var(--primary-border, #E7E5E0)',
                transform: 'translate(4px, 5px) rotate(0.5deg)', zIndex: 1
              }} />

              {/* Main Top Studio Card */}
              <div style={{
                position: 'relative', zIndex: 2, backgroundColor: '#FFFFFF',
                borderRadius: '24px', border: '1.5px solid var(--primary-border)',
                padding: '2rem', boxShadow: 'var(--shadow-md)',
                display: 'flex', flexDirection: 'column', gap: '1.5rem'
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
                  height: '420px',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#F8FAFC',
                  position: 'relative',
                  boxShadow: 'inset 0 2px 6px rgba(15,23,42,0.04)'
                }}>
                  <div style={{
                    width: '800px',
                    height: '1131px',
                    transform: 'scale(0.52)',
                    transformOrigin: 'top left',
                    backgroundColor: '#FFFFFF',
                    pointerEvents: 'none'
                  }}>
                    <TemplateRenderer templateId={activeTemplateId} resumeData={resumeData} />
                  </div>

                  {/* Hover Overlay */}
                  <div 
                    onClick={() => handleOpenStudioWithTemplate(activeTemplateId, activeResumeName)}
                    style={{
                      position: 'absolute', inset: 0,
                      backgroundColor: 'rgba(15, 23, 42, 0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', opacity: 0.9, transition: 'opacity 0.2s ease'
                    }}
                  >
                    <div style={{
                      backgroundColor: '#FFFFFF', padding: '0.6rem 1.25rem', borderRadius: '9999px',
                      display: 'flex', alignItems: 'center', gap: '0.45rem', boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                      fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)'
                    }}>
                      <Edit3 size={16} color="var(--primary)" />
                      <span>Open in Studio</span>
                    </div>
                  </div>
                </div>

                {/* Metadata Summary */}
                <div style={{ backgroundColor: '#F8FAFC', borderRadius: '12px', padding: '1.15rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {activeResumeName}
                  </div>
                  {resumeData?.personalInfo?.jobTitle ? (
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary)' }}>
                      {resumeData.personalInfo.jobTitle}
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
                      {currentTemplateObj.name} Template
                    </div>
                  )}
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem', paddingTop: '0.5rem', borderTop: '1px dashed #CBD5E1' }}>
                    <span>Selected Template: <strong>{currentTemplateObj.name}</strong></span>
                    <span>Status: <strong>Active Task</strong></span>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={() => handleOpenStudioWithTemplate(activeTemplateId, activeResumeName)}
                  className="aura-btn-primary"
                  style={{ width: '100%', padding: '0.85rem', fontSize: '0.925rem', borderRadius: '10px' }}
                >
                  <span>Rebuild / Modify in Studio</span>
                </button>

              </div>
            </div>

          </div>
        </div>

        {/* Future Capabilities Module */}
        <div style={{
          marginTop: '3.5rem',
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
