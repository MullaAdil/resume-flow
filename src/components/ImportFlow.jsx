import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, ArrowLeft, FileText } from 'lucide-react';

// ── Deckled Torn Paper Edges ──
const TornEdge = ({ isBottom }) => (
  <svg 
    width="100%" 
    height="10" 
    viewBox="0 0 1200 10" 
    preserveAspectRatio="none"
    style={{ 
      position: 'absolute', 
      left: 0, 
      right: 0, 
      [isBottom ? 'bottom' : 'top']: '-5px', 
      zIndex: 10,
      pointerEvents: 'none'
    }}
  >
    <path 
      d={isBottom 
        ? "M0,5 L20,10 L40,5 L60,10 L80,5 L100,10 L120,5 L140,10 L160,5 L180,10 L200,5 L220,10 L240,5 L260,10 L280,5 L300,10 L320,5 L340,10 L360,5 L380,10 L400,5 L420,10 L440,5 L460,10 L480,5 L500,10 L520,5 L540,10 L560,5 L580,10 L600,5 L620,10 L640,5 L660,10 L680,5 L700,10 L720,5 L740,10 L760,5 L780,10 L800,5 L840,10 L880,5 L920,10 L960,5 L1000,10 L1040,5 L1080,10 L1120,5 L1160,10 L1200,5 L1200,0 L0,0 Z"
        : "M0,5 L20,0 L40,5 L60,0 L80,5 L100,0 L120,5 L140,0 L160,5 L180,0 L200,5 L220,0 L240,5 L260,0 L280,5 L300,0 L320,5 L340,0 L360,5 L380,0 L400,5 L420,0 L440,5 L460,0 L480,5 L500,0 L520,6 L540,0 L560,5 L580,0 L600,5 L620,0 L640,5 L660,0 L680,5 L700,0 L720,5 L740,0 L760,5 L780,0 L800,5 L840,0 L880,5 L920,0 L960,5 L1000,0 L1040,5 L1080,0 L1120,5 L1160,0 L1200,5 L1200,10 L0,10 Z"
      } 
      fill="#FFFFFF" 
      stroke="#CBD5E1"
      strokeWidth="1.5"
    />
  </svg>
);

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
      if(success) {
        navigate('/templates', { state: { skipPathSelection: true } });
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
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ 
      display: 'flex', flexDirection: 'column', minHeight: '100vh', 
      backgroundColor: 'var(--bg-color)'
    }}>
      {/* Header */}
      <header style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1.25rem 3rem', background: 'transparent'
      }}>
        <div 
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-main)', letterSpacing: '-0.02em', cursor: 'pointer' }}
        >
           <FileText size={28} color="var(--primary)" />
           Elevate Resume
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', flex: 1 }}>
        <AnimatePresence mode="wait">
          {!isProcessing ? (
            <motion.div 
              key="upload" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              transition={{ duration: 0.2 }}
              style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', textAlign: 'center', letterSpacing: '-0.02em' }}>
                Upload your resume
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '3rem', textAlign: 'center' }}>
                We'll extract your details and generate a beautiful new format.
              </p>
              
              <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".pdf,.docx,.doc,.txt" onChange={handleFileChange} />
              
              <div 
                onClick={triggerFileInput}
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }}
                onDrop={(e) => {
                  e.preventDefault(); e.stopPropagation();
                  setIsDragging(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    startProcessing(e.dataTransfer.files[0]);
                  }
                }}
                style={{ 
                  width: '100%', 
                  padding: '4.5rem 2rem',
                  background: isDragging ? '#ECFDF5' : 'linear-gradient(90deg, rgba(29, 78, 216, 0.03) 0%, #FFFFFF 15%)',
                  borderLeft: '4px solid #1D4ED8', borderRight: '1.5px solid #CBD5E1', borderTop: 'none', borderBottom: 'none',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  boxShadow: '0 12px 30px -10px rgba(15, 23, 42, 0.08)',
                  position: 'relative'
                }}
              >
                <TornEdge />
                <TornEdge isBottom />
                <div style={{ 
                  backgroundColor: 'var(--bg-color)', 
                  padding: '1rem', borderRadius: '50%', marginBottom: '1rem', color: 'var(--primary)',
                  border: '1px solid var(--border-color)'
                }}>
                  <UploadCloud size={32} />
                </div>
                
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  Click to browse or drag and drop
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Supports PDF, DOCX, and TXT
                </p>

                <button 
                  onClick={(e) => { e.stopPropagation(); triggerFileInput(); }}
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.75rem 2rem',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  Browse Files
                </button>
              </div>
              
              <button 
                onClick={() => navigate('/')} 
                style={{ 
                  background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', 
                  cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500, marginTop: '2rem' 
                }}
              >
                <ArrowLeft size={16} /> Go Back
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="processing" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 2rem', backgroundColor: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid var(--border-color)', borderTop: '3px solid var(--primary)', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem auto' }} />
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>Parsing your resume...</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Taking you to select a template...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ImportFlow;
