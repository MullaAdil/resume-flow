import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const localDummyData = {
  personalInfo: {
    fullName: "Janet Kumo",
    jobTitle: "Business Process Associate",
    email: "kumo@goresume.io",
    phone: "+918527122712",
    location: "Bangalore , India",
    linkedin: "LinkedIn",
    summary:
      "Highly motivated Business Process Associate with proven expertise in process optimization and payments management. Over the last few years, I have gained expert-level proficiency in process mapping, data analysis, stakeholder management, accounts payables, and accounts receivables. I am confident that I will be a valuable addition to finance operations or admin teams. I am multilingual and can contribute immensely in global businesses.",
  },
  experience: [
    {
      id: "janet-exp-1",
      title: "Business Process Associate",
      company: "Amazon Development Centre",
      date: "July 2024 - Present",
      location: "Gurugram",
      description:
        "Worked in payments reconciliation department managing accounts payables and accounts receivables workflows.\nCollaborated with global business teams to resolve payment exceptions and billing disputes.",
    },
  ],
  education: [
    {
      id: "janet-edu-1",
      degree: "Master of Commerce (M.Com)",
      school: "University of Hyderabad",
      date: "July 2021 - May 2023",
      location: "Hyderabad",
      details:
        "Gained specialized knowledge in business administration, financial auditing, and taxation.",
    },
  ],
  skills: [
    "Process mapping & optimization",
    "Stakeholder management",
    "Data analysis & reporting",
    "Accounts payables & receivables",
    "Auditing & compliance reporting",
    "ERP tools (SAP, Oracle)",
  ],
  languages: [
    { name: "English", proficiency: "Highly Proficient" },
    { name: "Hindi", proficiency: "Native" },
    { name: "Japanese", proficiency: "Conversational" },
  ],
};

