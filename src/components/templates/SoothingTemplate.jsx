import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const SoothingTemplate = ({ resumeData }) => {
  const data = resumeData || {};
  const personalInfo = data.personalInfo || {};
  const settings = data.settings || {};

  const marginPadding =
    settings.margins === "Compact"
      ? "1.5rem 2rem"
      : settings.margins === "Spacious"
        ? "3rem 3.5rem"
        : "2rem 2.5rem";

  const tealColor = settings.primaryColor || "#14b8a6";
  const darkTealColor = "#0f766e";

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
        boxSizing: "border-box",
      }}
    >
      {/* Header Banner */}
      {(personalInfo.fullName || hasContacts) && (
        <div
          style={{
            background: "#f0fdfa",
            padding: "2.5rem 3rem",
            borderBottom: `4px solid ${tealColor}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {personalInfo.fullName && (
              <h1
                style={{
                  fontSize: "2.2rem",
                  fontWeight: "bold",
                  color: "#111",
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
                  color: darkTealColor,
                  fontWeight: "bold",
                  margin: 0,
                }}
              >
                {personalInfo.jobTitle}
              </h2>
            )}
          </div>
          {hasContacts && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                fontSize: "0.8rem",
                textAlign: "right",
              }}
            >
              {personalInfo.phone && (
                <div>
                  {personalInfo.phone}{" "}
                  <Phone
                    size={12}
                    style={{ marginLeft: "0.3rem", color: tealColor }}
                  />
                </div>
              )}
              {personalInfo.email && (
                <div>
                  {personalInfo.email}{" "}
                  <Mail
                    size={12}
                    style={{ marginLeft: "0.3rem", color: tealColor }}
                  />
                </div>
              )}
              {personalInfo.location && (
                <div>
                  {personalInfo.location}{" "}
                  <MapPin
                    size={12}
                    style={{ marginLeft: "0.3rem", color: tealColor }}
                  />
                </div>
              )}
              {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
                <div>
                  {personalInfo.website || personalInfo.linkedin || personalInfo.github}{" "}
                  <Globe
                    size={12}
                    style={{ marginLeft: "0.3rem", color: tealColor }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {settings.showSummary !== false && personalInfo.summary && (
        <div
          style={{
            background: darkTealColor,
            color: "white",
            padding: "1.5rem 3rem",
            fontSize: "0.85rem",
            lineHeight: 1.5,
          }}
        >
          {personalInfo.summary}
        </div>
      )}

      {/* Two Column Layout */}
      <div style={{ display: "flex", padding: "2.5rem 3rem", gap: "2rem" }}>
        {/* Left Column */}
        <div style={{ width: activeSkills.length > 0 ? "60%" : "100%" }}>
          {/* Experience */}
          {settings.showExperience !== false && experience.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: tealColor,
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: tealColor,
                    borderRadius: "50%",
                  }}
                ></span>{" "}
                Experience
              </h3>

              <div
                style={{
                  borderLeft: `1px solid ${tealColor}`,
                  paddingLeft: "1rem",
                  marginLeft: "0.2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {experience.map((exp, idx) => (
                  <div key={exp.id || idx} style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "-1.35rem",
                        top: "0.3rem",
                        width: "8px",
                        height: "8px",
                        background: "#fff",
                        border: `2px solid ${tealColor}`,
                        borderRadius: "50%",
                      }}
                    ></div>
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
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            background: tealColor,
                            color: "white",
                            padding: "0.1rem 0.5rem",
                            borderRadius: "2px",
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
            </div>
          )}

          {/* Projects */}
          {settings.showProjects !== false && projects.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: tealColor,
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: tealColor,
                    borderRadius: "50%",
                  }}
                ></span>{" "}
                Projects
              </h3>
              <div
                style={{
                  borderLeft: `1px solid ${tealColor}`,
                  paddingLeft: "1rem",
                  marginLeft: "0.2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {projects.map((proj, idx) => (
                  <div key={proj.id || idx} style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "-1.35rem",
                        top: "0.3rem",
                        width: "8px",
                        height: "8px",
                        background: "#fff",
                        border: `2px solid ${tealColor}`,
                        borderRadius: "50%",
                      }}
                    ></div>
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
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            background: tealColor,
                            color: "white",
                            padding: "0.1rem 0.5rem",
                            borderRadius: "2px",
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
            </div>
          )}

          {/* Education */}
          {settings.showEducation !== false && education.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: tealColor,
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: tealColor,
                    borderRadius: "50%",
                  }}
                ></span>{" "}
                Education
              </h3>
              <div
                style={{
                  borderLeft: `1px solid ${tealColor}`,
                  paddingLeft: "1rem",
                  marginLeft: "0.2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {education.map((edu, idx) => (
                  <div key={edu.id || idx} style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "-1.35rem",
                        top: "0.3rem",
                        width: "8px",
                        height: "8px",
                        background: "#fff",
                        border: `2px solid ${tealColor}`,
                        borderRadius: "50%",
                      }}
                    ></div>
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
                            background: tealColor,
                            color: "white",
                            padding: "0.1rem 0.5rem",
                            borderRadius: "2px",
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
        </div>

        {/* Right Column */}
        {settings.showSkills !== false && activeSkills.length > 0 && (
          <div style={{ width: "40%" }}>
            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: tealColor,
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: tealColor,
                    borderRadius: "50%",
                  }}
                ></span>{" "}
                Skills
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                  fontSize: "0.85rem",
                }}
              >
                {activeSkills.map((skill, index) => (
                  <div
                    key={index}
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
                        background: "#333",
                        borderRadius: "50%",
                      }}
                    ></div>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoothingTemplate;
