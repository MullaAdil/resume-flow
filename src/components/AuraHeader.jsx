import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FileText, Palette, ArrowRight, Check, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const THEMES = [
  { id: 'indigo',      name: '⚡ Quantum Indigo',  color: '#6366F1' },
  { id: 'violet',     name: '🔮 Violet',           color: '#7C3AED' },
  { id: 'sapphire',   name: '💎 Sapphire Blue',    color: '#2563EB' },
  { id: 'emerald',    name: '🌿 Emerald',           color: '#059669' },
  { id: 'rose',       name: '🌹 Rose Pink',         color: '#E11D48' },
  { id: 'amber',      name: '🔥 Amber',             color: '#D97706' },
  { id: 'terracotta', name: '🧱 Terracotta',        color: '#EA580C' },
];

// Apply a theme to the page: sets CSS vars on :root directly
const applyTheme = (themeId) => {
  const t = THEMES.find((x) => x.id === themeId);
  if (!t) return;

  // Map preset definitions
  const presets = {
    indigo:      { primary: '#6366F1', hover: '#4F46E5', light: '#EEF2FF', border: '#C7D2FE', glow: 'rgba(99,102,241,0.20)',  bg: '#F8FAFF' },
    violet:      { primary: '#7C3AED', hover: '#6D28D9', light: '#F5F3FF', border: '#DDD6FE', glow: 'rgba(124,58,237,0.18)',  bg: '#F8F5FF' },
    sapphire:    { primary: '#2563EB', hover: '#1D4ED8', light: '#EFF6FF', border: '#BFDBFE', glow: 'rgba(37,99,235,0.18)',   bg: '#F5F9FF' },
    emerald:     { primary: '#059669', hover: '#047857', light: '#ECFDF5', border: '#A7F3D0', glow: 'rgba(5,150,105,0.18)',   bg: '#F8FFFA' },
    rose:        { primary: '#E11D48', hover: '#BE123C', light: '#FFF1F2', border: '#FECDD3', glow: 'rgba(225,29,72,0.18)',   bg: '#FFF8F9' },
    amber:       { primary: '#D97706', hover: '#B45309', light: '#FFFBEB', border: '#FDE68A', glow: 'rgba(217,119,6,0.18)',   bg: '#FFFDF5' },
    terracotta:  { primary: '#EA580C', hover: '#C2410C', light: '#FFF7ED', border: '#FFEDD5', glow: 'rgba(234,88,12,0.18)',   bg: '#FAFAFC' },
  };

  const p = presets[themeId] || presets.indigo;
  const root = document.documentElement;
  root.style.setProperty('--primary',        p.primary);
  root.style.setProperty('--primary-hover',  p.hover);
  root.style.setProperty('--primary-light',  p.light);
  root.style.setProperty('--primary-border', p.border);
  root.style.setProperty('--primary-glow',   p.glow);
  root.style.setProperty('--bg-color',        p.bg);
};

