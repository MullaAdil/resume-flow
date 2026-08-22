import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import AuraHeader from '../AuraHeader';
import {
  FileText, Sparkles, CheckCircle2, ArrowRight, Copy, Check,
  Download, Printer, RefreshCw, Sliders, ChevronRight, Building,
  Briefcase, User, Mail, Send, Award, Heart
} from 'lucide-react';

const TONES = [
  { id: 'professional', label: 'Professional & Confident', desc: 'Authoritative, balanced, and achievement-focused' },
  { id: 'executive', label: 'Executive Strategic', desc: 'High-level organizational scale, vision, and P&L impact' },
  { id: 'creative', label: 'Creative & Dynamic', desc: 'Passionate, user-centric, and culture-aligned' },
  { id: 'technical', label: 'Technical & Precise', desc: 'Deep technical stack, architecture, and systems focus' },
];

export default function CoverLetterPage() {
  const navigate = useNavigate();
  const { resumeData } = useResume();

  const [applicantName, setApplicantName] = useState(resumeData?.personalInfo?.fullName || 'Alex Sterling');
  const [applicantEmail, setApplicantEmail] = useState(resumeData?.personalInfo?.email || 'alex.sterling@example.com');
  const [applicantPhone, setApplicantPhone] = useState(resumeData?.personalInfo?.phone || '+1 (555) 019-2834');
  const [targetCompany, setTargetCompany] = useState('Stripe');
  const [targetRole, setTargetRole] = useState(resumeData?.personalInfo?.jobTitle || 'Senior Full-Stack Architect');
  const [hiringManager, setHiringManager] = useState('Hiring Team');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [keySkillsEmphasized, setKeySkillsEmphasized] = useState('React, TypeScript, Microservices, Cloud Architecture');
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [generatedLetter, setGeneratedLetter] = useState(`Dear ${hiringManager || 'Hiring Team'} at ${targetCompany || 'the team'},

I am writing to express my strong enthusiasm for the ${targetRole || 'open position'} role at ${targetCompany || 'your organization'}. With a proven track record of architecting high-scale web platforms and accelerating release cycles, I have consistently delivered high-impact engineering initiatives that drive customer satisfaction and bottom-line revenue.

Throughout my career, I have specialized in ${keySkillsEmphasized || 'modern engineering and scalable architecture'}. In my recent roles, I spearheaded core platform migrations that decreased system latency by 38% and scaled services to handle over 2.5M daily active requests with 99.9% uptime. What excites me most about ${targetCompany} is your relentless commitment to product excellence and developer-first design.

I would welcome the opportunity to discuss how my technical expertise, cross-functional leadership, and passion for reliable systems can contribute to ${targetCompany}'s continued growth. Thank you for your time and consideration.

Warm regards,

${applicantName || 'Alex Sterling'}
${applicantEmail || ''} · ${applicantPhone || ''}`);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let toneOpening = `I am writing with high excitement to apply for the ${targetRole} position at ${targetCompany}.`;
      let toneBody = `With extensive hands-on expertise in ${keySkillsEmphasized}, I have led multi-disciplinary engineering initiatives that eliminated technical debt and improved product scalability by over 40%.`;
      
      if (selectedTone === 'executive') {
        toneOpening = `I am writing to submit my candidacy for the ${targetRole} role at ${targetCompany}, bringing 8+ years of strategic leadership and proven execution.`;
        toneBody = `Throughout my tenure directing technical teams, I have aligned product roadmaps with commercial revenue targets, scaling distributed architectures and reducing operating expenditures by $450K+ annually while sustaining rapid innovation.`;
      } else if (selectedTone === 'creative') {
        toneOpening = `When I saw the opening for ${targetRole} at ${targetCompany}, I immediately recognized a rare synergy between your ambitious design culture and my passion for building intuitive, delightful user experiences.`;
        toneBody = `I believe extraordinary products happen at the intersection of robust code and human-centered design. Using ${keySkillsEmphasized}, I have transformed complex workflows into seamless, high-retention interfaces loved by thousands of users.`;
      } else if (selectedTone === 'technical') {
        toneOpening = `I am pleased to present my application for the ${targetRole} position at ${targetCompany}.`;
        toneBody = `My core engineering domain centers on ${keySkillsEmphasized}. I have designed fault-tolerant microservices, streamlined CI/CD pipelines, and optimized PostgreSQL databases to support high-throughput production workloads with sub-50ms query latency.`;
      }

      const letter = `Dear ${hiringManager || 'Hiring Team'} at ${targetCompany},

${toneOpening}

${toneBody} ${targetCompany}'s market leadership and dedication to high-caliber engineering make this opportunity an ideal fit for my technical capabilities.

I look forward to discussing how my experience delivering resilient, user-centric software can accelerate your team's upcoming roadmap milestones. Thank you for your review and consideration.

Sincerely,

${applicantName}
${applicantEmail} · ${applicantPhone}`;

      setGeneratedLetter(letter);
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Cover Letter - ${applicantName} - ${targetCompany}</title>
          <style>
            body { font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; padding: 40px; color: #0F172A; line-height: 1.6; max-width: 750px; margin: 0 auto; }
            h1 { font-size: 24px; margin-bottom: 4px; color: #0F172A; }
            .meta { font-size: 14px; color: #64748B; margin-bottom: 24px; border-bottom: 2px solid #E2E8F0; padding-bottom: 12px; }
            .content { white-space: pre-wrap; font-size: 15px; }
          </style>
        </head>
        <body>
          <h1>${applicantName}</h1>
          <div class="meta">${applicantEmail} · ${applicantPhone} | Target Role: ${targetRole} at ${targetCompany}</div>
          <div class="content">${generatedLetter}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
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
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Cover Letter Architect</span>
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
                <FileText size={15} />
                <span>{'{ Platform Services / Engine 05 }'}</span>
              </div>

              <h1 style={{
                fontSize: '2.8rem',
                fontWeight: 900,
                color: 'var(--text-main)',
                letterSpacing: '-0.035em',
                lineHeight: 1.15,
                margin: '0 0 1rem 0'
              }}>
                {'{ AI Tailored Cover Letter Architect }'}
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
                Generic cover letter templates get thrown away. Generate bespoke, high-converting cover letters perfectly tailored to your target company, role, and leadership tone in seconds.
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ 4 Tailored Tones }'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ Company Alignment }'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ Clean Print & PDF }'}</span>
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
                  src="/images/services/service_cover_letter.jpg"
                  alt="Cover Letter Architect Visual"
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
                    {'{ Executive Letterhead }'}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, marginTop: '2px' }}>
                    "Personalized to hiring team & company culture"
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

              {/* 2-Column Split: Form Customizer (Left) vs Live Letterhead Preview (Right) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '2.5rem',
                alignItems: 'start'
              }}>

                {/* Left: Input Form Parameters */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sliders size={18} color="var(--primary)" />
                    <span>Targeting Parameters</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        Your Full Name:
                      </label>
                      <input
                        type="text"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        Target Company:
                      </label>
                      <input
                        type="text"
                        value={targetCompany}
                        onChange={(e) => setTargetCompany(e.target.value)}
                        placeholder="e.g. Stripe, Airbnb"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        Target Job Title:
                      </label>
                      <input
                        type="text"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        Hiring Manager / Team:
                      </label>
                      <input
                        type="text"
                        value={hiringManager}
                        onChange={(e) => setHiringManager(e.target.value)}
                        placeholder="e.g. Engineering Lead"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  {/* Tone Profile Selector */}
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.45rem' }}>
                      Narrative Tone & Voice:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      {TONES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setSelectedTone(t.id)}
                          style={{
                            padding: '0.65rem 0.85rem',
                            borderRadius: '10px',
                            border: '1.5px solid',
                            borderColor: selectedTone === t.id ? 'var(--primary)' : 'var(--border-color)',
                            backgroundColor: selectedTone === t.id ? 'var(--primary-light)' : '#FFFFFF',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ fontSize: '0.825rem', fontWeight: 800, color: selectedTone === t.id ? 'var(--primary)' : 'var(--text-main)' }}>
                            {t.label}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.3 }}>
                            {t.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Key Skills & Achievements to Emphasize:
                    </label>
                    <input
                      type="text"
                      value={keySkillsEmphasized}
                      onChange={(e) => setKeySkillsEmphasized(e.target.value)}
                      placeholder="e.g. React, Distributed Systems, 40% Latency Reduction"
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="aura-btn-primary"
                    style={{ padding: '0.9rem', fontSize: '0.95rem', justifyContent: 'center', marginTop: '0.5rem' }}
                  >
                    {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    <span>{isGenerating ? 'Synthesizing Tailored Letter...' : 'Generate Tailored Cover Letter'}</span>
                  </button>
                </div>

                {/* Right: Live Formatted Letterhead Preview */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      <FileText size={16} color="var(--primary)" />
                      <span>Formatted Cover Letterhead</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.45rem' }}>
                      <button
                        onClick={handleCopy}
                        className="aura-btn-subtle"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                      >
                        {isCopied ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={handlePrint}
                        className="aura-btn-subtle"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                      >
                        <Printer size={13} />
                        <span>Print / PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* Physical Paper Document Preview Card */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid var(--primary-border)',
                    borderRadius: '16px',
                    padding: '2rem',
                    boxShadow: '0 8px 30px rgba(15, 23, 42, 0.08)',
                    minHeight: '460px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    {/* Header Letterhead */}
                    <div>
                      <div style={{ borderBottom: '2px solid var(--primary-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 0.25rem 0' }}>
                          {applicantName}
                        </h2>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <span>{applicantEmail}</span>
                          <span>•</span>
                          <span>{applicantPhone}</span>
                          <span>•</span>
                          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Applying for {targetRole}</span>
                        </div>
                      </div>

                      {/* Date & Addressee */}
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>

                      {/* Editable Text Area */}
                      <textarea
                        value={generatedLetter}
                        onChange={(e) => setGeneratedLetter(e.target.value)}
                        rows={14}
                        style={{
                          width: '100%',
                          border: 'none',
                          outline: 'none',
                          fontSize: '0.885rem',
                          fontFamily: 'inherit',
                          lineHeight: 1.65,
                          color: '#1E293B',
                          backgroundColor: 'transparent',
                          resize: 'none',
                          padding: 0
                        }}
                      />
                    </div>

                    <div style={{
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)'
                    }}>
                      <span>{generatedLetter.split(/\s+/).filter(Boolean).length} Words · 1.5 min read</span>
                      <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Letter Ready for Submission</span>
                    </div>
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
