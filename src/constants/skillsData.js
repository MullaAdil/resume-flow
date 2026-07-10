// Categorized global skills dataset for the Builder Flow

export const PROGRAMMING_LANGUAGES = [
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "C", "Go", "Rust", 
  "Ruby", "PHP", "Swift", "Kotlin", "Dart", "R", "Scala", "Perl", "Haskell", 
  "Lua", "Objective-C", "Assembly", "MATLAB", "SQL", "NoSQL", "Bash", "Shell", "PowerShell", "Julia", "CUDA"
];

export const FRAMEWORKS_AND_LIBRARIES = [
  "React", "Next.js", "Angular", "Vue.js", "Nuxt.js", "Svelte", "Ember.js", "Solid.js",
  "React Native", "Flutter", "Ionic", "Xamarin", "Node.js", "Express.js", "NestJS", 
  "Django", "Flask", "FastAPI", "Spring Boot", "ASP.NET Core", "Ruby on Rails", 
  "Laravel", "Symfony", "Fiber", "Gin", "Echo", "Actix", "Rocket", "Tailwind CSS", 
  "Bootstrap", "Material-UI", "Chakra UI", "Redux", "GraphQL", "Apollo", "jQuery",
  "PyTorch", "TensorFlow", "Keras", "JAX", "Hugging Face Transformers", "LangChain", 
  "LlamaIndex", "CrewAI", "AutoGen", "Scikit-learn", "Pandas", "NumPy", "SciPy", "OpenCV", "SpaCy", "NLTK"
];

export const DATABASES = [
  "PostgreSQL", "MySQL", "MongoDB", "SQLite", "MariaDB", "Oracle", "Microsoft SQL Server",
  "Redis", "Elasticsearch", "Cassandra", "DynamoDB", "Firebase Realtime DB", "Firestore",
  "Supabase", "Neo4j", "CouchDB", "InfluxDB", "Snowflake", "BigQuery", "Redshift",
  "Pinecone", "Milvus", "ChromaDB", "Weaviate", "Qdrant", "pgvector", "Faiss"
];

export const CLOUD_AND_DEVOPS = [
  "Amazon Web Services (AWS)", "Google Cloud Platform (GCP)", "Microsoft Azure", 
  "DigitalOcean", "Heroku", "Vercel", "Netlify", "Cloudflare", "Docker", 
  "Kubernetes", "Terraform", "Ansible", "Puppet", "Chef", "Jenkins", "GitHub Actions", 
  "GitLab CI/CD", "CircleCI", "Travis CI", "Bitbucket Pipelines", "Prometheus", 
  "Grafana", "Datadog", "New Relic", "Splunk", "Nginx", "Apache", "Linux", "Unix",
  "Vertex AI", "AWS SageMaker", "Azure ML", "MLflow", "DVC", "Kubeflow", "Weights & Biases (W&B)"
];

export const TOOLS_AND_SOFTWARE = [
  "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Trello", "Asana", "Confluence",
  "Figma", "Sketch", "Adobe XD", "Photoshop", "Illustrator", "Postman", "Swagger",
  "Insomnia", "Webpack", "Vite", "Babel", "ESLint", "Prettier", "npm", "Yarn", "pnpm",
  "Docker Desktop", "VS Code", "IntelliJ IDEA", "Eclipse", "Android Studio", "Xcode",
  "Jupyter Notebooks", "Google Colab", "LangSmith", "LangFuse", "Hugging Face Spaces"
];

export const SOFT_SKILLS = [
  "Leadership", "Communication", "Problem Solving", "Teamwork", "Time Management",
  "Critical Thinking", "Adaptability", "Conflict Resolution", "Emotional Intelligence",
  "Mentorship", "Public Speaking", "Project Management", "Negotiation", "Agile Methodologies",
  "Scrum", "Kanban"
];

export const OTHER_SKILLS = [
  "Machine Learning", "Deep Learning", "Artificial Intelligence", "Data Analysis", 
  "Data Science", "Computer Vision", "Natural Language Processing", "Blockchain", 
  "Web3", "Smart Contracts", "IoT", "Cybersecurity", "Penetration Testing", "Cryptography",
  "UI/UX Design", "Game Development", "Unity", "Unreal Engine", "AR/VR",
  "AI Pipelines", "RAG (Retrieval-Augmented Generation)", "Agentic AI", "LLM Fine-tuning", "Prompt Engineering", "MLOps"
];

// Helper to convert arrays to react-select options
export const toOptions = (array) => array.map(item => ({ value: item, label: item }));

