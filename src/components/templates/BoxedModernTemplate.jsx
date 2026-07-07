import React from "react";
import { Mail, Phone, MapPin, Globe, Calendar, Award } from "lucide-react";

const localDummyData = {
  personalInfo: {
    fullName: "Aarav Joshi",
    jobTitle: "Technical Writer",
    email: "joshi@goresume.io",
    phone: "+918527122712",
    location: "Bangalore , India",
    linkedin: "LinkedIn",
    github: "Github",
    summary:
      "A CS Graduate who found love in writing. With over three years of expertise in creating, editing, and maintaining high-quality technical documentation, I am adept at translating complex technical information into clear, user-friendly manuals and online content. Proficient in utilizing various documentation tools and platforms. I do think I will be a great fit in your team. Further, I have good at collaborating with cross-functional teams to deliver precise and effective documentation.",
  },
  experience: [
    {
      id: "boxed-exp-1",
      title: "Technical Writer",
      company: "Studymitr AI Private Limited",
      date: "July 2024 - Present",
      location: "Gurugram",
      description:
        "Developed and maintained user manuals, installation guides, and API documentation for various software products.\nCollaborated with software engineers, product managers, and UX designers to gather information and ensure accuracy of documentation.\nImplemented a new documentation process using MadCap Flare, which improved consistency and reduced errors by 20%.\nConducted usability testing of documentation with end users, leading to a 15% improvement in user satisfaction.\nTrained new technical writers and provided ongoing mentorship to junior team members.",
    },
  ],
  education: [
    {
      id: "boxed-edu-1",
      degree: "BSc in Computer Science",
      school: "Thapper University",
      cgpa: "8.5",
      date: "July 2021 - May 2024",
      location: "Chandigarh",
      details:
        "Core courses included Data Structures and Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, and Computer Networks.\nDeveloped strong problem-solving and analytical skills through extensive coursework and practical application.\nGained hands-on experience in software development, web development, and database design.",
    },
  ],
  projects: [
    {
      id: "boxed-proj-1",
      name: "User Guide For Cloud-Based Software",
      link: "https://githubLink.com/project",
      duration: "February 2023 - May 2023",
      description:
        "Created a comprehensive user guide for a new cloud-based software application.\nWorked with the UX team to integrate documentation into the user interface for seamless access.\nAchieved a 95% satisfaction rate from users based on feedback surveys.",
    },
  ],
  skills: [
    "Technical documentation writing",
    "Clear and concise communication",
    "Writing user manuals, guides, and SOPs",
    "Product requirement documents (PRDs)",
    "API Documentation",
    "Microsoft Office Suite",
  ],
  languages: [
    { name: "English", proficiency: "Native" },
    { name: "Japanese", proficiency: "Conversational" },
    { name: "Hindi", proficiency: "Native" },
  ],
  hobbies: [
    "Photography & Videography",
    "Fitness & Gym",
    "Podcast Listening",
    "Travelling",
    "Reading Self-Development Books",
  ],
};

const BoxedModernTemplate = ({ resumeData }) => {
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
      : resumeData?.hobbies || localDummyData.hobbies;

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
        padding: "3.5rem 4rem",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: "#000000",
        lineHeight: "1.4",
        fontSize: "13px",
      }}
    >
      {/* Boxed Title Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            border: "2.5px solid #008080",
            padding: "0.5rem 2.5rem",
            textAlign: "center",
            minWidth: "350px",
          }}
        >
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "bold",
              color: "#000000",
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {personalInfo.fullName}
          </h1>
          {personalInfo.jobTitle && (
            <h2
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: primaryColor,
                margin: "0.1rem 0 0 0",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {personalInfo.jobTitle}
            </h2>
          )}
        </div>

        {/* Contact info row below box */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.8rem",
            fontSize: "11.5px",
            color: "#000000",
            marginTop: "0.5rem",
          }}
        >
          {personalInfo.phone && (
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}
            >
              <Phone size={11} color="#008080" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.email && (
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}
            >
              <Mail size={11} color="#008080" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.location && (
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}
            >
              <MapPin size={11} color="#008080" />{" "}
              {formatLocation(personalInfo.location)}
            </span>
          )}
          {personalInfo.linkedin && (
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}
            >
              <Globe size={11} color="#008080" /> {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}
            >
              <Globe size={11} color="#008080" /> {personalInfo.github}
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
                    {exp.title}
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
                    {edu.degree || "Degree"}
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
                  {proj.name}
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
                  {proj.duration && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.2rem",
                        color: "#000000",
                      }}
                    >
                      <Calendar size={11} color="#008080" />
                      {proj.duration}
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
                        <strong>{lang.name}</strong>{" "}
                        {lang.proficiency ? `(${lang.proficiency})` : ""}
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

export default BoxedModernTemplate;
