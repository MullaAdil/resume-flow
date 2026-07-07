import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FilePlus, FileUp, ArrowLeft } from 'lucide-react';


// ── Deckled Torn Paper Edges ──
const TornEdge = ({ isBottom }) => (
  <svg 
    width="100%" 
    height="10" 
    viewBox="0 0 1200 10" 
    preserveAspectRatio="none"
    style={{ 
      position: 'absolute', 
      left: 0, 
      right: 0, 
      [isBottom ? 'bottom' : 'top']: '-5px', 
      zIndex: 10,
      pointerEvents: 'none'
    }}
  >
    <path 
      d={isBottom 
        ? "M0,5 L20,10 L40,5 L60,10 L80,5 L100,10 L120,5 L140,10 L160,5 L180,10 L200,5 L220,10 L240,5 L260,10 L280,5 L300,10 L320,5 L340,10 L360,5 L380,10 L400,5 L420,10 L440,5 L460,10 L480,5 L500,10 L520,5 L540,10 L560,5 L580,10 L600,5 L620,10 L640,5 L660,10 L680,5 L700,10 L720,5 L740,10 L760,5 L780,10 L800,5 L840,10 L880,5 L920,10 L960,5 L1000,10 L1040,5 L1080,10 L1120,5 L1160,10 L1200,5 L1200,0 L0,0 Z"
        : "M0,5 L20,0 L40,5 L60,0 L80,5 L100,0 L120,5 L140,0 L160,5 L180,0 L200,5 L220,0 L240,5 L260,0 L280,5 L300,0 L320,5 L340,0 L360,5 L380,0 L400,5 L420,0 L440,5 L460,0 L480,5 L500,0 L520,6 L540,0 L560,5 L580,0 L600,5 L620,0 L640,5 L660,0 L680,5 L700,0 L720,5 L740,0 L760,5 L780,0 L800,5 L840,0 L880,5 L920,0 L960,5 L1000,0 L1040,5 L1080,0 L1120,5 L1160,0 L1200,5 L1200,10 L0,10 Z"
      } 
      fill="#FFFFFF" 
      stroke="#CBD5E1"
      strokeWidth="1.5"
    />
  </svg>
);

const ChooseFlow = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="container"
      style={{ 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '4rem 2rem',
        position: 'relative', overflow: 'hidden', background: '#F8FAFC' 
      }}
    >
      {/* Abstract Gradient Mesh Background */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(67, 56, 202, 0.12) 0%, rgba(255,255,255,0) 65%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-5%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(255,255,255,0) 65%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.06) 0%, rgba(255,255,255,0) 65%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />

      {/* Back button container */}
      <div style={{ width: '100%', maxWidth: '780px', marginBottom: '2.5rem', display: 'flex', justifyContent: 'flex-start', zIndex: 1 }}>
        <button 
          onClick={() => navigate('/')}
          style={{ 
            background: '#FFFFFF', border: '1.5px solid #CBD5E1', display: 'flex', alignItems: 'center', gap: '0.5rem', 
            cursor: 'pointer', color: '#1F2937', fontSize: '1rem', fontWeight: 700, padding: '0.65rem 1.25rem', borderRadius: '12px 24px 12px 24px',
            transition: 'all 0.1s ease', boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
          }}
          onMouseOver={(e) => { e.currentTarget.style.borderColor = '#94A3B8'; e.currentTarget.style.background = '#F8FAFC'; }}
          onMouseOut={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.background = '#FFFFFF'; }}
        >
          <ArrowLeft size={16} />
          Go Back to Home
        </button>
      </div>

      <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem', zIndex: 1, color: '#111827', textAlign: 'center', letterSpacing: '-0.02em' }}>
        Select Your Path
      </h2>
      <p style={{ fontSize: '1.05rem', color: '#475569', marginBottom: '3.5rem', zIndex: 1, textAlign: 'center', maxWidth: '500px', lineHeight: 1.5 }}>
        Choose an option below to begin crafting your professional resume.
      </p>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', zIndex: 1 }}>
        
        {/* Create New Card */}
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => navigate('/builder')}
          style={{ 
            width: '100%', maxWidth: '370px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', 
            gap: '1.5rem', padding: '3.5rem 2.5rem', background: 'linear-gradient(90deg, rgba(29, 78, 216, 0.03) 0%, #FFFFFF 15%)', 
            borderLeft: '4px solid #1D4ED8', borderRight: '1.5px solid #CBD5E1', borderTop: 'none', borderBottom: 'none',
            boxShadow: '0 12px 30px -10px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.02)', transition: 'all 0.15s ease',
            position: 'relative'
          }}
        >
          <TornEdge />
          <TornEdge isBottom />
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '50%', 
            background: 'rgba(5, 150, 105, 0.08)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center'
          }}>
            <FilePlus size={28} color="#059669" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: '#111827' }}>Create New</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>Start from scratch and use our guided step-by-step tools.</p>
          </div>
        </motion.div>

        {/* Import CV Card */}
        <motion.div 
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => navigate('/import')}
          style={{ 
            width: '100%', maxWidth: '370px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', 
            gap: '1.5rem', padding: '3.5rem 2.5rem', background: 'linear-gradient(90deg, rgba(29, 78, 216, 0.03) 0%, #FFFFFF 15%)', 
            borderLeft: '4px solid #1D4ED8', borderRight: '1.5px solid #CBD5E1', borderTop: 'none', borderBottom: 'none',
            boxShadow: '0 12px 30px -10px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.02)', transition: 'all 0.15s ease',
            position: 'relative'
          }}
        >
          <TornEdge />
          <TornEdge isBottom />
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '50%', 
            background: 'rgba(5, 150, 105, 0.08)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center'
          }}>
            <FileUp size={28} color="#059669" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem', color: '#111827' }}>Import Resume</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>Upload an existing PDF/Word file and let AI extract the data instantly.</p>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ChooseFlow;
