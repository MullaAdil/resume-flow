import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FilePlus, FileUp, ArrowRight } from 'lucide-react';
import AuraHeader from './AuraHeader';

const ChooseFlow = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AuraHeader />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3.5rem 1.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '580px', marginBottom: '3rem' }}>
          <div className="aura-badge" style={{ marginBottom: '0.75rem' }}>
            <span>Career Path Selection</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            How would you like to start?
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Select an option below to begin crafting your high-precision ATS resume.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 380px))', gap: '2rem', width: '100%', justifyContent: 'center' }}>
          
          {/* Create New Card */}
          <div 
            onClick={() => navigate('/builder')}
            className="aura-card"
            style={{ 
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '2.5rem 2rem'
            }}
          >
            <div style={{ 
              width: '52px', height: '52px', borderRadius: '12px', 
              backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.5rem', color: 'var(--primary)'
            }}>
              <FilePlus size={26} />
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Create New Resume
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.75rem', flex: 1 }}>
              Start from scratch with our step-by-step studio editor.
            </p>

            <div className="aura-btn-subtle" style={{ width: '100%', justifyContent: 'center' }}>
              <span>Start Blank Studio</span>
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Import Resume Card */}
          <div 
            onClick={() => navigate('/import')}
            className="aura-card"
            style={{ 
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '2.5rem 2rem'
            }}
          >
            <div style={{ 
              width: '52px', height: '52px', borderRadius: '12px', 
              backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.5rem', color: 'var(--primary)'
            }}>
              <FileUp size={26} />
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Import Existing Resume
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.75rem', flex: 1 }}>
              Upload your existing PDF or Word file and let our parser extract all section details automatically.
            </p>

            <div className="aura-btn-subtle" style={{ width: '100%', justifyContent: 'center' }}>
              <span>Upload PDF / Word</span>
              <ArrowRight size={16} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ChooseFlow;
