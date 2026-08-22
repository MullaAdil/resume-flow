import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Award,
} from "lucide-react";

const PinkHeaderTemplate = ({ resumeData }) => {
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
  const primaryColor = settings.primaryColor || "#E11D48";

  const divider = (
    <div
      style={{
        width: "100%",
        height: "1.2px",
        background: primaryColor,
        margin: "0.4rem 0 0.6rem 0",
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
        fontFamily: "var(--resume-font-family, inherit)",
        color: "#000000",
        lineHeight: "1.4",
        fontSize: "13px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Pink Header Banner */}
      {(personalInfo.fullName || hasContacts) && (
        <div
          style={{
            background: primaryColor,
            color: "#000000",
            padding: "2rem 2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.35rem",
            borderBottom: "1px solid #FDA4AF",
          }}
        >
          {personalInfo.fullName && (
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#FFFFFF",
                margin: 0,
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
                fontWeight: "bold",
                color: "#FFFFFF",
                margin: "0.1rem 0 0.5rem 0",
                textTransform: "none",
              }}
            >
              {personalInfo.jobTitle}
            </h2>
          )}

          {/* Contact info row in Header */}
          {hasContacts && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "1rem",
                fontSize: "11.5px",
                color: "#FFFFFF",
              }}
            >
              {personalInfo.phone && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2rem",
                    color: "#FFFFFF",
                  }}
                >
                  <Phone size={12} color="#FFFFFF" /> {personalInfo.phone}
                </span>
              )}
              {personalInfo.email && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2rem",
                    color: "#FFFFFF",
                  }}
                >
                  <Mail size={12} color="#FFFFFF" /> {personalInfo.email}
                </span>
              )}
              {personalInfo.location && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2rem",
                    color: "#FFFFFF",
                  }}
                >
                  <MapPin size={12} color="#FFFFFF" />{" "}
                  {formatLocation(personalInfo.location)}
                </span>
              )}
              {personalInfo.linkedin && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2rem",
                    color: "#FFFFFF",
                  }}
                >
                  <Globe size={12} color="#FFFFFF" /> {personalInfo.linkedin}
                </span>
              )}
              {personalInfo.github && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2rem",
                    color: "#FFFFFF",
                  }}
                >
                  <Globe size={12} color="#FFFFFF" /> {personalInfo.github}
                </span>
              )}
              {personalInfo.website && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2rem",
                    color: "#FFFFFF",
                  }}
                >
                  <Globe size={12} color="#FFFFFF" /> {personalInfo.website}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main Body */}
      <div style={{ padding: "2rem 2.5rem", flex: 1 }}>
        {/* Summary */}
        {settings.showSummary !== false && personalInfo.summary && (
          <div style={{ marginBottom: "1rem" }}>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: primaryColor,
                margin: 0,
              }}
            >
              Summary
            </h3>
            {divider}
            <p
              style={{
                fontSize: "12.5px",
                color: "#000000",
                textAlign: "justify",
                margin: 0,
              }}
            >
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Skills */}
        {settings.showSkills !== false && activeSkills.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: primaryColor,
                margin: 0,
              }}
            >
              Skills
            </h3>
            {divider}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem 1.2rem",
                fontSize: "12px",
              }}
            >
              {activeSkills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    color: "#000000",
                    borderBottom: "1px solid #000000",
                    paddingBottom: "2px",
                    fontWeight: 500,
                  }}
                >
                  {typeof skill === "object" ? skill.name : skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {settings.showExperience !== false &&
          experience &&
          experience.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: primaryColor,
                  margin: 0,
                }}
              >
                Experience
              </h3>
              {divider}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
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
                        color: "#000000",
                        marginTop: "0.1rem",
                      }}
                    >
                      <span style={{ fontWeight: "normal", color: "#475569" }}>
                        {exp.company}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2rem",
                        }}
                      >
                        <Calendar size={11} color="#E11D48" />
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
                          }}
                        >
                          <MapPin size={11} color="#E11D48" />{" "}
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

        {/* Projects */}
        {settings.showProjects !== false && projects && projects.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: primaryColor,
                margin: 0,
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
                      color: "#000000",
                      marginTop: "0.1rem",
                    }}
                  >
                    {proj.technologies && (
                      <span style={{ fontWeight: "normal", color: "#475569" }}>
                        {proj.technologies}
                      </span>
                    )}
                    {(proj.duration || proj.date) && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2rem",
                        }}
                      >
                        <Calendar size={11} color="#E11D48" />
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

        {/* Education */}
        {settings.showEducation !== false &&
          education &&
          education.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: primaryColor,
                  margin: 0,
                }}
              >
                Education
              </h3>
              {divider}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
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
                        color: "#000000",
                        marginTop: "0.1rem",
                      }}
                    >
                      <span style={{ fontWeight: "normal", color: "#475569" }}>
                        {edu.school || edu.institution}
                      </span>
                      {edu.cgpa && (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.2rem",
                          }}
                        >
                          <Award size={11} color="#E11D48" />
                          CGPA: {edu.cgpa}
                        </span>
                      )}
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2rem",
                        }}
                      >
                        <Calendar size={11} color="#E11D48" />
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
                          }}
                        >
                          <MapPin size={11} color="#E11D48" />{" "}
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

        {/* Certifications */}
        {settings.showCertifications !== false &&
          certifications &&
          certifications.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: primaryColor,
                  margin: 0,
                }}
              >
                Certifications
              </h3>
              {divider}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {certifications.map((cert, index) => (
                  <div key={cert.id || index}>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "13px",
                        color: "#000000",
                      }}
                    >
                      {cert.name || cert.title}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                        fontSize: "11.5px",
                        color: "#000000",
                        marginTop: "0.1rem",
                      }}
                    >
                      {cert.issuer && (
                        <span
                          style={{
                            textDecoration: "underline",
                            color: "#0000ee",
                          }}
                        >
                          {cert.issuer}
                        </span>
                      )}
                      {cert.date && (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.2rem",
                          }}
                        >
                          <Calendar size={11} color="#E11D48" />
                          {cert.date}
                        </span>
                      )}
                    </div>
                    {cert.details && (
                      <ul
                        style={{
                          margin: "0.2rem 0 0 1rem",
                          padding: 0,
                          fontSize: "12px",
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

        {/* Languages */}
        {settings.showLanguages !== false &&
          languages &&
          languages.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: primaryColor,
                  margin: 0,
                }}
              >
                Languages
              </h3>
              {divider}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.4rem 2rem",
                  fontSize: "12px",
                }}
              >
                {languages.map((lang, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1.5px solid #E11D48",
                      paddingBottom: "3px",
                      width: "90%",
                    }}
                  >
                    <span style={{ fontWeight: "normal", color: "#000000" }}>
                      {typeof lang === 'object' ? lang.name : String(lang)}
                    </span>
                    {typeof lang === 'object' && lang.proficiency && (
                      <span style={{ color: "#000000", fontWeight: "normal" }}>
                        {lang.proficiency}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Hobbies */}
        {settings.showHobbies !== false && activeHobbies.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: primaryColor,
                margin: 0,
              }}
            >
              Hobbies
            </h3>
            {divider}
            <ul
              style={{
                margin: "0.2rem 0 0 1rem",
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

        {/* Custom Sections */}
        {settings.showCustomSections !== false &&
          customSections &&
          customSections.length > 0 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {customSections
                .filter((sec) => sec && sec.title)
                .map((sec, idx) => (
                  <div key={sec.id || idx} style={{ marginBottom: "1rem" }}>
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: primaryColor,
                        margin: 0,
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
                              <span
                                style={{ fontSize: "8px", marginTop: "4px" }}
                              >
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

export default PinkHeaderTemplate;
