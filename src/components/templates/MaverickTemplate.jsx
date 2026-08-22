import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  User,
  GraduationCap,
  Briefcase,
  Globe,
} from "lucide-react";

const MaverickTemplate = ({ resumeData }) => {
  const data = resumeData || {};
  const personalInfo = data.personalInfo || {};
  const settings = data.settings || {};

  const marginPadding =
    settings.margins === "Compact"
      ? "1.5rem 2rem"
      : settings.margins === "Spacious"
        ? "3rem 3.5rem"
        : "2rem 2.5rem";

  const sidebarBg = settings.primaryColor || "#3b5998";

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
        display: "flex",
        boxSizing: "border-box",
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: "32%",
          background: sidebarBg,
          color: "#fff",
          padding: marginPadding,
        }}
      >
        {/* Circle Photo */}
        {initials && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: sidebarBg,
                fontSize: "3rem",
                fontWeight: "bold",
                border: "4px solid #fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              {initials}
            </div>
          </div>
        )}

        {personalInfo.fullName && (
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: "normal",
              textAlign: "center",
              marginBottom: "0.5rem",
              lineHeight: 1.1,
            }}
          >
            {personalInfo.fullName}
          </h1>
        )}

        {personalInfo.jobTitle && (
          <h2
            style={{
              fontSize: "0.9rem",
              fontWeight: "normal",
              textAlign: "center",
              marginBottom: "2.5rem",
              opacity: 0.9,
            }}
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
                color: "#fff",
                marginBottom: "1rem",
                borderBottom: "1px solid rgba(255,255,255,0.3)",
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
                        background: "#fff",
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

      {/* Right Content */}
      <div style={{ width: "68%", display: "flex", flexDirection: "column" }}>
        {/* Top Summary Block */}
        {settings.showSummary !== false && personalInfo.summary && (
          <div
            style={{
              background: "#1e3a8a",
              padding: "3rem 2.5rem 2rem 2.5rem",
              color: "#fff",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <User size={18} /> Professional Summary
            </h3>
            <p style={{ lineHeight: 1.6, fontSize: "0.85rem", opacity: 0.9, margin: 0 }}>
              {personalInfo.summary}
            </p>
          </div>
        )}

        <div style={{ padding: "2rem 2.5rem", flex: 1 }}>
          {/* Education */}
          {settings.showEducation !== false && education.length > 0 && (
            <div style={{ marginBottom: "2.5rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#1e3a8a",
                  marginBottom: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  borderBottom: "1px solid #cbd5e1",
                  paddingBottom: "0.5rem",
                }}
              >
                <GraduationCap size={20} /> Education
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
                            background: sidebarBg,
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
            </div>
          )}

          {/* Projects */}
          {settings.showProjects !== false && projects.length > 0 && (
            <div style={{ marginBottom: "2.5rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#1e3a8a",
                  marginBottom: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  borderBottom: "1px solid #cbd5e1",
                  paddingBottom: "0.5rem",
                }}
              >
                <Briefcase size={20} /> Projects
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
                        marginBottom: "0.8rem",
                      }}
                    >
                      <div style={{ fontSize: "0.85rem", color: "#333" }}>
                        {proj.technologies}
                      </div>
                      {(proj.duration || proj.date) && (
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            background: sidebarBg,
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
                              <span style={{ color: "#1e3a8a" }}>•</span>{" "}
                              <span>{line}</span>
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

          {/* Experience */}
          {settings.showExperience !== false && experience.length > 0 && (
            <div style={{ marginBottom: "2.5rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#1e3a8a",
                  marginBottom: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  borderBottom: "1px solid #cbd5e1",
                  paddingBottom: "0.5rem",
                }}
              >
                <Briefcase size={20} /> Experience
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
                        marginBottom: "0.8rem",
                      }}
                    >
                      <div style={{ fontSize: "0.85rem", color: "#333" }}>
                        {exp.title || exp.jobTitle}
                      </div>
                      {(exp.date || exp.startDate || exp.endDate) && (
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            background: sidebarBg,
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
                              <span style={{ color: "#1e3a8a" }}>•</span>{" "}
                              <span>{line}</span>
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
    </div>
  );
};

export default MaverickTemplate;