// Grouped exports for specific categories
export const SKILL_OPTIONS_BY_CATEGORY = {
  programming: toOptions(PROGRAMMING_LANGUAGES),
  frameworks: toOptions(FRAMEWORKS_AND_LIBRARIES),
  databases: toOptions(DATABASES),
  cloud: toOptions(CLOUD_AND_DEVOPS),
  tools: toOptions(TOOLS_AND_SOFTWARE),
  soft: toOptions(SOFT_SKILLS),
  other: toOptions(OTHER_SKILLS)
};

// Aggregated list for Project Technologies (flattened from all tech categories)
export const ALL_TECH_OPTIONS = toOptions([
  ...PROGRAMMING_LANGUAGES,
  ...FRAMEWORKS_AND_LIBRARIES,
  ...DATABASES,
  ...CLOUD_AND_DEVOPS,
  ...TOOLS_AND_SOFTWARE,
  ...OTHER_SKILLS
].sort());

// Project technology suggestions mapping based on keywords
export const PROJECT_SUGGESTIONS = [
  {
    keywords: ['e-commerce', 'ecommerce', 'online store', 'shop', 'cart', 'stripe', 'billing'],
    techs: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Stripe', 'Redux', 'Tailwind CSS', 'PostgreSQL']
  },
  {
    keywords: ['chatbot', 'chat bot', 'ai assistant', 'llm', 'openai', 'langchain', 'llamaindex', 'gpt', 'rag', 'agentic', 'copilot'],
    techs: ['Python', 'FastAPI', 'LangChain', 'OpenAI API', 'LlamaIndex', 'Pinecone', 'ChromaDB', 'React', 'PyTorch']
  },
  {
    keywords: ['portfolio', 'personal website', 'resume website', 'landing page', 'profile website'],
    techs: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'HTML5', 'CSS3', 'JavaScript']
  },
  {
    keywords: ['data pipeline', 'etl', 'big data', 'data ingestion', 'spark', 'hadoop', 'pipeline', 'dataflow'],
    techs: ['Python', 'Apache Spark', 'Airflow', 'BigQuery', 'Snowflake', 'PostgreSQL', 'AWS S3', 'GCP', 'MLflow']
  },
  {
    keywords: ['mobile app', 'ios app', 'android app', 'react native', 'flutter', 'mobile application'],
    techs: ['React Native', 'Flutter', 'Firebase', 'Swift', 'Kotlin', 'Dart', 'TypeScript']
  },
  {
    keywords: ['machine learning', 'deep learning', 'ml', 'ai', 'computer vision', 'nlp', 'prediction', 'classification', 'object detection'],
    techs: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'Jupyter Notebooks', 'FastAPI']
  },
  {
    keywords: ['game', 'unity', 'unreal', 'rpg', 'fps', 'gaming'],
    techs: ['Unity', 'C#', 'Unreal Engine', 'C++', 'Blender']
  },
  {
    keywords: ['blog', 'cms', 'wordpress', 'headless', 'news website'],
    techs: ['Next.js', 'React', 'GraphQL', 'Tailwind CSS', 'Sanity.io', 'Strapi', 'PostgreSQL']
  },
  {
    keywords: ['real-time', 'realtime', 'chat app', 'collaboration', 'websocket', 'socket', 'messenger'],
    techs: ['React', 'Node.js', 'Express.js', 'Socket.io', 'WebSockets', 'MongoDB', 'Redis']
  },
  {
    keywords: ['social media', 'instagram', 'twitter', 'facebook', 'linkedin clone', 'reddit'],
    techs: ['React', 'Node.js', 'GraphQL', 'PostgreSQL', 'Redis', 'Firebase', 'Tailwind CSS']
  },
  {
    keywords: ['dashboard', 'analytics', 'bi', 'visualization', 'charts', 'report'],
    techs: ['React', 'Vite', 'D3.js', 'Chart.js', 'Tailwind CSS', 'PostgreSQL', 'Node.js']
  },
  {
    keywords: ['blockchain', 'cryptocurrency', 'web3', 'smart contract', 'ethereum', 'solidity', 'nft'],
    techs: ['Solidity', 'Ethereum', 'Web3.js', 'Hardhat', 'React', 'TypeScript', 'Node.js']
  }
];

/**
 * Returns suggested technologies for a project based on its name.
 * @param {string} projectName 
 * @returns {string[]}
 */
export const getSuggestedTechs = (projectName) => {
  if (!projectName || typeof projectName !== 'string') return [];
  const normalized = projectName.toLowerCase();
  const matched = new Set();
  
  for (const group of PROJECT_SUGGESTIONS) {
    if (group.keywords.some(keyword => normalized.includes(keyword))) {
      group.techs.forEach(tech => matched.add(tech));
    }
  }
  
  return Array.from(matched);
};

