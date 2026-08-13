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

export const defaultState = {
  profileType: null,
  personalInfo: { fullName: '', jobTitle: '', email: '', phone: '', location: '', summary: '', portfolio: '', linkedin: '', github: '', website: '' },
  experience: [], education: [], projects: [], skills: { programming: [], frameworks: [], databases: [], cloud: [], tools: [], soft: [], other: [] },
  certifications: [], publications: [], awards: [], languages: [], interests: [], volunteer: [], references: [], customSections: [],
  settings: { fontFamily: 'Inter', fontSize: 'Medium', primaryColor: '#4338ca', secondaryColor: '#4f46e5', lineSpacing: '1.5', margins: 'Standard', pageSize: 'A4', showPhoto: true, iconsEnabled: true }
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem('lumen_resume_draft');
      return saved ? JSON.parse(saved) : defaultState;
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
    setResumeData(defaultState);
    setSelectedTemplate('multicolor');
  };

  const updateSection = (section, data) => setResumeData(prev => ({ ...prev, [section]: data }));
  // Debug wrapper: log updates to sections to trace UI actions
  const _updateSection = (section, data) => {
    return updateSection(section, data);
  };

  const updatePersonalInfo = (field, value) => setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  const setProfileType = (type) => setResumeData(prev => ({ ...prev, profileType: type }));
  const addItem = (section, item) => setResumeData(prev => ({ ...prev, [section]: [...prev[section], { ...item, id: Date.now().toString() }] }));
  const updateItem = (section, id, updated) => setResumeData(prev => ({ ...prev, [section]: prev[section].map(i => i.id === id ? { ...i, ...updated } : i) }));
  const removeItem = (section, id) => setResumeData(prev => ({ ...prev, [section]: prev[section].filter(i => i.id !== id) }));
  const updateSkills = (category, skillsArray) => setResumeData(prev => ({ ...prev, skills: { ...prev.skills, [category]: skillsArray } }));
  const updateSettings = (field, value) => setResumeData(prev => ({ ...prev, settings: { ...prev.settings, [field]: value } }));

  const addExperience = () => setResumeData(prev => ({
    ...prev,
    experience: [...(prev.experience || []), { id: 'exp' + Date.now(), title: '', jobTitle: '', company: '', startDate: '', endDate: '', location: '', description: '' }]
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
    education: [...(prev.education || []), { id: 'edu' + Date.now(), school: '', institution: '', degree: '', startDate: '', endDate: '', location: '', cgpa: '' }]
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
    skills: { ...prev.skills, [category]: skillsArray }
  }));
  const removeSkill = (category, index) => setResumeData(prev => {
    const skills = [...(prev.skills?.[category] || [])];
    skills.splice(index, 1);
    return { ...prev, skills: { ...prev.skills, [category]: skills } };
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

    return clean.trim();
  };

  const normalizeExtractedResumeData = (parsed) => {
    const merged = { ...defaultState, ...(parsed || {}) };
    
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
          return {
            id: exp.id || `exp_${Date.now()}_${idx}`,
            title,
            jobTitle: title,
            company,
            location: cleanExtractedString(exp.location || ''),
            startDate: cleanExtractedString(exp.startDate || exp.date?.split('-')?.[0]?.trim() || ''),
            endDate: cleanExtractedString(exp.endDate || exp.date?.split('-')?.[1]?.trim() || ''),
            currentPosition: exp.currentPosition || exp.endDate?.toLowerCase()?.includes('present') || false,
            description: desc,
            technologies: cleanExtractedString(exp.technologies || '')
          };
        });
    } else {
      merged.experience = [];
    }

    // Education
    if (Array.isArray(merged.education)) {
      merged.education = merged.education
        .filter(edu => edu && (edu.school || edu.institution || edu.degree))
        .map((edu, idx) => {
          const inst = cleanExtractedString(edu.school || edu.institution || edu.university || edu.college || '');
          return {
            id: edu.id || `edu_${Date.now()}_${idx}`,
            school: inst,
            institution: inst,
            degree: cleanExtractedString(edu.degree || edu.fieldOfStudy || edu.branch || ''),
            location: cleanExtractedString(edu.location || ''),
            startDate: cleanExtractedString(edu.startDate || ''),
            endDate: cleanExtractedString(edu.endDate || edu.year || ''),
            cgpa: cleanExtractedString(edu.cgpa || edu.gpa || ''),
            details: cleanExtractedString(edu.details || edu.description || '')
          };
        });
    } else {
      merged.education = [];
    }

    // Projects
    if (Array.isArray(merged.projects)) {
      merged.projects = merged.projects
        .filter(proj => proj && (proj.name || proj.title || proj.description))
        .map((proj, idx) => ({
          id: proj.id || `proj_${Date.now()}_${idx}`,
          name: cleanExtractedString(proj.name || proj.title || ''),
          technologies: cleanExtractedString(proj.technologies || proj.techStack || ''),
          duration: cleanExtractedString(proj.duration || proj.date || ''),
          description: cleanExtractedString(proj.description || proj.details || '')
        }));
    } else {
      merged.projects = [];
    }

    // Skills Filter & Sanitizer
    const rawSkills = merged.skills;
    const cleanSkill = (s) => cleanExtractedString(typeof s === 'object' ? s.name || s.value || '' : String(s));
    const isValidSkill = (s) => {
      const clean = cleanSkill(s);
      if (!clean || clean.length < 2 || clean.length > 40) return false;
      return !/^(programming|technical skills|frameworks|tools|databases|cloud|soft skills|languages|certifications|experience|education|projects|summary|page \d+)$/i.test(clean);
    };

    if (Array.isArray(rawSkills)) {
      const stringList = rawSkills.map(cleanSkill).filter(isValidSkill);
      merged.skills = {
        programming: stringList.slice(0, 8),
        frameworks: stringList.slice(8, 16),
        databases: stringList.slice(16, 22),
        cloud: [],
        tools: stringList.slice(22, 30),
        soft: [],
        other: stringList.slice(30)
      };
    } else if (rawSkills && typeof rawSkills === 'object') {
      merged.skills = {
        programming: (rawSkills.programming || []).map(cleanSkill).filter(isValidSkill),
        frameworks: (rawSkills.frameworks || []).map(cleanSkill).filter(isValidSkill),
        databases: (rawSkills.databases || []).map(cleanSkill).filter(isValidSkill),
        cloud: (rawSkills.cloud || []).map(cleanSkill).filter(isValidSkill),
        tools: (rawSkills.tools || []).map(cleanSkill).filter(isValidSkill),
        soft: (rawSkills.soft || []).map(cleanSkill).filter(isValidSkill),
        other: (rawSkills.other || []).map(cleanSkill).filter(isValidSkill)
      };
    } else {
      merged.skills = defaultState.skills;
    }

    // Certifications
    if (Array.isArray(merged.certifications)) {
      merged.certifications = merged.certifications
        .filter(c => c && (c.name || c.title))
        .map((c, idx) => ({
          id: c.id || `cert_${Date.now()}_${idx}`,
          name: cleanExtractedString(c.name || c.title || ''),
          issuer: cleanExtractedString(c.issuer || c.organization || ''),
          date: cleanExtractedString(c.date || c.year || '')
        }));
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
        }));
    } else {
      merged.languages = [];
    }

    merged.isImported = true;
    return merged;
  };

  const processRealFile = async (file) => {
    try {
      let rawText = '';
      const extension = file.name.split('.').pop().toLowerCase();
      if (extension === 'txt') {
        rawText = await file.text();
      } else if (extension === 'docx' || extension === 'doc') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        rawText = result.value;
      } else if (extension === 'pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          let lastY = null;
          let pageText = '';
          for (const item of content.items) {
            if (!item.str) continue;
            const currentY = item.transform ? item.transform[5] : null;
            if (lastY !== null && currentY !== null && Math.abs(lastY - currentY) > 5) {
              pageText += '\n';
            } else if (item.hasEOL) {
              pageText += '\n';
            } else if (pageText.length > 0 && !pageText.endsWith('\n') && !pageText.endsWith(' ')) {
              pageText += ' ';
            }
            pageText += item.str;
            lastY = currentY;
          }
          rawText += pageText + '\n\n';
        }
      } else throw new Error("Unsupported format");

      const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

      if (groqApiKey) {
        try {
          const profileContext = resumeData.profileType === 'student' 
            ? "The user is a student/fresher. Focus on academic projects, education, and technical skills."
            : "The user is a professional. Extract work history, achievements, projects, and skills.";

          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${groqApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: 'llama-3.3-70b-versatile',
              messages: [
                {
                  role: 'system',
                  content: `You are an expert resume parser. Extract the details from the user's resume into a strict JSON format. 
CRITICAL: DO NOT invent, fabricate, or hallucinate any information. Only extract data explicitly present in the provided text. If a detail is missing, leave the field as an empty string or an empty array.
${profileContext}
DO NOT output any markdown, only valid JSON. The JSON must exactly match this structure:
{
  "personalInfo": { "fullName": "", "jobTitle": "", "email": "", "phone": "", "location": "", "summary": "", "portfolio": "", "linkedin": "", "github": "", "website": "" },
  "experience": [{ "id": "exp1", "company": "", "title": "", "jobTitle": "", "location": "", "startDate": "", "endDate": "", "currentPosition": false, "description": "" }],
  "education": [{ "id": "edu1", "school": "", "institution": "", "degree": "", "location": "", "startDate": "", "endDate": "", "cgpa": "", "details": "" }],
  "projects": [{ "id": "proj1", "name": "", "technologies": "", "duration": "", "description": "" }],
  "skills": { "programming": [], "frameworks": [], "databases": [], "cloud": [], "tools": [], "soft": [], "other": [] },
  "certifications": [{ "id": "cert1", "name": "", "issuer": "", "date": "" }],
  "languages": [{ "id": "lang1", "name": "", "proficiency": "" }],
  "customSections": []
}
Ensure dates are string format (e.g. 'Jun 2018' or '2020 - Present'). If information is missing, leave the field empty or as an empty array.`
                },
                {
                  role: 'user',
                  content: rawText
                }
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

      // Advanced Local Heuristic Extractor (NO AI Fallback)
      const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
      let currentSection = 'summary';
      let data = { summary: [], experience: [], education: [], skills: [], projects: [], certifications: [], languages: [] };

      const sectionMatchers = {
        experience: ['EXPERIENCE', 'EMPLOYMENT', 'WORK HISTORY', 'CAREER', 'WORK EXPERIENCE'],
        education: ['EDUCATION', 'ACADEMIC', 'QUALIFICATIONS'],
        skills: ['SKILLS', 'TECHNOLOGIES', 'TECHNICAL SKILLS', 'COMPETENCIES'],
        projects: ['PROJECTS', 'KEY PROJECTS', 'ACADEMIC PROJECTS'],
        certifications: ['CERTIFICATIONS', 'LICENSES', 'CERTIFICATES'],
        languages: ['LANGUAGES'],
        summary: ['SUMMARY', 'PROFILE', 'OBJECTIVE', 'ABOUT ME', 'EXECUTIVE SUMMARY']
      };

      for (const line of lines) {
        const upper = line.toUpperCase().replace(/[^A-Z ]/g, '').trim();
        let matched = false;
        for (const [sec, keywords] of Object.entries(sectionMatchers)) {
          if (keywords.includes(upper) || (upper.length < 30 && keywords.some(k => upper.startsWith(k)))) {
            currentSection = sec;
            matched = true;
            break;
          }
        }
        if (!matched) data[currentSection].push(line);
      }

      const email = rawText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i)?.[0] || '';
      const phone = rawText.match(/(\+\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/)?.[0] || '';
      const linkedin = rawText.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i)?.[0] || '';
      const github = rawText.match(/github\.com\/[a-zA-Z0-9_-]+/i)?.[0] || '';
      const name = lines[0] ? lines[0].replace(/[^a-zA-Z\s.-]/g, "").trim().slice(0, 40) : 'Extracted User';

      // Parse Experience blocks cleanly
      let expBlocks = [];
      if (data.experience.length > 0) {
        let currentJob = [];
        data.experience.forEach(line => {
          if (line.match(/\b(20\d{2}|19\d{2}|Present|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i) && currentJob.length > 1) {
            expBlocks.push(currentJob);
            currentJob = [line];
          } else currentJob.push(line);
        });
        if (currentJob.length) expBlocks.push(currentJob);
      }
      
      const finalExp = expBlocks.map((block, i) => ({
        id: `exp_${i}`,
        title: block[0] || 'Role Title',
        jobTitle: block[0] || 'Role Title',
        company: block[1] || 'Company Name',
        startDate: block[2] || '',
        endDate: '',
        description: block.slice(2).join('\n')
      }));

      const allSkills = data.skills.join(', ').split(/[,•|]/).map(s => s.trim()).filter(s => s.length > 1);

      const localParsed = {
        personalInfo: { fullName: name, jobTitle: lines[1] || '', email, phone, location: '', summary: data.summary.join(' ').slice(0,800), portfolio: '', linkedin, github, website: '' },
        experience: finalExp,
        education: data.education.length ? [{ id: 'edu1', school: data.education[0] || '', institution: data.education[0] || '', degree: data.education[1] || '', startDate: '', endDate: '' }] : [],
        projects: data.projects.length ? [{ id: 'proj1', name: data.projects[0] || 'Project', description: data.projects.slice(1).join('\n') }] : [],
        skills: allSkills,
        certifications: data.certifications.length ? data.certifications.map((c, i) => ({ id: `cert_${i}`, name: c })) : [],
        languages: data.languages.length ? data.languages.map((l, i) => ({ id: `lang_${i}`, name: l })) : []
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
            model: 'llama-3.3-70b-versatile',
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

    // Local Intelligent Summary Generator Fallback
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
            model: 'llama-3.3-70b-versatile',
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

    // Local Intelligent Bullet Generator Fallback
    const name = projectName || 'Application';
    const tech = technologies || 'modern tech stack';
    const info = projectInfo ? ` featuring ${projectInfo}` : '';
    return `Architected and developed ${name} utilizing ${tech}${info}, enhancing system performance and user experience.\nImplemented scalable backend modules and REST APIs, decreasing data latency by 25%.\nOptimized component rendering and continuous deployment workflows, ensuring 99.9% uptime.`;
  };

  return (
    <ResumeContext.Provider value={{
      resumeData, setResumeData, selectedTemplate, setSelectedTemplate, processRealFile, setProfileType, generateSummaryAI, generateProjectDescriptionAI, resetResume,
      updateSection: _updateSection, updatePersonalInfo, addItem, updateItem, removeItem, updateSkills, updateSettings,
      addExperience, updateExperience, removeExperience,
      addEducation, updateEducation, removeEducation,
      addSkill, removeSkill
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
