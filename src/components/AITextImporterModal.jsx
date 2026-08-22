import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, FileText, Upload, CheckCircle2, ArrowRight, X, AlertCircle, 
  Layers, Sliders, Zap, HelpCircle, Loader2 
} from 'lucide-react';
import { 
  analyzeAndPerfectResumeFromText, 
  FORMAT_STYLES, 
  extractTextFromFile 
} from '../utils/aiResumeArchitectService';

const SAMPLE_RAW_TEXT = `John Doe
johndoe.dev@email.com | +1 (555) 234-5678 | San Francisco, CA
linkedin.com/in/johndoe | github.com/johndoe | johndoe.com

I am a software engineer with 4+ years of experience working on frontend and backend web applications. I mostly use React, TypeScript, Node.js, Express, MongoDB, and PostgreSQL.

Work:
Senior Full Stack Engineer at Acme Cloud Systems (Jan 2023 - Present, SF)
- Led development of our flagship analytics dashboard using React and TypeScript.
- Worked on optimizing backend PostgreSQL queries and caching with Redis which made API responses faster.
- Set up Docker containers and CI/CD pipelines with GitHub Actions.
- Mentored 3 junior engineers on code reviews and testing.

Software Engineer at BetaTech Labs (Jun 2021 - Dec 2022)
- Built user authentication and RBAC with JWT.
- Integrated Stripe payment gateway for subscription billing.
- Created reusable UI component library used across 4 internal products.

Education:
UC Berkeley - Bachelor of Science in Computer Science (2017 - 2021), GPA: 3.8

Projects:
- AI Resume Optimizer: Web app using React, Node.js, and LLM APIs to score resumes.
- Cloud Task Tracker: Distributed task manager with Redis queues and WebSockets.

Skills:
React, TypeScript, JavaScript, Node.js, Python, PostgreSQL, MongoDB, Redis, Docker, AWS, Git, CI/CD, Agile`;

