/**
 * AI ATS Resume Service
 * Deep resume ATS scoring, keyword alignment, critical issue detection,
 * and actionable AI improvement suggestions with auto-fix capabilities.
 */

const ACTION_VERBS = [
  'accelerated', 'achieved', 'architected', 'automated', 'boosted', 'built',
  'centralized', 'championed', 'consolidated', 'decreased', 'delivered',
  'designed', 'developed', 'devised', 'doubled', 'drove', 'eliminated',
  'engineered', 'enhanced', 'established', 'executed', 'expanded', 'expedited',
  'formulated', 'generated', 'grew', 'guided', 'headed', 'implemented',
  'improved', 'increased', 'initiated', 'innovated', 'integrated', 'introduced',
  'launched', 'led', 'maximized', 'mentored', 'modernized', 'negotiated',
  'orchestrated', 'optimized', 'overhauled', 'pioneered', 'reduced', 'refactored',
  'restructured', 'revamped', 'scaled', 'simplified', 'spearheaded', 'standardized',
  'streamlined', 'strengthened', 'transformed', 'upgraded', 'yielded'
];

const COMMON_TECH_KEYWORDS = [
  'react', 'node.js', 'javascript', 'typescript', 'python', 'java', 'c++', 'c#',
  'golang', 'rust', 'html5', 'css3', 'tailwind', 'sql', 'postgresql', 'mysql',
  'mongodb', 'redis', 'graphql', 'rest api', 'docker', 'kubernetes', 'aws',
  'gcp', 'azure', 'ci/cd', 'git', 'github actions', 'microservices', 'agile',
  'scrum', 'jira', 'next.js', 'vite', 'webpack', 'linux', 'cloud', 'unit testing',
  'jest', 'cypress', 'terraform', 'system design', 'data structures', 'algorithms'
];

/**
 * Advanced Local Rule-Based ATS Analyzer (Fast, Offline & Instant Fallback)
 */
