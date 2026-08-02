import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ChooseFlow from './components/ChooseFlow';
import ImportFlow from './components/ImportFlow';
import BuilderFlow from './components/BuilderFlow';
import TemplateShowcase from './components/TemplateShowcase';
import EmbeddedThemeBackground from './components/EmbeddedThemeBackground';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage initialMode="login" />} />
        <Route path="/signup" element={<LoginPage initialMode="signup" />} />
        <Route path="/templates" element={<TemplateShowcase />} />
        <Route path="/choose" element={<ChooseFlow />} />
        <Route path="/import" element={<ImportFlow />} />
        <Route path="/builder" element={<BuilderFlow />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)', position: 'relative' }}>
          {/* Quantum Matrix Grid & Floating Light Orbs */}
          <EmbeddedThemeBackground />

          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
            <AnimatedRoutes />
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
