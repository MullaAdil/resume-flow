import React from "react";

import { Mail, Phone, MapPin, Globe, Calendar } from "lucide-react";

const localDummyData = {
  personalInfo: {
    fullName: "Dhiraj Rajput",
    jobTitle: "UI/UX Designer",
    email: "dhiraj@goresume.io",
    phone: "+918527122712",
    location: "Bangalore , India",
    linkedin: "LinkedIn",
    github: "Github",
    summary:
      "Creative UI/UX Designer with 3+ years of experience in designing intuitive and beautiful digital interfaces. Skilled in user research, wireframing, prototyping, and collaborating with developers to deliver clean, modern web and mobile applications.",
  },
  experience: [
    {
      id: "teal-exp-1",
      title: "UI/UX Designer",
      company: "TCS Ltd.",
      date: "July 2022 - Present",
      location: "Bangalore",
      description:
        "Led the redesign of a major enterprise dashboard, resulting in a 35% increase in user engagement.\nCollaborated with product managers to define user requirements and develop strategic wireframes.",
    },
    {
      id: "teal-exp-2",
      title: "UX Intern",
      company: "Cognizant Technology Solutions",
      date: "January 2021 - June 2022",
      location: "Bangalore",
      description:
        "Conducted 15+ user testing sessions to identify critical interface friction points, improving conversion rates by 12%.",
    },
  ],
  education: [
    {
      id: "teal-edu-1",
      degree: "Master of Science in Design",
      school: "IDC School of Design, IIT Bombay",
      date: "July 2019 - May 2021",
      location: "Mumbai",
      details: "Specialization in Interaction Design",
    },
    {
      id: "teal-edu-2",
      degree: "Bachelor of Design",
      school: "NID Ahmedabad",
      date: "July 2015 - May 2019",
      location: "Ahmedabad",
      details: "Specialization in Communication Design",
    },
  ],
  skills: [
    "User Research",
    "Wireframing",
    "Prototyping",
    "Figma",
    "Adobe XD",
    "Adobe Illustrator",
    "HTML & CSS",
    "Usability Testing",
    "Information Architecture",
    "Interaction Design",
  ],
  languages: [
    { name: "Hindi", proficiency: "Native" },
    { name: "English", proficiency: "Highly Proficient" },
  ],
  hobbies: [
    "Photography & Videography",
    "Fitness & Gym",
    "Podcast Listening",
    "Travelling",
    "Reading Self-Development Books",
  ],
};

const TealHeaderTemplate = ({ resumeData }) => {
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
  const primaryColor = settings.primaryColor || "#007E6F";
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
        background: primaryColor,
        margin: "0.4rem 0 0.6rem 0",
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
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: "#000000",
        lineHeight: "1.4",
        fontSize: "13px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Teal Header Banner */}
      <div
        style={{
          background: primaryColor,
          color: "#FFFFFF",
          padding: "2rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.35rem",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#FFFFFF",
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
              color: "#E2F1E8",
              margin: "0.1rem 0 0.5rem 0",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            {personalInfo.jobTitle}
          </h2>
        )}

        {/* Contact info row in Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "11.5px",
            color: "#E2F1E8",
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
              <Phone size={12} color="#E2F1E8" /> {personalInfo.phone}
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
              <Mail size={12} color="#E2F1E8" /> {personalInfo.email}
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
              <MapPin size={12} color="#E2F1E8" />{" "}
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
              <Globe size={12} color="#E2F1E8" /> {personalInfo.linkedin}
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
              <Globe size={12} color="#E2F1E8" /> {personalInfo.github}
            </span>
          )}
        </div>
      </div>

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
                textTransform: "uppercase",
                letterSpacing: "0.5px",
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

        {/* Skills (Underlined Tags list) */}
        {settings.showSkills !== false && activeSkills.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: primaryColor,
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
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
                    borderBottom: "1.5px solid #007E6F",
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
                  textTransform: "uppercase",
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
                      {exp.title}
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
                        <Calendar size={11} color="#007E6F" />
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
                          <MapPin size={11} color="#007E6F" />{" "}
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
                textTransform: "uppercase",
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
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.2rem",
                      }}
                    >
                      <Calendar size={11} color="#007E6F" />
                      {proj.duration || proj.date}
                    </span>
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
                  textTransform: "uppercase",
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
                      {edu.degree || "Degree"}
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
                          <Calendar size={11} color="#007E6F" />
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
                        <Calendar size={11} color="#007E6F" />
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
                          <MapPin size={11} color="#007E6F" />{" "}
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
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
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
                      {cert.name}
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
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.2rem",
                        }}
                      >
                        <Calendar size={11} color="#007E6F" />
                        {cert.date}
                      </span>
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
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
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
                      borderBottom: "1.5px solid #007E6F",
                      paddingBottom: "3px",
                      width: "90%",
                    }}
                  >
                    <span style={{ fontWeight: "normal", color: "#000000" }}>
                      {lang.name}
                    </span>
                    <span style={{ color: "#000000", fontWeight: "normal" }}>
                      {lang.proficiency || "Conversational"}
                    </span>
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
                textTransform: "uppercase",
                letterSpacing: "0.5px",
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
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: primaryColor,
                        margin: 0,
                        textTransform: "uppercase",
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

export default TealHeaderTemplate;
