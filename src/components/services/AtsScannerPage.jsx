import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuraHeader from '../AuraHeader';
import { useResume } from '../../context/ResumeContext';
import { templateMockData, mockResumeData } from '../../utils/mockResumeData';
import TemplateRenderer from '../TemplateRenderer';
import {
  ShieldCheck, CheckCircle2, AlertCircle, ArrowRight,
  Sparkles, Lock, Upload, FileText, ChevronDown, Award,
  Check, RefreshCw, Layers, Star, Zap, Eye, Download,
  ZoomIn, ZoomOut, Edit3, Terminal
} from 'lucide-react';

export default function AtsScannerPage() {
  const navigate = useNavigate();
  const { resumeData, setResumeData, selectedTemplate } = useResume();

  const [analyzed, setAnalyzed] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isHoveringDropzone, setIsHoveringDropzone] = useState(false);
  const [previewZoom, setPreviewZoom] = useState(0.48);

  const [scoreData, setScoreData] = useState({
    totalScore: 84,
    designScore: 96,
    structureScore: 90,
    contentScore: 78,
    atsScore: 99,
    issues: [
      {
        id: 'verbs',
        title: 'Overused Passive Phrasing Detected',
        desc: 'Found "Responsible for" in 2 bullet points. Recruiters look for active impact verbs.',
        original: 'Responsible for maintaining microservices and assisting the cloud team.',
        recommended: 'Spearheaded microservices architecture and orchestrated multi-region Kubernetes deployments.',
        applied: false
      },
      {
        id: 'metrics',
        title: 'Missing Quantifiable Metric (Google XYZ Formula)',
        desc: 'Achievement statement lacks measurable percentage, dollar impact, or time saved.',
        original: 'Optimized database queries and improved website loading speed.',
        recommended: 'Optimized PostgreSQL queries, reducing p99 API latency by 42% across 1.8M daily active users.',
        applied: false
      },
      {
        id: 'keywords',
        title: 'Missing High-Density Domain Keywords',
        desc: 'Workday & Greenhouse ATS screeners favor explicit mention of distributed systems and Redis.',
        original: 'Skills: React, Node.js, JavaScript',
        recommended: 'Injected: Distributed Caching (Redis), CI/CD (GitHub Actions), Docker, System Design',
        applied: false
      }
    ]
  });

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        setAnalyzed(true);
      }, 1000);
    }
  };

  const handleSampleTest = (templateKey = 'vertex') => {
    const sample = templateMockData[templateKey] || mockResumeData;
    setResumeData(sample);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setAnalyzed(true);
    }, 800);
  };

  const handleFixSingleIssue = (id) => {
    setScoreData(prev => {
      const updated = prev.issues.map(iss => iss.id === id ? { ...iss, applied: true } : iss);
      return {
        ...prev,
        totalScore: Math.min(100, prev.totalScore + 5),
        contentScore: Math.min(100, prev.contentScore + 8),
        issues: updated
      };
    });
  };

  const handleApplyAllFixes = () => {
    setScoreData(prev => ({
      ...prev,
      totalScore: 98,
      designScore: 98,
      structureScore: 98,
      contentScore: 98,
      atsScore: 100,
      issues: prev.issues.map(iss => ({ ...iss, applied: true }))
    }));
  };

  const pendingCount = scoreData.issues.filter(i => !i.applied).length;

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AuraHeader />

      <main style={{ flex: 1, padding: '3rem 0 5rem 0' }}>
        <div className="aura-container">
          
          {/* HERO ART & ARCHITECTURAL BANNER WITH FLOWER BRACES */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            border: '1.5px solid var(--border-color)',
            overflow: 'hidden',
            marginBottom: '2.5rem',
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.06)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            alignItems: 'center'
          }}>
            {/* Left Hero Details */}
            <div style={{ padding: '2.5rem 2.5rem 2.5rem 3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.85rem' }}>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  letterSpacing: '0.04em'
                }}>
                  {'{ Platform Services / Engine 02 }'}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '2px 10px',
                  borderRadius: '9999px',
                  background: '#ECFDF5',
                  color: '#059669',
                  fontWeight: 800,
                  border: '1px solid #A7F3D0'
                }}>
                  {'{ 99.4% Pass Rating }'}
                </span>
              </div>

              <h1 style={{
                fontSize: '2.6rem',
                fontWeight: 900,
                color: 'var(--text-main)',
                margin: '0 0 0.85rem 0',
                letterSpacing: '-0.035em',
                lineHeight: 1.15
              }}>
                {'{ ATS Resume Screening & Parser Auditor }'}
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1.75rem 0' }}>
                Simulate Fortune 500 recruitment algorithms (Workday, Greenhouse & Lever) to eliminate parsing traps, fix weak action verbs, and optimize candidate ranking.
              </p>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleSampleTest('vertex')}
                  className="framer-btn-secondary"
                  style={{ padding: '0.65rem 1.3rem', fontSize: '0.85rem' }}
                >
                  <Zap size={15} color="var(--primary)" />
                  <span>{'{ Test Sample Tech Resume }'}</span>
                </button>

                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {'{ 5-Pillar Algorithmic Scoring }'}
                </span>
              </div>
            </div>

            {/* Right Bespoke Art Image Banner */}
            <div style={{ position: 'relative', height: '280px', width: '100%', overflow: 'hidden' }}>
              <img
                src="/images/services/service_ats_scanner.jpg"
                alt="ATS Scanner Visual"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 25%), linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 60%)'
              }} />
              <div style={{ position: 'absolute', bottom: '16px', right: '20px', display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(15,23,42,0.85)', color: '#FFFFFF' }}>
                  {'{ Workday & Lever }'}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(15,23,42,0.85)', color: '#FFFFFF' }}>
                  {'{ 0 Parsing Traps }'}
                </span>
              </div>
            </div>
          </div>

          {/* ── IF NOT ANALYZED: UPLOAD DROPZONE ── */}
          {!analyzed ? (
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  border: isHoveringDropzone ? '2px dashed var(--primary)' : '2px dashed var(--border-color)',
                  padding: '3.5rem 2rem',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-normal)',
                  background: isHoveringDropzone ? 'var(--primary-light)' : '#FFFFFF'
                }}
                onDragOver={(e) => { e.preventDefault(); setIsHoveringDropzone(true); }}
                onDragLeave={() => setIsHoveringDropzone(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsHoveringDropzone(false);
                  setIsScanning(true);
                  setTimeout(() => { setIsScanning(false); setAnalyzed(true); }, 1000);
                }}
              >
                <div style={{
                  width: '64px', height: '64px', borderRadius: '16px',
                  backgroundColor: 'var(--primary-light)', color: 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}>
                  <Upload size={28} />
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.5rem 0' }}>
                  {isScanning ? 'Simulating ATS Parser...' : 'Drop your resume here or browse'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 1.75rem 0' }}>
                  Supports PDF, DOCX, TXT · Verified against 20+ ATS parsing heuristics
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <label className="aura-btn-primary" style={{ padding: '0.8rem 1.75rem', cursor: 'pointer' }}>
                    <span>Select Resume File</span>
                    <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>

                  <button
                    onClick={() => handleSampleTest('vertex')}
                    className="aura-btn-secondary"
                    style={{ padding: '0.8rem 1.5rem' }}
                  >
                    <span>Test Sample Tech Resume</span>
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2rem' }}>
                  <Lock size={13} />
                  <span>Your resume is encrypted and private. Never shared with third parties.</span>
                </div>
              </div>
            </div>
          ) : (
            /* ── IF ANALYZED: 2-COLUMN ATS COCKPIT ── */
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.15fr',
              gap: '2rem',
              alignItems: 'start'
            }}>
              {/* Left Column: Live Document Preview */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
                position: 'sticky',
                top: '90px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Live Document Stream
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <button onClick={() => setPreviewZoom(Math.max(0.35, previewZoom - 0.05))} style={{ border: '1px solid var(--border-color)', background: '#F8FAFC', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <ZoomOut size={13} color="var(--text-muted)" />
                    </button>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', width: '38px', textAlign: 'center' }}>
                      {Math.round(previewZoom * 200)}%
                    </span>
                    <button onClick={() => setPreviewZoom(Math.min(0.7, previewZoom + 0.05))} style={{ border: '1px solid var(--border-color)', background: '#F8FAFC', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <ZoomIn size={13} color="var(--text-muted)" />
                    </button>
                  </div>
                </div>

                <div style={{
                  height: '540px',
                  overflowY: 'auto',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '16px 0'
                }}>
                  <div style={{
                    transform: `scale(${previewZoom})`,
                    transformOrigin: 'top center',
                    width: '794px',
                    height: 'auto',
                    minHeight: '1123px',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                    pointerEvents: 'none'
                  }}>
                    <TemplateRenderer
                      templateId={selectedTemplate || 'vertex'}
                      resumeData={resumeData || mockResumeData}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Score Breakdown & Fix Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Score Card */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{
                        width: '88px', height: '88px', borderRadius: '50%',
                        border: `6px solid ${scoreData.totalScore >= 90 ? 'var(--primary)' : '#F59E0B'}`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}>
                        <span style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1 }}>
                          {scoreData.totalScore}
                        </span>
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)' }}>/100</span>
                      </div>

                      <div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
                          {scoreData.totalScore >= 90 ? 'Top Tier ATS Score' : 'Actionable Fixes Found'}
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                          {pendingCount === 0 ? 'All ATS criteria passed with flying colors.' : `${pendingCount} optimization opportunities detected.`}
                        </p>
                      </div>
                    </div>

                    {pendingCount > 0 && (
                      <button
                        onClick={handleApplyAllFixes}
                        className="aura-btn-primary"
                        style={{ padding: '0.75rem 1.4rem', fontSize: '0.875rem' }}
                      >
                        <Sparkles size={15} />
                        <span>Apply All Fixes</span>
                      </button>
                    )}
                  </div>

                  {/* 3 Progress Bars */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                        <span>Design</span>
                        <span style={{ color: 'var(--primary)' }}>{scoreData.designScore}%</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${scoreData.designScore}%`, height: '100%', backgroundColor: 'var(--primary)' }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                        <span>Structure</span>
                        <span style={{ color: 'var(--primary)' }}>{scoreData.structureScore}%</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${scoreData.structureScore}%`, height: '100%', backgroundColor: 'var(--primary)' }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                        <span>Content</span>
                        <span style={{ color: scoreData.contentScore >= 90 ? 'var(--primary)' : '#F59E0B' }}>{scoreData.contentScore}%</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${scoreData.contentScore}%`, height: '100%', backgroundColor: scoreData.contentScore >= 90 ? 'var(--primary)' : '#F59E0B' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issues List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {scoreData.issues.map(iss => (
                    <div key={iss.id} style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: iss.applied ? '1.5px solid #A7F3D0' : '1.5px solid var(--border-color)',
                      padding: '1.25rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {iss.applied ? <CheckCircle2 size={18} color="#059669" /> : <AlertCircle size={18} color="#F59E0B" />}
                          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>{iss.title}</span>
                        </div>

                        {iss.applied ? (
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '0.15rem 0.55rem', borderRadius: '999px' }}>
                            ✓ Fixed
                          </span>
                        ) : (
                          <button
                            onClick={() => handleFixSingleIssue(iss.id)}
                            className="aura-btn-primary"
                            style={{ padding: '0.35rem 0.85rem', fontSize: '0.78rem' }}
                          >
                            1-Click Fix
                          </button>
                        )}
                      </div>

                      <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 0.65rem 0' }}>
                        {iss.desc}
                      </p>

                      <div style={{
                        backgroundColor: iss.applied ? '#ECFDF5' : '#F8FAFC',
                        borderRadius: '8px',
                        padding: '0.65rem 0.85rem',
                        fontSize: '0.8rem',
                        color: iss.applied ? '#065F46' : 'var(--text-main)',
                        border: '1px solid var(--border-color)'
                      }}>
                        <strong>AI Replacement:</strong> "{iss.recommended}"
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => setAnalyzed(false)}
                    className="aura-btn-secondary"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <Upload size={15} />
                    <span>Upload Another Resume</span>
                  </button>

                  <button
                    onClick={() => navigate('/builder')}
                    className="aura-btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <Edit3 size={15} />
                    <span>Edit in Resume Studio</span>
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-color)', padding: '2.5rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <div className="aura-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>© {new Date().getFullYear()} Aura Resume Platform · ATS Engine</div>
        </div>
      </footer>
    </div>
  );
}
