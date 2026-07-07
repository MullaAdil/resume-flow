import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const MultiColorTemplate = ({ resumeData }) => {
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

  const blueColor = settings.primaryColor || "#1e40af"; // Dark blue used for text
  const badgeColor = "#1d4ed8"; // Blue used for badges

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
      <div style={{ marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "normal",
            color: blueColor,
            marginBottom: "0.5rem",
          }}
        >
          {personalInfo.fullName}
        </h1>
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "#cbd5e1",
            marginBottom: "0.5rem",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            color: "#475569",
            fontSize: "0.85rem",
            flexWrap: "wrap",
            background: "#f8fafc",
            padding: "0.5rem 0",
          }}
        >
          {personalInfo.phone && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
            >
              <Phone size={14} color="#64748b" /> {personalInfo.phone}
            </div>
          )}
          {personalInfo.email && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
            >
              <Mail size={14} color="#64748b" /> {personalInfo.email}
            </div>
          )}
          {personalInfo.location && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
            >
              <MapPin size={14} color="#64748b" /> {personalInfo.location}
            </div>
          )}
          {personalInfo.website && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
            >
              <Globe size={14} color="#64748b" /> {personalInfo.website}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: "1px solid #cbd5e1",
              paddingBottom: "0.2rem",
              marginBottom: "0.8rem",
            }}
          >
            Professional Summary
          </h3>
          <p style={{ lineHeight: 1.5, fontSize: "0.85rem", color: "#1f2937" }}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: "1px solid #cbd5e1",
              paddingBottom: "0.2rem",
              marginBottom: "0.8rem",
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
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {settings.showProjects !== false && projects && projects.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: "1px solid #cbd5e1",
              paddingBottom: "0.2rem",
              marginBottom: "0.8rem",
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#333",
                    fontStyle: "italic",
                  }}
                >
                  {proj.technologies}
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    background: badgeColor,
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
                        <span style={{ color: blueColor }}>•</span>{" "}
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

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: "1px solid #cbd5e1",
              paddingBottom: "0.2rem",
              marginBottom: "0.8rem",
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
                    background: badgeColor,
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
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: blueColor,
              borderBottom: "1px solid #cbd5e1",
              paddingBottom: "0.2rem",
              marginBottom: "0.8rem",
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
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#333",
                    fontStyle: "italic",
                  }}
                >
                  {exp.title}
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    background: badgeColor,
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
                {/* Simulated bullet points if they didn't write them */}
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
                      <span style={{ color: blueColor }}>•</span>{" "}
                      <span>{line}</span>
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom sections are appended centrally by TemplateRenderer to avoid duplicates. */}
    </div>
  );
};

export default MultiColorTemplate;
