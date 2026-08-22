import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuraHeader from '../AuraHeader';
import {
  ShieldCheck, Wand2, FileText, Target, Globe, HeartHandshake,
  Award, Compass, Sparkles, CheckCircle2, ArrowRight, Layers,
  ChevronRight, Star, Users
} from 'lucide-react';

export const PLATFORM_SERVICES = [
  {
    id: 'text-to-resume',
    route: '/services/text-to-resume',
    title: 'AI Text & Notes to Resume Architect',
    badge: 'Raw Text to Template',
    icon: Sparkles,
    image: '/images/services/service_text_architect.jpg',
    tagline: 'Paste raw notes, bio, or upload files (.txt, .md, .pdf, .docx). AI polishes XYZ action bullets and auto-fills your template.',
    capabilities: [
      'Transforms unstructured career notes, bio, or job dump into structured resume data',
      'Refines bullets into Google XYZ / STAR format with realistic quantifiable metrics',
      '1-Click auto-fill into your chosen template with direct launch into Resume Studio'
    ]
  },
  {
    id: 'ats-scanner',
    route: '/services/ats-scanner',
    title: 'ATS Screening & Parser Auditor',
    badge: '99.4% Pass Rate',
    icon: ShieldCheck,
    image: '/images/services/service_ats_scanner.jpg',
    tagline: 'Simulate corporate ATS screeners (Workday & Lever) and fix parsing traps.',
    capabilities: [
      'Simulate Workday, Greenhouse & Lever parser algorithms',
      '0-100 real-time grade with 5 core screening pillars',
      '1-Click auto-fix to merge suggestions into active resume'
    ]
  },
  {
    id: 'bullet-enhancer',
    route: '/services/bullet-enhancer',
    title: 'AI XYZ Bullet Impact Studio',
    badge: 'Google XYZ Formula',
    icon: Wand2,
    image: '/images/services/service_bullet_enhancer.jpg',
    tagline: 'Transform routine duties into quantified high-salary achievement statements.',
    capabilities: [
      'Google XYZ formula: Accomplished [X], measured by [Y], by doing [Z]',
      'Seniority & domain presets with action verb vault',
      '1-Click merge to your active resume draft'
    ]
  },
  {
    id: 'website-builder',
    route: '/services/website-builder',
    title: 'Personal Portfolio Website Builder',
    badge: '1-Click Hosted Web',
    icon: Globe,
    image: '/images/services/service_portfolio_builder.jpg',
    tagline: 'Turn your resume into a live personal portfolio website indexed on Google.',
    capabilities: [
      'Automatic sync with your active resume details and skills',
      'Custom subdomains, theme presets, and mobile-responsive layout',
      'Shareable link with integrated contact mailer'
    ]
  },
  {
    id: 'cover-letter',
    route: '/services/cover-letter',
    title: 'AI Tailored Cover Letter Architect',
    badge: '4 Tone Profiles',
    icon: FileText,
    image: '/images/services/service_cover_letter.jpg',
    tagline: 'Generate bespoke cover letters tailored to your target company and role in seconds.',
    capabilities: [
      'Target company, hiring manager & role-specific tailoring',
      'Executive, Confident, Creative, or Technical tone presets',
      'Live letterhead preview with clean print & PDF export'
    ]
  },
  {
    id: 'career-map',
    route: '/services/career-map',
    title: 'AI Career Path & Promotion Map',
    badge: 'Salary Trajectories',
    icon: Compass,
    image: '/images/services/service_career_map.jpg',
    tagline: 'Explore upward career moves, salary benchmarks, and missing skills to unlock.',
    capabilities: [
      'Step-by-step career progression milestones and timeframes',
      'Real compensation market data from $120k to $450k+',
      '1-Click bullet rewriter integration for your next target tier'
    ]
  },
  {
    id: 'resignation-letter',
    route: '/services/resignation-letter',
    title: 'AI Resignation Letter Generator',
    badge: 'Graceful Notice',
    icon: HeartHandshake,
    image: '/images/services/service_resignation_letter.jpg',
    tagline: 'Generate polite, professional resignation letters leaving all bridges unburned.',
    capabilities: [
      'Custom manager name, company, and notice period inputs',
      'Warm & Grateful, Short & Direct, or Executive formal styles',
      'Instant formatted text copy and high-DPI print export'
    ]
  },
  {
    id: 'proofreading',
    route: '/services/proofreading',
    title: 'Certified CPRW Human Proofreading',
    badge: 'HR Expert Review',
    icon: Award,
    image: '/images/services/service_human_proofreading.jpg',
    tagline: 'Line-by-line review by certified CPRW / PARWCC recruiters with 24h turnaround.',
    capabilities: [
      'Line-by-line grammar, active voice, and metric audit',
      'Direct domain focus: Tech, Executive, or Business',
      'Fast 12h or 24h turnaround with verified CPRW certification'
    ]
  },
  {
    id: 'job-matcher',
    route: '/services/job-matcher',
    title: 'Job Description & Skill Matcher',
    badge: 'Keyword Matcher',
    icon: Target,
    image: '/images/services/service_job_matcher.jpg',
    tagline: 'Paste any job posting to audit keyword density and bridge missing qualifications.',
    capabilities: [
      'Semantic keyword matching against your active draft',
      'Matched vs missing skills breakdown checklist',
      '1-Click keyword injection into resume skills'
    ]
  }
];

