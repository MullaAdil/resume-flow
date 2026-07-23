import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Hand, X, ArrowLeft } from 'lucide-react';
import TemplateRenderer from './TemplateRenderer';
import { mockResumeData, templateMockData } from '../utils/mockResumeData';

const BOOK_HEIGHT = 650;
const PAGE_WIDTH = 460;
const TEMPLATE_WIDTH = 800;
const TEMPLATE_HEIGHT = 1131;
const SCALE = (PAGE_HEIGHT = 580) => PAGE_HEIGHT / TEMPLATE_HEIGHT;

const FaceContent = ({ face, selectedColor, onSelect, onPreview }) => {
  const contentRef = React.useRef(null);
  const [contentHeight, setContentHeight] = React.useState(TEMPLATE_HEIGHT);

  React.useEffect(() => {
    // Wait a tiny bit for the template components to mount and render their DOM
    const timer = setTimeout(() => {
      if (contentRef.current) {
        setContentHeight(Math.max(TEMPLATE_HEIGHT, contentRef.current.scrollHeight));
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [face]);

  if (!face || face.type === 'empty') {
    return (
      <div style={{ width: '100%', height: '100%', background: '#f8fafc' }} />
    );
  }

  if (face.type === 'cover') {
    return (
      <div style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(to right, #4a3b32 0%, #3a2a22 100%)',
        backgroundImage: 'radial-gradient(circle, #5b4636 10%, transparent 10.01%), radial-gradient(circle, #4a3b32 10%, transparent 10.01%)',
        backgroundSize: '20px 20px', // slight texture
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        padding: '2rem', textAlign: 'center',
        color: '#d4c4b7',
        boxShadow: 'inset 5px 0 15px rgba(0,0,0,0.1)',
        border: '4px solid #2a1a12',
        borderLeft: '12px solid #1a0f0a', // spine
        borderRadius: '0 8px 8px 0'
      }}>
        <div style={{
          border: '2px dashed rgba(212, 196, 183, 0.4)',
          padding: '3rem',
          borderRadius: '4px',
          width: '80%'
        }}>
          <h1 style={{ fontSize: '4rem', fontFamily: 'Georgia, serif', fontWeight: 900, marginBottom: '1rem', textShadow: '2px 4px 6px rgba(0,0,0,0.5)' }}>
            Resume<br />Templates
          </h1>
          <p style={{ fontSize: '1.25rem', fontFamily: 'Georgia, serif', opacity: 0.9 }}>
            Open the book to find your perfect fit
          </p>
        </div>
      </div>
    );
  }

  if (face.type === 'inside-cover') {
    return (
      <div style={{ width: '100%', height: '100%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '80%', height: '90%', border: '2px dashed #cbd5e1', borderRadius: '8px' }} />
      </div>
    );
  }

  if (face.type === 'template') {
    const template = face.template;
    const scaleX = PAGE_WIDTH / TEMPLATE_WIDTH;
    const scaleY = BOOK_HEIGHT / contentHeight;

    const baseData = templateMockData[template.id] || mockResumeData;
    const previewData = {
      ...baseData,
      settings: {
        ...(baseData.settings || {}),
        primaryColor: selectedColor || (template.colors && template.colors[0]) || (baseData.settings && baseData.settings.primaryColor) || '#000000'
      }
    };

    return (
      <div
        onClick={() => onPreview(template)}
        style={{
          width: '100%', height: '100%',
          background: '#ffffff',
          position: 'relative',
          overflow: 'hidden', // No scrolling
          display: 'flex',
          justifyContent: 'center', // Center it horizontally if it shrinks
          alignItems: 'center', // Center it vertically
          cursor: 'pointer'
        }}
        title={`Preview ${template.name}`}
      >
        <div 
          ref={contentRef}
          style={{
          width: `${TEMPLATE_WIDTH}px`,
          height: 'max-content',
          minHeight: `${TEMPLATE_HEIGHT}px`,
          transform: `scale(${scaleX}, ${scaleY})`,
          transformOrigin: 'center center',
          backgroundColor: '#FFFFFF',
          pointerEvents: 'none' // Let clicks pass to the parent if needed, or keep buttons above
        }}>
          {/* We removed isPreview={true} so the templates look exactly like the original grid view */}
          <TemplateRenderer templateId={template.id} resumeData={previewData} />
        </div>
        
        {/* Choose Template Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '0',
          right: '0',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none' // Container ignores clicks
        }}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template.id);
            }}
            style={{
              pointerEvents: 'auto', // Button captures clicks
              padding: '0.8rem 2rem',
              background: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(5, 150, 105, 0.4)',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Choose Template
          </button>
        </div>
      </div>
    );
  }

  if (face.type === 'back-cover') {
    return (
      <div style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(to right, #4a3b32 0%, #3a2a22 100%)',
        backgroundImage: 'radial-gradient(circle, #5b4636 10%, transparent 10.01%), radial-gradient(circle, #4a3b32 10%, transparent 10.01%)',
        backgroundSize: '20px 20px',
        boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.1)',
        borderRadius: '8px 0 0 8px'
      }} />
    );
  }

  return null;
};

const Sheet = ({ index, currentSheetIndex, sheet, selectedColor, onSelect, onPreview }) => {
  const isFlipped = index < currentSheetIndex;

  // Stacking context: when flipped, lower index should be UNDER higher index sheets.
  // When not flipped, lower index should be ABOVE higher index sheets.
  const zIndex = isFlipped ? index : 1000 - index;

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transformOrigin: 'left center',
        transformStyle: 'preserve-3d',
        zIndex,
      }}
      initial={false}
      animate={{
        rotateY: isFlipped ? -180 : 0,
        // Tiny translateZ hack keeps browsers from z-fighting during animation
        z: isFlipped ? index * 0.1 : -index * 0.1
      }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 40, damping: 14 }}
    >
      {/* Front Face (Right Side Page) */}
      <div style={{
        position: 'absolute', width: '100%', height: '100%',
        backfaceVisibility: 'hidden',
        background: '#fff',
        borderRadius: '0 8px 8px 0', overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        <FaceContent face={sheet.front} selectedColor={selectedColor} onSelect={onSelect} onPreview={onPreview} />
      </div>

      {/* Back Face (Left Side Page) */}
      <div style={{
        position: 'absolute', width: '100%', height: '100%',
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        background: '#fff',
        borderRadius: '8px 0 0 8px', overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        <FaceContent face={sheet.back} selectedColor={selectedColor} onSelect={onSelect} onPreview={onPreview} />
      </div>
    </motion.div>
  );
};

const FlipBook = ({ templates, selectedColor, onSelect }) => {
  const [currentSheetIndex, setCurrentSheetIndex] = useState(1);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const faces = [
    { type: 'cover' },
    ...templates.map(t => ({ type: 'template', template: t })),
    { type: 'empty' },
    { type: 'back-cover' }
  ];

  const sheets = [];
  for (let i = 0; i < faces.length; i += 2) {
    sheets.push({
      front: faces[i],
      back: faces[i + 1] || { type: 'empty' }
    });
  }

  // Reset book to open state if filters change
  useEffect(() => {
    setCurrentSheetIndex(1);
  }, [templates]);

  const handleNext = () => {
    if (currentSheetIndex < sheets.length) {
      setCurrentSheetIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSheetIndex > 1) { // Prevents closing the book, keeping it open to templates 0 and 1
      setCurrentSheetIndex(prev => prev - 1);
    }
  };

  // Determine if book is fully closed (it shouldn't be anymore)
  const isBookClosed = false;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '2rem 0 4rem 0',
      overflowX: 'hidden'
    }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4rem', width: '100%' }}>

        {/* Left Side Navigation Button */}
        <button
          onClick={handlePrev}
          disabled={currentSheetIndex <= 1}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '60px', height: '60px', borderRadius: '50%',
            background: currentSheetIndex > 1 ? '#382518' : '#e2e8f0',
            color: currentSheetIndex > 1 ? '#f5ecd6' : '#94a3b8',
            border: 'none', cursor: currentSheetIndex > 1 ? 'pointer' : 'not-allowed',
            boxShadow: currentSheetIndex > 1 ? '0 10px 25px rgba(56, 37, 24, 0.4)' : 'none',
            transition: 'all 0.2s',
            zIndex: 100
          }}
          title="Previous Page"
        >
          <ChevronLeft size={32} />
        </button>

        {/* 3D Scene Container */}
        <div style={{
          position: 'relative',
          width: `${PAGE_WIDTH * 2}px`,
          height: `${BOOK_HEIGHT}px`,
          perspective: '3500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotateX(0deg)', // Perfectly flat so no text distortion, we use isometric shadows for bulk
          transformStyle: 'preserve-3d',
          marginBottom: '2rem'
        }}>

          {/* Isometric Left Page Stack (Bulk) */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: 0, width: `${PAGE_WIDTH}px`,
            backgroundColor: '#ffffff',
            borderRadius: '8px 0 0 8px',
            transform: 'translateZ(-50px)', // Push behind pages in 3D space
            boxShadow: `
              -1px 1px 0 #f8fafc, -2px 2px 0 #e2e8f0, -3px 3px 0 #cbd5e1,
              -4px 4px 0 #f8fafc, -5px 5px 0 #e2e8f0, -6px 6px 0 #cbd5e1,
              -7px 7px 0 #f8fafc, -8px 8px 0 #e2e8f0, -9px 9px 0 #cbd5e1,
              -10px 10px 0 #f8fafc, -11px 11px 0 #e2e8f0, -12px 12px 0 #cbd5e1,
              -13px 13px 0 #f8fafc, -14px 14px 0 #e2e8f0, -15px 15px 0 #cbd5e1,
              -16px 16px 0 #2d1b11, -17px 17px 0 #2d1b11, -18px 18px 0 #2d1b11,
              -19px 19px 0 #2d1b11, -20px 20px 0 #2d1b11, -21px 21px 0 #1a0f0a,
              -30px 30px 40px rgba(0,0,0,0.2)
            `,
            zIndex: -2,
          }} />

          {/* Isometric Right Page Stack (Bulk) */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: '50%', width: `${PAGE_WIDTH}px`,
            backgroundColor: '#ffffff',
            borderRadius: '0 8px 8px 0',
            transform: 'translateZ(-50px)', // Push behind pages in 3D space
            boxShadow: `
              1px 1px 0 #f8fafc, 2px 2px 0 #e2e8f0, 3px 3px 0 #cbd5e1,
              4px 4px 0 #f8fafc, 5px 5px 0 #e2e8f0, 6px 6px 0 #cbd5e1,
              7px 7px 0 #f8fafc, 8px 8px 0 #e2e8f0, 9px 9px 0 #cbd5e1,
              10px 10px 0 #f8fafc, 11px 11px 0 #e2e8f0, 12px 12px 0 #cbd5e1,
              13px 13px 0 #f8fafc, 14px 14px 0 #e2e8f0, 15px 15px 0 #cbd5e1,
              16px 16px 0 #2d1b11, 17px 17px 0 #2d1b11, 18px 18px 0 #2d1b11,
              19px 19px 0 #2d1b11, 20px 20px 0 #2d1b11, 21px 21px 0 #1a0f0a,
              30px 30px 40px rgba(0,0,0,0.2)
            `,
            zIndex: -2,
          }} />



          {/* The spine container, shifted slightly if book is closed so it looks centered */}
          <motion.div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: `${PAGE_WIDTH}px`,
              height: `${BOOK_HEIGHT}px`,
              transformStyle: 'preserve-3d',
            }}
            animate={{ x: isBookClosed ? -PAGE_WIDTH / 2 : 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 40, damping: 14 }}
          >
            {sheets.map((sheet, i) => (
              <Sheet
                key={i}
                index={i}
                currentSheetIndex={currentSheetIndex}
                sheet={sheet}
                selectedColor={selectedColor}
                onSelect={onSelect}
                onPreview={setPreviewTemplate}
              />
            ))}
          </motion.div>

          {/* Inner Spine Shadow (On top of pages for separation) */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '60px',
            background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)',
            pointerEvents: 'none',
            zIndex: 10000 // Ensure it sits on top of all pages
          }} />
        </div>

        {/* Right Side Navigation Button */}
        <button
          onClick={handleNext}
          disabled={currentSheetIndex >= sheets.length}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '60px', height: '60px', borderRadius: '50%',
            background: currentSheetIndex < sheets.length ? '#382518' : '#e2e8f0',
            color: currentSheetIndex < sheets.length ? '#f5ecd6' : '#94a3b8',
            border: 'none', cursor: currentSheetIndex < sheets.length ? 'pointer' : 'not-allowed',
            boxShadow: currentSheetIndex < sheets.length ? '0 10px 25px rgba(56, 37, 24, 0.4)' : 'none',
            transition: 'all 0.2s',
            zIndex: 100
          }}
          title="Next Page"
        >
          <ChevronRight size={32} />
        </button>

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
              backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100000,
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
                style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#000', color: '#fff', border: 'none', borderRadius: '30px', padding: '10px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 110, fontSize: '1rem', fontWeight: 600 }}
              >
                <ArrowLeft size={20} /> Back
              </button>

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
                onClick={() => onSelect(previewTemplate)}
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

    </div>
  );
};

export default FlipBook;
