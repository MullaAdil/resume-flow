import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  User,
  GraduationCap,
  Briefcase,
  BarChart2,
  Folder,
  Award,
  Link as LinkIcon,
  Globe,
} from "lucide-react";

const ArtisticTemplate = ({ resumeData }) => {
  const data = resumeData || {};
  const personalInfo = data.personalInfo || {};
  const settings = data.settings || {};

  const experience = (Array.isArray(data.experience) && data.experience.length > 0 && data.experience.some(e => e && (e.company || e.title || e.jobTitle)))
    ? data.experience
    : [];

  const education = (Array.isArray(data.education) && data.education.length > 0 && data.education.some(e => e && (e.school || e.degree)))
    ? data.education
    : [];

  const projects = (Array.isArray(data.projects) && data.projects.length > 0 && data.projects.some(pr => pr && (pr.name || pr.title || pr.description)))
    ? data.projects
    : [];

  const certifications = (Array.isArray(data.certifications) && data.certifications.length > 0 && data.certifications.some(c => c && (c.name || c.title)))
    ? data.certifications
    : [];

  const languages = (Array.isArray(data.languages) && data.languages.length > 0 && data.languages.some(l => l && (typeof l === 'string' ? l.trim() : l.name)))
    ? data.languages
    : [];

  const skills = data.skills;

  const renderSkills = () => {
    if (!skills) return null;
    if (Array.isArray(skills)) {
      if (skills.length === 0) return null;
      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {skills.map((skill, index) => (
            <span
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "0.2rem 0.6rem",
                fontSize: "0.8rem",
                borderRadius: "4px",
              }}
            >
              {typeof skill === 'object' ? skill.name || skill.value || '' : String(skill)}
            </span>
          ))}
        </div>
      );
    }
    const activeCategories = Object.entries(skills || {}).filter(
      ([_, arr]) => Array.isArray(arr) && arr.length > 0,
    );
    if (activeCategories.length === 0) return null;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {activeCategories.map(([category, arr]) => (
          <div key={category}>
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: "bold",
                textTransform: "capitalize",
                marginRight: "0.5rem",
              }}
            >
              {category}:
            </span>
            <div
              style={{
                display: "inline-flex",
                flexWrap: "wrap",
                gap: "0.3rem",
              }}
            >
              {arr.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    padding: "0.15rem 0.5rem",
                    fontSize: "0.75rem",
                    borderRadius: "4px",
                  }}
                >
                  {typeof skill === 'object' ? skill.name || skill.value || '' : String(skill)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const hasSkills = () => {
    if (!skills) return false;
    if (Array.isArray(skills)) return skills.length > 0;
    if (typeof skills === 'object') return Object.values(skills).flat().length > 0;
    return false;
  };

  const hasContacts = personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.website || personalInfo.linkedin || personalInfo.github;

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#fff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        padding:
          settings.margins === "Compact"
            ? "2rem 3rem"
            : settings.margins === "Spacious"
              ? "4rem 5rem"
              : "3rem 4rem",
        fontFamily:
          settings.fontFamily === "Inter"
            ? "'Inter', sans-serif"
            : settings.fontFamily === "Geist"
              ? "'Geist', sans-serif"
              : settings.fontFamily === "SF Pro Display"
                ? "system-ui, -apple-system, sans-serif"
                : "'Merriweather', serif",
        color: "#000",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      {(personalInfo.fullName || hasContacts) && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1rem",
            }}
          >
            <div>
              {personalInfo.fullName && (
                <h1
                  style={{
                    fontSize: "3rem",
                    fontWeight: 800,
                    margin: "0 0 0.5rem 0",
                    color: settings.primaryColor || "#2563EB",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {personalInfo.fullName}
                </h1>
              )}
              {personalInfo.jobTitle && (
                <h2
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "normal",
                    color: "#444",
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
                  gap: "0.5rem",
                  fontSize: "1rem",
                  color: "#4B5563",
                  textAlign: "right",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {personalInfo.email && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    {personalInfo.email} <Mail size={14} />
                  </div>
                )}
                {personalInfo.phone && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    {personalInfo.phone} <Phone size={14} />
                  </div>
                )}
                {personalInfo.location && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    {personalInfo.location} <MapPin size={14} />
                  </div>
                )}
                {(personalInfo.website || personalInfo.github) && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    {personalInfo.website || personalInfo.github} <Globe size={14} />
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    {personalInfo.linkedin} <LinkIcon size={14} />
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            style={{
              width: "100%",
              height: "2px",
              background: settings.primaryColor || "#2563EB",
              marginBottom: "2rem",
            }}
          ></div>
        </>
      )}

      {/* Summary */}
      {settings.showSummary !== false && personalInfo.summary && (
        <div
          style={{ marginBottom: "2.5rem", fontFamily: "Arial, sans-serif" }}
        >
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.75rem",
              color: "#111827",
            }}
          >
            <User size={18} /> Professional Summary
          </h3>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: "1.6",
              color: "#374151",
              margin: 0,
            }}
          >
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {settings.showExperience !== false && experience.length > 0 && (
        <div
          style={{ marginBottom: "2.5rem", fontFamily: "Arial, sans-serif" }}
        >
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
              color: "#111827",
            }}
          >
            <Briefcase size={18} /> Experience
          </h3>

          {experience.map((exp, idx) => (
            <div key={exp.id || idx} style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  color: "#111827",
                }}
              >
                {exp.company} {exp.location ? `| ${exp.location}` : ""}
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
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: settings.primaryColor || "#2563EB",
                  }}
                >
                  {exp.title || exp.jobTitle}
                </div>
                {(exp.startDate || exp.date || exp.endDate) && (
                  <div
                    style={{
                      fontSize: "0.95rem",
                      color: "#666",
                      fontStyle: "italic",
                    }}
                  >
                    {exp.date || (exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : exp.startDate || exp.endDate)}
                  </div>
                )}
              </div>

              {exp.description && (
                <div
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                    color: "#374151",
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
      )}

      {/* Education */}
      {settings.showEducation !== false && education.length > 0 && (
        <div
          style={{ marginBottom: "2.5rem", fontFamily: "Arial, sans-serif" }}
        >
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
              color: "#111827",
            }}
          >
            <GraduationCap size={18} /> Education
          </h3>
          {education.map((edu, idx) => (
            <div key={edu.id || idx} style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.25rem",
                }}
              >
                <strong style={{ fontSize: "1.1rem", color: "#111827" }}>
                  {edu.degree || edu.fieldOfStudy || ''}
                </strong>
                {(edu.startDate || edu.endDate || edu.date) && (
                  <span
                    style={{
                      fontSize: "0.95rem",
                      color: "#6B7280",
                      fontWeight: 500,
                    }}
                  >
                    {edu.date || (edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.startDate || edu.endDate)}
                  </span>
                )}
              </div>
              <div style={{ fontSize: "1.05rem", color: "#4B5563" }}>
                {edu.institution || edu.school}
              </div>
              {edu.cgpa && (
                <div style={{ fontSize: "0.9rem", color: "#666" }}>
                  GPA/CGPA: {edu.cgpa}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {settings.showProjects !== false && projects.length > 0 && (
        <div
          style={{ marginBottom: "2.5rem", fontFamily: "Arial, sans-serif" }}
        >
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
              color: "#111827",
            }}
          >
            <Folder size={18} /> Projects
          </h3>

          {projects.map((proj, idx) => (
            <div key={proj.id || idx} style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.25rem",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: "#111827",
                  }}
                >
                  {proj.name || proj.title}
                </div>
                {(proj.duration || proj.date) && (
                  <div
                    style={{
                      fontSize: "0.95rem",
                      color: "#666",
                      fontStyle: "italic",
                    }}
                  >
                    {proj.duration || proj.date}
                  </div>
                )}
              </div>
              {proj.description && (
                <div
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    color: "#374151",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {proj.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {settings.showSkills !== false && hasSkills() && (
        <div
          style={{ marginBottom: "2.5rem", fontFamily: "Arial, sans-serif" }}
        >
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.75rem",
              color: "#111827",
            }}
          >
            <BarChart2 size={18} /> Skills
          </h3>
          {renderSkills()}
        </div>
      )}

      {/* Certifications */}
      {settings.showCertifications !== false && certifications.length > 0 && (
        <div
          style={{ marginBottom: "2.5rem", fontFamily: "Arial, sans-serif" }}
        >
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.75rem",
              color: "#111827",
            }}
          >
            <Award size={18} /> Certifications & Awards
          </h3>
          {certifications.map((cert, idx) => (
            <div key={cert.id || idx} style={{ marginBottom: "1rem" }}>
              <div style={{ fontSize: "1.1rem" }}>
                <strong>{cert.name || cert.title}</strong>{" "}
                {cert.issuer ? `- ${cert.issuer}` : ""}
              </div>
              {cert.date && (
                <div
                  style={{
                    fontSize: "0.95rem",
                    color: "#666",
                    marginTop: "0.25rem",
                  }}
                >
                  {cert.date}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {settings.showLanguages !== false && languages.length > 0 && (
        <div
          style={{ marginBottom: "2.5rem", fontFamily: "Arial, sans-serif" }}
        >
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.75rem",
              color: "#111827",
            }}
          >
            <span style={{ fontSize: "20px" }}>🌍</span> Languages
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
            {languages.map((lang, idx) => (
              <div key={lang.id || idx} style={{ fontSize: "1.1rem" }}>
                <strong>{typeof lang === 'string' ? lang : lang.name}</strong>
                {typeof lang === 'object' && lang.proficiency && (
                  <span
                    style={{
                      color: "#666",
                      fontStyle: "italic",
                      marginLeft: "0.4rem",
                      fontSize: "0.95rem",
                    }}
                  >
                    ({lang.proficiency})
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisticTemplate;
