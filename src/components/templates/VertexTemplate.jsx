import React from "react";

import { Mail, Phone, MapPin, Globe } from "lucide-react";

const VertexTemplate = ({ resumeData }) => {
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

  const sidebarBg = settings.primaryColor || "#fdf4f0"; // Very pale beige/peach

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#fff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, Helvetica, sans-serif",
        display: "flex",
        color: "#333",
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{ width: "35%", background: sidebarBg, padding: "3rem 2.5rem" }}
      >
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: "bold",
            color: "#111",
            margin: "0 0 0.5rem 0",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          {(personalInfo.fullName || "").split(" ").map((n, i) => (
            <div key={i}>{n}</div>
          ))}
        </h1>
        <h2
          style={{ fontSize: "0.95rem", color: "#555", marginBottom: "2.5rem" }}
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
                color: "#111",
                marginBottom: "1rem",
                paddingBottom: "0.5rem",
              }}
            >
              Skills
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {skills.map((skill, index) => (
                <div key={index} style={{ fontSize: "0.85rem" }}>
                  <div
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
                        borderRadius: "50%",
                        background: "#111",
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
      <div style={{ width: "65%", padding: "3rem 3rem" }}>
        {/* Summary */}
        {personalInfo.summary && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#111",
                marginBottom: "0.8rem",
              }}
            >
              Summary
            </h3>
            <p style={{ lineHeight: 1.6, fontSize: "0.85rem", color: "#444" }}>
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Projects */}
        {settings.showProjects !== false && projects && projects.length > 0 && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#111",
                marginBottom: "1rem",
              }}
            >
              Projects
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
                    <div style={{ fontSize: "0.8rem", color: "#777" }}>
                      {proj.duration || proj.date}
                    </div>
                  </div>
                  {proj.description && (
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "#444",
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
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#111",
                marginBottom: "1rem",
              }}
            >
              Education
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
                      fontSize: "0.85rem",
                      color: "#555",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {edu.degree}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#777" }}>
                    {edu.date}
                  </div>
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
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#111",
                marginBottom: "1rem",
              }}
            >
              Experience
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
                    <div style={{ fontSize: "0.8rem", color: "#777" }}>
                      {exp.date}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#444",
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
      </div>
    </div>
  );
};

export default VertexTemplate;
