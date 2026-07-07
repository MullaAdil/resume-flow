import React from "react";

import { Mail, Phone, MapPin, Globe } from "lucide-react";

const ClassicTemplate = ({ resumeData }) => {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    settings = {},
  } = resumeData;
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
        width: "100%",
        height: "1px",
        background: "#e2e8f0",
        margin: "1.5rem 0",
      }}
    ></div>
  );

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#fff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        padding: marginPadding,
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: "#111",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: "bold",
            margin: "0 0 0.2rem 0",
          }}
        >
          {personalInfo.fullName}
        </h1>
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: "normal",
            margin: "0 0 1rem 0",
            color: "#444",
          }}
        >
          {personalInfo.jobTitle}
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.8rem",
            color: "#333",
          }}
        >
          {personalInfo.phone && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
            >
              <Phone size={12} /> {personalInfo.phone}
            </div>
          )}
          {personalInfo.email && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
            >
              <Mail size={12} /> {personalInfo.email}
            </div>
          )}
          {personalInfo.location && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
            >
              <MapPin size={12} /> {personalInfo.location}
            </div>
          )}
          {personalInfo.website && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
            >
              <Globe size={12} /> {personalInfo.website}
            </div>
          )}
        </div>
      </div>

      {divider}

      {/* Summary */}
      {personalInfo.summary && (
        <div>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "1rem",
              letterSpacing: "0.5px",
            }}
          >
            Summary
          </h3>
          <p style={{ lineHeight: 1.6, fontSize: "0.85rem", color: "#333" }}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {skills.length > 0 && divider}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "1rem",
              letterSpacing: "0.5px",
            }}
          >
            Skills
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.5rem",
            }}
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                style={{
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ color: "#666" }}>•</span> {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {experience.length > 0 && divider}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
              letterSpacing: "0.5px",
            }}
          >
            Experience
          </h3>

          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.2rem",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                  {exp.title}
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#555",
                    fontWeight: "bold",
                  }}
                >
                  {exp.date}
                </div>
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#444",
                  marginBottom: "0.8rem",
                }}
              >
                {exp.company}
              </div>

              <div
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  color: "#333",
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
                      <span style={{ color: "#666" }}>•</span>{" "}
                      <span>{line}</span>
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {settings.showProjects !== false &&
        projects &&
        projects.length > 0 &&
        divider}

      {/* Projects */}
      {settings.showProjects !== false && projects && projects.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
              letterSpacing: "0.5px",
            }}
          >
            Projects
          </h3>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.2rem",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                  {proj.name || proj.title}
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#555",
                    fontWeight: "bold",
                  }}
                >
                  {proj.duration || proj.date}
                </div>
              </div>
              {proj.technologies && (
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: "#444",
                    marginBottom: "0.8rem",
                    fontStyle: "italic",
                  }}
                >
                  {proj.technologies}
                </div>
              )}
              {proj.description && (
                <div
                  style={{
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                    color: "#333",
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
                        <span style={{ color: "#666" }}>•</span>{" "}
                        <span>{line}</span>
                      </div>
                    ) : null,
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && divider}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
              letterSpacing: "0.5px",
            }}
          >
            Education
          </h3>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.2rem",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "0.95rem" }}>
                  {edu.degree}
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#555",
                    fontWeight: "bold",
                  }}
                >
                  {edu.date}
                </div>
              </div>
              <div style={{ fontSize: "0.9rem", color: "#444" }}>
                {edu.school}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;
