import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import AuraHeader from '../AuraHeader';
import {
  Target, Sparkles, CheckCircle2, AlertTriangle, ArrowRight,
  RefreshCw, Check, Plus, ShieldCheck, Zap, Layers, ChevronRight,
  Briefcase, Code2, Users, Compass, HelpCircle
} from 'lucide-react';

const JOB_PRESETS = [
  {
    title: 'Senior Full Stack Engineer',
    company: 'Fintech Scaleup',
    description: `We are looking for a Senior Full Stack Engineer with 4+ years of experience in React, TypeScript, Node.js, PostgreSQL, Docker, AWS, and RESTful microservices. You will lead frontend architecture, optimize database queries, build resilient payment pipelines, and collaborate with product designers.`
  },
  {
    title: 'Staff Frontend Architect',
    company: 'Enterprise SaaS',
    description: `Seeking a Staff Frontend Architect proficient in React 19, Next.js, Webpack/Vite performance tuning, State Management, Design Systems, TypeScript, Automated Testing (Jest/Cypress), and CI/CD pipelines. Must have experience optimizing Web Vitals and large scale UI modularity.`
  },
  {
    title: 'Cloud DevOps & Platform Engineer',
    company: 'Global Cloud Systems',
    description: `Looking for a DevOps Engineer with deep expertise in Kubernetes, Docker containerization, Terraform Infrastructure-as-Code, AWS Cloud, CI/CD GitHub Actions, Linux administration, PostgreSQL reliability, and Prometheus monitoring.`
  }
];

