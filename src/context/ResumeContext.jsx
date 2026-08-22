import React, { createContext, useState, useEffect, useContext } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import mammoth from 'mammoth';

try {
  if (pdfjsLib && pdfjsLib.GlobalWorkerOptions) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
  }
} catch (e) {
  console.warn('PDF.js worker assignment warning:', e);
}

const ResumeContext = createContext();
export const useResume = () => useContext(ResumeContext);

export const sampleResumeData = {
  profileType: 'professional',
  personalInfo: {
    fullName: 'John Doe',
    jobTitle: 'Senior Full Stack Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    summary: 'Experienced Full Stack Engineer with 6+ years of expertise in architecting cloud-native web applications, distributed APIs, and scalable user interfaces with React, Node.js, and modern TypeScript.',
    portfolio: 'https://johndoe.dev',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    website: 'https://johndoe.dev'
  },
  experience: [
    {
      id: 'exp_sample_1',
      title: 'Lead Software Engineer',
      jobTitle: 'Lead Software Engineer',
      company: 'Apex Technologies',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      date: 'Jan 2022 - Present',
      currentPosition: true,
      description: '• Spearheaded migration from legacy monolith to React & Node.js microservices, boosting throughput by 45%.\n• Designed scalable RESTful APIs serving 2M+ active monthly users.\n• Led code reviews and mentored a distributed team of 8 engineers.',
      technologies: 'React, TypeScript, Node.js, AWS, PostgreSQL'
    },
    {
      id: 'exp_sample_2',
      title: 'Full Stack Developer',
      jobTitle: 'Full Stack Developer',
      company: 'CloudScale Solutions',
      location: 'San Jose, CA',
      startDate: 'Aug 2019',
      endDate: 'Dec 2021',
      date: 'Aug 2019 - Dec 2021',
      currentPosition: false,
      description: '• Developed responsive single-page web applications with React, Redux, and Express.\n• Implemented automated CI/CD deployment pipelines on Docker and Kubernetes.\n• Collaborated with UX designers to build accessible UI design system components.',
      technologies: 'JavaScript, React, Express, MongoDB, Docker'
    }
  ],
  education: [
    {
      id: 'edu_sample_1',
      school: 'University of California, Berkeley',
      institution: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      location: 'Berkeley, CA',
      startDate: '2015',
      endDate: '2019',
      date: '2015 - 2019',
      cgpa: '3.8 / 4.0',
      details: "Dean's Honor List, Academic Excellence in Software Engineering"
    }
  ],
  projects: [
    {
      id: 'proj_sample_1',
      name: 'Distributed Cloud Dashboard',
      technologies: 'React, Node.js, GraphQL, Redis, Docker',
      duration: '2023 - 2024',
      date: '2023 - 2024',
      description: '• Architected real-time analytics monitoring dashboard for microservice clusters.\n• Reduced metric aggregation latency by 60% using Redis caching and WebSocket streams.'
    }
  ],
  skills: {
    programming: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'HTML5/CSS3', 'SQL'],
    frameworks: ['React', 'Node.js', 'Express', 'Next.js', 'TailwindCSS'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis'],
    cloud: ['AWS', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'REST APIs'],
    tools: ['Git', 'Vite', 'Postman', 'Webpack', 'Jest'],
    soft: ['Technical Leadership', 'Agile/Scrum', 'System Architecture', 'Problem Solving'],
    other: []
  },
  certifications: [
    {
      id: 'cert_sample_1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023'
    }
  ],
  languages: [
    { id: 'lang_sample_1', name: 'English', proficiency: 'Native' },
    { id: 'lang_sample_2', name: 'Spanish', proficiency: 'Conversational' }
  ],
  interests: ['Open Source Contributing', 'Cloud Computing', 'AI & Machine Learning', 'Cycling'],
  customSections: [],
  settings: {
    fontFamily: 'Inter',
    fontSize: 'Medium',
    primaryColor: '#6366F1',
    secondaryColor: '#4F46E5',
    lineSpacing: '1.5',
    margins: 'Standard',
    pageSize: 'A4',
    showPhoto: true,
    iconsEnabled: true
  }
};