export default function ServicesHubPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [spotlightPrompt, setSpotlightPrompt] = useState('');

  const categories = [
    { id: 'all', label: 'All 8 Engines', count: 8 },
    { id: 'generation', label: 'AI Generation & Writing', count: 3 },
    { id: 'audit', label: 'ATS & Screening Audits', count: 3 },
    { id: 'career', label: 'Career Growth & Web', count: 2 }
  ];

  const categorizedServices = PLATFORM_SERVICES.filter(service => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'generation') return ['text-to-resume', 'bullet-enhancer', 'cover-letter'].includes(service.id);
    if (activeCategory === 'audit') return ['ats-scanner', 'proofreading', 'job-matcher'].includes(service.id);
    if (activeCategory === 'career') return ['website-builder', 'career-map', 'resignation-letter'].includes(service.id);
    return true;
  });

  const flagshipService = PLATFORM_SERVICES[0]; // Text to Resume Architect

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AuraHeader />

      <main style={{ flex: 1, padding: '3.5rem 0 6rem 0' }}>
        <div className="aura-container">
          
          {/* Header Banner with Flower Braces */}
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              color: 'var(--primary)',
              fontSize: '0.825rem',
              fontWeight: 800,
              marginBottom: '1.25rem',
              border: '1px solid var(--primary-border)',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.12)'
            }}>
              <Sparkles size={14} />
              <span>{'{ Next-Gen Career Intelligence Platform }'}</span>
            </div>
            
            <h1 style={{
              fontSize: '3.4rem',
              fontWeight: 900,
              color: 'var(--text-main)',
              margin: '0 0 1rem 0',
              letterSpacing: '-0.04em',
              lineHeight: 1.1
            }}>
              {'{ The 8 Specialized AI Career Engines }'}
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', margin: '0 auto', maxWidth: '640px', lineHeight: 1.6 }}>
              From raw notes to executive resumes, ATS scoring, and Google-indexed portfolio websites.
            </p>

            {/* Interactive Category Filter Pills */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '6px',
              borderRadius: '9999px',
              border: '1px solid var(--border-color)',
              gap: '6px',
              marginTop: '2.25rem',
              boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '0.55rem 1.25rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: activeCategory === cat.id ? '#0F172A' : 'transparent',
                    color: activeCategory === cat.id ? '#FFFFFF' : 'var(--text-muted)',
                    boxShadow: activeCategory === cat.id ? '0 4px 12px rgba(15, 23, 42, 0.25)' : 'none'
                  }}
                >
                  {`{ ${cat.label} (${cat.count}) }`}
                </button>
              ))}
            </div>
          </div>

          {/* HERO FLAGSHIP SERVICE SPOTLIGHT (Asymmetric 2-Column Showcase) */}
          {activeCategory === 'all' && (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '28px',
              border: '1.5px solid var(--primary-border)',
              padding: '2.75rem',
              marginBottom: '3.5rem',
              boxShadow: '0 20px 50px -15px rgba(99, 102, 241, 0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Radial Light Glow */}
              <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '3rem',
                alignItems: 'center'
              }}>
                {/* Left: Engine Details & Live Interactive Tester */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      border: '1px solid var(--primary-border)'
                    }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                      Flagship #1 Engine · 120B Model
                    </span>
                  </div>

                  <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 0.85rem 0', letterSpacing: '-0.03em' }}>
                    {flagshipService.title}
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, margin: '0 0 1.75rem 0' }}>
                    {flagshipService.tagline}
                  </p>

                  {/* Interactive Quick Try Input */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '14px',
                    padding: '0.5rem 0.6rem 0.5rem 1rem',
                    border: '1.5px solid var(--border-color)',
                    marginBottom: '1.5rem',
                    gap: '0.5rem'
                  }}>
                    <input
                      type="text"
                      value={spotlightPrompt}
                      onChange={e => setSpotlightPrompt(e.target.value)}
                      placeholder="Paste quick raw notes (e.g. 4 yrs React, scaled APIs 50%, led 6 devs)..."
                      style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        fontSize: '0.9rem',
                        color: 'var(--text-main)',
                        fontWeight: 600
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          navigate(`/services/text-to-resume?prompt=${encodeURIComponent(spotlightPrompt || 'Senior Full Stack Engineer')}`);
                        }
                      }}
                    />
                    <button
                      onClick={() => navigate(`/services/text-to-resume?prompt=${encodeURIComponent(spotlightPrompt || 'Senior Full Stack Engineer')}`)}
                      className="framer-btn-shimmer"
                      style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                    >
                      <span>Auto-Build</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>

                  {/* Capabilities List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {flagshipService.capabilities.map((cap, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Rich AI Visual Preview Banner */}
                <div style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 16px 36px rgba(15, 23, 42, 0.1)'
                }}>
                  <img
                    src={flagshipService.image}
                    alt={flagshipService.title}
                    style={{
                      width: '100%',
                      height: '320px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 60%)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    right: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.1rem' }}>Instant Template Compilation</div>
                      <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.825rem' }}>Transforms unstructured career data into 24 executive designs</div>
                    </div>
                    <button
                      onClick={() => navigate(flagshipService.route)}
                      className="framer-btn-primary"
                      style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                    >
                      <span>Open Engine</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Grid of Services */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '2.25rem'
          }}>
            {categorizedServices.map(service => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  onClick={() => navigate(service.route)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    border: '1.5px solid var(--border-color)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = 'var(--primary-border)';
                    e.currentTarget.style.boxShadow = '0 24px 48px -12px rgba(15, 23, 42, 0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(15, 23, 42, 0.04)';
                  }}
                >
                  {/* Service Image Banner with Badge */}
                  {service.image && (
                    <div style={{
                      position: 'relative',
                      height: '180px',
                      width: '100%',
                      overflow: 'hidden',
                      backgroundColor: '#0F172A'
                    }}>
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, transparent 65%)'
                      }} />
                      <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <div style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(8px)',
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}>
                          <Icon size={18} />
                        </div>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          padding: '0.3rem 0.75rem',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(15, 23, 42, 0.85)',
                          backdropFilter: 'blur(8px)',
                          color: '#FFFFFF',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                          {`{ ${service.badge} }`}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Body Content */}
                  <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
                        {`{ ${service.title} }`}
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: '0 0 1.25rem 0' }}>
                        {service.tagline}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.75rem' }}>
                        {service.capabilities.map((cap, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-main)', fontWeight: 500 }}>
                            <CheckCircle2 size={14} color="var(--primary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Framer Shimmer Launch Button */}
                    <button
                      className="framer-btn-shimmer"
                      style={{ width: '100%', padding: '0.8rem 1.4rem' }}
                    >
                      <span>{`{ Launch ${service.title.split(' ')[0]} Engine }`}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-color)', padding: '2.5rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <div className="aura-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>© {new Date().getFullYear()} Aura Resume Platform · 8 Specialized AI Engines</div>
          <div style={{ display: 'flex', gap: '1.5rem', fontWeight: 600 }}>
            <span onClick={() => navigate('/services/text-to-resume')} style={{ cursor: 'pointer', color: 'var(--primary)' }}>AI Text Importer</span>
            <span onClick={() => navigate('/services/ats-scanner')} style={{ cursor: 'pointer', color: 'var(--primary)' }}>ATS Auditor</span>
            <span onClick={() => navigate('/services/website-builder')} style={{ cursor: 'pointer', color: 'var(--primary)' }}>Portfolio Web</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
