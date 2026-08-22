import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Calendar, Award, User, Briefcase, GraduationCap, Code, FileText, CheckCircle2, Square, Camera, Star, Sparkles } from 'lucide-react';

export default function CustomFramedTemplate({ resumeData, customBlueprint }) {
  const data = resumeData || {};
  const p = data.personalInfo || {};
  const settings = data.settings || {};

  // Resolve Blueprint properties with dynamic adaptive defaults
  const bp = customBlueprint || settings.customBlueprint || {
    layoutType: 'lilac-block-sidebar',
    sidebarWidth: '36%',
    headerStyle: 'card-block',
    photoStyle: 'none',
    hasPhoto: false,
    headingStyle: 'square-accent',
    skillsStyle: 'dot-ratings',
    experienceStyle: 'timeline',
    primaryColor: settings.primaryColor || '#A855F7',
    secondaryColor: settings.secondaryColor || '#64748B',
    accentColor: '#FAF5FF',
    backgroundColor: '#FFFFFF',
    sidebarBg: '#FAF5FF',
    textColor: '#0F172A',
    fontFamily: settings.fontFamily || 'Plus Jakarta Sans'
  };

  const primary = settings.primaryColor || bp.primaryColor || '#A855F7';
  const secondary = settings.secondaryColor || bp.secondaryColor || '#64748B';
  const bg = bp.backgroundColor || '#FFFFFF';
  const sidebarBg = bp.sidebarBg || '#FAF5FF';
  const textColor = bp.textColor || '#0F172A';

  // Calculate if sidebar is dark
  const isDarkSidebar = sidebarBg && (
    sidebarBg.startsWith('#0') || 
    sidebarBg.startsWith('#1') || 
    sidebarBg.startsWith('#2') || 
    sidebarBg.startsWith('#3') ||
    sidebarBg.toLowerCase().includes('18181b') ||
    sidebarBg.toLowerCase().includes('0f172a') ||
    sidebarBg.toLowerCase().includes('1e293b')
  );

  const sidebarHeadingColor = isDarkSidebar ? '#FFFFFF' : primary;
  const sidebarTextColor = isDarkSidebar ? '#F1F5F9' : '#334155';

  const expList = Array.isArray(data.experience) ? data.experience.filter(e => e && (e.company || e.title || e.jobTitle)) : [];
  const eduList = Array.isArray(data.education) ? data.education.filter(e => e && (e.school || e.degree)) : [];
  const projList = Array.isArray(data.projects) ? data.projects.filter(pr => pr && (pr.name || pr.title)) : [];
  const langList = Array.isArray(data.languages) ? data.languages.filter(Boolean) : [];
  
  // Extract flat skills with rating levels (1 to 5)
  let skillsList = [];
  if (Array.isArray(data.skills)) {
    skillsList = data.skills.map((s, i) => {
      const name = typeof s === 'object' ? s.name || '' : String(s);
      return { name, rating: 5 - (i % 2) };
    }).filter(s => s.name);
  } else if (data.skills && typeof data.skills === 'object') {
    skillsList = Object.values(data.skills).flat().map((s, i) => {
      const name = typeof s === 'object' ? s.name || '' : String(s);
      return { name, rating: 5 - (i % 2) };
    }).filter(s => s.name);
  }

  // Initials for Monogram Diamond
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}/${parts[1][0]}`.toLowerCase();
    return name.slice(0, 2).toLowerCase();
  };

  // 5-Dot Rating Renderer
  const renderDotRating = (rating = 4, max = 5) => {
    return (
      <div style={{ display: 'flex', gap: '3.5px', alignItems: 'center', marginTop: '3px' }}>
        {Array.from({ length: max }).map((_, i) => (
          <span
            key={i}
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: i < rating ? primary : '#E2E8F0',
              display: 'inline-block'
            }}
          />
        ))}
      </div>
    );
  };

  // Section Heading with Clean Underline
  const renderSectionHeader = (title, color = primary) => {
    return (
      <div style={{ borderBottom: `1.5px solid ${primary}`, paddingBottom: '0.35rem', marginBottom: '0.95rem' }}>
        <h3 style={{ fontSize: '0.92rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color, margin: 0 }}>
          {title}
        </h3>
      </div>
    );
  };

  // Contact Info
  const renderContactInfo = (inWhite = false) => {
    const iconColor = inWhite ? '#FFFFFF' : primary;
    const textCol = inWhite ? '#FFFFFF' : '#334155';

    const hasContacts = p.email || p.phone || p.location || p.website || p.linkedin;
    if (!hasContacts) return null;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.78rem', color: textCol, width: '100%' }}>
        {p.email && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <Mail size={12} color={iconColor} />
            <span style={{ wordBreak: 'break-all' }}>{p.email}</span>
          </div>
        )}
        {p.phone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <Phone size={12} color={iconColor} />
            <span>{p.phone}</span>
          </div>
        )}
        {p.location && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <MapPin size={12} color={iconColor} />
            <span>{p.location}</span>
          </div>
        )}
        {(p.website || p.linkedin) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <Globe size={12} color={iconColor} />
            <span>{p.website || p.linkedin}</span>
          </div>
        )}
      </div>
    );
  };

  const layoutType = bp.layoutType || 'lilac-block-sidebar';

  // ── ARCHETYPE 1: ELECTRIC LILAC / PASTEL CARD BLOCK SIDEBAR ──
  if (layoutType === 'lilac-block-sidebar') {
    const initials = getInitials(p.fullName);
    return (
      <div style={{
        width: '100%',
        minHeight: '1123px',
        backgroundColor: bg,
        color: textColor,
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: `${bp.sidebarWidth || '38%'} 1fr`,
        fontFamily: bp.fontFamily || 'Plus Jakarta Sans, sans-serif'
      }}>
        
        {/* Left Column (Purple Block Header + White Contact & Education/Skills) */}
        <div style={{
          backgroundColor: sidebarBg,
          borderRight: '1.5px solid #F1F5F9',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Top Lilac Hero Block */}
          <div style={{
            backgroundColor: primary,
            padding: '2.5rem 1.75rem 2rem 1.75rem',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            {/* Monogram Diamond Box */}
            {initials && (
              <div style={{
                width: '62px',
                height: '62px',
                border: '2px solid rgba(255,255,255,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                transform: 'rotate(45deg)',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}>
                <span style={{
                  transform: 'rotate(-45deg)',
                  fontSize: '1.15rem',
                  fontWeight: 900,
                  letterSpacing: '1px',
                  color: '#FFFFFF',
                  textTransform: 'lowercase'
                }}>
                  {initials}
                </span>
              </div>
            )}

            {p.fullName && (
              <h1 style={{
                fontSize: '1.45rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#FFFFFF',
                margin: '0 0 1.25rem 0',
                lineHeight: 1.15
              }}>
                {p.fullName}
              </h1>
            )}

            <div style={{ width: '80%', height: '1px', backgroundColor: 'rgba(255,255,255,0.3)', marginBottom: '1.25rem' }} />

            {/* White Contact Details */}
            {renderContactInfo(true)}
          </div>

          {/* Left Column Bottom (Education & Skills) */}
          <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.85rem' }}>
            
            {/* Education */}
            {eduList.length > 0 && (
              <div>
                {renderSectionHeader('EDUCATION')}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {eduList.map((edu, idx) => (
                    <div key={edu.id || idx}>
                      <div style={{ fontSize: '0.86rem', fontWeight: 800, color: textColor }}>
                        {edu.school || edu.institution}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: secondary, marginTop: '2px' }}>
                        {edu.degree || edu.fieldOfStudy || ''}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: primary, fontWeight: 700, marginTop: '2px' }}>
                        {edu.endDate || edu.startDate || edu.date || ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills with 5-Dot Ratings */}
            {skillsList.length > 0 && (
              <div>
                {renderSectionHeader('SKILLS')}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {skillsList.map((sk, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: textColor }}>
                        {sk.name}
                      </div>
                      {renderDotRating(sk.rating || 4, 5)}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Main Column */}
        <div style={{ padding: '2.5rem 2.25rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Resume Objective */}
          {p.summary && (
            <div>
              {renderSectionHeader('RESUME OBJECTIVE')}
              <p style={{ fontSize: '0.86rem', lineHeight: 1.6, color: '#334155', margin: 0 }}>
                {p.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {expList.length > 0 && (
            <div>
              {renderSectionHeader('VOLUNTEER & WORK EXPERIENCE')}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                {expList.map((exp, idx) => (
                  <div key={exp.id || idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.2rem' }}>
                      <h4 style={{ fontSize: '0.94rem', fontWeight: 900, color: textColor, margin: 0 }}>
                        {exp.company}
                      </h4>
                      <span style={{ fontSize: '0.785rem', fontWeight: 700, color: primary }}>
                        {exp.date || (exp.startDate ? `${exp.startDate}${exp.endDate ? ` — ${exp.endDate}` : ''}` : '')}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: secondary, marginBottom: '0.4rem' }}>
                      {exp.jobTitle || exp.title}
                    </div>

                    {exp.description && (
                      <div style={{ fontSize: '0.835rem', color: '#334155', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {langList.length > 0 && (
            <div>
              {renderSectionHeader('LANGUAGES')}
              <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                {langList.map((l, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: textColor }}>
                      {typeof l === 'string' ? l : l.name} {l.proficiency ? `(${l.proficiency})` : ''}
                    </div>
                    {renderDotRating(idx === 0 ? 5 : 3, 5)}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    );
  }

  // ── ARCHETYPE 2: SPLIT TOP HEADER + RIGHT SKILLS ──
  if (layoutType === 'top-header-split-right') {
    const hardSkills = skillsList.slice(0, 6);
    const softSkills = skillsList.slice(6, 12);

    return (
      <div style={{
        width: '100%',
        minHeight: '1123px',
        backgroundColor: bg,
        color: textColor,
        boxSizing: 'border-box',
        padding: '2.75rem 2.5rem'
      }}>
        {/* Top Split Header */}
        {(p.fullName || p.jobTitle || p.summary || p.email || p.phone) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: `2px solid #E2E8F0` }}>
            <div>
              {p.fullName && (
                <h1 style={{ fontSize: '2.6rem', fontWeight: 900, color: primary, margin: '0 0 0.25rem 0', lineHeight: 1.1 }}>
                  {p.fullName}
                </h1>
              )}
              {p.jobTitle && (
                <div style={{ fontSize: '1rem', fontWeight: 700, color: secondary, textTransform: 'uppercase', marginBottom: '0.85rem' }}>
                  {p.jobTitle}
                </div>
              )}
              {p.summary && <p style={{ fontSize: '0.835rem', lineHeight: 1.55, color: '#475569', margin: 0 }}>{p.summary}</p>}
            </div>
            <div>
              {renderContactInfo(false)}
            </div>
          </div>
        )}

        {/* 2-Column Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '58% 42%', gap: '2.5rem' }}>
          <div>
            {expList.length > 0 && (
              <>
                {renderSectionHeader('WORK EXPERIENCE')}
                {expList.map((exp, idx) => (
                  <div key={idx} style={{ marginBottom: '1.4rem' }}>
                    <div style={{ fontWeight: 800 }}>{exp.company} — {exp.jobTitle || exp.title}</div>
                    <div style={{ fontSize: '0.835rem', color: '#334155', whiteSpace: 'pre-line', marginTop: '4px' }}>{exp.description}</div>
                  </div>
                ))}
              </>
            )}

            {eduList.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                {renderSectionHeader('EDUCATION')}
                {eduList.map((edu, idx) => (
                  <div key={idx} style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontWeight: 800 }}>{edu.degree || edu.fieldOfStudy || ''}</div>
                    <div style={{ fontSize: '0.82rem', color: primary }}>{edu.school || edu.institution}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {hardSkills.length > 0 && (
              <>
                {renderSectionHeader('HARD SKILLS')}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
                  {hardSkills.map((sk, idx) => (
                    <span key={idx} style={{ padding: '0.3rem 0.75rem', borderRadius: '6px', backgroundColor: primary, color: '#FFFFFF', fontSize: '0.76rem', fontWeight: 700 }}>
                      {sk.name}
                    </span>
                  ))}
                </div>
              </>
            )}

            {softSkills.length > 0 && (
              <>
                {renderSectionHeader('SOFT SKILLS')}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
                  {softSkills.map((sk, idx) => (
                    <span key={idx} style={{ padding: '0.3rem 0.75rem', borderRadius: '6px', backgroundColor: primary, color: '#FFFFFF', fontSize: '0.76rem', fontWeight: 700 }}>
                      {typeof sk === 'object' ? sk.name : sk}
                    </span>
                  ))}
                </div>
              </>
            )}

            {projList.length > 0 && (
              <div>
                {renderSectionHeader('PORTFOLIO')}
                {projList.map((proj, idx) => (
                  <div key={idx} style={{ fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: 800, color: primary }}>{proj.name || proj.title}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── ARCHETYPE 3: TWO-COLUMN LEFT-SIDEBAR ──
  return (
    <div style={{
      width: '100%',
      minHeight: '1123px',
      backgroundColor: bg,
      color: textColor,
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateColumns: `${bp.sidebarWidth || '38%'} 1fr`
    }}>
      <div style={{ backgroundColor: sidebarBg, padding: '2rem 1.75rem', color: sidebarTextColor }}>
        {renderContactInfo(isDarkSidebar)}
        {skillsList.length > 0 && (
          <div style={{ marginTop: '1.75rem' }}>
            {renderSectionHeader('SKILLS', sidebarHeadingColor)}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {skillsList.map((sk, idx) => (
                <span key={idx} style={{ padding: '0.25rem 0.6rem', borderRadius: '6px', backgroundColor: primary, color: '#FFFFFF', fontSize: '0.76rem', fontWeight: 700 }}>
                  {sk.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '2.5rem 2.25rem' }}>
        {(p.fullName || p.jobTitle) && (
          <div style={{ marginBottom: '2rem' }}>
            {p.fullName && (
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', color: primary, margin: '0 0 0.25rem 0' }}>
                {p.fullName}
              </h1>
            )}
            {p.jobTitle && (
              <div style={{ fontSize: '1rem', fontWeight: 700, color: secondary, textTransform: 'uppercase' }}>
                {p.jobTitle}
              </div>
            )}
          </div>
        )}

        {expList.length > 0 && (
          <div>
            {renderSectionHeader('WORK EXPERIENCE')}
            {expList.map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 800 }}>{exp.company} — {exp.jobTitle || exp.title}</div>
                <div style={{ fontSize: '0.835rem', color: '#334155', whiteSpace: 'pre-line' }}>{exp.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
