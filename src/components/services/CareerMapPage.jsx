import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuraHeader from '../AuraHeader';
import { useResume } from '../../context/ResumeContext';
import {
  Compass, Sparkles, TrendingUp, Award, ArrowRight,
  CheckCircle2, DollarSign, Clock, Target, Layers,
  ChevronRight, BookOpen, Briefcase
} from 'lucide-react';

const CAREER_TRAJECTORIES = {
  software: {
    current: 'Full Stack Software Engineer',
    currentSalary: '$125,000 / yr',
    paths: [
      {
        level: 'Senior Full Stack Engineer',
        timeframe: '1 - 2 Years',
        salary: '$165,000 - $195,000',
        impact: 'Own entire service architectures, mentor junior engineers, lead technical sprints.',
        unlockSkills: ['System Design at Scale', 'Distributed Caching (Redis)', 'CI/CD Pipelines (GitHub Actions)', 'Observability (Datadog)'],
        matchPct: 88
      },
      {
        level: 'Staff / Principal Engineer',
        timeframe: '3 - 5 Years',
        salary: '$220,000 - $280,000',
        impact: 'Set engineering standards across multiple teams, drive cross-functional AI integrations, align with VP goals.',
        unlockSkills: ['Multi-Region Fault Tolerance', 'Cloud Cost Optimization', 'AI/LLM Fine-Tuning', 'RFC Technical Leadership'],
        matchPct: 65
      },
      {
        level: 'VP of Engineering / CTO',
        timeframe: '6+ Years',
        salary: '$320,000 - $450,000+',
        impact: 'P&L ownership, organizational scaling, board presentations, hiring and compensation governance.',
        unlockSkills: ['Engineering Org Design', 'Executive Budgeting', 'Vendor & Security Audits', 'Board Reporting'],
        matchPct: 42
      }
    ]
  },
  design: {
    current: 'Product & UX Designer',
    currentSalary: '$110,000 / yr',
    paths: [
      {
        level: 'Senior Product Designer',
        timeframe: '1 - 2 Years',
        salary: '$150,000 - $180,000',
        impact: 'Lead end-to-end design systems, conduct generative user research, collaborate directly with PMs.',
        unlockSkills: ['Multi-Brand Design Tokens', 'Figma Variables & Auto Layout', 'A/B Test Design Optimization', 'Product Analytics (Mixpanel)'],
        matchPct: 85
      },
      {
        level: 'Principal / Staff Designer',
        timeframe: '3 - 5 Years',
        salary: '$200,000 - $250,000',
        impact: 'Define product vision and strategic design direction across enterprise software suites.',
        unlockSkills: ['Cross-Platform UX Architecture', 'Executive Design Storytelling', 'Accessibility (WCAG AAA)', 'Design Ops Automation'],
        matchPct: 62
      },
      {
        level: 'Head of Design / VP of UX',
        timeframe: '6+ Years',
        salary: '$290,000 - $400,000+',
        impact: 'Build world-class design organization, set creative brand standard, drive customer retention.',
        unlockSkills: ['Design Team Scaling', 'Brand Strategy', 'Product Portfolio Governance', 'Executive Leadership'],
        matchPct: 40
      }
    ]
  }
};

