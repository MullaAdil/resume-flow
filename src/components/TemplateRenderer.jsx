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
import AslamTemplate from './templates/AslamTemplate';
import LetsCodeTemplate from './templates/LetsCodeTemplate';
import StandOutTemplate from './templates/StandOutTemplate';
import MaverickTemplate from './templates/MaverickTemplate';
import CustomFramedTemplate from './templates/CustomFramedTemplate';
import KaiCarterTemplate from './templates/KaiCarterTemplate';
import MagneticTemplate from './templates/MagneticTemplate';
import SuperbTemplate from './templates/SuperbTemplate';
import VertexTemplate from './templates/VertexTemplate';
import PinkHeaderTemplate from './templates/PinkHeaderTemplate';

// Sample data for gallery/showcase previews ONLY
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
      date: 'Jun 2024 - Present',
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
      date: 'Jan 2022 - May 2024',
      location: 'San Jose, CA',
      description: '• Worked on full stack product development with JavaScript, Express, and PostgreSQL.\n• Collaborated in agile teams to deliver customer-focused solutions and automation tools.',
    }
  ],
  education: [
    {
      id: 'edu1',
      school: 'University of California, Berkeley',
      institution: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      startDate: '2016',
      endDate: '2020',
      date: '2016 - 2020',
      location: 'Berkeley, CA',
    }
  ],
  projects: [
    {
      id: 'proj1',
      name: 'E-Commerce Platform',
      technologies: 'React | Node.js | MongoDB | Docker',
      duration: '2023',
      date: '2023',
      description: '• Designed and developed a full-stack e-commerce application with secure authentication.\n• Built backend architecture following MVC pattern with REST API endpoints.\n• Containerized the entire application using Docker ensuring zero configuration issues.',
    }
  ],
  skills: {
    programming: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'REST APIs', 'SQL', 'AWS', 'Docker']
  },
  certifications: [
    { id: 'cert1', name: 'AWS Certified Solutions Architect', issuer: 'AWS', date: '2023' }
  ],
  languages: [
    { id: 'lang1', name: 'English', proficiency: 'Native' }
  ]
};

