import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  BarChart2,
  Globe,
} from "lucide-react";

const MagneticTemplate = ({ resumeData }) => {
  const data = resumeData || {};
  const personalInfo = data.personalInfo || {};
  const settings = data.settings || {};

  const headerBg = "#1f2937";
  const contactBg = "#14b8a6";
  const accentColor = settings.primaryColor || "#f43f5e";

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
        fontFamily: "var(--resume-font-family, inherit)",
        color: "#333",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Top Header Block */}
      {(personalInfo.fullName || personalInfo.jobTitle || (settings.showSummary !== false && personalInfo.summary) || initials) && (
        <div
          style={{
            background: headerBg,
            color: "white",
            padding: "3rem 4rem 2rem 4rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1 }}>
            {personalInfo.fullName && (
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "normal",
                  margin: "0 0 0.5rem 0",
                }}
              >
                {personalInfo.fullName}
              </h1>
            )}
            {personalInfo.jobTitle && (
              <h2
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  margin: "0 0 1.5rem 0",
                  opacity: 0.9,
                }}
              >
                {personalInfo.jobTitle}
              </h2>
            )}

            {settings.showSummary !== false && personalInfo.summary && (
              <p
                style={{
                  lineHeight: 1.5,
                  fontSize: "0.85rem",
                  opacity: 0.85,
                  margin: 0,
                }}
              >
                {personalInfo.summary}
              </p>
            )}
          </div>

          {/* Photo Container */}
          {initials && (
            <div
              style={{
                width: "25%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "120px",
                  borderRadius: "8px",
                  background: "#374151",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#9ca3af",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  border: "2px solid #4b5563",
                }}
              >
                {initials}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Contact Bar */}
      {hasContacts && (
        <div
          style={{
            background: contactBg,
            padding: "1rem 4rem",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
            color: "white",
            fontSize: "0.85rem",
          }}
        >
          {personalInfo.email && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Mail size={14} /> {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Phone size={14} /> {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MapPin size={14} /> {personalInfo.location}
            </div>
          )}
          {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Globe size={14} /> {personalInfo.website || personalInfo.linkedin || personalInfo.github}
            </div>
          )}
        </div>
      )}

      <div style={{ padding: "3rem 4rem" }}>
        {/* Education */}
        {settings.showEducation !== false && education.length > 0 && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: accentColor,
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <GraduationCap size={14} />
              </div>
              Education
            </h3>
            {education.map((edu, idx) => (
              <div key={edu.id || idx} style={{ marginBottom: "1rem" }}>
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
                        fontSize: "0.85rem",
                        color: accentColor,
                        fontWeight: "bold",
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

        {/* Experience */}
        {settings.showExperience !== false && experience.length > 0 && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: accentColor,
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <Briefcase size={14} />
              </div>
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
                  <div style={{ fontSize: "0.85rem", color: "#111" }}>
                    {exp.title || exp.jobTitle}
                  </div>
                  {(exp.date || exp.startDate || exp.endDate) && (
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: accentColor,
                        fontWeight: "bold",
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
                          <span style={{ color: accentColor }}>•</span>{" "}
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
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: accentColor,
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <Briefcase size={14} />
              </div>
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
                  <div style={{ fontSize: "0.85rem", color: "#111" }}>
                    {proj.technologies}
                  </div>
                  {(proj.duration || proj.date) && (
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: accentColor,
                        fontWeight: "bold",
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
                          <span style={{ color: accentColor }}>•</span>{" "}
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
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: accentColor,
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <BarChart2 size={14} />
              </div>
              Skills
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {activeSkills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    padding: "0.4rem 0.8rem",
                    fontSize: "0.85rem",
                    color: "#334155",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MagneticTemplate;
