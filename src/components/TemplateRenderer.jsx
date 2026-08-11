import React from 'react';
import MultiColorTemplate from './templates/MultiColorTemplate';
import VisionaryTemplate from './templates/VisionaryTemplate';
import ArtisticTemplate from './templates/ArtisticTemplate';
import SoothingTemplate from './templates/SoothingTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import TrailblazerTemplate from './templates/TrailblazerTemplate';
import BasicTemplate from './templates/BasicTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalClassicTemplate from './templates/MinimalClassicTemplate';
import CenteredModernTemplate from './templates/CenteredModernTemplate';
import PhotoModernTemplate from './templates/PhotoModernTemplate';
import TealHeaderTemplate from './templates/TealHeaderTemplate';
import BoxedModernTemplate from './templates/BoxedModernTemplate';
import JanetTemplate from './templates/JanetTemplate';
import AslamTemplate, { localDummyData as aslamDummyData } from './templates/AslamTemplate';
import LetsCodeTemplate from './templates/LetsCodeTemplate';

// Sample data that matches the field names ALL templates actually read
export const dummyData = {
  personalInfo: {
    fullName: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    jobTitle: 'Full Stack Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    website: 'johndoe.com',
    portfolio: 'github.com/johndoe',
    summary: 'Full Stack Software Engineer focused on building scalable web applications and clean user experiences. Skilled in React, Node.js, API development, and cloud deployment.',
  },
  experience: [
    {
      id: 'exp1',
      title: 'Senior Software Engineer',
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      startDate: 'Jun 2024',
      endDate: 'Present',
      location: 'San Francisco, CA',
      description: '• Developed modern web applications using React and Node.js.\n• Built reusable components, optimized performance, and integrated REST APIs for data-driven features.',
    },
    {
      id: 'exp2',
      title: 'Software Engineer',
      jobTitle: 'Software Engineer',
      company: 'Innovatech Labs',
      startDate: 'Jan 2022',
      endDate: 'May 2024',
      location: 'San Jose, CA',
      description: '• Worked on full stack product development with JavaScript, Express, and PostgreSQL.\n• Collaborated in agile teams to deliver customer-focused solutions and automation tools.',
    }
  ],
  education: [
    {
      id: 'edu1',
      school: 'University of California',
      institution: 'University of California',
      degree: 'B.S. in Computer Science',
      startDate: '',
      endDate: 'Jun 2020',
      location: 'Berkeley, CA',
    }
  ],
  projects: [
    {
      id: 'proj1',
      name: 'E-Commerce Platform - Full Stack Web Application',
      technologies: 'React | Node.js | MongoDB | Docker',
      duration: '',
      description: '• Designed and developed a full-stack e-commerce application with secure user authentication and REST API endpoints\n• Implemented database schema for efficient data retrieval and containerized application using Docker',
    },
    {
      id: 'proj2',
      name: 'Smart Home Dashboard - Capstone Project',
      technologies: 'Python | React | IoT Sensors | WebSockets',
      duration: '',
      description: '• Designed a real-time smart home monitoring system integrating IoT sensors with WebSockets\n• Developed Python backend to process sensor data and update dashboard status in real time',
    }
  ],
  skills: {
    programming: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'REST APIs', 'SQL', 'AWS', 'Docker']
  },
  certifications: [
    { id: 'cert1', name: 'AWS Certified Solutions Architect - Associate', issuer: 'AWS', date: '' },
    { id: 'cert2', name: 'Google Cloud Professional Cloud Developer', issuer: 'Google Cloud', date: '' },
    { id: 'cert3', name: 'Cisco - Networking & Python Essentials', issuer: 'Cisco Networking Academy', date: '' },
    { id: 'cert4', name: 'Microsoft Fundamentals', issuer: 'Coursera', date: '' }
  ],
  languages: [
    { id: 'lang1', name: 'English', proficiency: 'Native' }
  ]
};

