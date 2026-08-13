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

  // Compute inner auto-fit scale factor so content ALWAYS resizes to fit inside 1 Single A4 Sheet
  const autoFitScale = measuredHeight > A4_PX_HEIGHT ? (A4_PX_HEIGHT / measuredHeight) : 1;
  const marginOffset = disableScaling ? 0 : -((1 - scale) * A4_PX_HEIGHT);

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
          {/* Strict Single-Page A4 Paper Sheet Container */}
          <div 
            id="resume-pdf-content" 
            style={{ 
              width: '800px', 
              height: `${A4_PX_HEIGHT}px`,
              maxHeight: `${A4_PX_HEIGHT}px`,
              position: 'relative',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 16px 40px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04)',
              border: '1px solid #CBD5E1',
              borderRadius: '2px',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
          >
            <div 
              ref={contentRef}
              style={{
                width: '800px',
                transform: autoFitScale !== 1 ? `scale(${autoFitScale})` : 'none',
                transformOrigin: 'top left',
                position: 'relative'
              }}
            >
              <TemplateRenderer templateId={selectedTemplate} resumeData={resumeData} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default React.memo(LivePreview);



