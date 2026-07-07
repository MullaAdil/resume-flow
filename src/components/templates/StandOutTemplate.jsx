import React from "react";

import {
  Mail,
  Phone,
  MapPin,
  User,
  GraduationCap,
  Briefcase,
  Award,
  Globe,
} from "lucide-react";

const StandOutTemplate = ({ resumeData }) => {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    settings = {},
  } = resumeData;
  const marginPadding =
    settings.margins === "Compact"
      ? "1.5rem 2rem"
      : settings.margins === "Spacious"
        ? "3rem 3.5rem"
        : "2rem 2.5rem";

  const sidebarBg = settings.primaryColor || "#3b82f6";
  const topBlockBg = "#1e3a8a";

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#fff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, Helvetica, sans-serif",
        display: "flex",
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: "32%",
          background: sidebarBg,
          color: "#fff",
          padding: marginPadding,
        }}
      >
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: "normal",
            marginBottom: "0.2rem",
            lineHeight: 1.1,
          }}
        >
          {personalInfo.fullName}
        </h1>
        <h2
          style={{
            fontSize: "0.9rem",
            fontWeight: "normal",
            marginBottom: "2.5rem",
            opacity: 0.9,
          }}
        >
          {personalInfo.jobTitle}
        </h2>

        <div style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              fontSize: "0.8rem",
            }}
          >
            {personalInfo.phone && (
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <Phone size={14} /> <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <Mail size={14} />{" "}
                <span style={{ wordBreak: "break-all" }}>
                  {personalInfo.email}
                </span>
              </div>
            )}
            {personalInfo.location && (
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <MapPin size={14} /> <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <Globe size={14} /> <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {skills.length > 0 && (
          <div>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#fff",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Skills
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              {skills.map((skill, index) => (
                <div key={index} style={{ fontSize: "0.85rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.2rem",
                    }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#fff",
                      }}
                    ></div>
                    {skill}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={{ width: "68%", display: "flex", flexDirection: "column" }}>
        {/* Top Summary Block */}
        <div
          style={{
            background: topBlockBg,
            padding: "3rem 2.5rem 2rem 2.5rem",
            color: "#fff",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <User size={18} /> Professional Summary
          </h3>
          <p style={{ lineHeight: 1.6, fontSize: "0.85rem", opacity: 0.9 }}>
            {personalInfo.summary ||
              "Highly motivated and result-oriented professional with over 10 years of experience."}
          </p>
        </div>

        <div style={{ padding: "2rem 2.5rem", flex: 1 }}>
          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: "2.5rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: topBlockBg,
                  marginBottom: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <GraduationCap size={20} /> Education
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.95rem",
                        color: "#111",
                      }}
                    >
                      {edu.school}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ fontSize: "0.85rem", color: "#333" }}>
                        {edu.degree}
                      </div>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          background: sidebarBg,
                          color: "white",
                          padding: "0.1rem 0.5rem",
                          borderRadius: "1rem",
                        }}
                      >
                        {edu.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {settings.showProjects !== false &&
            projects &&
            projects.length > 0 && (
              <div style={{ marginBottom: "2.5rem" }}>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: topBlockBg,
                    marginBottom: "1.2rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Briefcase size={20} /> Projects
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "0.95rem",
                          color: "#111",
                          marginBottom: "0.1rem",
                        }}
                      >
                        {proj.name || proj.title}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.8rem",
                        }}
                      >
                        <div style={{ fontSize: "0.85rem", color: "#333" }}>
                          {proj.technologies}
                        </div>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            background: sidebarBg,
                            color: "white",
                            padding: "0.1rem 0.5rem",
                            borderRadius: "1rem",
                          }}
                        >
                          {proj.duration || proj.date}
                        </span>
                      </div>
                      {proj.description && (
                        <div
                          style={{
                            fontSize: "0.85rem",
                            color: "#334155",
                            lineHeight: 1.5,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {proj.description.split("\n").map((line, i) =>
                            line.trim().length > 0 ? (
                              <div
                                key={i}
                                style={{
                                  display: "flex",
                                  gap: "0.5rem",
                                  marginBottom: "0.3rem",
                                }}
                              >
                                <span style={{ color: topBlockBg }}>•</span>{" "}
                                <span>{line}</span>
                              </div>
                            ) : null,
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: "2.5rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: topBlockBg,
                  marginBottom: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Briefcase size={20} /> Experience
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.95rem",
                        color: "#111",
                        marginBottom: "0.1rem",
                      }}
                    >
                      {exp.company}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.8rem",
                      }}
                    >
                      <div style={{ fontSize: "0.85rem", color: "#333" }}>
                        {exp.title}
                      </div>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          background: sidebarBg,
                          color: "white",
                          padding: "0.1rem 0.5rem",
                          borderRadius: "1rem",
                        }}
                      >
                        {exp.date}
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "#334155",
                        lineHeight: 1.5,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {exp.description.split("\n").map((line, i) =>
                        line.trim().length > 0 ? (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              gap: "0.5rem",
                              marginBottom: "0.3rem",
                            }}
                          >
                            <span style={{ color: topBlockBg }}>•</span>{" "}
                            <span>{line}</span>
                          </div>
                        ) : null,
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StandOutTemplate;
