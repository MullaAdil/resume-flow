import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Check, LogIn, LogOut, ChevronDown, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const THEMES = [
  { id: 'indigo',      name: 'Indigo',            color: '#6366F1' },
  { id: 'violet',     name: 'Violet',             color: '#7C3AED' },
  { id: 'sapphire',   name: 'Sapphire',           color: '#2563EB' },
  { id: 'emerald',    name: 'Emerald',             color: '#059669' },
  { id: 'rose',       name: 'Rose',                color: '#E11D48' },
  { id: 'amber',      name: 'Amber',               color: '#D97706' },
  { id: 'terracotta', name: 'Terracotta',          color: '#EA580C' },
  { id: 'black',      name: 'Midnight Black',      color: '#0F172A' },
];

const THEME_PALETTES = {
  indigo:      { primary: '#6366F1', hover: '#4F46E5', light: '#EEF2FF', border: '#C7D2FE', glow: 'rgba(99,102,241,0.25)',  bg: '#F8FAFC' },
  violet:     { primary: '#7C3AED', hover: '#6D28D9', light: '#F5F3FF', border: '#DDD6FE', glow: 'rgba(124,58,237,0.25)',  bg: '#FBFBFE' },
  sapphire:   { primary: '#2563EB', hover: '#1D4ED8', light: '#EFF6FF', border: '#BFDBFE', glow: 'rgba(37,99,235,0.25)',   bg: '#F8FAFC' },
  emerald:    { primary: '#059669', hover: '#047857', light: '#ECFDF5', border: '#A7F3D0', glow: 'rgba(5,150,105,0.25)',   bg: '#F6FBF9' },
  rose:       { primary: '#E11D48', hover: '#BE123C', light: '#FFF1F2', border: '#FECDD3', glow: 'rgba(225,29,72,0.25)',   bg: '#FCF8F8' },
  amber:      { primary: '#D97706', hover: '#B45309', light: '#FFFBEB', border: '#FDE68A', glow: 'rgba(217,119,6,0.25)',   bg: '#FCFAF6' },
  terracotta: { primary: '#EA580C', hover: '#C2410C', light: '#FFF7ED', border: '#FFEDD5', glow: 'rgba(234,88,12,0.25)',   bg: '#FCFAF8' },
  black:      { primary: '#0F172A', hover: '#1E293B', light: '#F1F5F9', border: '#CBD5E1', glow: 'rgba(15,23,42,0.25)',    bg: '#F8FAFC' },
};

const applyTheme = (themeId) => {
  const p = THEME_PALETTES[themeId] || THEME_PALETTES.black;
  const root = document.documentElement;
  document.body.className = document.body.className.replace(/\btheme-\S+/g, '').trim();
  document.body.classList.add(`theme-${themeId}`);
  root.style.setProperty('--primary',        p.primary);
  root.style.setProperty('--primary-hover',  p.hover);
  root.style.setProperty('--primary-light',  p.light);
  root.style.setProperty('--primary-border', p.border);
  root.style.setProperty('--primary-glow',   p.glow);
  root.style.setProperty('--bg-color',        p.bg);
};

