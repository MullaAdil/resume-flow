import React from "react";

import { Mail, Phone, MapPin, Globe } from "lucide-react";

export const localDummyData = {
  personalInfo: {
    fullName: "JOHN DOE",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    jobTitle: "Software Engineer",
  },
  skills: [
    { name: "Programming Languages", value: "Python, JavaScript, Java" },
    {
      name: "Core Computer Science",
      value:
        "Data Structures & Algorithms, Object-Oriented Programming (OOP), Computer Networking",
    },
    {
      name: "Backend & Development",
      value: "Node.js, REST API Development, MVC Architecture",
    },
    { name: "Databases", value: "PostgreSQL, MongoDB, Redis" },
    {
      name: "Tools & Technologies",
      value: "Git, GitHub, Docker, VS Code, AWS, CI/CD",
    },
  ],
  projects: [
    {
      id: "dummy-proj-1",
      name: "E-Commerce Platform - Full Stack Web Application",
      technologies: "React | Node.js | MongoDB | Docker",
      description:
        "Designed and developed a full-stack e-commerce application from scratch with secure user authentication (login, register, session management)\nBuilt backend architecture following MVC pattern with REST API endpoints for create, read, update, and delete operations\nImplemented database with normalized schema for efficient data storage and retrieval across multiple user accounts\nWrote automated end-to-end test suite using Selenium WebDriver to simulate real user interactions including form submissions, navigation, and authentication flows\nContainerized the entire application using Docker ensuring consistent deployment across different environments with zero configuration issues\nIdentified and resolved a hardcoded credential vulnerability during development — applied OWASP Top 10 security principles to harden the application",
    },
    {
      id: "dummy-proj-2",
      name: "Smart Home Dashboard - Capstone Project",
      technologies: "Python | React | IoT Sensors | WebSockets",
      description:
        "Designed and built a real-time smart home monitoring system as final year capstone project, integrating hardware and software components end to end\nAssembled hardware circuit with temperature sensors connected to microcontroller for detecting environmental changes simultaneously\nDeveloped Python backend to receive and process live sensor data via WebSockets, updating dashboard status in real time\nDocumented full system architecture including circuit diagrams, data flow, and test results for academic submission",
    },
    {
      id: "dummy-proj-3",
      name: "Customer Churn Predictor - Machine Learning",
      technologies: "Python | Scikit-learn | Pandas | Flask",
      description:
        "Built a binary classification model using Random Forest and XGBoost algorithms, achieving 92%+ accuracy on held-out test data\nEngineered full data preprocessing pipeline — missing value imputation, feature scaling, one-hot encoding — to convert raw data into model-ready features\nDeployed real-time prediction interface using Flask for live customer risk assessment",
    },
    {
      id: "dummy-proj-4",
      name: "Sales Data Analysis - Enterprise Database",
      technologies: "PostgreSQL | Advanced SQL | PowerBI",
      description:
        "Conducted end-to-end business data analysis on enterprise sample database simulating a real retail company dataset\nAnalysed revenue performance, customer lifetime value, product profitability, store efficiency, and time-based sales trends across the full dataset\nWrote advanced SQL queries using multi-table joins, correlated subqueries, CTEs, and window functions for ranking, cumulative totals, and segmentation\nDerived actionable insights including top revenue-generating products, high-value customer segments, underperforming regions, and peak sales periods",
    },
  ],
  certifications: [
    {
      id: "dummy-cert-1",
      name: "AWS Certified Solutions Architect - Associate",
    },
    {
      id: "dummy-cert-2",
      name: "Google Cloud Professional Cloud Developer",
    },
    {
      id: "dummy-cert-3",
      name: "Cisco - Networking & Python Essentials (Cisco Networking Academy)",
    },
    { id: "dummy-cert-4", name: "Microsoft Fundamentals - Coursera" },
  ],
  education: [
    {
      id: "dummy-edu-1",
      degree: "B.S. - Computer Science",
      school: "University of California, Berkeley",
      date: "Aug 2018 - May 2022",
      location: "",
    },
    {
      id: "dummy-edu-2",
      degree: "High School Diploma - STEM Focus",
      school: "Lincoln High School, San Francisco",
      date: "Aug 2014 - May 2018",
      location: "",
    },
  ],
};

