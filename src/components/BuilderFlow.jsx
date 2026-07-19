import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CreatableSelect from 'react-select/creatable';
import { SKILL_OPTIONS_BY_CATEGORY, ALL_TECH_OPTIONS, getSuggestedTechs, WORLDWIDE_JOB_ROLES, getTechsForRole } from '../constants/skillsData';
// ── Deckled Torn Paper Edges ──
const TornEdge = ({ isBottom }) => (
  <svg 
    width="100%" 
    height="12" 
    viewBox="0 0 1200 12" 
    preserveAspectRatio="none"
    style={{ 
      position: 'absolute', 
      left: 0, 
      right: 0, 
      [isBottom ? 'bottom' : 'top']: '-6px', 
      zIndex: 10,
      pointerEvents: 'none'
    }}
  >
    <path 
      d={isBottom 
        ? "M0,6 L20,12 L40,6 L60,12 L80,6 L100,12 L120,6 L140,12 L160,6 L180,12 L200,6 L220,12 L240,6 L260,12 L280,6 L300,12 L320,6 L340,12 L360,6 L380,12 L400,6 L420,12 L440,6 L460,12 L480,6 L500,12 L520,6 L540,12 L560,6 L580,12 L600,6 L620,12 L640,6 L660,12 L680,6 L700,12 L720,6 L740,12 L760,6 L780,12 L800,6 L840,12 L880,6 L920,12 L960,6 L1000,12 L1040,6 L1080,12 L1120,6 L1160,12 L1200,6 L1200,0 L0,0 Z"
        : "M0,6 L20,0 L40,6 L60,0 L80,6 L100,0 L120,6 L140,0 L160,6 L180,0 L200,6 L220,0 L240,6 L260,0 L280,6 L300,0 L320,6 L340,0 L360,6 L380,0 L400,6 L420,0 L440,6 L460,0 L480,6 L500,0 L520,6 L540,0 L560,6 L580,0 L600,6 L620,0 L640,6 L660,0 L680,6 L700,0 L720,6 L740,0 L760,6 L780,0 L800,6 L840,0 L880,6 L920,0 L960,6 L1000,0 L1040,6 L1080,0 L1120,6 L1160,0 L1200,6 L1200,12 L0,12 Z"
      } 
      fill="#FFFFFF" 
      stroke="#CBD5E1"
      strokeWidth="1.5"
    />
  </svg>
);

import { useResume, defaultState } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';
import LivePreview from './LivePreview';
import { Plus, Trash2, Search, X, Hexagon, ChevronLeft, ChevronRight, Check, Download, Sparkles, Cloud, Database } from 'lucide-react';
import { apiClient } from '../utils/apiClient';
import { useAuth } from '../context/AuthContext';

// Static Jelly Button with clean flat styling (no motion scaling or morphing)
const JellyButton = ({ onClick, style, children, className, onMouseOver, onMouseOut, disabled, type = "button" }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        border: '1px solid #CBD5E1',
        background: '#FFFFFF',
        color: '#1F2937',
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        outline: 'none',
        userSelect: 'none',
        padding: '0.65rem 1.5rem',
        borderRadius: '8px', // standard clean rounded corners
        fontSize: '1.1rem', // enlarged text size
        transition: 'all 0.1s ease',
        ...style
      }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children}
    </button>
  );
};
import { templates } from './templatesList';
import TemplateRenderer, { dummyData } from './TemplateRenderer';
import { downloadPDF } from '../utils/pdfGenerator';