const CurlyBraceLeft = () => (
  <svg width="20" height="42" viewBox="0 0 20 42" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M18 3C11 3 11 9 11 14C11 18 7 19.5 2 21C7 22.5 11 24 11 28C11 33 11 39 18 39" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CurlyBraceRight = () => (
  <svg width="20" height="42" viewBox="0 0 20 42" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M2 3C9 3 9 9 9 14C9 18 13 19.5 18 21C13 22.5 9 24 9 28C9 33 9 39 2 39" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AuraHeader = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, signOut } = useAuth();
  const [activeTheme, setActiveTheme] = useState(() => localStorage.getItem('app-theme') || 'black');
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const themeMenuRef = useRef(null);

  const handleThemeChange = (themeId) => {
    setActiveTheme(themeId);
    localStorage.setItem('app-theme', themeId);
    applyTheme(themeId);
    setIsThemeOpen(false);
  };

  useEffect(() => { applyTheme(activeTheme); }, []);

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setIsUserMenuOpen(false);
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) setIsThemeOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { label: 'Home',           path: '/' },
    { label: 'Templates',      path: '/templates' },
    { label: 'Import Resume',  path: '/import' },
    { label: 'Activity Vault', path: '/activity' },
  ];

  const activeThemeColor = THEMES.find((t) => t.id === activeTheme)?.color || '#0F172A';
  const userInitial = (user?.name || user?.email || 'U').charAt(0).toUpperCase();
  const displayName = user?.name || user?.email?.split('@')[0] || 'Member';

  // Shared nav link base styles
  const navLinkBase = {
    padding: '0.4rem 0.85rem',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'var(--text-muted)',
    backgroundColor: 'transparent',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'all 0.15s ease',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  };

  return (
    <header style={{
      position: 'relative',
      zIndex: 100,
      width: '100%',
      padding: '1rem 1.25rem 0 1.25rem',
      boxSizing: 'border-box',
      pointerEvents: 'none',
    }}>
      <div style={{
        pointerEvents: 'auto',
        maxWidth: '1160px',
        margin: '0 auto',
        position: 'relative'
      }}>
        {/* Main Menu Bar Framed by Side Curly Braces ({ }) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px',
          padding: '0 0.5rem',
          gap: '0.6rem',
          backgroundColor: 'transparent',
          transition: 'all 0.25s ease'
        }}>

          {/* Left Side: Left Curly Brace + Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
            <CurlyBraceLeft />
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
              <div>
                <div style={{
                  fontWeight: 900,
                  fontSize: '1.5rem',
                  color: '#0F172A',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}>
                  LED
                </div>
                <div style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  color: '#64748B',
                  letterSpacing: '0.01em',
                  marginTop: '2px',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}>
                  Learning Experience Delivery
                </div>
              </div>
            </Link>
          </div>

          {/* ── Nav Links ── */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', flexShrink: 1, minWidth: 0 }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    ...navLinkBase,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                    backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-main)';
                      e.currentTarget.style.backgroundColor = 'rgba(241, 245, 249, 0.7)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Side ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>

            {/* Theme Picker */}
            <div ref={themeMenuRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                title="Change color theme"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  height: '34px',
                  padding: '0 0.8rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary-border)'; e.currentTarget.style.backgroundColor = 'var(--primary-light)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
              >
                <span style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  backgroundColor: activeThemeColor,
                  display: 'inline-block',
                  flexShrink: 0,
                }} />
                <span>Theme</span>
                <ChevronDown size={13} style={{ transform: isThemeOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {isThemeOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 6px)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  boxShadow: '0 12px 32px rgba(15,23,42,0.12)',
                  padding: '0.4rem',
                  minWidth: '170px',
                  zIndex: 200,
                }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', padding: '0.3rem 0.6rem 0.4rem', letterSpacing: '0.04em' }}>
                    Color Theme
                  </p>
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleThemeChange(t.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.4rem 0.6rem',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: activeTheme === t.id ? 'var(--primary-light)' : 'transparent',
                        color: activeTheme === t.id ? 'var(--primary)' : 'var(--text-main)',
                        fontWeight: activeTheme === t.id ? 600 : 400,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.12s ease',
                      }}
                      onMouseOver={(e) => {
                        if (activeTheme !== t.id) e.currentTarget.style.backgroundColor = '#F8FAFC';
                      }}
                      onMouseOut={(e) => {
                        if (activeTheme !== t.id) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          width: '10px', height: '10px', borderRadius: '50%',
                          backgroundColor: t.color, display: 'inline-block',
                        }} />
                        {t.name}
                      </span>
                      {activeTheme === t.id && <Check size={13} color="var(--primary)" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Account / Profile Menu */}
            {user ? (
              <div ref={userMenuRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    height: '34px',
                    padding: '0 0.65rem 0 0.4rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary-border)';
                    e.currentTarget.style.backgroundColor = 'var(--primary-light)';
                  }}
                  onMouseOut={(e) => {
                    if (!isUserMenuOpen) {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {userInitial}
                  </div>
                  <span style={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    maxWidth: '110px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {displayName}
                  </span>
                  <ChevronDown
                    size={13}
                    color="var(--text-muted)"
                    style={{ transform: isUserMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
                  />
                </button>

                {/* ── Minimal User Dropdown (No Card Box, Minimal Size) ── */}
                {isUserMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 4px)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    zIndex: 250,
                    padding: '0.2rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.35rem',
                  }}>
                    {/* Minimal User Email */}
                    <div style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                      padding: '0 0.2rem',
                    }}>
                      {user?.email}
                    </div>

                    {/* Minimal Sign Out Button */}
                    <button
                      onClick={() => { setIsUserMenuOpen(false); signOut(); }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '7px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.12s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary-light)';
                        e.currentTarget.style.borderColor = 'var(--primary-border)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                      }}
                    >
                      <LogOut size={13} color="var(--text-muted)" />
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)' }}>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Not Logged In ── */
              <button
                onClick={() => navigate('/login')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  height: '34px',
                  padding: '0 0.9rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
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
                Sign In
              </button>
            )}

            {/* ── Launch CTA ── */}
            <button
              onClick={() => navigate('/builder')}
              className="aura-btn-primary"
              style={{ height: '34px', padding: '0 0.95rem', fontSize: '0.85rem', borderRadius: '8px', flexShrink: 0 }}
            >
              Get Started
            </button>
            <CurlyBraceRight />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuraHeader;
