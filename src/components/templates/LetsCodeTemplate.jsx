import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export const localDummyData = {
  personalInfo: {
    fullName: "Lets Code",
    email: "letscode@lets-code.co.in",
    phone: "",
    location: "New Delhi, India",
    linkedin: "LinkedIn",
    github: "GitHub",
    portfolio: "Portfolio",
    leetcode: "LeetCode",
    codechef: "CodeChef",
    jobTitle: "",
  },
  education: [
    {
      id: "letscode-edu-1",
      degree: "B.Tech - Computer Science & Engineering, 8.6 CGPA",
      school: "ABC University",
      date: "2020 - 2024",
      location: "",
    },
    {
      id: "letscode-edu-2",
      degree: "Class XII - CBSE, 94.2%",
      school: "XYZ Senior Secondary School",
      date: "2020",
      location: "",
    },
  ],
  skills: [
    {
      name: "COURSEWORK",
      value:
        "Data Structures and Algorithms, Object Oriented Programming, Web Development, Database Management System, Operating System",
    },
    {
      name: "LANGUAGES",
      value: "C/C++, Java, JavaScript, TypeScript, Python, SQL",
    },
    {
      name: "TECHNOLOGIES",
      value:
        "React, Next.js, Node.js, Express, MongoDB, PostgreSQL, Redis, AWS, Docker, Git",
    },
    {
      name: "SOFT SKILLS",
      value: "Leadership, Teamwork, Time Management, Problem Solving",
    },
  ],
  experience: [
    {
      id: "letscode-exp-1",
      title: "SOFTWARE ENGINEER",
      company: "LETS CODE",
      date: "Jul 2024 - Present",
      location: "New Delhi, India",
      description:
        "Built placement prep platform serving 50K+ students with DSA roadmaps, mock tests, and AI-powered resume tools.\nDesigned Node.js APIs handling 20K+ requests/day with 99.9% uptime using MongoDB and Redis caching.\nDeveloped AI Resume Optimizer, Cover Letter Generator, and Job Finder - cutting application time by 60%.",
    },
    {
      id: "letscode-exp-2",
      title: "SOFTWARE ENGINEERING INTERN",
      company: "LETS CODE",
      date: "Jan 2024 - Jun 2024",
      location: "",
      description:
        "Built PYQ pages and interview experience modules, increasing organic traffic by 35%.\nIntegrated Clerk auth and built user dashboard with profile, bookmarks, and progress tracking.",
    },
  ],
  projects: [
    {
      id: "letscode-proj-1",
      name: "LETS CODE - PLACEMENT PREP PLATFORM",
      technologies:
        "Next.js, TypeScript, Node.js, Express, MongoDB, Clerk, Tailwind CSS",
      description:
        "Full-stack platform with 500+ PYQs, AI resume studio, mock tests, job board, and interview experiences.",
    },
    {
      id: "letscode-proj-2",
      name: "AI RESUME STUDIO",
      technologies: "Next.js, Claude API, jsPDF, MongoDB",
      description:
        "ATS resume analyser that scores, edits inline, runs AI rewrites, and exports as PDF or DOCX.",
    },
  ],
  certifications: [
    {
      id: "letscode-award-1",
      name: "Smart India Hackathon 2023 Finalist - Top 50 teams nationally.",
    },
    {
      id: "letscode-award-2",
      name: "AWS Cloud Practitioner Certified (2024).",
    },
    {
      id: "letscode-award-3",
      name: "Solved 600+ problems on LeetCode - Max Rating 1920.",
    },
    {
      id: "letscode-award-4",
      name: "Winner - college-level Code Sprint 2023.",
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

const LetsCodeTemplate = ({ resumeData }) => {
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
  const primaryColor = settings.primaryColor || "#000000";
  const marginPadding =
    settings.margins === "Compact"
      ? "1.5rem 2rem"
      : settings.margins === "Spacious"
        ? "3rem 3.5rem"
        : "2rem 2.5rem";

  const headerLine = (
    <div
      style={{
        width: "100%",
        height: "1.5px",
        background: "#000000",
        margin: "0.4rem 0 0.6rem 0",
      }}
    ></div>
  );

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
      return { name: `SKILL GROUP ${index + 1}`, value: String(sk) };
    });
  };
  const activeSkills = getSkillsList();

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#ffffff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        padding: "3.5rem 3.5rem",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: "#000000",
        lineHeight: "1.4",
        fontSize: "12px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            color: "#000000",
            margin: "0 0 0.4rem 0",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {personalInfo.fullName}
        </h1>

        {/* Contact Links in subhead */}
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.4rem",
            fontSize: "11px",
            color: "#64748b",
          }}
        >
          {personalInfo.email && (
            <span style={{ color: "#000000", textDecoration: "underline" }}>
              {personalInfo.email}
            </span>
          )}
          {personalInfo.linkedin && (
            <>
              <span style={{ color: "#cbd5e1" }}>|</span>
              <span style={{ color: "#000000", textDecoration: "underline" }}>
                {personalInfo.linkedin}
              </span>
            </>
          )}
          {personalInfo.github && (
            <>
              <span style={{ color: "#cbd5e1" }}>|</span>
              <span style={{ color: "#000000", textDecoration: "underline" }}>
                {personalInfo.github}
              </span>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span style={{ color: "#cbd5e1" }}>|</span>
              <span style={{ color: "#000000", textDecoration: "underline" }}>
                {personalInfo.portfolio}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Two Column Layout Split */}
      <div style={{ display: "flex", gap: "2.5rem" }}>
        {/* Left Column (Education, Links, Skills) */}
        <div
          style={{
            width: "38%",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Education */}
          {settings.showEducation !== false &&
            education &&
            education.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    margin: 0,
                    color: "#000000",
                    letterSpacing: "0.5px",
                  }}
                >
                  EDUCATION
                </h3>
                {headerLine}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.8rem",
                  }}
                >
                  {education.map((edu, idx) => (
                    <div key={edu.id || idx}>
                      <div style={{ fontWeight: "bold", color: "#000000" }}>
                        {edu.school || edu.institution}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#475569",
                          marginTop: "0.1rem",
                        }}
                      >
                        {edu.degree}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#64748b",
                          marginTop: "0.1rem",
                        }}
                      >
                        {edu.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Links Section */}
          <div>
            <h3
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                textTransform: "uppercase",
                margin: 0,
                color: "#000000",
                letterSpacing: "0.5px",
              }}
            >
              LINKS
            </h3>
            {headerLine}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
                fontSize: "11.5px",
              }}
            >
              {personalInfo.linkedin && (
                <span style={{ textDecoration: "underline", color: "#000000" }}>
                  {personalInfo.linkedin}
                </span>
              )}
              {personalInfo.github && (
                <span style={{ textDecoration: "underline", color: "#000000" }}>
                  {personalInfo.github}
                </span>
              )}
              {personalInfo.portfolio && (
                <span style={{ textDecoration: "underline", color: "#000000" }}>
                  {personalInfo.portfolio}
                </span>
              )}
              {personalInfo.leetcode && (
                <span style={{ textDecoration: "underline", color: "#000000" }}>
                  {personalInfo.leetcode}
                </span>
              )}
              {personalInfo.codechef && (
                <span style={{ textDecoration: "underline", color: "#000000" }}>
                  {personalInfo.codechef}
                </span>
              )}
            </div>
          </div>

          {/* Skills (Coursework, Languages, Technologies) */}
          {settings.showSkills !== false && activeSkills.length > 0 && (
            <div>
              <h3
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  margin: 0,
                  color: "#000000",
                  letterSpacing: "0.5px",
                }}
              >
                SKILLS
              </h3>
              {headerLine}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {activeSkills.map((sk, idx) => (
                  <div key={idx} style={{ fontSize: "11px" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "#000000",
                        textTransform: "uppercase",
                        marginBottom: "0.15rem",
                      }}
                    >
                      {sk.name}
                    </div>
                    <div style={{ color: "#475569", lineHeight: "1.3" }}>
                      {sk.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Experience, Projects, Awards) */}
        <div
          style={{
            width: "62%",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Experience */}
          {settings.showExperience !== false &&
            experience &&
            experience.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    margin: 0,
                    color: "#000000",
                    letterSpacing: "0.5px",
                  }}
                >
                  EXPERIENCE
                </h3>
                {headerLine}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  {experience.map((exp, idx) => (
                    <div key={exp.id || idx}>
                      <div style={{ fontWeight: "bold", color: "#000000" }}>
                        {exp.company}{" "}
                        <span
                          style={{ fontWeight: "normal", color: "#64748b" }}
                        >
                          | {exp.title}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#64748b",
                          margin: "0.1rem 0 0.3rem 0",
                        }}
                      >
                        {exp.date} {exp.location ? `| ${exp.location}` : ""}
                      </div>
                      {exp.description && (
                        <ul
                          style={{
                            margin: "0 0 0 1rem",
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
                              {parseMarkdownBold(
                                bullet.replace(/^[•-\s]+/, ""),
                              )}
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
          {settings.showProjects !== false &&
            projects &&
            projects.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    margin: 0,
                    color: "#000000",
                    letterSpacing: "0.5px",
                  }}
                >
                  PROJECTS
                </h3>
                {headerLine}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  {projects.map((proj, idx) => (
                    <div key={proj.id || idx}>
                      <div style={{ fontWeight: "bold", color: "#000000" }}>
                        {proj.name}{" "}
                        {proj.technologies && (
                          <span
                            style={{
                              fontWeight: "normal",
                              color: "#64748b",
                              fontSize: "11px",
                            }}
                          >
                            | {proj.technologies}
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
                              {parseMarkdownBold(
                                bullet.replace(/^[•-\s]+/, ""),
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Awards / Achievements */}
          {settings.showCertifications !== false &&
            certifications &&
            certifications.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    margin: 0,
                    color: "#000000",
                    letterSpacing: "0.5px",
                  }}
                >
                  AWARDS
                </h3>
                {headerLine}
                <ul
                  style={{
                    margin: "0 0 0 1rem",
                    padding: 0,
                    fontSize: "11px",
                    listStyleType: "disc",
                    color: "#000000",
                    lineHeight: "1.4",
                  }}
                >
                  {certifications.map((cert, idx) => (
                    <li
                      key={cert.id || idx}
                      style={{ marginBottom: "0.2rem", paddingLeft: "0.2rem" }}
                    >
                      {parseMarkdownBold(cert.name)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Custom Sections */}
          {settings.showCustomSections !== false &&
            customSections &&
            customSections.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                }}
              >
                {customSections
                  .filter((sec) => sec.title)
                  .map((sec, idx) => (
                    <div key={sec.id || idx}>
                      <h3
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          margin: 0,
                          color: "#000000",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {sec.title}
                      </h3>
                      {headerLine}
                      {sec.description && (
                        <ul
                          style={{
                            margin: "0 0 0 1.2rem",
                            padding: 0,
                            fontSize: "11px",
                            listStyleType: "disc",
                            color: "#000000",
                            lineHeight: "1.4",
                          }}
                        >
                          {sec.description.split("\n").map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              style={{
                                marginBottom: "0.2rem",
                                paddingLeft: "0.2rem",
                              }}
                            >
                              {parseMarkdownBold(
                                bullet.replace(/^[•-\s]+/, ""),
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default LetsCodeTemplate;