const TemplateRenderer = ({ templateId, resumeData: rawResumeData, data: propData, isPreview = false }) => {
  const resumeData = rawResumeData || propData;
  const isAslam = templateId === 'aslam';
  const currentDummy = isAslam ? aslamDummyData : dummyData;

  const p = resumeData?.personalInfo || {};
  const d = currentDummy.personalInfo || {};

  const getSkillsArray = (s) => {
    if (!s) return [];
    if (Array.isArray(s)) return s.map(item => typeof item === 'object' ? item?.name || '' : item).filter(Boolean);
    return Object.values(s).flat().map(item => typeof item === 'object' ? item?.name || '' : item).filter(Boolean);
  };

  const renderSupplementalSections = (data) => {
    if (!data) return null;
    const { certifications = [], languages = [], projects = [], education = [], experience = [], settings = {} } = data;
    const primary = settings?.primaryColor || '#1e40af';
    const bullets = (text) => (
      <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{text.split('\n').map((line, i) => (
        line.trim().length > 0 ? <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem' }}><span style={{ color: primary }}>•</span> <span>{line.trim().replace(/^[•\-\*]\s*/, '')}</span></div> : null
      ))}</div>
    );

    return (
      <div style={{ marginTop: '1rem' }}>
        {certifications && certifications.length > 0 && (
          <div style={{ marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: primary }}>Certifications</h3>
            <ul style={{ marginTop: '0.3rem' }}>{certifications.map(c => <li key={c.id || c.name} style={{ color: '#334155' }}>{c.name} {c.issuer ? `— ${c.issuer}` : ''} {c.date ? `(${c.date})` : ''}</li>)}</ul>
          </div>
        )}
        {languages && languages.length > 0 && (
          <div style={{ marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: primary }}>Languages</h3>
            <ul style={{ marginTop: '0.3rem' }}>{languages.map(l => <li key={l.id || l.name} style={{ color: '#334155' }}>{l.name} {l.proficiency ? `— ${l.proficiency}` : ''}</li>)}</ul>
          </div>
        )}
        {projects && projects.length > 0 && (
          <div style={{ marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: primary }}>Projects</h3>
            {projects.map(p => (
              <div key={p.id || p.name} style={{ marginBottom: '0.4rem' }}>
                <div style={{ fontWeight: 'bold', color: '#111' }}>{p.name || p.title}</div>
                {p.description && bullets(p.description)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // For the aslam template, convert the builder's categorized skills object
  // into the {name, value} format that matches the screenshot's sorted order.
  const categoryLabels = {
    programming: 'Programming Languages',
    frameworks: 'Backend & Development',
    databases: 'Databases',
    cloud: 'Core Computer Science',
    tools: 'Tools & Technologies',
    soft: 'Soft Skills',
    other: 'Other Skills'
  };
  // Define the display order to match the screenshot
  const categoryOrder = ['programming', 'cloud', 'frameworks', 'databases', 'tools', 'soft', 'other'];

  const getAslamSkills = (s) => {
    if (!s) return [];
    // If skills are already an array of {name, value} objects (e.g. from import), keep them as-is
    if (Array.isArray(s)) return s.filter(Boolean);
    // Convert the builder's {programming: [...], databases: [...]} format 
    // into [{name: 'Programming Languages', value: 'SAP ABAP, Python'}, ...]
    const result = [];
    for (const key of categoryOrder) {
      const items = s[key];
      if (items && Array.isArray(items) && items.length > 0) {
        const skillNames = items.map(item => typeof item === 'object' ? item.name : item).filter(Boolean);
        if (skillNames.length > 0) {
          result.push({ name: categoryLabels[key] || key, value: skillNames.join(', ') });
        }
      }
    }
    return result;
  };

  const userSkills = getSkillsArray(resumeData?.skills);
  const aslamUserSkills = isAslam ? getAslamSkills(resumeData?.skills) : [];
  const dummySkills = isAslam ? (aslamDummyData.skills || []) : getSkillsArray(dummyData?.skills);
  const hasUserSkills = isAslam ? aslamUserSkills.length > 0 : userSkills.length > 0;

  // For lists: if the user has added ANY item to a list, we show the user's list.
  // Otherwise, we show the dummy list.
  const hasUserExperience = resumeData?.experience && resumeData.experience.length > 0 && resumeData.experience.some(e => e.company || e.title || e.jobTitle);
  const hasUserEducation = resumeData?.education && resumeData.education.length > 0 && resumeData.education.some(e => e.school || e.institution || e.degree);
  const hasUserProjects = resumeData?.projects && resumeData.projects.length > 0 && resumeData.projects.some(e => e.name || e.description);
  const hasUserCertifications = resumeData?.certifications && resumeData.certifications.length > 0 && resumeData.certifications.some(c => c.name);
  const hasUserLanguages = resumeData?.languages && resumeData.languages.length > 0 && resumeData.languages.some(l => l.name);

  const fallbackExperience = isAslam ? (aslamDummyData.experience || []) : dummyData.experience;
  const fallbackEducation = isAslam ? (aslamDummyData.education || []) : dummyData.education;
  const fallbackProjects = isAslam ? (aslamDummyData.projects || []) : dummyData.projects;
  const fallbackCertifications = isAslam ? (aslamDummyData.certifications || []) : dummyData.certifications;
  const fallbackLanguages = isAslam ? (aslamDummyData.languages || []) : dummyData.languages;

  const activeSettings = {
    showSummary: true,
    showExperience: true,
    showEducation: true,
    showProjects: true,
    showSkills: true,
    showCertifications: true,
    showLanguages: true,
    showCustomSections: true,
    ...dummyData.settings,
    ...resumeData?.settings
  };

  const mergedData = {
    ...resumeData,
    personalInfo: {
      fullName: p.fullName || (p.firstName ? `${p.firstName || ''} ${p.lastName || ''}`.trim() : '') || d.fullName,
      firstName: p.firstName || (p.fullName ? p.fullName.split(' ')[0] : '') || d.firstName,
      lastName: p.lastName || (p.fullName ? p.fullName.split(' ').slice(1).join(' ') : '') || d.lastName,
      jobTitle: p.jobTitle || d.jobTitle || '',
      email: p.email || d.email || '',
      phone: p.phone || d.phone || '',
      location: p.location || d.location || '',
      linkedin: p.linkedin || d.linkedin || '',
      github: p.github || d.github || '',
      website: p.website || d.website || '',
      portfolio: p.portfolio || d.portfolio || '',
      summary: (activeSettings.showSummary !== false) ? (p.summary || d.summary || '') : '',
      address: p.address || d.address || '',
      city: p.city || d.city || '',
      country: p.country || d.country || '',
    },
    experience: (activeSettings.showExperience !== false)
      ? (hasUserExperience ? resumeData.experience : fallbackExperience).map(exp => ({
        ...exp,
        title: exp.title || exp.jobTitle || '',
        jobTitle: exp.jobTitle || exp.title || '',
        school: exp.school || exp.institution || '',
        institution: exp.institution || exp.school || '',
        date: (exp.startDate || exp.endDate) ? `${exp.startDate || ''} - ${exp.endDate || ''}`.replace(/^ - | - $/g, '') : exp.date || '',
      }))
      : [],
    education: (activeSettings.showEducation !== false)
      ? (hasUserEducation ? resumeData.education : fallbackEducation).map(edu => ({
        ...edu,
        school: edu.school || edu.institution || '',
        institution: edu.institution || edu.school || '',
        date: (edu.startDate || edu.endDate) ? `${edu.startDate || ''} - ${edu.endDate || ''}`.replace(/^ - | - $/g, '') : edu.date || '',
      }))
      : [],
    projects: (activeSettings.showProjects !== false)
      ? (hasUserProjects ? resumeData.projects : fallbackProjects)
      : [],
    skills: (activeSettings.showSkills !== false)
      ? (isAslam
        ? (hasUserSkills ? aslamUserSkills : dummySkills)
        : (templateId === 'boxedmodern' || templateId === 'letscode')
          ? (hasUserSkills ? userSkills : dummySkills)
          : (hasUserSkills ? userSkills.map(s => typeof s === 'object' ? s.name : s) : dummySkills.map(s => typeof s === 'object' ? s.name : s)))
      : [],
    certifications: (activeSettings.showCertifications !== false)
      ? (hasUserCertifications ? resumeData.certifications : fallbackCertifications)
      : [],
    languages: (activeSettings.showLanguages !== false)
      ? (hasUserLanguages ? resumeData.languages : fallbackLanguages)
      : [],
    customSections: (activeSettings.showCustomSections !== false)
      ? (resumeData?.customSections || []).filter(cs => activeSettings[`show_custom_${cs.id}`] !== false)
      : [],
    settings: activeSettings
  };

  // Choose the template component
  let TemplateComponent = VisionaryTemplate;
  switch (templateId) {
    case 'visionary': TemplateComponent = VisionaryTemplate; break;
    case 'artistic': TemplateComponent = ArtisticTemplate; break;
    case 'soothing': TemplateComponent = SoothingTemplate; break;
    case 'executive': TemplateComponent = ExecutiveTemplate; break;
    case 'trailblazer': TemplateComponent = TrailblazerTemplate; break;
    case 'basic': TemplateComponent = BasicTemplate; break;
    case 'classic': TemplateComponent = ClassicTemplate; break;
    case 'minimalclassic': TemplateComponent = MinimalClassicTemplate; break;
    case 'centeredmodern': TemplateComponent = CenteredModernTemplate; break;
    case 'photomodern': TemplateComponent = PhotoModernTemplate; break;
    case 'tealheader': TemplateComponent = TealHeaderTemplate; break;
    case 'boxedmodern': TemplateComponent = BoxedModernTemplate; break;
    case 'janet': TemplateComponent = JanetTemplate; break;
    case 'aslam': TemplateComponent = AslamTemplate; break;
    case 'letscode': TemplateComponent = LetsCodeTemplate; break;
    case 'multicolor':
    default: TemplateComponent = MultiColorTemplate; break;
  }

  const fontFamilyMap = {
    'Inter': "'Inter', system-ui, -apple-system, sans-serif",
    'Plus Jakarta Sans': "'Plus Jakarta Sans', system-ui, sans-serif",
    'Outfit': "'Outfit', system-ui, sans-serif",
    'Geist': "'Geist', monospace, sans-serif",
    'Roboto': "'Roboto', sans-serif",
    'Merriweather': "'Merriweather', Georgia, serif",
    'Playfair Display': "'Playfair Display', Georgia, serif"
  };

  const selectedFont = fontFamilyMap[activeSettings.fontFamily] || activeSettings.fontFamily || "'Inter', sans-serif";

  const fontSizeMap = {
    'Small': '12px',
    'Medium': '13.5px',
    'Large': '15px'
  };
  const selectedFontSize = fontSizeMap[activeSettings.fontSize] || '13.5px';
  const selectedLineHeight = activeSettings.lineSpacing || '1.4';

  return (
    <div
      className="customized-resume-wrapper"
      data-font-size={activeSettings.fontSize || 'Medium'}
      style={{
        fontFamily: selectedFont,
        fontSize: selectedFontSize,
        lineHeight: selectedLineHeight,
        '--resume-font-family': selectedFont,
        '--resume-font-size': selectedFontSize,
        '--resume-line-spacing': selectedLineHeight,
        '--primary-color': activeSettings.primaryColor || '#1e40af',
        '--primary': activeSettings.primaryColor || '#1e40af',
        '--secondary-color': activeSettings.secondaryColor || '#4f46e5'
      }}
    >
      <style>{`
        .customized-resume-wrapper,
        .customized-resume-wrapper p,
        .customized-resume-wrapper div,
        .customized-resume-wrapper span,
        .customized-resume-wrapper li,
        .customized-resume-wrapper h1,
        .customized-resume-wrapper h2,
        .customized-resume-wrapper h3,
        .customized-resume-wrapper h4 {
          font-family: ${selectedFont} !important;
        }
      `}</style>
      <TemplateComponent resumeData={mergedData} />
    </div>
  );
};

export default React.memo(TemplateRenderer);

