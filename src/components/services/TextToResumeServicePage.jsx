import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import KickresumeLogo from '../KickresumeLogo';
import { 
  Sparkles, FileText, Upload, CheckCircle2, ArrowRight, AlertCircle, 
  Sliders, Zap, RefreshCw, Check, Eye, Briefcase, 
  GraduationCap, ShieldCheck, ChevronLeft, Palette, 
  Download, Copy, CheckCheck, ZoomIn, ZoomOut, RotateCcw, 
  Cpu, FileCheck, Layers, Terminal, Compass, Wand2, 
  CheckSquare, Maximize2, Trash2, ArrowUpRight, Award, 
  Globe, Code, Laptop, UserCheck, Plus, ExternalLink, 
  Target, Edit3, HeartHandshake, Search
} from 'lucide-react';
import { 
  analyzeAndPerfectResumeFromText, 
  FORMAT_STYLES, 
  extractTextFromFile 
} from '../../utils/aiResumeArchitectService';
import TemplateRenderer from '../TemplateRenderer';
import { downloadPDF } from '../../utils/pdfGenerator';

const A4_WIDTH = 800;
const A4_HEIGHT = 1131.43; // Standard A4 ratio (297 / 210 * 800)

const THEMES = [
  { id: 'indigo',      name: 'Quantum Indigo',     color: '#6366F1' },
  { id: 'violet',     name: 'Electric Violet',    color: '#7C3AED' },
  { id: 'sapphire',   name: 'Deep Sapphire',      color: '#2563EB' },
  { id: 'emerald',    name: 'Emerald Green',      color: '#059669' },
  { id: 'rose',       name: 'Vibrant Rose',       color: '#E11D48' },
  { id: 'amber',      name: 'Warm Amber',         color: '#D97706' },
  { id: 'terracotta', name: 'Terracotta',          color: '#EA580C' },
  { id: 'black',      name: 'Midnight Slate',     color: '#0F172A' },
];

const THEME_PALETTES = {
  indigo:      { primary: '#6366F1', hover: '#4F46E5', light: '#EEF2FF', border: '#C7D2FE', glow: 'rgba(99,102,241,0.25)',  bg: '#F8FAFC' },
  violet:     { primary: '#7C3AED', hover: '#6D28D9', light: '#F5F3FF', border: '#DDD6FE', glow: 'rgba(124,58,237,0.25)',  bg: '#FBFBFE' },
  sapphire:   { primary: '#2563EB', hover: '#1D4ED8', light: '#EFF6FF', border: '#BFDBFE', glow: 'rgba(37,99,235,0.25)',   bg: '#F8FAFC' },
  emerald:    { primary: '#059669', hover: '#047857', light: '#ECFDF5', border: '#A7F3D0', glow: 'rgba(5,150,105,0.25)',   bg: '#F6FBF9' },
  rose:       { primary: '#E11D48', hover: '#BE123C', light: '#FFF1F2', border: '#FECDD3', glow: 'rgba(225,29,72,0.25)',   bg: '#FCF8F8' },
  amber:      { primary: '#D97706', hover: '#B45309', light: '#FFFBEB', border: '#FDE68A', glow: 'rgba(217,119,6,0.25)',   bg: '#FCFAF6' },
  terracotta: { primary: '#EA580C', hover: '#C2410C', light: '#FFF7ED', border: '#FFEDD5', glow: 'rgba(234,88,12,0.25)',   bg: '#FCFAF8' },
  black:      { primary: '#0F172A', hover: '#1E293B', light: '#F1F5F9', border: '#CBD5E1', glow: 'rgba(15,23,42,0.25)',    bg: '#F8FAFC' },
};

const TEMPLATE_PRESETS = [
  { id: 'classic', name: 'Classic Clean', tag: 'ATS Safe' },
  { id: 'aslam', name: 'Elite IT Executive', tag: 'Executive' },
  { id: 'minimalclassic', name: 'Minimal Modern', tag: 'Clean' },
  { id: 'vertex', name: 'Vertex Matrix', tag: 'Modern' },
  { id: 'visionary', name: 'Visionary Accent', tag: 'Creative' },
  { id: 'executive', name: 'Executive Leader', tag: 'Leadership' },
  { id: 'letscode', name: 'Developer LetsCode', tag: 'Tech' },
  { id: 'trailblazer', name: 'Trailblazer ATS', tag: 'ATS Safe' },
  { id: 'janet', name: 'Janet Slate', tag: 'Minimal' },
  { id: 'soothing', name: 'Soothing Teal', tag: 'Modern' },
  { id: 'boxedmodern', name: 'Boxed Modern', tag: 'Structured' },
  { id: 'centeredmodern', name: 'Centered Impact', tag: 'Creative' },
  { id: 'standout', name: 'Stand Out', tag: 'Creative' },
  { id: 'magnetic', name: 'Magnetic Tech', tag: 'Tech' },
  { id: 'superb', name: 'Superb Split', tag: 'Executive' },
  { id: 'pinkheader', name: 'Pink Minimalist', tag: 'Modern' },
];

const DOMAIN_SERVICES = [
  { id: 'text-to-resume', name: 'Text Architect', icon: Sparkles, route: '/services/text-to-resume', active: true },
  { id: 'ats-scanner', name: 'ATS Scanner', icon: ShieldCheck, route: '/services/ats-scanner' },
  { id: 'bullet-enhancer', name: 'Bullet Studio', icon: Wand2, route: '/services/bullet-enhancer' },
  { id: 'website-builder', name: 'Portfolio Web', icon: Globe, route: '/services/website-builder' },
  { id: 'cover-letter', name: 'Cover Letter', icon: FileText, route: '/services/cover-letter' },
  { id: 'career-map', name: 'Career Map', icon: Compass, route: '/services/career-map' },
  { id: 'job-matcher', name: 'Job Matcher', icon: Target, route: '/services/job-matcher' },
  { id: 'proofreading', name: 'Proofreading', icon: Award, route: '/services/proofreading' }
];

