import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const PhotoModernTemplate = ({ resumeData }) => {
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
    photo: (p.photo && p.photo.trim()) || (p.profileImage && p.profileImage.trim()) || '',
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

  const initials = personalInfo.fullName
    ? personalInfo.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

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

  // Dot rating renderer (5-dot system matching the exact spacing)
  const renderDots = (lang) => {
    let rating = 3;
    if (lang && lang.level !== undefined) {
      rating = Math.round(lang.level / 20);
      if (rating < 1 && lang.level > 0) rating = 1;
    } else {
      const proficiency = typeof lang === "object" ? lang.proficiency : lang;
      const pLower = (proficiency || "").toLowerCase();
      if (
        pLower.includes("native") ||
        pLower.includes("highly proficient") ||
        pLower.includes("expert") ||
        pLower.includes("5")
      ) {
        rating = 5;
      } else if (
        pLower.includes("fluent") ||
        pLower.includes("professional") ||
        pLower.includes("skillful") ||
        pLower.includes("4")
      ) {
        rating = 4;
      } else if (
        pLower.includes("conversational") ||
        pLower.includes("intermediate") ||
        pLower.includes("3")
      ) {
        rating = 3;
      } else if (
        pLower.includes("basic") ||
        pLower.includes("elementary") ||
        pLower.includes("2")
      ) {
        rating = 2;
      }
    }

    return (
      <div
        style={{
          display: "flex",
          gap: "3px",
          marginLeft: "auto",
          paddingLeft: "1rem",
        }}
      >
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: dot <= rating ? "#000000" : "transparent",
              border: "1.2px solid #000000",
            }}
          />
        ))}
      </div>
    );
  };

  const formatLocation = (loc) => {
    if (!loc) return "";
    return loc.replace(/,/, " ,");
  };

  const hasContacts = personalInfo.location || personalInfo.phone || personalInfo.email || personalInfo.linkedin || personalInfo.github || personalInfo.website;

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
        fontSize: "13px",
        boxSizing: "border-box",
      }}
    >
      {/* Header with Photo */}
      {(personalInfo.fullName || personalInfo.photo || hasContacts) && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          {personalInfo.photo ? (
            <img
              src={personalInfo.photo}
              alt={personalInfo.fullName || "Profile"}
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "0.5rem",
                border: "1px solid #000",
              }}
            />
          ) : initials ? (
            <div
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "50%",
                backgroundColor: "#000000",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.8rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              {initials}
            </div>
          ) : null}

          {personalInfo.fullName && (
            <h1
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                margin: "0.2rem 0 0.2rem 0",
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
                  <MapPin size={11} /> {formatLocation(personalInfo.location)}
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
              textTransform: "uppercase",
              margin: "0 0 0.2rem 0",
              letterSpacing: "0.5px",
            }}
          >
            SUMMARY
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
                textTransform: "uppercase",
                margin: "0 0 0.2rem 0",
                letterSpacing: "0.5px",
              }}
            >
              EXPERIENCE
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
                    <span style={{ fontSize: "11px", fontWeight: "normal" }}>
                      {exp.date ||
                        (exp.startDate && exp.endDate
                          ? `${exp.startDate} - ${exp.endDate}`
                          : exp.startDate || exp.endDate || "")}
                      {exp.location ? ` | ${exp.location}` : ""}
                    </span>
                  </div>
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
              textTransform: "uppercase",
              margin: "0 0 0.2rem 0",
              letterSpacing: "0.5px",
            }}
          >
            PROJECTS
          </h3>
          {divider}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
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
                  <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                    {proj.name || proj.title}
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: "normal" }}>
                    {proj.duration || proj.date}
                  </span>
                </div>
                {proj.technologies && (
                  <div style={{ fontSize: "11px", color: "#475569", marginTop: "0.05rem" }}>
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
                textTransform: "uppercase",
                margin: "0 0 0.2rem 0",
                letterSpacing: "0.5px",
              }}
            >
              EDUCATION
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
                    <span style={{ fontSize: "11px", fontWeight: "normal" }}>
                      {edu.date ||
                        (edu.startDate && edu.endDate
                          ? `${edu.startDate} - ${edu.endDate}`
                          : edu.startDate || edu.endDate || "")}
                      {edu.location ? ` | ${edu.location}` : ""}
                    </span>
                  </div>
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
                textTransform: "uppercase",
                margin: "0 0 0.2rem 0",
                letterSpacing: "0.5px",
              }}
            >
              CERTIFICATIONS
            </h3>
            {divider}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
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
            SKILLS
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
                textTransform: "uppercase",
                margin: "0 0 0.2rem 0",
                letterSpacing: "0.5px",
              }}
            >
              LANGUAGES
            </h3>
            {divider}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.6rem 2.5rem",
              }}
            >
              {languages.map((lang, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#000000",
                  }}
                >
                  <span style={{ fontWeight: "normal" }}>
                    {typeof lang === "object" ? lang.name : lang}
                  </span>
                  {renderDots(lang)}
                </div>
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
              textTransform: "uppercase",
              margin: "0 0 0.2rem 0",
              letterSpacing: "0.5px",
            }}
          >
            HOBBIES
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

export default PhotoModernTemplate;
