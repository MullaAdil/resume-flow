import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ChooseFlow from './components/ChooseFlow';
import ImportFlow from './components/ImportFlow';
import BuilderFlow from './components/BuilderFlow';
import TemplateShowcase from './components/TemplateShowcase';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
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
        <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)' }}>
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <AnimatedRoutes />
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
