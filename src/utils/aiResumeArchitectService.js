/**
 * AI Resume Architect & Text-to-Template Service
 * 
 * Takes unformatted raw text, bio, notes, pasted content, or uploaded documents (.txt, .md, .pdf, .json, .docx),
 * analyzes candidate details, applies targeted formatting requirements and template rules,
 * refines and polishes descriptions into high-impact XYZ/STAR bullet points with active verbs,
 * and auto-structures all resume fields to match the active template perfectly.
 */

import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
}

/**
 * Available high-performance LLM models on Groq
 */
const GROQ_MODELS = [
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'qwen/qwen3.6-27b'
];

/**
 * Common formatting styles and their system prompt guidelines
 */
export const FORMAT_STYLES = {
  'ats-impact': {
    label: 'ATS High-Impact (Google XYZ / STAR Format)',
    description: 'Optimized for ATS parsers; starts every bullet with a power action verb, quantified metrics, and business outcomes.',
    promptRule: `Format every experience and project bullet using the Google XYZ / STAR formula: "Accomplished [X], as measured by [Y], by doing [Z]". Use strong active verbs (e.g. Spearheaded, Architected, Accelerated, Reduced, Engineered).`
  },
  'executive': {
    label: 'Executive & Strategic Leadership',
    description: 'Focuses on strategic decision-making, revenue growth, team mentorship, and organizational transformation.',
    promptRule: `Emphasize leadership, strategic planning, cross-functional team leadership, organizational growth, and high-level ROI metrics.`
  },
  'tech-focused': {
    label: 'Modern Tech & Software Engineering',
    description: 'Highlights technical stack depth, architecture design, cloud infrastructure, scalability, and API optimization.',
    promptRule: `Emphasize tech stack, system architecture, API design, scalability, CI/CD, and developer productivity improvements. Explicitly link technologies used to concrete deliverables.`
  },
  'concise-modern': {
    label: 'Clean, Punchy & Concise (1-Page Fit)',
    description: 'Short, impactful 1-2 line bullet points without fluff, ideal for modern aesthetic single-page resumes.',
    promptRule: `Keep bullet points concise and punchy (1 to 2 lines max). Remove filler words and redundancy while maintaining maximum impact.`
  },
  'entry-academic': {
    label: 'Fresher / Entry-Level & Academic',
    description: 'Elevates coursework, academic projects, technical foundations, internships, and rapid learning ability.',
    promptRule: `Focus on foundational technical competence, academic projects, practical coursework, teamwork, problem-solving, and adaptability.`
  }
};

/**
 * Extract raw text from File (handles .pdf, .txt, .md, .json, .rtf, etc.)
 */
export async function extractTextFromFile(file) {
  if (!file) return '';

  const fileName = file.name || '';
  const extension = fileName.split('.').pop()?.toLowerCase();
  const mimeType = file.type || '';

  // 1. PDF File
  if (mimeType === 'application/pdf' || extension === 'pdf') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const pageTexts = [];

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const items = textContent.items || [];
        
        // Sort items vertically top-to-bottom, then horizontally left-to-right
        items.sort((a, b) => {
          const yDiff = b.transform[5] - a.transform[5];
          if (Math.abs(yDiff) > 5) return yDiff;
          return a.transform[4] - b.transform[4];
        });

        const pageStr = items.map(item => item.str).join(' ');
        pageTexts.push(pageStr);
      }

      return pageTexts.join('\n\n');
    } catch (err) {
      console.warn('PDF text extraction fallback to raw text:', err);
    }
  }

  // 2. Text / Markdown / JSON / RTF File
  try {
    return await file.text();
  } catch (err) {
    console.error('Error reading file as text:', err);
    return '';
  }
}

/**
 * Helper to infer candidate name from email (e.g. mullayasmin158@gmail.com -> Mulla Yasmin)
 */