export default function CareerMapPage() {
  const navigate = useNavigate();
  const { resumeData } = useResume();
  const [selectedTrack, setSelectedTrack] = useState('software');
  const [selectedStep, setSelectedStep] = useState(0);

  const activeTrajectory = CAREER_TRAJECTORIES[selectedTrack] || CAREER_TRAJECTORIES.software;
  const currentStepData = activeTrajectory.paths[selectedStep] || activeTrajectory.paths[0];

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
                color: '#059669',
                letterSpacing: '0.04em'
              }}>
                {'{ Platform Services / Engine 06 }'}
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
                {'{ Real Market Trajectories }'}
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
              {'{ AI Career Path & Promotion Map }'}
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1.75rem 0' }}>
              Simulate future promotion levels, salary milestones ($120k → $450k+), and unlock missing qualifications to reach top engineering and leadership tiers.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#059669" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ Verified Compensation }'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#059669" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ Skill Gap Radar }'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#059669" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{'{ Promotion Timelines }'}</span>
              </div>
            </div>
          </div>

          {/* Right Bespoke Art Image Banner */}
          <div style={{ position: 'relative', height: '280px', width: '100%', overflow: 'hidden' }}>
            <img
              src="/images/services/service_career_map.jpg"
              alt="Career Roadmap Matrix Visual"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 25%), linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 60%)'
            }} />
            <div style={{ position: 'absolute', bottom: '16px', right: '20px', display: 'flex', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(15,23,42,0.85)', color: '#FFFFFF' }}>
                {'{ $120k to $450k+ }'}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(15,23,42,0.85)', color: '#FFFFFF' }}>
                {'{ Tier 1 Benchmarks }'}
              </span>
            </div>
          </div>
        </div>

        {/* Track Selector Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'software', label: 'Software Engineering & Cloud Track' },
            { id: 'design', label: 'Product & UX Design Track' }
          ].map((track) => (
            <button
              key={track.id}
              onClick={() => { setSelectedTrack(track.id); setSelectedStep(0); }}
              style={{
                padding: '0.65rem 1.4rem',
                borderRadius: '12px',
                border: selectedTrack === track.id ? '2px solid #059669' : '1.5px solid var(--border-color)',
                backgroundColor: selectedTrack === track.id ? '#ECFDF5' : '#FFFFFF',
                color: selectedTrack === track.id ? '#059669' : 'var(--text-main)',
                fontWeight: 800,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {track.label}
            </button>
          ))}
        </div>

        {/* 3D Multi-Paper Roadmap Progression */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          
          {/* Left: Progression Milestones List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Select Career Level To Inspect
            </div>

            {activeTrajectory.paths.map((path, index) => {
              const isSelected = selectedStep === index;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedStep(index)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '18px',
                    border: isSelected ? '2px solid #059669' : '1.5px solid var(--border-color)',
                    padding: '1.25rem 1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 10px 25px rgba(5, 150, 105, 0.12)' : 'var(--shadow-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#059669' : '#F1F5F9',
                      color: isSelected ? '#FFFFFF' : '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '0.9rem',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                        {path.level}
                      </h3>
                      <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>
                        {path.salary}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {path.timeframe}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: 3D Architectural Stack Card (Level Breakdown) */}
          <div style={{ position: 'relative', width: '100%' }}>
            {/* Sheet 3 */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '24px', background: '#F1F5F9', border: '1px solid #CBD5E1', transform: 'translate(6px, 7px) rotate(0.8deg)', zIndex: 0 }} />
            {/* Sheet 2 */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '24px', background: '#ECFDF5', border: '1.5px solid #A7F3D0', transform: 'translate(3px, 4px) rotate(0.4deg)', zIndex: 1 }} />

            {/* Sheet 1 */}
            <div style={{ position: 'relative', zIndex: 2, backgroundColor: '#FFFFFF', borderRadius: '24px', border: '1.5px solid #A7F3D0', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '0.2rem 0.65rem', borderRadius: '999px' }}>
                  Target Role Blueprint
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#059669' }}>
                  {currentStepData.matchPct}% Skills Match
                </span>
              </div>

              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 0.35rem 0', letterSpacing: '-0.02em' }}>
                {currentStepData.level}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: '#059669', fontWeight: 800, marginBottom: '1.25rem' }}>
                <span>💰 {currentStepData.salary}</span>
                <span>⏱️ {currentStepData.timeframe}</span>
              </div>

              <div style={{
                backgroundColor: '#FAF9F5',
                borderRadius: '14px',
                border: '1px solid var(--border-color)',
                padding: '1rem 1.25rem',
                fontSize: '0.85rem',
                color: '#334155',
                lineHeight: 1.5,
                marginBottom: '1.5rem'
              }}>
                <div style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                  Executive Impact Expectation:
                </div>
                {currentStepData.impact}
              </div>

              {/* Required Skills To Unlock */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem' }}>
                  Key Skills to Inject into Your Resume to Unlock This Bracket:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {currentStepData.unlockSkills.map((sk, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-main)' }}>
                      <CheckCircle2 size={15} color="#059669" />
                      <span>{sk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => navigate('/services/bullet-enhancer')}
                  className="aura-btn-primary"
                  style={{ flex: 1, padding: '0.75rem', fontSize: '0.875rem', justifyContent: 'center', backgroundColor: '#059669' }}
                >
                  <Sparkles size={15} />
                  <span>Rewrite Bullets for This Level</span>
                </button>

                <button
                  onClick={() => navigate('/services/ats-scanner')}
                  className="aura-btn-secondary"
                  style={{ padding: '0.75rem 1.2rem', fontSize: '0.875rem' }}
                >
                  <span>Audit Resume</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