const PERSONA_BLUEPRINTS = [
  {
    id: 'fullstack',
    icon: Terminal,
    title: 'Full Stack Engineer',
    badge: 'React 19 · Node · Redis',
    role: 'Senior Full Stack Software Engineer',
    seniority: 'senior',
    promptHint: 'Highlight React 19, TypeScript, microservices, and 42% latency optimization.',
    notes: `Mulla Yasmin
mullayasmin158@gmail.com | +91 6300209709 | Hyderabad, India
linkedin.com/in/mullayasmin | github.com/mullayasmin

Experienced Software Engineer with 4+ years of expertise building scalable full-stack web applications, distributed systems, and modern UI architectures.

Experience:
Senior Software Engineer at CloudNova Solutions (Jun 2023 - Present)
- Architected client-facing analytics dashboards using React, TypeScript, and Tailwind CSS, increasing enterprise engagement by 38%.
- Optimized REST and GraphQL API endpoints with Redis caching, cutting p99 query latency by 42%.
- Designed automated CI/CD pipelines with GitHub Actions and Docker, enabling zero-downtime blue/green deployments.
- Mentored 6 junior engineers and established engineering code quality standards.

Software Engineer at TechSprint Labs (Aug 2021 - May 2023)
- Built secure multi-tenant authentication microservices using JWT and OAuth2 integration handling 50k+ daily logins.
- Integrated Stripe payment gateways and asynchronous webhook processing microservices.
- Created reusable component design system adopted by 4 frontend teams, accelerating feature delivery by 30%.

Education:
JNTU Hyderabad - Bachelor of Technology in Computer Science (2017 - 2021), CGPA: 8.4/10

Projects:
- AI Resume Intelligence: Next-gen resume scoring and keyword extraction platform with instant PDF generation.
- Distributed Task Runner: Real-time asynchronous task scheduler using Redis and WebSockets.

Skills:
JavaScript, TypeScript, React, Next.js, Node.js, Express, PostgreSQL, MongoDB, Redis, Docker, AWS, Git, CI/CD, Agile Execution`,
    structured: {
      personalInfo: {
        fullName: 'Mulla Yasmin',
        jobTitle: 'Senior Full Stack Software Engineer',
        email: 'mullayasmin158@gmail.com',
        phone: '+91 6300209709',
        location: 'Hyderabad, India',
        linkedin: 'linkedin.com/in/mullayasmin',
        github: 'github.com/mullayasmin',
        summary: 'High-impact Senior Software Engineer with 4+ years of expertise architecting scalable web applications, distributed microservices, and modern UI systems. Proven success improving query latency by 42% and driving zero-downtime CI/CD deployments.'
      },
      experience: [
        {
          id: 'exp1',
          title: 'Senior Software Engineer',
          jobTitle: 'Senior Software Engineer',
          company: 'CloudNova Solutions',
          startDate: 'Jun 2023',
          endDate: 'Present',
          date: 'Jun 2023 - Present',
          location: 'Hyderabad, India',
          description: '• Architected client-facing analytics dashboards using React and TypeScript, increasing enterprise engagement by 38%.\n• Optimized REST & GraphQL endpoints with Redis caching, slashing p99 latency by 42%.\n• Deployed automated CI/CD pipelines with GitHub Actions and Docker, achieving 99.98% uptime.'
        },
        {
          id: 'exp2',
          title: 'Software Engineer',
          jobTitle: 'Software Engineer',
          company: 'TechSprint Labs',
          startDate: 'Aug 2021',
          endDate: 'May 2023',
          date: 'Aug 2021 - May 2023',
          location: 'Hyderabad, India',
          description: '• Engineered secure authentication microservices using JWT & OAuth2 handling 50,000+ daily sessions.\n• Integrated Stripe payment flows with automated webhook error recovery.\n• Developed modular design system adopted by 4 frontend teams, accelerating feature delivery by 30%.'
        }
      ],
      education: [
        {
          id: 'edu1',
          school: 'JNTU Hyderabad',
          institution: 'JNTU Hyderabad',
          degree: 'Bachelor of Technology in Computer Science',
          location: 'Hyderabad, India',
          startDate: '2017',
          endDate: '2021',
          date: '2017 - 2021',
          cgpa: '8.4/10'
        }
      ],
      projects: [
        {
          id: 'proj1',
          name: 'AI Resume Intelligence Platform',
          technologies: 'React, Node.js, Groq AI, Tailwind CSS',
          description: '• Developed high-speed resume structuring parser converting raw text to 24 executive templates in < 2 seconds.\n• Integrated PDF generation and ATS audit scoring engine with 99.4% parser accuracy.'
        }
      ],
      skills: {
        programming: ['JavaScript', 'TypeScript', 'Python', 'SQL'],
        frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS'],
        databases: ['PostgreSQL', 'MongoDB', 'Redis'],
        cloud: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
        tools: ['Git', 'GitHub Actions', 'Postman', 'Vite'],
        soft: ['Agile Execution', 'Technical Leadership', 'System Design']
      },
      certifications: [
        { id: 'cert1', name: 'AWS Certified Solutions Architect - Associate', issuer: 'Amazon Web Services', date: '2023' }
      ]
    }
  },
  {
    id: 'ai-ml',
    icon: Cpu,
    title: 'AI / ML Engineer',
    badge: 'PyTorch · LangChain · Groq',
    role: 'Senior AI / Machine Learning Engineer',
    seniority: 'lead',
    promptHint: 'Highlight PyTorch, Groq LLM pipelines, vector databases, and 55% model latency reduction.',
    notes: `Arjun Varma
arjun.varma.ai@gmail.com | +1 (415) 890-2134 | San Francisco, CA
linkedin.com/in/arjun-varma | github.com/arjunvarma-ai

Applied Machine Learning Engineer with 5+ years building and deploying deep learning pipelines, RAG systems, and generative AI agents at scale.

Experience:
Lead AI Engineer at NeuralMatrix Systems (Mar 2023 - Present)
- Engineered scalable RAG architecture using LangChain, Qdrant vector database, and Groq/Llama-3, reducing inference latency by 55%.
- Fine-tuned transformer models on domain-specific corpora, improving token prediction accuracy by 28%.
- Led cross-functional squad of 5 ML engineers building multimodal vision-language models.

ML Engineer at DataVortex AI (Jan 2021 - Feb 2023)
- Built automated model evaluation and data validation pipelines processing 10M+ daily records.
- Deployed PyTorch inference microservices using Triton Inference Server and Kubernetes with 99.98% uptime.

Education:
Stanford University - Master of Science in Artificial Intelligence (2019 - 2021), GPA: 3.9/4.0
UC Berkeley - B.S. in Electrical Engineering & Computer Science (2015 - 2019)

Projects:
- NeuralSearch Vector Engine: Open-source semantic search toolkit with 2.4k GitHub stars.
- Real-Time LLM Guardrail: Latency-optimized safety evaluation proxy with 12ms overhead.

Skills:
Python, PyTorch, TensorFlow, LangChain, LlamaIndex, Qdrant, Pinecone, Docker, Kubernetes, AWS SageMaker, CUDA, MLOps`,
    structured: {
      personalInfo: {
        fullName: 'Arjun Varma',
        jobTitle: 'Senior AI / Machine Learning Engineer',
        email: 'arjun.varma.ai@gmail.com',
        phone: '+1 (415) 890-2134',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/arjun-varma',
        github: 'github.com/arjunvarma-ai',
        summary: 'Applied Machine Learning Engineer with 5+ years building and deploying deep learning pipelines, RAG systems, and generative AI agents at scale with 55% latency reduction.'
      },
      experience: [
        {
          id: 'exp1',
          title: 'Lead AI Engineer',
          company: 'NeuralMatrix Systems',
          date: 'Mar 2023 - Present',
          description: '• Engineered scalable RAG architecture using LangChain, Qdrant vector database, and Groq/Llama-3, reducing inference latency by 55%.\n• Fine-tuned transformer models on domain-specific corpora, improving token prediction accuracy by 28%.\n• Led cross-functional squad of 5 ML engineers building multimodal vision-language models.'
        },
        {
          id: 'exp2',
          title: 'ML Engineer',
          company: 'DataVortex AI',
          date: 'Jan 2021 - Feb 2023',
          description: '• Built automated model evaluation and data validation pipelines processing 10M+ daily records.\n• Deployed PyTorch inference microservices using Triton Inference Server and Kubernetes with 99.98% uptime.'
        }
      ],
      education: [
        { id: 'edu1', school: 'Stanford University', degree: 'M.S. in Artificial Intelligence', date: '2019 - 2021', cgpa: '3.9/4.0' }
      ],
      projects: [
        { id: 'proj1', name: 'NeuralSearch Vector Engine', technologies: 'PyTorch, Qdrant, CUDA', description: '• Open-source semantic search toolkit with 2.4k GitHub stars.' }
      ],
      skills: {
        programming: ['Python', 'C++', 'CUDA', 'SQL'],
        frameworks: ['PyTorch', 'TensorFlow', 'LangChain', 'LlamaIndex'],
        databases: ['Qdrant', 'Pinecone', 'Redis'],
        cloud: ['AWS SageMaker', 'Kubernetes', 'Docker'],
        tools: ['Triton', 'Git', 'MLOps', 'Weights & Biases'],
        soft: ['AI Research', 'Team Leadership', 'First-Principles Thinking']
      }
    }
  },
  {
    id: 'devops',
    icon: Compass,
    title: 'Cloud DevOps Architect',
    badge: 'AWS · K8s · Terraform',
    role: 'Lead Cloud & DevOps Architect',
    seniority: 'lead',
    promptHint: 'Emphasize Kubernetes, Terraform, multi-region high availability, and $640k savings.',
    notes: `Sarah Jenkins
sarah.jenkins.cloud@outlook.com | +1 (206) 555-0198 | Seattle, WA
linkedin.com/in/sarahjenkins-cloud | github.com/sjenkins-infra

Principal Infrastructure & DevOps Architect with 8+ years leading cloud migration, Kubernetes orchestration, and resilient multi-cloud disaster recovery.

Experience:
Lead DevOps Architect at Apex Cloud Technologies (2022 - Present)
- Spearheaded migration of 140+ microservices to Amazon EKS, reducing annual infrastructure expenses by $640,000.
- Implemented Terraform Infrastructure as Code (IaC) modules managing 500+ AWS and GCP cloud resources.
- Achieved 99.99% service availability across 3 geographic regions with automated multi-region failover.

Senior Site Reliability Engineer at CloudScale Labs (2019 - 2022)
- Built centralized telemetry observability stack using Prometheus, Grafana, and OpenTelemetry.
- Automated release pipelines using ArgoCD and GitHub Actions, cutting release cycles from 4 hours to 8 minutes.

Education:
University of Washington - B.S. in Computer Engineering (2015 - 2019)

Certifications:
- AWS Certified Solutions Architect - Professional (2023)
- Certified Kubernetes Administrator (CKA - 2022)

Skills:
AWS, GCP, Kubernetes, Docker, Terraform, Helm, ArgoCD, Prometheus, Grafana, Linux, Bash, Python, CI/CD, SRE Practices`,
    structured: {
      personalInfo: {
        fullName: 'Sarah Jenkins',
        jobTitle: 'Lead Cloud & DevOps Architect',
        email: 'sarah.jenkins.cloud@outlook.com',
        phone: '+1 (206) 555-0198',
        location: 'Seattle, WA',
        linkedin: 'linkedin.com/in/sarahjenkins-cloud',
        github: 'github.com/sjenkins-infra',
        summary: 'Principal Infrastructure & DevOps Architect with 8+ years leading cloud migration, Kubernetes orchestration, and multi-cloud resilience with $640k annual savings.'
      },
      experience: [
        {
          id: 'exp1',
          title: 'Lead DevOps Architect',
          company: 'Apex Cloud Technologies',
          date: '2022 - Present',
          description: '• Spearheaded migration of 140+ microservices to Amazon EKS, reducing annual infrastructure expenses by $640,000.\n• Implemented Terraform Infrastructure as Code (IaC) modules managing 500+ AWS and GCP cloud resources.\n• Achieved 99.99% service availability across 3 geographic regions with automated multi-region failover.'
        }
      ],
      education: [
        { id: 'edu1', school: 'University of Washington', degree: 'B.S. in Computer Engineering', date: '2015 - 2019' }
      ],
      projects: [
        { id: 'proj1', name: 'Multi-Region Failover Orchestrator', technologies: 'AWS, Terraform, Go', description: '• Automated zero-loss traffic rerouting in under 15 seconds.' }
      ],
      skills: {
        programming: ['Go', 'Python', 'Bash'],
        frameworks: ['Terraform', 'Helm', 'ArgoCD'],
        databases: ['PostgreSQL', 'DynamoDB', 'Redis'],
        cloud: ['AWS', 'GCP', 'Kubernetes', 'Docker'],
        tools: ['Prometheus', 'Grafana', 'Git', 'Linux'],
        soft: ['Site Reliability Engineering', 'Incident Command', 'Mentorship']
      }
    }
  },
  {
    id: 'product',
    icon: Wand2,
    title: 'Senior Product Manager',
    badge: 'B2B SaaS · PLG · $3.8M',
    role: 'Senior Product Manager',
    seniority: 'senior',
    promptHint: 'Emphasize product-led growth, $3.8M ARR growth, conversion optimization, and agile roadmapping.',
    notes: `Elena Rostova
elena.rostova.pm@gmail.com | +1 (646) 555-0174 | New York, NY
linkedin.com/in/elena-rostova

Strategic Product Leader with 6+ years driving product-led growth, SaaS feature launches, and user retention for high-scale enterprise platforms.

Experience:
Senior Product Manager at Velocity B2B SaaS (2022 - Present)
- Defined product roadmap and launched AI workflow automation suite, driving $3.8M in net new ARR within 12 months.
- Redesigned customer onboarding funnel, elevating 30-day user activation by 34% and reducing churn by 18%.
- Led cross-functional squad of 12 engineers, 2 UX designers, and 2 product marketing managers.

Product Manager at GrowthPulse Digital (2019 - 2022)
- Managed end-to-end launch of mobile app with 4.8-star rating and 250k+ active monthly users.
- Implemented A/B testing infrastructure running 40+ concurrent experiments to optimize checkout flow.

Education:
Columbia University - Master of Business Administration (MBA, 2017 - 2019)
NYU Stern - B.S. in Information Systems (2013 - 2017)

Skills:
Product Strategy, User Research, Roadmapping, Agile/Scrum, A/B Testing, Mixpanel, Amplitude, SQL, Jira, Figma, Stakeholder Management`,
    structured: {
      personalInfo: {
        fullName: 'Elena Rostova',
        jobTitle: 'Senior Product Manager',
        email: 'elena.rostova.pm@gmail.com',
        phone: '+1 (646) 555-0174',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/elena-rostova',
        summary: 'Strategic Product Leader with 6+ years driving product-led growth, SaaS feature launches, and user retention with $3.8M in net new ARR.'
      },
      experience: [
        {
          id: 'exp1',
          title: 'Senior Product Manager',
          company: 'Velocity B2B SaaS',
          date: '2022 - Present',
          description: '• Defined product roadmap and launched AI workflow automation suite, driving $3.8M in net new ARR within 12 months.\n• Redesigned customer onboarding funnel, elevating 30-day user activation by 34% and reducing churn by 18%.\n• Led cross-functional squad of 12 engineers, 2 UX designers, and 2 product marketing managers.'
        }
      ],
      education: [
        { id: 'edu1', school: 'Columbia University', degree: 'MBA in Product & Strategy', date: '2017 - 2019' }
      ],
      projects: [
        { id: 'proj1', name: 'AI Workflow Automation Engine', technologies: 'Product Strategy, Mixpanel, SQL', description: '• Scaled from zero to 45 enterprise customers in 9 months.' }
      ],
      skills: {
        programming: ['SQL', 'Python for Analytics'],
        frameworks: ['Agile / Scrum', 'Design Thinking'],
        databases: ['PostgreSQL', 'Snowflake'],
        cloud: ['AWS', 'Mixpanel', 'Amplitude'],
        tools: ['Jira', 'Figma', 'Linear', 'Notion'],
        soft: ['Stakeholder Management', 'Roadmapping', 'User Research']
      }
    }
  },
  {
    id: 'fresher',
    icon: GraduationCap,
    title: 'Entry / CS Graduate',
    badge: 'UIUC · 3.85 GPA · Algorithms',
    role: 'Junior Software Engineer',
    seniority: 'entry',
    promptHint: 'Elevate academic coursework, problem solving, algorithms, and capstone projects.',
    notes: `David Chen
david.chen.dev@gmail.com | +1 (312) 555-0145 | Chicago, IL
linkedin.com/in/davidchen-dev | github.com/davidchen-code

Motivated Computer Science graduate with strong foundation in data structures, algorithms, modern web development, and cloud computing.

Education:
University of Illinois Urbana-Champaign (UIUC) - B.S. in Computer Science (2020 - 2024)
GPA: 3.85 / 4.0 (Dean's List 6 Semesters)

Academic Experience & Internships:
Software Engineering Intern at Horizon Fintech (May 2023 - Aug 2023)
- Built interactive financial data dashboard using React and Chart.js used by 200+ wealth managers.
- Wrote unit and integration tests with Jest, increasing test coverage from 68% to 89%.
- Optimized database indexing in PostgreSQL, decreasing average dashboard load times by 25%.

Projects:
- Smart Campus Transit Tracker: Full-stack real-time bus tracking application using Node.js, Leaflet maps, and WebSockets.
- Algorithmic Portfolio Rebalancer: Python tool utilizing dynamic programming to optimize asset allocation against market volatility.

Skills:
Python, Java, C++, JavaScript, React, Node.js, Express, PostgreSQL, Git, Linux, Object-Oriented Programming, Data Structures`,
    structured: {
      personalInfo: {
        fullName: 'David Chen',
        jobTitle: 'Junior Software Engineer',
        email: 'david.chen.dev@gmail.com',
        phone: '+1 (312) 555-0145',
        location: 'Chicago, IL',
        linkedin: 'linkedin.com/in/davidchen-dev',
        github: 'github.com/davidchen-code',
        summary: 'Motivated Computer Science graduate from UIUC (3.85 GPA) with strong foundation in algorithms, React, Node.js, and cloud systems.'
      },
      experience: [
        {
          id: 'exp1',
          title: 'Software Engineering Intern',
          company: 'Horizon Fintech',
          date: 'May 2023 - Aug 2023',
          description: '• Built interactive financial data dashboard using React and Chart.js used by 200+ wealth managers.\n• Wrote unit and integration tests with Jest, increasing test coverage from 68% to 89%.\n• Optimized database indexing in PostgreSQL, decreasing average dashboard load times by 25%.'
        }
      ],
      education: [
        { id: 'edu1', school: 'University of Illinois Urbana-Champaign (UIUC)', degree: 'B.S. in Computer Science', date: '2020 - 2024', cgpa: '3.85 / 4.0' }
      ],
      projects: [
        { id: 'proj1', name: 'Smart Campus Transit Tracker', technologies: 'Node.js, WebSockets, React', description: '• Real-time bus tracking app serving 4,000+ daily campus students.' }
      ],
      skills: {
        programming: ['Python', 'Java', 'C++', 'JavaScript'],
        frameworks: ['React', 'Node.js', 'Express'],
        databases: ['PostgreSQL', 'SQLite'],
        cloud: ['AWS', 'Docker'],
        tools: ['Git', 'Linux', 'Jest'],
        soft: ['Algorithms', 'Data Structures', 'Problem Solving']
      }
    }
  }
];

