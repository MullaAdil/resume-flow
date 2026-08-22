import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const BasicTemplate = ({ resumeData }) => {
  const data = resumeData || {};
  const personalInfo = data.personalInfo || {};
  const settings = data.settings || {};

  const marginPadding =
    settings.margins === "Compact"
      ? "1.5rem 2rem"
      : settings.margins === "Spacious"
        ? "3rem 3.5rem"
        : "2rem 2.5rem";

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
        color: "#111",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      {(personalInfo.fullName || hasContacts) && (
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          {personalInfo.fullName && (
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                margin: "0 0 0.2rem 0",
              }}
            >
              {personalInfo.fullName}
            </h1>
          )}
          {personalInfo.jobTitle && (
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: "normal",
                margin: "0 0 0.8rem 0",
                color: "#475569",
              }}
            >
              {personalInfo.jobTitle}
            </h2>
          )}

          {hasContacts && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "1.5rem",
                fontSize: "0.8rem",
                color: "#333",
              }}
            >
              {personalInfo.phone && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <Phone size={12} /> {personalInfo.phone}
                </div>
              )}
              {personalInfo.email && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <Mail size={12} /> {personalInfo.email}
                </div>
              )}
              {personalInfo.location && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <MapPin size={12} /> {personalInfo.location}
                </div>
              )}
              {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <Globe size={12} /> {personalInfo.website || personalInfo.linkedin || personalInfo.github}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {settings.showSummary !== false && personalInfo.summary && (
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
              letterSpacing: "1px",
            }}
          >
            Summary
          </h3>
          <p style={{ lineHeight: 1.6, fontSize: "0.85rem", margin: 0 }}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Skills */}
      {settings.showSkills !== false && activeSkills.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
              letterSpacing: "1px",
            }}
          >
            Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {activeSkills.map((skill, index) => (
              <span key={index} style={{ fontSize: "0.85rem" }}>
                {skill}
                {index < activeSkills.length - 1 ? " • " : ""}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {settings.showExperience !== false && experience.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
              letterSpacing: "1px",
            }}
          >
            Experience
          </h3>

          {experience.map((exp, idx) => (
            <div key={exp.id || idx} style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.2rem",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                  {exp.company}
                </div>
                {(exp.date || exp.startDate || exp.endDate) && (
                  <div style={{ fontSize: "0.85rem", color: "#555" }}>
                    {exp.date || (exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : exp.startDate || exp.endDate)}
                  </div>
                )}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  marginBottom: "0.5rem",
                }}
              >
                {exp.title || exp.jobTitle}
              </div>

              {exp.description && (
                <div
                  style={{
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
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
                          marginBottom: "0.2rem",
                        }}
                      >
                        <span>•</span> <span>{line}</span>
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
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
              letterSpacing: "1px",
            }}
          >
            Projects
          </h3>
          {projects.map((proj, idx) => (
            <div key={proj.id || idx} style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.2rem",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                  {proj.name || proj.title}
                </div>
                {(proj.duration || proj.date) && (
                  <div style={{ fontSize: "0.85rem", color: "#555" }}>
                    {proj.duration || proj.date}
                  </div>
                )}
              </div>
              {proj.technologies && (
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                    marginBottom: "0.5rem",
                    color: "#666",
                  }}
                >
                  {proj.technologies}
                </div>
              )}
              {proj.description && (
                <div
                  style={{
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
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
                          marginBottom: "0.2rem",
                        }}
                      >
                        <span>•</span> <span>{line}</span>
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
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
              letterSpacing: "1px",
            }}
          >
            Education
          </h3>
          {education.map((edu, idx) => (
            <div key={edu.id || idx} style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.2rem",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                  {edu.school || edu.institution}
                </div>
                {(edu.date || edu.startDate || edu.endDate) && (
                  <div style={{ fontSize: "0.85rem", color: "#555" }}>
                    {edu.date || (edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.startDate || edu.endDate)}
                  </div>
                )}
              </div>
              <div style={{ fontSize: "0.9rem", fontStyle: "italic" }}>
                {edu.degree || edu.fieldOfStudy || ''}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BasicTemplate;
