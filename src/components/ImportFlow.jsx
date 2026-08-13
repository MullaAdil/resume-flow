import React, { useState, useRef } from 'react';
import { useResume } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, ArrowLeft, AlertCircle } from 'lucide-react';
import AuraHeader from './AuraHeader';

const ImportFlow = () => {
  const navigate = useNavigate();
  const { processRealFile } = useResume();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');
  
  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      startProcessing(e.target.files[0]);
      e.target.value = null;
    }
  };

  const startProcessing = async (file) => {
    setIsProcessing(true);
    setErrorMsg('');
    try {
      const success = await processRealFile(file);
      if (success) {
        navigate('/builder');
      } else {
        setErrorMsg("Extraction failed. Please try a different PDF or Word document.");
        setIsProcessing(false);
      }
    } catch (err) {
      setErrorMsg("Error during extraction. Please try again.");
      setIsProcessing(false);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

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

            {!isProcessing ? (
              <div>
                {/* Header — Minimal Text */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h1 style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 0.35rem 0', letterSpacing: '-0.03em' }}>
                      Import Your Resume
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
                      Upload your PDF, Word, Text, JSON, RTF, HTML, or Resume Image to auto-extract sections into the editor.
                    </p>
                  </div>

                  <button
                    onClick={() => navigate('/choose')}
                    className="aura-btn-secondary"
                    style={{ padding: '0.6rem 1.1rem', fontSize: '0.85rem' }}
                  >
                    <ArrowLeft size={16} />
                    <span>Back to Options</span>
                  </button>
                </div>

                {errorMsg && (
                  <div style={{
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FCA5A5',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    color: '#991B1B',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Sleek Horizontal Drag & Drop Zone */}
                <div 
                  onClick={triggerFileInput}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      startProcessing(e.dataTransfer.files[0]);
                    }
                  }}
                  style={{
                    border: '2px dashed',
                    borderColor: isDragging ? 'var(--primary)' : 'var(--border-color)',
                    backgroundColor: isDragging ? 'var(--primary-light)' : '#F8FAFC',
                    borderRadius: '18px',
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={(e) => {
                    if (!isDragging) {
                      e.currentTarget.style.borderColor = 'var(--primary-border)';
                      e.currentTarget.style.backgroundColor = 'var(--primary-light)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isDragging) {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                    }
                  }}
                >
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    accept=".pdf,.docx,.doc,.txt,.text,.rtf,.md,.markdown,.json,.html,.htm,image/*" 
                    onChange={handleFileChange} 
                    style={{ display: 'none' }} 
                  />
                  
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '14px',
                    backgroundColor: '#FFFFFF', color: 'var(--primary)',
                    border: '1.5px solid var(--primary-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: 'var(--shadow-xs)'
                  }}>
                    <UploadCloud size={28} />
                  </div>

                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      Click to select file or drag & drop here
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Supports PDF, DOCX, DOC, TXT, RTF, JSON, HTML & Resume Images (PNG/JPG/WEBP)
                    </div>
                  </div>

                  <div className="aura-btn-primary" style={{ marginTop: '0.5rem', padding: '0.65rem 1.4rem', fontSize: '0.875rem' }}>
                    Select Resume File
                  </div>
                </div>

              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)',
                  margin: '0 auto 1.5rem',
                  animation: 'spin 0.8s linear infinite'
                }} />
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>

                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                  Parsing Resume Document...
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                  Extracting work history, skills, and education into your live editor.
                </p>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default ImportFlow;