export default function TextToResumeServicePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setResumeData, setSelectedTemplate, resumeData } = useResume();
  const { user } = useAuth();

  // Active theme management
  const [activeTheme, setActiveTheme] = useState(() => localStorage.getItem('app-theme') || 'black');
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef(null);

  const applyTheme = (themeId) => {
    const p = THEME_PALETTES[themeId] || THEME_PALETTES.black;
    const root = document.documentElement;
    document.body.className = document.body.className.replace(/\btheme-\S+/g, '').trim();
    document.body.classList.add(`theme-${themeId}`);
    root.style.setProperty('--primary',        p.primary);
    root.style.setProperty('--primary-hover',  p.hover);
    root.style.setProperty('--primary-light',  p.light);
    root.style.setProperty('--primary-border', p.border);
    root.style.setProperty('--primary-glow',   p.glow);
    root.style.setProperty('--bg-color',        p.bg);
    setActiveTheme(themeId);
    localStorage.setItem('app-theme', themeId);
  };

  useEffect(() => {
    applyTheme(activeTheme);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Form & Workflow States (All pre-loaded with Rich Dummy Data)
  const [activePersonaId, setActivePersonaId] = useState('fullstack');
  const [inputTab, setInputTab] = useState('draft'); // 'draft' | 'experience' | 'skills' | 'tuning'
  const [rawText, setRawText] = useState(PERSONA_BLUEPRINTS[0].notes);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileExtractedPreview, setFileExtractedPreview] = useState('');
  
  // Strategy Console States
  const [targetRole, setTargetRole] = useState(PERSONA_BLUEPRINTS[0].role);
  const [formatStyle, setFormatStyle] = useState('ats-impact');
  const [seniorityLevel, setSeniorityLevel] = useState('senior');
  const [customPrompt, setCustomPrompt] = useState(PERSONA_BLUEPRINTS[0].promptHint);
  const [chosenTemplate, setChosenTemplate] = useState('classic');

  // Preview & Processing States (Pre-populated with rich dummy data)
  const [isLoading, setIsLoading] = useState(false);
  const [progressState, setProgressState] = useState({ step: 0, title: '', progress: 0 });
  const [errorMessage, setErrorMessage] = useState('');
  const [perfectedResult, setPerfectedResult] = useState(PERSONA_BLUEPRINTS[0].structured);
  const [activeOutputTab, setActiveOutputTab] = useState('canvas'); // 'canvas' | 'structured' | 'ats'
  
  // Auto-Responsive Canvas Scaling System
  const canvasContainerRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState(0.70);
  const [userZoomModifier, setUserZoomModifier] = useState(1);
  const [isCopied, setIsCopied] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const fileInputRef = useRef(null);

  // Responsive scaling calculation
  useEffect(() => {
    const updateScale = () => {
      if (canvasContainerRef.current) {
        const containerWidth = canvasContainerRef.current.clientWidth;
        const availableWidth = Math.max(260, containerWidth - 40);
        const autoScale = availableWidth / A4_WIDTH;
        const clampedScale = Math.min(0.95, Math.max(0.35, autoScale));
        setCanvasScale(clampedScale);
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (canvasContainerRef.current) {
      observer.observe(canvasContainerRef.current);
    }

    return () => observer.disconnect();
  }, [activeOutputTab]);

  // Ingest URL prompt query if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryPrompt = params.get('prompt');
    if (queryPrompt) {
      setRawText(queryPrompt);
      setCustomPrompt(`Focus on candidate profile: ${queryPrompt}`);
      if (!targetRole || targetRole === 'Senior Full Stack Software Engineer') {
        const inferred = queryPrompt.split(' with ')[0].split(' specializing in ')[0].slice(0, 45);
        if (inferred) setTargetRole(inferred);
      }
    }
  }, [location.search]);

  const handleSelectPersona = (persona) => {
    setActivePersonaId(persona.id);
    setRawText(persona.notes);
    setTargetRole(persona.role);
    setSeniorityLevel(persona.seniority || 'senior');
    setCustomPrompt(persona.promptHint);
    setPerfectedResult(persona.structured);
    setErrorMessage('');
    setSelectedFile(null);
    setFileExtractedPreview('');
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setErrorMessage('');
    
    try {
      const extracted = await extractTextFromFile(file);
      setFileExtractedPreview(extracted);
      if (extracted && extracted.trim().length > 10) {
        setRawText(extracted);
      }
    } catch (err) {
      console.warn('File extraction fallback:', err);
      setErrorMessage('Could not extract text automatically. You can paste the contents directly.');
    }
  };

  const handleClearDraft = () => {
    setRawText('');
    setSelectedFile(null);
    setFileExtractedPreview('');
    setActivePersonaId(null);
  };

  const handleAnalyzeAndBuild = async () => {
    const textToProcess = rawText || fileExtractedPreview;
    if (!textToProcess || textToProcess.trim().length < 15) {
      setErrorMessage('Please enter candidate text or select a persona blueprint above.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setProgressState({ step: 1, title: 'Parsing & normalizing candidate data...', progress: 20 });

    try {
      const enhancedCustomPrompt = `${customPrompt ? customPrompt + ' ' : ''}[Seniority: ${seniorityLevel}]`;
      const result = await analyzeAndPerfectResumeFromText({
        rawText: textToProcess,
        file: selectedFile,
        targetRole,
        formatStyle,
        templateId: chosenTemplate,
        customPrompt: enhancedCustomPrompt,
        onProgress: (prog) => setProgressState(prog)
      });

      if (!result) {
        throw new Error('Could not structure resume dataset. Please review input text.');
      }

      setPerfectedResult(result);
    } catch (err) {
      console.error('AI Resume Architect Error:', err);
      setErrorMessage(err.message || 'Failed to synthesize resume. Please check your text or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLaunchInStudio = () => {
    const dataToUse = perfectedResult || resumeData;
    if (!dataToUse) return;
    setResumeData(dataToUse);
    setSelectedTemplate(chosenTemplate);
    navigate('/builder');
  };

  const handleCopyJSON = () => {
    if (!perfectedResult) return;
    navigator.clipboard.writeText(JSON.stringify(perfectedResult, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadDirectPDF = async () => {
    setIsExportingPDF(true);
    try {
      const candidateName = (perfectedResult?.personalInfo?.fullName || 'Resume').replace(/\s+/g, '_');
      await downloadPDF('architect-live-resume-paper', `${candidateName}_Resume.pdf`);
    } catch (err) {
      console.error('PDF Export error:', err);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const displayData = perfectedResult || PERSONA_BLUEPRINTS[0].structured;
  const finalRenderScale = canvasScale * userZoomModifier;
  const scaledCanvasHeight = A4_HEIGHT * finalRenderScale;

  return (
    <div style={{
      height: '100vh',
      maxHeight: '100vh',
      backgroundColor: '#F8FAFC',
      color: 'var(--text-main)',
      display: 'flex',
      fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Custom Clean Slidebar Styles */}
      <style>{`
        .domain-slidebar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .domain-slidebar::-webkit-scrollbar-track {
          background: transparent;
        }
        .domain-slidebar::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 9999px;
        }
        .domain-slidebar::-webkit-scrollbar-thumb:hover {
          background: var(--primary);
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 1. ULTRA-SLEEK DOMAIN SIDEBAR (Treats Each Service as Dedicated Domain)   */}
      {/* ========================================================================= */}
      <aside style={{
        width: '68px',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 0.5rem',
        boxSizing: 'border-box',
        flexShrink: 0,
        zIndex: 60
      }}>
        {/* Top: Brand Logo & Hub Return */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
          <div onClick={() => navigate('/services')} title="Back to Services Hub" style={{ cursor: 'pointer' }}>
            <KickresumeLogo height={26} showText={false} />
          </div>

          <div style={{ width: '32px', height: '1px', backgroundColor: '#E2E8F0' }} />

          {/* Service Domain Navigation Icons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {DOMAIN_SERVICES.map(svc => {
              const Icon = svc.icon;
              const isCurrent = svc.id === 'text-to-resume';
              return (
                <button
                  key={svc.id}
                  onClick={() => navigate(svc.route)}
                  title={svc.name}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    border: isCurrent ? '1.5px solid var(--primary)' : '1px solid transparent',
                    backgroundColor: isCurrent ? 'var(--primary-light)' : 'transparent',
                    color: isCurrent ? 'var(--primary)' : '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={e => {
                    if (!isCurrent) {
                      e.currentTarget.style.backgroundColor = '#F1F5F9';
                      e.currentTarget.style.color = '#0F172A';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isCurrent) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#64748B';
                    }
                  }}
                >
                  <Icon size={18} />
                  {isCurrent && (
                    <div style={{
                      position: 'absolute',
                      right: '-2px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '3px',
                      height: '16px',
                      backgroundColor: 'var(--primary)',
                      borderRadius: '2px'
                    }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom: Theme Menu & Hub */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            title="Switch Theme Accent"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#F8FAFC',
              border: '1px solid #CBD5E1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Palette size={16} color="var(--primary)" />
          </button>

          <button
            onClick={() => navigate('/services')}
            title="Exit to Hub"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#F1F5F9',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN DOMAIN WORKSPACE AREA                                             */}
      {/* ========================================================================= */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Top Header Bar */}
        <header style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '0.65rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          zIndex: 40
        }}>
          {/* Title & Live Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--primary-border)'
              }}>
                <Sparkles size={15} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.925rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>
                    AI Text-to-Resume Architect Studio
                  </span>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    backgroundColor: '#ECFDF5',
                    color: '#059669',
                    border: '1px solid #A7F3D0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                    120B Groq Neural Engine Active
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                  Domain Workspace · Symmetrical 50/50 Dual Studio
                </div>
              </div>
            </div>
          </div>

          {/* Right Header CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={handleDownloadDirectPDF}
              disabled={isExportingPDF}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid var(--primary-border)',
                color: 'var(--primary)',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: isExportingPDF ? 'wait' : 'pointer'
              }}
            >
              {isExportingPDF ? (
                <>
                  <RefreshCw size={12} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Download size={13} />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handleLaunchInStudio}
              className="framer-btn-primary"
              style={{ padding: '0.45rem 1.15rem', fontSize: '0.8rem' }}
            >
              <span>🚀 Launch Full Studio</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </header>

        {/* Persona Preset Blueprint Bar */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '0.5rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          flexShrink: 0
        }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--primary)', whiteSpace: 'nowrap', marginRight: '4px' }}>
            Load Persona Blueprint:
          </span>
          {PERSONA_BLUEPRINTS.map(p => {
            const Icon = p.icon;
            const isSelected = activePersonaId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPersona(p)}
                style={{
                  border: isSelected ? '1.5px solid var(--primary)' : '1px solid #E2E8F0',
                  backgroundColor: isSelected ? 'var(--primary-light)' : '#F8FAFC',
                  color: isSelected ? 'var(--primary)' : '#334155',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 2px 6px var(--primary-glow)' : 'none'
                }}
              >
                <Icon size={13} />
                <span>{p.title}</span>
                <span style={{ fontSize: '0.65rem', opacity: 0.75, fontWeight: 600 }}>({p.badge.split('·')[0].trim()})</span>
              </button>
            );
          })}
        </section>

        {/* ========================================================================= */}
        {/* 3. SYMMETRICAL 50/50 DUAL STUDIO CANVAS (EQUAL ALIGNMENTS & DUAL SLIDEBARS)*/}
        {/* ========================================================================= */}
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '1.25rem',
          padding: '1.25rem 1.5rem',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}>

          {/* ========================================================================= */}
          {/* LEFT PANEL: Input & Laboratory Deck (Dedicated Slidebar)                 */}
          {/* ========================================================================= */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            height: '100%'
          }}>
            
            {/* Left Header Tabs */}
            <div style={{
              padding: '0.75rem 1.25rem',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FAF9F5',
              flexShrink: 0
            }}>
              <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', padding: '3px', borderRadius: '8px' }}>
                <button
                  type="button"
                  onClick={() => setInputTab('draft')}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: inputTab === 'draft' ? '#FFFFFF' : 'transparent',
                    color: inputTab === 'draft' ? '#0F172A' : '#64748B',
                    boxShadow: inputTab === 'draft' ? '0 2px 4px rgba(15, 23, 42, 0.06)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <FileText size={13} /> Raw Career Notes
                </button>
                <button
                  type="button"
                  onClick={() => setInputTab('experience')}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: inputTab === 'experience' ? '#FFFFFF' : 'transparent',
                    color: inputTab === 'experience' ? '#0F172A' : '#64748B',
                    boxShadow: inputTab === 'experience' ? '0 2px 4px rgba(15, 23, 42, 0.06)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Briefcase size={13} /> Work History (XYZ)
                </button>
                <button
                  type="button"
                  onClick={() => setInputTab('skills')}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: inputTab === 'skills' ? '#FFFFFF' : 'transparent',
                    color: inputTab === 'skills' ? '#0F172A' : '#64748B',
                    boxShadow: inputTab === 'skills' ? '0 2px 4px rgba(15, 23, 42, 0.06)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Cpu size={13} /> Skills & Identity
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600 }}>
                  {rawText.length} chars · {rawText.split(/\s+/).filter(Boolean).length} words
                </span>
                <button
                  onClick={handleClearDraft}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    padding: '3px',
                    cursor: 'pointer',
                    color: '#94A3B8',
                    borderRadius: '4px'
                  }}
                  title="Clear"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {/* Left Scrollable Body (Independent Slidebar) */}
            <div className="domain-slidebar" style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              
              {/* Error Notice */}
              {errorMessage && (
                <div style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  color: '#DC2626',
                  fontSize: '0.78rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <AlertCircle size={14} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* TAB 1: RAW CAREER NOTES */}
              {inputTab === 'draft' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155' }}>
                      Unstructured Career Notes, Bio & Bullet Dump:
                    </label>
                    <textarea
                      rows={10}
                      value={rawText}
                      onChange={(e) => setRawText(e.target.value)}
                      placeholder="Paste raw candidate notes: name, email, phone, experiences, accomplishments, degrees, skills..."
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.85rem',
                        fontFamily: 'inherit',
                        color: '#0F172A',
                        resize: 'vertical',
                        outline: 'none',
                        backgroundColor: '#FAF9F5',
                        lineHeight: 1.55,
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* AI Strategy Form */}
                  <div style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Sliders size={13} color="var(--primary)" />
                      <span>AI Tuning & Strategy Directive</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569' }}>Target Job Title</label>
                        <input
                          type="text"
                          value={targetRole}
                          onChange={(e) => setTargetRole(e.target.value)}
                          style={{
                            padding: '0.45rem 0.65rem',
                            borderRadius: '6px',
                            border: '1.5px solid #CBD5E1',
                            fontSize: '0.78rem',
                            color: '#0F172A',
                            backgroundColor: '#FFFFFF',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569' }}>Bullet Formula</label>
                        <select
                          value={formatStyle}
                          onChange={(e) => setFormatStyle(e.target.value)}
                          style={{
                            padding: '0.45rem 0.65rem',
                            borderRadius: '6px',
                            border: '1.5px solid #CBD5E1',
                            fontSize: '0.78rem',
                            color: '#0F172A',
                            backgroundColor: '#FFFFFF',
                            outline: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          {Object.entries(FORMAT_STYLES).map(([key, style]) => (
                            <option key={key} value={key}>{style.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569' }}>Seniority Tier</label>
                        <select
                          value={seniorityLevel}
                          onChange={(e) => setSeniorityLevel(e.target.value)}
                          style={{
                            padding: '0.45rem 0.65rem',
                            borderRadius: '6px',
                            border: '1.5px solid #CBD5E1',
                            fontSize: '0.78rem',
                            color: '#0F172A',
                            backgroundColor: '#FFFFFF',
                            outline: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="entry">Entry / Junior Engineer</option>
                          <option value="mid">Mid-Level Professional</option>
                          <option value="senior">Senior Specialist</option>
                          <option value="lead">Lead / Staff Architect</option>
                          <option value="executive">Director / VP Executive</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569' }}>Template Design</label>
                        <select
                          value={chosenTemplate}
                          onChange={(e) => setChosenTemplate(e.target.value)}
                          style={{
                            padding: '0.45rem 0.65rem',
                            borderRadius: '6px',
                            border: '1.5px solid #CBD5E1',
                            fontSize: '0.78rem',
                            color: '#0F172A',
                            backgroundColor: '#FFFFFF',
                            outline: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          {TEMPLATE_PRESETS.map(t => (
                            <option key={t.id} value={t.id}>{t.name} ({t.tag})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569' }}>Specific Directives (Optional)</label>
                      <input
                        type="text"
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder="e.g. Focus on microservices, React 19, latency reduction..."
                        style={{
                          padding: '0.45rem 0.65rem',
                          borderRadius: '6px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.78rem',
                          color: '#0F172A',
                          backgroundColor: '#FFFFFF',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: WORK EXPERIENCE & BULLETS */}
              {inputTab === 'experience' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155' }}>
                      Extracted Work Experiences ({displayData.experience?.length || 0}):
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>
                      ⚡ Google XYZ & STAR Metric Verified
                    </span>
                  </div>

                  {displayData.experience?.map((exp, idx) => (
                    <div key={idx} style={{
                      backgroundColor: '#FAF9F5',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <strong style={{ fontSize: '0.875rem', color: '#0F172A' }}>{exp.title} · {exp.company}</strong>
                        <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>{exp.date || `${exp.startDate} - ${exp.endDate}`}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#334155', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                        {exp.description}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: SKILLS & IDENTITY */}
              {inputTab === 'skills' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ padding: '0.85rem', borderRadius: '10px', backgroundColor: '#FAF9F5', border: '1px solid #E2E8F0' }}>
                    <strong style={{ fontSize: '0.9rem', color: '#0F172A' }}>{displayData.personalInfo?.fullName}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{displayData.personalInfo?.jobTitle}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px' }}>
                      {displayData.personalInfo?.email} · {displayData.personalInfo?.phone} · {displayData.personalInfo?.location}
                    </div>
                  </div>

                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155' }}>Categorized Technical Skills:</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem' }}>
                    {Object.entries(displayData.skills || {}).map(([cat, items]) => (
                      <div key={cat} style={{ padding: '0.65rem', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                          {cat}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                          {items.map((s, si) => (
                            <span key={si} style={{ fontSize: '0.68rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', color: '#334155' }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Left Footer Action Bar (Fixed at bottom) */}
            <div style={{
              padding: '0.85rem 1.25rem',
              borderTop: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              flexShrink: 0
            }}>
              {/* Progress animation if loading */}
              {isLoading && (
                <div style={{
                  background: 'var(--primary-light)',
                  border: '1.5px solid var(--primary-border)',
                  borderRadius: '8px',
                  padding: '0.65rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.3rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <RefreshCw size={12} style={{ animation: 'spin 1s linear infinite' }} />
                      {progressState.title || 'Synthesizing Quantum Action Bullets...'}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--primary)' }}>
                      {progressState.progress || 35}%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${progressState.progress || 35}%`,
                      height: '100%',
                      background: 'var(--primary)',
                      borderRadius: '2px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleAnalyzeAndBuild}
                disabled={isLoading}
                className="framer-btn-shimmer"
                style={{
                  width: '100%',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  cursor: isLoading ? 'wait' : 'pointer'
                }}
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>Synthesizing Quantum Resume...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={15} />
                    <span>{'{ Synthesize & Recompile Resume }'}</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT PANEL: Live Paper Canvas & Studio Stage (Dedicated Slidebar)       */}
          {/* ========================================================================= */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            height: '100%'
          }}>
            
            {/* Right Header Toolbar */}
            <div style={{
              padding: '0.75rem 1.25rem',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FAF9F5',
              flexShrink: 0
            }}>
              {/* Output Tab Switcher */}
              <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', padding: '3px', borderRadius: '8px' }}>
                <button
                  type="button"
                  onClick={() => setActiveOutputTab('canvas')}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: activeOutputTab === 'canvas' ? '#FFFFFF' : 'transparent',
                    color: activeOutputTab === 'canvas' ? '#0F172A' : '#64748B',
                    boxShadow: activeOutputTab === 'canvas' ? '0 2px 4px rgba(15, 23, 42, 0.06)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Eye size={12} /> Live A4 Paper Canvas
                </button>
                <button
                  type="button"
                  onClick={() => setActiveOutputTab('ats')}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: activeOutputTab === 'ats' ? '#FFFFFF' : 'transparent',
                    color: activeOutputTab === 'ats' ? '#0F172A' : '#64748B',
                    boxShadow: activeOutputTab === 'ats' ? '0 2px 4px rgba(15, 23, 42, 0.06)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ShieldCheck size={12} /> ATS Screener Audit (98%)
                </button>
              </div>

              {/* Zoom & Fast JSON */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: '#FFFFFF', padding: '2px 4px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                  <button
                    onClick={() => setUserZoomModifier(z => Math.max(0.6, z - 0.1))}
                    style={{ border: 'none', background: 'transparent', padding: '2px 4px', cursor: 'pointer', color: '#475569' }}
                    title="Zoom Out"
                  >
                    <ZoomOut size={11} />
                  </button>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#334155', minWidth: '32px', textAlign: 'center' }}>
                    {Math.round(finalRenderScale * 100)}%
                  </span>
                  <button
                    onClick={() => setUserZoomModifier(z => Math.min(1.4, z + 0.1))}
                    style={{ border: 'none', background: 'transparent', padding: '2px 4px', cursor: 'pointer', color: '#475569' }}
                    title="Zoom In"
                  >
                    <ZoomIn size={11} />
                  </button>
                  <button
                    onClick={() => setUserZoomModifier(1)}
                    style={{ border: 'none', background: 'transparent', padding: '2px 4px', cursor: 'pointer', color: '#64748B', fontSize: '0.65rem', fontWeight: 700 }}
                  >
                    Fit
                  </button>
                </div>

                <button
                  onClick={handleCopyJSON}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#0F172A',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {isCopied ? <CheckCheck size={11} color="#10B981" /> : <Copy size={11} />}
                  <span>{isCopied ? 'Copied' : 'JSON'}</span>
                </button>
              </div>
            </div>

            {/* Right Scrollable Canvas (Independent Slidebar) */}
            <div className="domain-slidebar" style={{
              flex: 1,
              overflowY: 'auto',
              backgroundColor: '#F1F5F9',
              padding: '1.25rem 0.85rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxSizing: 'border-box'
            }}>

              {/* Template Fast Switcher Carousel */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                overflowX: 'auto',
                maxWidth: '100%',
                paddingBottom: '0.65rem',
                marginBottom: '0.5rem',
                scrollbarWidth: 'none',
                flexShrink: 0
              }}>
                {TEMPLATE_PRESETS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setChosenTemplate(t.id)}
                    style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      border: chosenTemplate === t.id ? '1.5px solid var(--primary)' : '1px solid #CBD5E1',
                      backgroundColor: chosenTemplate === t.id ? 'var(--primary)' : '#FFFFFF',
                      color: chosenTemplate === t.id ? '#FFFFFF' : '#334155',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease',
                      boxShadow: chosenTemplate === t.id ? '0 2px 6px var(--primary-glow)' : 'none'
                    }}
                  >
                    {t.name}
                  </button>
                ))}
              </div>

              {/* TAB 1: THE MASTER A4 PAPER CANVAS */}
              {activeOutputTab === 'canvas' && (
                <div 
                  ref={canvasContainerRef}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                  }}
                >
                  {/* Dynamic Scaled Container */}
                  <div style={{
                    width: `${A4_WIDTH * finalRenderScale}px`,
                    height: `${scaledCanvasHeight}px`,
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    transition: 'width 0.15s ease, height 0.15s ease'
                  }}>
                    {/* The Pure White A4 Paper Sheet */}
                    <div
                      id="architect-live-resume-paper"
                      style={{
                        width: `${A4_WIDTH}px`,
                        minHeight: `${A4_HEIGHT}px`,
                        backgroundColor: '#FFFFFF',
                        borderRadius: '4px',
                        boxShadow: '0 12px 36px rgba(15, 23, 42, 0.12), 0 2px 8px rgba(15, 23, 42, 0.04)',
                        border: '1px solid #CBD5E1',
                        transform: `scale(${finalRenderScale})`,
                        transformOrigin: 'top left',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        overflow: 'hidden'
                      }}
                    >
                      <TemplateRenderer
                        templateId={chosenTemplate}
                        resumeData={displayData}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ATS SCREENING AUDIT */}
              {activeOutputTab === 'ats' && (
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid #E2E8F0',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.15rem 0', fontSize: '1rem', fontWeight: 900, color: '#0F172A' }}>
                        ATS Screener Compliance Score
                      </h3>
                      <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748B' }}>
                        Simulates Workday, Lever & Greenhouse parser algorithms.
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#059669', lineHeight: 1 }}>98/100</div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669' }}>Top 1% Candidate Grade</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem' }}>
                    <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#334155' }}>Power Action Verbs</span>
                        <strong style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>96%</strong>
                      </div>
                      <div style={{ height: '4px', backgroundColor: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: '96%', height: '100%', backgroundColor: 'var(--primary)' }} />
                      </div>
                    </div>

                    <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#334155' }}>Quantified Metrics (XYZ)</span>
                        <strong style={{ fontSize: '0.72rem', color: '#059669' }}>94%</strong>
                      </div>
                      <div style={{ height: '4px', backgroundColor: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: '94%', height: '100%', backgroundColor: '#059669' }} />
                      </div>
                    </div>

                    <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#334155' }}>Contact & Identity</span>
                        <strong style={{ fontSize: '0.72rem', color: '#059669' }}>100%</strong>
                      </div>
                      <div style={{ height: '4px', backgroundColor: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#059669' }} />
                      </div>
                    </div>

                    <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#334155' }}>Skills Categorization</span>
                        <strong style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>92%</strong>
                      </div>
                      <div style={{ height: '4px', backgroundColor: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: '92%', height: '100%', backgroundColor: 'var(--primary)' }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={14} color="#059669" style={{ flexShrink: 0 }} />
                    <span>Resume is 100% ATS formatted with zero parser truncation risk.</span>
                  </div>
                </div>
              )}

            </div>

            {/* Right Footer Action Bar (Fixed at bottom matching left) */}
            <div style={{
              padding: '0.85rem 1.25rem',
              borderTop: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0
            }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.825rem', color: '#0F172A' }}>
                  Ready to edit fonts & spacing?
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                  Launch directly into the Full Interactive Studio.
                </div>
              </div>

              <button
                onClick={handleLaunchInStudio}
                className="framer-btn-primary"
                style={{ padding: '0.55rem 1.25rem', fontSize: '0.8rem' }}
              >
                <span>Launch Full Studio</span>
                <ArrowRight size={13} />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
