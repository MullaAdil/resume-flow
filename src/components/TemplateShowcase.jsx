import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { templates, allTags } from './templatesList';
import TemplateRenderer from './TemplateRenderer';
import { mockResumeData, templateMockData } from '../utils/mockResumeData';
import AuraHeader from './AuraHeader';
import { ZoomIn, Eye, X, Check, Layout, Search, Heart } from 'lucide-react';

const TemplateShowcase = () => {
  const [selectedColor, setSelectedColor] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedTemplate, setResumeData, defaultState } = useResume();
  const [activeTag, setActiveTag] = useState('All templates');
  const [previewTemplate, setPreviewTemplate] = useState(null); // For fullscreen preview
  const gridRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(360);

  // Persistent Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('template_wishlist') || '[]');
    } catch {
      return [];
    }
  });

  const handleToggleWishlist = (id) => {
    setWishlist((prev) => {
      let next;
      if (prev.includes(id)) {
        next = prev.filter((item) => item !== id);
      } else {
        next = [...prev, id];
      }
      localStorage.setItem('template_wishlist', JSON.stringify(next));
      return next;
    });
  };

  const filteredTemplates = activeTag === '❤️ Wishlist'
    ? templates.filter(t => wishlist.includes(t.id))
    : activeTag === 'All templates' 
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
      style={{ minHeight: '100%', backgroundColor: 'transparent', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header Navigation */}
      <AuraHeader />

      {/* Hero / Filter Section */}
      <div style={{ padding: '3rem 2rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#111827', marginBottom: '0.5rem' }}>Templates we recommend for you</h1>
        <p style={{ fontSize: '1.1rem', color: '#4B5563', marginBottom: '2.5rem' }}>You can always change your template later.</p>

        {/* Filter Controls */}
        <div style={{ 
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
          background: '#FFFFFF', 
          padding: '1.25rem 1.75rem', 
          maxWidth: '850px', margin: '0 auto', 
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: 'var(--shadow-md)',
          position: 'relative'
        }}>
          <span style={{ fontWeight: 600, color: '#374151', marginRight: '0.25rem' }}>Filter by</span>
          <select value={activeTag} onChange={(e) => setActiveTag(e.target.value)} style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#FFFFFF', outline: 'none', fontWeight: 600, cursor: 'pointer' }}>
            <option value="All templates">All templates</option>
            <option value="❤️ Wishlist">❤️ Wishlist ({wishlist.length})</option>
            {allTags.filter(t => t !== 'All templates').map(tag => <option key={tag} value={tag}>{tag}</option>)}
          </select>

          {/* Wishlist Quick Filter Button */}
          <button
            onClick={() => setActiveTag(activeTag === '❤️ Wishlist' ? 'All templates' : '❤️ Wishlist')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.55rem 1rem',
              borderRadius: '9999px',
              border: activeTag === '❤️ Wishlist' ? '1.5px solid #E11D48' : '1px solid #CBD5E1',
              backgroundColor: activeTag === '❤️ Wishlist' ? '#FFF1F2' : '#FFFFFF',
              color: activeTag === '❤️ Wishlist' ? '#BE123C' : '#374151',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Heart size={15} color="#E11D48" fill={wishlist.length > 0 ? '#E11D48' : 'none'} />
            <span>Wishlist ({wishlist.length})</span>
          </button>

          <div style={{ height: '24px', width: '1px', background: '#E5E7EB', margin: '0 0.5rem' }}></div>
          <span style={{ fontWeight: 600, color: '#374151', marginRight: '0.25rem' }}>Colors</span>
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
                   background: '#FFFFFF',
                   borderRadius: '16px',
                   border: '1px solid #E2E8F0',
                   padding: '1.25rem',
                   boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.06)',
                   transition: 'all 0.2s ease',
                   position: 'relative',
                   cursor: 'pointer'
                 }}
                 onClick={() => handleSelectTemplate(template.id)}
               >
                 {/* Top Template Header Info */}
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', padding: '0 0.25rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                       {template.name}
                     </h3>
                     {index === 0 && (
                       <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', background: 'rgba(5, 150, 105, 0.1)', padding: '0.15rem 0.55rem', borderRadius: '9999px' }}>
                         Popular
                       </span>
                     )}
                   </div>

                   {/* Heart Wishlist Toggle */}
                   <button
                     type="button"
                     onClick={(e) => {
                       e.stopPropagation();
                       handleToggleWishlist(template.id);
                     }}
                     style={{
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       width: '34px',
                       height: '34px',
                       borderRadius: '50%',
                       backgroundColor: wishlist.includes(template.id) ? '#FFF1F2' : '#F8FAFC',
                       border: wishlist.includes(template.id) ? '1.5px solid #FECDD3' : '1px solid #E2E8F0',
                       cursor: 'pointer',
                       transition: 'all 0.15s ease',
                       boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                     }}
                     title={wishlist.includes(template.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                   >
                     <Heart
                       size={17}
                       color={wishlist.includes(template.id) ? '#E11D48' : '#94A3B8'}
                       fill={wishlist.includes(template.id) ? '#E11D48' : 'none'}
                     />
                   </button>
                 </div>
                 
                 {/* Preview Container */}
                 <div style={{
                     width: '100%',
                     height: `${scaledHeight}px`,
                     position: 'relative',
                     overflow: 'hidden',
                     borderRadius: '8px',
                     border: '1px solid #E2E8F0',
                     boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
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
                       (() => {
                         const previewData = templateMockData[template.id] || mockResumeData;
                         return <TemplateRenderer templateId={template.id} resumeData={previewData} />;
                       })()
                     }
                   </div>

                   {/* Hover Overlay */}
                   <div 
                     className="template-hover-zoom"
                     style={{
                       position: 'absolute',
                       top: 0, left: 0, right: 0, bottom: 0,
                       backgroundColor: 'rgba(15, 23, 42, 0.25)',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       opacity: 0,
                       transition: 'opacity 0.2s ease'
                     }}
                     onClick={(e) => {
                       e.stopPropagation();
                       setPreviewTemplate(template.id);
                     }}
                   >
                     <div style={{
                       width: '56px', height: '56px', borderRadius: '50%',
                       background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                       boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
                     }}>
                        <ZoomIn size={26} color="#0F172A" />
                     </div>
                   </div>
                 </div>

                 {/* Reshaped Button */}
                 <div style={{ marginTop: '1.25rem' }}>
                    <button 
                      className="aura-btn-primary"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        fontSize: '0.95rem'
                      }}
                    >
                      Use Template
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

        {filteredTemplates.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            maxWidth: '520px',
            margin: '2rem auto',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#FFF1F2',
              border: '1px solid #FECDD3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              boxShadow: '0 0 16px rgba(225, 29, 72, 0.15)'
            }}>
              <Heart size={26} color="#E11D48" fill="#E11D48" />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Your Wishlist is Empty
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Save your favorite resume templates to your personal account collection by tapping the heart symbol on any template card!
            </p>
            <button
              className="aura-btn-primary"
              onClick={() => setActiveTag('All templates')}
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}
            >
              Explore All Designs
            </button>
          </div>
        )}
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
