import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const VertexTemplate = ({ resumeData }) => {
  const data = resumeData || {};
  const personalInfo = data.personalInfo || {};
  const settings = data.settings || {};

  const sidebarBg = settings.primaryColor || "#fdf4f0";

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
        fontFamily: "var(--resume-font-family, inherit)",
        display: "flex",
        color: "#333",
        boxSizing: "border-box",
      }}
    >
      {/* Left Sidebar */}
      {(personalInfo.fullName || personalInfo.jobTitle || hasContacts || activeSkills.length > 0) && (
        <div
          style={{ width: "35%", background: sidebarBg, padding: "3rem 2.5rem" }}
        >
          {personalInfo.fullName && (
            <h1
              style={{
                fontSize: "2.2rem",
                fontWeight: "bold",
                color: "#111",
                margin: "0 0 0.5rem 0",
                textTransform: "uppercase",
                lineHeight: 1.1,
              }}
            >
              {(personalInfo.fullName || "").split(" ").map((n, i) => (
                <div key={i}>{n}</div>
              ))}
            </h1>
          )}
          {personalInfo.jobTitle && (
            <h2
              style={{ fontSize: "0.95rem", color: "#555", marginBottom: hasContacts || activeSkills.length > 0 ? "2.5rem" : "1rem" }}
            >
              {personalInfo.jobTitle}
            </h2>
          )}

          {hasContacts && (
            <div style={{ marginBottom: "2.5rem" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  fontSize: "0.8rem",
                }}
              >
                {personalInfo.phone && (
                  <div
                    style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
                  >
                    <Phone size={14} /> <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div
                    style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
                  >
                    <Mail size={14} />{" "}
                    <span style={{ wordBreak: "break-all" }}>
                      {personalInfo.email}
                    </span>
                  </div>
                )}
                {personalInfo.location && (
                  <div
                    style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
                  >
                    <MapPin size={14} /> <span>{personalInfo.location}</span>
                  </div>
                )}
                {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
                  <div
                    style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
                  >
                    <Globe size={14} /> <span>{personalInfo.website || personalInfo.linkedin || personalInfo.github}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {settings.showSkills !== false && activeSkills.length > 0 && (
            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#111",
                  marginBottom: "1rem",
                  paddingBottom: "0.5rem",
                }}
              >
                Skills
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {activeSkills.map((skill, index) => (
                  <div key={index} style={{ fontSize: "0.85rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          background: "#111",
                        }}
                      ></div>
                      {skill}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Right Content */}
      <div style={{ flex: 1, padding: "3rem 3rem" }}>
        {/* Summary */}
        {settings.showSummary !== false && personalInfo.summary && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#111",
                marginBottom: "0.8rem",
              }}
            >
              Summary
            </h3>
            <p style={{ lineHeight: 1.6, fontSize: "0.85rem", color: "#444", margin: 0 }}>
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Projects */}
        {settings.showProjects !== false && projects.length > 0 && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#111",
                marginBottom: "1rem",
              }}
            >
              Projects
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {projects.map((proj, idx) => (
                <div key={proj.id || idx}>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      color: "#111",
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
                    <div style={{ fontSize: "0.85rem", color: "#333" }}>
                      {proj.technologies}
                    </div>
                    {(proj.duration || proj.date) && (
                      <div style={{ fontSize: "0.8rem", color: "#777" }}>
                        {proj.duration || proj.date}
                      </div>
                    )}
                  </div>
                  {proj.description && (
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "#444",
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
                            <span>•</span> <span>{line}</span>
                          </div>
                        ) : null,
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {settings.showEducation !== false && education.length > 0 && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#111",
                marginBottom: "1rem",
              }}
            >
              Education
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {education.map((edu, idx) => (
                <div key={edu.id || idx}>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      color: "#111",
                    }}
                  >
                    {edu.school || edu.institution}
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#555",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {edu.degree || edu.fieldOfStudy || ''}
                  </div>
                  {(edu.date || edu.startDate || edu.endDate) && (
                    <div style={{ fontSize: "0.8rem", color: "#777" }}>
                      {edu.date || (edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.startDate || edu.endDate)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {settings.showExperience !== false && experience.length > 0 && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#111",
                marginBottom: "1rem",
              }}
            >
              Experience
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {experience.map((exp, idx) => (
                <div key={exp.id || idx}>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      color: "#111",
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
                    <div style={{ fontSize: "0.85rem", color: "#333" }}>
                      {exp.title || exp.jobTitle}
                    </div>
                    {(exp.date || exp.startDate || exp.endDate) && (
                      <div style={{ fontSize: "0.8rem", color: "#777" }}>
                        {exp.date || (exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : exp.startDate || exp.endDate)}
                      </div>
                    )}
                  </div>

                  {exp.description && (
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "#444",
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
                            <span>•</span> <span>{line}</span>
                          </div>
                        ) : null,
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VertexTemplate;
