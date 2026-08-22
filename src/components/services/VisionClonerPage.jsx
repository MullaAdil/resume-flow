import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import { extractTemplateFromImage } from '../../utils/aiTemplateVisionService';
import TemplateRenderer from '../TemplateRenderer';
import AuraHeader from '../AuraHeader';
import {
  Camera, Sparkles, CheckCircle2, ArrowRight, Upload, RefreshCw,
  Check, Eye, Wand2, Palette, Layers, ChevronRight, Bookmark,
  Sliders, Star, SplitSquareVertical, Columns, LayoutTemplate,
  Maximize2, Image as ImageIcon, CheckCheck, User, ShieldCheck,
  SlidersHorizontal, SlidersVertical, ArrowLeftRight, LayoutGrid, FileText
} from 'lucide-react';

const CHRIS_JOHNSON_MOCK_DATA = {
  personalInfo: {
    fullName: 'CHRIS JOHNSON',
    jobTitle: 'SECURITY OFFICER',
    email: 'chris@example.com',
    phone: '(123) 456-7890',
    location: 'Los Angeles, CA 90028',
    website: '',
    summary: 'Dedicated Security Officer with 3+ years of experience ensuring safety and enhancing security operations. Expert in surveillance systems, conflict resolution, and emergency response with proven results in theft prevention and incident management.'
  },
  skills: [
    'Risk Assessment', 'Emergency Response', 'Incident Reporting', 'Access Control Management', 'Surveillance Systems'
  ],
  experience: [
    {
      id: 'exp_1',
      company: 'Safeguard Security Solutions — Security Officer',
      jobTitle: 'Security Officer',
      startDate: '06/2022',
      endDate: '08/2024',
      location: 'Los Angeles, CA',
      description: '• Monitored access points reducing breaches by 25%\n• Implemented patrol schedules ensuring 100% coverage\n• Maintained records improving incident tracking efficiency'
    },
    {
      id: 'exp_2',
      company: 'Fortress Retail Group — Loss Prevention Associate',
      jobTitle: 'Loss Prevention Associate',
      startDate: '05/2020',
      endDate: '05/2022',
      location: 'Los Angeles, CA',
      description: '• Conducted surveillance saving $45k in merchandise\n• Led team training decreasing staff losses by 30%\n• Enhanced security systems boosting alarm accuracy'
    }
  ],
  education: [
    {
      id: 'edu_1',
      degree: 'Master of Science: Criminal Justice',
      school: 'Midwest State University',
      startDate: '2018',
      endDate: '2022'
    },
    {
      id: 'edu_2',
      degree: 'High School Diploma',
      school: 'Central High School',
      startDate: '2014',
      endDate: '2018'
    }
  ],
  languages: [
    { name: 'Spanish', proficiency: 'Intermediate' },
    { name: 'French', proficiency: 'Basic' }
  ]
};