export const emptyState = {
  profileType: null,
  personalInfo: { fullName: '', jobTitle: '', email: '', phone: '', location: '', summary: '', portfolio: '', linkedin: '', github: '', website: '' },
  experience: [], education: [], projects: [], skills: { programming: [], frameworks: [], databases: [], cloud: [], tools: [], soft: [], other: [] },
  certifications: [], publications: [], awards: [], languages: [], interests: [], volunteer: [], references: [], customSections: [],
  settings: { fontFamily: 'Inter', fontSize: 'Medium', primaryColor: '#6366F1', secondaryColor: '#4F46E5', lineSpacing: '1.5', margins: 'Standard', pageSize: 'A4', showPhoto: true, iconsEnabled: true }
};

export const defaultState = sampleResumeData;

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem('lumen_resume_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.personalInfo || parsed.experience || parsed.education || parsed.skills)) {
          return parsed;
        }
      }
      return defaultState;
    } catch {
      return defaultState;
    }
  });

  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    try {
      return localStorage.getItem('lumen_selected_template') || 'multicolor';
    } catch {
      return 'multicolor';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lumen_resume_draft', JSON.stringify(resumeData));
    } catch (e) {
      console.warn('Failed to save resume draft:', e);
    }
  }, [resumeData]);

  useEffect(() => {
    try {
      localStorage.setItem('lumen_selected_template', selectedTemplate);
    } catch (e) {
      console.warn('Failed to save selected template:', e);
    }
  }, [selectedTemplate]);

  const resetResume = () => {
    try {
      localStorage.removeItem('lumen_resume_draft');
    } catch {}
    setResumeData(sampleResumeData);
    setSelectedTemplate('multicolor');
  };

  const loadSampleData = () => {
    setResumeData(JSON.parse(JSON.stringify(sampleResumeData)));
  };

  const clearAllData = () => {
    setResumeData(JSON.parse(JSON.stringify(emptyState)));
  };

  const clearSection = (sectionName) => {
    setResumeData(prev => {
      const next = { ...prev };
      if (sectionName === 'personal') {
        next.personalInfo = { ...emptyState.personalInfo };
      } else if (sectionName === 'summary') {
        next.personalInfo = { ...next.personalInfo, summary: '' };
      } else if (sectionName === 'skills') {
        next.skills = { programming: [], frameworks: [], databases: [], cloud: [], tools: [], soft: [], other: [] };
      } else if (Array.isArray(next[sectionName])) {
        next[sectionName] = [];
      } else {
        next[sectionName] = [];
      }
      return next;
    });
  };

  const updateSection = (section, data) => setResumeData(prev => ({ ...prev, [section]: data }));
  const _updateSection = (section, data) => updateSection(section, data);

  const updatePersonalInfo = (field, value) => setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  const setProfileType = (type) => setResumeData(prev => ({ ...prev, profileType: type }));
  const addItem = (section, item) => setResumeData(prev => ({ ...prev, [section]: [...(prev[section] || []), { ...item, id: Date.now().toString() }] }));
  const updateItem = (section, id, updated) => setResumeData(prev => ({ ...prev, [section]: (prev[section] || []).map(i => i.id === id ? { ...i, ...updated } : i) }));
  const removeItem = (section, id) => setResumeData(prev => ({ ...prev, [section]: (prev[section] || []).filter(i => i.id !== id) }));
  const updateSkills = (category, skillsArray) => setResumeData(prev => ({ ...prev, skills: { ...(prev.skills || {}), [category]: skillsArray } }));
  const updateSettings = (field, value) => setResumeData(prev => ({ ...prev, settings: { ...prev.settings, [field]: value } }));

  const addExperience = () => setResumeData(prev => ({
    ...prev,
    experience: [...(prev.experience || []), { id: 'exp_' + Date.now(), title: '', jobTitle: '', company: '', startDate: '', endDate: '', location: '', description: '' }]
  }));
  const updateExperience = (index, field, value) => setResumeData(prev => {
    const nextExp = [...(prev.experience || [])];
    if (nextExp[index]) {
      nextExp[index] = { ...nextExp[index], [field]: value };
    }
    return { ...prev, experience: nextExp };
  });
  const removeExperience = (index) => setResumeData(prev => {
    const nextExp = [...(prev.experience || [])];
    nextExp.splice(index, 1);
    return { ...prev, experience: nextExp };
  });

  const addEducation = () => setResumeData(prev => ({
    ...prev,
    education: [...(prev.education || []), { id: 'edu_' + Date.now(), school: '', institution: '', degree: '', startDate: '', endDate: '', location: '', cgpa: '' }]
  }));
  const updateEducation = (index, field, value) => setResumeData(prev => {
    const nextEdu = [...(prev.education || [])];
    if (nextEdu[index]) {
      nextEdu[index] = { ...nextEdu[index], [field]: value };
    }
    return { ...prev, education: nextEdu };
  });
  const removeEducation = (index) => setResumeData(prev => {
    const nextEdu = [...(prev.education || [])];
    nextEdu.splice(index, 1);
    return { ...prev, education: nextEdu };
  });

  const addSkill = (category, skillsArray) => setResumeData(prev => ({
    ...prev,
    skills: { ...(prev.skills || {}), [category]: skillsArray }
  }));
  const removeSkill = (category, index) => setResumeData(prev => {
    const skills = [...(prev.skills?.[category] || [])];
    skills.splice(index, 1);
    return { ...prev, skills: { ...(prev.skills || {}), [category]: skills } };
  });

  const cleanExtractedString = (str) => {
    if (!str || typeof str !== 'string') return '';
    let clean = str.trim();

    // Strip leading bullet symbols
    clean = clean.replace(/^[•\-\*\u2022\u2023\u25B6\u25C0\u25A0\u25AA\u25AB\u25CF\u25CB\u25E6\u25A1\u25A0\u203A\u2039\u27A1\u27A2\u2794\u2799\u279C\u279D\u279E\u279F\u27B1\u27B2\u27B3\u27B4\u27B5\u27B6\u27B7\u27B8\u27B9\u27BA\u27BB\u27BC\u27BD\u27BE\u27BF\s]+/gu, '');

    // Strip common field prefix labels
    clean = clean.replace(/^(full name|name|job title|role|title|email|phone|mobile|location|address|company|organization|employer|school|institution|college|university|degree|summary|profile|description|skills|projects|experience|education|certifications|languages)\s*[:|-]\s*/i, '');

    // Strip page numbers & header/footer noise
    clean = clean.replace(/\bPage\s+\d+(\s+of\s+\d+)?\b/gi, '');
    clean = clean.replace(/^(curriculum vitae|resume|cv|confidential|downloaded from|created with)\s*/gi, '');

    // Strip trailing colons or bullets at beginning
    clean = clean.replace(/^[:\s•\-\*]+/, '');

    // Strip known placeholder values
    const placeholderValues = [
      'role title', 'company name', 'job title', 'school name', 'degree name',
      'candidate name', 'project name', 'organization name', 'institution name'
    ];
    if (placeholderValues.includes(clean.toLowerCase())) {
      return '';
    }

    return clean.trim();
  };

  const normalizeExtractedResumeData = (parsed) => {
    const merged = { ...emptyState, ...(parsed || {}) };
    
    // Personal Info
    const p = merged.personalInfo || {};
    merged.personalInfo = {
      fullName: cleanExtractedString(p.fullName || p.name || (p.firstName ? `${p.firstName} ${p.lastName || ''}`.trim() : '')),
      jobTitle: cleanExtractedString(p.jobTitle || p.title || p.role || ''),
      email: cleanExtractedString(p.email || ''),
      phone: cleanExtractedString(p.phone || p.mobile || ''),
      location: cleanExtractedString(p.location || p.address || p.city || ''),
      summary: cleanExtractedString(p.summary || p.profile || p.about || ''),
      portfolio: cleanExtractedString(p.portfolio || p.website || p.github || ''),
      linkedin: cleanExtractedString(p.linkedin || ''),
      github: cleanExtractedString(p.github || ''),
      website: cleanExtractedString(p.website || '')
    };

    // Experience
    if (Array.isArray(merged.experience)) {
      merged.experience = merged.experience
        .filter(exp => exp && (exp.company || exp.title || exp.jobTitle || exp.description))
        .map((exp, idx) => {
          const title = cleanExtractedString(exp.title || exp.jobTitle || exp.position || exp.role || '');
          const company = cleanExtractedString(exp.company || exp.organization || exp.employer || '');
          const desc = cleanExtractedString(exp.description || exp.achievements || exp.details || '');
          const startDate = cleanExtractedString(exp.startDate || exp.date?.split('-')?.[0]?.trim() || '');
          const endDate = cleanExtractedString(exp.endDate || exp.date?.split('-')?.[1]?.trim() || '');
          const date = (startDate || endDate)
            ? `${startDate}${endDate ? ' - ' + endDate : ''}`
            : cleanExtractedString(exp.date || '');

          return {
            id: exp.id || `exp_${Date.now()}_${idx}`,
            title,
            jobTitle: title,
            company,
            location: cleanExtractedString(exp.location || ''),
            startDate,
            endDate,
            date,
            currentPosition: Boolean(exp.currentPosition || (endDate && endDate.toLowerCase().includes('present'))),
            description: desc,
            technologies: cleanExtractedString(exp.technologies || '')
          };
        })
        .filter(exp => exp.title || exp.company || exp.description);
    } else {
      merged.experience = [];
    }

    // Education
    if (Array.isArray(merged.education)) {
      merged.education = merged.education
        .filter(edu => edu && (edu.school || edu.institution || edu.degree || edu.fieldOfStudy))
        .map((edu, idx) => {
          const inst = cleanExtractedString(edu.school || edu.institution || edu.university || edu.college || '');
          const degree = cleanExtractedString(edu.degree || edu.fieldOfStudy || edu.branch || '');
          const startDate = cleanExtractedString(edu.startDate || '');
          const endDate = cleanExtractedString(edu.endDate || edu.year || '');
          const date = (startDate || endDate)
            ? `${startDate}${endDate ? ' - ' + endDate : ''}`
            : cleanExtractedString(edu.date || edu.year || '');

          return {
            id: edu.id || `edu_${Date.now()}_${idx}`,
            school: inst,
            institution: inst,
            degree,
            location: cleanExtractedString(edu.location || ''),
            startDate,
            endDate,
            date,
            cgpa: cleanExtractedString(edu.cgpa || edu.gpa || ''),
            details: cleanExtractedString(edu.details || edu.description || '')
          };
        })
        .filter(edu => edu.school || edu.degree);
    } else {
      merged.education = [];
    }

    // Projects
    if (Array.isArray(merged.projects)) {
      merged.projects = merged.projects
        .filter(proj => proj && (proj.name || proj.title || proj.description))
        .map((proj, idx) => {
          const name = cleanExtractedString(proj.name || proj.title || '');
          const duration = cleanExtractedString(proj.duration || proj.date || '');
          return {
            id: proj.id || `proj_${Date.now()}_${idx}`,
            name,
            technologies: cleanExtractedString(proj.technologies || proj.techStack || ''),
            duration,
            date: duration,
            description: cleanExtractedString(proj.description || proj.details || '')
          };
        })
        .filter(proj => proj.name || proj.description);
    } else {
      merged.projects = [];
    }

    // Skills
    if (merged.skills) {
      if (Array.isArray(merged.skills)) {
        const cleanArr = merged.skills
          .map(s => typeof s === 'object' ? s.name || s.value || '' : String(s))
          .map(cleanExtractedString)
          .filter(Boolean);
        merged.skills = {
          programming: cleanArr.slice(0, 10),
          frameworks: [],
          databases: [],
          cloud: [],
          tools: cleanArr.slice(10),
          soft: [],
          other: []
        };
      } else if (typeof merged.skills === 'object') {
        const newSkills = { programming: [], frameworks: [], databases: [], cloud: [], tools: [], soft: [], other: [] };
        for (const [k, arr] of Object.entries(merged.skills)) {
          const targetKey = newSkills[k] !== undefined ? k : 'other';
          if (Array.isArray(arr)) {
            newSkills[targetKey] = arr
              .map(s => typeof s === 'object' ? s.name || s.value || '' : String(s))
              .map(cleanExtractedString)
              .filter(Boolean);
          } else if (typeof arr === 'string') {
            newSkills[targetKey] = arr
              .split(/[,•|]/)
              .map(cleanExtractedString)
              .filter(Boolean);
          }
        }
        merged.skills = newSkills;
      }
    } else {
      merged.skills = { programming: [], frameworks: [], databases: [], cloud: [], tools: [], soft: [], other: [] };
    }

    // Certifications
    if (Array.isArray(merged.certifications)) {
      merged.certifications = merged.certifications
        .filter(c => c && (c.name || c.title))
        .map((c, idx) => ({
          id: c.id || `cert_${Date.now()}_${idx}`,
          name: cleanExtractedString(c.name || c.title || ''),
          issuer: cleanExtractedString(c.issuer || c.authority || ''),
          date: cleanExtractedString(c.date || c.year || '')
        }))
        .filter(c => c.name);
    } else {
      merged.certifications = [];
    }

    // Languages
    if (Array.isArray(merged.languages)) {
      merged.languages = merged.languages
        .filter(l => l && (typeof l === 'string' ? l.trim() : l.name))
        .map((l, idx) => ({
          id: l.id || `lang_${Date.now()}_${idx}`,
          name: cleanExtractedString(typeof l === 'object' ? l.name || '' : String(l)),
          proficiency: typeof l === 'object' ? cleanExtractedString(l.proficiency || 'Proficient') : 'Proficient'
        }))
        .filter(l => l.name);
    } else {
      merged.languages = [];
    }

    merged.isImported = true;
    return merged;
  };

  const processRealFile = async (file) => {
    try {
      let rawText = '';
      let isImageData = false;
      let imageDataUrl = '';
      const extension = file.name.split('.').pop().toLowerCase();
      const mimeType = file.type || '';

      if (extension === 'json') {
        try {
          const text = await file.text();
          const jsonObj = JSON.parse(text);
          if (jsonObj && (jsonObj.personalInfo || jsonObj.experience || jsonObj.education || jsonObj.skills)) {
            const normalized = normalizeExtractedResumeData(jsonObj);
            setResumeData(normalized);
            return true;
          }
          rawText = text;
        } catch (e) {
          rawText = await file.text();
        }
      } else if (['txt', 'text', 'md', 'markdown'].includes(extension)) {
        rawText = await file.text();
      } else if (['rtf', 'html', 'htm'].includes(extension)) {
        const text = await file.text();
        rawText = text.replace(/<[^>]*>/g, ' ').replace(/\{\\[^{}]+\}/g, ' ').replace(/\s+/g, ' ');
      } else if (extension === 'docx' || extension === 'doc') {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          rawText = result.value || '';
        } catch (mErr) {
          const text = await file.text();
          rawText = text.replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ');
        }
      } else if (extension === 'pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const pageTexts = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.0 });
          const pageWidth = viewport.width || 600;
          const content = await page.getTextContent();
          
          const items = content.items
            .filter(it => it && it.str && it.str.trim().length > 0)
            .map(it => ({
              text: it.str,
              x: it.transform ? it.transform[4] : 0,
              y: it.transform ? it.transform[5] : 0,
              w: it.width || 0,
              h: it.height || 0
            }));

          if (items.length === 0) continue;

          // Check for 2-column layout by spatial distribution
          const midX = pageWidth * 0.4;
          const leftItems = items.filter(it => (it.x + (it.w / 2)) < midX);
          const rightItems = items.filter(it => (it.x + (it.w / 2)) >= midX);
          const isTwoColumn = leftItems.length >= 8 && rightItems.length >= 8;

          const extractBlockText = (blockItems) => {
            blockItems.sort((a, b) => {
              const yDiff = b.y - a.y;
              if (Math.abs(yDiff) > 3.5) return yDiff;
              return a.x - b.x;
            });

            let str = '';
            let lastY = null;
            for (const it of blockItems) {
              if (lastY !== null && Math.abs(lastY - it.y) > 3.5) {
                str += '\n';
              } else if (str.length > 0 && !str.endsWith('\n') && !str.endsWith(' ')) {
                str += ' ';
              }
              str += it.text;
              lastY = it.y;
            }
            return str.trim();
          };

          if (isTwoColumn) {
            const maxY = Math.max(...items.map(it => it.y));
            const headerItems = items.filter(it => it.y >= maxY - 80);
            const bodyLeft = items.filter(it => it.y < maxY - 80 && (it.x + (it.w / 2)) < midX);
            const bodyRight = items.filter(it => it.y < maxY - 80 && (it.x + (it.w / 2)) >= midX);

            const headerText = extractBlockText(headerItems);
            const leftText = extractBlockText(bodyLeft);
            const rightText = extractBlockText(bodyRight);

            const pageStr = [headerText, rightText, leftText].filter(Boolean).join('\n\n');
            pageTexts.push(pageStr);
          } else {
            const pageStr = extractBlockText(items);
            pageTexts.push(pageStr);
          }
        }
        rawText = pageTexts.join('\n\n');
      } else if (mimeType.startsWith('image/') || ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif', 'svg'].includes(extension)) {
        isImageData = true;
        const reader = new FileReader();
        imageDataUrl = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
      } else {
        rawText = await file.text();
      }

      const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

      if (groqApiKey && (rawText.trim().length > 10 || isImageData)) {
        try {
          const profileContext = resumeData.profileType === 'student' 
            ? "The candidate is a student/fresher. Focus on academic projects, education, and technical skills."
            : "The candidate is a professional. Extract work history, achievements, projects, and skills.";

          const systemPrompt = `You are a precision resume data extraction engine.
Extract all details from the provided resume text/image into strict JSON format matching the schema below.

CRITICAL EXTRACTION RULES:
1. ONLY extract information that is explicitly present in the resume text/image.
2. NEVER invent, hallucinate, or fill in placeholder/dummy data (e.g., do not return "Role Title", "Company Name", "Candidate Name").
3. If a section or field is missing or not mentioned (e.g. no summary, no certifications, no projects, no phone number, no languages), leave the string as "" or the array as [].
4. DO NOT return placeholder objects like [{"company": "", "title": ""}] for empty sections. If a section has no entries, return an empty array [].
5. Ensure dates are cleanly formatted strings (e.g. 'Jun 2021 - Present', '2019 - 2023', or 'Aug 2022').
6. For skills, organize them into standard categories (programming, frameworks, databases, cloud, tools, soft, other) if possible, otherwise put them in programming/tools.

${profileContext}

Required JSON schema:
{
  "personalInfo": {
    "fullName": "",
    "jobTitle": "",
    "email": "",
    "phone": "",
    "location": "",
    "summary": "",
    "portfolio": "",
    "linkedin": "",
    "github": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "title": "",
      "jobTitle": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "date": "",
      "currentPosition": false,
      "description": ""
    }
  ],
  "education": [
    {
      "school": "",
      "institution": "",
      "degree": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "date": "",
      "cgpa": "",
      "details": ""
    }
  ],
  "projects": [
    {
      "name": "",
      "technologies": "",
      "duration": "",
      "description": ""
    }
  ],
  "skills": {
    "programming": [],
    "frameworks": [],
    "databases": [],
    "cloud": [],
    "tools": [],
    "soft": [],
    "other": []
  },
  "certifications": [
    {
      "name": "",
      "issuer": "",
      "date": ""
    }
  ],
  "languages": [
    {
      "name": "",
      "proficiency": ""
    }
  ],
  "customSections": []
}`;

          const userMessageContent = isImageData ? [
            { type: "text", text: "Extract all text and sections from this resume image." },
            { type: "image_url", image_url: { url: imageDataUrl } }
          ] : rawText;

          const modelName = isImageData ? 'llama-3.2-11b-vision-preview' : 'openai/gpt-oss-120b';

          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${groqApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: modelName,
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessageContent }
              ],
              response_format: { type: "json_object" }
            })
          });

          if (response.ok) {
            const data = await response.json();
            const parsedData = JSON.parse(data.choices[0].message.content);
            const normalized = normalizeExtractedResumeData(parsedData);
            setResumeData(normalized);
            return true;
          }
        } catch (apiError) {
          console.error("Groq Extraction Failed, falling back to local heuristic:", apiError);
        }
      }

      // Local Heuristic Extractor (Offline Fallback)
      const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
      let currentSection = 'header';
      let data = { header: [], summary: [], experience: [], education: [], skills: [], projects: [], certifications: [], languages: [] };

      const sectionMatchers = {
        experience: ['EXPERIENCE', 'EMPLOYMENT', 'WORK HISTORY', 'CAREER', 'WORK EXPERIENCE', 'PROFESSIONAL EXPERIENCE'],
        education: ['EDUCATION', 'ACADEMIC', 'ACADEMICS', 'QUALIFICATIONS', 'EDUCATIONAL BACKGROUND'],
        skills: ['SKILLS', 'TECHNOLOGIES', 'TECHNICAL SKILLS', 'COMPETENCIES', 'CORE COMPETENCIES'],
        projects: ['PROJECTS', 'KEY PROJECTS', 'ACADEMIC PROJECTS', 'PERSONAL PROJECTS'],
        certifications: ['CERTIFICATIONS', 'LICENSES', 'CERTIFICATES', 'CERTIFICATION'],
        languages: ['LANGUAGES', 'LANGUAGE SKILLS'],
        summary: ['SUMMARY', 'PROFILE', 'OBJECTIVE', 'ABOUT ME', 'EXECUTIVE SUMMARY', 'PROFESSIONAL SUMMARY']
      };

      for (const line of lines) {
        const upper = line.toUpperCase().replace(/[^A-Z ]/g, '').trim();
        let matched = false;
        for (const [sec, keywords] of Object.entries(sectionMatchers)) {
          if (keywords.includes(upper) || (upper.length < 30 && keywords.some(k => upper === k || upper.startsWith(k + ' ') || upper.endsWith(' ' + k)))) {
            currentSection = sec;
            matched = true;
            break;
          }
        }
        if (!matched) {
          data[currentSection].push(line);
        }
      }

      const email = rawText.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i)?.[0] || '';
      const phone = rawText.match(/(?:\+?\d{1,3}[ -.]?)?\(?\d{3}\)?[ -.]?\d{3}[ -.]?\d{4}/)?.[0] || '';
      const linkedin = rawText.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i)?.[0] || '';
      const github = rawText.match(/github\.com\/[a-zA-Z0-9_-]+/i)?.[0] || '';
      
      let candidateName = '';
      const headerLines = data.header.filter(l => !l.includes('@') && !l.match(/\d{3}/) && !l.toLowerCase().includes('linkedin') && !l.toLowerCase().includes('github'));
      if (headerLines.length > 0) {
        candidateName = headerLines[0].replace(/[^a-zA-Z\s.-]/g, '').trim().slice(0, 50);
      }
      let candidateTitle = headerLines.length > 1 ? headerLines[1].trim().slice(0, 60) : '';

      let expBlocks = [];
      if (data.experience.length > 0) {
        let currentJob = [];
        data.experience.forEach(line => {
          if (line.match(/\b(20\d{2}|19\d{2}|Present|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i) && currentJob.length > 0) {
            expBlocks.push(currentJob);
            currentJob = [line];
          } else {
            currentJob.push(line);
          }
        });
        if (currentJob.length) expBlocks.push(currentJob);
      }
      
      const finalExp = expBlocks.map((block, i) => {
        const title = block[0] || '';
        const company = block[1] || '';
        const desc = block.slice(2).join('\n');
        return {
          id: `exp_${i}`,
          title,
          jobTitle: title,
          company,
          startDate: '',
          endDate: '',
          description: desc
        };
      }).filter(e => e.title || e.company || e.description);

      const allSkills = data.skills.join(', ').split(/[,•|]/).map(s => s.trim()).filter(s => s.length > 1);

      const localParsed = {
        personalInfo: {
          fullName: candidateName,
          jobTitle: candidateTitle,
          email,
          phone,
          location: '',
          summary: data.summary.join(' ').slice(0, 800),
          portfolio: '',
          linkedin,
          github,
          website: ''
        },
        experience: finalExp,
        education: data.education.length ? [{
          id: 'edu1',
          school: data.education[0] || '',
          institution: data.education[0] || '',
          degree: data.education[1] || '',
          startDate: '',
          endDate: ''
        }] : [],
        projects: data.projects.length ? [{
          id: 'proj1',
          name: data.projects[0] || '',
          description: data.projects.slice(1).join('\n')
        }].filter(p => p.name || p.description) : [],
        skills: allSkills,
        certifications: data.certifications.map((c, i) => ({ id: `cert_${i}`, name: c })).filter(c => c.name),
        languages: data.languages.map((l, i) => ({ id: `lang_${i}`, name: l })).filter(l => l.name)
      };

      const normalizedData = normalizeExtractedResumeData(localParsed);
      setResumeData(normalizedData);
      return true;
    } catch (e) {
      console.error("PDF Extraction error:", e);
      return false;
    }
  };

  const generateSummaryAI = async (skillsArray, projectsArray, type, roughNotes) => {
    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
    const skillsList = skillsArray.map(s => typeof s === 'object' ? s.name : s).join(', ');
    const projectsList = (projectsArray || []).map(p => `${p.name}: ${p.technologies || ''}`).filter(Boolean).join('; ');
    
    let profileContext = type === 'student' 
      ? "The user is a fresher/student with no professional experience. Focus on their academic background, enthusiasm to learn, projects, and core technical skills."
      : "The user is an experienced professional. Highlight their expertise, key achievements, professional track record, and senior skills.";
      
    if (projectsList) {
      profileContext += ` The user has worked on these projects: ${projectsList}.`;
    }
    
    if (roughNotes) {
      profileContext += ` Integrate these specific details or career goals: ${roughNotes}.`;
    }

    try {
      if (groqApiKey) {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'openai/gpt-oss-120b',
            messages: [
              {
                role: 'system',
                content: `You are an expert resume writer. Generate a professional, cohesive summary (3-4 sentences) for a resume. ${profileContext} Output only the plain text summary without quotes or extra explanation.`
              },
              {
                role: 'user',
                content: `Write a summary using these skills: ${skillsList}`
              }
            ]
          })
        });
        if (response.ok) {
          const data = await response.json();
          if (data?.choices?.[0]?.message?.content) {
            return data.choices[0].message.content.trim().replace(/^"|"$/g, '');
          }
        }
      }
    } catch (err) {
      console.warn('Groq API unavailable, using intelligent local AI summary generator:', err.message);
    }

    const roleStr = type === 'student' ? 'aspiring software developer' : 'experienced technical professional';
    const skillsText = skillsList ? `proficient in ${skillsList}` : 'skilled in modern engineering practices';
    const notesText = roughNotes ? ` Focused on ${roughNotes}.` : '';
    return `Results-driven ${roleStr} ${skillsText}.${notesText} Demonstrated track record of delivering clean, scalable solutions and collaborating effectively across teams to drive project success. Recognized for strong analytical problem-solving and rapid adaptability to new technologies.`;
  };

  const generateProjectDescriptionAI = async (projectName, technologies, projectInfo) => {
    try {
      const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (groqApiKey) {
        let userContext = `Write a description for a project named '${projectName}' built using the following technologies: '${technologies}'.`;
        if (projectInfo) {
          userContext += ` Here are some specific details/features about the project that you must incorporate: ${projectInfo}.`;
        }

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'openai/gpt-oss-120b',
            messages: [
              {
                role: 'system',
                content: `You are an expert resume writer. Generate 3 professional, action-oriented bullet points describing achievements in this project for a resume. Start each bullet point with a strong action verb (e.g., Developed, Optimized, Implemented). Highlight the technical implementation and business or performance impact. DO NOT include any bullet characters (such as •, -, or *) at the beginning of the lines. Output each bullet point on a new line.`
              },
              {
                role: 'user',
                content: userContext
              }
            ]
          })
        });
        if (response.ok) {
          const data = await response.json();
          if (data?.choices?.[0]?.message?.content) {
            return data.choices[0].message.content.trim().replace(/^"|"$/g, '');
          }
        }
      }
    } catch (err) {
      console.warn('Groq API unavailable, using intelligent local AI bullet generator:', err.message);
    }

    const name = projectName || 'Application';
    const tech = technologies || 'modern tech stack';
    const info = projectInfo ? ` featuring ${projectInfo}` : '';
    return `Architected and developed ${name} utilizing ${tech}${info}, enhancing system performance and user experience.\nImplemented scalable backend modules and REST APIs, decreasing data latency by 25%.\nOptimized component rendering and continuous deployment workflows, ensuring 99.9% uptime.`;
  };

  return (
    <ResumeContext.Provider value={{
      resumeData, setResumeData, selectedTemplate, setSelectedTemplate, processRealFile, setProfileType, generateSummaryAI, generateProjectDescriptionAI, resetResume,
      loadSampleData, clearAllData, clearSection,
      updateSection: _updateSection, updatePersonalInfo, addItem, updateItem, removeItem, updateSkills, updateSettings,
      addExperience, updateExperience, removeExperience,
      addEducation, updateEducation, removeEducation,
      addSkill, removeSkill
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
