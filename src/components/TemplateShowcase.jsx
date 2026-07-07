import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        : "M0,5 L20,0 L40,5 L60,0 L80,5 L100,0 L120,5 L140,0 L160,5 L180,0 L200,5 L220,0 L240,5 L260,0 L280,5 L300,0 L320,5 L340,0 L360,5 L380,0 L400,5 L420,0 L440,5 L460,0 L480,5 L500,0 L520,5 L540,0 L560,5 L580,0 L600,5 L620,0 L640,5 L660,0 L680,5 L700,0 L720,5 L740,0 L760,5 L780,0 L800,5 L840,0 L880,5 L920,0 L960,5 L1000,0 L1040,5 L1080,0 L1120,5 L1160,0 L1200,5 L1200,10 L0,10 Z"
      } 
      fill="#FFFFFF" 
      stroke="#CBD5E1"
      strokeWidth="1.5"
    />
  </svg>
);

import { useNavigate, useLocation } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { templates, allTags } from './templatesList';
import TemplateRenderer from './TemplateRenderer';
import { mockResumeData, templateMockData } from '../utils/mockResumeData';
import { Layout, Search, ZoomIn, X, ArrowLeft, FileText } from 'lucide-react';

const TemplateShowcase = () => {
  const [selectedColor, setSelectedColor] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedTemplate, setResumeData, defaultState } = useResume();
  const [activeTag, setActiveTag] = useState('All templates');
  const [previewTemplate, setPreviewTemplate] = useState(null); // For fullscreen preview
  const gridRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(360);

  const filteredTemplates = activeTag === 'All templates' 
    ? templates 
    : templates.filter(t => t.tags.includes(activeTag));

  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
    if (location.state?.skipPathSelection) {
      navigate('/builder');
    } else {
      navigate('/choose');
    }
  };

  // Update scale dynamically based on grid column width, so it's fully visible and large
  useEffect(() => {
    const updateWidth = () => {
      if (gridRef.current) {
        // Get the first child to measure the actual column width CSS Grid assigned
        const firstChild = gridRef.current.firstElementChild;
        if (firstChild) {
          // Subtract padding to get the actual template width
          setCardWidth(firstChild.clientWidth - 40); 
        }
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    // Slight delay to ensure layout is calculated
    setTimeout(updateWidth, 100);
    return () => window.removeEventListener('resize', updateWidth);
  }, [filteredTemplates]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ minHeight: '100%', backgroundColor: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header Navigation */}
      <header style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1.25rem 2.5rem', background: '#FFFFFF', 
        borderBottom: '1px solid rgba(0,0,0,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button 
            onClick={() => navigate('/')}
            style={{ 
              background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', 
              cursor: 'pointer', color: '#4B5563', fontSize: '0.95rem', fontWeight: 600, padding: 0 
            }}
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <div style={{ height: '20px', width: '1px', background: '#E5E7EB' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem', color: '#111827' }}>
             <FileText size={28} color="var(--primary)" />
             Elevate Resume
          </div>

        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
           <button 
             onClick={() => navigate(location.state?.skipPathSelection ? '/builder' : '/choose')}
             className="btn-primary" 
             style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)' }}
           >
             Create my resume
           </button>
        </div>
      </header>

      {/* Hero / Filter Section */}
      <div style={{ padding: '3rem 2rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#111827', marginBottom: '0.5rem' }}>Templates we recommend for you</h1>
        <p style={{ fontSize: '1.1rem', color: '#4B5563', marginBottom: '2.5rem' }}>You can always change your template later.</p>

        {/* Filter Controls */}
        <div style={{ 
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
          background: 'linear-gradient(90deg, rgba(29, 78, 216, 0.03) 0%, #FFFFFF 15%)', 
          padding: '1.5rem 1.75rem', 
          maxWidth: '800px', margin: '0 auto', 
          borderLeft: '4px solid #1D4ED8', // slight ink color (fountain pen ink blue) in one edge
          borderRight: '1.5px solid #CBD5E1',
          borderTop: 'none',
          borderBottom: 'none',
          boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.08)',
          position: 'relative'
        }}>
          <TornEdge />
          <TornEdge isBottom />
          <span style={{ fontWeight: 600, color: '#374151', marginRight: '1rem' }}>Filter by</span>
            <select value={activeTag} onChange={(e) => setActiveTag(e.target.value)} style={{ padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid #D1D5DB', background: '#FFFFFF', outline: 'none' }}>
              {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>
          <div style={{ height: '24px', width: '1px', background: '#E5E7EB', margin: '0 1rem' }}></div>
          <span style={{ fontWeight: 600, color: '#374151', marginRight: '0.5rem' }}>Colors</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['#1E3A8A', '#1F2937', '#991B1B', '#065F46', '#D97706'].map(color => (
               <div key={color} onClick={() => setSelectedColor(selectedColor === color ? null : color)} style={{ width: '24px', height: '24px', borderRadius: '50%', background: color, cursor: 'pointer', border: selectedColor === color ? '2.5px solid #111827' : '2px solid transparent' }} className="color-dot" role="button" aria-label={`select-color-${color}`} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '1rem 2rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
         <p style={{ color: '#4B5563', fontWeight: 500 }}>Showing <strong>{filteredTemplates.length}</strong> templates</p>
      </div>

      {/* Templates Grid */}
      <div style={{ padding: '0 2rem 4rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <div 
          ref={gridRef}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', 
            gap: '2.5rem' 
          }}
        >
          {filteredTemplates.map((template, index) => {
             // The scale calculation ensures the template perfectly fits the grid column width
             // 800px is the fixed width of our templates.
             const scale = cardWidth / 800;
             const scaledHeight = 1131 * scale; 

             return (
               <motion.div
                 key={template.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.3, delay: index * 0.05 }}
                 className="template-card"
                 style={{ 
                   display: 'flex', flexDirection: 'column',
                   background: 'linear-gradient(90deg, rgba(29, 78, 216, 0.03) 0%, #FFFFFF 15%)',
                   borderLeft: '4px solid #1D4ED8',
                   borderRight: '1.5px solid #CBD5E1',
                   borderTop: 'none',
                   borderBottom: 'none',
                   padding: '2rem 1.25rem',
                   boxShadow: '0 12px 30px -10px rgba(15, 23, 42, 0.08)',
                   transition: 'all 0.2s ease',
                   position: 'relative',
                   cursor: 'pointer'
                 }}
                 onClick={() => handleSelectTemplate(template.id)}
               >
                 <TornEdge />
                 <TornEdge isBottom />
                 
                 {/* Preview Container */}
                 <div style={{
                     width: '100%',
                     height: `${scaledHeight}px`,
                     position: 'relative',
                     overflow: 'hidden',
                     borderRadius: '4px',
                     border: '1px solid rgba(0,0,0,0.05)',
                     boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                 }}>
                   {/* The actual high-fidelity template render */}
                   <div style={{
                     width: '800px',
                     height: '1131px',
                     transform: `scale(${scale})`,
                     transformOrigin: 'top left',
                     backgroundColor: '#FFFFFF'
                   }}>
                     {
                       // Inject selected color into the resumeData.settings so previews reflect color choice
                       (() => {
                         const baseData = templateMockData[template.id] || mockResumeData;
                         const previewData = {
                           ...baseData,
                           settings: {
                             ...(baseData.settings || {}),
                             primaryColor: selectedColor || (template.colors && template.colors[0]) || (baseData.settings && baseData.settings.primaryColor) || '#000000'
                           }
                         };
                         return <TemplateRenderer templateId={template.id} resumeData={previewData} />;
                       })()
                     }
                   </div>

                   {/* Hover Overlay with Magnifying Glass */}
                   <div 
                     className="template-hover-zoom"
                     style={{
                       position: 'absolute',
                       top: 0, left: 0, right: 0, bottom: 0,
                       backgroundColor: 'rgba(255, 255, 255, 0.3)',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       opacity: 0,
                       transition: 'opacity 0.2s ease',
                       backdropFilter: 'blur(1px)'
                     }}
                     onClick={(e) => {
                       e.stopPropagation();
                       setPreviewTemplate(template.id);
                     }}
                   >
                     <div style={{
                       width: '64px', height: '64px', borderRadius: '50%',
                       background: '#FCD34D', display: 'flex', alignItems: 'center', justifyContent: 'center',
                       boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                     }}>
                        <ZoomIn size={28} color="#000" />
                     </div>
                   </div>
                 </div>

                 {/* Choose Button fixed at bottom of card */}
                 <div style={{ marginTop: '1.5rem' }}>
                    <button 
                      style={{
                        width: '100%',
                        backgroundColor: '#10B981',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '1rem',
                        borderRadius: '30px', // heavily rounded like Resume-Now
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(16, 185, 129, 0.2)',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10B981'}
                    >
                      Choose template
                    </button>
                 </div>

                 {/* Top tags (like 'Recommended') */}
                 {index === 0 && (
                   <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#A7F3D0', color: '#047857', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                     Recommended
                   </div>
                 )}
               </motion.div>
             );
          })}
        </div>
      </div>

      {/* Fullscreen Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 100,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem'
            }}
            onClick={() => setPreviewTemplate(null)}
          >
            <div 
              style={{ position: 'relative', height: '100%', maxHeight: '90vh', overflowY: 'auto', borderRadius: '8px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setPreviewTemplate(null)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#000', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 110 }}
              >
                <X size={24} />
              </button>
              
              {/* Full size render */}
              <div style={{ transform: 'scale(1)', transformOrigin: 'top center', background: '#fff' }}>
                 {
                   (() => {
                     const baseData = templateMockData[previewTemplate] || mockResumeData;
                     const previewData = {
                       ...baseData,
                       settings: {
                         ...(baseData.settings || {}),
                         primaryColor: selectedColor || (baseData.settings && baseData.settings.primaryColor) || '#000000'
                       }
                     };
                     return <TemplateRenderer templateId={previewTemplate} resumeData={previewData} />;
                   })()
                 }
              </div>
            </div>
            
            <div style={{ position: 'absolute', bottom: '2rem' }}>
               <button 
                  onClick={() => handleSelectTemplate(previewTemplate)}
                  style={{
                    backgroundColor: '#10B981', color: '#FFFFFF', border: 'none', padding: '1rem 3rem', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                  }}
                >
                  Choose this template
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Global CSS for hovers */}
      <style>{`
        .template-card:hover {
          border-color: #10B981 !important;
          transform: translateY(-4px);
        }
        .template-card:hover .template-hover-zoom {
          opacity: 1 !important;
        }
        .color-dot:hover {
          border-color: #10B981 !important;
        }
      `}</style>
    </motion.div>
  );
};

export default TemplateShowcase;