// Dynamic Counting Radial Progress Ring for AI Benchmark
const ScoreCircularProgress = ({ targetScore }) => {
  const [score, setScore] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const end = targetScore || 0;
    if (end === 0) return;
    const duration = 1000;
    const stepTime = Math.abs(Math.floor(duration / end));
    
    const timer = setInterval(() => {
      start += 1;
      setScore(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [targetScore]);

  const radius = 28;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="70" height="70" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="35" cy="35" r={radius} fill="transparent" stroke="#E2E8F0" strokeWidth={strokeWidth} />
        <motion.circle 
          cx="35" cy="35" r={radius} 
          fill="transparent" 
          stroke="#FF5C00" 
          strokeWidth={strokeWidth} 
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
        />
      </svg>
      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B', fontFamily: 'inherit' }}>{score}</span>
        <span style={{ fontSize: '0.55rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', fontFamily: 'inherit' }}>score</span>
      </div>
    </div>
  );
};

const BuilderFlow = () => {
  const navigate = useNavigate();
  const { 
    resumeData, setResumeData,
    updatePersonalInfo, 
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addSkill, removeSkill, addItem, updateItem, removeItem,
    selectedTemplate, setSelectedTemplate,
    updateSettings,
    updateSection,
    generateSummaryAI,
    generateProjectDescriptionAI,
    resetResume
  } = useResume();
  const { user } = useAuth();

  const [showExitConfirm, setShowExitConfirm] = useState(false);
  
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const [activeEduIndex, setActiveEduIndex] = useState(0);
  const [activeProjIndex, setActiveProjIndex] = useState(0);
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const [activeLangIndex, setActiveLangIndex] = useState(0);
  const [activeCustIndex, setActiveCustIndex] = useState(0);
  const [showJobRoleDropdown, setShowJobRoleDropdown] = useState(false);
  const jobRoleDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (jobRoleDropdownRef.current && !jobRoleDropdownRef.current.contains(event.target)) {
        setShowJobRoleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Supabase Cloud Sync States
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncTab, setSyncTab] = useState('save'); // 'save' or 'load'
  const [syncUserKey, setSyncUserKey] = useState(localStorage.getItem('sync_user_key') || '');
  const [syncResumeName, setSyncResumeName] = useState('');
  const [savedResumesList, setSavedResumesList] = useState([]);
  const [isLoadingSync, setIsLoadingSync] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [syncError, setSyncError] = useState('');

  // Prefill resume name and sync key when the sync modal is opened
  useEffect(() => {
    if (showSyncModal) {
      if (user?.email) {
        setSyncUserKey(user.email);
      } else if (!syncUserKey) {
        setSyncUserKey(localStorage.getItem('sync_user_key') || '');
      }
      if (!syncResumeName) {
        const name = resumeData.personalInfo?.fullName || '';
        const title = resumeData.personalInfo?.jobTitle || '';
        setSyncResumeName(name ? `${name} - ${title || 'Resume'}`.trim() : 'My Resume');
      }
    }
  }, [showSyncModal, resumeData.personalInfo, user]);

  // Save current resume to MongoDB
  const handleSaveToCloud = async (e) => {
    if (e) e.preventDefault();
    if (!syncUserKey.trim()) {
      setSyncError("Please enter your Sync Key (Email/Username).");
      return;
    }
    if (!syncResumeName.trim()) {
      setSyncError("Please enter a name for this resume.");
      return;
    }

    setIsLoadingSync(true);
    setSyncError('');
    setSyncMessage('');

    try {
      localStorage.setItem('sync_user_key', syncUserKey.trim());
      
      await apiClient.resumes.save(
        syncUserKey.trim().toLowerCase(),
        syncResumeName.trim(),
        resumeData
      );

      setSyncMessage("Resume saved successfully to cloud!");
      if (syncTab === 'load') {
        handleRetrieveResumes();
      }
    } catch (err) {
      console.error("Cloud Save Error:", err);
      setSyncError("Failed to save resume: " + err.message);
    } finally {
      setIsLoadingSync(false);
    }
  };

  // Retrieve saved resumes from MongoDB
  const handleRetrieveResumes = async () => {
    if (!syncUserKey.trim()) {
      setSyncError("Please enter your Sync Key (Email/Username).");
      return;
    }

    setIsLoadingSync(true);
    setSyncError('');
    setSyncMessage('');

    try {
      localStorage.setItem('sync_user_key', syncUserKey.trim());
      const data = await apiClient.resumes.list(syncUserKey.trim().toLowerCase());
      setSavedResumesList(data || []);
      if (!data || data.length === 0) {
        setSyncMessage("No saved resumes found for this Sync Key.");
      }
    } catch (err) {
      console.error("Cloud Fetch Error:", err);
      setSyncError("Failed to fetch resumes: " + err.message);
    } finally {
      setIsLoadingSync(false);
    }
  };

  // Load a selected resume into the editor
  const handleLoadResume = async (resumeId) => {
    setIsLoadingSync(true);
    setSyncError('');
    setSyncMessage('');

    try {
      const data = await apiClient.resumes.get(resumeId);
      if (data && data.data) {
        setResumeData(data.data);
        setSyncResumeName(data.name);
        setSyncMessage(`Successfully loaded "${data.name}"!`);
        setShowSyncModal(false);
      }
    } catch (err) {
      console.error("Cloud Load Error:", err);
      setSyncError("Failed to load resume: " + err.message);
    } finally {
      setIsLoadingSync(false);
    }
  };

  // Delete a saved resume
  const handleDeleteCloudResume = async (resumeId) => {
    if (!window.confirm("Are you sure you want to delete this resume from the cloud? This cannot be undone.")) return;
    
    setIsLoadingSync(true);
    setSyncError('');
    setSyncMessage('');

    try {
      await apiClient.resumes.delete(resumeId);
      setSyncMessage("Resume deleted successfully.");
      setSavedResumesList(prev => prev.filter(r => r.id !== resumeId));
    } catch (err) {
      console.error("Cloud Delete Error:", err);
      setSyncError("Failed to delete resume: " + err.message);
    } finally {
      setIsLoadingSync(false);
    }
  };

  // Helper validation methods
  const isValidEmail = (email) => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidName = (name) => name && name.trim().length > 2;
  const isValidPhone = (phone) => phone && phone.trim().length > 5;

  const handleAddExperience = () => {
    addExperience();
    setActiveExpIndex(resumeData.experience?.length || 0);
  };

  const handleAddEducation = () => {
    addEducation();
    setActiveEduIndex(resumeData.education?.length || 0);
  };
  const [leftPaneMode, setLeftPaneMode] = useState('edit');
  const [customizeFilterTag, setCustomizeFilterTag] = useState('All');
  const [previewScale, setPreviewScale] = useState(0.75);
  const [showAIAudit, setShowAIAudit] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditLoadingText, setAuditLoadingText] = useState('');
  const [auditReport, setAuditReport] = useState(null);

  const allSteps = [
    { id: 'personal', title: "Personal Details", subtitle: "Users who added phone number and email received 64% more positive feedback from recruiters." },
    { id: 'skills', title: "Areas of Expertise", subtitle: "Choose 5 important skills that show you fit the position." },
    { id: 'projects', title: "Projects", subtitle: "Showcase key projects you have worked on." },
    { id: 'summary', title: "Professional Summary", subtitle: "Write 2-4 short, energetic sentences about how great you are." },
    { id: 'experience', title: "Professional Experience", subtitle: "Show your relevant experience (last 10 years). Use bullet points." },
    { id: 'education', title: "Education", subtitle: "A varied education on your resume sums up the value that your learnings and background will bring to job." },
    { id: 'certifications', title: "Certifications", subtitle: "Include relevant certificates or licenses." },
    { id: 'languages', title: "Languages", subtitle: "List languages you speak and your proficiency." }
  ];

  const steps = allSteps.filter(s => !(s.id === 'experience' && resumeData.profileType === 'student'));

  useEffect(() => {
    const handleResize = () => {
      const paneWidth = window.innerWidth / 2;
      const paneHeight = window.innerHeight - 64;
      const scaleW = (paneWidth - 20) / 800;
      const scaleH = (paneHeight - 20) / 1131;
      const newScale = Math.min(scaleW, scaleH, 1);
      setPreviewScale(newScale);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    if (activeStepIndex < steps.length - 1) setActiveStepIndex(prev => prev + 1);
  };
  
  const handleBack = () => {
    if (activeStepIndex > 0) setActiveStepIndex(prev => prev - 1);
    else setShowExitConfirm(true);
  };

  const handleConfirmExit = () => {
    resetResume();
    setShowExitConfirm(false);
    navigate('/');
  };

  const handleDownloadPDF = async () => {
    const filename = resumeData?.personalInfo?.fullName
      ? `${resumeData.personalInfo.fullName.trim().replace(/\s+/g, '_')}_Resume.pdf`
      : 'Resume.pdf';
    await downloadPDF('resume-pdf-content', filename);
  };

  // Skill categories matching the screenshot order
  const skillCategories = [
    { key: 'programming', label: 'Programming Languages' },
    { key: 'cloud', label: 'Core Computer Science' },
    { key: 'frameworks', label: 'Backend & Development' },
    { key: 'databases', label: 'Databases' },
    { key: 'tools', label: 'Tools & Technologies' },
    { key: 'soft', label: 'Soft Skills' },
    { key: 'other', label: 'Other Skills' }
  ];

  const [newSkillByCategory, setNewSkillByCategory] = useState({});

  const handleAddSkillToCategory = (categoryKey, e) => {
    e.preventDefault();
    const value = (newSkillByCategory[categoryKey] || '').trim();
    if (value) {
      addSkill(categoryKey, [...(resumeData.skills?.[categoryKey] || []), { name: value, level: 80 }]);
      setNewSkillByCategory(prev => ({ ...prev, [categoryKey]: '' }));
    }
  };
  
  const handleRemoveSkillFromCategory = (categoryKey, index) => {
    const skills = [...(resumeData.skills?.[categoryKey] || [])];
    skills.splice(index, 1);
    addSkill(categoryKey, skills);
  };

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [roughSummaryNotes, setRoughSummaryNotes] = useState('');

  const handleAIRewrite = async () => {
    setIsGeneratingAI(true);
    try {
      const skillsArray = [
        ...(resumeData.skills?.programming || []),
        ...(resumeData.skills?.frameworks || []),
        ...(resumeData.skills?.databases || []),
        ...(resumeData.skills?.cloud || []),
        ...(resumeData.skills?.tools || []),
        ...(resumeData.skills?.other || [])
      ];
      const projectsArray = resumeData.projects || [];
      const summary = await generateSummaryAI(skillsArray, projectsArray, resumeData.profileType, roughSummaryNotes);
      updatePersonalInfo('summary', summary);
    } catch (err) {
      console.error("AI Generation failed:", err);
      // Fallback
      const jobTitle = resumeData.experience?.[0]?.title || resumeData.personalInfo?.jobTitle || 'Professional';
      const company = resumeData.experience?.[0]?.company || 'industry-leading companies';
      const skillsNames = [
        ...(resumeData.skills?.programming || []),
        ...(resumeData.skills?.frameworks || []),
        ...(resumeData.skills?.databases || [])
      ].map(s => typeof s === 'object' ? s.name : s);
      const skillsList = skillsNames.slice(0, 4).join(', ') || 'strategic planning and execution';
      
      const fallbackSummary = resumeData.profileType === 'student'
        ? `Motivated and detail-oriented student with a strong foundation in ${skillsList}. Eager to leverage academic background to contribute effectively to a dynamic team.`
        : `Results-driven ${jobTitle} with a proven track record of success at ${company}. Skilled in ${skillsList}, with a strong commitment to delivering high-quality results.`;
      
      updatePersonalInfo('summary', fallbackSummary);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handlePrewrittenPhrases = () => {
    const phrases = [
      "Led cross-functional teams to deliver high-priority projects on time and within budget.",
      "Successfully optimized operational workflows, resulting in a 20% increase in productivity.",
      "Proven ability to translate complex business requirements into scalable technical solutions.",
      "Skilled in collaborating with senior leadership to define strategic goals and objectives.",
      "Strong track record of mentoring junior staff and fostering a culture of continuous improvement."
    ];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    const currentSummary = resumeData.personalInfo?.summary || '';
    const newSummary = currentSummary ? `${currentSummary.trim()} ${phrase}` : phrase;
    updatePersonalInfo('summary', newSummary);
  };

  const generateAuditReport = () => {
    const jobTitle = resumeData.personalInfo?.jobTitle || resumeData.experience?.[0]?.title || '';
    const titleLower = jobTitle.toLowerCase();
    
    let roleName = "General Professional";
    let targetSkills = ["Strategic Planning", "Project Management", "Data Analysis", "Communication", "Leadership"];
    
    if (titleLower.includes('engineer') || titleLower.includes('developer') || titleLower.includes('tech') || titleLower.includes('ai') || titleLower.includes('science')) {
      roleName = "AI Engineer / Software Developer";
      targetSkills = ["Python", "Git", "Docker", "AWS", "CI/CD", "TensorFlow", "API Design", "Agile"];
    } else if (titleLower.includes('writer') || titleLower.includes('content') || titleLower.includes('doc')) {
      roleName = "Technical Writer / Content Developer";
      targetSkills = ["MadCap Flare", "API Documentation", "Git", "SOPs", "Markdown", "Agile", "SEO"];
    } else if (titleLower.includes('designer') || titleLower.includes('ux') || titleLower.includes('ui') || titleLower.includes('graphics')) {
      roleName = "UI/UX Designer";
      targetSkills = ["Figma", "User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing", "Adobe Suite"];
    }
    
    // User skills list
    const userSkillsArr = (resumeData.skills?.programming || []).map(s => (typeof s === 'object' ? s.name : s).toLowerCase());
    
    const matchedSkills = targetSkills.filter(ts => userSkillsArr.some(us => us.includes(ts.toLowerCase())));
    const missingSkills = targetSkills.filter(ts => !userSkillsArr.some(us => us.includes(ts.toLowerCase())));
    
    // Check for metrics/numbers in experience descriptions
    let hasMetrics = false;
    if (resumeData.experience && resumeData.experience.length > 0) {
      const allDescriptions = resumeData.experience.map(e => e.description || '').join(' ');
      hasMetrics = /[\d%+$]/.test(allDescriptions);
    }
    
    // Calculate benchmark score
    let baseScore = 50;
    if (resumeData.personalInfo?.summary) baseScore += 10;
    if (resumeData.education?.length > 0) baseScore += 10;
    if (resumeData.experience?.length > 0) baseScore += 10;
    if (hasMetrics) baseScore += 10;
    baseScore += Math.min(matchedSkills.length * 5, 20); // up to +20 for matching skills
    
    let matchRating = 'Needs Attention';
    let ratingColor = '#EF4444';
    let ratingBg = '#FEE2E2';
    if (baseScore >= 80) {
      matchRating = 'Top 10% Industry Fit';
      ratingColor = '#10B981';
      ratingBg = '#D1FAE5';
    } else if (baseScore >= 60) {
      matchRating = 'Strong Candidate (Average Match)';
      ratingColor = '#D97706';
      ratingBg = '#FEF3C7';
    }
    
    return {
      roleName,
      benchmarkScore: baseScore,
      matchRating,
      ratingColor,
      ratingBg,
      matchedSkills,
      missingSkills: missingSkills.slice(0, 4),
      hasMetrics
    };
  };

  const handleStartAIAudit = () => {
    setIsAuditing(true);
    setShowAIAudit(true);
    setAuditLoadingText('Reading resume structure...');
    
    setTimeout(() => {
      setAuditLoadingText('Matching skills against 10,000+ top resumes online...');
      setTimeout(() => {
        setAuditLoadingText('Analyzing content metrics & impact...');
        setTimeout(() => {
          setAuditLoadingText('Calculating industry benchmark score...');
          setTimeout(() => {
            const report = generateAuditReport();
            setAuditReport(report);
            setIsAuditing(false);
          }, 450);
        }, 450);
      }, 450);
    }, 450);
  };

  const calculateResumeScore = () => {
    let score = 15; // base score
    if (resumeData.personalInfo?.fullName) score += 15;
    if (resumeData.personalInfo?.email) score += 10;
    if (resumeData.personalInfo?.phone) score += 10;
    if (resumeData.personalInfo?.summary) score += 20;
    if (resumeData.experience?.length > 0) score += 15;
    if (resumeData.education?.length > 0) score += 10;
    if (resumeData.skills?.programming?.length > 0) score += 5;
    return Math.min(score, 100);
  };

  const getScoreDetails = () => {
    const score = calculateResumeScore();
    let text = 'Excellent work!';
    let nextStepId = '';
    
    if (!resumeData.personalInfo?.summary) {
      text = '+20% Add professional summary';
      nextStepId = 'summary';
    } else if (!resumeData.experience || resumeData.experience.length === 0) {
      text = '+15% Add work experience';
      nextStepId = 'experience';
    } else if (!resumeData.skills?.programming || resumeData.skills.programming.length === 0) {
      text = '+10% Add areas of expertise';
      nextStepId = 'skills';
    } else {
      text = 'Excellent work! (100% complete)';
    }
    
    return { score, text, nextStepId };
  };

  const scoreDetails = getScoreDetails();

  const navigateToStep = (stepId) => {
    const idx = steps.findIndex(s => s.id === stepId);
    if (idx !== -1) setActiveStepIndex(idx);
  };

  const activeStep = steps[activeStepIndex];

  const handleAddSuggestedTech = (projId, currentTechsStr, techToAdd) => {
    const currentTechs = currentTechsStr ? currentTechsStr.split(',').map(t => t.trim()).filter(Boolean) : [];
    if (!currentTechs.includes(techToAdd)) {
      const nextTechs = [...currentTechs, techToAdd].join(', ');
      updateItem('projects', projId, { technologies: nextTechs });
    }
  };

  const handleAddRoleSkill = (tech) => {
    let category = 'other';
    const techLower = tech.toLowerCase();
    for (const [catKey, options] of Object.entries(SKILL_OPTIONS_BY_CATEGORY)) {
      if (options.some(opt => opt.value.toLowerCase() === techLower)) {
        category = catKey;
        break;
      }
    }
    const currentList = resumeData.skills?.[category] || [];
    const isAlreadyPresent = currentList.some(s => (typeof s === 'object' ? s.name : s).toLowerCase() === techLower);
    if (!isAlreadyPresent) {
      addSkill(category, [...currentList, { name: tech, level: 80 }]);
    }
  };

  // ── Shared input style ──
  const inputStyle = { 
    padding: '0.95rem 1.35rem', 
    borderRadius: '10px', 
    border: '1.5px solid #94A3B8', 
    background: '#FFFFFF', 
    outline: 'none', 
    fontSize: '1.2rem', // even larger input font
    color: '#111827',
    transition: 'all 0.1s ease',
    boxShadow: 'none'
  };
  const labelStyle = { 
    fontSize: '1.05rem', // even larger label font
    fontWeight: 800, 
    color: '#111827', 
    textTransform: 'uppercase', 
    letterSpacing: '0.05em', 
    marginBottom: '0.45rem' 
  };

  // ── Render the edit form for the current step ──
  const renderAIAuditPanel = () => {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            type="button"
            onClick={() => setShowAIAudit(false)}
            style={{ background: 'none', border: 'none', color: '#18181B', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            ← Back to Editor
          </button>
        </div>

        {isAuditing ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem', gap: '1.5rem', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '80px', height: '80px' }}>
              <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '4px solid #E2E8F0', borderTopColor: '#059669', animation: 'spin 1s linear infinite' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#18181B' }}>
                <Sparkles size={28} />
              </div>
            </div>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>Comparing Resume</h2>
              <p style={{ color: '#334155', fontSize: '0.95rem' }}>{auditLoadingText}</p>
            </div>
          </div>
        ) : (
          auditReport && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Benchmark Score Card */}
              <div style={{ 
                background: '#FFFFFF', 
                border: '1px solid #E2E8F0', 
                borderRadius: '12px', 
                padding: '1.5rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem',
                boxShadow: '0 4px 15px -3px rgba(0,0,0,0.05)'
              }}>
                <ScoreCircularProgress targetScore={parseInt(auditReport.benchmarkScore)} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#334155', letterSpacing: '0.5px' }}>
                    Compared to: {auditReport.roleName}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B', margin: '2px 0 4px 0' }}>
                    {auditReport.matchRating}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#334155', margin: 0 }}>
                    Calculated against top 10% hires in this segment.
                  </p>
                </div>
              </div>

              {/* Keyword Analysis */}
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Industry Keyword Check</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {auditReport.matchedSkills.map(s => (
                      <span key={s} style={{ background: '#D1FAE5', color: '#065F46', fontSize: '0.75rem', fontWeight: 600, padding: '3px 8px', borderRadius: '15px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                  {auditReport.missingSkills.length > 0 ? (
                    <div>
                      <p style={{ fontSize: '0.85rem', color: '#B91C1C', fontWeight: 500, margin: '0.5rem 0 0.4rem 0' }}>
                        Missing keywords on 80%+ of top resumes:
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {auditReport.missingSkills.map(s => (
                          <span key={s} style={{ background: '#FFF1F2', color: '#9F1239', fontSize: '0.75rem', fontWeight: 600, padding: '3px 8px', borderRadius: '15px' }}>
                            + {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.85rem', color: '#10B981', margin: 0 }}>✓ You have all primary keywords for this role!</p>
                  )}
                </div>
              </div>

              {/* Content Impact */}
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>Content Impact Check</h4>
                <div style={{ 
                  padding: '0.75rem 1rem', 
                  background: auditReport.hasMetrics ? 'rgba(209, 250, 229, 0.45)' : 'rgba(254, 226, 226, 0.45)', 
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: `1px solid ${auditReport.hasMetrics ? '#A7F3D0' : '#FECACA'}`, 
                  borderRadius: '10px', 
                  fontSize: '0.85rem', 
                  color: auditReport.hasMetrics ? '#065F46' : '#9F1239' 
                }}>
                  {auditReport.hasMetrics ? (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <span style={{ color: '#10B981', fontWeight: 'bold' }}>✓</span>
                      <span>Great job! You used quantitative metrics in your experience descriptions to show your impact.</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <span style={{ color: '#E11D48', fontWeight: 'bold' }}>!</span>
                      <span>No metrics found in descriptions. Re-write items to include stats (e.g. "managed 5+ projects", "improved speed by 25%") to match top candidates.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommendations Checklists */}
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>AI Action Checklist</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {auditReport.missingSkills.length > 0 && (
                    <button 
                      type="button"
                      onClick={() => {
                        setShowAIAudit(false);
                        navigateToStep('skills');
                      }}
                      style={{ 
                        textAlign: 'left', width: '100%', padding: '0.75rem 1.1rem', 
                        border: '1px solid #E2E8F0', borderRadius: '10px', 
                        background: 'rgba(255, 255, 255, 0.75)', 
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        color: '#1E293B', fontSize: '0.85rem', fontWeight: 600, 
                        cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                    >
                      <span>Add missing skills ({auditReport.missingSkills.join(', ')})</span>
                      <span style={{ color: '#18181B', fontWeight: 600 }}>Fix now →</span>
                    </button>
                  )}
                  {!auditReport.hasMetrics && (
                    <button 
                      type="button"
                      onClick={() => {
                        setShowAIAudit(false);
                        navigateToStep('experience');
                      }}
                      style={{ 
                        textAlign: 'left', width: '100%', padding: '0.75rem 1.1rem', 
                        border: '1px solid #E2E8F0', borderRadius: '10px', 
                        background: 'rgba(255, 255, 255, 0.75)', 
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        color: '#1E293B', fontSize: '0.85rem', fontWeight: 600, 
                        cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                    >
                      <span>Add percentages/numbers to Experience</span>
                      <span style={{ color: '#18181B', fontWeight: 600 }}>Fix now →</span>
                    </button>
                  )}
                  {!resumeData.personalInfo?.summary && (
                    <button 
                      type="button"
                      onClick={() => {
                        setShowAIAudit(false);
                        navigateToStep('summary');
                      }}
                      style={{ 
                        textAlign: 'left', width: '100%', padding: '0.75rem 1.1rem', 
                        border: '1px solid #E2E8F0', borderRadius: '10px', 
                        background: 'rgba(255, 255, 255, 0.75)', 
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        color: '#1E293B', fontSize: '0.85rem', fontWeight: 600, 
                        cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                    >
                      <span>Add a summary statement</span>
                      <span style={{ color: '#18181B', fontWeight: 600 }}>Fix now →</span>
                    </button>
                  )}
                  {auditReport.benchmarkScore >= 80 && (
                    <div style={{ textAlign: 'center', padding: '1rem', color: '#18181B', fontWeight: 600, fontSize: '0.9rem' }}>
                      🎉 Your resume is optimized and ready for top applications!
                    </div>
                  )}
                </div>
              </div>

            </div>
          )
        )}
      </motion.div>
    );
  };

  const renderEditForm = () => (
    <AnimatePresence mode="wait">
      <motion.div 
        key={activeStep.id} 
        initial={{ opacity: 1 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 1 }}
        transition={{ duration: 0 }}
      >
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, color: '#111827' }}>{activeStep.title}</h1>
            <p style={{ color: '#1F2937', margin: '6px 0 0 0', fontSize: '1.15rem', fontWeight: 500 }}>{activeStep.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={handleStartAIAudit}
            style={{
              padding: '0.45rem 1rem',
              background: '#059669',
              border: 'none',
              borderRadius: '24px',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'none'
            }}
          >
            <Sparkles size={12} /> Analyze Resume
          </button>
        </div>
        
        <div style={{ paddingBottom: '2rem' }}>
          
          {/* ── Personal ── */}
          {activeStep.id === 'personal' && (
            <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <TornEdge />
              <TornEdge isBottom />
              <TornEdge />
              <TornEdge isBottom />
              <div className="input-row" style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={labelStyle}>Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <input style={{ ...inputStyle, width: '100%', borderBottom: '2px solid #18181B' }} value={resumeData.personalInfo.fullName || ''} onChange={(e) => updatePersonalInfo('fullName', e.target.value)} />
                    {isValidName(resumeData.personalInfo.fullName) && (
                      <Check size={16} color="#10B981" style={{ position: 'absolute', right: '12px', top: '14px' }} />
                    )}
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }} ref={jobRoleDropdownRef}>
                  <label style={labelStyle}>Job Title</label>
                  <input 
                    style={inputStyle} 
                    value={resumeData.personalInfo.jobTitle || ''} 
                    placeholder="e.g. Frontend Engineer"
                    onFocus={() => setShowJobRoleDropdown(true)}
                    onChange={(e) => {
                      const newRole = e.target.value;
                      updatePersonalInfo('jobTitle', newRole);
                      const exactMatch = WORLDWIDE_JOB_ROLES.find(r => r.toLowerCase() === newRole.toLowerCase());
                      if (exactMatch) {
                        const suggested = getTechsForRole(exactMatch);
                        suggested.forEach(tech => handleAddRoleSkill(tech));
                      }
                    }} 
                  />
                  
                  {/* Custom Dropdown */}
                  {showJobRoleDropdown && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      zIndex: 100,
                      background: '#FFFFFF',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: '10px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      maxHeight: '220px',
                      overflowY: 'auto',
                      marginTop: '0.25rem',
                      padding: '4px'
                    }}>
                      {WORLDWIDE_JOB_ROLES.filter(role => 
                        !resumeData.personalInfo.jobTitle || 
                        role.toLowerCase().includes(resumeData.personalInfo.jobTitle.toLowerCase())
                      ).map(role => (
                        <div
                          key={role}
                          onClick={() => {
                            updatePersonalInfo('jobTitle', role);
                            setShowJobRoleDropdown(false);
                            const suggested = getTechsForRole(role);
                            suggested.forEach(tech => handleAddRoleSkill(tech));
                          }}
                          style={{
                            padding: '0.65rem 1rem',
                            fontSize: '1rem',
                            color: '#1E293B',
                            cursor: 'pointer',
                            borderRadius: '6px',
                            fontWeight: 500,
                            transition: 'all 0.15s ease'
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(5, 150, 105, 0.08)'; e.currentTarget.style.color = '#059669'; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1E293B'; }}
                        >
                          {role}
                        </div>
                      ))}
                      {WORLDWIDE_JOB_ROLES.filter(role => 
                        !resumeData.personalInfo.jobTitle || 
                        role.toLowerCase().includes(resumeData.personalInfo.jobTitle.toLowerCase())
                      ).length === 0 && (
                        <div style={{ padding: '0.65rem 1rem', fontSize: '0.95rem', color: '#64748B', fontStyle: 'italic' }}>
                          No matching roles found
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Skill Recommendations based on Job Title */}
                  {(() => {
                    const suggestedSkills = getTechsForRole(resumeData.personalInfo.jobTitle);
                    if (suggestedSkills.length === 0) return null;
                    return (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center', marginTop: '0.25rem' }}>
                        <span style={{ fontSize: '0.85rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                          <Sparkles size={12} style={{ color: '#059669' }} /> Recommend Skills:
                        </span>
                        {suggestedSkills.map(tech => {
                          const isAlreadyAdded = Object.values(resumeData.skills || {}).some(arr => 
                            (arr || []).some(s => (typeof s === 'object' ? s.name : s).toLowerCase() === tech.toLowerCase())
                          );
                          if (isAlreadyAdded) return null;
                          return (
                            <button
                              key={tech}
                              type="button"
                              onClick={() => handleAddRoleSkill(tech)}
                              style={{
                                background: 'rgba(5, 150, 105, 0.05)',
                                border: '1.5px solid rgba(5, 150, 105, 0.2)',
                                borderRadius: '12px',
                                padding: '2px 8px',
                                fontSize: '0.8rem',
                                color: '#059669',
                                cursor: 'pointer',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                                transition: 'all 0.15s ease'
                              }}
                              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(5, 150, 105, 0.12)'; e.currentTarget.style.borderColor = '#059669'; }}
                              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(5, 150, 105, 0.05)'; e.currentTarget.style.borderColor = 'rgba(5, 150, 105, 0.2)'; }}
                            >
                              + {tech}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              </div>
              <div className="input-row" style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={labelStyle}>Email</label>
                  <div style={{ position: 'relative' }}>
                    <input style={{ ...inputStyle, width: '100%' }} value={resumeData.personalInfo.email || ''} onChange={(e) => updatePersonalInfo('email', e.target.value)} />
                    {isValidEmail(resumeData.personalInfo.email) && (
                      <Check size={16} color="#10B981" style={{ position: 'absolute', right: '12px', top: '14px' }} />
                    )}
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={labelStyle}>Phone</label>
                  <div style={{ position: 'relative' }}>
                    <input style={{ ...inputStyle, width: '100%' }} value={resumeData.personalInfo.phone || ''} onChange={(e) => updatePersonalInfo('phone', e.target.value)} />
                    {isValidPhone(resumeData.personalInfo.phone) && (
                      <Check size={16} color="#10B981" style={{ position: 'absolute', right: '12px', top: '14px' }} />
                    )}
                  </div>
                </div>
              </div>
              <div className="input-row" style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={labelStyle}>Location</label>
                  <input style={inputStyle} value={resumeData.personalInfo.location || ''} placeholder="e.g. San Francisco, CA" onChange={(e) => updatePersonalInfo('location', e.target.value)} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={labelStyle}>LinkedIn</label>
                  <input style={inputStyle} value={resumeData.personalInfo.linkedin || ''} placeholder="linkedin.com/in/..." onChange={(e) => updatePersonalInfo('linkedin', e.target.value)} />
                </div>
              </div>
              <div className="input-row" style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={labelStyle}>GitHub</label>
                  <input style={inputStyle} value={resumeData.personalInfo.github || ''} placeholder="github.com/..." onChange={(e) => updatePersonalInfo('github', e.target.value)} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={labelStyle}>Website / Portfolio</label>
                  <input style={inputStyle} value={resumeData.personalInfo.website || ''} placeholder="e.g. portfolio.com" onChange={(e) => updatePersonalInfo('website', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* ── Summary ── */}
          {activeStep.id === 'summary' && (
            <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Experience Level Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={labelStyle}>Experience Level</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setProfileType('student')}
                    style={{
                      flex: 1,
                      padding: '0.75rem 1.25rem',
                      borderRadius: '8px',
                      border: '1.5px solid',
                      borderColor: resumeData.profileType === 'student' ? '#059669' : '#CBD5E1',
                      background: resumeData.profileType === 'student' ? 'rgba(5, 150, 105, 0.08)' : '#FFFFFF',
                      color: resumeData.profileType === 'student' ? '#059669' : '#475569',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '1rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Fresher / Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfileType('professional')}
                    style={{
                      flex: 1,
                      padding: '0.75rem 1.25rem',
                      borderRadius: '8px',
                      border: '1.5px solid',
                      borderColor: resumeData.profileType === 'professional' ? '#059669' : '#CBD5E1',
                      background: resumeData.profileType === 'professional' ? 'rgba(5, 150, 105, 0.08)' : '#FFFFFF',
                      color: resumeData.profileType === 'professional' ? '#059669' : '#475569',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '1rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Experienced Professional
                  </button>
                </div>
              </div>

              {/* Rough Notes for AI */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={labelStyle}>Rough notes or career goals (helps AI generate)</label>
                <input
                  style={inputStyle}
                  value={roughSummaryNotes}
                  onChange={(e) => setRoughSummaryNotes(e.target.value)}
                  placeholder="e.g. Target junior full-stack role, focus on React and Node.js..."
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={labelStyle}>Professional Summary</label>
                  <button 
                    onClick={handlePrewrittenPhrases}
                    style={{ background: 'transparent', border: 'none', color: '#18181B', fontWeight: 600, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                  >
                    <Plus size={14} /> Pre-written phrases
                  </button>
                </div>
                <textarea 
                  style={{ minHeight: '200px', borderRadius: '4px', padding: '1rem', border: 'none', background: '#F1F5F9', outline: 'none', fontSize: '1.15rem', color: '#111827', resize: 'vertical' }} 
                  placeholder="e.g. Curious science teacher with 8+ years of experience..."
                  value={resumeData.personalInfo?.summary || ''} 
                  onChange={(e) => updatePersonalInfo('summary', e.target.value)} 
                />
              </div>
              <button 
                onClick={handleAIRewrite}
                disabled={isGeneratingAI}
                style={{ 
                  background: 'rgba(5, 150, 105, 0.08)',
                  color: '#059669', 
                  border: '1.5px solid rgba(5, 150, 105, 0.3)', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '8px', 
                  fontWeight: 800, 
                  fontSize: '1.1rem', // big text
                  fontFamily: 'inherit',
                  cursor: isGeneratingAI ? 'not-allowed' : 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem', 
                  marginTop: '0.5rem',
                  alignSelf: 'flex-start', // compact width
                  opacity: isGeneratingAI ? 0.7 : 1,
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => { if (!isGeneratingAI) { e.currentTarget.style.background = 'rgba(5, 150, 105, 0.15)'; e.currentTarget.style.borderColor = '#059669'; } }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(5, 150, 105, 0.08)'; e.currentTarget.style.borderColor = 'rgba(5, 150, 105, 0.3)'; }}
              >
                {isGeneratingAI ? '🪄 Generating...' : '🪄 Rewrite with AI'}
              </button>
            </div>
          )}

          {/* ── Experience ── */}
          {activeStep.id === 'experience' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {!resumeData.experience || resumeData.experience.length === 0 ? (
                <div className="torn-paper">
          <TornEdge />
          <TornEdge isBottom />
                  <p style={{ color: '#18181B', fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>
                    No work experience added yet. Tell recruiters about your professional history!
                  </p>
                  <JellyButton onClick={handleAddExperience} style={{ padding: '0.55rem 1rem', alignSelf: 'center' }}><Plus size={16} /> Add Employment</JellyButton>
                </div>
              ) : (
                <>
                  {resumeData.experience.map((exp, index) => {
                    const isExpanded = index === activeExpIndex;
                    if (!isExpanded) {
                      return (
                        <div 
                          key={exp.id || index} 
                          onClick={() => setActiveExpIndex(index)} 
                          className="premium-card" data-tag="exp_collapsed" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 1.5rem', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.9)' }}
                        >
                          <TornEdge />
                          <TornEdge isBottom />
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <strong style={{ fontSize: '1.25rem', color: '#111827' }}>
                              {exp.title || exp.jobTitle || 'Untitled Role'}
                            </strong>
                            <span style={{ fontSize: '1.05rem', color: '#1F2937' }}>
                              {exp.company || 'Untitled Employer'} • {exp.startDate || 'MM/YYYY'} - {exp.endDate || 'Present'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button 
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setActiveExpIndex(index); }}
                              style={{ padding: '4px 10px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid #E2E8F0', borderRadius: '4px', background: '#FFFFFF', color: '#18181B', cursor: 'pointer' }}
                            >
                              Edit
                            </button>
                            <button 
                              type="button"
                              onClick={(e) => { e.stopPropagation(); removeExperience(index); }}
                              className="premium-btn-delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div 
                        key={exp.id || index} 
                        className="premium-card" data-tag="exp" style={{ position: 'relative' }}
                      >
                        <TornEdge />
                        <TornEdge isBottom />
                        <button onClick={() => removeExperience(index)} className="premium-btn-delete" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                          <Trash2 size={16} />
                        </button>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', marginTop: '0.5rem' }}>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={labelStyle}>Job title</label>
                            <input style={inputStyle} value={exp.title || exp.jobTitle || ''} onChange={(e) => { updateExperience(index, 'title', e.target.value); updateExperience(index, 'jobTitle', e.target.value); }} />
                          </div>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={labelStyle}>Employer</label>
                            <input style={inputStyle} value={exp.company || ''} onChange={(e) => updateExperience(index, 'company', e.target.value)} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={labelStyle}>Start & End Date</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <input style={{ ...inputStyle, flex: 1 }} placeholder="MM / YYYY" value={exp.startDate || ''} onChange={(e) => updateExperience(index, 'startDate', e.target.value)} />
                              <input style={{ ...inputStyle, flex: 1 }} placeholder="MM / YYYY" value={exp.endDate || ''} onChange={(e) => updateExperience(index, 'endDate', e.target.value)} />
                            </div>
                          </div>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={labelStyle}>City, State</label>
                            <input style={inputStyle} value={exp.location || ''} onChange={(e) => updateExperience(index, 'location', e.target.value)} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <label style={labelStyle}>Description</label>
                          <textarea style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} placeholder="e.g. Created and implemented lesson plans..." value={exp.description || ''} onChange={(e) => updateExperience(index, 'description', e.target.value)} />
                        </div>
                      </div>
                    );
                  })}
                  <JellyButton onClick={handleAddExperience} style={{ padding: '0.55rem 1rem' }}><Plus size={16} /> Add Employment</JellyButton>
                </>
              )}
            </div>
          )}

          {/* ── Education ── */}
          {activeStep.id === 'education' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {!resumeData.education || resumeData.education.length === 0 ? (
                <div className="torn-paper">
          <TornEdge />
          <TornEdge isBottom />
                  <p style={{ color: '#18181B', fontSize: '0.9rem', margin: 0, fontWeight: 700 }}>
                    No education history added yet. Show where you studied!
                  </p>
                  <JellyButton onClick={handleAddEducation} style={{ padding: '0.55rem 1rem', alignSelf: 'center' }}><Plus size={16} /> Add Education</JellyButton>
                </div>
              ) : (
                <>
                  {resumeData.education.map((edu, index) => {
                    const isExpanded = index === activeEduIndex;
                    if (!isExpanded) {
                      return (
                        <div 
                          key={edu.id || index} 
                          onClick={() => setActiveEduIndex(index)} 
                          className="premium-card" data-tag="exp_collapsed" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 1.5rem', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.9)' }}
                        >
                          <TornEdge />
                          <TornEdge isBottom />
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <strong style={{ fontSize: '1.25rem', color: '#111827' }}>
                              {edu.degree || 'Untitled Degree'}
                            </strong>
                            <span style={{ fontSize: '1.05rem', color: '#1F2937' }}>
                              {edu.school || edu.institution || 'Untitled School'} • {edu.startDate || 'MM/YYYY'} - {edu.endDate || 'MM/YYYY'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button 
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setActiveEduIndex(index); }}
                              style={{ padding: '4px 10px', fontSize: '0.8rem', fontWeight: 700, border: '1.5px solid #18181B', borderRadius: '4px', background: '#FFFFFF', cursor: 'pointer' }}
                            >
                              Edit
                            </button>
                            <button 
                              type="button"
                              onClick={(e) => { e.stopPropagation(); removeEducation(index); }}
                              className="premium-btn-delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div 
                        key={edu.id || index} 
                        className="premium-card" data-tag="education" style={{ position: 'relative' }}
                      >
                        <TornEdge />
                        <TornEdge isBottom />
                        <button onClick={() => removeEducation(index)} className="premium-btn-delete" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                          <Trash2 size={16} />
                        </button>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', marginTop: '0.5rem' }}>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={labelStyle}>School / Institution</label>
                            <input style={inputStyle} value={edu.school || edu.institution || ''} onChange={(e) => { updateEducation(index, 'school', e.target.value); updateEducation(index, 'institution', e.target.value); }} />
                          </div>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={labelStyle}>Degree</label>
                            <input style={inputStyle} value={edu.degree || ''} onChange={(e) => updateEducation(index, 'degree', e.target.value)} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={labelStyle}>Start & End Date</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <input style={{ ...inputStyle, flex: 1 }} placeholder="MM / YYYY" value={edu.startDate || ''} onChange={(e) => updateEducation(index, 'startDate', e.target.value)} />
                              <input style={{ ...inputStyle, flex: 1 }} placeholder="MM / YYYY" value={edu.endDate || ''} onChange={(e) => updateEducation(index, 'endDate', e.target.value)} />
                            </div>
                          </div>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={labelStyle}>City</label>
                            <input style={inputStyle} value={edu.location || ''} onChange={(e) => updateEducation(index, 'location', e.target.value)} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <JellyButton onClick={handleAddEducation} style={{ padding: '0.55rem 1rem' }}><Plus size={16} /> Add Education</JellyButton>
                </>
              )}
            </div>
          )}

          {/* ── Projects ── */}
          {activeStep.id === 'projects' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {!resumeData.projects || resumeData.projects.length === 0 ? (
                <div className="torn-paper">
          <TornEdge />
          <TornEdge isBottom />
                  <p style={{ color: '#18181B', fontSize: '0.9rem', margin: 0, fontWeight: 700 }}>
                    No projects added yet. Showcase your custom works to stand out!
                  </p>
                  <JellyButton onClick={() => { addItem('projects', { name: '', duration: '', description: '' }); setActiveProjIndex(resumeData.projects?.length || 0); }} style={{ padding: '0.55rem 1rem', alignSelf: 'center' }}><Plus size={16} /> Add Project</JellyButton>
                </div>
              ) : (
                <>
                  {resumeData.projects.map((proj, index) => {
                    const isExpanded = index === activeProjIndex;
                    const suggestedTechs = getSuggestedTechs(proj.name);
                    
                    if (!isExpanded) {
                      return (
                        <div 
                          key={proj.id || index} 
                          onClick={() => setActiveProjIndex(index)} 
                          className="premium-card" data-tag="exp_collapsed" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 1.5rem', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.9)' }}
                        >
                          <TornEdge />
                          <TornEdge isBottom />
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <strong style={{ fontSize: '1.25rem', color: '#111827' }}>
                              {proj.name || 'Untitled Project'}
                            </strong>
                            <span style={{ fontSize: '1.05rem', color: '#1F2937' }}>
                              {proj.duration || 'Duration'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button 
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setActiveProjIndex(index); }}
                              style={{ padding: '4px 10px', fontSize: '0.8rem', fontWeight: 700, border: '1.5px solid #18181B', borderRadius: '4px', background: '#FFFFFF', cursor: 'pointer' }}
                            >
                              Edit
                            </button>
                            <button 
                              type="button"
                              onClick={(e) => { e.stopPropagation(); removeItem('projects', proj.id); }}
                              className="premium-btn-delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div 
                        key={proj.id || index} 
                        className="premium-card" data-tag="project" style={{ position: 'relative' }}
                      >
                        <TornEdge />
                        <TornEdge isBottom />
                        <button onClick={() => removeItem('projects', proj.id)} className="premium-btn-delete" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                          <Trash2 size={16} />
                        </button>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', marginTop: '0.5rem' }}>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={labelStyle}>Project Name</label>
                            <input style={inputStyle} value={proj.name || ''} onChange={(e) => updateItem('projects', proj.id, { name: e.target.value })} />
                          </div>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={labelStyle}>Duration</label>
                            <input style={inputStyle} value={proj.duration || ''} onChange={(e) => updateItem('projects', proj.id, { duration: e.target.value })} />
                          </div>
                        </div>

                        {/* Suggested Technologies Pills */}
                        {suggestedTechs.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center', marginBottom: '1rem', marginTop: '-0.25rem' }}>
                            <span style={{ fontSize: '0.9rem', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                              <Sparkles size={12} style={{ color: '#059669' }} /> Suggested:
                            </span>
                            {suggestedTechs.map(tech => {
                              const isAdded = (proj.technologies || '').split(',').map(t => t.trim()).includes(tech);
                              if (isAdded) return null;
                              return (
                                <button
                                  key={tech}
                                  type="button"
                                  onClick={() => handleAddSuggestedTech(proj.id, proj.technologies, tech)}
                                  style={{
                                    background: 'rgba(5, 150, 105, 0.05)',
                                    border: '1.5px solid rgba(5, 150, 105, 0.2)',
                                    borderRadius: '16px',
                                    padding: '3px 10px',
                                    fontSize: '0.85rem',
                                    color: '#059669',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                    transition: 'all 0.15s ease'
                                  }}
                                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(5, 150, 105, 0.12)'; e.currentTarget.style.borderColor = '#059669'; }}
                                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(5, 150, 105, 0.05)'; e.currentTarget.style.borderColor = 'rgba(5, 150, 105, 0.2)'; }}
                                >
                                  + {tech}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                          <label style={labelStyle}>Tools & Technologies</label>
                          <CreatableSelect
                            isMulti
                            placeholder="Select or type tools..."
                            options={ALL_TECH_OPTIONS}
                            value={(proj.technologies || '').split(',').map(t => t.trim()).filter(Boolean).map(t => ({ label: t, value: t }))}
                            onChange={(newValues) => {
                              const techString = newValues ? newValues.map(v => v.value).join(', ') : '';
                              updateItem('projects', proj.id, { technologies: techString });
                              if (newValues) {
                                newValues.forEach(v => {
                                  handleAddRoleSkill(v.value);
                                });
                              }
                            }}
                            styles={{
                              control: (base) => ({
                                ...base,
                                padding: '2px',
                                borderRadius: '4px',
                                border: '1px solid #CBD5E1',
                                boxShadow: 'none',
                                '&:hover': { border: '1px solid #94A3B8' },
                                fontSize: '1rem'
                              })
                            }}
                          />
                        </div>

                        {/* Project Details input for AI context */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                          <label style={labelStyle}>Project Details / Key Features (helps AI generate points)</label>
                          <textarea
                            style={{ ...inputStyle, minHeight: '70px', resize: 'vertical' }}
                            placeholder="e.g. Developed a chatbot using OpenAI API, optimized search with vector database Pinecone, handled 1000+ users..."
                            value={proj.projectInfo || ''}
                            onChange={(e) => updateItem('projects', proj.id, { projectInfo: e.target.value })}
                          />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={labelStyle}>Description / Bullet Points</label>
                            <button 
                              onClick={async () => {
                                if (!proj.name || !proj.technologies) {
                                  alert("Please enter a Project Name and Tools & Technologies first.");
                                  return;
                                }
                                setIsGeneratingAI(true);
                                try {
                                  const desc = await generateProjectDescriptionAI(proj.name, proj.technologies, proj.projectInfo);
                                  updateItem('projects', proj.id, { description: desc });
                                } catch (err) {
                                  console.error("Project AI Rewrite failed:", err);
                                  alert("Failed to generate description.");
                                } finally {
                                  setIsGeneratingAI(false);
                                }
                              }}
                              disabled={isGeneratingAI}
                              style={{ 
                                background: 'transparent', border: 'none', color: '#059669', 
                                fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px', cursor: isGeneratingAI ? 'wait' : 'pointer' 
                              }}
                            >
                              <Sparkles size={14} /> Generate Bullet Points with AI
                            </button>
                          </div>
                          <textarea style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} value={proj.description || ''} onChange={(e) => updateItem('projects', proj.id, { description: e.target.value })} />
                        </div>
                      </div>
                    );
                  })}
                  <JellyButton onClick={() => { addItem('projects', { name: '', duration: '', description: '' }); setActiveProjIndex(resumeData.projects?.length || 0); }} style={{ padding: '0.55rem 1rem' }}><Plus size={16} /> Add Project</JellyButton>
                </>
              )}
            </div>
          )}

          {/* ── Skills ── */}
          {activeStep.id === 'skills' && (
            <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <TornEdge />
              <TornEdge isBottom />
              {skillCategories.map(({ key, label }) => {
                const categorySkills = resumeData.skills?.[key] || [];
                const hasSkills = categorySkills.length > 0;
                const inputValue = newSkillByCategory[key] || '';

                // Only show categories that have skills OR are the main ones
                // Always show: programming, cloud, frameworks, databases, tools
                // Only show soft/other if they have skills
                const alwaysShow = ['programming', 'cloud', 'frameworks', 'databases', 'tools'];
                if (!alwaysShow.includes(key) && !hasSkills) return null;

                return (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {/* Category heading */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#1E293B' }}>
                        {label}
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 500 }}>
                        ({categorySkills.length})
                      </span>
                    </div>

                    <CreatableSelect
                      isMulti
                      placeholder={`Select or type ${label.toLowerCase()} skills...`}
                      options={SKILL_OPTIONS_BY_CATEGORY[key] || []}
                      value={categorySkills.map(s => {
                        const name = typeof s === 'object' ? s.name : s;
                        return { label: name, value: name };
                      })}
                      onChange={(newValues) => {
                        const updatedSkills = { ...resumeData.skills };
                        const prevSkills = resumeData.skills?.[key] || [];
                        const newSkillsValues = newValues ? newValues.map(v => v.value) : [];
                        
                        const addedSkillName = newSkillsValues.find(val => 
                          !prevSkills.some(s => (typeof s === 'object' ? s.name : s) === val)
                        );
                        
                        if (addedSkillName) {
                          let targetCat = key;
                          const techLower = addedSkillName.toLowerCase();
                          for (const [catKey, options] of Object.entries(SKILL_OPTIONS_BY_CATEGORY)) {
                            if (options.some(opt => opt.value.toLowerCase() === techLower)) {
                              targetCat = catKey;
                              break;
                            }
                          }
                          
                          if (targetCat !== key) {
                            const targetCatList = resumeData.skills?.[targetCat] || [];
                            if (!targetCatList.some(s => (typeof s === 'object' ? s.name : s).toLowerCase() === techLower)) {
                              updatedSkills[targetCat] = [...targetCatList, { name: addedSkillName, level: 80 }];
                            }
                            updatedSkills[key] = prevSkills.filter(s => {
                              const name = typeof s === 'object' ? s.name : s;
                              return newSkillsValues.includes(name) && name !== addedSkillName;
                            });
                          } else {
                            updatedSkills[key] = newValues.map(v => {
                              const existing = prevSkills.find(s => (typeof s === 'object' ? s.name : s) === v.value);
                              return existing || { name: v.value, level: 80 };
                            });
                          }
                        } else {
                          updatedSkills[key] = newValues ? newValues.map(v => {
                            const existing = prevSkills.find(s => (typeof s === 'object' ? s.name : s) === v.value);
                            return existing || { name: v.value, level: 80 };
                          }) : [];
                        }
                        
                        updateSection('skills', updatedSkills);
                      }}
                      styles={{
                        control: (base) => ({
                          ...base,
                          padding: '4px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          boxShadow: 'none',
                          '&:hover': { border: '1px solid #94A3B8' },
                          fontSize: '1.05rem',
                          background: '#FFFFFF'
                        }),
                        multiValue: (base) => ({
                          ...base,
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '16px',
                          padding: '2px 6px'
                        }),
                        multiValueLabel: (base) => ({
                          ...base,
                          color: '#334155',
                          fontWeight: 600
                        }),
                        multiValueRemove: (base) => ({
                          ...base,
                          color: '#64748B',
                          ':hover': {
                            backgroundColor: '#FEF2F2',
                            color: '#EF4444',
                            borderRadius: '50%'
                          }
                        })
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Certifications ── */}
          {activeStep.id === 'certifications' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {resumeData.certifications?.map((cert) => (
                <div key={cert.id} className="premium-card" data-tag="active_block" style={{ position: 'relative' }}>
                  <TornEdge />
                  <TornEdge isBottom />
                  <button onClick={() => removeItem('certifications', cert.id)} className="premium-btn-delete" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <Trash2 size={16} />
                  </button>
                  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={labelStyle}>Certification Name</label>
                      <input style={inputStyle} value={cert.name} onChange={(e) => updateItem('certifications', cert.id, { name: e.target.value })} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={labelStyle}>Date</label>
                      <input style={inputStyle} value={cert.date} onChange={(e) => updateItem('certifications', cert.id, { date: e.target.value })} />
                    </div>
                  </div>
                </div>
              ))}
              <JellyButton onClick={() => addItem('certifications', { name: '', date: '' })} style={{ padding: '0.55rem 1rem' }}><Plus size={16} /> Add Certification</JellyButton>
            </div>
          )}

          {/* ── Languages ── */}
          {activeStep.id === 'languages' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {resumeData.languages?.map((lang) => (
                <div key={lang.id} className="premium-card" data-tag="active_block" style={{ position: 'relative' }}>
                  <TornEdge />
                  <TornEdge isBottom />
                  <button onClick={() => removeItem('languages', lang.id)} className="premium-btn-delete" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <Trash2 size={16} />
                  </button>
                  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={labelStyle}>Language</label>
                      <input style={inputStyle} value={lang.name} placeholder="e.g. English" onChange={(e) => updateItem('languages', lang.id, { name: e.target.value })} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={labelStyle}>Proficiency</label>
                      <select style={inputStyle} value={lang.proficiency || 'Native'} onChange={(e) => updateItem('languages', lang.id, { proficiency: e.target.value })}>
                        <option value="Native">Native</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Proficient">Proficient</option>
                        <option value="Conversational">Conversational</option>
                        <option value="Basic">Basic</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: '#334155', fontWeight: 500 }}>Confidence Level</span>
                      <span style={{ fontSize: '0.75rem', color: '#18181B', fontWeight: 600 }}>{lang.level || 80}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={lang.level || 80} 
                      onChange={(e) => {
                        const levelVal = parseInt(e.target.value);
                        updateItem('languages', lang.id, { 
                          level: levelVal,
                          proficiency: levelVal >= 90 ? 'Native' : levelVal >= 75 ? 'Fluent' : levelVal >= 50 ? 'Conversational' : 'Basic'
                        });
                      }} 
                      style={{ width: '100%', height: '5px', background: '#E2E8F0', borderRadius: '3px', outline: 'none', accentColor: '#1E293B', cursor: 'pointer' }}
                    />
                  </div>
                </div>
              ))}
              <JellyButton onClick={() => addItem('languages', { name: '', proficiency: 'Native', level: 100 })} style={{ padding: '0.55rem 1rem' }}><Plus size={16} /> Add Language</JellyButton>
            </div>
          )}


        </div>
      </motion.div>
    </AnimatePresence>
  );

  // ── Render the customize panel ──
  const renderCustomizePanel = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* Templates Grid — properly fitted mini-previews */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.25rem' }}>Resume Template</h2>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '1rem' }}>Select a template to instantly apply it to your preview.</p>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {['All', 'ATS', 'Professional', 'Modern', 'Creative', 'Simple'].map(tag => (
              <button
                key={tag}
                onClick={() => setCustomizeFilterTag(tag)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '20px',
                  border: customizeFilterTag === tag ? '2px solid #059669' : '1.5px solid #CBD5E1',
                  background: customizeFilterTag === tag ? '#059669' : '#FFFFFF',
                  color: customizeFilterTag === tag ? '#FFFFFF' : '#475569',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >{tag}</button>
            ))}
          </div>
          {/* Filtered template grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
            {templates
              .filter(tpl => customizeFilterTag === 'All' || tpl.tags.includes(customizeFilterTag))
              .map((tpl) => {
              // Each card column is roughly (editorWidth/2 - gap). 
              // We define a fixed card preview height to keep all cards uniform.
              const CARD_PREVIEW_WIDTH = 180; // px — the rendered card content width
              const CARD_PREVIEW_HEIGHT = 255; // px — matches A4 ratio: 180 * (1131/800) ≈ 255
              const scaleX = CARD_PREVIEW_WIDTH / 800;

              return (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  style={{
                    border: selectedTemplate === tpl.id ? '3px solid #059669' : '1.5px solid #CBD5E1',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    background: '#FFFFFF',
                    transition: 'all 0.2s ease',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: selectedTemplate === tpl.id
                      ? '0 0 0 3px rgba(5, 150, 105, 0.15), 0 8px 20px -8px rgba(0,0,0,0.15)'
                      : '0 4px 12px -4px rgba(15, 23, 42, 0.06)',
                  }}
                >
                  {/* Fixed-height preview container — clips the scaled template */}
                  <div style={{
                    width: '100%',
                    height: `${CARD_PREVIEW_HEIGHT}px`,
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#F8FAFC',
                  }}>
                    <div style={{
                      width: '800px',
                      height: '1131px',
                      transform: `scale(${scaleX})`,
                      transformOrigin: 'top left',
                      pointerEvents: 'none',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}>
                      <TemplateRenderer templateId={tpl.id} resumeData={resumeData} />
                    </div>
                  </div>

                  {/* Label bar */}
                  <div style={{
                    padding: '0.55rem 0.75rem',
                    background: selectedTemplate === tpl.id ? '#059669' : '#F8FAFC',
                    borderTop: `1px solid ${selectedTemplate === tpl.id ? '#059669' : '#E2E8F0'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <span style={{ fontWeight: 700, color: selectedTemplate === tpl.id ? '#FFFFFF' : '#1E293B', fontSize: '0.8rem' }}>
                      {tpl.name}
                    </span>
                    {selectedTemplate === tpl.id && <Check size={14} color="#FFFFFF" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0' }} />
        
        {/* Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Colors */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1E293B' }}>Primary Color</h3>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {['#059669', '#0F172A', '#2563EB', '#DC2626', '#7C3AED', '#D97706', '#0891B2', '#BE185D'].map(color => (
                <div 
                  key={color}
                  onClick={() => updateSettings('primaryColor', color)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', background: color, cursor: 'pointer', border: resumeData.settings?.primaryColor === color ? '3px solid #FFF' : 'none', outline: resumeData.settings?.primaryColor === color ? `2px solid ${color}` : 'none' }}
                />
              ))}
            </div>
          </div>

          {/* Font */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1E293B' }}>Typography</h3>
            <select 
              value={resumeData.settings?.fontFamily || 'Inter'}
              onChange={(e) => updateSettings('fontFamily', e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#FFFFFF', outline: 'none', fontSize: '1rem', color: '#1E293B' }}
            >
              <option value="Inter">Inter (Clean & Modern)</option>
              <option value="Geist">Geist (Minimalist)</option>
              <option value="SF Pro Display">SF Pro (Apple Style)</option>
              <option value="Merriweather">Merriweather (Classic)</option>
            </select>
          </div>

          {/* Margins */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1E293B' }}>Margins</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['Compact', 'Standard', 'Spacious'].map(margin => (
                <button
                  key={margin}
                  onClick={() => updateSettings('margins', margin)}
                  style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: resumeData.settings?.margins === margin ? '2px solid #059669' : '1px solid #CBD5E1', background: resumeData.settings?.margins === margin ? '#ECFDF5' : '#FFFFFF', color: resumeData.settings?.margins === margin ? '#059669' : '#64748B', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  {margin}
                </button>
              ))}
            </div>
          </div>

          {/* Show/Hide Sections */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1E293B' }}>Include Sections</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { key: 'showSummary', label: 'Professional Summary' },
                { key: 'showExperience', label: 'Professional Experience' },
                { key: 'showEducation', label: 'Education' },
                { key: 'showProjects', label: 'Projects' },
                { key: 'showSkills', label: 'Skills' },
                { key: 'showCertifications', label: 'Certifications' },
                { key: 'showLanguages', label: 'Languages' },
              ].map(sec => {
                const isChecked = resumeData.settings?.[sec.key] !== false;
                return (
                  <label key={sec.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.95rem', color: '#334155' }}>
                    <input 
                      type="checkbox" 
                      checked={isChecked} 
                      onChange={(e) => updateSettings(sec.key, e.target.checked)}
                      style={{ accentColor: '#059669', width: '16px', height: '16px' }}
                    />
                    {sec.label}
                  </label>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F8FAFC', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        /* Custom Scrollbar for editor */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94A3B8;
        }

        /* Focus & Hover states for inputs */
        input:focus, textarea:focus, select:focus {
          border-color: #059669 !important;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.12) !important;
          background: #FFFFFF !important;
        }
        input:hover:not(:focus), textarea:hover:not(:focus), select:hover:not(:focus) {
          border-color: #CBD5E1 !important;
        }
        
        /* Premium Card style - soft floating drop shadows */
        .premium-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 1.75rem 1.5rem 1.5rem 1.5rem;
          position: relative;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02);
          transition: all 0.2s ease;
          overflow: visible;
        }
        .premium-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px -10px rgba(0,0,0,0.06), 0 2px 5px rgba(0,0,0,0.03);
        }

        /* Add Item Buttons */
        .premium-btn-add {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #475569;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 0.55rem 1rem;
          font-weight: 600;
          font-size: 0.8rem;
          cursor: pointer;
          align-self: flex-start;
          transition: all 0.15s ease;
        }
        .premium-btn-add:hover {
          background: #F8FAFC;
          border-color: #CBD5E1;
          color: #1E293B;
        }

        .premium-btn-delete {
          color: #94A3B8;
          background: transparent;
          border: none;
          border-radius: 6px;
          padding: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .premium-btn-delete:hover {
          background: #FEF2F2;
          color: #EF4444;
        }

        /* Pill chips */
        .premium-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(4px);
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 0.35rem 0.85rem;
          font-size: 0.8rem;
          color: #334155;
          font-weight: 600;
          transition: all 0.15s ease;
        }
        .premium-pill:hover {
          border-color: #FCA5A5;
          background: #FEF2F2;
          color: #EF4444;
        }

        /* Torn Paper Block styling */
        .torn-paper {
          background: #FFFFFF;
          padding: 3rem 2.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
          position: relative;
          border-left: 1.5px solid #CBD5E1;
          border-right: 1.5px solid #CBD5E1;
          border-top: none;
          border-bottom: none;
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08);
          border-radius: 0;
        }
      `}</style>
      
      {/* Top Header */}
      <header style={{ height: '64px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '24px', padding: '4px' }}>
          <button 
            style={{ padding: '6px 20px', borderRadius: '20px', border: 'none', background: leftPaneMode === 'edit' ? '#059669' : 'transparent', color: leftPaneMode === 'edit' ? '#FFFFFF' : '#64748B', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', color: leftPaneMode === 'edit' ? '#FFFFFF' : '#64748B' }} 
            onClick={() => setLeftPaneMode('edit')}
          >
            Edit
          </button>
          <button 
            style={{ padding: '6px 20px', borderRadius: '20px', border: 'none', background: leftPaneMode === 'customize' ? '#059669' : 'transparent', color: leftPaneMode === 'customize' ? '#FFFFFF' : '#64748B', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', color: leftPaneMode === 'customize' ? '#FFFFFF' : '#64748B' }} 
            onClick={() => setLeftPaneMode('customize')}
          >
            Customize
          </button>
        </div>
        <div style={{ position: 'absolute', right: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => {
              setShowSyncModal(true);
              setSyncMessage('');
              setSyncError('');
              if (syncUserKey) {
                handleRetrieveResumes();
              }
            }}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              border: '1.5px solid #059669',
              background: 'rgba(5, 150, 105, 0.05)',
              color: '#059669',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.1s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(5, 150, 105, 0.12)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(5, 150, 105, 0.05)'; }}
          >
            <Cloud size={14} /> Cloud Sync
          </button>

          <button 
            onClick={handleDownloadPDF}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              border: '1.5px solid #18181B',
              background: '#FFFFFF',
              color: '#18181B',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.1s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#FAF9F6'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#FFFFFF'; }}
          >
            <Download size={14} /> Download PDF
          </button>

        </div>
      </header>

      {/* Main 50/50 Split */}
      <div className="builder-layout" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Pane */}
        <div className="editor-container builder-sidebar" style={{ 
          flex: 1, 
          borderRight: '1.5px solid #E2E8F0', 
          display: 'flex', 
          flexDirection: 'column', 
          background: '#F8FAFC',
          backgroundImage: 'linear-gradient(rgba(226, 232, 240, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(226, 232, 240, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          position: 'relative', 
          overflow: 'hidden',
          boxShadow: '6px 0 25px rgba(15, 23, 42, 0.04)',
          zIndex: 5
        }}>
          
          {/* Abstract Gradient Mesh Background (Home Page Colors) */}
          <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(67, 56, 202, 0.12) 0%, rgba(255,255,255,0) 65%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-5%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(255,255,255,0) 65%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '30%', left: '-10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.06) 0%, rgba(255,255,255,0) 65%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '2.5rem 3rem 100px 3rem', position: 'relative', zIndex: 10 }}>
            {leftPaneMode === 'edit' ? (showAIAudit ? renderAIAuditPanel() : renderEditForm()) : renderCustomizePanel()}
          </div>

          {/* Footer — only in edit mode and when not showing AI Audit */}
          {leftPaneMode === 'edit' && !showAIAudit && (
            <div style={{ padding: '1.5rem 3rem', background: '#FFFFFF', borderTop: '1.5px solid #18181B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <JellyButton 
                onClick={handleBack} 
                style={{ width: '110px', borderRadius: '12px 24px 12px 24px' }}
              >
                Back
              </JellyButton>
              
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '10px', 
                background: '#FFFFFF', border: '1px solid #E2E8F0', 
                padding: '8px 16px', borderRadius: '24px', 
                fontSize: '0.85rem', fontWeight: 600,
                position: 'relative',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
              }}>
                <span style={{ color: '#059669' }}>{(activeStepIndex + 1).toString()}</span>
                <span style={{ color: '#94A3B8' }}>/</span>
                <span style={{ color: '#1E293B' }}>{steps.length.toString()}</span>
                
                <div style={{ display: 'flex', gap: '8px', marginLeft: '6px', position: 'relative', alignItems: 'center', height: '14px' }}>
                  {steps.map((s, i) => {
                    const isActive = i === activeStepIndex;
                    return (
                      <div 
                        key={s.id} 
                        onClick={() => setActiveStepIndex(i)} 
                        style={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          background: '#E2E8F0',
                          cursor: 'pointer', 
                          position: 'relative'
                        }} 
                      >
                        {isActive && (
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              borderRadius: '50%',
                              background: '#059669',
                              zIndex: 5
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <JellyButton 
                onClick={handleNext} 
                style={{ background: '#059669', color: '#FFFFFF', minWidth: '150px', border: 'none', borderRadius: '24px 12px 24px 12px' }}
              >
                {activeStepIndex === steps.length - 1 ? 'Finish' : 'Next: ' + steps[activeStepIndex + 1]?.title}
              </JellyButton>
            </div>
          )}
        </div>

        {/* Right Pane — Live Preview */}
        <div className="builder-preview-area" style={{ flex: 1, background: '#F8FAFC', display: 'flex', flexDirection: 'column', overflowY: 'auto', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%', minHeight: '100%', padding: '2rem 1rem' }}>
            <div 
              style={{ 
                width: '800px', 
                height: '1131px', 
                transform: `scale(${previewScale})`,
                transformOrigin: 'top center', 
                background: '#FFFFFF',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                position: 'relative',
                marginBottom: `-${(1 - previewScale) * 1131}px`
              }}
            >
              {leftPaneMode === 'customize' ? (
                <div
                  id="resume-pdf-content"
                  style={{
                    width: '800px', minHeight: '1131px', position: 'relative',
                    '--resume-primary': resumeData.settings?.primaryColor || '#059669',
                    '--resume-font': resumeData.settings?.fontFamily || 'Inter',
                    '--resume-padding': resumeData.settings?.margins === 'Compact' ? '24px' : resumeData.settings?.margins === 'Spacious' ? '56px' : '40px',
                    fontFamily: `var(--resume-font), sans-serif`
                  }}
                >
                  <style>{`
                    #resume-pdf-content * { font-family: var(--resume-font), sans-serif !important; }
                    #resume-pdf-content [style*="color: #059669"],
                    #resume-pdf-content [style*="color:#059669"] { color: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="background: #059669"],
                    #resume-pdf-content [style*="background:#059669"],
                    #resume-pdf-content [style*="background-color: #059669"],
                    #resume-pdf-content [style*="background-color:#059669"] { background-color: var(--resume-primary) !important; background: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="border-color: #059669"],
                    #resume-pdf-content [style*="borderColor: #059669"] { border-color: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="color: #4361EE"],
                    #resume-pdf-content [style*="color:#4361EE"] { color: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="background: #4361EE"],
                    #resume-pdf-content [style*="background:#4361EE"] { background: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="color: #2563EB"],
                    #resume-pdf-content [style*="color:#2563EB"] { color: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="background: #2563EB"],
                    #resume-pdf-content [style*="background:#2563EB"] { background: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="color: #007E6F"],
                    #resume-pdf-content [style*="color:#007E6F"] { color: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="background: #007E6F"],
                    #resume-pdf-content [style*="background:#007E6F"] { background: var(--resume-primary) !important; background-color: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="color: #9D4EDD"],
                    #resume-pdf-content [style*="color:#9D4EDD"] { color: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="background: #9D4EDD"],
                    #resume-pdf-content [style*="background:#9D4EDD"] { background: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="color: #14213D"],
                    #resume-pdf-content [style*="color:#14213D"] { color: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="background: #14213D"],
                    #resume-pdf-content [style*="background:#14213D"] { background: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="color: #F72585"],
                    #resume-pdf-content [style*="color:#F72585"] { color: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="background: #F72585"],
                    #resume-pdf-content [style*="background:#F72585"] { background: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="color: #E11D48"],
                    #resume-pdf-content [style*="color:#E11D48"] { color: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="background: #E11D48"],
                    #resume-pdf-content [style*="background:#E11D48"] { background: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="color: #1E3A8A"],
                    #resume-pdf-content [style*="color:#1E3A8A"] { color: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="background: #1E3A8A"],
                    #resume-pdf-content [style*="background:#1E3A8A"] { background: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="color: #FF9F1C"],
                    #resume-pdf-content [style*="color:#FF9F1C"] { color: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="background: #FF9F1C"],
                    #resume-pdf-content [style*="background:#FF9F1C"] { background: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="color: #FCA311"],
                    #resume-pdf-content [style*="color:#FCA311"] { color: var(--resume-primary) !important; }
                    #resume-pdf-content [style*="background: #FCA311"],
                    #resume-pdf-content [style*="background:#FCA311"] { background: var(--resume-primary) !important; }
                  `}</style>
                  <TemplateRenderer templateId={selectedTemplate} resumeData={resumeData} />
                </div>
              ) : (
                <LivePreview disableScaling={true} />
              )}
            </div>
          </div>
          
          {/* Zoom Indicator */}
          <div style={{ position: 'absolute', bottom: '2rem', background: '#1E293B', color: '#FFF', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <span style={{ cursor: 'pointer', opacity: 0.7 }}><ChevronLeft size={16} /></span> 
            1 / 1 
            <span style={{ cursor: 'pointer', opacity: 0.7 }}><ChevronRight size={16} /></span>
          </div>
        </div>

      </div>

      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            onClick={() => setShowExitConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FFFFFF', 
                border: '1px solid #E2E8F0',
                borderRadius: '24px 12px 24px 12px', // organic curved modal
                padding: '2.5rem',
                maxWidth: '440px', width: '90%', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem'
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 800, color: '#1E293B' }}>
                  Leave Editor?
                </h3>
                <p style={{ margin: 0, fontSize: '1rem', color: '#475569', lineHeight: 1.6 }}>
                  If you go back, all your changes will be lost and you'll start fresh from the home page.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', width: '100%', marginTop: '0.5rem' }}>
                <button
                  onClick={() => setShowExitConfirm(false)}
                  style={{
                    flex: 1, padding: '0.75rem 1.5rem', borderRadius: '24px 12px 24px 12px', // organic shape
                    border: 'none', background: '#059669', // formal emerald green
                    color: '#FFFFFF', fontWeight: 700, fontSize: '0.95rem',
                    cursor: 'pointer', transition: 'none'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#047857'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = '#059669'; }}
                >
                  Continue Editing
                </button>
                <button
                  onClick={handleConfirmExit}
                  style={{
                    flex: 1, padding: '0.75rem 1.5rem', borderRadius: '12px 24px 12px 24px', // organic shape
                    border: '1px solid #CBD5E1', background: '#FFFFFF', // formal slate/white
                    color: '#475569', fontWeight: 700, fontSize: '0.95rem',
                    cursor: 'pointer', transition: 'none'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#94A3B8'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
                >
                  Discard Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Supabase Cloud Sync Modal ── */}
      <AnimatePresence>
        {showSyncModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            style={{ 
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
              background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
              padding: '1.5rem'
            }}
            onClick={() => setShowSyncModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              style={{ 
                background: '#FFFFFF', borderRadius: '24px', 
                border: '1.5px solid #E2E8F0', padding: '2rem', 
                width: '100%', maxWidth: '520px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowSyncModal(false)}
                style={{ 
                  position: 'absolute', top: '1.25rem', right: '1.25rem', 
                  background: 'transparent', border: 'none', color: '#64748B', 
                  cursor: 'pointer' 
                }}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                <Database size={24} style={{ color: '#059669' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Cloud Database Sync
                </h2>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#475569', margin: '0 0 1.5rem 0', fontWeight: 500 }}>
                Save your progress or sync your resumes across multiple devices.
              </p>

              {/* Tabs */}
              <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '12px', padding: '4px', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => { setSyncTab('save'); setSyncError(''); setSyncMessage(''); }}
                  style={{
                    flex: 1, padding: '8px 16px', borderRadius: '8px', border: 'none',
                    background: syncTab === 'save' ? '#059669' : 'transparent',
                    color: syncTab === 'save' ? '#FFFFFF' : '#475569',
                    fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Save to Cloud
                </button>
                <button
                  type="button"
                  onClick={() => { setSyncTab('load'); setSyncError(''); setSyncMessage(''); if (syncUserKey) handleRetrieveResumes(); }}
                  style={{
                    flex: 1, padding: '8px 16px', borderRadius: '8px', border: 'none',
                    background: syncTab === 'load' ? '#059669' : 'transparent',
                    color: syncTab === 'load' ? '#FFFFFF' : '#475569',
                    fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Load from Cloud
                </button>
              </div>

              {/* Error and Success Alerts */}
              {syncError && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', borderRadius: '12px', padding: '0.75rem 1rem', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 500 }}>
                  ⚠️ {syncError}
                </div>
              )}
              {syncMessage && (
                <div style={{ background: '#ECFDF5', border: '1px solid #6EE7B7', color: '#047857', borderRadius: '12px', padding: '0.75rem 1rem', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600 }}>
                  ✨ {syncMessage}
                </div>
              )}

              {/* Save Tab Content */}
              {syncTab === 'save' && (
                <form onSubmit={handleSaveToCloud} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Sync Key (Email / Username)
                    </label>
                    <input 
                      type="text"
                      required
                      style={{ ...inputStyle, padding: '0.75rem 1rem', fontSize: '1rem' }}
                      placeholder="e.g. adil@example.com"
                      value={syncUserKey}
                      onChange={(e) => setSyncUserKey(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Resume Version / Name
                    </label>
                    <input 
                      type="text"
                      required
                      style={{ ...inputStyle, padding: '0.75rem 1rem', fontSize: '1rem' }}
                      placeholder="e.g. Software Engineer Resume"
                      value={syncResumeName}
                      onChange={(e) => setSyncResumeName(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoadingSync}
                    style={{
                      background: '#059669', color: '#FFFFFF', border: 'none',
                      padding: '0.85rem 1.5rem', borderRadius: '12px',
                      fontWeight: 700, fontSize: '0.95rem', cursor: isLoadingSync ? 'not-allowed' : 'pointer',
                      marginTop: '0.5rem', width: '100%',
                      opacity: isLoadingSync ? 0.7 : 1
                    }}
                  >
                    {isLoadingSync ? 'Saving to Database...' : 'Save Current Resume'}
                  </button>
                </form>
              )}

              {/* Load Tab Content */}
              {syncTab === 'load' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Sync Key (Email / Username)
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text"
                        style={{ ...inputStyle, flex: 1, padding: '0.75rem 1rem', fontSize: '1rem' }}
                        placeholder="e.g. adil@example.com"
                        value={syncUserKey}
                        onChange={(e) => setSyncUserKey(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={handleRetrieveResumes}
                        disabled={isLoadingSync}
                        style={{
                          background: '#1E293B', color: '#FFFFFF', border: 'none',
                          padding: '0.75rem 1.25rem', borderRadius: '10px',
                          fontWeight: 700, fontSize: '0.9rem', cursor: isLoadingSync ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Fetch
                      </button>
                    </div>
                  </div>

                  {/* Resumes List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Your Saved Resumes
                    </label>
                    <div style={{ 
                      maxHeight: '200px', overflowY: 'auto', 
                      border: '1.5px solid #E2E8F0', borderRadius: '12px',
                      background: '#F8FAFC'
                    }}>
                      {savedResumesList.length === 0 ? (
                        <div style={{ padding: '2rem 1rem', textAlign: 'center', fontSize: '0.9rem', color: '#64748B', fontStyle: 'italic' }}>
                          No resumes retrieved yet. Enter your Sync Key and click Fetch.
                        </div>
                      ) : (
                        savedResumesList.map(res => (
                          <div 
                            key={res.id} 
                            style={{ 
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                              padding: '0.85rem 1rem', borderBottom: '1px solid #E2E8F0' 
                            }}
                          >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden', paddingRight: '0.5rem' }}>
                              <strong style={{ fontSize: '0.95rem', color: '#0F172A', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                {res.name}
                              </strong>
                              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                                Updated: {new Date(res.updated_at).toLocaleString()}
                              </span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                              <button
                                type="button"
                                onClick={() => handleLoadResume(res.id)}
                                style={{
                                  background: '#059669', color: '#FFFFFF', border: 'none',
                                  padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem',
                                  fontWeight: 700, cursor: 'pointer'
                                }}
                              >
                                Load
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteCloudResume(res.id)}
                                style={{
                                  background: 'transparent', border: 'none', color: '#EF4444',
                                  cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center'
                                }}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default BuilderFlow;
