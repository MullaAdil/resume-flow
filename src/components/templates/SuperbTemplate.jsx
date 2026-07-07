import React from "react";

import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  BarChart2,
  Globe,
} from "lucide-react";

const SuperbTemplate = ({ resumeData }) => {
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

  const headerBg = "#1f2937"; // Slate/Charcoal
  const contactBg = "#14b8a6"; // Teal
  const accentColor = settings.primaryColor || "#f43f5e"; // Coral

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#fff",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#333",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Header Block */}
      <div
        style={{
          background: headerBg,
          color: "white",
          padding: "3rem 4rem 2rem 4rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "normal",
            margin: "0 0 0.5rem 0",
          }}
        >
          {personalInfo.fullName}
        </h1>
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            margin: "0 0 1.5rem 0",
            opacity: 0.9,
          }}
        >
          {personalInfo.jobTitle}
        </h2>

        {personalInfo.summary && (
          <p
            style={{
              lineHeight: 1.5,
              fontSize: "0.85rem",
              opacity: 0.85,
              margin: 0,
            }}
          >
            {personalInfo.summary}
          </p>
        )}
      </div>

      {/* Contact Bar */}
      <div
        style={{
          background: contactBg,
          padding: "1rem 4rem",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          color: "white",
          fontSize: "0.85rem",
        }}
      >
        {personalInfo.email && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Mail size={14} /> {personalInfo.email}
          </div>
        )}
        {personalInfo.phone && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Phone size={14} /> {personalInfo.phone}
          </div>
        )}
        {personalInfo.location && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <MapPin size={14} /> {personalInfo.location}
          </div>
        )}
        {personalInfo.website && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Globe size={14} /> {personalInfo.website}
          </div>
        )}
      </div>

      <div style={{ padding: "3rem 4rem" }}>
        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: accentColor,
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <GraduationCap size={14} />
              </div>
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "1rem" }}>
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
                      fontSize: "0.85rem",
                      color: accentColor,
                      fontWeight: "bold",
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
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: accentColor,
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <Briefcase size={14} />
              </div>
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
                  <div style={{ fontSize: "0.85rem", color: "#111" }}>
                    {exp.title}
                  </div>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: accentColor,
                      fontWeight: "bold",
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
                        <span style={{ color: accentColor }}>•</span>{" "}
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
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: accentColor,
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <Briefcase size={14} />
              </div>
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
                  <div style={{ fontSize: "0.85rem", color: "#111" }}>
                    {proj.technologies}
                  </div>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: accentColor,
                      fontWeight: "bold",
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
                          <span style={{ color: accentColor }}>•</span>{" "}
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
          <div style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: accentColor,
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <BarChart2 size={14} />
              </div>
              Skills
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    padding: "0.4rem 0.8rem",
                    fontSize: "0.85rem",
                    color: "#334155",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperbTemplate;
