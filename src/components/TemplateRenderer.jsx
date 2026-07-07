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
    jobTitle: 'Senior Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    website: 'johndoe.com',
    portfolio: 'portfolio.johndoe.com',
    summary: 'Highly motivated and detail-oriented Software Engineer with over 8 years of experience building scalable web applications. Proven track record of leading teams, optimizing performance, and delivering high-quality software solutions on time.',
  },
  experience: [
    {
      id: 'exp1',
      title: 'Senior Software Engineer',
      jobTitle: 'Senior Software Engineer',
      company: 'Tech Innovators Inc.',
      startDate: 'Jan 2020',
      endDate: 'Present',
      location: 'San Francisco, CA',
      description: '• Led the development of a microservices architecture that improved system scalability by 40%.\n• Mentored junior engineers and conducted code reviews to ensure best practices.\n• Reduced page load times by 30% through advanced caching strategies.',
    },
    {
      id: 'exp2',
      title: 'Software Engineer',
      jobTitle: 'Software Engineer',
      company: 'Creative Solutions',
      startDate: 'Mar 2016',
      endDate: 'Dec 2019',
      location: 'New York, NY',
      description: '• Developed and maintained RESTful APIs used by over 100,000 active users.\n• Collaborated with product managers and designers to launch 3 major product features.\n• Integrated third-party payment gateways, processing over $1M in transactions.',
    }
  ],
  education: [
    {
      id: 'edu1',
      school: 'University of California, Berkeley',
      institution: 'University of California, Berkeley',
      degree: 'Master of Science in Computer Science',
      startDate: 'Aug 2014',
      endDate: 'May 2016',
      location: 'Berkeley, CA',
      cgpa: '3.9/4.0',
    },
    {
      id: 'edu2',
      school: 'University of Washington',
      institution: 'University of Washington',
      degree: 'Bachelor of Science in Software Engineering',
      startDate: 'Sep 2010',
      endDate: 'Jun 2014',
      location: 'Seattle, WA',
      cgpa: '3.8/4.0',
    }
  ],
  projects: [
    {
      id: 'proj1',
      name: 'E-commerce Platform Migration',
      duration: 'Jan 2022 - Jun 2022',
      description: 'Successfully migrated a legacy monolithic e-commerce platform to a modern React and Node.js stack, resulting in a 50% increase in mobile conversions and zero downtime.',
    },
    {
      id: 'proj2',
      name: 'Real-time Analytics Dashboard',
      duration: 'Mar 2021 - Sep 2021',
      description: 'Built a real-time analytics dashboard using WebSockets and D3.js, allowing business stakeholders to monitor key performance indicators instantly.',
    }
  ],
  skills: {
    programming: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'GraphQL', 'AWS', 'Docker']
  },
  certifications: [
    { id: 'cert1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2021' },
    { id: 'cert2', name: 'Certified Scrum Master (CSM)', issuer: 'Scrum Alliance', date: '2019' }
  ],
  languages: [
    { id: 'lang1', name: 'English', proficiency: 'Native' },
    { id: 'lang2', name: 'Spanish', proficiency: 'Conversational' }
  ]
};

const TemplateRenderer = ({ templateId, resumeData }) => {
  const isAslam = templateId === 'aslam';
  const currentDummy = isAslam ? aslamDummyData : dummyData;

  const p = resumeData?.personalInfo || {};
  const d = currentDummy.personalInfo || {};

  const getSkillsArray = (s) => {
    if (!s) return [];
    if (Array.isArray(s)) return s.filter(Boolean);
    return Object.values(s).flat().filter(Boolean);
  };

  const renderSupplementalSections = (data) => {
    if (!data) return null;
    const { certifications = [], languages = [], projects = [], education = [], experience = [], settings = {} } = data;
    const primary = settings?.primaryColor || '#1e40af';
    const bullets = (text) => (
      <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{text.split('\n').map((line, i) => (
        line.trim().length > 0 ? <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem' }}><span style={{ color: primary }}>•</span> <span>{line}</span></div> : null
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

  const mergedData = {
    ...resumeData,
    personalInfo: {
      fullName: p.fullName || (p.firstName ? `${p.firstName || ''} ${p.lastName || ''}`.trim() : ''),
      firstName: p.firstName || (p.fullName ? p.fullName.split(' ')[0] : ''),
      lastName: p.lastName || (p.fullName ? p.fullName.split(' ').slice(1).join(' ') : ''),
      jobTitle: p.jobTitle || '',
      email: p.email || '',
      phone: p.phone || '',
      location: p.location || '',
      linkedin: p.linkedin || '',
      github: p.github || '',
      website: p.website || '',
      portfolio: p.portfolio || '',
      summary: p.summary || '',
      address: p.address || '',
      city: p.city || '',
      country: p.country || '',
    },
    experience: (resumeData?.experience || []).map(exp => ({
      ...exp,
      title: exp.title || exp.jobTitle || '',
      jobTitle: exp.jobTitle || exp.title || '',
      school: exp.school || exp.institution || '',
      institution: exp.institution || exp.school || '',
      date: exp.date || (exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : exp.startDate || exp.endDate || ''),
    })),
    education: (resumeData?.education || []).map(edu => ({
      ...edu,
      school: edu.school || edu.institution || '',
      institution: edu.institution || edu.school || '',
      date: edu.date || (edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.startDate || edu.endDate || ''),
    })),
    projects: resumeData?.projects || [],
    skills: isAslam
      ? aslamUserSkills
      : (templateId === 'boxedmodern' || templateId === 'letscode') 
        ? userSkills
        : userSkills.map(s => typeof s === 'object' ? s.name : s),
    certifications: resumeData?.certifications || [],
    languages: resumeData?.languages || [],
    customSections: resumeData?.customSections || [],
    settings: resumeData?.settings || dummyData.settings || {}
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

  const renderCustomSections = (sections = [], settings = {}) => {
    if (settings.showCustomSections === false) return null;
    if (!sections || sections.length === 0) return null;
    const filtered = sections.filter(s => s && s.title);
    if (filtered.length === 0) return null;

    const primary = mergedData.settings?.primaryColor || '#1e40af';

    return (
      <div style={{ marginTop: '1.25rem' }}>
        {filtered.map((sec, idx) => (
          <div key={sec.id || idx} style={{ marginBottom: '0.8rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: primary, borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem', marginBottom: '0.6rem' }}>{sec.title}</h3>
            {sec.description && (
              <div style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                {sec.description.split('\n').map((line, i) => (
                  line.trim().length > 0 ? <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem' }}><span style={{ color: primary }}>•</span> <span>{line}</span></div> : null
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render the template component with the merged data; templates
  // should include `SupplementalSections` to display extras inside themselves.
  return <TemplateComponent resumeData={mergedData} />;
};

export default TemplateRenderer;
