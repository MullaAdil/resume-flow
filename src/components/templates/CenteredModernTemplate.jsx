import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const localDummyData = {
  personalInfo: {
    fullName: "Natasha Dhawan",
    jobTitle: "Research Scientist",
    email: "dhawan@goresume.io",
    phone: "+918527122712",
    location: "New Delhi , India",
    linkedin: "LinkedIn",
    summary:
      "An aspiring Research Scientist with a strong foundation in pharmaceutical sciences and hands-on experience in advanced analytical techniques, including NMR Spectroscopy and chromatography. Demonstrates leadership and strategic management capabilities through impactful roles in sports and academic committees. Proven ability to synthesize medicinal compounds and streamline laboratory workflows, positioning for innovative contributions to pharmaceutical research and development.",
  },
  experience: [
    {
      id: "natasha-exp-1",
      title: "Research Scientist",
      company: "Biocon Limited",
      date: "06/2024 - Present",
      location: "Bengaluru, Karnataka",
      description:
        "Led innovative research initiatives in molecular biology and immunology, resulting in a 25% improvement in drug candidate efficacy.\nDesigned and executed complex experimental protocols, utilizing advanced cell culture, qPCR, and flow cytometry techniques.\nAuthored and presented research findings at national conferences, enhancing organizational visibility and scientific reputation.",
    },
    {
      id: "natasha-exp-2",
      title: "Research Intern",
      company: "Biocon Life Sciences Pvt. Ltd.",
      date: "01/2024 - 05/2024",
      location: "Bangalore",
      description:
        "Collaborated with a senior scientist to synthesize novel medicinal compound with therapeutic potential to the development of bipolar disorder treatments and supporting ongoing pharmaceutical research initiatives.\nMastered advanced analytical techniques including NMR Spectroscopy, Mass Spectrometry, IR Spectroscopy and chromatography, achieving 98% accuracy in compound identification and purity assessments.",
    },
  ],
  education: [
    {
      id: "natasha-edu-1",
      degree: "Ph.D. in Biotechnology",
      school: "Indian Institute of Science (IISc)",
      date: "07/2025 - Present",
      location: "Bengaluru, Karnataka",
      details:
        "Engaging in advanced research in Biotechnology at a top-tier institution.",
    },
    {
      id: "natasha-edu-2",
      degree: "B.E. in Biotechnology",
      school: "Birla Institute of Technology And Science (BITS)",
      date: "07/2020 - 05/2024",
      location: "Pilani",
      details:
        "Conducted hands-on experiments in microbiology, cell culture, and protein purification.",
    },
  ],
  projects: [
    {
      id: "natasha-proj-1",
      name: "Captain of Athletics Team",
      duration: "08/2023 | Pilani",
      description:
        "Led cross-functional teams in developing and deploying scalable software solutions, improving system efficiency by 25%.\nManaged full project lifecycle from conception to delivery, ensuring on-time and within-budget completion for 5+ key initiatives.\nImplemented data-driven strategies to optimize operational workflows, resulting in a 15% reduction in processing time.",
    },
  ],
  skills: [
    "Data Analysis (statistical modeling)",
    "Laboratory Techniques (spectroscopy, chromatography)",
    "Machine Learning (model development, Applications)",
    "Scientific Writing (grant proposals, publications)",
    "Research Design (experimental, observational)",
    "Programming (Python, R, MATLAB)",
  ],
  languages: [
    { name: "English", proficiency: "Highly Proficient" },
    { name: "Hindi", proficiency: "Native Speaker" },
  ],
};

const CenteredModernTemplate = ({ resumeData }) => {
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
    projects,
    customSections,
  } = activeData;
  const settings = resumeData?.settings || {};
  const primaryColor = settings.primaryColor || "#000000";
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

  // Helper to format locations nicely with space before comma
  const formatLocation = (loc) => {
    if (!loc) return "";
    return loc.replace(/,/, " ,");
  };

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#ffffff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        padding: "3rem 3.5rem",
        fontFamily: "'Times New Roman', Times, serif",
        color: "#000000",
        lineHeight: "1.4",
        fontSize: "13px",
      }}
    >
      {/* Centered Header */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
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
        </div>
      </div>

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
              PROFESSIONAL EXPERIENCE
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
                      {exp.title}
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
                        margin: "0.15rem 0 0 1rem",
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
                      {edu.degree || "Degree"}
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
                        margin: "0.1rem 0 0 1rem",
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

      {/* Responsibilities (Projects) */}
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
            RESPONSIBILITIES
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
                    {proj.name}
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: "normal" }}>
                    {proj.duration || proj.date}
                  </span>
                </div>
                {proj.description && (
                  <ul
                    style={{
                      margin: "0.15rem 0 0 1rem",
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
            <div style={{ fontSize: "12px", color: "#000000" }}>
              {languages.map((lang, index) => (
                <span key={index}>
                  <span style={{ fontWeight: "bold" }}>{lang.name}</span>
                  {lang.proficiency && <span> ({lang.proficiency})</span>}
                  {index < languages.length - 1 && (
                    <span style={{ margin: "0 0.5rem" }}>|</span>
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
              gap: "0.8rem",
              marginTop: "0.8rem",
            }}
          >
            {customSections
              .filter((sec) => sec.title)
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

export default CenteredModernTemplate;
