import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import AuraHeader from '../AuraHeader';
import {
  Wand2, Sparkles, CheckCircle2, ArrowRight, Copy, Check,
  RefreshCw, Zap, TrendingUp, Award, Layers, ChevronRight,
  Briefcase, Code2, Users, Target, Rocket
} from 'lucide-react';

const PRESET_EXAMPLES = [
  {
    domain: 'Software Engineering',
    seniority: 'Senior',
    raw: 'Worked on backend APIs and made database queries faster.',
    enhanced: 'Architected high-throughput microservices using Node.js and PostgreSQL, optimizing database indexing to reduce P99 API response latency by 54% across 2.5M daily active requests.'
  },
  {
    domain: 'Product & Design',
    seniority: 'Lead',
    raw: 'Redesigned the onboarding flow and users liked it more.',
    enhanced: 'Spearheaded user research and comprehensive UX redesign for enterprise onboarding, lifting trial-to-paid customer conversion by 38% and reducing support ticket volume by 45%.'
  },
  {
    domain: 'Marketing & Growth',
    seniority: 'Mid-Level',
    raw: 'Managed email campaigns and grew the subscriber list.',
    enhanced: 'Executed multi-channel lifecycle email automation sequences, scaling active newsletter subscriber base from 12K to 85K+ while sustaining a 42.6% open rate and generating $340K pipeline ARR.'
  },
  {
    domain: 'Sales & Revenue',
    seniority: 'Senior',
    raw: 'Closed sales deals and met quarterly quotas regularly.',
    enhanced: 'Delivered $1.85M in closed-won enterprise SaaS contracts (132% of annual quota), shortening the average B2B deal cycle from 90 days to 48 days through consultative stakeholder mapping.'
  },
  {
    domain: 'Operations & Management',
    seniority: 'Executive',
    raw: 'Led the team and organized weekly sprint meetings.',
    enhanced: 'Orchestrated cross-functional engineering and product sprint operations for a 45-person distributed team, increasing on-time release velocity by 62% and reducing annual employee turnover to under 4%.'
  }
];

const POWER_ACTION_VERBS = [
  'Architected', 'Spearheaded', 'Accelerated', 'Scaled', 'Pioneered',
  'Automated', 'Streamlined', 'Optimized', 'Negotiated', 'Overhauled',
  'Orchestrated', 'Consolidated', 'Standardized', 'Championed', 'Generated'
];