export function calculateLocalAtsScore(resumeData, jobDescription = '') {
  let score = 0;
  const issues = [];
  const suggestions = {
    summary: '',
    bullets: [],
    recommendedSkills: []
  };

  const p = resumeData?.personalInfo || {};
  const exp = Array.isArray(resumeData?.experience) ? resumeData.experience : [];
  const edu = Array.isArray(resumeData?.education) ? resumeData.education : [];
  const proj = Array.isArray(resumeData?.projects) ? resumeData.projects : [];
  
  // Extract all skills
  let allSkills = [];
  if (Array.isArray(resumeData?.skills)) {
    allSkills = resumeData.skills.map(s => typeof s === 'object' ? s.name || '' : String(s)).filter(Boolean);
  } else if (resumeData?.skills && typeof resumeData.skills === 'object') {
    Object.values(resumeData.skills).forEach(val => {
      if (Array.isArray(val)) {
        val.forEach(item => {
          const sName = typeof item === 'object' ? item.name || '' : String(item);
          if (sName) allSkills.push(sName.trim());
        });
      }
    });
  }

  // 1. Personal Info & Contact Completeness (Max 20 pts)
  let contactScore = 0;
  if (p.fullName && p.fullName.trim().length > 2) contactScore += 5;
  else issues.push({ type: 'danger', category: 'Contact', text: 'Full Name is missing or incomplete.' });

  if (p.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) contactScore += 5;
  else issues.push({ type: 'danger', category: 'Contact', text: 'Valid email address is missing.' });

  if (p.phone && p.phone.trim().length >= 7) contactScore += 4;
  else issues.push({ type: 'warning', category: 'Contact', text: 'Direct phone number is missing.' });

  if (p.location && p.location.trim().length > 2) contactScore += 3;
  else issues.push({ type: 'info', category: 'Contact', text: 'Location (City, State/Country) helps ATS geo-filters.' });

  if (p.linkedin || p.github || p.portfolio || p.website) contactScore += 3;
  else issues.push({ type: 'info', category: 'Contact', text: 'Adding a LinkedIn or GitHub profile link increases recruiter verification.' });

  score += Math.min(20, contactScore);

  // 2. Professional Summary & Keyword Impact (Max 15 pts)
  let summaryScore = 0;
  if (p.summary && p.summary.trim().length > 30) {
    summaryScore += 8;
    const summaryWords = p.summary.toLowerCase().split(/\s+/);
    const hasActionVerb = ACTION_VERBS.some(v => p.summary.toLowerCase().includes(v));
    if (hasActionVerb) summaryScore += 4;
    else issues.push({ type: 'warning', category: 'Summary', text: 'Summary lacks strong impact action verbs (e.g. Architected, Accelerated, Led).' });

    if (summaryWords.length >= 25 && summaryWords.length <= 90) summaryScore += 3;
    else if (summaryWords.length < 25) issues.push({ type: 'info', category: 'Summary', text: 'Summary is brief; aim for 3-4 impactful sentences highlighting your core value.' });
  } else {
    issues.push({ type: 'danger', category: 'Summary', text: 'Professional summary is missing. Recruiters and ATS prioritize candidate summaries.' });
  }
  score += Math.min(15, summaryScore);

  // 3. Experience, Metrics & Action Verbs (Max 30 pts)
  let expScore = 0;
  if (exp.length > 0) {
    expScore += 10;
    let totalBullets = 0;
    let metricCount = 0;
    let strongVerbCount = 0;

    exp.forEach((job) => {
      const text = (job.description || '') + ' ' + (job.title || '') + ' ' + (job.jobTitle || '');
      const lower = text.toLowerCase();
      
      // Check metrics (numbers, %, $, x improvement, k users)
      const metricMatches = text.match(/\b\d+(\.\d+)?(%|x|k|\+)?\b|\$\d+/gi);
      if (metricMatches) metricCount += metricMatches.length;

      ACTION_VERBS.forEach(verb => {
        if (lower.includes(verb)) strongVerbCount++;
      });

      const lines = (job.description || '').split('\n').filter(l => l.trim().length > 10);
      totalBullets += lines.length;
    });

    if (metricCount >= 3) expScore += 10;
    else if (metricCount >= 1) {
      expScore += 5;
      issues.push({ type: 'warning', category: 'Experience', text: 'Include more quantifiable metrics (e.g. "+35% speed", "reduced latency by 40ms", "scaled to 50K users").' });
    } else {
      issues.push({ type: 'danger', category: 'Experience', text: 'Zero quantifiable metrics detected in experience. ATS algorithms heavily favor data-backed achievements.' });
    }

    if (strongVerbCount >= 4) expScore += 10;
    else if (strongVerbCount >= 2) expScore += 6;
    else {
      expScore += 3;
      issues.push({ type: 'warning', category: 'Experience', text: 'Use more high-power action verbs at the beginning of bullet points.' });
    }
  } else if (proj.length > 0) {
    // Fresher / Student project compensation
    expScore += 18;
  } else {
    issues.push({ type: 'danger', category: 'Experience', text: 'No work experience or project entries found.' });
  }
  score += Math.min(30, expScore);

  // 4. Technical & Domain Skills (Max 20 pts)
  let skillsScore = 0;
  if (allSkills.length >= 8) skillsScore += 20;
  else if (allSkills.length >= 4) {
    skillsScore += 14;
    issues.push({ type: 'info', category: 'Skills', text: 'Add more relevant tools, frameworks, and domain skills to reach 8-15 core skills.' });
  } else if (allSkills.length >= 1) {
    skillsScore += 8;
    issues.push({ type: 'warning', category: 'Skills', text: 'Skills section is very sparse. ATS screeners match candidate skills directly.' });
  } else {
    issues.push({ type: 'danger', category: 'Skills', text: 'No technical or functional skills detected.' });
  }
  score += Math.min(20, skillsScore);

  // 5. Education & Projects Structure (Max 15 pts)
  let eduScore = 0;
  if (edu.length > 0) {
    eduScore += 8;
    const hasDegree = edu.some(e => e.degree && e.degree.length > 2);
    if (hasDegree) eduScore += 4;
  } else {
    issues.push({ type: 'warning', category: 'Education', text: 'Education history is missing.' });
  }

  if (proj.length > 0) {
    eduScore += 3;
  }
  score += Math.min(15, eduScore);

  // Job Description Matching (if provided)
  let jobMatchData = null;
  if (jobDescription && jobDescription.trim().length > 20) {
    const jdWords = jobDescription.toLowerCase().match(/\b[a-z]{3,20}\b/g) || [];
    const resumeText = JSON.stringify(resumeData).toLowerCase();
    
    // Find matching tech and industry terms
    const matchedKeywords = [];
    const missingKeywords = [];

    COMMON_TECH_KEYWORDS.forEach(keyword => {
      if (jobDescription.toLowerCase().includes(keyword)) {
        if (resumeText.includes(keyword)) {
          matchedKeywords.push(keyword);
        } else {
          missingKeywords.push(keyword);
        }
      }
    });

    const matchRate = (matchedKeywords.length + missingKeywords.length > 0)
      ? Math.round((matchedKeywords.length / (matchedKeywords.length + missingKeywords.length)) * 100)
      : 75;

    jobMatchData = {
      matchPercentage: matchRate,
      matchedKeywords: matchedKeywords.slice(0, 10),
      missingKeywords: missingKeywords.slice(0, 8),
      jobTitleDetected: jobDescription.split('\n')[0]?.slice(0, 50) || 'Target Role'
    };

    if (missingKeywords.length > 0) {
      issues.push({
        type: 'warning',
        category: 'Job Alignment',
        text: `Missing key skills mentioned in target job description: ${missingKeywords.slice(0, 4).join(', ')}.`
      });
    }
  }

  // Generate Suggested Improvements
  const userRole = p.jobTitle || 'Software Engineer';
  const topSkills = allSkills.slice(0, 5).join(', ') || 'Modern Full-Stack Development, React, Node.js, SQL, Cloud Architecture';

  suggestions.summary = `Results-driven ${userRole} with expertise in ${topSkills}. Proven track record of architecting scalable web applications, optimizing system performance by up to 35%, and collaborating with cross-functional agile teams to deliver robust enterprise solutions on schedule.`;

  if (exp.length > 0) {
    suggestions.bullets = [
      `Architected and deployed responsive UI components utilizing modern frontend frameworks, reducing load times by 28%.`,
      `Engineered resilient RESTful APIs and database schemas, supporting 50,000+ monthly active requests with 99.9% uptime.`,
      `Streamlined CI/CD automation pipelines, cutting release cycles from 3 days to under 4 hours.`
    ];
  } else {
    suggestions.bullets = [
      `Developed full-stack web application featuring user authentication, normalized database models, and interactive dashboards.`,
      `Implemented automated test suites with 85%+ code coverage, preventing regression bugs across sprint releases.`,
      `Optimized data queries and state management, accelerating response times by 30%.`
    ];
  }

  // Recommended Missing Skills
  const existingSkillsLower = allSkills.map(s => s.toLowerCase());
  suggestions.recommendedSkills = COMMON_TECH_KEYWORDS
    .filter(k => !existingSkillsLower.includes(k))
    .slice(0, 6);

  const finalScore = Math.min(100, Math.max(25, score));
  let verdict = 'Needs Optimization';
  let grade = 'C';
  if (finalScore >= 90) {
    verdict = 'ATS Ready (Top 5%)';
    grade = 'A+';
  } else if (finalScore >= 80) {
    verdict = 'Competitive';
    grade = 'A';
  } else if (finalScore >= 65) {
    verdict = 'Good Potential';
    grade = 'B';
  }

  return {
    overallScore: finalScore,
    verdict,
    grade,
    categories: {
      contact: { score: Math.round((Math.min(20, contactScore) / 20) * 100), max: 20 },
      summary: { score: Math.round((Math.min(15, summaryScore) / 15) * 100), max: 15 },
      experience: { score: Math.round((Math.min(30, expScore) / 30) * 100), max: 30 },
      skills: { score: Math.round((Math.min(20, skillsScore) / 20) * 100), max: 20 },
      education: { score: Math.round((Math.min(15, eduScore) / 15) * 100), max: 15 }
    },
    issues,
    jobMatch: jobMatchData,
    suggestedImprovements: suggestions
  };
}

