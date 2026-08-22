import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ChooseFlow from './components/ChooseFlow';
import ImportFlow from './components/ImportFlow';
import BuilderFlow from './components/BuilderFlow';
import DashboardPage from './components/DashboardPage';
import TemplateShowcase from './components/TemplateShowcase';
import ServicesHubPage from './components/services/ServicesHubPage';
import AtsScannerPage from './components/services/AtsScannerPage';
import BulletEnhancerPage from './components/services/BulletEnhancerPage';
import CoverLetterPage from './components/services/CoverLetterPage';
import WebsiteBuilderPage from './components/services/WebsiteBuilderPage';
import CareerMapPage from './components/services/CareerMapPage';
import ResignationLetterPage from './components/services/ResignationLetterPage';
import ProofreadingPage from './components/services/ProofreadingPage';
import JobMatcherPage from './components/services/JobMatcherPage';
import VisionClonerPage from './components/services/VisionClonerPage';
import LinkedInStudioPage from './components/services/LinkedInStudioPage';
import TextToResumeServicePage from './components/services/TextToResumeServicePage';
import EmbeddedThemeBackground from './components/EmbeddedThemeBackground';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="popLayout">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/activity" element={<DashboardPage />} />
        <Route path="/services" element={<ServicesHubPage />} />
        <Route path="/services/text-to-resume" element={<TextToResumeServicePage />} />
        <Route path="/services/ats-scanner" element={<AtsScannerPage />} />
        <Route path="/services/bullet-enhancer" element={<BulletEnhancerPage />} />
        <Route path="/services/cover-letter" element={<CoverLetterPage />} />
        <Route path="/services/website-builder" element={<WebsiteBuilderPage />} />
        <Route path="/services/career-map" element={<CareerMapPage />} />
        <Route path="/services/resignation-letter" element={<ResignationLetterPage />} />
        <Route path="/services/proofreading" element={<ProofreadingPage />} />
        <Route path="/services/job-matcher" element={<JobMatcherPage />} />
        <Route path="/services/vision-cloner" element={<VisionClonerPage />} />
        <Route path="/services/linkedin-studio" element={<LinkedInStudioPage />} />
        <Route path="/ai-text-architect" element={<TextToResumeServicePage />} />
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
