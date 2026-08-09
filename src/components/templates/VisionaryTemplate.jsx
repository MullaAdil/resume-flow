import { Mail, Phone, MapPin, Globe, Link2 } from "lucide-react";

const VisionaryTemplate = ({ resumeData }) => {
  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    settings = {},
  } = resumeData;

  const primaryColor = settings.primaryColor || "#059669";
  const fontFamily = "var(--resume-font-family, inherit)";

  const getSkillsList = (s) => {
    if (!s) return [];
    if (Array.isArray(s)) return s.map(item => typeof item === 'object' ? item.name : item).filter(Boolean);
    return Object.values(s).flat().map(item => typeof item === 'object' ? item.name : item).filter(Boolean);
  };

  const skillList = getSkillsList(skills);

  return (
    <div
      style={{
        width: "800px",
        minHeight: "1131px",
        background: "#FFFFFF",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        fontFamily: fontFamily,
        color: "#0F172A",
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        boxSizing: "border-box"
      }}
    >
      {/* Left Sidebar */}
      <div style={{
        backgroundColor: "#F8FAFC",
        borderRight: "1px solid #E2E8F0",
        padding: "2.5rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem"
      }}>
        {/* Profile Identity */}
        <div>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "12px",
            backgroundColor: primaryColor,
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.4rem",
            fontWeight: 800,
            marginBottom: "1rem"
          }}>
            {(personalInfo.fullName || "A").charAt(0)}
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", lineHeight: 1.2, marginBottom: "0.3rem" }}>
            {personalInfo.fullName}
          </h1>
          <div style={{ fontSize: "0.875rem", fontWeight: 600, color: primaryColor }}>
            {personalInfo.jobTitle}
          </div>
        </div>

        {/* Contact Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.8rem", color: "#475569" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8" }}>
            Contact
          </div>
          {personalInfo.email && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", wordBreak: "break-all" }}>
              <Mail size={13} color={primaryColor} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Phone size={13} color={primaryColor} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MapPin size={13} color={primaryColor} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", wordBreak: "break-all" }}>
              <Link2 size={13} color={primaryColor} />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", wordBreak: "break-all" }}>
              <Globe size={13} color={primaryColor} />
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skillList.length > 0 && (
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8", marginBottom: "0.75rem" }}>
              Expertise
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {skillList.map((skill, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    padding: "0.25rem 0.6rem",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#334155"
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8", marginBottom: "0.75rem" }}>
              Education
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {education.map((edu, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0F172A" }}>
                    {edu.degree || edu.institution}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748B" }}>
                    {edu.school || edu.institution}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: "0.15rem" }}>
                    {edu.date || `${edu.startDate || ''} - ${edu.endDate || ''}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Right Content */}
      <div style={{ padding: "2.5rem 2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Professional Summary */}
        {personalInfo.summary && (
          <div>
            <h2 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: primaryColor, marginBottom: "0.6rem" }}>
              Professional Profile
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.65 }}>
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <div>
            <h2 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: primaryColor, marginBottom: "1rem" }}>
              Work Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
                    <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A" }}>
                      {exp.title || exp.jobTitle}
                    </div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748B" }}>
                      {exp.date || `${exp.startDate || ''} - ${exp.endDate || ''}`}
                    </div>
                  </div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: primaryColor, marginBottom: "0.5rem" }}>
                    {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <div style={{ fontSize: "0.85rem", color: "#334155", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                      {exp.description.split('\n').map((line, i) => (
                        line.trim().length > 0 ? (
                          <div key={i} style={{ display: "flex", gap: "0.4rem", marginBottom: "0.3rem" }}>
                            <span style={{ color: primaryColor }}>•</span>
                            <span>{line.trim().replace(/^[•\-\*]\s*/, '')}</span>
                          </div>
                        ) : null
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Projects */}
        {projects.length > 0 && (
          <div>
            <h2 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: primaryColor, marginBottom: "1rem" }}>
              Key Projects
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {projects.map((proj, idx) => (
                <div key={idx} style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", padding: "0.85rem 1rem", borderRadius: "8px" }}>
                  <div style={{ fontSize: "0.925rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.25rem" }}>
                    {proj.name}
                  </div>
                  {proj.description && (
                    <div style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.5 }}>
                      {proj.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisionaryTemplate;
