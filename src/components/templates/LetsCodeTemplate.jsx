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

const LetsCodeTemplate = ({ resumeData }) => {
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
    portfolio: (p.portfolio && p.portfolio.trim()) || '',
    leetcode: (p.leetcode && p.leetcode.trim()) || '',
    codechef: (p.codechef && p.codechef.trim()) || '',
    summary: (p.summary && p.summary.trim()) || '',
  };

  const experience = (Array.isArray(resumeData?.experience) && resumeData.experience.length > 0 && resumeData.experience.some(e => e && (e.company || e.title || e.jobTitle)))
    ? resumeData.experience
    : [];

  const education = (Array.isArray(resumeData?.education) && resumeData.education.length > 0 && resumeData.education.some(e => e && (e.school || e.degree)))
    ? resumeData.education
    : [];

  const projects = (Array.isArray(resumeData?.projects) && resumeData.projects.length > 0 && resumeData.projects.some(pr => pr && (pr.name || pr.title || pr.description)))
    ? resumeData.projects
    : [];

  const certifications = (Array.isArray(resumeData?.certifications) && resumeData.certifications.length > 0 && resumeData.certifications.some(c => c && (c.name || c.title)))
    ? resumeData.certifications
    : [];

  const customSections = Array.isArray(resumeData?.customSections) ? resumeData.customSections : [];
  const settings = resumeData?.settings || {};

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
        return { name: `SKILL GROUP ${index + 1}`, value: String(sk) };
      }).filter(s => s.name || s.value);
    }
    if (typeof rawSkills === "object") {
      const result = [];
      const categoryLabels = {
        programming: 'LANGUAGES',
        frameworks: 'TECHNOLOGIES',
        databases: 'DATABASES',
        cloud: 'COURSEWORK',
        tools: 'TOOLS',
        soft: 'SOFT SKILLS',
        other: 'OTHER SKILLS'
      };
      for (const [cat, items] of Object.entries(rawSkills)) {
        if (Array.isArray(items) && items.length > 0) {
          const names = items.map(it => typeof it === 'object' ? it.name : it).filter(Boolean);
          if (names.length > 0) {
            result.push({ name: categoryLabels[cat] || cat.toUpperCase(), value: names.join(', ') });
          }
        }
      }
      return result;
    }
    return [];
  };
  const activeSkills = getSkillsList();

  const hasLinks = personalInfo.linkedin || personalInfo.github || personalInfo.portfolio || personalInfo.leetcode || personalInfo.codechef || personalInfo.website;
  const hasLeftCol = (settings.showEducation !== false && education.length > 0) || hasLinks || (settings.showSkills !== false && activeSkills.length > 0);
  const hasRightCol = (settings.showExperience !== false && experience.length > 0) || (settings.showProjects !== false && projects.length > 0) || (settings.showCertifications !== false && certifications.length > 0) || (settings.showCustomSections !== false && customSections.length > 0);

  const contactHeaderItems = [];
  if (personalInfo.email) {
    contactHeaderItems.push(
      <span key="email" style={{ color: "#000000", textDecoration: "underline" }}>
        {personalInfo.email}
      </span>
    );
  }
  if (personalInfo.phone) {
    contactHeaderItems.push(<span key="phone">{personalInfo.phone}</span>);
  }
  if (personalInfo.location) {
    contactHeaderItems.push(<span key="loc">{personalInfo.location}</span>);
  }

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#ffffff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        padding: "3.5rem 3.5rem",
        fontFamily: "var(--resume-font-family, inherit)",
        color: "#000000",
        lineHeight: "1.4",
        fontSize: "12px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      {(personalInfo.fullName || contactHeaderItems.length > 0) && (
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          {personalInfo.fullName && (
            <h1
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                color: "#000000",
                margin: "0 0 0.3rem 0",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {personalInfo.fullName}
            </h1>
          )}

          {personalInfo.jobTitle && (
            <div style={{ fontSize: "12px", color: "#475569", fontWeight: "600", marginBottom: "0.4rem" }}>
              {personalInfo.jobTitle}
            </div>
          )}

          {/* Contact Links in subhead */}
          {contactHeaderItems.length > 0 && (
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
              {contactHeaderItems.reduce((acc, item, idx) => {
                if (idx === 0) return [item];
                return [
                  ...acc,
                  <span key={`sep-${idx}`} style={{ color: "#cbd5e1" }}>
                    |
                  </span>,
                  item,
                ];
              }, [])}
            </div>
          )}
        </div>
      )}

      {/* Summary if present */}
      {settings.showSummary !== false && personalInfo.summary && (
        <div style={{ marginBottom: "1.2rem" }}>
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
            SUMMARY
          </h3>
          {headerLine}
          <p style={{ fontSize: "11.5px", color: "#334155", margin: 0, lineHeight: "1.5" }}>
            {parseMarkdownBold(personalInfo.summary)}
          </p>
        </div>
      )}

      {/* Two Column Layout Split */}
      <div style={{ display: "flex", gap: "2.5rem" }}>
        {/* Left Column (Education, Links, Skills) */}
        {hasLeftCol && (
          <div
            style={{
              width: hasRightCol ? "38%" : "100%",
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
                          {edu.date ||
                            (edu.startDate && edu.endDate
                              ? `${edu.startDate} - ${edu.endDate}`
                              : edu.startDate || edu.endDate || "")}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Links Section */}
            {hasLinks && (
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
                  {personalInfo.website && (
                    <span style={{ textDecoration: "underline", color: "#000000" }}>
                      {personalInfo.website}
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
            )}

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
        )}

        {/* Right Column (Experience, Projects, Awards) */}
        {hasRightCol && (
          <div
            style={{
              width: hasLeftCol ? "62%" : "100%",
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
                            | {exp.title || exp.jobTitle}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#64748b",
                            margin: "0.1rem 0 0.3rem 0",
                          }}
                        >
                          {exp.date ||
                            (exp.startDate && exp.endDate
                              ? `${exp.startDate} - ${exp.endDate}`
                              : exp.startDate || exp.endDate || "")}{" "}
                          {exp.location ? `| ${exp.location}` : ""}
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
                          {proj.name || proj.title}{" "}
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

            {/* Certifications / Awards */}
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
                    AWARDS & CERTIFICATIONS
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
                        {parseMarkdownBold(cert.name || cert.title)}
                        {cert.issuer ? ` — ${cert.issuer}` : ""}
                        {cert.date ? ` (${cert.date})` : ""}
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
                    .filter((sec) => sec && sec.title)
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
        )}
      </div>
    </div>
  );
};

export default LetsCodeTemplate;
