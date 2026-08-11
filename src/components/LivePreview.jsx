import React, { useRef, useEffect, useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { motion, AnimatePresence } from 'framer-motion';
import TemplateRenderer from './TemplateRenderer';

const LivePreview = ({ disableScaling = false }) => {
  const { resumeData, selectedTemplate } = useResume();
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [measuredHeight] = useState(1131);

  useEffect(() => {
    if (disableScaling) {
      setScale(1);
      return;
    }
    const observer = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width } = entries[0].contentRect;
        // Resume width is 800px. Add 40px padding.
        const newScale = Math.min(1, (width - 40) / 800);
        setScale(prev => Math.abs(prev - newScale) > 0.01 ? newScale : prev);
      }
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [disableScaling]);

  const marginOffset = disableScaling ? 0 : -((1 - scale) * 1131);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
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
          <div ref={contentRef} id="resume-pdf-content" style={{ width: '800px', height: '1131px', minHeight: '1131px', maxHeight: '1131px', overflow: 'hidden', position: 'relative' }}>
            <TemplateRenderer templateId={selectedTemplate} resumeData={resumeData} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default React.memo(LivePreview);