export default function VisionClonerPage() {
  const navigate = useNavigate();
  const { resumeData, setResumeData, customTemplates, addCustomTemplate, loadUserCustomTemplates, setSelectedTemplate } = useResume();
  const { user } = useAuth();

  const [isCloning, setIsCloning] = useState(false);
  const [contentMode, setContentMode] = useState('template-text'); // 'template-text' | 'my-data'
  const [extractedData, setExtractedData] = useState(CHRIS_JOHNSON_MOCK_DATA);

  const [clonedBlueprint, setClonedBlueprint] = useState(() => ({
    id: 'custom_ai_preset_chris',
    name: 'Chris Johnson Electric Lilac Clone',
    createdAt: new Date().toISOString(),
    layoutType: 'lilac-block-sidebar',
    sidebarWidth: '36%',
    headerStyle: 'card-block',
    photoStyle: 'none',
    hasPhoto: false,
    headingStyle: 'square-accent',
    skillsStyle: 'dot-ratings',
    experienceStyle: 'timeline',
    primaryColor: '#A855F7',
    secondaryColor: '#64748B',
    accentColor: '#FAF5FF',
    backgroundColor: '#FFFFFF',
    sidebarBg: '#FAF5FF',
    textColor: '#0F172A',
    fontFamily: 'Plus Jakarta Sans'
  }));

  const [clonedImagePreview, setClonedImagePreview] = useState('https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80');
  const [clonedColor, setClonedColor] = useState('#A855F7');
  const [clonedSidebarBg, setClonedSidebarBg] = useState('#FAF5FF');
  const [clonedLayout, setClonedLayout] = useState('lilac-block-sidebar');
  const [templateCustomName, setTemplateCustomName] = useState('Chris Johnson Electric Lilac Clone');
  const [viewMode, setViewMode] = useState('side-by-side');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user?.email) {
      loadUserCustomTemplates(user.email);
    }
  }, [user?.email]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsCloning(true);
    setIsSaved(false);

    try {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setClonedImagePreview(ev.target.result);
      };
      reader.readAsDataURL(file);

      const bp = await extractTemplateFromImage(file);
      setClonedBlueprint(bp);
      setClonedColor(bp.primaryColor || '#A855F7');
      setClonedSidebarBg(bp.sidebarBg || '#FAF5FF');
      setClonedLayout(bp.layoutType || 'lilac-block-sidebar');
      setTemplateCustomName(bp.name || 'Cloned Template');

      if (bp.extractedCandidateData) {
        setExtractedData(bp.extractedCandidateData);
        setContentMode('template-text');
      }
    } catch (err) {
      console.warn(err);
    } finally {
      setIsCloning(false);
    }
  };

  const handleSaveAndApply = async () => {
    const finalBp = {
      ...(clonedBlueprint || {}),
      id: clonedBlueprint?.id || 'custom_ai_' + Date.now(),
      name: templateCustomName || 'My Custom Cloned Template',
      layoutType: clonedLayout,
      primaryColor: clonedColor,
      sidebarBg: clonedSidebarBg,
      thumbnail: clonedImagePreview || ''
    };

    if (contentMode === 'template-text' && extractedData) {
      setResumeData({
        ...extractedData,
        settings: {
          ...(resumeData.settings || {}),
          customBlueprint: finalBp,
          primaryColor: clonedColor
        }
      });
    }

    await addCustomTemplate(finalBp, user?.email);
    setSelectedTemplate(finalBp.id);
    setIsSaved(true);
    navigate('/builder');
  };

  const activeBaseData = contentMode === 'template-text' ? extractedData : resumeData;

  const previewResumeData = {
    ...activeBaseData,
    settings: {
      ...(activeBaseData.settings || {}),
      customBlueprint: {
        ...(clonedBlueprint || {}),
        primaryColor: clonedColor,
        sidebarBg: clonedSidebarBg,
        layoutType: clonedLayout
      },
      primaryColor: clonedColor
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent' }}>
      <AuraHeader />

      <main style={{ flex: 1, padding: '2rem 0 5rem 0' }}>
        <div className="aura-container">

          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
            <ChevronRight size={14} />
            <span onClick={() => navigate('/services')} style={{ cursor: 'pointer' }}>Services</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Vision AI Layout Cloner</span>
          </div>

          {/* Service Header with Real-World Imagery */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            marginBottom: '2rem'
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
                marginBottom: '0.85rem'
              }}>
                <Camera size={15} />
                <span>Service Specification · Universal Vision Template &amp; Text Cloner</span>
              </div>

              <h1 style={{
                fontSize: '2.6rem',
                fontWeight: 900,
                color: 'var(--text-main)',
                letterSpacing: '-0.035em',
                lineHeight: 1.15,
                margin: '0 0 0.85rem 0'
              }}>
                Vision AI <span style={{ color: 'var(--primary)' }}>Resume Layout Cloner</span>
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
                Upload any screenshot or template. The Universal OCR &amp; Vision engine dynamically extracts real candidate names, filters watermarks, detects card block sidebars, dot skill ratings, and builds an editable vector resume.
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Card Block Sidebars &amp; Badges</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>5-Dot Skill Ratings Sync</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Pixel-Perfect Vector PDF</span>
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
                height: '210px'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80"
                  alt="Designer analyzing multi-screen responsive visual layouts"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80';
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1.25rem',
                  right: '1.25rem',
                  color: '#FFFFFF'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-border)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Frame-to-Frame Synthesis Engine
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '2px' }}>
                    "Extracts text, columns, dividers, and typography from your template."
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Architectural Multi-Paper Stacked Card Layout */}
          <div style={{ position: 'relative', width: '100%' }}>
            
            {/* Sheet 3: Cool Slate Backing */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '24px',
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              transform: 'translate(8px, 9px) rotate(0.5deg)',
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
              transform: 'translate(4px, 5px) rotate(0.25deg)',
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
              padding: '2.25rem',
              boxShadow: 'var(--shadow-md)',
              boxSizing: 'border-box'
            }}>

              {/* Main Workspace Split: Controls Panel (Left ~340px) vs Visual Comparison Arena (Right 1fr) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '340px 1fr',
                gap: '2.25rem',
                alignItems: 'start'
              }}>

                {/* Left: Upload Dropzone & Extracted Blueprint Fine-Tuner */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  
                  {/* File Upload Dropzone */}
                  <label style={{
                    backgroundColor: 'var(--primary-light)',
                    border: '2px dashed var(--primary-border)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}>
                    <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                      flexShrink: 0
                    }}>
                      <Upload size={20} color="var(--primary)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        {isCloning ? 'Vision OCR Scanning...' : 'Upload Template Screenshot'}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        PNG, JPG, or PDF screenshot
                      </div>
                    </div>
                  </label>

                  {/* Text Content Mode Switcher */}
                  <div style={{
                    backgroundColor: 'var(--primary-light)',
                    borderRadius: '12px',
                    border: '1.5px solid var(--primary-border)',
                    padding: '0.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem'
                  }}>
                    <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--primary)' }}>
                      Preview Text Content Mode:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                      <button
                        onClick={() => setContentMode('template-text')}
                        style={{
                          padding: '0.45rem 0.3rem',
                          borderRadius: '8px',
                          border: '1.5px solid',
                          borderColor: contentMode === 'template-text' ? 'var(--primary)' : 'transparent',
                          backgroundColor: contentMode === 'template-text' ? '#FFFFFF' : 'transparent',
                          color: contentMode === 'template-text' ? 'var(--primary)' : 'var(--text-muted)',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        Template Text
                      </button>
                      <button
                        onClick={() => setContentMode('my-data')}
                        style={{
                          padding: '0.45rem 0.3rem',
                          borderRadius: '8px',
                          border: '1.5px solid',
                          borderColor: contentMode === 'my-data' ? 'var(--primary)' : 'transparent',
                          backgroundColor: contentMode === 'my-data' ? '#FFFFFF' : 'transparent',
                          color: contentMode === 'my-data' ? 'var(--primary)' : 'var(--text-muted)',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        My Personal Data
                      </button>
                    </div>
                  </div>

                  {/* Blueprint Fine-Tuner Panel */}
                  <div style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    {/* Column Layout Archetype Selector */}
                    <div>
                      <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                        Column Architecture:
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.35rem' }}>
                        {[
                          { id: 'lilac-block-sidebar', label: 'Electric Lilac Card Block (Chris Johnson)' },
                          { id: 'top-header-split-right', label: 'Split Header + Right Skills (Nick Roe)' },
                          { id: 'two-column-left-sidebar', label: 'Left Dark Sidebar (Austin Bronson)' }
                        ].map((lo) => (
                          <button
                            key={lo.id}
                            onClick={() => setClonedLayout(lo.id)}
                            style={{
                              padding: '0.45rem 0.6rem',
                              borderRadius: '8px',
                              border: '1.5px solid',
                              borderColor: clonedLayout === lo.id ? 'var(--primary)' : 'var(--border-color)',
                              backgroundColor: clonedLayout === lo.id ? 'var(--primary-light)' : '#FFFFFF',
                              color: clonedLayout === lo.id ? 'var(--primary)' : 'var(--text-main)',
                              fontSize: '0.73rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              textAlign: 'left'
                            }}
                          >
                            {lo.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Extracted Accent Color */}
                    <div>
                      <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                        Accent &amp; Block Color:
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {['#A855F7', '#8B5CF6', '#C084FC', '#0D9488', '#0284C7', '#EAB308', '#BE123C'].map((col) => (
                          <button
                            key={col}
                            onClick={() => setClonedColor(col)}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              backgroundColor: col,
                              border: clonedColor === col ? '2.5px solid #FFFFFF' : '1.5px solid transparent',
                              outline: clonedColor === col ? `2px solid ${col}` : 'none',
                              cursor: 'pointer'
                            }}
                          />
                        ))}
                        <input
                          type="color"
                          value={clonedColor}
                          onChange={(e) => setClonedColor(e.target.value)}
                          style={{ width: '24px', height: '24px', border: 'none', borderRadius: '50%', cursor: 'pointer', padding: 0 }}
                        />
                      </div>
                    </div>

                    {/* Apply & Save Action */}
                    <button
                      onClick={handleSaveAndApply}
                      className="aura-btn-primary"
                      style={{ padding: '0.8rem', fontSize: '0.88rem', justifyContent: 'center', marginTop: '0.25rem' }}
                    >
                      <Sparkles size={15} />
                      <span>Save &amp; Open in Builder</span>
                    </button>
                  </div>

                </div>

                {/* Right: Visual Comparison Arena */}
                <div style={{ minWidth: 0 }}>
                  
                  {/* Top Bar: View Mode Switcher + Status */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <button
                        onClick={() => setViewMode('side-by-side')}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '8px',
                          border: '1.5px solid',
                          borderColor: viewMode === 'side-by-side' ? 'var(--primary)' : 'var(--border-color)',
                          backgroundColor: viewMode === 'side-by-side' ? 'var(--primary-light)' : '#FFFFFF',
                          color: viewMode === 'side-by-side' ? 'var(--primary)' : 'var(--text-main)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <SplitSquareVertical size={14} />
                        <span>Side-by-Side</span>
                      </button>

                      <button
                        onClick={() => setViewMode('vector-only')}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '8px',
                          border: '1.5px solid',
                          borderColor: viewMode === 'vector-only' ? 'var(--primary)' : 'var(--border-color)',
                          backgroundColor: viewMode === 'vector-only' ? 'var(--primary-light)' : '#FFFFFF',
                          color: viewMode === 'vector-only' ? 'var(--primary)' : 'var(--text-main)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <Eye size={14} />
                        <span>Cloned Vector</span>
                      </button>

                      <button
                        onClick={() => setViewMode('original-only')}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '8px',
                          border: '1.5px solid',
                          borderColor: viewMode === 'original-only' ? 'var(--primary)' : 'var(--border-color)',
                          backgroundColor: viewMode === 'original-only' ? 'var(--primary-light)' : '#FFFFFF',
                          color: viewMode === 'original-only' ? 'var(--primary)' : 'var(--text-main)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <ImageIcon size={14} />
                        <span>Source Image</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>Status:</span>
                      <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '0.15rem 0.55rem', borderRadius: '999px', border: '1px solid #A7F3D0' }}>
                        {isCloning ? 'Scanning Pixels & Text...' : 'Frame-to-Frame Synced'}
                      </span>
                    </div>
                  </div>

                  {/* Comparison Grid (Side-by-Side or Single View) */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: viewMode === 'side-by-side' ? '1fr 1fr' : '1fr',
                    gap: '1.5rem',
                    alignItems: 'start'
                  }}>

                    {/* Source Image Frame */}
                    {(viewMode === 'side-by-side' || viewMode === 'original-only') && (
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-main)' }}>
                            <ImageIcon size={15} color="var(--primary)" />
                            <span>Source Template Image</span>
                          </div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Original Mockup</span>
                        </div>

                        <div style={{
                          width: '100%',
                          height: '560px',
                          backgroundColor: '#FAF9F5',
                          borderRadius: '16px',
                          border: '1.5px solid var(--border-color)',
                          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
                          overflow: 'hidden',
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0.5rem'
                        }}>
                          {clonedImagePreview ? (
                            <img
                              src={clonedImagePreview}
                              alt="Source template screenshot"
                              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }}
                            />
                          ) : (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                              <Upload size={30} style={{ margin: '0 auto 0.5rem auto', opacity: 0.5 }} />
                              <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>No Source Image</div>
                              <div style={{ fontSize: '0.75rem', marginTop: '2px' }}>Upload a file or pick a preset</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Cloned Vector Resume Frame */}
                    {(viewMode === 'side-by-side' || viewMode === 'vector-only') && (
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.825rem', fontWeight: 800, color: '#059669' }}>
                            <Eye size={15} color="#059669" />
                            <span>AI Cloned Vector Output</span>
                          </div>
                          <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>Frame &amp; Text Synced</span>
                        </div>

                        <div style={{
                          width: '100%',
                          height: '560px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '16px',
                          border: '1.5px solid var(--primary-border)',
                          boxShadow: '0 8px 30px rgba(15, 23, 42, 0.08)',
                          overflow: 'hidden',
                          position: 'relative',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          paddingTop: '6px'
                        }}>
                          <div style={{
                            width: '794px',
                            height: '1123px',
                            transform: viewMode === 'side-by-side' ? 'scale(0.48)' : 'scale(0.58)',
                            transformOrigin: 'top center',
                            flexShrink: 0,
                            pointerEvents: 'none'
                          }}>
                            <TemplateRenderer templateId="ai_custom" resumeData={previewResumeData} />
                          </div>
                        </div>
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