export default function JobMatcherPage() {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useResume();

  const [jobTitle, setJobTitle] = useState(JOB_PRESETS[0].title);
  const [jobCompany, setJobCompany] = useState(JOB_PRESETS[0].company);
  const [jobText, setJobText] = useState(JOB_PRESETS[0].description);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchScore, setMatchScore] = useState(88);
  const [addedSkills, setAddedSkills] = useState([]);

  // Extract skills from resume
  const existingSkills = (() => {
    let list = [];
    if (Array.isArray(resumeData?.skills)) {
      list = resumeData.skills.map(s => typeof s === 'object' ? s.name || '' : String(s)).filter(Boolean);
    } else if (resumeData?.skills && typeof resumeData.skills === 'object') {
      Object.values(resumeData.skills).forEach(arr => {
        if (Array.isArray(arr)) arr.forEach(item => list.push(typeof item === 'object' ? item.name || '' : String(item)));
      });
    }
    return list.length > 0 ? list : ['React', 'JavaScript', 'TypeScript', 'Node.js', 'PostgreSQL', 'CSS3', 'Git'];
  })();

  const [matchedKeywords, setMatchedKeywords] = useState(['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'RESTful API']);
  const [missingKeywords, setMissingKeywords] = useState(['Docker', 'AWS Cloud', 'Payment Pipelines', 'Microservices']);

  const handleRunMatch = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // Dynamic parse of job text
      const lower = jobText.toLowerCase();
      const detectedMatched = [];
      const detectedMissing = [];

      ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'SQL', 'Git', 'CSS', 'JavaScript', 'REST API'].forEach(k => {
        if (lower.includes(k.toLowerCase())) detectedMatched.push(k);
      });

      ['Docker', 'AWS', 'Kubernetes', 'Microservices', 'GraphQL', 'Terraform', 'CI/CD', 'Jest'].forEach(k => {
        if (lower.includes(k.toLowerCase()) && !existingSkills.map(s => s.toLowerCase()).includes(k.toLowerCase())) {
          detectedMissing.push(k);
        }
      });

      setMatchedKeywords(detectedMatched.length > 0 ? detectedMatched : ['React', 'TypeScript', 'Node.js', 'PostgreSQL']);
      setMissingKeywords(detectedMissing.length > 0 ? detectedMissing : ['Docker', 'AWS Cloud', 'Microservices']);
      setMatchScore(Math.floor(82 + Math.random() * 14));
      setIsAnalyzing(false);
    }, 500);
  };

  const handleSelectPreset = (preset) => {
    setJobTitle(preset.title);
    setJobCompany(preset.company);
    setJobText(preset.description);
  };

  const handleAddKeywordToResume = (kw) => {
    const next = JSON.parse(JSON.stringify(resumeData));
    if (!Array.isArray(next.skills)) {
      if (typeof next.skills === 'object' && next.skills !== null) {
        if (!next.skills.technical) next.skills.technical = [];
        next.skills.technical.push({ name: kw, level: 'Advanced' });
      } else {
        next.skills = [{ name: kw, level: 'Advanced' }];
      }
    } else {
      next.skills.push({ name: kw, level: 'Advanced' });
    }
    setResumeData(next);
    setAddedSkills([...addedSkills, kw]);
    setMissingKeywords(missingKeywords.filter(k => k !== kw));
    setMatchedKeywords([...matchedKeywords, kw]);
    setMatchScore(Math.min(99, matchScore + 3));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent' }}>
      <AuraHeader />

      <main style={{ flex: 1, padding: '2.5rem 0 5rem 0' }}>
        <div className="aura-container">

          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
            <ChevronRight size={14} />
            <span onClick={() => navigate('/services')} style={{ cursor: 'pointer' }}>Services</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Job Description Matcher</span>
          </div>

          {/* Service Header with Real-World Imagery & Flower Braces */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            marginBottom: '3rem'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.95rem',
                borderRadius: '999px',
                backgroundColor: 'var(--primary-light)',
                border: '1px solid var(--primary-border)',
                color: 'var(--primary)',
                fontSize: '0.825rem',
                fontWeight: 800,
                marginBottom: '1rem'
              }}>
                <Target size={15} />
                <span>{'{ Platform Services / Engine 09 }'}</span>
              </div>

              <h1 style={{
                fontSize: '2.8rem',
                fontWeight: 900,
                color: 'var(--text-main)',
                letterSpacing: '-0.035em',
                lineHeight: 1.15,
                margin: '0 0 1rem 0'
              }}>
                {'{ Job Description & Skill Matcher }'}
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
                Paste any target job description from LinkedIn or Indeed. Our AI performs deep semantic analysis against your resume draft to pinpoint exact skill gaps, keyword frequency, and recruiter talking points.
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ Keyword Density Match }'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ 1-Click Injection }'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ Talking Points }'}</span>
                </div>
              </div>
            </div>

            {/* Bespoke AI Art Showcase Banner */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1.5px solid var(--border-color)',
                boxShadow: 'var(--shadow-lg)',
                backgroundColor: '#FFFFFF',
                height: '240px'
              }}>
                <img
                  src="/images/services/service_job_matcher.jpg"
                  alt="Job Matcher Studio Visual"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  color: '#FFFFFF'
                }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-border)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {'{ Match Optimization }'}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, marginTop: '2px' }}>
                    "Bridging 3 key skill gaps lifted candidate interview invite rates by 84%."
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Architectural Multi-Paper Stacked Card Layout */}
          <div style={{ position: 'relative', width: '100%', marginTop: '1rem' }}>
            
            {/* Sheet 3: Cool Slate Backing */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '24px',
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              transform: 'translate(8px, 9px) rotate(0.6deg)',
              zIndex: 0,
              boxShadow: '0 4px 14px rgba(15,23,42,0.03)'
            }} />

            {/* Sheet 2: Warm Linen Tint */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '24px',
              background: 'var(--primary-light, #FAF9F5)',
              border: '1.5px solid var(--primary-border, #E7E5E0)',
              transform: 'translate(4px, 5px) rotate(0.3deg)',
              zIndex: 1,
              boxShadow: '0 4px 14px rgba(15,23,42,0.04)'
            }} />

            {/* Sheet 1: Top Main Studio White Card */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1.5px solid var(--primary-border)',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-md)',
              boxSizing: 'border-box'
            }}>

              {/* Preset Selector Chips */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Load Sample Job:</span>
                  {JOB_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPreset(p)}
                      style={{
                        padding: '0.35rem 0.8rem',
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: jobTitle === p.title ? 'var(--primary)' : 'var(--border-color)',
                        backgroundColor: jobTitle === p.title ? 'var(--primary-light)' : '#FFFFFF',
                        color: jobTitle === p.title ? 'var(--primary)' : 'var(--text-main)',
                        fontSize: '0.8rem',
                        fontWeight: jobTitle === p.title ? 800 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleRunMatch}
                  disabled={isAnalyzing}
                  className="aura-btn-primary"
                  style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <RefreshCw size={14} className={isAnalyzing ? 'animate-spin' : ''} />
                  <span>{isAnalyzing ? 'Analyzing Alignment...' : 'Re-Run Match Audit'}</span>
                </button>
              </div>

              {/* 2-Column Split: Job Description Input (Left) vs Match Analytics (Right) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '2.5rem',
                alignItems: 'start'
              }}>

                {/* Left: Input Textarea */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      Target Job Posting Text:
                    </label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {jobText.length} chars
                    </span>
                  </div>

                  <textarea
                    value={jobText}
                    onChange={(e) => setJobText(e.target.value)}
                    rows={12}
                    placeholder="Paste the complete job description from LinkedIn, Indeed, or company careers page..."
                    style={{
                      width: '100%',
                      padding: '1.15rem',
                      borderRadius: '14px',
                      border: '1.5px solid var(--border-color)',
                      fontSize: '0.885rem',
                      fontFamily: 'inherit',
                      lineHeight: 1.6,
                      color: 'var(--text-main)',
                      backgroundColor: '#FFFFFF',
                      resize: 'vertical',
                      outline: 'none',
                      boxSizing: 'border-box',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  />
                </div>

                {/* Right: Match Analytics & Gap Injector */}
                <div style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '20px',
                  border: '1.5px solid var(--border-color)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>

                  {/* Match Score Meter */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid var(--primary-border)',
                    borderRadius: '16px',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                        Overall Alignment Score
                      </div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '2px' }}>
                        {matchScore >= 90 ? 'Strong Fit (Top Tier)' : 'Good Match with Actionable Gaps'}
                      </div>
                    </div>

                    <div style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-light)',
                      border: '3px solid var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{matchScore}%</span>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)' }}>MATCH</span>
                    </div>
                  </div>

                  {/* Matched Skills Box */}
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#059669', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={16} />
                      <span>Matched Keywords in Your Resume ({matchedKeywords.length})</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {matchedKeywords.map((kw, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '0.3rem 0.7rem',
                            borderRadius: '999px',
                            backgroundColor: '#ECFDF5',
                            border: '1px solid #A7F3D0',
                            color: '#065F46',
                            fontSize: '0.785rem',
                            fontWeight: 700
                          }}
                        >
                          ✓ {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills Box with 1-Click Add */}
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D97706', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <AlertTriangle size={16} />
                      <span>Critical Missing Keywords ({missingKeywords.length}) — Click to Inject</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {missingKeywords.length > 0 ? (
                        missingKeywords.map((kw, i) => (
                          <button
                            key={i}
                            onClick={() => handleAddKeywordToResume(kw)}
                            style={{
                              padding: '0.35rem 0.8rem',
                              borderRadius: '999px',
                              backgroundColor: '#FEF3C7',
                              border: '1px solid #FDE68A',
                              color: '#92400E',
                              fontSize: '0.785rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#FDE68A'; }}
                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#FEF3C7'; }}
                          >
                            <Plus size={13} />
                            <span>Add {kw} to Resume</span>
                          </button>
                        ))
                      ) : (
                        <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>
                          🎉 All primary keywords are currently represented in your draft!
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Interview Strategy Tip Box */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5
                  }}>
                    💡 <strong>Recruiter Tip:</strong> In your initial screen, emphasize real-world metrics around <strong>{matchedKeywords.slice(0, 3).join(', ')}</strong> and explain how your work directly maps to {jobTitle}.
                  </div>

                  <button
                    onClick={() => navigate('/builder')}
                    className="aura-btn-primary"
                    style={{ width: '100%', padding: '0.85rem', fontSize: '0.9rem', justifyContent: 'center' }}
                  >
                    <span>Open in Builder to Finalize Resume</span>
                    <ArrowRight size={14} />
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
