import React, { useState, useRef } from 'react';
import { useResume } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, ArrowLeft, CheckCircle } from 'lucide-react';
import AuraHeader from './AuraHeader';

const ImportFlow = () => {
  const navigate = useNavigate();
  const { processRealFile } = useResume();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      startProcessing(e.target.files[0]);
      e.target.value = null;
    }
  };

  const startProcessing = async (file) => {
    setIsProcessing(true);
    try {
      const success = await processRealFile(file);
      if (success) {
        navigate('/builder');
      } else {
        alert("Extraction failed.");
        setIsProcessing(false);
      }
    } catch (err) {
      alert("Error during extraction.");
      setIsProcessing(false);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AuraHeader />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '580px' }}>
          
          {!isProcessing ? (
            <div className="aura-card" style={{ backgroundColor: '#FFFFFF', textAlign: 'center', padding: '3rem 2rem' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px',
                backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem', color: 'var(--primary)'
              }}>
                <UploadCloud size={32} />
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Import Your Existing Resume
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.5 }}>
                Upload your PDF or Word document (.pdf, .docx). Our AI parser will extract your experience, education, and skills instantly.
              </p>

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
                  borderRadius: '12px',
                  padding: '2.5rem 1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  marginBottom: '1.5rem'
                }}
              >
                <input 
                  ref={fileInputRef} 
                  type="file" 
                  accept=".pdf,.docx,.doc" 
                  onChange={handleFileChange} 
                  style={{ display: 'none' }} 
                />
                
                <FileText size={40} color="var(--primary)" style={{ marginBottom: '0.75rem' }} />
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  Click to select file or drag & drop here
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Supports PDF or DOCX (Max 10MB)
                </div>
              </div>

              <button
                onClick={() => navigate('/choose')}
                className="aura-btn-secondary"
                style={{ fontSize: '0.9rem' }}
              >
                <ArrowLeft size={16} />
                <span>Back to Path Selection</span>
              </button>
            </div>
          ) : (
            <div className="aura-card" style={{ backgroundColor: '#FFFFFF', textAlign: 'center', padding: '3.5rem 2rem' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)',
                margin: '0 auto 1.5rem',
                animation: 'spin 0.8s linear infinite'
              }} />
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Extracting Resume Data...
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                Parsing experience, skills, and education into your personal studio.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default ImportFlow;
