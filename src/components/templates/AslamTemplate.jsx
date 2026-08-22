import React from "react";

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
  const p = resumeData?.personalInfo || {};

  const personalInfo = {
    fullName: (p.fullName && p.fullName.trim()) || (p.firstName ? `${p.firstName || ''} ${p.lastName || ''}`.trim() : '') || '',
    jobTitle: (p.jobTitle && p.jobTitle.trim()) || '',
    email: (p.email && p.email.trim()) || '',
    phone: (p.phone && p.phone.trim()) || '',
    location: (p.location && p.location.trim()) || '',
    linkedin: (p.linkedin && p.linkedin.trim()) || '',
    github: (p.github && p.github.trim()) || '',
    website: (p.website && p.website.trim()) || '',
    summary: (p.summary && p.summary.trim()) || '',
  };

  const experience = (Array.isArray(resumeData?.experience) && resumeData.experience.length > 0 && resumeData.experience.some(e => e && (e.company || e.title || e.jobTitle)))
    ? resumeData.experience
    : [];

  const education = (Array.isArray(resumeData?.education) && resumeData.education.length > 0 && resumeData.education.some(e => e && (e.school || e.institution || e.degree)))
    ? resumeData.education
    : [];

  const projects = (Array.isArray(resumeData?.projects) && resumeData.projects.length > 0 && resumeData.projects.some(pr => pr && (pr.name || pr.title || pr.description)))
    ? resumeData.projects
    : [];

  const certifications = (Array.isArray(resumeData?.certifications) && resumeData.certifications.length > 0 && resumeData.certifications.some(c => c && (c.name || c.title)))
    ? resumeData.certifications
    : [];

  const languages = (Array.isArray(resumeData?.languages) && resumeData.languages.length > 0 && resumeData.languages.some(l => l && (typeof l === 'string' ? l.trim() : l.name)))
    ? resumeData.languages
    : [];

  const customSections = Array.isArray(resumeData?.customSections) ? resumeData.customSections : [];
  const settings = resumeData?.settings || {};

  const primaryColor = settings.primaryColor || "#1E3A8A";
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

  // Format skills nicely
  const getSkillsList = () => {
    const rawSkills = resumeData?.skills;
    if (!rawSkills) return [];
    if (Array.isArray(rawSkills)) {
      return rawSkills.map((sk, index) => {
        if (typeof sk === "object" && sk !== null) {
          const skillName = sk.name || "";
          if (skillName.includes(":")) {
            const parts = skillName.split(":");
            return { name: parts[0].trim(), value: parts.slice(1).join(":").trim() };
          }
          return { name: skillName, value: sk.value || "" };
        }
        if (typeof sk === "string") {
          if (sk.includes(":")) {
            const parts = sk.split(":");
            return { name: parts[0].trim(), value: parts.slice(1).join(":").trim() };
          }
          return { name: sk, value: "" };
        }
        return { name: `Skills`, value: String(sk) };
      }).filter(s => s.name || s.value);
    }
    if (typeof rawSkills === "object") {
      const result = [];
      const categoryLabels = {
        programming: 'Programming Languages',
        frameworks: 'Backend & Development',
        databases: 'Databases',
        cloud: 'Core Computer Science',
        tools: 'Tools & Technologies',
        soft: 'Soft Skills',
        other: 'Other Skills'
      };
      for (const [cat, items] of Object.entries(rawSkills)) {
        if (Array.isArray(items) && items.length > 0) {
          const names = items.map(it => typeof it === 'object' ? it.name : it).filter(Boolean);
          if (names.length > 0) {
            result.push({ name: categoryLabels[cat] || cat, value: names.join(', ') });
          }
        }
      }
      return result;
    }
    return [];
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
  if (personalInfo.website) {
    contactItems.push(<span key="website">{personalInfo.website}</span>);
  }

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#ffffff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        padding: "3rem 3.5rem",
        fontFamily: "var(--resume-font-family, inherit)",
        color: "#000000",
        lineHeight: "1.4",
        fontSize: "12px",
      }}
    >
      {/* Centered Blue Header Name */}
      {(personalInfo.fullName || contactItems.length > 0) && (
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          {personalInfo.fullName && (
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
          )}
          {personalInfo.jobTitle && (
            <div style={{ fontSize: "12px", color: "#475569", fontWeight: "600", marginBottom: "0.3rem" }}>
              {personalInfo.jobTitle}
            </div>
          )}

          {/* Contact details separated by pipes */}
          {contactItems.length > 0 && (
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
          )}
        </div>
      )}

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
                      {exp.title || exp.jobTitle}
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
                    {proj.name || proj.title}
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
                  {parseMarkdownBold(cert.name || cert.title)}
                  {cert.issuer ? ` — ${cert.issuer}` : ""}
                  {cert.date ? ` (${cert.date})` : ""}
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
                      {edu.degree || edu.fieldOfStudy || ""}
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
                  <strong>{typeof lang === 'object' ? lang.name : String(lang)}</strong>{" "}
                  {typeof lang === 'object' && lang.proficiency ? `(${lang.proficiency})` : ""}
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
              .filter((sec) => sec && sec.title)
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
