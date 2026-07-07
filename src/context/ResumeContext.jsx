import React, { createContext, useState, useEffect, useContext } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

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
    const stored = localStorage.getItem('resumeData');
    return stored ? JSON.parse(stored) : defaultState;
  });

  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    return localStorage.getItem('selectedTemplate') || 'multicolor';
  });

  // Persist resume data to localStorage on change
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [resumeData, selectedTemplate]);

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
          rawText += content.items.map(item => item.str).join(' ') + '\n';
        }
      } else throw new Error("Unsupported format");

      const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

      if (groqApiKey) {
        try {
          const profileContext = resumeData.profileType === 'student' 
            ? "The user is a student with NO professional work experience. DO NOT extract or invent professional experience. Emphasize their education, academic projects, and skills. Generate a professional summary focusing purely on their academic skills, enthusiasm to learn, and coursework."
            : "The user is a professional. Extract their work experience and generate a summary highlighting their track record.";

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
  "experience": [{ "id": "exp1", "company": "", "title": "", "employmentType": "", "location": "", "startDate": "", "endDate": "", "currentPosition": false, "description": "", "achievements": "", "technologies": "" }],
  "education": [{ "id": "edu1", "institution": "", "degree": "", "branch": "", "cgpa": "", "startDate": "", "endDate": "" }],
  "projects": [{ "id": "proj1", "name": "", "description": "", "technologies": "", "link": "", "duration": "", "role": "" }],
  "skills": { "programming": [], "frameworks": [], "databases": [], "cloud": [], "tools": [], "soft": [], "other": [] },
  "certifications": [{ "id": "cert1", "name": "", "issuer": "", "date": "" }],
  "publications": [], "awards": [], "languages": [], "interests": [], "volunteer": [], "references": [], "customSections": []
}
Ensure dates are string format (e.g. 'Jun 2018'). If information is missing, leave the field empty or as an empty array.`
                },
                {
                  role: 'user',
                  content: rawText
                }
              ],
              response_format: { type: "json_object" }
            })
          });
          
          if (!response.ok) {
            throw new Error(`Groq API Error: ${response.statusText}`);
          }
          
          const data = await response.json();
          const parsedData = JSON.parse(data.choices[0].message.content);
          
          // Basic validation to ensure required top-level keys exist
          const mergedData = { ...defaultState, ...parsedData };
          
          // Assign unique IDs to arrays
          ['experience', 'education', 'projects', 'certifications'].forEach(key => {
             if(mergedData[key] && Array.isArray(mergedData[key])) {
                mergedData[key] = mergedData[key].map((item, idx) => ({...item, id: `${key}${Date.now()}${idx}`}));
             }
          });

          setResumeData(mergedData);
          return true;
        } catch (apiError) {
          console.error("Groq Extraction Failed, falling back to local heuristic:", apiError);
        }
      }

      // Advanced Local Heuristic Extractor (NO AI)
      const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
      let currentSection = 'summary';
      let data = { summary: [], experience: [], education: [], skills: [], projects: [], certifications: [], awards: [], publications: [], languages: [], interests: [] };

      const sectionMatchers = {
        experience: ['EXPERIENCE', 'EMPLOYMENT', 'WORK HISTORY', 'CAREER'],
        education: ['EDUCATION', 'ACADEMIC', 'QUALIFICATIONS'],
        skills: ['SKILLS', 'TECHNOLOGIES', 'COMPETENCIES'],
        projects: ['PROJECTS', 'OPEN SOURCE'],
        certifications: ['CERTIFICATIONS', 'LICENSES'],
        awards: ['AWARDS', 'HONORS', 'ACHIEVEMENTS'],
        publications: ['PUBLICATIONS', 'RESEARCH'],
        languages: ['LANGUAGES'],
        interests: ['INTERESTS', 'HOBBIES'],
        summary: ['SUMMARY', 'PROFILE', 'OBJECTIVE', 'ABOUT']
      };

      for (const line of lines) {
        const upper = line.toUpperCase().replace(/[^A-Z ]/g, '').trim();
        let matched = false;
        for (const [sec, keywords] of Object.entries(sectionMatchers)) {
          if (keywords.includes(upper) || (upper.length < 25 && keywords.some(k => upper.includes(k)))) {
            currentSection = sec;
            matched = true;
            break;
          }
        }
        if (!matched) data[currentSection].push(line);
      }

      // Regex Parse Info
      const email = rawText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i)?.[0] || '';
      const phone = rawText.match(/(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/)?.[0] || '';
      const linkedin = rawText.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i)?.[0] || '';
      const github = rawText.match(/github\.com\/[a-zA-Z0-9_-]+/i)?.[0] || '';
      const name = lines[0].replace(/[^a-zA-Z ]/g, "").slice(0, 30);

      // Parse Experience blocks (Local Chunking)
      let expBlocks = [];
      if (data.experience.length > 0) {
        let currentJob = [];
        data.experience.forEach(line => {
          if (line.match(/20\d{2}|19\d{2}/) && currentJob.length > 2) {
            expBlocks.push(currentJob);
            currentJob = [line];
          } else currentJob.push(line);
        });
        if (currentJob.length) expBlocks.push(currentJob);
      }
      
      const finalExp = expBlocks.map((block, i) => ({
        id: 'exp'+i, title: block[0] || '', company: block[1] || '', startDate: block[2] || '', endDate: '', description: block.slice(3).join('\n'), location: '', achievements: '', technologies: '', currentPosition: false, employmentType: ''
      }));

      const allSkills = data.skills.join(', ').split(/[,•|]/).map(s => s.trim()).filter(s => s.length > 1);
      
      setResumeData({
        personalInfo: { fullName: name, jobTitle: '', email, phone, location: '', summary: data.summary.join(' ').slice(0,800), portfolio: '', linkedin, github, website: '' },
        experience: finalExp.length ? finalExp : [],
        education: data.education.length ? [{ id: 'edu1', institution: data.education[0] || '', degree: data.education[1] || '', branch: '', cgpa: '', startDate: '', endDate: data.education[2] || '' }] : [],
        projects: data.projects.length ? [{ id: 'proj1', name: data.projects[0] || '', description: data.projects.slice(1).join('\n'), technologies: '', link: '', duration: '', role: '' }] : [],
        skills: { programming: allSkills.slice(0,10), frameworks: allSkills.slice(10,20), databases: [], cloud: [], tools: [], soft: [], other: [] },
        certifications: data.certifications.length ? [{ id: 'cert1', name: data.certifications[0] || '', issuer: '', date: '' }] : [],
        publications: [], awards: [], languages: [], interests: [], volunteer: [], references: [], customSections: []
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const generateSummaryAI = async (skillsArray, projectsArray, type) => {
    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!groqApiKey) {
      throw new Error("Missing Groq API Key");
    }
    const skillsList = skillsArray.map(s => typeof s === 'object' ? s.name : s).join(', ');
    const projectsList = (projectsArray || []).map(p => `${p.name}: ${p.technologies || ''}`).filter(Boolean).join('; ');
    
    let profileContext = type === 'student' 
      ? "The user is a student with no professional experience. Emphasize their academic background, enthusiasm to learn, and core skills."
      : "The user is a professional. Emphasize their expertise and track record of success.";
      
    if (projectsList) {
      profileContext += ` The user has worked on these projects: ${projectsList}. Highlight their practical project experience.`;
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
            content: `You are an expert resume writer. Generate a 3-sentence professional summary for a resume. ${profileContext} Output only the plain text summary without quotes or extra explanation.`
          },
          {
            role: 'user',
            content: `Write a summary using these skills: ${skillsList}`
          }
        ]
      })
    });
    if (!response.ok) throw new Error("API request failed");
    const data = await response.json();
    return data.choices[0].message.content.trim().replace(/^"|"$/g, '');
  };

  const generateProjectDescriptionAI = async (projectName, technologies) => {
    const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!groqApiKey) {
      throw new Error("Missing Groq API Key");
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
            content: `You are an expert resume writer. Write a 2-3 sentence professional, impactful project description suitable for a resume. Focus on what the project achieves and how the technologies were utilized. Output ONLY the plain text description without quotes or prefixes.`
          },
          {
            role: 'user',
            content: `Write a description for a project named '${projectName}' built using the following technologies: '${technologies}'.`
          }
        ]
      })
    });
    if (!response.ok) throw new Error("API request failed");
    const data = await response.json();
    return data.choices[0].message.content.trim().replace(/^"|"$/g, '');
  };

  return (
    <ResumeContext.Provider value={{
      resumeData, setResumeData, selectedTemplate, setSelectedTemplate, processRealFile, setProfileType, generateSummaryAI, generateProjectDescriptionAI,
      updateSection: _updateSection, updatePersonalInfo, addItem, updateItem, removeItem, updateSkills, updateSettings,
      addExperience, updateExperience, removeExperience,
      addEducation, updateEducation, removeEducation,
      addSkill, removeSkill
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
