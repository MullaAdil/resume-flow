import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileText, Clock, ArrowLeft, Search, Sparkles } from 'lucide-react';
import AuraHeader from './AuraHeader';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { apiClient } from '../utils/apiClient';

const ActivityPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedTemplate } = useResume();
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

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AuraHeader />

      <main style={{ flex: 1, padding: '3.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Navigation back bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
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
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 0.5rem 0', letterSpacing: '-0.03em' }}>
            LED — Activity & Export Vault
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
            Complete audit history of your resume edits, PDF exports, and template sessions.
          </p>
        </div>

        {/* Multi-Paper Stacked Vault Card Container */}
        <div style={{ position: 'relative', width: '100%', marginBottom: '3rem' }}>
          
          {/* Paper Sheet 3: Cool Slate */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '24px',
            background: '#F1F5F9', border: '1px solid #CBD5E1',
            transform: 'translate(10px, 11px) rotate(1deg)', zIndex: 0,
            boxShadow: '0 4px 14px rgba(15,23,42,0.03)'
          }} />

          {/* Paper Sheet 2: Soft Warm Linen */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '24px',
            background: 'var(--primary-light, #FAF9F5)', border: '1.5px solid var(--primary-border, #E7E5E0)',
            transform: 'translate(5px, 6px) rotate(0.5deg)', zIndex: 1,
            boxShadow: '0 4px 14px rgba(15,23,42,0.04)'
          }} />

          {/* Main Card Content */}
          <div style={{
            position: 'relative', zIndex: 2, backgroundColor: '#FFFFFF',
            borderRadius: '24px', border: '1.5px solid var(--primary-border)',
            padding: '2.5rem', boxShadow: 'var(--shadow-md)'
          }}>
            
            {/* Search & Filter Toolbar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '2rem',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid var(--border-color)'
            }}>
              {/* Search Box */}
              <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
                <Search size={17} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                <input
                  type="text"
                  placeholder="Search log by resume name or template..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="aura-input"
                  style={{ paddingLeft: '2.6rem', height: '44px', fontSize: '0.875rem' }}
                />
              </div>

              {/* Type Filter Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setFilterType('all')}
                  className={filterType === 'all' ? 'aura-btn-primary' : 'aura-btn-secondary'}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                >
                  All Logs ({activities.length})
                </button>
                <button
                  onClick={() => setFilterType('pdf_download')}
                  className={filterType === 'pdf_download' ? 'aura-btn-primary' : 'aura-btn-secondary'}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
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
                    padding: '1.2rem',
                    borderRadius: '14px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    opacity: 0.6
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#CBD5E1' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ width: '160px', height: '14px', borderRadius: '4px', backgroundColor: '#CBD5E1' }} />
                        <div style={{ width: '240px', height: '10px', borderRadius: '4px', backgroundColor: '#E2E8F0' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredActivities.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {filteredActivities.map((act, index) => (
                  <div
                    key={act.id || act._id || index}
                    style={{
                      padding: '1.1rem 1.25rem',
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        backgroundColor: '#FFFFFF',
                        color: 'var(--primary)',
                        border: '1px solid var(--primary-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {act.type === 'pdf_download' ? <Download size={20} /> : <FileText size={20} />}
                      </div>

                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {act.resumeName || 'Executive Resume'}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {act.type === 'pdf_download' ? 'PDF Exported' : 'Draft Checkpoint'} • Template: <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{act.templateId || selectedTemplate}</span> • User: {act.user_id || user?.email || 'Anonymous'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        {act.created_at ? new Date(act.created_at).toLocaleString() : 'Recent'}
                      </span>
                      <button
                        onClick={() => navigate('/builder')}
                        className="aura-btn-subtle"
                        style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem' }}
                      >
                        Edit Resume
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--text-muted)' }}>
                <Clock size={36} color="var(--primary)" style={{ marginBottom: '0.6rem' }} />
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>No matching activity found</div>
                <div style={{ fontSize: '0.85rem', marginTop: '4px' }}>Try clearing your search query or exporting a PDF from the builder.</div>
              </div>
            )}

          </div>
        </div>

        {/* Future Capabilities Module Placeholder */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1.5px dashed var(--primary-border)',
          padding: '2rem 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Sparkles size={18} color="var(--primary)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                Coming Soon to LED Vault
              </h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0, maxWidth: '600px' }}>
              Multi-version resume comparisons, automated cloud backup to Google Drive / OneDrive, and recruiter link sharing metrics.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ActivityPage;
