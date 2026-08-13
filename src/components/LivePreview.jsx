import React, { useRef, useEffect, useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { motion, AnimatePresence } from 'framer-motion';
import TemplateRenderer from './TemplateRenderer';

const A4_PX_HEIGHT = 1131.42857; // 800px * (297 / 210) = exact A4 ratio

const LivePreview = ({ disableScaling = false }) => {
  const { resumeData, selectedTemplate } = useResume();
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [measuredHeight, setMeasuredHeight] = useState(A4_PX_HEIGHT);

  useEffect(() => {
    if (disableScaling) {
      setScale(1);
      return;
    }
    const observer = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width } = entries[0].contentRect;
        const paddingOffset = width < 600 ? 16 : 40;
        const calculatedScale = (width - paddingOffset) / 800;
        const newScale = Math.min(1, Math.max(0.3, calculatedScale));
        setScale(prev => Math.abs(prev - newScale) > 0.01 ? newScale : prev);
      }
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [disableScaling]);

  useEffect(() => {
    let animationFrameId;
    const updateH = () => {
      if (contentRef.current) {
        const h = Math.max(contentRef.current.scrollHeight || 0, contentRef.current.offsetHeight || 0, A4_PX_HEIGHT);
        setMeasuredHeight(prev => Math.abs(prev - h) > 5 ? h : prev);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateH);
    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(updateH);
    }, 150);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, [resumeData, selectedTemplate]);

  const totalA4Pages = Math.ceil(measuredHeight / A4_PX_HEIGHT);
  const marginOffset = disableScaling ? 0 : -((1 - scale) * measuredHeight);

  // Generate page boundary markers for multi-page document previews
  const pageBreakMarkers = [];
  for (let p = 1; p < totalA4Pages; p++) {
    pageBreakMarkers.push(p * A4_PX_HEIGHT);
  }

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AnimatePresence mode="popLayout">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: scale }}
          exit={{ opacity: 0, scale: 0.98 }}
          key={selectedTemplate}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: 'top center',
            marginBottom: `${marginOffset}px`
          }}
        >
          {/* Authentic A4 Paper Sheet Box */}
          <div 
            ref={contentRef} 
            id="resume-pdf-content" 
            style={{ 
              width: '800px', 
              minHeight: `${A4_PX_HEIGHT}px`, 
              height: 'auto', 
              position: 'relative',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 16px 40px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04)',
              border: '1px solid #CBD5E1',
              borderRadius: '2px',
              overflow: 'hidden'
            }}
          >
            <TemplateRenderer templateId={selectedTemplate} resumeData={resumeData} />

            {/* Visual Page Break Lines for Multi-Page A4 Sheet Previews */}
            {pageBreakMarkers.map((breakTop, idx) => (
              <div 
                key={idx}
                style={{
                  position: 'absolute',
                  top: `${breakTop}px`,
                  left: 0,
                  right: 0,
                  zIndex: 90,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}
              >
                <div style={{ position: 'absolute', left: 0, right: 0, height: '1px', borderTop: '2px dashed #94A3B8', opacity: 0.6 }} />
                <span 
                  style={{ 
                    position: 'relative', 
                    zIndex: 91, 
                    backgroundColor: '#1E293B', 
                    color: '#F8FAFC', 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    padding: '2px 10px', 
                    borderRadius: '12px',
                    letterSpacing: '0.04em',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                  }}
                >
                  ✂️ A4 PAGE {idx + 1} END / PAGE {idx + 2} START (210mm × 297mm)
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default React.memo(LivePreview);


