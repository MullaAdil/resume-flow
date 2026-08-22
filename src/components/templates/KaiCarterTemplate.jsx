import React from "react";

const CrossTapePattern = () => (
  <svg
    width="240"
    height="180"
    viewBox="0 0 240 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity: 0.92 }}
  >
    <g transform="translate(130, 20) rotate(35)">
      <rect x="-10" y="20" width="80" height="24" rx="2" fill="#FFFFFF" fillOpacity="0.88" />
      <rect x="18" y="-10" width="24" height="84" rx="2" fill="#FFFFFF" fillOpacity="0.88" />
    </g>
    <g transform="translate(40, 60) rotate(-25)">
      <rect x="-10" y="25" width="90" height="26" rx="2" fill="#FFFFFF" fillOpacity="0.85" />
      <rect x="22" y="-10" width="26" height="96" rx="2" fill="#FFFFFF" fillOpacity="0.85" />
    </g>
    <g transform="translate(170, 95) rotate(45)">
      <rect x="-8" y="16" width="70" height="22" rx="2" fill="#FFFFFF" fillOpacity="0.82" />
      <rect x="16" y="-8" width="22" height="70" rx="2" fill="#FFFFFF" fillOpacity="0.82" />
    </g>
    <g transform="translate(90, -10) rotate(-15)">
      <rect x="0" y="20" width="60" height="20" rx="2" fill="#FFFFFF" fillOpacity="0.8" />
      <rect x="20" y="0" width="20" height="60" rx="2" fill="#FFFFFF" fillOpacity="0.8" />
    </g>
  </svg>
);

