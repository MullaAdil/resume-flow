import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KickresumeLogo from './KickresumeLogo';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import TemplateRenderer from './TemplateRenderer';
import { mockResumeData } from '../utils/mockResumeData';
import {
  LayoutDashboard, FileText, Map, MessageSquare, Search,
  ClipboardList, Zap, Plus, ArrowRight, ChevronRight,
  ExternalLink, Sparkles, MoreVertical, Edit3, Trash2,
  Briefcase, Globe, CheckCircle2, Star, User
} from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { resumeData, setResumeData, selectedTemplate, setSelectedTemplate } = useResume();

  const [activeMenu, setActiveMenu] = useState('dashboard');
  const userName = resumeData?.personalInfo?.fullName?.split(' ')[0] || user?.name || 'Adil';
  const fullName = resumeData?.personalInfo?.fullName || 'Adil Adil';

  const userDocuments = [
    {
      id: 'doc_1',
      title: 'My Resume',
      type: 'Resume',
      updatedAt: '2 hours ago',
      templateId: selectedTemplate || 'vertex'
    },
    {
      id: 'doc_2',
      title: 'My Resume',
      type: 'Resume',
      updatedAt: 'Yesterday',
      templateId: 'modern'
    },
    {
      id: 'doc_3',
      title: 'My Resume',
      type: 'Resume',
      updatedAt: '3 days ago',
      templateId: 'aslam'
    },
    {
      id: 'doc_4',
      title: `${fullName} Website`,
      type: 'Website',
      updatedAt: 'Just now',
      isWebsite: true
    }
  ];

  const jobOpenings = [
    { title: 'Network Administrator - Secret ...', company: 'KINAOLE SERVICE CENTER', location: 'Remote', match: '98%' },
    { title: 'Center Administrator', company: 'PathStone Corporation', location: 'New York, NY', match: '94%' },
    { title: 'CNA/HHA - Part Time', company: 'Easy Living', location: 'Tampa, FL', match: '91%' },
    { title: 'Part-Time Caregivers / HHA', company: 'Easy Living', location: 'Tampa, FL', match: '89%' }
  ];

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#F8FAFC',
      fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif"
    }}>
      
      {/* ── 1. LEFT SIDEBAR (Exact Kickresume Dashboard Sidebar) ── */}
      <aside style={{
        width: '240px',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem 1rem',
        position: 'sticky',
        top: 0,
        height: '100vh',
        boxSizing: 'border-box',
        flexShrink: 0,
        zIndex: 10
      }}>
        <div>
          {/* Logo */}
          <div style={{ padding: '0 0.5rem 1.5rem 0.5rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <KickresumeLogo height={28} />
          </div>

          {/* User Account Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.65rem 0.75rem',
            borderRadius: '12px',
            backgroundColor: '#F8FAFC',
            marginBottom: '1.5rem',
            border: '1px solid #E2E8F0',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#00C2A8',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.9rem',
              flexShrink: 0
            }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: 1 }}>My Account</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0F172A', marginTop: '2px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {fullName}
              </div>
            </div>
          </div>

          {/* Nav Menu */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, route: '/dashboard' },
              { id: 'documents', label: 'My Documents', icon: FileText, route: '/dashboard' },
              { id: 'careermap', label: 'Career Map', icon: Map, route: '/services/career-map' },
              { id: 'interviews', label: 'Job Interviews', icon: MessageSquare, route: '/services/proofreading' },
              { id: 'findjobs', label: 'Find Jobs', icon: Search, route: '/services/job-matcher' },
              { id: 'jobtracker', label: 'Job Tracker', icon: ClipboardList, route: '/services/vision-cloner', badge: 'NEW' }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    navigate(item.route);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: isActive ? '#242E35' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#475569',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={18} color={isActive ? '#FFFFFF' : '#64748B'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span style={{
                      backgroundColor: '#EF4444',
                      color: '#FFFFFF',
                      fontSize: '0.65rem',
                      fontWeight: 900,
                      padding: '0.1rem 0.4rem',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Plan Box & Upgrade CTA */}
        <div>
          <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '0.65rem', paddingLeft: '0.25rem' }}>
            Current plan: <strong style={{ color: '#0F172A' }}>FREE</strong>
          </div>

          <button
            onClick={() => navigate('/choose')}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(124, 58, 237, 0.25)',
              transition: 'transform 0.15s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Upgrade
          </button>
        </div>
      </aside>

      {/* ── 2. MAIN DASHBOARD CONTENT AREA ── */}
      <main style={{ flex: 1, padding: '2.5rem 3rem', overflowY: 'auto' }}>
        
        {/* Top Greeting & Upgrade Now Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em', margin: 0 }}>
            Welcome back, {userName}!
          </h1>

          <button
            onClick={() => navigate('/choose')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.4rem',
              borderRadius: '999px',
              border: 'none',
              background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(124, 58, 237, 0.25)'
            }}
          >
            <Zap size={16} />
            <span>Upgrade Now</span>
          </button>
        </div>

        {/* ── SECTION 1: RECENT DOCUMENTS ── */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
              Recent Documents
            </h2>

            <button
              onClick={() => navigate('/choose')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1.1rem',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #0F172A',
                borderRadius: '999px',
                fontWeight: 800,
                fontSize: '0.85rem',
                color: '#0F172A',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0F172A'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#0F172A'; }}
            >
              <span>+ Create New</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* 4-Column Documents Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {userDocuments.map((doc, idx) => (
              <div
                key={doc.id}
                onClick={() => {
                  if (doc.isWebsite) {
                    navigate('/services/website-builder');
                  } else {
                    setSelectedTemplate(doc.templateId);
                    navigate('/builder');
                  }
                }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(15, 23, 42, 0.08)';
                  e.currentTarget.style.borderColor = '#00C2A8';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.04)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                {/* Paper Thumbnail Preview Container */}
                <div style={{
                  height: '160px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '0.85rem'
                }}>
                  {doc.isWebsite ? (
                    <div style={{
                      width: '140px',
                      height: '90px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      padding: '8px',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#EF4444' }} />
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F59E0B' }} />
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981' }} />
                      </div>
                      <div style={{ width: '40px', height: '6px', background: '#00C2A8', borderRadius: '2px' }} />
                      <div style={{ width: '80px', height: '4px', background: '#E2E8F0', borderRadius: '2px' }} />
                      <div style={{ width: '60px', height: '4px', background: '#E2E8F0', borderRadius: '2px' }} />
                    </div>
                  ) : (
                    <div style={{
                      transform: 'scale(0.18)',
                      transformOrigin: 'center center',
                      width: '794px',
                      height: '1123px',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                      pointerEvents: 'none'
                    }}>
                      <TemplateRenderer
                        templateId={doc.templateId}
                        resumeData={resumeData || mockResumeData}
                      />
                    </div>
                  )}
                </div>

                {/* Card Title & Type */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: '0 0 2px 0' }}>
                      {doc.title}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                      {doc.type}
                    </div>
                  </div>
                  <ChevronRight size={16} color="#94A3B8" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 2: 3-COLUMN BENTO WIDGETS ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
          marginBottom: '3rem'
        }}>
          
          {/* Card 1: Job Openings */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            padding: '1.5rem',
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                  Job Openings
                </h3>
                <button
                  onClick={() => navigate('/services/job-matcher')}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <ArrowRight size={14} color="#0F172A" />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {jobOpenings.map((job, i) => (
                  <div
                    key={i}
                    onClick={() => navigate('/services/job-matcher')}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '10px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#00C2A8'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0F172A' }}>{job.title}</div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#00C2A8', backgroundColor: '#E6FAF6', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                        {job.match}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>{job.company} · {job.location}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Career Map */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            padding: '1.5rem',
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                  Career Map
                </h3>
                <button
                  onClick={() => navigate('/services/career-map')}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <ArrowRight size={14} color="#0F172A" />
                </button>
              </div>

              {/* Career Map Node Graphic */}
              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                padding: '1.5rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ padding: '0.45rem 1rem', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
                  Front End Developer <span style={{ color: '#00C2A8' }}>$95,000</span>
                </div>
                <div style={{ width: '2px', height: '14px', backgroundColor: '#CBD5E1' }} />
                <div style={{ padding: '0.45rem 1rem', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1.5px solid #00C2A8', fontSize: '0.8rem', fontWeight: 800, color: '#00C2A8', boxShadow: '0 2px 6px rgba(0,194,168,0.1)' }}>
                  Lead Architect / CTO <span style={{ color: '#0F172A' }}>$175,000</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/services/career-map')}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '999px',
                border: '1.5px solid #0F172A',
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                fontWeight: 800,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0F172A'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#0F172A'; }}
            >
              Explore Your Map
            </button>
          </div>

          {/* Card 3: Interviews */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            padding: '1.5rem',
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                  Interviews
                </h3>
                <button
                  onClick={() => navigate('/services/proofreading')}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <ArrowRight size={14} color="#0F172A" />
                </button>
              </div>

              {/* Chat Simulation Graphic */}
              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ padding: '0.5rem 0.85rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '0.78rem', color: '#475569', maxWidth: '85%' }}>
                  "Have you thought about scaling..."
                </div>
                <div style={{ padding: '0.5rem 0.85rem', backgroundColor: '#E6FAF6', borderRadius: '10px', border: '1px solid #99EEDB', fontSize: '0.78rem', color: '#00A892', fontWeight: 700, alignSelf: 'flex-end', maxWidth: '85%' }}>
                  "I optimized queries reducing latency by 40%."
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/services/proofreading')}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '999px',
                border: '1.5px solid #0F172A',
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                fontWeight: 800,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0F172A'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#0F172A'; }}
            >
              Practice Interview
            </button>
          </div>

        </div>

        {/* ── SECTION 3: TIPS AND GUIDES ── */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          padding: '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)'
        }} onClick={() => navigate('/services')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#E6FAF6', color: '#00C2A8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                Tips and Guides
              </h3>
              <div style={{ fontSize: '0.825rem', color: '#64748B' }}>
                Learn how to write a killer resume, ace interviews, and negotiate higher compensation.
              </div>
            </div>
          </div>
          <button style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowRight size={16} color="#0F172A" />
          </button>
        </div>

      </main>

      {/* Intercom Red Chat Widget in Bottom Right */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: '#FF4F4F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        boxShadow: '0 8px 24px rgba(255, 79, 79, 0.4)',
        cursor: 'pointer',
        zIndex: 99
      }}>
        <MessageSquare size={24} />
      </div>

    </div>
  );
}
