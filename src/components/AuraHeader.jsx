import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FileText, Sparkles, Layout, Palette, ArrowRight, Upload, Check } from 'lucide-react';

const AuraHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTheme, setActiveTheme] = useState('emerald');
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const themes = [
    { id: 'emerald', name: 'Emerald', color: '#059669' },
    { id: 'sapphire', name: 'Sapphire', color: '#2563EB' },
    { id: 'violet', name: 'Violet', color: '#7C3AED' },
    { id: 'amber', name: 'Amber', color: '#D97706' }
  ];

  const handleThemeChange = (themeId) => {
    setActiveTheme(themeId);
    document.body.className = `theme-${themeId}`;
    setIsThemeOpen(false);
  };

  useEffect(() => {
    document.body.className = `theme-${activeTheme}`;
  }, [activeTheme]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Studio Builder', path: '/builder' },
    { label: 'Templates', path: '/templates' },
    { label: 'Import Resume', path: '/import' }
  ];

  return (
    <header style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0.85rem 0'
    }}>
      <div className="aura-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        {/* Brand Identity */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'var(--primary-light)',
            border: '1px solid var(--primary-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <FileText size={20} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              AURA <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Studio</span>
            </div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Career Intelligence Engine
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '0.5rem 0.9rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Theme Palette Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-muted)'
              }}
            >
              <Palette size={16} />
              <span>Theme Accent</span>
            </button>

            {isThemeOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '115%',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-md)',
                padding: '0.5rem',
                minWidth: '160px',
                zIndex: 200
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', padding: '0.35rem 0.5rem 0.25rem' }}>
                  CHOOSE ACCENT
                </div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.45rem 0.6rem',
                      borderRadius: '6px',
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
                      <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: t.color, display: 'inline-block' }} />
                      {t.name}
                    </div>
                    {activeTheme === t.id && <Check size={14} color="var(--primary)" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => navigate('/builder')}
            className="aura-btn-primary"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.875rem' }}
          >
            <span>Create Resume</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AuraHeader;
