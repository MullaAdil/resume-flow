import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const JanetTemplate = ({ resumeData }) => {
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

  const education = (Array.isArray(resumeData?.education) && resumeData.education.length > 0 && resumeData.education.some(e => e && (e.school || e.degree)))
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
  const primaryColor = settings.primaryColor || "#0F172A";
  const marginPadding =
    settings.margins === "Compact"
      ? "1.5rem 2rem"
      : settings.margins === "Spacious"
        ? "3rem 3.5rem"
        : "2rem 2.5rem";

  const divider = (
    <div
      style={{
        width: "100%",
        height: "1.2px",
        background: "#e2e8f0",
        margin: "0.6rem 0",
      }}
    ></div>
  );

  const getSkillsArray = () => {
    const raw = resumeData?.skills;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.filter(Boolean);
    if (typeof raw === 'object') return Object.values(raw).flat().filter(Boolean);
    return [];
  };
  const activeSkills = getSkillsArray();

  const formatLocation = (loc) => {
    if (!loc) return "";
    return loc.replace(/,/, " ,");
  };

  const hasContacts = personalInfo.location || personalInfo.phone || personalInfo.email || personalInfo.linkedin || personalInfo.github || personalInfo.website;

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#ffffff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        padding: marginPadding,
        fontFamily: "var(--resume-font-family, inherit)",
        color: "#0f172a",
        lineHeight: "1.4",
        fontSize: "12px",
        boxSizing: "border-box",
      }}
    >
      {/* Centered Modern Header */}
      {(personalInfo.fullName || hasContacts) && (
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          {personalInfo.fullName && (
            <h1
              style={{
                fontSize: "26px",
                fontWeight: "800",
                color: primaryColor,
                margin: "0 0 0.15rem 0",
                letterSpacing: "-0.5px",
              }}
            >
              {personalInfo.fullName}
            </h1>
          )}
          {personalInfo.jobTitle && (
            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#64748b",
                marginBottom: "0.5rem",
              }}
            >
              {personalInfo.jobTitle}
            </div>
          )}

          {/* Contact Details with Icons */}
          {hasContacts && (
            <div
              style={{
                display: "inline-flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.5rem 1.25rem",
                fontSize: "11px",
                color: "#475569",
              }}
            >
              {personalInfo.location && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <MapPin size={11} color="#64748b" />{" "}
                  {formatLocation(personalInfo.location)}
                </span>
              )}
              {personalInfo.phone && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <Phone size={11} color="#64748b" /> {personalInfo.phone}
                </span>
              )}
              {personalInfo.email && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <Mail size={11} color="#64748b" /> {personalInfo.email}
                </span>
              )}
              {personalInfo.linkedin && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <Globe size={11} color="#64748b" /> {personalInfo.linkedin}
                </span>
              )}
              {personalInfo.github && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <Globe size={11} color="#64748b" /> {personalInfo.github}
                </span>
              )}
              {personalInfo.website && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <Globe size={11} color="#64748b" /> {personalInfo.website}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {settings.showSummary !== false && personalInfo.summary && (
        <div style={{ marginBottom: "1.25rem" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "700",
              textTransform: "uppercase",
              color: primaryColor,
              margin: "0 0 0.2rem 0",
              letterSpacing: "0.5px",
            }}
          >
            Summary
          </h3>
          {divider}
          <p
            style={{
              fontSize: "12px",
              color: "#334155",
              textAlign: "justify",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {settings.showExperience !== false &&
        experience &&
        experience.length > 0 && (
          <div style={{ marginBottom: "1.25rem" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "700",
                textTransform: "uppercase",
                color: primaryColor,
                margin: "0 0 0.2rem 0",
                letterSpacing: "0.5px",
              }}
            >
              Experience
            </h3>
            {divider}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.9rem",
              }}
            >
              {experience.map((exp, index) => (
                <div key={exp.id || index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      fontSize: "12.5px",
                    }}
                  >
                    <span style={{ fontWeight: "700", color: primaryColor }}>
                      {exp.title || exp.jobTitle}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        fontWeight: "500",
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
                      fontSize: "11.5px",
                      marginTop: "0.1rem",
                    }}
                  >
                    <span style={{ color: "#475569", fontWeight: "600" }}>
                      {exp.company}
                    </span>
                    <span style={{ color: "#64748b" }}>{exp.location}</span>
                  </div>
                  {exp.description && (
                    <ul
                      style={{
                        margin: "0.25rem 0 0 1rem",
                        padding: 0,
                        fontSize: "11.5px",
                        listStyleType: "disc",
                      }}
                    >
                      {exp.description.split("\n").map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          style={{
                            color: "#334155",
                            marginBottom: "0.15rem",
                            paddingLeft: "0.2rem",
                          }}
                        >
                          {bullet.replace(/^[•-\s]+/, "")}
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
        <div style={{ marginBottom: "1.25rem" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "700",
              textTransform: "uppercase",
              color: primaryColor,
              margin: "0 0 0.2rem 0",
              letterSpacing: "0.5px",
            }}
          >
            Projects
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
                    alignItems: "baseline",
                    fontSize: "12.5px",
                  }}
                >
                  <span style={{ fontWeight: "700", color: primaryColor }}>
                    {proj.name || proj.title}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    {proj.duration || proj.date}
                  </span>
                </div>
                {proj.technologies && (
                  <div style={{ fontSize: "11px", color: "#64748b", marginTop: "0.1rem" }}>
                    {proj.technologies}
                  </div>
                )}
                {proj.description && (
                  <ul
                    style={{
                      margin: "0.25rem 0 0 1rem",
                      padding: 0,
                      fontSize: "11.5px",
                      listStyleType: "disc",
                    }}
                  >
                    {proj.description.split("\n").map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        style={{
                          color: "#334155",
                          marginBottom: "0.15rem",
                          paddingLeft: "0.2rem",
                        }}
                      >
                        {bullet.replace(/^[•-\s]+/, "")}
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
      {settings.showCertifications !== false && certifications && certifications.length > 0 && (
        <div style={{ marginBottom: "1.25rem" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "700",
              textTransform: "uppercase",
              color: primaryColor,
              margin: "0 0 0.2rem 0",
              letterSpacing: "0.5px",
            }}
          >
            Certifications
          </h3>
          {divider}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {certifications.map((cert, index) => (
              <div key={cert.id || index} style={{ fontSize: "12px", color: "#334155" }}>
                <span>• <strong style={{ color: primaryColor }}>{cert.name || cert.title}</strong></span>
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
          <div style={{ marginBottom: "1.25rem" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "700",
                textTransform: "uppercase",
                color: primaryColor,
                margin: "0 0 0.2rem 0",
                letterSpacing: "0.5px",
              }}
            >
              Education
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
                      fontSize: "12.5px",
                    }}
                  >
                    <span style={{ fontWeight: "700", color: primaryColor }}>
                      {edu.degree || edu.fieldOfStudy || ""}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        fontWeight: "500",
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
                      fontSize: "11.5px",
                      marginTop: "0.1rem",
                    }}
                  >
                    <span style={{ color: "#475569", fontWeight: "600" }}>
                      {edu.school || edu.institution}
                    </span>
                    <span style={{ color: "#64748b" }}>{edu.location}</span>
                  </div>
                  {edu.details && (
                    <ul
                      style={{
                        margin: "0.25rem 0 0 1rem",
                        padding: 0,
                        fontSize: "11.5px",
                        listStyleType: "disc",
                      }}
                    >
                      <li style={{ color: "#334155", paddingLeft: "0.2rem" }}>
                        {edu.details}
                      </li>
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Skills */}
      {settings.showSkills !== false && activeSkills.length > 0 && (
        <div style={{ marginBottom: "1.25rem" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "700",
              textTransform: "uppercase",
              color: primaryColor,
              margin: "0 0 0.2rem 0",
              letterSpacing: "0.5px",
            }}
          >
            Skills
          </h3>
          {divider}
          <div
            style={{ fontSize: "12px", color: "#334155", lineHeight: "1.5" }}
          >
            {activeSkills
              .map((s) => (typeof s === "object" ? s.name : s))
              .join(", ")}
          </div>
        </div>
      )}

      {/* Languages */}
      {settings.showLanguages !== false &&
        languages &&
        languages.length > 0 && (
          <div style={{ marginBottom: "1.25rem" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "700",
                textTransform: "uppercase",
                color: primaryColor,
                margin: "0 0 0.2rem 0",
                letterSpacing: "0.5px",
              }}
            >
              Languages
            </h3>
            {divider}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                fontSize: "12px",
              }}
            >
              {languages.map((lang, index) => (
                <span key={index} style={{ color: "#334155" }}>
                  <strong>{typeof lang === 'object' ? lang.name : String(lang)}</strong>{" "}
                  {typeof lang === 'object' && lang.proficiency ? `(${lang.proficiency})` : ""}
                  {index < languages.length - 1 && (
                    <span style={{ color: "#cbd5e1", marginLeft: "1rem" }}>
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
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              marginTop: "1.25rem",
            }}
          >
            {customSections
              .filter((sec) => sec && sec.title)
              .map((sec, idx) => (
                <div key={sec.id || idx} style={{ marginBottom: "1.25rem" }}>
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      color: primaryColor,
                      margin: "0 0 0.2rem 0",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {sec.title}
                  </h3>
                  {divider}
                  {sec.description && (
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#334155",
                        lineHeight: "1.5",
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
                            <span>{cleanLine}</span>
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

export default JanetTemplate;
