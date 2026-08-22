import React from 'react';

export default function KickresumeLogo({ height = 28, showText = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer', userSelect: 'none' }}>
      {/* Kickresume Rocket / K Mark */}
      <svg width={height} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <rect width="40" height="40" rx="10" fill="#00C2A8" />
        <path
          d="M12 10H17V30H12V10Z"
          fill="#FFFFFF"
        />
        <path
          d="M17 21L26 10H32L21 23L32 30H26L17 23.5V21Z"
          fill="#FFFFFF"
        />
        <circle cx="28" cy="12" r="2.5" fill="#FFE500" />
      </svg>

      {showText && (
        <span style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
          fontSize: '1.4rem',
          fontWeight: 900,
          letterSpacing: '-0.035em',
          color: '#182233',
          lineHeight: 1
        }}>
          kick<span style={{ color: '#00C2A8' }}>resume</span>
        </span>
      )}
    </div>
  );
}
