import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FilePlus, FileUp, ArrowRight } from 'lucide-react';
import AuraHeader from './AuraHeader';

const ChooseFlow = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AuraHeader />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3.5rem 1.5rem' }}>
        {/* Multi-Paper Stacked Card Container — 1000px Wide Horizontal Layout */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1000px' }}>

          {/* Paper backing layer 2 — Soft Cool Slate */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            background: '#F1F5F9',
            border: '1px solid #CBD5E1',
            transform: 'translate(10px, 12px) rotate(0.8deg)',
            zIndex: -2,
            boxShadow: '0 6px 20px rgba(15, 23, 42, 0.04)'
          }} />

          {/* Paper backing layer 1 — Soft Warm Linen */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            background: '#FAF9F5',
            border: '1px solid #E7E5E0',
            transform: 'translate(5px, 6px) rotate(0.4deg)',
            zIndex: -1,
            boxShadow: '0 6px 20px rgba(15, 23, 42, 0.05)'
          }} />

          {/* Main Top Studio Card */}
          <div style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1.5px solid var(--primary-border)',
            padding: '3rem 2.75rem',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            zIndex: 1,
            boxSizing: 'border-box'
          }}>

            {/* Header Area — Minimal Text */}
            <div style={{ marginBottom: '2.25rem', textAlign: 'center' }}>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 0.5rem 0', letterSpacing: '-0.03em' }}>
                How would you like to start?
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
                Select an option to begin crafting your ATS-ready resume.
              </p>
            </div>

            {/* Horizontal 2-Column Option Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
              alignItems: 'stretch'
            }}>
              
              {/* Option 1: Create New */}
              <div
                onClick={() => navigate('/builder')}
                style={{
                  padding: '2rem 1.75rem',
                  borderRadius: '18px',
                  border: '1.5px solid var(--border-color)',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.25rem',
                  transition: 'all 0.15s ease',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.boxShadow = '0 6px 22px var(--primary-glow)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    backgroundColor: 'var(--primary-light)', color: 'var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.25rem'
                  }}>
                    <FilePlus size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.35rem 0' }}>
                    Create New Resume
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>
                    Start blank with our step-by-step guided editor.
                  </p>
                </div>

                <div className="aura-btn-primary" style={{ width: '100%', padding: '0.7rem 1rem', fontSize: '0.875rem' }}>
                  <span>Start from Scratch</span>
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Option 2: Import PDF / Word */}
              <div
                onClick={() => navigate('/import')}
                style={{
                  padding: '2rem 1.75rem',
                  borderRadius: '18px',
                  border: '1.5px solid var(--border-color)',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.25rem',
                  transition: 'all 0.15s ease',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.boxShadow = '0 6px 22px var(--primary-glow)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    backgroundColor: 'var(--primary-light)', color: 'var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.25rem'
                  }}>
                    <FileUp size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.35rem 0' }}>
                    Import Existing Resume
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>
                    Upload PDF or Word file — auto-extract sections into builder.
                  </p>
                </div>

                <div className="aura-btn-secondary" style={{ width: '100%', padding: '0.7rem 1rem', fontSize: '0.875rem' }}>
                  <span>Upload Document</span>
                  <ArrowRight size={16} />
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ChooseFlow;
