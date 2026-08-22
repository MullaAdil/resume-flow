import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const MinimalClassicTemplate = ({ resumeData }) => {
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
      ? interests.map((i) => (typeof i === 'object' ? i.name : i))
      : (Array.isArray(resumeData?.hobbies) ? resumeData.hobbies : []);

  const hasContacts = personalInfo.location || personalInfo.phone || personalInfo.email || personalInfo.linkedin || personalInfo.github || personalInfo.website;

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131.42857px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        padding: marginPadding,
        fontFamily: "var(--resume-font-family, inherit)",
        color: "#000000",
        lineHeight: "1.4",
        fontSize: "13px",
        boxSizing: "border-box"
      }}
    >
      <div>
        {/* Header */}
        {(personalInfo.fullName || hasContacts) && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            {personalInfo.fullName && (
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: "bold",
                  margin: "0 0 0.2rem 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {personalInfo.fullName}
              </h1>
            )}
            {personalInfo.jobTitle && (
              <h2
                style={{
                  fontSize: "14px",
                  fontWeight: "normal",
                  fontStyle: "italic",
                  margin: "0 0 0.6rem 0",
                  color: "#000000",
                }}
              >
                {personalInfo.jobTitle}
              </h2>
            )}

            {/* Contact Info Centered with Inline Icons */}
            {hasContacts && (
              <div
                style={{
                  display: "inline-flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "0.75rem",
                  fontSize: "11.5px",
                  color: "#000000",
                }}
              >
                {personalInfo.location && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.2rem",
                    }}
                  >
                    <MapPin size={11} /> {personalInfo.location}
                  </span>
                )}
                {personalInfo.phone && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.2rem",
                    }}
                  >
                    <Phone size={11} /> {personalInfo.phone}
                  </span>
                )}
                {personalInfo.email && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.2rem",
                    }}
                  >
                    <Mail size={11} /> {personalInfo.email}
                  </span>
                )}
                {personalInfo.linkedin && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.2rem",
                    }}
                  >
                    <Globe size={11} /> {personalInfo.linkedin}
                  </span>
                )}
                {personalInfo.github && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.2rem",
                    }}
                  >
                    <Globe size={11} /> {personalInfo.github}
                  </span>
                )}
                {personalInfo.website && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.2rem",
                    }}
                  >
                    <Globe size={11} /> {personalInfo.website}
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
                textTransform: "none",
                margin: "0 0 0.3rem 0",
                letterSpacing: "0.3px",
              }}
            >
              Summary
            </h3>
            {divider}
            <p
              style={{
                fontSize: "12px",
                color: "#000000",
                textAlign: "justify",
                margin: 0,
                padding: 0,
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
                  textTransform: "none",
                  margin: "0 0 0.3rem 0",
                  letterSpacing: "0.3px",
                }}
              >
                Professional Experience
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
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        fontSize: "12px",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        {exp.title || exp.jobTitle}
                        {exp.company && (
                          <span
                            style={{ fontWeight: "normal", fontStyle: "italic" }}
                          >
                            {" "}
                            , {exp.company}
                          </span>
                        )}
                      </span>
                      <span style={{ fontWeight: "bold" }}>
                        {exp.date ||
                          (exp.startDate && exp.endDate
                            ? `${exp.startDate} - ${exp.endDate}`
                            : exp.startDate || exp.endDate || "")}
                      </span>
                    </div>
                    {exp.location && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          fontSize: "11px",
                          color: "#000000",
                          marginTop: "0.05rem",
                        }}
                      >
                        {exp.location}
                      </div>
                    )}
                    {exp.description && (
                      <ul
                        style={{
                          margin: "0.15rem 0 0 1.2rem",
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

        {/* Projects */}
        {settings.showProjects !== false && projects && projects.length > 0 && (
          <div style={{ marginBottom: "0.8rem" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "none",
                margin: "0 0 0.3rem 0",
                letterSpacing: "0.3px",
              }}
            >
              Projects
            </h3>
            {divider}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {projects.map((proj, index) => (
                <div key={proj.id || index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>
                      {proj.name || proj.title}
                    </span>
                    <span style={{ fontWeight: "bold" }}>
                      {proj.duration || proj.date}
                    </span>
                  </div>
                  {proj.technologies && (
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#475569",
                        fontStyle: "italic",
                        marginTop: "0.05rem",
                      }}
                    >
                      {proj.technologies}
                    </div>
                  )}
                  {proj.description && (
                    <ul
                      style={{
                        margin: "0.15rem 0 0 1.2rem",
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

        {/* Education */}
        {settings.showEducation !== false &&
          education &&
          education.length > 0 && (
            <div style={{ marginBottom: "0.8rem" }}>
              <h3
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  textTransform: "none",
                  margin: "0 0 0.3rem 0",
                  letterSpacing: "0.3px",
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
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        fontSize: "12px",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        {edu.degree || edu.fieldOfStudy || ""}
                        {(edu.school || edu.institution) && (
                          <span
                            style={{ fontWeight: "normal", fontStyle: "italic" }}
                          >
                            {" "}
                            , {edu.school || edu.institution}
                          </span>
                        )}
                      </span>
                      <span style={{ fontWeight: "bold" }}>
                        {edu.date ||
                          (edu.startDate && edu.endDate
                            ? `${edu.startDate} - ${edu.endDate}`
                            : edu.startDate || edu.endDate || "")}
                      </span>
                    </div>
                    {edu.location && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          fontSize: "11px",
                          color: "#000000",
                          marginTop: "0.05rem",
                        }}
                      >
                        {edu.location}
                      </div>
                    )}
                    {edu.details && (
                      <ul
                        style={{
                          margin: "0.1rem 0 0 1.2rem",
                          padding: 0,
                          fontSize: "11px",
                          listStyleType: "disc",
                        }}
                      >
                        <li style={{ paddingLeft: "0.2rem" }}>{edu.details}</li>
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Certifications */}
        {settings.showCertifications !== false &&
          certifications &&
          certifications.length > 0 && (
            <div style={{ marginBottom: "0.8rem" }}>
              <h3
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  textTransform: "none",
                  margin: "0 0 0.3rem 0",
                  letterSpacing: "0.3px",
                }}
              >
                Certifications
              </h3>
              {divider}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {certifications.map((cert, index) => (
                  <div key={cert.id || index}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        fontSize: "12px",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>{cert.name || cert.title}</span>
                      <span style={{ fontWeight: "bold" }}>{cert.date}</span>
                    </div>
                    {cert.issuer && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          fontSize: "11px",
                          color: "#0000ee",
                          textDecoration: "underline",
                          marginTop: "0.05rem",
                        }}
                      >
                        {cert.issuer}
                      </div>
                    )}
                    {cert.details && (
                      <ul
                        style={{
                          margin: "0.1rem 0 0 1.2rem",
                          padding: 0,
                          fontSize: "11px",
                          listStyleType: "disc",
                        }}
                      >
                        {cert.details.split("\n").map((bullet, bIdx) => (
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

        {/* Skills */}
        {settings.showSkills !== false && activeSkills.length > 0 && (
          <div style={{ marginBottom: "0.8rem" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "none",
                margin: "0 0 0.3rem 0",
                letterSpacing: "0.3px",
              }}
            >
              Skills
            </h3>
            {divider}
            <div
              style={{ fontSize: "12px", color: "#000000", lineHeight: "1.5" }}
            >
              {activeSkills.map((skill, index) => (
                <span key={index}>
                  {typeof skill === "object" ? skill.name : skill}
                  {index < activeSkills.length - 1 && (
                    <span style={{ margin: "0 0.4rem" }}>|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {settings.showLanguages !== false &&
          languages &&
          languages.length > 0 && (
            <div style={{ marginBottom: "0.8rem" }}>
              <h3
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  textTransform: "none",
                  margin: "0 0 0.3rem 0",
                  letterSpacing: "0.3px",
                }}
              >
                Languages
              </h3>
              {divider}
              <div style={{ fontSize: "12px", color: "#000000" }}>
                {languages.map((lang, index) => (
                  <span key={index}>
                    <span style={{ fontWeight: "bold" }}>{typeof lang === 'object' ? lang.name : String(lang)}</span>
                    {typeof lang === 'object' && lang.proficiency && <span> ({lang.proficiency})</span>}
                    {index < languages.length - 1 && (
                      <span style={{ margin: "0 0.5rem" }}>|</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Hobbies */}
        {settings.showHobbies !== false && activeHobbies.length > 0 && (
          <div style={{ marginBottom: "0.8rem" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "none",
                margin: "0 0 0.3rem 0",
                letterSpacing: "0.3px",
              }}
            >
              Hobbies
            </h3>
            {divider}
            <div
              style={{ fontSize: "12px", color: "#000000", lineHeight: "1.5" }}
            >
              {activeHobbies.join(" | ")}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {settings.showCustomSections !== false &&
          customSections &&
          customSections.length > 0 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
            >
              {customSections
                .filter((sec) => sec && sec.title)
                .map((sec, idx) => (
                  <div key={sec.id || idx} style={{ marginBottom: "0.8rem" }}>
                    <h3
                      style={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        textTransform: "none",
                        margin: "0 0 0.3rem 0",
                        letterSpacing: "0.3px",
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
    </div>
  );
};

export default MinimalClassicTemplate;
