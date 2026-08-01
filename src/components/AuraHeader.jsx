import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FileText, Palette, ArrowRight, Check, Sparkles } from 'lucide-react';

const AuraHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTheme, setActiveTheme] = useState('emerald');
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const themes = [
    { id: 'emerald', name: 'Emerald Cyber', color: '#059669' },
    { id: 'sapphire', name: 'Royal Sapphire', color: '#2563EB' },
    { id: 'violet', name: 'Hyper Violet', color: '#7C3AED' },
    { id: 'amber', name: 'Sunset Amber', color: '#D97706' }
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
        {/* Luminous Brand Emblem */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-light)',
            border: '1px solid var(--primary-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)',
            boxShadow: '0 0 12px var(--primary-glow)'
          }}>
            <Sparkles size={18} strokeWidth={2.2} />
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
            LUMEN <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Studio</span>
          </div>
        </Link>

        {/* Floating Capsule Nav Pills */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Theme Palette Switcher Dial */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.75rem',
                borderRadius: '9999px',
                border: '1px solid var(--border-color)',
                backgroundColor: '#FFFFFF',
                fontSize: '0.825rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <Palette size={15} />
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
                minWidth: '170px',
                zIndex: 200
              }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', padding: '0.35rem 0.5rem' }}>
                  THEME ACCENT
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
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: t.color, display: 'inline-block' }} />
                      {t.name}
                    </div>
                    {activeTheme === t.id && <Check size={14} color="var(--primary)" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Single Unified Launch Button */}
          <button
            onClick={() => navigate('/builder')}
            className="aura-btn-primary"
            style={{
              padding: '0.45rem 1.1rem',
              fontSize: '0.85rem',
              borderRadius: '9999px'
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