const AuraHeader = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, signOut } = useAuth();
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'indigo';
  });
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleThemeChange = (themeId) => {
    setActiveTheme(themeId);
    localStorage.setItem('app-theme', themeId);
    applyTheme(themeId);
    setIsThemeOpen(false);
  };

  // Apply on mount
  useEffect(() => {
    applyTheme(activeTheme);
  }, []);

  const navLinks = [
    { label: 'Home',          path: '/' },
    { label: 'Templates',     path: '/templates' },
    { label: 'Import Resume', path: '/import' },
  ];

  const activeThemeColor = THEMES.find((t) => t.id === activeTheme)?.color || '#6366F1';

  return (
    <header style={{
      position: 'sticky',
      top: '12px',
      zIndex: 100,
      width: '100%',
      padding: '0 1rem',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1080px',
        margin: '0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border-color)',
        borderRadius: '9999px',
        padding: '0.6rem 1.25rem',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--primary) 0%, #3B82F6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 900,
            fontSize: '1.05rem',
            boxShadow: '0 4px 12px var(--primary-glow)',
            letterSpacing: '-0.02em'
          }}>
            L
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
            LUMEN <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Studio</span>
          </div>
        </Link>

        {/* Nav Pills - Creative Equal Size Buttons */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  width: '125px',
                  height: '38px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  border: isActive ? '1.5px solid var(--primary-border)' : '1.5px solid transparent',
                  boxShadow: isActive ? '0 2px 10px var(--primary-glow)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseOver={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--primary-light)';
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.borderColor = 'var(--primary-border)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Theme Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                height: '38px',
                padding: '0 0.85rem',
                borderRadius: '9999px',
                border: '1.5px solid var(--primary-border)',
                backgroundColor: 'var(--primary-light)',
                fontSize: '0.825rem',
                fontWeight: 700,
                color: 'var(--primary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: activeThemeColor, display: 'inline-block' }} />
              <span>Accent</span>
            </button>

            {isThemeOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '125%',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-lg)',
                padding: '0.6rem',
                minWidth: '195px',
                zIndex: 200
              }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', padding: '0.35rem 0.5rem', letterSpacing: '0.05em' }}>
                  ACCENT COLOR
                </div>
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.45rem 0.6rem',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: activeTheme === t.id ? 'var(--primary-light)' : 'transparent',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: activeTheme === t.id ? 700 : 500,
                      color: activeTheme === t.id ? 'var(--primary)' : 'var(--text-main)',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: t.color, display: 'inline-block', boxShadow: `0 0 0 2px ${t.color}22` }} />
                      {t.name}
                    </div>
                    {activeTheme === t.id && <Check size={14} color="var(--primary)" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Creative Username Logo & Profile Dropdown */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  height: '38px',
                  padding: '0 0.85rem 0 0.4rem',
                  borderRadius: '9999px',
                  border: '1.5px solid var(--primary-border)',
                  backgroundColor: 'var(--primary-light)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isUserMenuOpen ? '0 0 0 3px var(--primary-glow)' : '0 2px 8px var(--primary-glow)'
                }}
              >
                {/* Initial Avatar Sphere with Glow */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary) 0%, #3B82F6 100%)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px var(--primary-glow)',
                  textTransform: 'uppercase'
                }}>
                  {(user?.name || user?.email || 'U').charAt(0)}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    maxWidth: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {user?.name || user?.email?.split('@')[0] || 'Member'}
                  </span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                </div>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '130%',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid var(--primary-border)',
                  borderRadius: '18px',
                  boxShadow: '0 16px 40px rgba(15, 23, 42, 0.15)',
                  padding: '0.85rem',
                  minWidth: '240px',
                  zIndex: 250
                }}>
                  {/* Account Summary Pill */}
                  <div style={{
                    padding: '0.75rem',
                    borderRadius: '12px',
                    backgroundColor: 'var(--primary-light)',
                    marginBottom: '0.6rem',
                    border: '1px solid var(--primary-border)'
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user?.name || user?.email?.split('@')[0]}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user?.email}
                    </div>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      marginTop: '0.4rem',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: '#065F46',
                      backgroundColor: '#ECFDF5',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '9999px',
                      border: '1px solid #A7F3D0'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                      <span>Studio Member</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <button
                      onClick={() => { setIsUserMenuOpen(false); navigate('/builder'); }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 0.65rem',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: 'var(--text-main)',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-light)'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <FileText size={15} color="var(--primary)" />
                      <span>Open Resume Studio</span>
                    </button>

                    <button
                      onClick={() => { setIsUserMenuOpen(false); signOut(); }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 0.65rem',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#EF4444',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LogOut size={15} />
                      <span>Sign Out Account</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                height: '38px',
                padding: '0 0.9rem',
                borderRadius: '9999px',
                border: '1px solid var(--border-color)',
                backgroundColor: '#FFFFFF',
                fontSize: '0.825rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-border)';
                e.currentTarget.style.color = 'var(--primary)';
                e.currentTarget.style.backgroundColor = 'var(--primary-light)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.color = 'var(--text-main)';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              <LogIn size={14} />
              <span>Sign In</span>
            </button>
          )}

          {/* Launch Studio CTA */}
          <button
            onClick={() => navigate('/builder')}
            className="aura-btn-primary"
            style={{
              height: '38px',
              padding: '0 1.1rem',
              fontSize: '0.85rem',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span>Launch Studio</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AuraHeader;