function inferNameFromEmail(email) {
  if (!email || !email.includes('@')) return '';
  const prefix = email.split('@')[0];
  const cleaned = prefix.replace(/[^a-zA-Z._-]/g, ' ').replace(/[._-]/g, ' ').trim();
  if (cleaned.length < 3) return '';
  return cleaned
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Categorize a flat array of skills into standard categories
 */
function categorizeSkillList(skillList) {
  const categories = {
    programming: [],
    frameworks: [],
    databases: [],
    cloud: [],
    tools: [],
    soft: [],
    other: []
  };

  const map = {
    programming: ['javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'rust', 'go', 'golang', 'ruby', 'php', 'html', 'html5', 'css', 'css3', 'sql'],
    frameworks: ['react', 'next.js', 'vue', 'angular', 'node.js', 'express', 'django', 'flask', 'spring boot', 'tailwind', 'bootstrap', 'fastapi'],
    databases: ['postgresql', 'mongodb', 'mysql', 'redis', 'firebase', 'supabase', 'sqlite', 'dynamodb', 'oracle'],
    cloud: ['aws', 'gcp', 'azure', 'docker', 'kubernetes', 'ci/cd', 'terraform', 'serverless', 'lambda'],
    tools: ['git', 'github', 'jira', 'postman', 'vite', 'webpack', 'linux', 'figma', 'jest', 'cypress'],
    soft: ['agile', 'scrum', 'leadership', 'communication', 'teamwork', 'problem solving', 'system design', 'analytical skills']
  };

  skillList.forEach(item => {
    const raw = typeof item === 'object' ? item.name || '' : String(item).trim();
    if (!raw) return;
    const lower = raw.toLowerCase();
    
    let placed = false;
    for (const [cat, keywords] of Object.entries(map)) {
      if (keywords.some(k => lower === k || lower.includes(k))) {
        if (!categories[cat].includes(raw)) categories[cat].push(raw);
        placed = true;
        break;
      }
    }
    if (!placed) {
      if (!categories.other.includes(raw)) categories.other.push(raw);
    }
  });

  return categories;
}

/**
 * Normalize and ensure all IDs, arrays, and fields conform to Resume state
 */
export function normalizePerfectedResumeData(data) {
  if (!data || typeof data !== 'object') return null;

  const rawName = data.personalInfo?.fullName || data.personalInfo?.name || '';
  const email = data.personalInfo?.email || '';
  const inferredName = (!rawName || rawName === '---' || rawName.toLowerCase() === 'full name' || rawName.toLowerCase() === 'candidate name') ? inferNameFromEmail(email) : rawName;
  
  const rawJobTitle = data.personalInfo?.jobTitle || data.personalInfo?.headline || data.personalInfo?.title || '';
  const cleanJobTitle = (rawJobTitle === '---' || !rawJobTitle) ? 'Software Engineer' : rawJobTitle;

  // Handle skills when returned as flat array vs object
  let normalizedSkills = {
    programming: [],
    frameworks: [],
    databases: [],
    cloud: [],
    tools: [],
    soft: [],
    other: []
  };

  if (Array.isArray(data.skills)) {
    normalizedSkills = categorizeSkillList(data.skills);
  } else if (data.skills && typeof data.skills === 'object') {
    Object.keys(normalizedSkills).forEach(cat => {
      if (Array.isArray(data.skills[cat])) {
        normalizedSkills[cat] = data.skills[cat].map(s => typeof s === 'object' ? s.name || '' : String(s).trim()).filter(Boolean);
      }
    });
  }

  const normalized = {
    personalInfo: {
      fullName: inferredName || 'Professional Candidate',
      jobTitle: cleanJobTitle,
      email: email,
      phone: data.personalInfo?.phone || '',
      location: data.personalInfo?.location || '',
      summary: data.personalInfo?.summary || '',
      linkedin: data.personalInfo?.linkedin || '',
      github: data.personalInfo?.github || '',
      website: data.personalInfo?.website || data.personalInfo?.portfolio || '',
      portfolio: data.personalInfo?.portfolio || data.personalInfo?.website || ''
    },
    experience: Array.isArray(data.experience) ? data.experience.map((exp, idx) => {
      let desc = exp.description || '';
      if (!desc && Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0) {
        desc = exp.responsibilities.map(r => `• ${String(r).replace(/^[•\-\*]\s*/, '').trim()}`).join('\n');
      } else if (!desc && Array.isArray(exp.highlights) && exp.highlights.length > 0) {
        desc = exp.highlights.map(h => `• ${String(h).replace(/^[•\-\*]\s*/, '').trim()}`).join('\n');
      }

      const startDate = exp.startDate || '';
      const endDate = exp.endDate || '';
      let date = exp.date || '';
      if (!date) {
        if (startDate && endDate) date = `${startDate} - ${endDate}`;
        else if (startDate) date = startDate;
        else if (endDate) date = endDate;
        else date = '';
      }

      return {
        id: exp.id || `exp_${Date.now()}_${idx}`,
        company: (exp.company === 'Confidential' || !exp.company) ? '' : exp.company,
        title: exp.title || exp.jobTitle || exp.role || 'Software Engineer',
        jobTitle: exp.jobTitle || exp.title || exp.role || 'Software Engineer',
        location: exp.location || exp.city || '',
        startDate: startDate,
        endDate: endDate,
        date: date,
        currentPosition: exp.currentPosition || (endDate && endDate.toLowerCase() === 'present') || false,
        description: desc
      };
    }).filter(e => e.company || e.title || e.description) : [],
    education: Array.isArray(data.education) ? data.education.map((edu, idx) => {
      const startDate = edu.startDate || '';
      const endDate = edu.endDate || '';
      let date = edu.date || '';
      if (!date) {
        if (startDate && endDate) date = `${startDate} - ${endDate}`;
        else if (startDate) date = startDate;
        else if (endDate) date = endDate;
        else date = '';
      }

      return {
        id: edu.id || `edu_${Date.now()}_${idx}`,
        school: edu.school || edu.institution || edu.university || '',
        institution: edu.institution || edu.school || edu.university || '',
        degree: edu.degree || edu.fieldOfStudy || '',
        location: edu.location || edu.city || '',
        startDate: startDate,
        endDate: endDate,
        date: date,
        cgpa: edu.cgpa || edu.gpa || '',
        details: edu.details || ''
      };
    }).filter(e => e.school || e.degree) : [],
    projects: Array.isArray(data.projects) ? data.projects.map((proj, idx) => {
      let desc = proj.description || '';
      if (proj.impact && !desc.includes(proj.impact)) {
        desc = desc ? `${desc}\n• ${proj.impact}` : `• ${proj.impact}`;
      }
      return {
        id: proj.id || `proj_${Date.now()}_${idx}`,
        name: proj.name || proj.title || '',
        technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : (proj.technologies || ''),
        duration: proj.duration || proj.date || '',
        date: proj.date || proj.duration || '',
        description: desc
      };
    }).filter(p => p.name || p.description) : [],
    skills: normalizedSkills,
    customSections: Array.isArray(data.customSections) ? data.customSections.map((cs, idx) => ({
      id: cs.id || `custom_${Date.now()}_${idx}`,
      title: cs.title || cs.heading || cs.name || 'Custom Section',
      content: cs.content || (Array.isArray(cs.items) ? cs.items.map(i => `• ${String(i).replace(/^[•\-\*]\s*/, '').trim()}`).join('\n') : '')
    })).filter(cs => cs.title && cs.content) : [],
    certifications: Array.isArray(data.certifications) ? data.certifications.map((cert, idx) => ({
      id: cert.id || `cert_${Date.now()}_${idx}`,
      name: cert.name || cert.title || '',
      issuer: cert.issuer || cert.organization || '',
      date: cert.date || cert.year || ''
    })).filter(c => c.name) : [],
    languages: Array.isArray(data.languages) ? data.languages.map((lang, idx) => {
      if (typeof lang === 'object') {
        return {
          id: lang.id || `lang_${Date.now()}_${idx}`,
          name: lang.language || lang.name || 'English',
          proficiency: lang.proficiency || 'Fluent',
          level: lang.level || 90
        };
      }
      return {
        id: `lang_${Date.now()}_${idx}`,
        name: String(lang),
        proficiency: 'Fluent',
        level: 90
      };
    }).filter(l => l.name) : []
  };

  return normalized;
}

/**
 * Intelligent Local Rule-Based Resume Structuring Engine (Offline Fallback with word-boundaries)
 */
export function buildLocalStructuredResume(rawText, targetRole = '', formatStyle = 'ats-impact') {
  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const data = {
    personalInfo: {
      fullName: '',
      jobTitle: targetRole || '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      linkedin: '',
      github: '',
      website: ''
    },
    experience: [],
    education: [],
    projects: [],
    skills: {
      programming: [],
      frameworks: [],
      databases: [],
      cloud: [],
      tools: [],
      soft: [],
      other: []
    },
    certifications: [],
    languages: []
  };

  // Contact regex
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\b\d{10}\b/;
  const linkedinRegex = /(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/i;
  const githubRegex = /(github\.com\/[a-zA-Z0-9_-]+)/i;

  const emailMatch = rawText.match(emailRegex);
  if (emailMatch) {
    data.personalInfo.email = emailMatch[1];
    data.personalInfo.fullName = inferNameFromEmail(emailMatch[1]);
  }

  const phoneMatch = rawText.match(phoneRegex);
  if (phoneMatch) data.personalInfo.phone = phoneMatch[0];

  const linkedinMatch = rawText.match(linkedinRegex);
  if (linkedinMatch) data.personalInfo.linkedin = linkedinMatch[1];

  const githubMatch = rawText.match(githubRegex);
  if (githubMatch) data.personalInfo.github = githubMatch[1];

  // Extract Name (First line if non-header and short)
  if (lines.length > 0) {
    const firstLine = lines[0];
    if (firstLine.length < 40 && !firstLine.includes('@') && !firstLine.includes('http') && !firstLine.includes('---')) {
      const cleanFirst = firstLine.replace(/[^a-zA-Z\s.]/g, '').trim();
      if (cleanFirst.length > 2) data.personalInfo.fullName = cleanFirst;
    }
  }

  // Detect job title if not already provided
  if (!data.personalInfo.jobTitle) {
    const jobRoleMatches = rawText.match(/\b(Software Engineer|Full Stack Developer|Frontend Engineer|Backend Developer|DevOps Engineer|Data Scientist|Product Manager|Mobile Developer|Cloud Architect|Web Developer)\b/i);
    if (jobRoleMatches) {
      data.personalInfo.jobTitle = jobRoleMatches[0];
    } else {
      data.personalInfo.jobTitle = targetRole || 'Software Engineer';
    }
  }

  // Scan skills using word boundary regex
  const skillDict = {
    programming: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Rust', 'Ruby', 'PHP', 'HTML', 'CSS', 'SQL'],
    frameworks: ['React', 'Next.js', 'Vue', 'Angular', 'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Tailwind'],
    databases: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Firebase', 'Supabase'],
    cloud: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    tools: ['Git', 'GitHub', 'Jira', 'Postman', 'Vite', 'Linux'],
    soft: ['Agile Execution', 'Problem Solving', 'System Design', 'Communication', 'Teamwork']
  };

  Object.entries(skillDict).forEach(([cat, list]) => {
    list.forEach(skill => {
      const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      if (regex.test(rawText) && !data.skills[cat].includes(skill)) {
        data.skills[cat].push(skill);
      }
    });
  });

  // Summary generation
  const roleName = data.personalInfo.jobTitle || 'Software Engineer';
  const allDetected = [...data.skills.programming, ...data.skills.frameworks, ...data.skills.databases];
  const skillsList = allDetected.slice(0, 4).join(', ') || 'Modern Full-Stack Development and APIs';
  data.personalInfo.summary = `Results-driven ${roleName} with expertise in ${skillsList}. Proven track record of developing scalable applications, optimizing workflows, and delivering high-impact solutions with clean architecture and modern engineering standards.`;

  return normalizePerfectedResumeData(data);
}

/**
 * Master Function: Analyze, Perfect, and Structure Resume Data from Raw Text / Notes
 */
export async function analyzeAndPerfectResumeFromText({
  rawText = '',
  file = null,
  targetRole = '',
  formatStyle = 'ats-impact',
  templateId = 'classic',
  customPrompt = '',
  onProgress = null
}) {
  const updateProgress = (step) => {
    if (typeof onProgress === 'function') onProgress(step);
  };

  updateProgress({ step: 1, title: 'Reading & Parsing Raw Text...', progress: 20 });

  let textContent = rawText;
  if (file && !textContent) {
    textContent = await extractTextFromFile(file);
  }

  if (!textContent || textContent.trim().length < 5) {
    throw new Error('Please provide resume text, notes, or upload a valid text document.');
  }

  const selectedFormat = FORMAT_STYLES[formatStyle] || FORMAT_STYLES['ats-impact'];
  const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

  updateProgress({ step: 2, title: 'AI Analyzing & Polishing Action Bullets...', progress: 50 });

  const systemPrompt = `You are a world-class Executive Resume Architect & AI Career Strategist.
Your mission is to take unformatted, messy, or incomplete candidate notes, resume text, or raw experience,
and transform it into a stunning, ATS-perfect, highly structured resume JSON dataset.

=== FORMATTING & REFINEMENT INSTRUCTIONS ===
1. CANDIDATE PROFILE & TARGET ROLE:
   - Target Role: ${targetRole || 'Infer from text or experience'}
   - Formatting Strategy: ${selectedFormat.label}
   - Strategy Rule: ${selectedFormat.promptRule}
   ${customPrompt ? `- Custom User Instructions: "${customPrompt}"` : ''}

2. POLISHING & IMPACT RULES (MAKE IT PERFECT):
   - Full Name: Accurately detect candidate name. If missing from text but present in email (e.g. mullayasmin158@gmail.com -> Mulla Yasmin), infer the clean proper name. NEVER use "---" or "Unknown".
   - Job Title: Accurately infer or refine the Job Title (e.g. Software Engineer, Full Stack Developer). NEVER return "---".
   - Dates Rule: If the user's text does NOT explicitly provide dates (years/months/dates) for an experience, degree, or project, leave startDate: "", endDate: "", and date: "" as EMPTY STRINGS. NEVER invent or guess dates if not present in the input.
   - Experience Bullets: Elevate every job experience into 2-4 high-impact bullet points. Every bullet MUST start with a strong action verb (e.g. Architected, Spearheaded, Accelerated, Engineered, Streamlined, Reduced) and incorporate realistic quantifiable results (%, $, metrics, scale, latency) where implied by the user's notes.
   - Projects: Format each project with a clear name, core tools/tech, and 2-3 metric-driven outcome bullets. Leave duration/date empty if not provided.
   - Skills Categorization: Intelligently categorize all detected technical & soft skills into programming, frameworks, databases, cloud, tools, and soft.
   - Side Headings & Custom Sections: If the input contains custom headings or side sections (e.g. "Key Achievements:", "Certifications:", "Publications:", "Volunteering:", "Honors:"), format them under the customSections array.
   - Contact Info: Extract email, phone, location, LinkedIn, GitHub, portfolio/website cleanly. Leave empty if missing.

3. STRICT JSON SCHEMA:
Return ONLY a valid JSON object matching this structure:
{
  "personalInfo": {
    "fullName": "Full Name",
    "jobTitle": "Target Job Title",
    "email": "email@example.com",
    "phone": "+1 ...",
    "location": "City, State",
    "summary": "Polished high-impact professional summary...",
    "linkedin": "linkedin.com/in/...",
    "github": "github.com/...",
    "website": "portfolio.com"
  },
  "experience": [
    {
      "company": "Company Name",
      "title": "Role Title",
      "jobTitle": "Role Title",
      "location": "City, State",
      "startDate": "Mon YYYY (or \"\" if not provided in text)",
      "endDate": "Present (or \"\" if not provided in text)",
      "date": "Mon YYYY - Present (or \"\" if not provided in text)",
      "description": "• Spearheaded... resulting in 35% efficiency boost.\n• Architected..."
    }
  ],
  "education": [
    {
      "school": "University / College Name",
      "institution": "University / College Name",
      "degree": "Degree / Major",
      "location": "City, State",
      "startDate": "YYYY (or \"\" if not in text)",
      "endDate": "YYYY (or \"\" if not in text)",
      "date": "YYYY - YYYY (or \"\" if not in text)",
      "cgpa": "3.8/4.0 or relevant metric"
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "technologies": "React, Node.js, AWS, PostgreSQL",
      "duration": "2023 (or \"\" if not in text)",
      "description": "• Engineered full-stack platform with...\n• Optimized database queries cutting response time by 40%."
    }
  ],
  "skills": {
    "programming": ["JavaScript", "TypeScript", "Python"],
    "frameworks": ["React", "Next.js", "Node.js"],
    "databases": ["PostgreSQL", "MongoDB", "Redis"],
    "cloud": ["AWS", "Docker", "CI/CD"],
    "tools": ["Git", "GitHub Actions", "Postman"],
    "soft": ["Team Leadership", "Agile Execution", "System Design"]
  },
  "customSections": [
    {
      "title": "Key Achievements",
      "content": "• Awarded Best Developer of the Year\n• Recognized for 99.9% uptime delivery"
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuing Org",
      "date": "YYYY"
    }
  ],
  "languages": [
    {
      "name": "English",
      "proficiency": "Native"
    }
  ]
}`;

  if (groqApiKey) {
    for (const model of GROQ_MODELS) {
      try {
        updateProgress({ step: 3, title: `Structuring Data with AI (${model.split('/')[1] || model})...`, progress: 75 });

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: `Please analyze, perfect, and structure the following candidate text/notes:\n\n${textContent}` }
            ],
            response_format: { type: "json_object" },
            temperature: 0.2
          })
        });

        if (response.ok) {
          const result = await response.json();
          const rawContent = result.choices?.[0]?.message?.content;
          if (rawContent) {
            const parsed = JSON.parse(rawContent);
            updateProgress({ step: 4, title: 'Finalizing & Auto-Filling Resume Blocks...', progress: 100 });
            return normalizePerfectedResumeData(parsed);
          }
        }
      } catch (err) {
        console.warn(`Groq model ${model} failed, trying next:`, err);
      }
    }
  }

  // Try backend proxy if direct client failed
  try {
    const backendRes = await fetch('/api/ai/parse-text-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rawText: textContent, targetRole, formatStyle, customPrompt })
    });
    if (backendRes.ok) {
      const backendData = await backendRes.json();
      if (backendData.data) {
        updateProgress({ step: 4, title: 'Finalizing & Auto-Filling Resume Blocks...', progress: 100 });
        return normalizePerfectedResumeData(backendData.data);
      }
    }
  } catch (err) {
    console.warn('Backend proxy AI parse attempt failed:', err);
  }

  // Offline Heuristic Structuring Engine
  updateProgress({ step: 4, title: 'Formatting & Auto-Filling Resume Blocks...', progress: 100 });
  return buildLocalStructuredResume(textContent, targetRole, formatStyle);
}
