import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import AuraHeader from '../AuraHeader';
import {
  Share2, Sparkles, CheckCircle2, ArrowRight, Copy, Check,
  RefreshCw, User, Award, MessageSquare, ChevronRight, Sliders,
  Briefcase, Heart, Send
} from 'lucide-react';

export default function LinkedInStudioPage() {
  const navigate = useNavigate();
  const { resumeData } = useResume();

  const [candidateName, setCandidateName] = useState(resumeData?.personalInfo?.fullName || 'Alex Sterling');
  const [jobTitle, setJobTitle] = useState(resumeData?.personalInfo?.jobTitle || 'Senior Full-Stack Architect');
  const [coreSkills, setCoreSkills] = useState('React, TypeScript, Node.js, Cloud Architecture, PostgreSQL');
  const [keyMetric, setKeyMetric] = useState('38% Latency Reduction · $1.8M ARR Scale');
  const [targetAudience, setTargetAudience] = useState('Tech Recruiters & Engineering VPs');
  const [activeAssetTab, setActiveAssetTab] = useState('headline'); // 'headline' | 'about' | 'pitch'
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Pre-calculated dynamic assets
  const [headlineOutput, setHeadlineOutput] = useState(
    `${jobTitle} | React 19 · Node.js · Distributed Systems | Scaled Platforms to 2.5M DAU & Cut Latency 38% | Building Resilient Software`
  );

  const [aboutOutput, setAboutOutput] = useState(
    `I am a ${jobTitle} passionate about building scalable, resilient software architectures that deliver delightful user experiences and quantifiable business impact.

Over the past 6+ years, I have engineered mission-critical platforms handling millions of transactions, modernizing legacy monolithic applications into modular microservices, and leading distributed cross-functional teams.

⚡ Core Competencies:
• Architecture & Scale: ${coreSkills}
• Impact Highlights: ${keyMetric}
• Leadership: Cross-functional sprint orchestration, technical mentoring, and developer advocacy.

When I'm not shipping code, I mentor emerging developers and contribute to open-source developer tooling. Let's connect!`
  );

  const [pitchOutput, setPitchOutput] = useState(
    `"Hi, I'm ${candidateName}. I'm a ${jobTitle} specializing in ${coreSkills}. Over the past few years, I've focused on scaling enterprise cloud systems—most recently leading an initiative that ${keyMetric.toLowerCase()}. I'm looking for high-growth engineering roles where I can architect robust web systems and mentor high-performing teams."`
  );

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setHeadlineOutput(
        `${jobTitle} | ${coreSkills.split(',').slice(0, 3).join(' · ')} | Impact: ${keyMetric} | Open to Opportunities`
      );

      setAboutOutput(
        `Hi, I'm ${candidateName} — a ${jobTitle} focused on building high-performance architectures and scalable products.

With expertise spanning ${coreSkills}, I bridge the gap between complex engineering challenges and high-converting commercial applications.

🚀 What I Bring:
• Deep technical mastery in modern systems and resilient microservices.
• Quantified track record: ${keyMetric}.
• Collaborative leadership that empowers engineers and ships on-time releases.

Always excited to discuss challenging engineering puzzles, system design, or innovative tech roadmaps.`
      );

      setPitchOutput(
        `"I'm ${candidateName}, a ${jobTitle}. I specialize in ${coreSkills}. In my recent work, I delivered ${keyMetric.toLowerCase()}, and I'm currently looking to bring that scale experience to a forward-thinking engineering team."`
      );

      setIsGenerating(false);
    }, 550);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>LinkedIn & Bio Studio</span>
          </div>

          {/* Service Header with Real-World Imagery */}
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
                <Share2 size={15} />
                <span>Service Specification · Inbound Recruiter Optimization</span>
              </div>

              <h1 style={{
                fontSize: '2.8rem',
                fontWeight: 900,
                color: 'var(--text-main)',
                letterSpacing: '-0.035em',
                lineHeight: 1.15,
                margin: '0 0 1rem 0'
              }}>
                LinkedIn Profile & <span style={{ color: 'var(--primary)' }}>Bio Studio</span>
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
                Turn your LinkedIn presence into an inbound recruiter magnet. Generate keyword-optimized headlines, storytelling "About" bio summaries, and 30-second interview elevator pitches in 1 click.
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Search-Indexed Headlines</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Storytelling About Bios</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>30-Sec Phone Pitch</span>
                </div>
              </div>
            </div>

            {/* Real World Photo Showcase */}
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
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80"
                  alt="Confident tech leader and professional smiling in a modern company environment"
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
                    Inbound Visibility
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, marginTop: '2px' }}>
                    "Optimized headlines generate 3.4x more weekly inbound InMails from senior tech recruiters."
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

              {/* 2-Column Split: Config (Left) vs Generated Assets (Right) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '2.5rem',
                alignItems: 'start'
              }}>

                {/* Left: Input Form Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sliders size={18} color="var(--primary)" />
                    <span>Profile Branding Inputs</span>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Full Name:
                    </label>
                    <input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Primary Professional Title:
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Core Technical Skills & Stack:
                    </label>
                    <input
                      type="text"
                      value={coreSkills}
                      onChange={(e) => setCoreSkills(e.target.value)}
                      placeholder="e.g. React, TypeScript, Node.js, Distributed Systems"
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Key Quantified Impact Metric:
                    </label>
                    <input
                      type="text"
                      value={keyMetric}
                      onChange={(e) => setKeyMetric(e.target.value)}
                      placeholder="e.g. 38% Latency Reduction, $1.8M ARR Scale"
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="aura-btn-primary"
                    style={{ padding: '0.85rem', fontSize: '0.925rem', justifyContent: 'center', marginTop: '0.5rem' }}
                  >
                    {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    <span>{isGenerating ? 'Synthesizing Profiles...' : 'Generate 3 Branding Assets'}</span>
                  </button>
                </div>

                {/* Right: Asset Generator Tabs & Output Box */}
                <div style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '20px',
                  border: '1.5px solid var(--border-color)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '430px'
                }}>
                  <div>
                    {/* Tab Navigation */}
                    <div style={{ display: 'flex', gap: '0.35rem', backgroundColor: '#FFFFFF', padding: '0.3rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
                      {[
                        { id: 'headline', label: '1. Search Headline' },
                        { id: 'about', label: '2. "About" Bio' },
                        { id: 'pitch', label: '3. 30-Sec Pitch' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveAssetTab(tab.id)}
                          style={{
                            flex: 1,
                            padding: '0.45rem 0.5rem',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: activeAssetTab === tab.id ? 'var(--primary-light)' : 'transparent',
                            color: activeAssetTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.12s ease'
                          }}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Output Box */}
                    {activeAssetTab === 'headline' && (
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                          LinkedIn Search Optimized Headline:
                        </div>
                        <div style={{
                          backgroundColor: '#FFFFFF',
                          border: '1.5px solid var(--primary-border)',
                          borderRadius: '14px',
                          padding: '1.25rem',
                          fontSize: '0.92rem',
                          color: 'var(--text-main)',
                          fontWeight: 700,
                          lineHeight: 1.55,
                          boxShadow: 'var(--shadow-sm)',
                          marginBottom: '1rem'
                        }}>
                          {headlineOutput}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                          💡 <strong>Algorithm Tip:</strong> LinkedIn recruiter searches index the first 3 tokens in your headline with highest priority.
                        </div>
                      </div>
                    )}

                    {activeAssetTab === 'about' && (
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                          First-Person Storytelling "About" Summary:
                        </div>
                        <textarea
                          value={aboutOutput}
                          onChange={(e) => setAboutOutput(e.target.value)}
                          rows={9}
                          style={{
                            width: '100%',
                            backgroundColor: '#FFFFFF',
                            border: '1.5px solid var(--primary-border)',
                            borderRadius: '14px',
                            padding: '1.15rem',
                            fontSize: '0.85rem',
                            color: '#1E293B',
                            lineHeight: 1.6,
                            boxShadow: 'var(--shadow-sm)',
                            outline: 'none',
                            resize: 'none',
                            fontFamily: 'inherit',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    )}

                    {activeAssetTab === 'pitch' && (
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                          30-Second Recruiter Phone Screen Pitch:
                        </div>
                        <div style={{
                          backgroundColor: '#FFFFFF',
                          border: '1.5px solid var(--primary-border)',
                          borderRadius: '14px',
                          padding: '1.35rem',
                          fontSize: '0.92rem',
                          color: 'var(--text-main)',
                          fontStyle: 'italic',
                          lineHeight: 1.65,
                          boxShadow: 'var(--shadow-sm)',
                          marginBottom: '1rem'
                        }}>
                          {pitchOutput}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                          💡 <strong>Phone Screen Tip:</strong> Keep your intro under 45 seconds to leave maximum room for questions.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Copy Action Button */}
                  <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <button
                      onClick={() => {
                        const targetText = activeAssetTab === 'headline' ? headlineOutput : (activeAssetTab === 'about' ? aboutOutput : pitchOutput);
                        handleCopy(targetText);
                      }}
                      className="aura-btn-primary"
                      style={{ width: '100%', padding: '0.85rem', fontSize: '0.9rem', justifyContent: 'center' }}
                    >
                      {isCopied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
                      <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Active Asset'}</span>
                    </button>
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