export default function AITextImporterModal({ isOpen, onClose, onApplyResumeData, activeTemplateId = 'classic' }) {
  const [inputTab, setInputTab] = useState('paste'); // 'paste' | 'upload'
  const [rawText, setRawText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileExtractedPreview, setFileExtractedPreview] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [formatStyle, setFormatStyle] = useState('ats-impact');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progressState, setProgressState] = useState({ step: 0, title: '', progress: 0 });
  const [errorMessage, setErrorMessage] = useState('');
  
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setErrorMessage('');
    
    try {
      const extracted = await extractTextFromFile(file);
      setFileExtractedPreview(extracted);
      if (!rawText) {
        setRawText(extracted);
      }
    } catch (err) {
      console.warn('File preview extraction error:', err);
    }
  };

  const handleLoadSample = () => {
    setRawText(SAMPLE_RAW_TEXT);
    setTargetRole('Senior Full Stack Software Engineer');
    setCustomPrompt('Quantify impact metrics with %, highlight React, TypeScript, and Redis performance optimization.');
    setErrorMessage('');
  };

  const handleAnalyzeAndApply = async () => {
    const textToProcess = rawText || fileExtractedPreview;
    if (!textToProcess || textToProcess.trim().length < 10) {
      setErrorMessage('Please paste resume text/notes or upload a text/document file to proceed.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setProgressState({ step: 1, title: 'Parsing raw input...', progress: 15 });

    try {
      const perfectedData = await analyzeAndPerfectResumeFromText({
        rawText: textToProcess,
        file: selectedFile,
        targetRole,
        formatStyle,
        templateId: activeTemplateId,
        customPrompt,
        onProgress: (prog) => setProgressState(prog)
      });

      if (!perfectedData) {
        throw new Error('Could not structure resume data from the provided text.');
      }

      onApplyResumeData(perfectedData);
      onClose();
    } catch (err) {
      console.error('AI Resume Architect Error:', err);
      setErrorMessage(err.message || 'Failed to process resume text. Please check your text or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999999,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '92vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          border: '1.5px solid #CBD5E1',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)'
            }}>
              <Sparkles size={22} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                AI Resume Architect & Text Importer
                <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', background: '#EEF2FF', color: '#4F46E5', border: '1px solid #C7D2FE', fontWeight: 700 }}>
                  STAR / XYZ Method
                </span>
              </h2>
              <p style={{ margin: 0, fontSize: '0.825rem', color: '#64748B' }}>
                Upload notes or paste raw text. AI will structure, polish bullets with metrics, and auto-fill your template.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748B'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Error Message */}
          {errorMessage && (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              backgroundColor: '#FEF2F2',
              border: '1.5px solid #FCA5A5',
              color: '#DC2626',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Tab Selector & Load Sample Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.5rem', background: '#F1F5F9', padding: '3px', borderRadius: '10px' }}>
              <button
                type="button"
                onClick={() => setInputTab('paste')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: inputTab === 'paste' ? '#FFFFFF' : 'transparent',
                  color: inputTab === 'paste' ? '#0F172A' : '#64748B',
                  boxShadow: inputTab === 'paste' ? '0 2px 6px rgba(15, 23, 42, 0.08)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <FileText size={15} /> Paste Raw Text / Notes
              </button>
              <button
                type="button"
                onClick={() => setInputTab('upload')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: inputTab === 'upload' ? '#FFFFFF' : 'transparent',
                  color: inputTab === 'upload' ? '#0F172A' : '#64748B',
                  boxShadow: inputTab === 'upload' ? '0 2px 6px rgba(15, 23, 42, 0.08)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Upload size={15} /> Upload File (.txt, .pdf, .md)
              </button>
            </div>

            <button
              type="button"
              onClick={handleLoadSample}
              style={{
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: '#4F46E5',
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Zap size={13} /> Load Sample Notes
            </button>
          </div>

          {/* Tab 1: Paste Text */}
          {inputTab === 'paste' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.825rem', fontWeight: 700, color: '#334155' }}>
                  Raw Resume Content, Bio, or Project Notes
                </label>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                  {rawText.length} characters
                </span>
              </div>
              <textarea
                rows={7}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste anything here: messy work history, LinkedIn summary, bullet points, education, or rough career notes..."
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  color: '#0F172A',
                  resize: 'vertical',
                  outline: 'none',
                  backgroundColor: '#FAF9F5',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}

          {/* Tab 2: Upload File */}
          {inputTab === 'upload' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '2px dashed #CBD5E1',
                  borderRadius: '12px',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#F8FAFC',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#6366F1'; e.currentTarget.style.backgroundColor = '#EEF2FF'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,.md,.json,.rtf,.doc,.docx"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4F46E5',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                }}>
                  <Upload size={22} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1E293B' }}>
                  {selectedFile ? selectedFile.name : 'Click to upload or drag & drop file'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  Supports PDF, TXT, Markdown, JSON, DOCX (Max 10MB)
                </div>
              </div>

              {fileExtractedPreview && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={13} /> Extracted Text Preview ({fileExtractedPreview.length} chars)
                  </div>
                  <textarea
                    rows={4}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.8rem',
                      fontFamily: 'monospace',
                      color: '#334155',
                      backgroundColor: '#FAF9F5',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Formatting & Strategy Settings */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 800, color: '#1E293B' }}>
              <Sliders size={16} color="#4F46E5" /> Custom Formatting & Target Strategy
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {/* Target Job Role */}
              <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>
                  Target Job Role (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Full Stack Engineer"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '0.875rem',
                    color: '#0F172A',
                    outline: 'none',
                    backgroundColor: '#FFFFFF'
                  }}
                />
              </div>

              {/* Formatting Strategy Selector */}
              <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>
                  Bullet Point & Tone Strategy
                </label>
                <select
                  value={formatStyle}
                  onChange={(e) => setFormatStyle(e.target.value)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '0.875rem',
                    color: '#0F172A',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  {Object.entries(FORMAT_STYLES).map(([key, style]) => (
                    <option key={key} value={key}>{style.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Custom Instructions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>
                Specific AI Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Highlight React, Docker & AWS, emphasize 40% query performance optimization..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '0.875rem',
                  color: '#0F172A',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              />
            </div>
          </div>

          {/* Progress Bar when processing */}
          {isLoading && (
            <div style={{
              background: '#EEF2FF',
              border: '1.5px solid #C7D2FE',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4F46E5', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Loader2 size={16} className="spin-animation" style={{ animation: 'spin 1s linear infinite' }} />
                  {progressState.title || 'AI Structuring & Perfecting Resume...'}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#4F46E5' }}>
                  {progressState.progress || 20}%
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#E0E7FF', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${progressState.progress || 20}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #6366F1 0%, #4F46E5 100%)',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FAF9F5'
        }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '10px',
              border: '1.5px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#475569',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAnalyzeAndApply}
            disabled={isLoading}
            style={{
              padding: '0.75rem 1.75rem',
              borderRadius: '10px',
              border: 'none',
              background: isLoading ? '#94A3B8' : 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: isLoading ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: isLoading ? 'none' : '0 8px 20px rgba(99, 102, 241, 0.35)',
              transition: 'all 0.15s ease'
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Structuring & Perfecting...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Analyze, Perfect & Auto-Fill Resume
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