export default function BulletEnhancerPage() {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useResume();

  const [rawInput, setRawInput] = useState(PRESET_EXAMPLES[0].raw);
  const [enhancedOutput, setEnhancedOutput] = useState(PRESET_EXAMPLES[0].enhanced);
  const [seniority, setSeniority] = useState('Senior');
  const [domain, setDomain] = useState('Software Engineering');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleEnhance = () => {
    if (!rawInput.trim()) return;
    setIsEnhancing(true);
    setIsApplied(false);

    setTimeout(() => {
      // Intelligent XYZ synthesis simulation
      const verb = POWER_ACTION_VERBS[Math.floor(Math.random() * POWER_ACTION_VERBS.length)];
      const metric = ['38%', '45%', '52%', '64%', '$1.2M', '3.5x'][Math.floor(Math.random() * 6)];
      setEnhancedOutput(
        `${verb} mission-critical initiatives and modern workflows for ${domain.toLowerCase()} operations, boosting efficiency by ${metric} and reducing operational bottlenecks across sprint delivery cycles.`
      );
      setIsEnhancing(false);
    }, 550);
  };

  const handleSelectPreset = (preset) => {
    setDomain(preset.domain);
    setSeniority(preset.seniority);
    setRawInput(preset.raw);
    setEnhancedOutput(preset.enhanced);
    setIsApplied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(enhancedOutput);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleApplyToResume = () => {
    const next = JSON.parse(JSON.stringify(resumeData));
    if (!Array.isArray(next.experience)) next.experience = [];
    if (next.experience.length === 0) {
      next.experience.push({
        id: 'exp_' + Date.now(),
        company: 'Active Experience',
        title: `${seniority} Specialist`,
        startDate: '2023',
        endDate: 'Present',
        description: `• ${enhancedOutput}`
      });
    } else {
      const currentDesc = next.experience[0].description || '';
      next.experience[0].description = `${currentDesc}\n• ${enhancedOutput}`.trim();
    }
    setResumeData(next);
    setIsApplied(true);
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
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>XYZ Bullet Enhancer</span>
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
                <Wand2 size={15} />
                <span>{'{ Platform Services / Engine 03 }'}</span>
              </div>

              <h1 style={{
                fontSize: '2.8rem',
                fontWeight: 900,
                color: 'var(--text-main)',
                letterSpacing: '-0.035em',
                lineHeight: 1.15,
                margin: '0 0 1rem 0'
              }}>
                {'{ AI XYZ Bullet Impact Studio }'}
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
                Stop describing boring day-to-day duties. Transform passive tasks into persuasive, data-backed accomplishment statements formatted with the gold-standard Google XYZ rule: <em>"Accomplished [X], as measured by [Y], by doing [Z]"</em>.
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ Quantified Metrics }'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ Seniority-Tuned }'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ 1-Click Draft Merge }'}</span>
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
                  src="/images/services/service_bullet_enhancer.jpg"
                  alt="Google XYZ Impact Studio Visual"
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
                    {'{ The Google XYZ Formula }'}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, marginTop: '2px' }}>
                    "Accomplished [X], as measured by [Y], by doing [Z]"
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

              {/* Seniority & Domain Config Strip */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '1.5rem',
                marginBottom: '2rem',
                borderBottom: '1px solid var(--border-color)',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                {/* Domain Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Target Field:</span>
                  {['Software Engineering', 'Product & Design', 'Marketing & Growth', 'Sales & Revenue', 'Operations'].map((dom) => (
                    <button
                      key={dom}
                      onClick={() => setDomain(dom)}
                      style={{
                        padding: '0.35rem 0.8rem',
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: domain === dom ? 'var(--primary)' : 'var(--border-color)',
                        backgroundColor: domain === dom ? 'var(--primary-light)' : '#FFFFFF',
                        color: domain === dom ? 'var(--primary)' : 'var(--text-main)',
                        fontSize: '0.8rem',
                        fontWeight: domain === dom ? 800 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {dom}
                    </button>
                  ))}
                </div>

                {/* Seniority Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Level:</span>
                  {['Junior', 'Mid-Level', 'Senior', 'Lead/Exec'].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSeniority(lvl)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: seniority === lvl ? 'var(--primary)' : 'var(--border-color)',
                        backgroundColor: seniority === lvl ? 'var(--primary-light)' : '#FFFFFF',
                        color: seniority === lvl ? 'var(--primary)' : 'var(--text-main)',
                        fontSize: '0.8rem',
                        fontWeight: seniority === lvl ? 800 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Power Action Verb Pills */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Click Action Verb to Inject:
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {POWER_ACTION_VERBS.map((v) => (
                    <button
                      key={v}
                      onClick={() => setRawInput(`${v} ` + rawInput.replace(/^(Architected|Spearheaded|Accelerated|Scaled|Pioneered|Automated|Streamlined|Optimized|Negotiated|Overhauled|Orchestrated|Consolidated|Standardized|Championed|Generated)\s+/i, ''))}
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        color: 'var(--text-main)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.12s ease'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.color = 'var(--text-main)'; }}
                    >
                      + {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2-Column Split: Raw Input (Left) vs High-Impact Rewritten Output (Right) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '2.5rem',
                alignItems: 'start'
              }}>

                {/* Left: Input Box */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      1. Enter Your Routine Task / Weak Bullet:
                    </label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {rawInput.length} chars
                    </span>
                  </div>

                  <textarea
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    rows={4}
                    placeholder="e.g. Helped with website frontend and fixed various bugs..."
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '14px',
                      border: '1.5px solid var(--border-color)',
                      fontSize: '0.92rem',
                      fontFamily: 'inherit',
                      lineHeight: 1.55,
                      color: 'var(--text-main)',
                      backgroundColor: '#FFFFFF',
                      resize: 'vertical',
                      outline: 'none',
                      boxSizing: 'border-box',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  />

                  {/* Preset Selector Chips */}
                  <div style={{ marginTop: '1.25rem' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      Or Try Real-World Presets:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {PRESET_EXAMPLES.map((p, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSelectPreset(p)}
                          style={{
                            padding: '0.55rem 0.85rem',
                            borderRadius: '10px',
                            backgroundColor: rawInput === p.raw ? 'var(--primary-light)' : '#F8FAFC',
                            border: '1px solid',
                            borderColor: rawInput === p.raw ? 'var(--primary-border)' : 'var(--border-color)',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            color: rawInput === p.raw ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: 600,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <span>{p.domain} ({p.seniority})</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Load Example →</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleEnhance}
                    disabled={isEnhancing}
                    className="aura-btn-primary"
                    style={{ marginTop: '1.5rem', width: '100%', padding: '0.9rem', fontSize: '0.95rem', justifyContent: 'center' }}
                  >
                    {isEnhancing ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    <span>{isEnhancing ? 'Rewriting with XYZ Formula...' : 'Synthesize High-Impact Bullet'}</span>
                  </button>
                </div>

                {/* Right: AI XYZ Output & Action Bar */}
                <div style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '20px',
                  border: '1.5px solid var(--border-color)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '380px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--primary)', fontWeight: 800, fontSize: '0.9rem' }}>
                        <Zap size={16} />
                        <span>Google XYZ Quantified Output</span>
                      </div>

                      <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '6px', backgroundColor: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0' }}>
                        High Recruiter Impact
                      </span>
                    </div>

                    {/* Enhanced Statement Box */}
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid var(--primary-border)',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      fontSize: '0.95rem',
                      color: 'var(--text-main)',
                      fontWeight: 600,
                      lineHeight: 1.65,
                      boxShadow: 'var(--shadow-sm)',
                      marginBottom: '1.25rem'
                    }}>
                      "{enhancedOutput}"
                    </div>

                    {/* Formula Breakdown Legend */}
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      padding: '1rem',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.45rem',
                      fontSize: '0.78rem'
                    }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                        <span style={{ color: 'var(--text-muted)' }}><strong>[X] What you achieved:</strong> Led / Built scalable framework</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#059669' }} />
                        <span style={{ color: 'var(--text-muted)' }}><strong>[Y] Measured by:</strong> Quantifiable metric (%, $, users, time saved)</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#7C3AED' }} />
                        <span style={{ color: 'var(--text-muted)' }}><strong>[Z] By doing:</strong> Technologies, tools, architecture, methodology</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Copy & Merge */}
                  <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={handleCopy}
                        className="aura-btn-secondary"
                        style={{ flex: 1, padding: '0.75rem', fontSize: '0.88rem', justifyContent: 'center' }}
                      >
                        {isCopied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
                        <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Statement'}</span>
                      </button>

                      <button
                        onClick={handleApplyToResume}
                        disabled={isApplied}
                        className="aura-btn-primary"
                        style={{ flex: 1.2, padding: '0.75rem', fontSize: '0.88rem', justifyContent: 'center' }}
                      >
                        {isApplied ? <Check size={16} /> : <Zap size={16} />}
                        <span>{isApplied ? 'Merged into Resume!' : 'Merge to Active Resume'}</span>
                      </button>
                    </div>

                    {isApplied && (
                      <div style={{ textAlign: 'center', marginTop: '0.25rem' }}>
                        <span
                          onClick={() => navigate('/builder')}
                          style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          View updated resume in Builder Studio →
                        </span>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
