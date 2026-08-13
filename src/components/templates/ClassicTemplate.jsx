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
      ? "1.25rem 1.75rem"
      : settings.margins === "Spacious"
        ? "2.5rem 3rem"
        : "1.75rem 2.25rem";

  const divider = (
    <div
      style={{
        width: "100%",
        height: "1px",
        background: "#CBD5E1",
        margin: "0.5rem 0",
      }}
    ></div>
  );

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131.42857px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#fff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        padding: marginPadding,
        fontFamily: "var(--resume-font-family, inherit)",
        color: "#111",
        boxSizing: "border-box"
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "0.75rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            margin: "0 0 0.15rem 0",
            letterSpacing: "-0.02em"
          }}
        >
          {personalInfo.fullName}
        </h1>
        {personalInfo.jobTitle && (
          <h2
            style={{
              fontSize: "0.95rem",
              fontWeight: "500",
              margin: "0 0 0.5rem 0",
              color: primaryColor,
            }}
          >
            {personalInfo.jobTitle}
          </h2>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
            fontSize: "0.8rem",
            color: "#475569",
          }}
        >
          {personalInfo.phone && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <Phone size={12} /> {personalInfo.phone}
            </div>
          )}
          {personalInfo.email && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <Mail size={12} /> {personalInfo.email}
            </div>
          )}
          {personalInfo.location && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <MapPin size={12} /> {personalInfo.location}
            </div>
          )}
          {personalInfo.website && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <Globe size={12} /> {personalInfo.website}
            </div>
          )}
        </div>
      </div>

      {divider}

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: "0.5rem" }}>
          <h3
            style={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.35rem",
              letterSpacing: "0.5px",
              color: primaryColor,
              borderBottom: `1.5px solid ${primaryColor}`,
              paddingBottom: "0.15rem"
            }}
          >
            Summary
          </h3>
          <p style={{ lineHeight: 1.45, fontSize: "0.83rem", color: "#334155", margin: 0 }}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {skills.length > 0 && (
        <div style={{ marginBottom: "0.5rem" }}>
          <h3
            style={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.35rem",
              letterSpacing: "0.5px",
              color: primaryColor,
              borderBottom: `1.5px solid ${primaryColor}`,
              paddingBottom: "0.15rem"
            }}
          >
            Skills
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.3rem 1rem",
            }}
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                style={{
                  fontSize: "0.83rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "#334155"
                }}
              >
                <span style={{ color: primaryColor }}>•</span> {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: "0.5rem" }}>
          <h3
            style={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.4rem",
              letterSpacing: "0.5px",
              color: primaryColor,
              borderBottom: `1.5px solid ${primaryColor}`,
              paddingBottom: "0.15rem"
            }}
          >
            Experience
          </h3>

          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "0.6rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.1rem",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "0.88rem", color: "#0F172A" }}>
                  {exp.title}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748B",
                    fontWeight: "600",
                  }}
                >
                  {exp.date}
                </div>
              </div>
              <div
                style={{
                  fontSize: "0.83rem",
                  color: "#475569",
                  fontWeight: "500",
                  marginBottom: "0.25rem",
                }}
              >
                {exp.company}
              </div>

              {exp.description && (
                <div
                  style={{
                    fontSize: "0.83rem",
                    lineHeight: 1.45,
                    color: "#334155",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {exp.description.split("\n").map((line, i) =>
                    line.trim().length > 0 ? (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: "0.4rem",
                          marginBottom: "0.15rem",
                        }}
                      >
                        <span style={{ color: primaryColor }}>•</span>{" "}
                        <span>{line.replace(/^[•\-\*]\s*/, '')}</span>
                      </div>
                    ) : null,
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {settings.showProjects !== false && projects && projects.length > 0 && (
        <div style={{ marginBottom: "0.5rem" }}>
          <h3
            style={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.4rem",
              letterSpacing: "0.5px",
              color: primaryColor,
              borderBottom: `1.5px solid ${primaryColor}`,
              paddingBottom: "0.15rem"
            }}
          >
            Projects
          </h3>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: "0.6rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.1rem",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "0.88rem", color: "#0F172A" }}>
                  {proj.name || proj.title}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748B",
                    fontWeight: "600",
                  }}
                >
                  {proj.duration || proj.date}
                </div>
              </div>
              {proj.technologies && (
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "#475569",
                    marginBottom: "0.2rem",
                    fontStyle: "italic",
                  }}
                >
                  {proj.technologies}
                </div>
              )}
              {proj.description && (
                <div
                  style={{
                    fontSize: "0.83rem",
                    lineHeight: 1.45,
                    color: "#334155",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {proj.description.split("\n").map((line, i) =>
                    line.trim().length > 0 ? (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: "0.4rem",
                          marginBottom: "0.15rem",
                        }}
                      >
                        <span style={{ color: primaryColor }}>•</span>{" "}
                        <span>{line.replace(/^[•\-\*]\s*/, '')}</span>
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
        <div style={{ marginBottom: "0.5rem" }}>
          <h3
            style={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: "0.4rem",
              letterSpacing: "0.5px",
              color: primaryColor,
              borderBottom: `1.5px solid ${primaryColor}`,
              paddingBottom: "0.15rem"
            }}
          >
            Education
          </h3>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "0.4rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.1rem",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "0.88rem", color: "#0F172A" }}>
                  {edu.degree}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748B",
                    fontWeight: "600",
                  }}
                >
                  {edu.date}
                </div>
              </div>
              <div style={{ fontSize: "0.83rem", color: "#475569" }}>
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