export default function KaiCarterTemplate({ resumeData }) {
  const pRaw = resumeData?.personalInfo || {};

  const p = {
    fullName: (pRaw.fullName && pRaw.fullName.trim()) || (pRaw.firstName ? `${pRaw.firstName || ''} ${pRaw.lastName || ''}`.trim() : '') || '',
    jobTitle: (pRaw.jobTitle && pRaw.jobTitle.trim()) || '',
    email: (pRaw.email && pRaw.email.trim()) || '',
    phone: (pRaw.phone && pRaw.phone.trim()) || '',
    location: (pRaw.location && pRaw.location.trim()) || '',
    linkedin: (pRaw.linkedin && pRaw.linkedin.trim()) || '',
    github: (pRaw.github && pRaw.github.trim()) || '',
    website: (pRaw.website && pRaw.website.trim()) || '',
    portfolio: (pRaw.portfolio && pRaw.portfolio.trim()) || '',
    summary: (pRaw.summary && pRaw.summary.trim()) || '',
  };

  const expList = (Array.isArray(resumeData?.experience) && resumeData.experience.length > 0 && resumeData.experience.some(e => e && (e.company || e.title || e.jobTitle)))
    ? resumeData.experience
    : [];

  const eduList = (Array.isArray(resumeData?.education) && resumeData.education.length > 0 && resumeData.education.some(e => e && (e.school || e.degree)))
    ? resumeData.education
    : [];

  const projList = (Array.isArray(resumeData?.projects) && resumeData.projects.length > 0 && resumeData.projects.some(pr => pr && (pr.name || pr.title || pr.description)))
    ? resumeData.projects
    : [];

  const rawSkills = resumeData?.skills;
  let skillsList = [];
  if (Array.isArray(rawSkills)) {
    skillsList = rawSkills
      .map((s) => (typeof s === "object" ? s.name || s.value || "" : String(s)))
      .filter(Boolean);
  } else if (rawSkills && typeof rawSkills === "object") {
    skillsList = Object.values(rawSkills)
      .flat()
      .map((s) => (typeof s === "object" ? s.name || s.value || "" : String(s)))
      .filter(Boolean);
  }

  const hobbiesList = (Array.isArray(resumeData?.hobbies) && resumeData.hobbies.length > 0)
    ? resumeData.hobbies
    : (Array.isArray(resumeData?.interests) && resumeData.interests.length > 0)
    ? resumeData.interests.map(i => typeof i === 'object' ? i.name : i).filter(Boolean)
    : [];

  const settings = resumeData?.settings || {};
  const headerBg = settings.primaryColor || "#000000";

  const hasContacts = p.phone || p.email || p.location || p.website || p.portfolio || p.linkedin || p.github;

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        backgroundColor: "#FFFFFF",
        color: "#0F172A",
        fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
        boxSizing: "border-box",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.12)",
      }}
    >
      {/* ── 1. SOLID BLACK TOP HEADER WITH ABSTRACT TAPE ARTWORK ── */}
      {(p.fullName || hasContacts) && (
        <div
          style={{
            backgroundColor: headerBg,
            color: "#FFFFFF",
            padding: "2.5rem 2.5rem 2.25rem 2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            borderBottom: "2px solid #000000",
          }}
        >
          {/* Left Header Content */}
          <div style={{ position: "relative", zIndex: 2, maxWidth: "480px" }}>
            {/* Full Name */}
            {p.fullName && (
              <h1
                style={{
                  fontSize: "2.4rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  lineHeight: 1.1,
                  margin: "0 0 0.4rem 0",
                  color: "#FFFFFF",
                }}
              >
                {p.fullName}
              </h1>
            )}

            {/* Job Title */}
            {p.jobTitle && (
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#E2E8F0",
                  marginBottom: hasContacts ? "1.5rem" : "0",
                }}
              >
                {p.jobTitle}
              </div>
            )}

            {/* CONTACT Block */}
            {hasContacts && (
              <div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#FFFFFF",
                    marginBottom: "0.45rem",
                  }}
                >
                  CONTACT
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.3rem",
                    fontSize: "0.8rem",
                    color: "#CBD5E1",
                    fontWeight: 600,
                  }}
                >
                  {p.phone && (
                    <div>
                      <strong style={{ color: "#FFFFFF", textTransform: "uppercase", marginRight: "6px" }}>
                        PHONE:
                      </strong>
                      <span>{p.phone}</span>
                    </div>
                  )}

                  {(p.website || p.portfolio || p.linkedin || p.github) && (
                    <div>
                      <strong style={{ color: "#FFFFFF", textTransform: "uppercase", marginRight: "6px" }}>
                        WEBSITE:
                      </strong>
                      <span>{p.website || p.portfolio || p.linkedin || p.github}</span>
                    </div>
                  )}

                  {p.email && (
                    <div>
                      <strong style={{ color: "#FFFFFF", textTransform: "uppercase", marginRight: "6px" }}>
                        EMAIL:
                      </strong>
                      <span>{p.email}</span>
                    </div>
                  )}

                  {p.location && (
                    <div>
                      <strong style={{ color: "#FFFFFF", textTransform: "uppercase", marginRight: "6px" }}>
                        LOCATION:
                      </strong>
                      <span>{p.location}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Header Graphic Art Pattern (Crosses on Dark Background) */}
          <div
            style={{
              position: "absolute",
              right: "-15px",
              top: "-10px",
              bottom: "-10px",
              width: "280px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <CrossTapePattern />
          </div>
        </div>
      )}

      {/* ── 2. TWO-COLUMN SPLIT BODY WITH VERTICAL DIVIDER LINE ── */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: (eduList.length > 0 || skillsList.length > 0 || hobbiesList.length > 0) ? "60% 40%" : "100%",
          padding: "2.25rem 2.5rem 3rem 2.5rem",
          gap: "2.25rem",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Left Column: PROFILE + WORK EXPERIENCE */}
        <div
          style={{
            paddingRight: (eduList.length > 0 || skillsList.length > 0 || hobbiesList.length > 0) ? "1.75rem" : "0",
            borderRight: (eduList.length > 0 || skillsList.length > 0 || hobbiesList.length > 0) ? "1.5px solid #CBD5E1" : "none",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* PROFILE SECTION */}
          {settings.showSummary !== false && p.summary && (
            <div>
              <h2
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#0F172A",
                  margin: "0 0 0.75rem 0",
                }}
              >
                PROFILE
              </h2>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  color: "#334155",
                  margin: 0,
                }}
              >
                {p.summary}
              </p>
            </div>
          )}

          {/* WORK EXPERIENCE SECTION */}
          {settings.showExperience !== false && expList.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#0F172A",
                  margin: "0 0 1.15rem 0",
                }}
              >
                WORK EXPERIENCE
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                {expList.map((exp, idx) => (
                  <div key={exp.id || idx}>
                    <div
                      style={{
                        fontSize: "0.86rem",
                        fontWeight: 900,
                        color: "#0F172A",
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                        marginBottom: "2px",
                      }}
                    >
                      {exp.company}
                      {exp.title || exp.jobTitle ? `, ${exp.title || exp.jobTitle}` : ""}
                    </div>

                    <div
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "#64748B",
                        marginBottom: "0.5rem",
                        textTransform: "uppercase",
                      }}
                    >
                      {exp.date || `${exp.startDate || ""} ${exp.endDate ? `- ${exp.endDate}` : ""}`}
                    </div>

                    {exp.description && (
                      <div
                        style={{
                          fontSize: "0.835rem",
                          color: "#334155",
                          lineHeight: 1.55,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS (if present) */}
          {settings.showProjects !== false && projList.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#0F172A",
                  margin: "0 0 0.85rem 0",
                }}
              >
                PROJECTS
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {projList.map((proj, idx) => (
                  <div key={proj.id || idx}>
                    <div style={{ fontSize: "0.86rem", fontWeight: 800, color: "#0F172A" }}>
                      {proj.name || proj.title}
                    </div>
                    {proj.technologies && (
                      <div style={{ fontSize: "0.76rem", color: "#64748B", marginTop: "1px" }}>
                        {proj.technologies}
                      </div>
                    )}
                    {proj.description && (
                      <div style={{ fontSize: "0.825rem", color: "#334155", lineHeight: 1.5, marginTop: "3px", whiteSpace: "pre-line" }}>
                        {proj.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: EDUCATION + SKILLS + HOBBIES */}
        {(eduList.length > 0 || skillsList.length > 0 || hobbiesList.length > 0) && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* EDUCATION SECTION */}
            {settings.showEducation !== false && eduList.length > 0 && (
              <div>
                <h2
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#0F172A",
                    margin: "0 0 1rem 0",
                  }}
                >
                  EDUCATION
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {eduList.map((edu, idx) => (
                    <div key={edu.id || idx}>
                      <div
                        style={{
                          fontSize: "0.86rem",
                          fontWeight: 900,
                          color: "#0F172A",
                          textTransform: "uppercase",
                        }}
                      >
                        {edu.school || edu.institution}
                      </div>

                      <div
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: "#64748B",
                          marginTop: "1px",
                          marginBottom: "2px",
                        }}
                      >
                        {edu.date || `${edu.startDate || ""} ${edu.endDate ? `- ${edu.endDate}` : ""}`}
                      </div>

                      <div style={{ fontSize: "0.825rem", color: "#334155", lineHeight: 1.45 }}>
                        {edu.degree || edu.details || edu.fieldOfStudy || ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SKILLS SECTION */}
            {settings.showSkills !== false && skillsList.length > 0 && (
              <div>
                <h2
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#0F172A",
                    margin: "0 0 0.85rem 0",
                  }}
                >
                  SKILLS
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {skillsList.map((sk, idx) => (
                    <div
                      key={idx}
                      style={{
                        fontSize: "0.835rem",
                        color: "#334155",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span>•</span>
                      <span>{sk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HOBBIES SECTION */}
            {settings.showHobbies !== false && hobbiesList.length > 0 && (
              <div>
                <h2
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#0F172A",
                    margin: "0 0 0.85rem 0",
                  }}
                >
                  HOBBIES
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {hobbiesList.map((hobby, idx) => (
                    <div
                      key={idx}
                      style={{
                        fontSize: "0.835rem",
                        color: "#334155",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span>•</span>
                      <span>{hobby}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
