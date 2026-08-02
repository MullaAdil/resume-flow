# Workspace Design System Rule: Quantum Matrix & Architectural Multi-Paper Theme

All web applications, login pages, and UI components built in this workspace and future projects MUST adhere strictly to the **Quantum Matrix & Architectural Multi-Paper Design System** documented below.

---

## 1. Design System Tokens & Custom CSS Properties

Every web app must define the following CSS custom properties in `:root`:

```css
:root {
  /* Default Primary Palette: Quantum Indigo */
  --primary: #6366F1;
  --primary-hover: #4F46E5;
  --primary-light: #EEF2FF;
  --primary-border: #C7D2FE;
  --primary-glow: rgba(99, 102, 241, 0.25);
  
  /* Natural Minimal Paper Backing Sheet Colors */
  --paper-top: #FFFFFF;
  --paper-linen: #FAF9F5;
  --paper-slate: #F1F5F9;
  
  /* Typography & Core UI Structure */
  --font-family: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif;
  --bg-color: #F8FAFC;
  --text-main: #0F172A;
  --text-muted: #64748B;
  --border-color: #E2E8F0;
  --shadow-sm: 0 2px 8px rgba(15, 23, 42, 0.04);
  --shadow-md: 0 8px 24px rgba(15, 23, 42, 0.08);
  --shadow-lg: 0 16px 40px rgba(15, 23, 42, 0.12);
  --radius-lg: 16px;
  --radius-xl: 24px;
}
```

---

## 2. 3D Architectural Multi-Paper Stacked Card Theme

Never use plain flat cards or torn SVG edges. Use the physical multi-paper stack theme featuring 3 distinct, subtle paper tones:

```jsx
<div style={{ position: 'relative', width: '100%' }}>
  {/* Sheet 3: Bottom Layer (Cool Slate #F1F5F9) */}
  <div style={{
    position: 'absolute',
    inset: 0,
    borderRadius: '24px',
    background: '#F1F5F9',
    border: '1px solid #CBD5E1',
    transform: 'translate(10px, 11px) rotate(1.4deg)',
    zIndex: 0,
    boxShadow: '0 4px 14px rgba(15,23,42,0.03)'
  }} />

  {/* Sheet 2: Middle Layer (Warm Linen #FAF9F5 or Theme Tint) */}
  <div style={{
    position: 'absolute',
    inset: 0,
    borderRadius: '24px',
    background: 'var(--primary-light, #FAF9F5)',
    border: '1.5px solid var(--primary-border, #E7E5E0)',
    transform: 'translate(5px, 6px) rotate(0.7deg)',
    zIndex: 1,
    boxShadow: '0 4px 14px rgba(15,23,42,0.04)'
  }} />

  {/* Sheet 1: Top Main Layer (Clean Studio White #FFFFFF) */}
  <div style={{
    position: 'relative',
    zIndex: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    border: '1.5px solid var(--primary-border)',
    padding: '2.25rem 2rem',
    boxShadow: 'var(--shadow-md)'
  }}>
    {/* Card Content Here */}
  </div>
</div>
```

---

## 3. Horizontal Split Layout for Authentication & Portals

Auth pages (`/login`, `/signup`) and dashboard entry portals MUST use a prominent, wide **960px horizontal split card layout**:

- **Left Brand Panel (`1fr`)**: Features primary accent fill (`var(--primary-light)`), gradient header text, value proposition bullet points with check icons, and a verified trust badge.
- **Right Form Panel (`1.1fr`)**: Features standard email/password input fields with floating focus rings (`var(--primary-glow)`), Google & GitHub OAuth sign-in buttons, and quick toggle tabs.

---

## 4. Dynamic Theme Accent Switcher Rules

- All buttons, hover states, back buttons, and badges MUST reference CSS custom variables (`var(--primary)`, `var(--primary-hover)`, `var(--primary-light)`, `var(--primary-border)`).
- When switching accent colors dynamically in the header, update `:root` variables in JavaScript:
  ```javascript
  document.documentElement.style.setProperty('--primary', newColor.primary);
  document.documentElement.style.setProperty('--primary-hover', newColor.hover);
  document.documentElement.style.setProperty('--primary-light', newColor.light);
  document.documentElement.style.setProperty('--primary-border', newColor.border);
  document.documentElement.style.setProperty('--primary-glow', newColor.glow);
  ```

---

## 5. 2-Column Activity & Assets Vault Dashboard

Dashboards and activity blocks MUST use a spacious 2-column grid layout:
- **Left Column**: Live preview card with scaled asset preview, primary action CTA ("Rebuild / Modify"), and metadata.
- **Right Column**: Database-logged activity history list with live status indicators (`🟢 Database Connected`), timestamped log entries, and export statistics.
