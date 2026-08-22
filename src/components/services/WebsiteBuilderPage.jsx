import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuraHeader from '../AuraHeader';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import {
  Globe, Sparkles, ArrowRight, CheckCircle2, Copy,
  Eye, Layout, Palette, ShieldCheck, ExternalLink,
  Laptop, Smartphone, Share2, RefreshCw
} from 'lucide-react';

export default function WebsiteBuilderPage() {
  const navigate = useNavigate();
  const { resumeData } = useResume();
  const { user } = useAuth();

  const [subdomain, setSubdomain] = useState(() => {
    const raw = (user?.name || resumeData?.personalInfo?.fullName || 'alex-rivera').toLowerCase().replace(/[^a-z0-9]/g, '-');
    return raw || 'my-career';
  });
  const [themeMode, setThemeMode] = useState('modern-light'); // 'modern-light' | 'dark-slate' | 'editorial' | 'minimal'
  const [isPublished, setIsPublished] = useState(true);
  const [copied, setCopied] = useState(false);
  const [devicePreview, setDevicePreview] = useState('desktop'); // 'desktop' | 'mobile'

  const liveUrl = `https://${subdomain}.careerflow.dev`;

  const fullName = resumeData?.personalInfo?.fullName || 'Alex Rivera';
  const jobTitle = resumeData?.personalInfo?.jobTitle || 'Lead Full-Stack Engineer & AI Architect';
  const summary = resumeData?.personalInfo?.summary || 'Building resilient distributed web applications, high-throughput cloud APIs, and generative AI user interfaces with over 7 years of production experience.';
  const email = resumeData?.personalInfo?.email || 'alex@example.com';
  const location = resumeData?.personalInfo?.location || 'San Francisco, CA';
  const skills = Array.isArray(resumeData?.skills) && resumeData.skills.length > 0
    ? resumeData.skills
    : ['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Docker', 'AWS Cloud', 'AI Engineering'];

  const experience = Array.isArray(resumeData?.experience) && resumeData.experience.length > 0
    ? resumeData.experience
    : [
      {
        company: 'Stripe Inc.',
        title: 'Senior Software Engineer',
        date: '2022 - Present',
        description: 'Architected global checkout microservices processing 4.2M daily transactions with 99.999% uptime.'
      },
      {
        company: 'Airbnb',
        title: 'Full Stack Engineer',
        date: '2019 - 2022',
        description: 'Engineered search ranking UI and real-time host messaging engine increasing host response speed by 35%.'
      }
    ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                color: '#7C3AED',
                letterSpacing: '0.04em'
              }}>
                {'{ Platform Services / Engine 04 }'}
              </span>
              <span style={{
                fontSize: '0.75rem',
                padding: '2px 10px',
                borderRadius: '9999px',
                background: '#F5F3FF',
                color: '#7C3AED',
                fontWeight: 800,
                border: '1px solid #DDD6FE'
              }}>
                {'{ 1-Click Hosted Web }'}
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
              {'{ Personal Portfolio Website Studio }'}
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1.75rem 0' }}>
              Turn your resume into a live personal portfolio website indexed on Google with your own custom subdomain, responsive mobile views, and one-click recruiter contact links.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#7C3AED" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ Google SEO Indexed }'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#7C3AED" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ Auto-Sync with Draft }'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#7C3AED" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ Custom Subdomains }'}</span>
              </div>
            </div>
          </div>

          {/* Right Bespoke Art Image Banner */}
          <div style={{ position: 'relative', height: '280px', width: '100%', overflow: 'hidden' }}>
            <img
              src="/images/services/service_portfolio_builder.jpg"
              alt="Portfolio Builder Visual"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 25%), linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 60%)'
            }} />
            <div style={{ position: 'absolute', bottom: '16px', right: '20px', display: 'flex', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(15,23,42,0.85)', color: '#FFFFFF' }}>
                {'{ Live HTTPS SSL }'}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(15,23,42,0.85)', color: '#FFFFFF' }}>
                {'{ Mobile Responsive }'}
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Studio Grid (Settings Left, Live Responsive Preview Right) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Website Settings Card */}
          <div style={{ position: 'relative', width: '100%' }}>
            {/* Sheet 3 */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '24px', background: '#F1F5F9', border: '1px solid #CBD5E1', transform: 'translate(6px, 7px) rotate(0.8deg)', zIndex: 0 }} />
            {/* Sheet 2 */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '24px', background: '#F5F3FF', border: '1.5px solid #DDD6FE', transform: 'translate(3px, 4px) rotate(0.4deg)', zIndex: 1 }} />

            {/* Sheet 1 */}
            <div style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFFFF', borderRadius: '24px', border: '1.5px solid #DDD6FE', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>
                  Website Configuration
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: isPublished ? '#059669' : '#DC2626' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isPublished ? '#059669' : '#DC2626' }} />
                  <span>{isPublished ? 'Live & Published' : 'Unpublished Draft'}</span>
                </div>
              </div>

              {/* Subdomain Input */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.45rem' }}>
                  Your Custom Web Address (Subdomain)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', borderRadius: '12px', border: '1.5px solid var(--border-color)', backgroundColor: '#FAF9F5', overflow: 'hidden', padding: '0 0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>https://</span>
                  <input
                    type="text"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    style={{
                      flex: 1,
                      border: 'none',
                      backgroundColor: 'transparent',
                      padding: '0.75rem 0.4rem',
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      color: 'var(--primary)',
                      outline: 'none'
                    }}
                  />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>.careerflow.dev</span>
                </div>
              </div>

              {/* Theme Presets */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.55rem' }}>
                  Website Aesthetic Preset
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  {[
                    { id: 'modern-light', label: 'Studio Clean White', bg: '#FFFFFF', color: '#0F172A' },
                    { id: 'dark-slate', label: 'Obsidian Dark', bg: '#0F172A', color: '#F8FAFC' },
                    { id: 'editorial', label: 'Editorial Indigo', bg: '#EEF2FF', color: '#4338CA' },
                    { id: 'minimal', label: 'Linen Paper Minimal', bg: '#FAF9F5', color: '#1E293B' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setThemeMode(t.id)}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '12px',
                        border: themeMode === t.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        backgroundColor: t.bg,
                        color: t.color,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={handleCopyLink}
                  className="aura-btn-primary"
                  style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem', justifyContent: 'center' }}
                >
                  <Copy size={16} />
                  <span>{copied ? 'Copied Public URL!' : 'Copy Shareable Website URL'}</span>
                </button>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => setIsPublished(!isPublished)}
                    className="aura-btn-secondary"
                    style={{ flex: 1, padding: '0.75rem', fontSize: '0.85rem', justifyContent: 'center' }}
                  >
                    <span>{isPublished ? 'Pause Website' : 'Publish Website'}</span>
                  </button>

                  <button
                    onClick={() => navigate('/builder')}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      fontSize: '0.85rem',
                      borderRadius: '12px',
                      border: '1.5px solid var(--border-color)',
                      backgroundColor: '#FFFFFF',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Edit Content
                  </button>
                </div>
              </div>

              {/* Security & SEO verification */}
              <div style={{
                marginTop: '1.75rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.78rem',
                color: 'var(--text-muted)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={14} color="#059669" />
                  <span>Free SSL Certificate included</span>
                </span>
                <span>Fast Edge CDN</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Device Mockup */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                <Eye size={16} color="var(--primary)" />
                <span>Live Browser Preview</span>
              </div>

              {/* Device switcher */}
              <div style={{ display: 'flex', gap: '0.35rem', backgroundColor: '#FFFFFF', padding: '0.2rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <button
                  onClick={() => setDevicePreview('desktop')}
                  style={{ padding: '0.35rem 0.75rem', borderRadius: '7px', border: 'none', backgroundColor: devicePreview === 'desktop' ? 'var(--primary-light)' : 'transparent', color: devicePreview === 'desktop' ? 'var(--primary)' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 700 }}
                >
                  <Laptop size={13} />
                  <span>Desktop</span>
                </button>

                <button
                  onClick={() => setDevicePreview('mobile')}
                  style={{ padding: '0.35rem 0.75rem', borderRadius: '7px', border: 'none', backgroundColor: devicePreview === 'mobile' ? 'var(--primary-light)' : 'transparent', color: devicePreview === 'mobile' ? 'var(--primary)' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 700 }}
                >
                  <Smartphone size={13} />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Mockup Frame */}
            <div style={{
              width: '100%',
              maxWidth: devicePreview === 'mobile' ? '360px' : '100%',
              margin: '0 auto',
              backgroundColor: themeMode === 'dark-slate' ? '#0F172A' : themeMode === 'editorial' ? '#F8FAFC' : '#FFFFFF',
              color: themeMode === 'dark-slate' ? '#F8FAFC' : '#0F172A',
              borderRadius: '20px',
              border: '2px solid var(--border-color)',
              boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.15)',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}>
              {/* Browser Address Bar */}
              <div style={{
                backgroundColor: themeMode === 'dark-slate' ? '#1E293B' : '#F1F5F9',
                padding: '0.65rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderBottom: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                </div>
                <div style={{
                  flex: 1,
                  backgroundColor: themeMode === 'dark-slate' ? '#0F172A' : '#FFFFFF',
                  borderRadius: '6px',
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  🔒 {liveUrl}
                </div>
              </div>

              {/* Website Body Content */}
              <div style={{ padding: '2rem 1.75rem', maxHeight: '560px', overflowY: 'auto' }}>
                
                {/* Hero Profile Block */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary) 0%, #4F46E5 100%)',
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: '1.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto',
                    boxShadow: '0 8px 24px var(--primary-glow)'
                  }}>
                    {fullName.charAt(0)}
                  </div>

                  <h2 style={{ fontSize: '1.65rem', fontWeight: 900, margin: '0 0 0.35rem 0', letterSpacing: '-0.02em' }}>
                    {fullName}
                  </h2>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.75rem' }}>
                    {jobTitle}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: themeMode === 'dark-slate' ? '#94A3B8' : '#64748B', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 1.25rem auto' }}>
                    {summary}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <a
                      href={`mailto:${email}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '999px',
                        backgroundColor: 'var(--primary)',
                        color: '#FFFFFF',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textDecoration: 'none'
                      }}
                    >
                      <span>Get in Touch</span>
                    </a>
                  </div>
                </div>

                {/* Experience Section */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 1rem 0', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.4rem' }}>
                    Work Experience
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {experience.map((exp, idx) => (
                      <div key={idx} style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        backgroundColor: themeMode === 'dark-slate' ? '#1E293B' : '#FAF9F5',
                        border: '1px solid var(--border-color)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.25rem' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, margin: 0 }}>{exp.title}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{exp.date}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: themeMode === 'dark-slate' ? '#CBD5E1' : '#475569', fontWeight: 600, marginBottom: '0.5rem' }}>
                          {exp.company}
                        </div>
                        <p style={{ fontSize: '0.78rem', color: themeMode === 'dark-slate' ? '#94A3B8' : '#64748B', lineHeight: 1.45, margin: 0 }}>
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Grid */}
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.85rem 0', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '0.4rem' }}>
                    Key Skills & Technologies
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {skills.map((sk, i) => (
                      <span key={i} style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: '999px',
                        backgroundColor: themeMode === 'dark-slate' ? '#334155' : 'var(--primary-light)',
                        color: themeMode === 'dark-slate' ? '#F8FAFC' : 'var(--primary)',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        {sk}
                      </span>
                    ))}
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
