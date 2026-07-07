import React from "react";

import { Mail, Phone, MapPin, Globe } from "lucide-react";

const BasicTemplate = ({ resumeData }) => {
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

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#fff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        padding: marginPadding,
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#111",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontSize: "2rem",
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
            margin: "0 0 0.8rem 0",
          }}
        >
          {personalInfo.jobTitle}
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
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

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
              letterSpacing: "1px",
            }}
          >
            Summary
          </h3>
          <p style={{ lineHeight: 1.6, fontSize: "0.85rem" }}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
              letterSpacing: "1px",
            }}
          >
            Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {skills.map((skill, index) => (
              <span key={index} style={{ fontSize: "0.85rem" }}>
                {skill}
                {index < skills.length - 1 ? " • " : ""}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
              letterSpacing: "1px",
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
                  {exp.company}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#555" }}>
                  {exp.date}
                </div>
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  marginBottom: "0.5rem",
                }}
              >
                {exp.title}
              </div>

              <div
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
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
      )}

      {/* Projects */}
      {settings.showProjects !== false && projects && projects.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
              letterSpacing: "1px",
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
                <div style={{ fontSize: "0.85rem", color: "#555" }}>
                  {proj.duration || proj.date}
                </div>
              </div>
              {proj.technologies && (
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                    marginBottom: "0.5rem",
                    color: "#666",
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
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
              letterSpacing: "1px",
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
                  {edu.school}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#555" }}>
                  {edu.date}
                </div>
              </div>
              <div style={{ fontSize: "0.9rem", fontStyle: "italic" }}>
                {edu.degree}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BasicTemplate;
