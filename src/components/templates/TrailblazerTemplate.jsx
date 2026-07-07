import React from "react";

import { Mail, Phone, MapPin, Globe } from "lucide-react";

const TrailblazerTemplate = ({ resumeData }) => {
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

  const blueColor = settings.primaryColor || "#1e3a8a";

  const initials = personalInfo.fullName
    ? personalInfo.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "CD";

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#fff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        padding: marginPadding,
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#333",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        {/* Name and Title */}
        <div style={{ width: "33%" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#111",
              margin: "0 0 0.5rem 0",
            }}
          >
            {personalInfo.fullName}
          </h1>
          {personalInfo.jobTitle && (
            <span
              style={{
                background: blueColor,
                color: "white",
                padding: "0.2rem 0.8rem",
                borderRadius: "1rem",
                fontSize: "0.85rem",
                fontWeight: "bold",
              }}
            >
              {personalInfo.jobTitle}
            </span>
          )}
        </div>

        {/* Photo */}
        <div
          style={{ width: "33%", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "#e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748b",
              fontSize: "1.8rem",
              fontWeight: "bold",
              border: `3px solid ${blueColor}`,
            }}
          >
            {initials}
          </div>
        </div>

        {/* Contact Info */}
        <div
          style={{
            width: "33%",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
            fontSize: "0.75rem",
            textAlign: "right",
          }}
        >
          {personalInfo.phone && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                justifyContent: "flex-end",
              }}
            >
              {personalInfo.phone} <Phone size={12} color={blueColor} />
            </div>
          )}
          {personalInfo.email && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                justifyContent: "flex-end",
              }}
            >
              {personalInfo.email} <Mail size={12} color={blueColor} />
            </div>
          )}
          {personalInfo.location && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                justifyContent: "flex-end",
              }}
            >
              {personalInfo.location} <MapPin size={12} color={blueColor} />
            </div>
          )}
          {personalInfo.website && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                justifyContent: "flex-end",
              }}
            >
              {personalInfo.website} <Globe size={12} color={blueColor} />
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "1px",
          background: "#cbd5e1",
          marginBottom: "1.5rem",
        }}
      ></div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ lineHeight: 1.5, fontSize: "0.85rem", color: "#1f2937" }}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: `2px solid ${blueColor}`,
              paddingBottom: "0.2rem",
              marginBottom: "1rem",
            }}
          >
            Education
          </h3>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  color: "#111",
                }}
              >
                {edu.school}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#333" }}>
                {edu.degree}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  fontStyle: "italic",
                  marginTop: "0.2rem",
                }}
              >
                {edu.date}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: `2px solid ${blueColor}`,
              paddingBottom: "0.2rem",
              marginBottom: "1rem",
            }}
          >
            Experience
          </h3>

          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "1.5rem" }}>
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
                  fontSize: "0.85rem",
                  color: "#111",
                  fontWeight: "bold",
                }}
              >
                {exp.title}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  fontStyle: "italic",
                  marginBottom: "0.8rem",
                  marginTop: "0.1rem",
                }}
              >
                {exp.date}
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
                      <span style={{ color: "#111" }}>•</span>{" "}
                      <span>{line}</span>
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
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: `2px solid ${blueColor}`,
              paddingBottom: "0.2rem",
              marginBottom: "1rem",
            }}
          >
            Projects
          </h3>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: "1.5rem" }}>
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
              {proj.technologies && (
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#111",
                    fontWeight: "bold",
                  }}
                >
                  {proj.technologies}
                </div>
              )}
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  fontStyle: "italic",
                  marginBottom: "0.8rem",
                  marginTop: "0.1rem",
                }}
              >
                {proj.duration || proj.date}
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
                        <span style={{ color: "#111" }}>•</span>{" "}
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

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: `2px solid ${blueColor}`,
              paddingBottom: "0.2rem",
              marginBottom: "1rem",
            }}
          >
            Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {skills.map((skill, index) => (
              <span
                key={index}
                style={{
                  border: "1px solid #94a3b8",
                  padding: "0.2rem 0.6rem",
                  fontSize: "0.8rem",
                  color: "#334155",
                  borderRadius: "4px",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrailblazerTemplate;
