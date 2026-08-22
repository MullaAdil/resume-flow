import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const MultiColorTemplate = ({ resumeData }) => {
  const data = resumeData || {};
  const personalInfo = data.personalInfo || {};
  const settings = data.settings || {};

  const marginPadding =
    settings.margins === "Compact"
      ? "1.5rem 2rem"
      : settings.margins === "Spacious"
        ? "3rem 3.5rem"
        : "2rem 2.5rem";

  const blueColor = settings.primaryColor || "#1e40af";
  const badgeColor = "#1d4ed8";

  const experience = (Array.isArray(data.experience) && data.experience.length > 0 && data.experience.some(e => e && (e.company || e.title || e.jobTitle)))
    ? data.experience
    : [];

  const education = (Array.isArray(data.education) && data.education.length > 0 && data.education.some(e => e && (e.school || e.degree)))
    ? data.education
    : [];

  const projects = (Array.isArray(data.projects) && data.projects.length > 0 && data.projects.some(pr => pr && (pr.name || pr.title || pr.description)))
    ? data.projects
    : [];

  const getSkillsArray = () => {
    const raw = data.skills;
    if (!raw) return [];
    if (Array.isArray(raw)) {
      return raw.map(s => typeof s === 'object' ? s.name || s.value || '' : String(s)).filter(Boolean);
    }
    if (typeof raw === 'object') {
      return Object.values(raw).flat().map(s => typeof s === 'object' ? s.name || s.value || '' : String(s)).filter(Boolean);
    }
    return [];
  };
  const activeSkills = getSkillsArray();

  const hasContacts = personalInfo.phone || personalInfo.email || personalInfo.location || personalInfo.website || personalInfo.linkedin || personalInfo.github;

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#fff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        padding: marginPadding,
        fontFamily: "var(--resume-font-family, inherit)",
        color: "#333",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      {(personalInfo.fullName || hasContacts) && (
        <div style={{ marginBottom: "1.5rem" }}>
          {personalInfo.fullName && (
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "normal",
                color: blueColor,
                marginBottom: "0.5rem",
              }}
            >
              {personalInfo.fullName}
            </h1>
          )}
          {personalInfo.jobTitle && (
            <div style={{ fontSize: "1rem", color: "#64748b", fontWeight: 600, marginBottom: "0.5rem" }}>
              {personalInfo.jobTitle}
            </div>
          )}
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "#cbd5e1",
              marginBottom: "0.5rem",
            }}
          ></div>
          {hasContacts && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1.5rem",
                color: "#475569",
                fontSize: "0.85rem",
                flexWrap: "wrap",
                background: "#f8fafc",
                padding: "0.5rem 0",
              }}
            >
              {personalInfo.phone && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <Phone size={14} color="#64748b" /> {personalInfo.phone}
                </div>
              )}
              {personalInfo.email && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <Mail size={14} color="#64748b" /> {personalInfo.email}
                </div>
              )}
              {personalInfo.location && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <MapPin size={14} color="#64748b" /> {personalInfo.location}
                </div>
              )}
              {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <Globe size={14} color="#64748b" /> {personalInfo.website || personalInfo.linkedin || personalInfo.github}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {settings.showSummary !== false && personalInfo.summary && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: "1px solid #cbd5e1",
              paddingBottom: "0.2rem",
              marginBottom: "0.8rem",
            }}
          >
            Professional Summary
          </h3>
          <p style={{ lineHeight: 1.5, fontSize: "0.85rem", color: "#1f2937", margin: 0 }}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Skills */}
      {settings.showSkills !== false && activeSkills.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: "1px solid #cbd5e1",
              paddingBottom: "0.2rem",
              marginBottom: "0.8rem",
            }}
          >
            Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {activeSkills.map((skill, index) => (
              <span
                key={index}
                style={{
                  border: "1px solid #94a3b8",
                  padding: "0.2rem 0.6rem",
                  fontSize: "0.8rem",
                  color: "#334155",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {settings.showExperience !== false && experience.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: "1px solid #cbd5e1",
              paddingBottom: "0.2rem",
              marginBottom: "0.8rem",
            }}
          >
            Experience
          </h3>

          {experience.map((exp, idx) => (
            <div key={exp.id || idx} style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  color: "#111",
                  marginBottom: "0.1rem",
                }}
              >
                {exp.company}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#333",
                    fontStyle: "italic",
                  }}
                >
                  {exp.title || exp.jobTitle}
                </div>
                {(exp.date || exp.startDate || exp.endDate) && (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      background: badgeColor,
                      color: "white",
                      padding: "0.1rem 0.5rem",
                      borderRadius: "1rem",
                    }}
                  >
                    {exp.date || (exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : exp.startDate || exp.endDate)}
                  </span>
                )}
              </div>

              {exp.description && (
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#334155",
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {exp.description.split("\n").map((line, i) =>
                    line.trim().length > 0 ? (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          marginBottom: "0.3rem",
                        }}
                      >
                        <span style={{ color: blueColor }}>•</span>{" "}
                        <span>{line}</span>
                      </div>
                    ) : null,
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {settings.showProjects !== false && projects.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: "1px solid #cbd5e1",
              paddingBottom: "0.2rem",
              marginBottom: "0.8rem",
            }}
          >
            Projects
          </h3>
          {projects.map((proj, idx) => (
            <div key={proj.id || idx} style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  color: "#111",
                  marginBottom: "0.1rem",
                }}
              >
                {proj.name || proj.title}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#333",
                    fontStyle: "italic",
                  }}
                >
                  {proj.technologies}
                </div>
                {(proj.duration || proj.date) && (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      background: badgeColor,
                      color: "white",
                      padding: "0.1rem 0.5rem",
                      borderRadius: "1rem",
                    }}
                  >
                    {proj.duration || proj.date}
                  </span>
                )}
              </div>
              {proj.description && (
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#334155",
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {proj.description.split("\n").map((line, i) =>
                    line.trim().length > 0 ? (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          marginBottom: "0.3rem",
                        }}
                      >
                        <span style={{ color: blueColor }}>•</span>{" "}
                        <span>{line}</span>
                      </div>
                    ) : null,
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {settings.showEducation !== false && education.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: "1px solid #cbd5e1",
              paddingBottom: "0.2rem",
              marginBottom: "0.8rem",
            }}
          >
            Education
          </h3>
          {education.map((edu, idx) => (
            <div key={edu.id || idx} style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  color: "#111",
                }}
              >
                {edu.school || edu.institution}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "0.85rem", color: "#333" }}>
                  {edu.degree || edu.fieldOfStudy || ''}
                </div>
                {(edu.date || edu.startDate || edu.endDate) && (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      background: badgeColor,
                      color: "white",
                      padding: "0.1rem 0.5rem",
                      borderRadius: "1rem",
                    }}
                  >
                    {edu.date || (edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.startDate || edu.endDate)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiColorTemplate;