const JanetTemplate = ({ resumeData }) => {
  const hasUserData =
    resumeData?.personalInfo?.fullName &&
    resumeData.personalInfo.fullName.trim().length > 0;

  const activeData = hasUserData ? resumeData : localDummyData;
  const {
    personalInfo,
    experience,
    education,
    skills,
    certifications,
    languages,
    interests,
    customSections,
    projects,
  } = activeData;
  const settings = resumeData?.settings || {};
  const primaryColor = settings.primaryColor || "#0F172A";
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
        background: "#e2e8f0",
        margin: "0.6rem 0",
      }}
    ></div>
  );
  const skillsList = Array.isArray(skills) ? skills : [];

  const getSkillsArray = () => {
    if (skillsList.length > 0) return skillsList;
    if (resumeData?.skills) {
      if (Array.isArray(resumeData.skills))
        return resumeData.skills.filter(Boolean);
      return Object.values(resumeData.skills).flat().filter(Boolean);
    }
    return localDummyData.skills;
  };
  const activeSkills = getSkillsArray();

  const activeHobbies =
    interests && interests.length > 0
      ? interests.map((i) => i.name || i)
      : resumeData?.hobbies || [];

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#ffffff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        padding: marginPadding,
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: primaryColor,
        lineHeight: "1.5",
        fontSize: "13px",
      }}
    >
      {/* Centered Name and Job Title */}
      <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "800",
            color: primaryColor,
            margin: "0 0 0.15rem 0",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {personalInfo.fullName}
        </h1>
        {personalInfo.jobTitle && (
          <h2
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "#64748b",
              margin: "0 0 0.75rem 0",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {personalInfo.jobTitle}
          </h2>
        )}

        {/* Gray Rounded badge contacts */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "0.2rem",
          }}
        >
          {personalInfo.phone && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                background: "#f1f5f9",
                color: "#334155",
                padding: "0.25rem 0.6rem",
                borderRadius: "15px",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              <Phone size={11} color="#64748b" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.email && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                background: "#f1f5f9",
                color: "#334155",
                padding: "0.25rem 0.6rem",
                borderRadius: "15px",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              <Mail size={11} color="#64748b" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.location && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                background: "#f1f5f9",
                color: "#334155",
                padding: "0.25rem 0.6rem",
                borderRadius: "15px",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              <MapPin size={11} color="#64748b" /> {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                background: "#f1f5f9",
                color: "#334155",
                padding: "0.25rem 0.6rem",
                borderRadius: "15px",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              <Globe size={11} color="#64748b" /> {personalInfo.linkedin}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {settings.showSummary !== false && personalInfo.summary && (
        <div style={{ marginBottom: "1.25rem" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "700",
              textTransform: "uppercase",
              color: primaryColor,
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
          <div style={{ marginBottom: "1.25rem" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "700",
                textTransform: "uppercase",
                color: primaryColor,
                margin: "0 0 0.2rem 0",
                letterSpacing: "0.5px",
              }}
            >
              Experience
            </h3>
            {divider}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {experience.map((exp, index) => (
                <div key={exp.id || index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      fontSize: "12.5px",
                    }}
                  >
                    <span style={{ fontWeight: "700", color: primaryColor }}>
                      {exp.title}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        fontWeight: "500",
                      }}
                    >
                      {exp.date ||
                        (exp.startDate && exp.endDate
                          ? `${exp.startDate} - ${exp.endDate}`
                          : exp.startDate || exp.endDate || "")}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      fontSize: "11.5px",
                      marginTop: "0.1rem",
                    }}
                  >
                    <span style={{ color: "#475569", fontWeight: "600" }}>
                      {exp.company}
                    </span>
                    <span style={{ color: "#64748b" }}>{exp.location}</span>
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
                            color: "#334155",
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
        <div style={{ marginBottom: "1.25rem" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "700",
              textTransform: "uppercase",
              color: primaryColor,
              margin: "0 0 0.2rem 0",
              letterSpacing: "0.5px",
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
                    fontSize: "12.5px",
                  }}
                >
                  <span style={{ fontWeight: "700", color: primaryColor }}>
                    {proj.name || proj.title}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    {proj.duration || proj.date}
                  </span>
                </div>
                {proj.technologies && (
                  <div
                    style={{
                      fontSize: "11.5px",
                      color: "#475569",
                      fontWeight: "600",
                      marginTop: "0.1rem",
                    }}
                  >
                    {proj.technologies}
                  </div>
                )}
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
                          color: "#334155",
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
          <div style={{ marginBottom: "1.25rem" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "700",
                textTransform: "uppercase",
                color: primaryColor,
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
                gap: "0.8rem",
              }}
            >
              {education.map((edu, index) => (
                <div key={edu.id || index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      fontSize: "12.5px",
                    }}
                  >
                    <span style={{ fontWeight: "700", color: primaryColor }}>
                      {edu.degree || "Degree"}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        fontWeight: "500",
                      }}
                    >
                      {edu.date ||
                        (edu.startDate && edu.endDate
                          ? `${edu.startDate} - ${edu.endDate}`
                          : edu.startDate || edu.endDate || "")}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      fontSize: "11.5px",
                      marginTop: "0.1rem",
                    }}
                  >
                    <span style={{ color: "#475569", fontWeight: "600" }}>
                      {edu.school || edu.institution}
                    </span>
                    <span style={{ color: "#64748b" }}>{edu.location}</span>
                  </div>
                  {edu.details && (
                    <ul
                      style={{
                        margin: "0.25rem 0 0 1rem",
                        padding: 0,
                        fontSize: "11.5px",
                        listStyleType: "disc",
                      }}
                    >
                      <li style={{ color: "#334155", paddingLeft: "0.2rem" }}>
                        {edu.details}
                      </li>
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Skills */}
      {settings.showSkills !== false && activeSkills.length > 0 && (
        <div style={{ marginBottom: "1.25rem" }}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "700",
              textTransform: "uppercase",
              color: primaryColor,
              margin: "0 0 0.2rem 0",
              letterSpacing: "0.5px",
            }}
          >
            Skills
          </h3>
          {divider}
          <div
            style={{ fontSize: "12px", color: "#334155", lineHeight: "1.5" }}
          >
            {activeSkills
              .map((s) => (typeof s === "object" ? s.name : s))
              .join(", ")}
          </div>
        </div>
      )}

      {/* Languages */}
      {settings.showLanguages !== false &&
        languages &&
        languages.length > 0 && (
          <div style={{ marginBottom: "1.25rem" }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "700",
                textTransform: "uppercase",
                color: primaryColor,
                margin: "0 0 0.2rem 0",
                letterSpacing: "0.5px",
              }}
            >
              Languages
            </h3>
            {divider}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                fontSize: "12px",
              }}
            >
              {languages.map((lang, index) => (
                <span key={index} style={{ color: "#334155" }}>
                  <strong>{lang.name}</strong>{" "}
                  {lang.proficiency ? `(${lang.proficiency})` : ""}
                  {index < languages.length - 1 && (
                    <span style={{ color: "#cbd5e1", marginLeft: "1rem" }}>
                      |
                    </span>
                  )}
                </span>
              ))}
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
              gap: "1.25rem",
              marginTop: "1.25rem",
            }}
          >
            {customSections
              .filter((sec) => sec.title)
              .map((sec, idx) => (
                <div key={sec.id || idx} style={{ marginBottom: "1.25rem" }}>
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      color: primaryColor,
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
                        color: "#334155",
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

export default JanetTemplate;