// Worldwide common job roles for autocomplete
export const WORLDWIDE_JOB_ROLES = [
  "Software Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Engineer",
  "Mobile App Developer",
  "DevOps Engineer",
  "Site Reliability Engineer (SRE)",
  "Data Scientist",
  "Data Analyst",
  "Business Analyst",
  "Machine Learning Engineer",
  "AI Engineer",
  "Product Manager",
  "Project Manager",
  "Scrum Master",
  "UI/UX Designer",
  "Product Designer",
  "QA Engineer",
  "Test Automation Engineer",
  "Cybersecurity Engineer",
  "Cloud Architect",
  "Database Administrator (DBA)",
  "System Administrator",
  "Solution Architect",
  "Technical Lead",
  "Engineering Manager",
  "Director of Engineering",
  "Marketing Manager",
  "Sales Representative",
  "HR Specialist",
  "Content Writer",
  "Graphic Designer"
];

// Mapping of job roles to recommended skills
export const ROLE_SUGGESTIONS = [
  {
    role: "Frontend Engineer",
    keywords: ["front", "ui", "react", "angular", "vue", "frontend", "web developer", "website"],
    techs: ["React", "TypeScript", "JavaScript", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Redux", "Figma", "Vite"]
  },
  {
    role: "Backend Engineer",
    keywords: ["back", "api", "node", "backend", "python developer", "java developer", "database"],
    techs: ["Node.js", "Express.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Docker", "REST API", "SQL"]
  },
  {
    role: "Full Stack Engineer",
    keywords: ["fullstack", "full stack", "mern", "mean"],
    techs: ["React", "Node.js", "Express.js", "MongoDB", "TypeScript", "JavaScript", "PostgreSQL", "Docker", "Tailwind CSS", "Git"]
  },
  {
    role: "Machine Learning / AI Engineer",
    keywords: ["ml", "machine learning", "ai", "artificial intelligence", "deep learning", "nlp", "computer vision"],
    techs: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "FastAPI", "Jupyter Notebooks", "LangChain", "OpenAI API"]
  },
  {
    role: "Data Scientist",
    keywords: ["data scientist", "data science"],
    techs: ["Python", "R", "SQL", "Pandas", "NumPy", "Scikit-learn", "Tableau", "Jupyter Notebooks", "Spark", "Data Analysis"]
  },
  {
    role: "Data Analyst",
    keywords: ["data analyst", "business analyst", "bi", "analytics"],
    techs: ["SQL", "Excel", "Tableau", "Power BI", "Python", "Pandas", "Data Analysis", "Communication", "Problem Solving"]
  },
  {
    role: "DevOps / SRE Engineer",
    keywords: ["devops", "sre", "site reliability", "infrastructure", "cloud engineer", "sysops"],
    techs: ["Docker", "Kubernetes", "Amazon Web Services (AWS)", "Terraform", "GitHub Actions", "Linux", "Bash", "Jenkins", "Ansible", "Prometheus"]
  },
  {
    role: "Mobile App Developer",
    keywords: ["mobile", "ios", "android", "react native", "flutter", "swift", "kotlin"],
    techs: ["React Native", "Flutter", "Swift", "Kotlin", "TypeScript", "Dart", "Xcode", "Android Studio", "Firebase"]
  },
  {
    role: "UI/UX Designer",
    keywords: ["design", "ui/ux", "ux", "designer", "product designer"],
    techs: ["Figma", "Sketch", "Adobe XD", "Photoshop", "Illustrator", "UI/UX Design", "Wireframing", "Prototyping", "User Research"]
  },
  {
    role: "Cybersecurity Engineer",
    keywords: ["cyber", "security", "penetration", "ethical hacker", "cryptography"],
    techs: ["Linux", "Python", "Cybersecurity", "Penetration Testing", "Wireshark", "Metasploit", "Cryptography", "Network Security", "Bash"]
  },
  {
    role: "Product Manager",
    keywords: ["product manager", "scrum master", "project manager", "agile", "scrum"],
    techs: ["Jira", "Confluence", "Agile Methodologies", "Scrum", "Product Management", "Leadership", "Communication", "Trello"]
  },
  {
    role: "Database Administrator (DBA)",
    keywords: ["dba", "database admin", "database administrator"],
    techs: ["PostgreSQL", "MySQL", "Oracle", "Microsoft SQL Server", "SQL", "Database Design", "Performance Tuning", "Linux"]
  }
];

/**
 * Returns suggested technologies/skills based on a job title.
 * @param {string} jobTitle 
 * @returns {string[]}
 */
export const getTechsForRole = (jobTitle) => {
  if (!jobTitle || typeof jobTitle !== 'string') return [];
  const normalized = jobTitle.toLowerCase();
  const matched = new Set();
  
  for (const group of ROLE_SUGGESTIONS) {
    if (normalized.includes(group.role.toLowerCase()) || group.keywords.some(keyword => normalized.includes(keyword))) {
      group.techs.forEach(tech => matched.add(tech));
    }
  }
  
  return Array.from(matched);
};

