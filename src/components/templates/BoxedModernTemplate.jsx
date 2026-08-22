import React from "react";
import { Mail, Phone, MapPin, Globe, Award, Calendar } from "lucide-react";

const BoxedModernTemplate = ({ resumeData }) => {
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

  const interests = (Array.isArray(resumeData?.interests) && resumeData.interests.length > 0)
    ? resumeData.interests
    : [];

  const customSections = Array.isArray(resumeData?.customSections) ? resumeData.customSections : [];
  const settings = resumeData?.settings || {};
  const primaryColor = settings.primaryColor || "#059669";
  const marginPadding =
    settings.margins === "Compact"
      ? "1.5rem 2rem"
      : settings.margins === "Spacious"
        ? "3rem 3.5rem"
        : "2rem 2.5rem";

  const divider = (
    <div
      style={{
        height: "1.2px",
        background: "#000000",
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

  const activeHobbies =
    interests && interests.length > 0
      ? interests.map((i) => i.name || i)
      : resumeData?.hobbies || [];

  // Helper to map skill proficiencies for the grid columns
  const getSkillLevel = (skill) => {
    if (skill && typeof skill === "object" && skill.level !== undefined) {
      const lvl = skill.level;
      if (lvl >= 90) return "Expert";
      if (lvl >= 75) return "Skillful";
      if (lvl >= 50) return "Experienced";
      return "Beginner";
    }
    const skillName = typeof skill === "object" ? skill.name : skill;
    const sLower = (skillName || "").toLowerCase();
    if (
      sLower.includes("writing") ||
      sLower.includes("api") ||
      sLower.includes("suite") ||
      sLower.includes("communication")
    ) {
      return "Expert";
    }
    if (sLower.includes("sop") || sLower.includes("manuals")) {
      return "Skillful";
    }
    return "Experienced";
  };

  const formatLocation = (loc) => {
    if (!loc) return "";
    return loc.replace(/,/, " ,");
  };

  const hasContacts = personalInfo.phone || personalInfo.email || personalInfo.location || personalInfo.linkedin || personalInfo.github || personalInfo.website;

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#ffffff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        padding: marginPadding,
        fontFamily: "var(--resume-font-family, inherit)",
        color: "#000000",
        lineHeight: "1.4",
        fontSize: "12px",
        boxSizing: "border-box",
      }}
    >
      {/* Top Header */}
      {(personalInfo.fullName || hasContacts) && (
        <div style={{ marginBottom: "1.2rem" }}>
          {personalInfo.fullName && (
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 0 0.15rem 0",
                color: "#000000",
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
                fontWeight: 600,
                color: primaryColor,
                marginBottom: "0.4rem",
              }}
            >
              {personalInfo.jobTitle}
            </div>
          )}

          {hasContacts && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.8rem 1.2rem",
                fontSize: "11px",
                color: "#000000",
                marginTop: "0.3rem",
              }}
            >
              {personalInfo.phone && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <Phone size={11} color="#008080" /> {personalInfo.phone}
                </span>
              )}
              {personalInfo.email && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <Mail size={11} color="#008080" /> {personalInfo.email}
                </span>
              )}
              {personalInfo.location && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <MapPin size={11} color="#008080" />{" "}
                  {formatLocation(personalInfo.location)}
                </span>
              )}
              {personalInfo.linkedin && (
                <a
                  href={`https://${personalInfo.linkedin.replace(/^(https?:\/\/)?(www\.)?/, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    color: "#0000ee",
                    textDecoration: "underline",
                  }}
                >
                  <Globe size={11} color="#008080" />{" "}
                  {personalInfo.linkedin.replace(
                    /^(https?:\/\/)?(www\.)?linkedin\.com\/in\//,
                    "",
                  )}
                </a>
              )}
              {personalInfo.github && (
                <a
                  href={`https://${personalInfo.github.replace(/^(https?:\/\/)?(www\.)?/, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    color: "#0000ee",
                    textDecoration: "underline",
                  }}
                >
                  <Globe size={11} color="#008080" />{" "}
                  {personalInfo.github.replace(
                    /^(https?:\/\/)?(www\.)?github\.com\//,
                    "",
                  )}
                </a>
              )}
              {personalInfo.website && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <Globe size={11} color="#008080" /> {personalInfo.website}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {settings.showSummary !== false && personalInfo.summary && (
        <div style={{ marginBottom: "0.8rem" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              textTransform: "uppercase",
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
          <div style={{ marginBottom: "0.8rem" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "uppercase",
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
                gap: "0.8rem",
              }}
            >
              {experience.map((exp, index) => (
                <div key={exp.id || index}>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "13px",
                      color: "#000000",
                    }}
                  >
                    {exp.title || exp.jobTitle}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "0.75rem",
                      fontSize: "11.5px",
                      color: "#475569",
                      marginTop: "0.1rem",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "italic",
                        fontWeight: 500,
                        color: "#000000",
                      }}
                    >
                      {exp.company}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.2rem",
                        color: "#000000",
                      }}
                    >
                      <Calendar size={11} color="#008080" />
                      {exp.date ||
                        (exp.startDate && exp.endDate
                          ? `${exp.startDate} - ${exp.endDate}`
                          : exp.startDate || exp.endDate || "")}
                    </span>
                    {exp.location && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2rem",
                          color: "#000000",
                        }}
                      >
                        <MapPin size={11} color="#008080" />{" "}
                        {formatLocation(exp.location)}
                      </span>
                    )}
                  </div>
                  {exp.description && (
                    <ul
                      style={{
                        margin: "0.2rem 0 0 1rem",
                        padding: 0,
                        fontSize: "12px",
                        listStyleType: "disc",
                      }}
                    >
                      {exp.description.split("\n").map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          style={{
                            marginBottom: "0.1rem",
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

      {/* Education */}
      {settings.showEducation !== false &&
        education &&
        education.length > 0 && (
          <div style={{ marginBottom: "0.8rem" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "uppercase",
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
                gap: "0.6rem",
              }}
            >
              {education.map((edu, index) => (
                <div key={edu.id || index}>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "13px",
                      color: "#000000",
                    }}
                  >
                    {edu.degree || edu.fieldOfStudy || ""}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "0.75rem",
                      fontSize: "11.5px",
                      color: "#475569",
                      marginTop: "0.1rem",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "italic",
                        fontWeight: 500,
                        color: "#000000",
                      }}
                    >
                      {edu.school || edu.institution}
                    </span>
                    {edu.cgpa && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2rem",
                          color: "#000000",
                        }}
                      >
                        <Award size={11} color="#008080" />
                        CGPA: {edu.cgpa}
                      </span>
                    )}
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.2rem",
                        color: "#000000",
                      }}
                    >
                      <Calendar size={11} color="#008080" />
                      {edu.date ||
                        (edu.startDate && edu.endDate
                          ? `${edu.startDate} - ${edu.endDate}`
                          : edu.startDate || edu.endDate || "")}
                    </span>
                    {edu.location && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2rem",
                          color: "#000000",
                        }}
                      >
                        <MapPin size={11} color="#008080" />{" "}
                        {formatLocation(edu.location)}
                      </span>
                    )}
                  </div>
                  {edu.details && (
                    <ul
                      style={{
                        margin: "0.2rem 0 0 1rem",
                        padding: 0,
                        fontSize: "12px",
                        listStyleType: "disc",
                      }}
                    >
                      {edu.details.split("\n").map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          style={{
                            marginBottom: "0.1rem",
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
        <div style={{ marginBottom: "0.8rem" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              textTransform: "uppercase",
              margin: "0 0 0.2rem 0",
              letterSpacing: "0.5px",
            }}
          >
            Projects
          </h3>
          {divider}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
          >
            {projects.map((proj, index) => (
              <div key={proj.id || index}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "13px",
                    color: "#000000",
                  }}
                >
                  {proj.name || proj.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    fontSize: "11.5px",
                    color: "#475569",
                    marginTop: "0.1rem",
                  }}
                >
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#0000ee", textDecoration: "underline" }}
                    >
                      {proj.link}
                    </a>
                  )}
                  {(proj.duration || proj.date) && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.2rem",
                        color: "#000000",
                      }}
                    >
                      <Calendar size={11} color="#008080" />
                      {proj.duration || proj.date}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <ul
                    style={{
                      margin: "0.2rem 0 0 1rem",
                      padding: 0,
                      fontSize: "12px",
                      listStyleType: "disc",
                    }}
                  >
                    {proj.description.split("\n").map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        style={{
                          marginBottom: "0.1rem",
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
        <div style={{ marginBottom: "0.8rem" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              textTransform: "uppercase",
              margin: "0 0 0.2rem 0",
              letterSpacing: "0.5px",
            }}
          >
            Certifications
          </h3>
          {divider}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {certifications.map((cert, index) => (
              <div key={cert.id || index} style={{ fontSize: "12px", color: "#000000" }}>
                <span>• <strong>{cert.name || cert.title}</strong></span>
                {cert.issuer ? ` — ${cert.issuer}` : ""}
                {cert.date ? ` (${cert.date})` : ""}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {settings.showSkills !== false && activeSkills.length > 0 && (
        <div style={{ marginBottom: "0.8rem" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              textTransform: "uppercase",
              margin: "0 0 0.2rem 0",
              letterSpacing: "0.5px",
            }}
          >
            Skills
          </h3>
          {divider}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.4rem 2rem",
            }}
          >
            {activeSkills.map((skill, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "12px",
                  borderBottom: "1px solid #f1f5f9",
                  paddingBottom: "3px",
                }}
              >
                <span style={{ fontWeight: "normal", color: "#000000" }}>
                  {typeof skill === "object" ? skill.name : skill}
                </span>
                <span
                  style={{
                    color: primaryColor,
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                >
                  {getSkillLevel(skill)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages & Hobbies */}
      {((settings.showLanguages !== false &&
        languages &&
        languages.length > 0) ||
        (settings.showHobbies !== false && activeHobbies.length > 0)) && (
        <div style={{ marginBottom: "0.8rem" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              textTransform: "uppercase",
              margin: "0 0 0.2rem 0",
              letterSpacing: "0.5px",
            }}
          >
            Languages & Hobbies
          </h3>
          {divider}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
            }}
          >
            {settings.showLanguages !== false &&
              languages &&
              languages.length > 0 && (
                <div>
                  <ul
                    style={{
                      margin: "0.15rem 0 0 1rem",
                      padding: 0,
                      fontSize: "12px",
                      listStyleType: "disc",
                    }}
                  >
                    {languages.map((lang, index) => (
                      <li
                        key={index}
                        style={{
                          marginBottom: "0.1rem",
                          paddingLeft: "0.2rem",
                        }}
                      >
                        <strong>{typeof lang === 'object' ? lang.name : String(lang)}</strong>{" "}
                        {typeof lang === 'object' && lang.proficiency ? `(${lang.proficiency})` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            {settings.showHobbies !== false && activeHobbies.length > 0 && (
              <div>
                <ul
                  style={{
                    margin: "0.15rem 0 0 1rem",
                    padding: 0,
                    fontSize: "12px",
                    listStyleType: "disc",
                  }}
                >
                  {activeHobbies.map((hobby, index) => (
                    <li
                      key={index}
                      style={{ marginBottom: "0.1rem", paddingLeft: "0.2rem" }}
                    >
                      {hobby}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
              gap: "0.8rem",
              marginTop: "0.8rem",
            }}
          >
            {customSections
              .filter((sec) => sec && sec.title)
              .map((sec, idx) => (
                <div key={sec.id || idx} style={{ marginBottom: "0.8rem" }}>
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
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
                        color: "#000000",
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

export default BoxedModernTemplate;