/**
 * Deep AI-Powered ATS Analyzer using Groq LLM with heuristic fallback
 */
export async function analyzeResumeATS({ resumeData, rawText = '', jobDescription = '' }) {
  const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
  const localAnalysis = calculateLocalAtsScore(resumeData, jobDescription);

  if (!groqApiKey) {
    return localAnalysis;
  }

  try {
    const resumeJsonString = JSON.stringify(resumeData || {}, null, 2);
    const systemPrompt = `You are a Principal Technical Recruiter and ATS (Applicant Tracking System) Algorithm Auditor.
Evaluate the candidate's resume for ATS compatibility, keyword density, action verb strength, and quantifiable business impact.

Analyze the resume against modern ATS parsing engines (Workday, Greenhouse, Lever, Taleo, iCIMS).

CRITICAL INSTRUCTIONS:
1. Provide an overall ATS score from 0 to 100.
2. Provide score breakdown percentages (0-100) for: Format & Parseability, Action Verbs & Metrics, Skills & Keyword Density, Completeness & Structure.
3. List 3-6 critical issues or warnings with severity ('danger', 'warning', 'info').
4. If job description is provided, compute exact keyword match percentage, list matched keywords, and list missing keywords.
5. Provide high-impact AI rewrite suggestions:
   - "summary": A polished, punchy 3-4 sentence professional summary tailored with metrics and action verbs.
   - "bullets": An array of 3 upgraded high-impact accomplishment bullets with strong action verbs and % stats.
   - "recommendedSkills": An array of 4-8 industry-relevant skills the candidate should add.

Return ONLY a valid JSON object matching this structure:
{
  "overallScore": 92,
  "verdict": "ATS Ready",
  "grade": "A+",
  "categories": {
    "contact": { "score": 95, "max": 20 },
    "summary": { "score": 90, "max": 15 },
    "experience": { "score": 88, "max": 30 },
    "skills": { "score": 94, "max": 20 },
    "education": { "score": 90, "max": 15 }
  },
  "issues": [
    { "type": "warning", "category": "Experience", "text": "Quantify bullet points with % or latency reductions" }
  ],
  "jobMatch": {
    "matchPercentage": 85,
    "matchedKeywords": ["React", "TypeScript", "Node.js"],
    "missingKeywords": ["GraphQL", "Docker"],
    "jobTitleDetected": "Senior Full Stack Engineer"
  },
  "suggestedImprovements": {
    "summary": "...",
    "bullets": ["...", "...", "..."],
    "recommendedSkills": ["Docker", "Kubernetes", "GraphQL", "Redis"]
  }
}`;

    const userPrompt = `Resume Data:\n${resumeJsonString}\n\n${rawText ? `Raw Resume Text:\n${rawText.slice(0, 3000)}\n\n` : ''}${jobDescription ? `Target Job Description:\n${jobDescription.slice(0, 2500)}` : 'Target Job Description: None specified.'}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (response.ok) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        const parsed = JSON.parse(content);
        if (parsed && typeof parsed.overallScore === 'number') {
          return {
            ...localAnalysis,
            ...parsed,
            // Ensure suggestedImprovements are always present
            suggestedImprovements: {
              ...localAnalysis.suggestedImprovements,
              ...(parsed.suggestedImprovements || {})
            }
          };
        }
      }
    }
  } catch (err) {
    console.warn('Groq ATS scan failed, falling back to local analyzer:', err);
  }

  return localAnalysis;
}

/**
 * 1-Click Auto-Fix helper: Applies suggested improvements directly into resumeData
 */
export function applyAtsFixesToResume(currentResumeData, suggestedImprovements) {
  if (!currentResumeData || !suggestedImprovements) return currentResumeData;

  const nextData = JSON.parse(JSON.stringify(currentResumeData));

  // 1. Apply enhanced summary if available
  if (suggestedImprovements.summary && suggestedImprovements.summary.trim()) {
    if (!nextData.personalInfo) nextData.personalInfo = {};
    nextData.personalInfo.summary = suggestedImprovements.summary.trim();
  }

  // 2. Enrich skills
  if (Array.isArray(suggestedImprovements.recommendedSkills) && suggestedImprovements.recommendedSkills.length > 0) {
    if (Array.isArray(nextData.skills)) {
      const existing = new Set(nextData.skills.map(s => String(s).toLowerCase()));
      suggestedImprovements.recommendedSkills.forEach(s => {
        if (!existing.has(s.toLowerCase())) {
          nextData.skills.push(s);
          existing.add(s.toLowerCase());
        }
      });
    } else if (nextData.skills && typeof nextData.skills === 'object') {
      if (!Array.isArray(nextData.skills.tools)) nextData.skills.tools = [];
      const existing = new Set(Object.values(nextData.skills).flat().map(s => String(s).toLowerCase()));
      suggestedImprovements.recommendedSkills.forEach(s => {
        if (!existing.has(s.toLowerCase())) {
          nextData.skills.tools.push(s);
          existing.add(s.toLowerCase());
        }
      });
    }
  }

  // 3. Upgrade experience or project bullet descriptions
  if (Array.isArray(suggestedImprovements.bullets) && suggestedImprovements.bullets.length > 0) {
    const formattedBullets = suggestedImprovements.bullets.map(b => b.startsWith('•') ? b : `• ${b}`).join('\n');
    
    if (Array.isArray(nextData.experience) && nextData.experience.length > 0) {
      if (!nextData.experience[0].description || nextData.experience[0].description.trim().length < 20) {
        nextData.experience[0].description = formattedBullets;
      } else {
        nextData.experience[0].description = nextData.experience[0].description + '\n' + formattedBullets;
      }
    } else if (Array.isArray(nextData.projects) && nextData.projects.length > 0) {
      if (!nextData.projects[0].description || nextData.projects[0].description.trim().length < 20) {
        nextData.projects[0].description = formattedBullets;
      } else {
        nextData.projects[0].description = nextData.projects[0].description + '\n' + formattedBullets;
      }
    }
  }

  return nextData;
}
