import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const TrailblazerTemplate = ({ resumeData }) => {
  const data = resumeData || {};
  const personalInfo = data.personalInfo || {};
  const settings = data.settings || {};

  const marginPadding =
    settings.margins === "Compact"
      ? "1.5rem 2rem"
      : settings.margins === "Spacious"
        ? "3rem 3.5rem"
        : "2rem 2.5rem";

  const blueColor = settings.primaryColor || "#1e3a8a";

  const initials = personalInfo.fullName
    ? personalInfo.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "";

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
      {(personalInfo.fullName || hasContacts || initials) && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            {/* Name and Title */}
            <div style={{ flex: 1 }}>
              {personalInfo.fullName && (
                <h1
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#111",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  {personalInfo.fullName}
                </h1>
              )}
              {personalInfo.jobTitle && (
                <span
                  style={{
                    background: blueColor,
                    color: "white",
                    padding: "0.2rem 0.8rem",
                    borderRadius: "1rem",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    display: "inline-block",
                  }}
                >
                  {personalInfo.jobTitle}
                </span>
              )}
            </div>

            {/* Photo / Initials */}
            {initials && (
              <div
                style={{ padding: "0 1.5rem", display: "flex", justifyContent: "center" }}
              >
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: "#e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#64748b",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    border: `3px solid ${blueColor}`,
                  }}
                >
                  {initials}
                </div>
              </div>
            )}

            {/* Contact Info */}
            {hasContacts && (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                  fontSize: "0.75rem",
                  textAlign: "right",
                }}
              >
                {personalInfo.phone && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    {personalInfo.phone} <Phone size={12} color={blueColor} />
                  </div>
                )}
                {personalInfo.email && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    {personalInfo.email} <Mail size={12} color={blueColor} />
                  </div>
                )}
                {personalInfo.location && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    {personalInfo.location} <MapPin size={12} color={blueColor} />
                  </div>
                )}
                {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    {personalInfo.website || personalInfo.linkedin || personalInfo.github} <Globe size={12} color={blueColor} />
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            style={{
              width: "100%",
              height: "1px",
              background: "#cbd5e1",
              marginBottom: "1.5rem",
            }}
          ></div>
        </>
      )}

      {/* Summary */}
      {settings.showSummary !== false && personalInfo.summary && (
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ lineHeight: 1.5, fontSize: "0.85rem", color: "#1f2937", margin: 0 }}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Education */}
      {settings.showEducation !== false && education.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: `2px solid ${blueColor}`,
              paddingBottom: "0.2rem",
              marginBottom: "1rem",
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
              <div style={{ fontSize: "0.85rem", color: "#333" }}>
                {edu.degree || edu.fieldOfStudy || ''}
              </div>
              {(edu.date || edu.startDate || edu.endDate) && (
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    fontStyle: "italic",
                    marginTop: "0.2rem",
                  }}
                >
                  {edu.date || (edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.startDate || edu.endDate)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {settings.showExperience !== false && experience.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: `2px solid ${blueColor}`,
              paddingBottom: "0.2rem",
              marginBottom: "1rem",
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
                  fontSize: "0.85rem",
                  color: "#111",
                  fontWeight: "bold",
                }}
              >
                {exp.title || exp.jobTitle}
              </div>
              {(exp.date || exp.startDate || exp.endDate) && (
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    fontStyle: "italic",
                    marginBottom: "0.8rem",
                    marginTop: "0.1rem",
                  }}
                >
                  {exp.date || (exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : exp.startDate || exp.endDate)}
                </div>
              )}

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
                        <span style={{ color: "#111" }}>•</span>{" "}
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
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: `2px solid ${blueColor}`,
              paddingBottom: "0.2rem",
              marginBottom: "1rem",
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
              {proj.technologies && (
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#111",
                    fontWeight: "bold",
                  }}
                >
                  {proj.technologies}
                </div>
              )}
              {(proj.duration || proj.date) && (
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    fontStyle: "italic",
                    marginBottom: "0.8rem",
                    marginTop: "0.1rem",
                  }}
                >
                  {proj.duration || proj.date}
                </div>
              )}
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
                        <span style={{ color: "#111" }}>•</span>{" "}
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

      {/* Skills */}
      {settings.showSkills !== false && activeSkills.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: `2px solid ${blueColor}`,
              paddingBottom: "0.2rem",
              marginBottom: "1rem",
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
                  borderRadius: "4px",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrailblazerTemplate;
