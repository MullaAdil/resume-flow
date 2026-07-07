import React, { useRef, useEffect, useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { motion, AnimatePresence } from 'framer-motion';
import TemplateRenderer from './TemplateRenderer';

const LivePreview = ({ disableScaling = false }) => {
  const { resumeData, selectedTemplate } = useResume();
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

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
        setScale(newScale);
      }
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
      <AnimatePresence mode="wait">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={selectedTemplate}
          transition={{ duration: 0.3 }}
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: 'top center',
            marginBottom: `-${(1 - scale) * 1131}px`
          }}
        >
          <div id="resume-pdf-content" style={{ width: '800px', minHeight: '1131px', position: 'relative' }}>
            <TemplateRenderer templateId={selectedTemplate} resumeData={resumeData} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LivePreview;
