import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuraHeader from '../AuraHeader';
import { useResume } from '../../context/ResumeContext';
import {
  FileText, Wand2, Copy, CheckCircle2, Download,
  ArrowRight, ShieldCheck, HeartHandshake, Sparkles, Printer
} from 'lucide-react';

export default function ResignationLetterPage() {
  const navigate = useNavigate();
  const { resumeData } = useResume();

  const [managerName, setManagerName] = useState('Sarah Jenkins');
  const [companyName, setCompanyName] = useState('Acme Corporation');
  const [jobTitle, setJobTitle] = useState(resumeData?.personalInfo?.jobTitle || 'Senior Software Engineer');
  const [lastDay, setLastDay] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [reason, setReason] = useState('career_advancement');
  const [tone, setTone] = useState('grateful'); // 'grateful' | 'direct' | 'executive'
  const [copied, setCopied] = useState(false);

  const fullName = resumeData?.personalInfo?.fullName || 'Alex Rivera';
  const email = resumeData?.personalInfo?.email || 'alex@example.com';
  const phone = resumeData?.personalInfo?.phone || '+1 (555) 019-2834';

  const generateLetterContent = () => {
    const formattedDate = new Date(lastDay).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const todayFormatted = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    if (tone === 'grateful') {
      return `Dear ${managerName},

Please accept this letter as formal notification that I am resigning from my position as ${jobTitle} at ${companyName}. My last working day will be ${formattedDate}.

I want to express my deepest gratitude for the opportunities I have had during my time with ${companyName}. I have truly enjoyed working alongside our dedicated team and appreciate the professional guidance, mentorship, and support you have provided me throughout my tenure.

During my remaining two weeks, I am fully committed to ensuring a smooth and seamless handover of all my current responsibilities and projects. Please let me know how I can best assist in wrapping up ongoing tasks or training team members.

I wish you, our team, and ${companyName} continued success, and I hope we can stay in touch in the future.

Sincerely,

${fullName}
${email} · ${phone}`;
    }

    if (tone === 'direct') {
      return `Dear ${managerName},

This letter serves as formal notification that I am resigning from my role as ${jobTitle} at ${companyName}, effective ${formattedDate}.

I appreciate the experience and professional growth gained during my tenure. Over the next two weeks, I will focus on completing all active project deliverables and facilitating a comprehensive transition of my duties.

Thank you for your support during my time here, and I wish ${companyName} continued success.

Sincerely,

${fullName}
${email}`;
    }

    // Executive Formal
    return `Dear ${managerName},

I am writing to formally communicate my resignation from the position of ${jobTitle} with ${companyName}. My final day of service will be ${formattedDate}.

It has been a privilege to contribute to the strategic initiatives and milestones of ${companyName}. I am grateful for the leadership, collaboration, and trust extended to me during my time with the organization.

I will dedicate my remaining time to structuring a rigorous transition plan, documenting operational workflows, and supporting leadership to ensure uninterrupted business continuity.

Thank you for the opportunity to have served the company, and I look forward to following ${companyName}'s continued growth.

Warm regards,

${fullName}
${jobTitle}`;
  };

  const letterText = generateLetterContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent' }}>
      <AuraHeader />

      <main style={{ flex: 1, padding: '2.5rem 1.5rem 5rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
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
                color: '#2563EB',
                letterSpacing: '0.04em'
              }}>
                {'{ Platform Services / Engine 07 }'}
              </span>
              <span style={{
                fontSize: '0.75rem',
                padding: '2px 10px',
                borderRadius: '9999px',
                background: '#EFF6FF',
                color: '#2563EB',
                fontWeight: 800,
                border: '1px solid #BFDBFE'
              }}>
                {'{ 30-Second Notice }'}
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
              {'{ AI Resignation Letter Generator }'}
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1.75rem 0' }}>
              Quit gracefully and leave every professional bridge intact. Generate a polished, respectful, and legally compliant resignation notice for your manager in seconds.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#2563EB" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ 3 Tone Presets }'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#2563EB" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ 1-Click Copy }'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#2563EB" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ Print Ready }'}</span>
              </div>
            </div>
          </div>

          {/* Right Bespoke Art Image Banner */}
          <div style={{ position: 'relative', height: '280px', width: '100%', overflow: 'hidden' }}>
            <img
              src="/images/services/service_resignation_letter.jpg"
              alt="Resignation Letter Studio Visual"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 25%), linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 60%)'
            }} />
            <div style={{ position: 'absolute', bottom: '16px', right: '20px', display: 'flex', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(15,23,42,0.85)', color: '#FFFFFF' }}>
                {'{ Polite & Professional }'}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(15,23,42,0.85)', color: '#FFFFFF' }}>
                {'{ Smooth Transition }'}
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Studio Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          
          {/* Left: Input Form (3D Paper Stack) */}
          <div style={{ position: 'relative', width: '100%' }}>
            {/* Sheet 3 */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '24px', background: '#F1F5F9', border: '1px solid #CBD5E1', transform: 'translate(6px, 7px) rotate(0.8deg)', zIndex: 0 }} />
            {/* Sheet 2 */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '24px', background: '#EFF6FF', border: '1.5px solid #BFDBFE', transform: 'translate(3px, 4px) rotate(0.4deg)', zIndex: 1 }} />

            {/* Sheet 1 */}
            <div style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFFFF', borderRadius: '24px', border: '1.5px solid #BFDBFE', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 1.25rem 0' }}>
                Resignation Parameters
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                    Manager's Full Name
                  </label>
                  <input
                    type="text"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid var(--border-color)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid var(--border-color)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                      Your Role
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid var(--border-color)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                      Last Working Day
                    </label>
                    <input
                      type="date"
                      value={lastDay}
                      onChange={(e) => setLastDay(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid var(--border-color)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.45rem' }}>
                    Tone & Style
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                    {[
                      { id: 'grateful', label: 'Warm & Grateful' },
                      { id: 'direct', label: 'Short & Direct' },
                      { id: 'executive', label: 'Executive Formal' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTone(t.id)}
                        style={{
                          padding: '0.55rem',
                          borderRadius: '8px',
                          border: tone === t.id ? '2px solid #2563EB' : '1px solid var(--border-color)',
                          backgroundColor: tone === t.id ? '#EFF6FF' : '#FFFFFF',
                          color: tone === t.id ? '#2563EB' : 'var(--text-main)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="aura-btn-primary"
                style={{ width: '100%', padding: '0.75rem', fontSize: '0.875rem', justifyContent: 'center', backgroundColor: '#2563EB' }}
              >
                <Copy size={15} />
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Formatted Letter'}</span>
              </button>
            </div>
          </div>

          {/* Right: Live Formatted Letterhead */}
          <div>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1.5px solid var(--border-color)',
              padding: '2.5rem 2rem',
              boxShadow: 'var(--shadow-md)',
              minHeight: '440px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.95rem',
                color: '#1E293B',
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap'
              }}>
                {letterText}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <button
                  onClick={handleCopy}
                  className="aura-btn-primary"
                  style={{ flex: 1, padding: '0.7rem', fontSize: '0.85rem', justifyContent: 'center' }}
                >
                  <Copy size={15} />
                  <span>{copied ? 'Copied!' : 'Copy Letter'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="aura-btn-secondary"
                  style={{ padding: '0.7rem 1.4rem', fontSize: '0.85rem' }}
                >
                  <Printer size={15} />
                  <span>Print / PDF</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
