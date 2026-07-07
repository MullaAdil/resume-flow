import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

// SupplementalSections import removed

const localDummyData = {
  personalInfo: {
    fullName: "Aarav Joshi",
    jobTitle: "Technical Writer",
    email: "joshi@goresume.io",
    phone: "+918527122712",
    location: "Bangalore , India",
    linkedin: "www.linkedin.com/xyz",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150",
    summary:
      "A CS Graduate who found love in writing. With over three years of expertise in creating, editing, and maintaining high-quality technical documentation, I am adept at translating complex technical information into clear, user-friendly manuals and online content. Proficient in utilizing various documentation tools and platforms. I do think I will be a great fit in your team. Further, I have good at collaborating with cross-functional teams to deliver precise and effective documentation.",
  },
  experience: [
    {
      id: "photo-exp-1",
      title: "Technical Writer",
      company: "Studymitr AI Private Limited",
      date: "07/2024 - 05/2025",
      location: "Gurugram",
      description:
        "Developed and maintained user manuals, installation guides, and API documentation for various software products.\nCollaborated with software engineers, product managers, and UX designers to gather information and ensure accuracy of documentation.\nImplemented a new documentation process using MadCap Flare, which improved consistency and reduced errors by 20%.\nConducted usability testing of documentation with end users, leading to a 15% improvement in user satisfaction.\nTrained new technical writers and provided ongoing mentorship to junior team members.",
    },
  ],
  education: [
    {
      id: "photo-edu-1",
      degree: "Master of Arts (M.A.) - English Literature",
      school: "University of Hyderabad",
      date: "07/2024 - 05/2026",
      location: "Hyderabad, Telangana",
      details:
        "Conducted academic research on modern English literature and linguistics.",
    },
    {
      id: "photo-edu-2",
      degree: "BSc in Computer Science · CGPA: 8.5",
      school: "Thapper University",
      date: "07/2021 - 05/2024",
      location: "Chandigarh",
      details:
        "Gained hands-on experience in software engineering, technical writing, and database design.",
    },
  ],
  projects: [
    {
      id: "photo-proj-1",
      name: "User Guide For Cloud-Based Software",
      link: "https://githubLink.com/project",
      duration: "02/2023 - 05/2023",
      description:
        "Created a comprehensive user guide for a new cloud-based software application.\nWorked with the UX team to integrate documentation into the user interface for seamless access.\nAchieved a 95% satisfaction rate from users based on feedback surveys.",
    },
  ],
  skills: [
    "Technical documentation writing",
    "Clear and concise communication",
    "Writing user manuals, guides",
    "Product requirement documents (PRDs)",
    "API Documentation",
    "Microsoft Office Suite",
  ],
  languages: [
    { name: "English", proficiency: "Native" },
    { name: "Hindi", proficiency: "Native" },
    { name: "Japanese", proficiency: "Conversational" },
  ],
};

const PhotoModernTemplate = ({ resumeData }) => {
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

  const initials = personalInfo.fullName
    ? personalInfo.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AJ";

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
      {/* Header with Photo */}
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
            alt={personalInfo.fullName}
            style={{
              width: "75px",
              height: "75px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "0.5rem",
              border: "1px solid #000",
            }}
          />
        ) : (
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
        )}

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
                    <span style={{ fontWeight: "bold" }}>{exp.title}</span>
                    <span style={{ fontWeight: "normal", fontSize: "11px" }}>
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
                      fontSize: "12px",
                      marginTop: "0.05rem",
                    }}
                  >
                    <span style={{ fontStyle: "italic" }}>{exp.company}</span>
                    <span style={{ fontSize: "11px" }}>
                      {formatLocation(exp.location)}
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
                    </span>
                    <span style={{ fontSize: "11px" }}>
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
                      fontSize: "12px",
                      marginTop: "0.05rem",
                    }}
                  >
                    <span style={{ fontStyle: "italic" }}>
                      {edu.school || edu.institution}
                    </span>
                    <span style={{ fontSize: "11px" }}>
                      {formatLocation(edu.location)}
                    </span>
                  </div>
                  {edu.details && (
                    <ul
                      style={{
                        margin: "0.15rem 0 0 1rem",
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
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
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
                  <span style={{ fontWeight: "bold" }}>{proj.name}</span>
                  <span style={{ fontSize: "11px" }}>
                    {proj.duration || proj.date}
                  </span>
                </div>
                {proj.link && (
                  <div style={{ fontSize: "11px", marginTop: "0.05rem" }}>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#0000ee", textDecoration: "underline" }}
                    >
                      {proj.link}
                    </a>
                  </div>
                )}
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
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0.3rem 1.5rem",
              fontSize: "12px",
            }}
          >
            {activeSkills.map((skill, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <span style={{ fontSize: "8px" }}>•</span>
                {typeof skill === "object" ? skill.name : skill}
              </div>
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
                gap: "0.4rem 2rem",
                fontSize: "12px",
              }}
            >
              {languages.map((lang, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "1rem",
                  }}
                >
                  <span>{lang.name}</span>
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
            {activeHobbies.join(" , ")}
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

export default PhotoModernTemplate;
