// Categorized global skills dataset for the Builder Flow

export const PROGRAMMING_LANGUAGES = [
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "C", "Go", "Rust", 
  "Ruby", "PHP", "Swift", "Kotlin", "Dart", "R", "Scala", "Perl", "Haskell", 
  "Lua", "Objective-C", "Assembly", "MATLAB", "SQL", "NoSQL", "Bash", "Shell", "PowerShell"
];

export const FRAMEWORKS_AND_LIBRARIES = [
  "React", "Next.js", "Angular", "Vue.js", "Nuxt.js", "Svelte", "Ember.js", "Solid.js",
  "React Native", "Flutter", "Ionic", "Xamarin", "Node.js", "Express.js", "NestJS", 
  "Django", "Flask", "FastAPI", "Spring Boot", "ASP.NET Core", "Ruby on Rails", 
  "Laravel", "Symfony", "Fiber", "Gin", "Echo", "Actix", "Rocket", "Tailwind CSS", 
  "Bootstrap", "Material-UI", "Chakra UI", "Redux", "GraphQL", "Apollo", "jQuery"
];

export const DATABASES = [
  "PostgreSQL", "MySQL", "MongoDB", "SQLite", "MariaDB", "Oracle", "Microsoft SQL Server",
  "Redis", "Elasticsearch", "Cassandra", "DynamoDB", "Firebase Realtime DB", "Firestore",
  "Supabase", "Neo4j", "CouchDB", "InfluxDB", "Snowflake", "BigQuery", "Redshift"
];

export const CLOUD_AND_DEVOPS = [
  "Amazon Web Services (AWS)", "Google Cloud Platform (GCP)", "Microsoft Azure", 
  "DigitalOcean", "Heroku", "Vercel", "Netlify", "Cloudflare", "Docker", 
  "Kubernetes", "Terraform", "Ansible", "Puppet", "Chef", "Jenkins", "GitHub Actions", 
  "GitLab CI/CD", "CircleCI", "Travis CI", "Bitbucket Pipelines", "Prometheus", 
  "Grafana", "Datadog", "New Relic", "Splunk", "Nginx", "Apache", "Linux", "Unix"
];

export const TOOLS_AND_SOFTWARE = [
  "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Trello", "Asana", "Confluence",
  "Figma", "Sketch", "Adobe XD", "Photoshop", "Illustrator", "Postman", "Swagger",
  "Insomnia", "Webpack", "Vite", "Babel", "ESLint", "Prettier", "npm", "Yarn", "pnpm",
  "Docker Desktop", "VS Code", "IntelliJ IDEA", "Eclipse", "Android Studio", "Xcode"
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
  "UI/UX Design", "Game Development", "Unity", "Unreal Engine", "AR/VR"
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