const TemplateRenderer = ({ templateId, resumeData: rawResumeData, data: propData, isPreview = false }) => {
  const incomingData = rawResumeData || propData;
  const isGalleryPreview = isPreview && (!incomingData || (!incomingData.personalInfo?.fullName && (!incomingData.experience || incomingData.experience.length === 0)));
  const resumeData = isGalleryPreview ? dummyData : (incomingData || {});

  const p = resumeData?.personalInfo || {};

  const getSkillsArray = (s) => {
    if (!s) return [];
    if (Array.isArray(s)) return s.map(item => typeof item === 'object' ? item?.name || '' : item).filter(Boolean);
    return Object.values(s).flat().map(item => typeof item === 'object' ? item?.name || '' : item).filter(Boolean);
  };

  const categoryLabels = {
    programming: 'Programming Languages',
    frameworks: 'Backend & Development',
    databases: 'Databases',
    cloud: 'Core Computer Science',
    tools: 'Tools & Technologies',
    soft: 'Soft Skills',
    other: 'Other Skills'
  };
  const categoryOrder = ['programming', 'cloud', 'frameworks', 'databases', 'tools', 'soft', 'other'];

  const getAslamSkills = (s) => {
    if (!s) return [];
    if (Array.isArray(s)) return s.filter(Boolean);
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

  const isAslam = templateId === 'aslam';
  const rawExperience = Array.isArray(resumeData?.experience) ? resumeData.experience : [];
  const rawEducation = Array.isArray(resumeData?.education) ? resumeData.education : [];
  const rawProjects = Array.isArray(resumeData?.projects) ? resumeData.projects : [];
  const rawCertifications = Array.isArray(resumeData?.certifications) ? resumeData.certifications : [];
  const rawLanguages = Array.isArray(resumeData?.languages) ? resumeData.languages : [];

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

  const validExperience = rawExperience
    .filter(e => e && (e.company || e.title || e.jobTitle || e.description))
    .map(exp => ({
      ...exp,
      title: exp.title || exp.jobTitle || '',
      jobTitle: exp.jobTitle || exp.title || '',
      school: exp.school || exp.institution || '',
      institution: exp.institution || exp.school || '',
      date: (exp.startDate || exp.endDate) ? `${exp.startDate || ''}${exp.endDate ? ' - ' + exp.endDate : ''}` : exp.date || '',
    }));

  const validEducation = rawEducation
    .filter(e => e && (e.school || e.institution || e.degree))
    .map(edu => ({
      ...edu,
      school: edu.school || edu.institution || '',
      institution: edu.institution || edu.school || '',
      date: (edu.startDate || edu.endDate) ? `${edu.startDate || ''}${edu.endDate ? ' - ' + edu.endDate : ''}` : edu.date || '',
    }));

  const validProjects = rawProjects
    .filter(p => p && (p.name || p.title || p.description))
    .map(proj => ({
      ...proj,
      name: proj.name || proj.title || '',
      date: proj.duration || proj.date || '',
      duration: proj.duration || proj.date || ''
    }));

  const validCertifications = rawCertifications
    .filter(c => c && (c.name || c.title))
    .map(c => ({
      ...c,
      name: c.name || c.title || ''
    }));

  const validLanguages = rawLanguages
    .filter(l => l && (typeof l === 'string' ? l.trim() : l.name))
    .map(l => ({
      ...l,
      name: typeof l === 'object' ? l.name || '' : String(l),
      proficiency: typeof l === 'object' ? l.proficiency || '' : ''
    }));

  const userSkills = getSkillsArray(resumeData?.skills);
  const aslamUserSkills = isAslam ? getAslamSkills(resumeData?.skills) : [];

  const experienceList = (activeSettings.showExperience !== false) ? validExperience : [];
  const educationList = (activeSettings.showEducation !== false) ? validEducation : [];
  const projectsList = (activeSettings.showProjects !== false) ? validProjects : [];
  const certificationsList = (activeSettings.showCertifications !== false) ? validCertifications : [];
  const languagesList = (activeSettings.showLanguages !== false) ? validLanguages : [];

  let skillsList = [];
  if (activeSettings.showSkills !== false) {
    if (isAslam) {
      skillsList = aslamUserSkills;
    } else if (templateId === 'boxedmodern' || templateId === 'letscode') {
      skillsList = userSkills;
    } else {
      skillsList = userSkills.map(s => typeof s === 'object' ? s.name : s).filter(Boolean);
    }
  }

  const mergedData = {
    ...resumeData,
    personalInfo: {
      fullName: (p.fullName && p.fullName.trim()) || (p.firstName ? `${p.firstName || ''} ${p.lastName || ''}`.trim() : '') || '',
      firstName: p.firstName || (p.fullName ? p.fullName.split(' ')[0] : '') || '',
      lastName: p.lastName || (p.fullName ? p.fullName.split(' ').slice(1).join(' ') : '') || '',
      jobTitle: (p.jobTitle && p.jobTitle.trim()) || '',
      email: (p.email && p.email.trim()) || '',
      phone: (p.phone && p.phone.trim()) || '',
      location: (p.location && p.location.trim()) || '',
      linkedin: (p.linkedin && p.linkedin.trim()) || '',
      github: (p.github && p.github.trim()) || '',
      website: (p.website && p.website.trim()) || '',
      portfolio: (p.portfolio && p.portfolio.trim()) || '',
      summary: (activeSettings.showSummary !== false && p.summary && p.summary.trim()) ? p.summary.trim() : '',
      address: p.address || '',
      city: p.city || '',
      country: p.country || '',
    },
    experience: experienceList,
    education: educationList,
    projects: projectsList,
    skills: skillsList,
    certifications: certificationsList,
    languages: languagesList,
    customSections: (activeSettings.showCustomSections !== false)
      ? (resumeData?.customSections || []).filter(cs => cs && cs.title && activeSettings[`show_custom_${cs.id}`] !== false)
      : [],
    settings: activeSettings
  };

  // Choose the template component
  let TemplateComponent = MultiColorTemplate;
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
    case 'standout': TemplateComponent = StandOutTemplate; break;
    case 'maverick': TemplateComponent = MaverickTemplate; break;
    case 'customframed':
    case 'ai_custom': TemplateComponent = CustomFramedTemplate; break;
    case 'kaicarter': TemplateComponent = KaiCarterTemplate; break;
    case 'magnetic': TemplateComponent = MagneticTemplate; break;
    case 'superb': TemplateComponent = SuperbTemplate; break;
    case 'vertex': TemplateComponent = VertexTemplate; break;
    case 'pinkheader': TemplateComponent = PinkHeaderTemplate; break;
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
    'Small': '13px',
    'Medium': '14.5px',
    'Large': '16px'
  };
  const selectedFontSize = fontSizeMap[activeSettings.fontSize] || '14.5px';

  const fontScaleMap = {
    'Small': 0.9,
    'Medium': 1.0,
    'Large': 1.1
  };
  const fontScale = fontScaleMap[activeSettings.fontSize] || 1.0;
  const selectedLineHeight = activeSettings.lineSpacing || '1.5';
  const primaryAccent = activeSettings.primaryColor || '#6366F1';
  const secondaryAccent = activeSettings.secondaryColor || '#4F46E5';

  return (
    <div
      className="customized-resume-wrapper"
      data-font-size={activeSettings.fontSize || 'Medium'}
      style={{
        width: '800px',
        minHeight: '1131.42857px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor: '#FFFFFF',
        fontFamily: selectedFont,
        fontSize: selectedFontSize,
        lineHeight: selectedLineHeight,
        '--resume-font-family': selectedFont,
        '--resume-font-size': selectedFontSize,
        '--resume-line-spacing': selectedLineHeight,
        '--primary-color': primaryAccent,
        '--primary': primaryAccent,
        '--primary-hover': secondaryAccent,
        '--secondary-color': secondaryAccent
      }}
    >
      <style>{`
        .customized-resume-wrapper,
        .customized-resume-wrapper * {
          font-family: ${selectedFont} !important;
        }
        .customized-resume-wrapper p,
        .customized-resume-wrapper li,
        .customized-resume-wrapper span,
        .customized-resume-wrapper div {
          line-height: ${selectedLineHeight} !important;
        }
        ${fontScale !== 1.0 ? `
          .customized-resume-wrapper p,
          .customized-resume-wrapper li,
          .customized-resume-wrapper span {
            font-size: ${selectedFontSize} !important;
          }
        ` : ''}
      `}</style>
      <TemplateComponent resumeData={mergedData} />
    </div>
  );
};

export default React.memo(TemplateRenderer);


