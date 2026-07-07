import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const SoothingTemplate = ({ resumeData }) => {
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

  const tealColor = settings.primaryColor || "#14b8a6";
  const darkTealColor = "#0f766e";

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#fff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#333",
      }}
    >
      {/* Header Banner */}
      <div
        style={{
          background: "#f0fdfa",
          padding: "2.5rem 3rem",
          borderBottom: `4px solid ${tealColor}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: "bold",
              color: "#111",
              margin: "0 0 0.2rem 0",
            }}
          >
            {personalInfo.fullName}
          </h1>
          <h2
            style={{
              fontSize: "1rem",
              color: darkTealColor,
              fontWeight: "bold",
              margin: 0,
            }}
          >
            {personalInfo.jobTitle}
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
            fontSize: "0.8rem",
            textAlign: "right",
          }}
        >
          {personalInfo.phone && (
            <div>
              {personalInfo.phone}{" "}
              <Phone
                size={12}
                style={{ marginLeft: "0.3rem", color: tealColor }}
              />
            </div>
          )}
          {personalInfo.email && (
            <div>
              {personalInfo.email}{" "}
              <Mail
                size={12}
                style={{ marginLeft: "0.3rem", color: tealColor }}
              />
            </div>
          )}
          {personalInfo.location && (
            <div>
              {personalInfo.location}{" "}
              <MapPin
                size={12}
                style={{ marginLeft: "0.3rem", color: tealColor }}
              />
            </div>
          )}
          {personalInfo.website && (
            <div>
              {personalInfo.website}{" "}
              <Globe
                size={12}
                style={{ marginLeft: "0.3rem", color: tealColor }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div
          style={{
            background: darkTealColor,
            color: "white",
            padding: "1.5rem 3rem",
            fontSize: "0.85rem",
            lineHeight: 1.5,
          }}
        >
          {personalInfo.summary}
        </div>
      )}

      {/* Two Column Layout */}
      <div style={{ display: "flex", padding: "2.5rem 3rem", gap: "2rem" }}>
        {/* Left Column */}
        <div style={{ width: "60%" }}>
          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: tealColor,
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: tealColor,
                    borderRadius: "50%",
                  }}
                ></span>{" "}
                Experience
              </h3>

              <div
                style={{
                  borderLeft: `1px solid ${tealColor}`,
                  paddingLeft: "1rem",
                  marginLeft: "0.2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {experience.map((exp) => (
                  <div key={exp.id} style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "-1.35rem",
                        top: "0.3rem",
                        width: "8px",
                        height: "8px",
                        background: "#fff",
                        border: `2px solid ${tealColor}`,
                        borderRadius: "50%",
                      }}
                    ></div>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.95rem",
                        color: "#111",
                      }}
                    >
                      {exp.company}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <div style={{ fontSize: "0.85rem", color: "#333" }}>
                        {exp.title}
                      </div>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          background: tealColor,
                          color: "white",
                          padding: "0.1rem 0.5rem",
                          borderRadius: "2px",
                        }}
                      >
                        {exp.date}
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: "0.85rem",
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
                              marginBottom: "0.2rem",
                            }}
                          >
                            <span>•</span> <span>{line}</span>
                          </div>
                        ) : null,
                      )}
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
              <div style={{ marginBottom: "2rem" }}>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: tealColor,
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      background: tealColor,
                      borderRadius: "50%",
                    }}
                  ></span>{" "}
                  Projects
                </h3>
                <div
                  style={{
                    borderLeft: `1px solid ${tealColor}`,
                    paddingLeft: "1rem",
                    marginLeft: "0.2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  {projects.map((proj) => (
                    <div key={proj.id} style={{ position: "relative" }}>
                      <div
                        style={{
                          position: "absolute",
                          left: "-1.35rem",
                          top: "0.3rem",
                          width: "8px",
                          height: "8px",
                          background: "#fff",
                          border: `2px solid ${tealColor}`,
                          borderRadius: "50%",
                        }}
                      ></div>
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "0.95rem",
                          color: "#111",
                        }}
                      >
                        {proj.name || proj.title}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <div style={{ fontSize: "0.85rem", color: "#333" }}>
                          {proj.technologies}
                        </div>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            background: tealColor,
                            color: "white",
                            padding: "0.1rem 0.5rem",
                            borderRadius: "2px",
                          }}
                        >
                          {proj.duration || proj.date}
                        </span>
                      </div>
                      {proj.description && (
                        <div
                          style={{
                            fontSize: "0.85rem",
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
                                  marginBottom: "0.2rem",
                                }}
                              >
                                <span>•</span> <span>{line}</span>
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

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: tealColor,
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: tealColor,
                    borderRadius: "50%",
                  }}
                ></span>{" "}
                Education
              </h3>
              <div
                style={{
                  borderLeft: `1px solid ${tealColor}`,
                  paddingLeft: "1rem",
                  marginLeft: "0.2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {education.map((edu) => (
                  <div key={edu.id} style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: "-1.35rem",
                        top: "0.3rem",
                        width: "8px",
                        height: "8px",
                        background: "#fff",
                        border: `2px solid ${tealColor}`,
                        borderRadius: "50%",
                      }}
                    ></div>
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
                          background: tealColor,
                          color: "white",
                          padding: "0.1rem 0.5rem",
                          borderRadius: "2px",
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
        </div>

        {/* Right Column */}
        <div style={{ width: "40%" }}>
          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: tealColor,
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: tealColor,
                    borderRadius: "50%",
                  }}
                ></span>{" "}
                Skills
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                  fontSize: "0.85rem",
                }}
              >
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        background: "#333",
                        borderRadius: "50%",
                      }}
                    ></div>
                    {skill}
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

export default SoothingTemplate;