const parseMarkdownBold = (text) => {
  if (!text) return "";
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} style={{ fontWeight: "bold" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const AslamTemplate = ({ resumeData }) => {
  const hasUserData =
    resumeData?.personalInfo?.fullName &&
    resumeData.personalInfo.fullName.trim().length > 0;
  const activeData = hasUserData ? resumeData : localDummyData;
  const {
    personalInfo,
    experience,
    education,
    skills,
    certifications,
    languages,
    projects,
    customSections,
  } = activeData;
  const settings = resumeData?.settings || {};

  const primaryColor = settings.primaryColor || "#1E3A8A";
  const marginPadding =
    settings.margins === "Compact"
      ? "1.5rem 2rem"
      : settings.margins === "Spacious"
        ? "3rem 3.5rem"
        : "2rem 2.5rem"; // Dark Blue
  const divider = (
    <div
      style={{
        width: "100%",
        height: "1.5px",
        background: primaryColor,
        margin: "0.2rem 0 0.5rem 0",
      }}
    ></div>
  );

  // Format skills nicely without confidence levels
  const getSkillsList = () => {
    const rawSkills = Array.isArray(skills) ? skills : [];
    return rawSkills.map((sk, index) => {
      if (typeof sk === "object") {
        const skillName = sk.name || "";
        if (skillName.includes(":")) {
          const parts = skillName.split(":");
          const name = parts[0].trim();
          const value = parts.slice(1).join(":").trim();
          return { name, value };
        }
        return { name: skillName, value: sk.value || "" };
      }
      if (typeof sk === "string") {
        if (sk.includes(":")) {
          const parts = sk.split(":");
          return {
            name: parts[0].trim(),
            value: parts.slice(1).join(":").trim(),
          };
        }
        return { name: sk, value: "" };
      }
      return { name: `Skill Group ${index + 1}`, value: String(sk) };
    });
  };
  const activeSkills = getSkillsList();

  // Clean contact details array
  const contactItems = [];
  if (personalInfo.email) {
    contactItems.push(
      <a
        key="email"
        href={`mailto:${personalInfo.email}`}
        style={{ color: "#1d4ed8", textDecoration: "none" }}
      >
        {personalInfo.email}
      </a>,
    );
  }
  if (personalInfo.phone) {
    contactItems.push(<span key="phone">{personalInfo.phone}</span>);
  }
  if (personalInfo.github) {
    const githubDisplay = personalInfo.github.replace(
      /^(https?:\/\/)?(www\.)?/,
      "",
    );
    contactItems.push(
      <a
        key="github"
        href={`https://${githubDisplay}`}
        target="_blank"
        rel="noreferrer"
        style={{ color: "#1d4ed8", textDecoration: "none" }}
      >
        {githubDisplay}
      </a>,
    );
  }
  if (personalInfo.linkedin) {
    const linkedinDisplay = personalInfo.linkedin.replace(
      /^(https?:\/\/)?(www\.)?/,
      "",
    );
    contactItems.push(
      <a
        key="linkedin"
        href={`https://${linkedinDisplay}`}
        target="_blank"
        rel="noreferrer"
        style={{ color: "#1d4ed8", textDecoration: "none" }}
      >
        {linkedinDisplay}
      </a>,
    );
  }
  if (personalInfo.location) {
    contactItems.push(<span key="location">{personalInfo.location}</span>);
  }

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#ffffff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        padding: "3rem 3.5rem",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: "#000000",
        lineHeight: "1.4",
        fontSize: "12px",
      }}
    >
      {/* Centered Blue Header Name */}
      <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: primaryColor,
            margin: "0 0 0.2rem 0",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {personalInfo.fullName}
        </h1>

        {/* Contact details separated by pipes */}
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            fontSize: "11px",
            color: "#000000",
          }}
        >
          {contactItems.reduce((acc, item, idx) => {
            if (idx === 0) return [item];
            return [
              ...acc,
              <span
                key={`sep-${idx}`}
                style={{ color: "#94a3b8", margin: "0 0.4rem" }}
              >
                |
              </span>,
              item,
            ];
          }, [])}
        </div>
      </div>

      {/* Summary */}
      {settings.showSummary !== false && personalInfo.summary && (
        <div style={{ marginBottom: "1rem" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              color: primaryColor,
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            SUMMARY
          </h3>
          {divider}
          <p
            style={{
              fontSize: "11px",
              color: "#000000",
              textAlign: "justify",
              margin: 0,
              lineHeight: "1.4",
            }}
          >
            {parseMarkdownBold(personalInfo.summary)}
          </p>
        </div>
      )}

      {/* Technical Skills */}
      {settings.showSkills !== false && activeSkills.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              color: primaryColor,
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            TECHNICAL SKILLS
          </h3>
          {divider}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}
          >
            {activeSkills.map((sk, index) => (
              <div
                key={index}
                style={{
                  fontSize: "11px",
                  color: "#000000",
                  marginBottom: "0.15rem",
                }}
              >
                <span style={{ marginRight: "0.35rem" }}>•</span>
                <strong style={{ fontWeight: "bold" }}>
                  {sk.name}
                  {sk.value ? ": " : ""}
                </strong>
                {sk.value && (
                  <span style={{ fontWeight: "normal" }}>{sk.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {settings.showExperience !== false &&
        experience &&
        experience.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                color: primaryColor,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              WORK EXPERIENCE
            </h3>
            {divider}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              {experience.map((exp, index) => (
                <div key={exp.id || index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", color: "#000000" }}>
                      {exp.title}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#000000",
                        fontWeight: "normal",
                      }}
                    >
                      {exp.date ||
                        (exp.startDate && exp.endDate
                          ? `${exp.startDate} - ${exp.endDate}`
                          : exp.startDate || exp.endDate || "")}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      fontSize: "11px",
                      marginTop: "0.1rem",
                    }}
                  >
                    <span style={{ color: "#475569", fontWeight: "normal" }}>
                      {exp.company}
                    </span>
                    {exp.location && (
                      <span style={{ color: "#64748b" }}>{exp.location}</span>
                    )}
                  </div>
                  {exp.description && (
                    <ul
                      style={{
                        margin: "0.2rem 0 0 1.2rem",
                        padding: 0,
                        fontSize: "11px",
                        listStyleType: "disc",
                        color: "#000000",
                        lineHeight: "1.4",
                      }}
                    >
                      {exp.description.split("\n").map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          style={{
                            marginBottom: "0.2rem",
                            paddingLeft: "0.2rem",
                          }}
                        >
                          {parseMarkdownBold(bullet.replace(/^[•-\s]+/, ""))}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Projects */}
      {settings.showProjects !== false && projects && projects.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              color: primaryColor,
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            PROJECTS
          </h3>
          {divider}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
          >
            {projects.map((proj, index) => (
              <div key={proj.id || index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "12px",
                  }}
                >
                  <span style={{ fontWeight: "bold", color: "#000000" }}>
                    {proj.name}
                  </span>
                  {proj.technologies && (
                    <span
                      style={{
                        fontSize: "10.5px",
                        color: "#475569",
                        fontWeight: "normal",
                        border: "1px solid #cbd5e1",
                        borderRadius: "4px",
                        padding: "2px 8px",
                        background: "#f8fafc",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        marginLeft: "1rem",
                      }}
                    >
                      {proj.technologies}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <ul
                    style={{
                      margin: "0.2rem 0 0 1.2rem",
                      padding: 0,
                      fontSize: "11px",
                      listStyleType: "disc",
                      color: "#000000",
                      lineHeight: "1.4",
                    }}
                  >
                    {proj.description.split("\n").map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        style={{
                          marginBottom: "0.2rem",
                          paddingLeft: "0.2rem",
                        }}
                      >
                        {parseMarkdownBold(bullet.replace(/^[•-\s]+/, ""))}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {settings.showCertifications !== false &&
        certifications &&
        certifications.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                color: primaryColor,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              CERTIFICATIONS
            </h3>
            {divider}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              {certifications.map((cert, index) => (
                <div
                  key={cert.id || index}
                  style={{
                    fontSize: "11px",
                    color: "#000000",
                    marginBottom: "0.15rem",
                  }}
                >
                  <span style={{ marginRight: "0.35rem" }}>•</span>
                  {parseMarkdownBold(cert.name)}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Education */}
      {settings.showEducation !== false &&
        education &&
        education.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                color: primaryColor,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              EDUCATION
            </h3>
            {divider}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              {education.map((edu, index) => (
                <div key={edu.id || index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", color: "#000000" }}>
                      {edu.degree || "Degree"}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#000000",
                        fontWeight: "normal",
                      }}
                    >
                      {edu.date ||
                        (edu.startDate && edu.endDate
                          ? `${edu.startDate} - ${edu.endDate}`
                          : edu.startDate || edu.endDate || "")}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      fontSize: "11px",
                      marginTop: "0.1rem",
                    }}
                  >
                    <span style={{ color: "#475569", fontWeight: "normal" }}>
                      {edu.school || edu.institution}
                    </span>
                    {edu.location && (
                      <span style={{ color: "#64748b" }}>{edu.location}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Languages */}
      {settings.showLanguages !== false &&
        languages &&
        languages.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                color: primaryColor,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              LANGUAGES
            </h3>
            {divider}
            <div style={{ fontSize: "11px", color: "#000000" }}>
              {languages.map((lang, index) => (
                <span key={index}>
                  <strong>{lang.name}</strong>{" "}
                  {lang.proficiency ? `(${lang.proficiency})` : ""}
                  {index < languages.length - 1 && (
                    <span style={{ color: "#cbd5e1", margin: "0 0.75rem" }}>
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

      {/* Custom Sections */}
      {settings.showCustomSections !== false &&
        customSections &&
        customSections.length > 0 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {customSections
              .filter((sec) => sec.title)
              .map((sec, idx) => (
                <div key={sec.id || idx} style={{ marginBottom: "1rem" }}>
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: primaryColor,
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    {sec.title}
                  </h3>
                  {divider}
                  {sec.description && (
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#000000",
                        lineHeight: "1.4",
                      }}
                    >
                      {sec.description.split("\n").map((line, bIdx) => {
                        const cleanLine = line.replace(/^[•-\s]+/, "");
                        if (!cleanLine) return null;
                        return (
                          <div
                            key={bIdx}
                            style={{
                              display: "flex",
                              gap: "0.4rem",
                              marginBottom: "0.15rem",
                            }}
                          >
                            <span style={{ fontSize: "8px", marginTop: "4px" }}>
                              •
                            </span>
                            <span>{parseMarkdownBold(cleanLine)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
    </div>
  );
};

export default AslamTemplate;
