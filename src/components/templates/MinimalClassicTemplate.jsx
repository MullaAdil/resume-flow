import React from "react";

import { Mail, Phone, MapPin, Globe } from "lucide-react";

const localDummyData = {
  personalInfo: {
    fullName: "Methali Rajoriya",
    jobTitle: "AI Engineer",
    email: "rajoriya@goresume.io",
    phone: "+918527122712",
    location: "Bangalore , India",
    linkedin: "LinkedIn",
    github: "Github",
    summary:
      "Innovative and results-driven AI Engineer with 3+ years of experience in developing machine learning models, natural language processing solutions, and computer vision applications. Skilled in Python, TensorFlow, and PyTorch with hands-on experience in deploying AI solutions in cloud environments.",
  },
  experience: [
    {
      id: "methali-exp-1",
      title: "AI Engineer",
      company: "Infosys Ltd.",
      date: "July 2022 - Present",
      location: "Bangalore",
      description:
        "Designed and deployed deep learning models for image recognition and NLP tasks\nImplemented AI solutions in cloud platforms like AWS and Azure\nCollaborated with cross-functional teams to integrate AI into production systems",
    },
    {
      id: "methali-exp-2",
      title: "Machine Learning Engineer",
      company: "Wipro Technologies",
      date: "July 2021 - June 2022",
      location: "Bangalore",
      description:
        "Developed and deployed predictive analytics models for comprehensive customer behavior analysis at Wipro Technologies.\nEngineered robust recommendation systems utilizing collaborative and content-based filtering techniques to optimize user engagement.",
    },
  ],
  education: [
    {
      id: "methali-edu-1",
      degree: "Master of Technology (M.Tech)",
      school: "IIT Delhi",
      date: "January 2019 - January 2021",
      location: "Delhi",
      details: "Specialization in Artificial Intelligence",
    },
    {
      id: "methali-edu-2",
      degree: "Bachelor of Technology (B.Tech)",
      school: "NIT Karnataka",
      date: "January 2015 - January 2019",
      location: "Karnataka",
      details: "Specialization in Computer Science and Engineering",
    },
  ],
  certifications: [
    {
      id: "methali-cert-1",
      name: "TensorFlow Developer Certificate - TensorFlow.org",
      issuer: "TensorFlow.org",
      date: "January 2021",
      details:
        "TensorFlow Developer Certificate\nAWS Certified Machine Learning Specialty",
    },
  ],
  skills: [
    "Python",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "AWS",
    "Azure",
    "Docker",
    "Git",
    "Communication",
    "Machine Learning",
    "Data Modeling",
    "Computer Vision",
    "Deep Learning",
    "Problem-Solving",
  ],
  languages: [
    { name: "Hindi", proficiency: "Very Good Command" },
    { name: "English", proficiency: "Highly Proficient" },
    { name: "Kannada", proficiency: "Native Speaker" },
  ],
};

const MinimalClassicTemplate = ({ resumeData }) => {
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
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
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
        </div>
      </div>

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
                    <span style={{ fontWeight: "bold" }}>{cert.name}</span>
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
              .filter((sec) => sec.title)
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
  );
};

export default MinimalClassicTemplate;
