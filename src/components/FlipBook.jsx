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

const FaceContent = ({ face, onSelect, onPreview }) => {
  const contentRef = React.useRef(null);
  const [contentHeight, setContentHeight] = React.useState(TEMPLATE_HEIGHT);

  React.useEffect(() => {
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
        background: 'linear-gradient(to right, #2D3748 0%, #1A202C 100%)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        padding: '2rem', textAlign: 'center',
        color: '#E2E8F0',
        borderLeft: '12px solid #0F172A', // spine
        borderRadius: '0 8px 8px 0'
      }}>
        <div style={{
          border: '2px dashed rgba(226, 232, 240, 0.3)',
          padding: '3rem',
          borderRadius: '8px',
          width: '80%'
        }}>
          <h1 style={{ fontSize: '3.5rem', fontFamily: 'Georgia, serif', fontWeight: 900, marginBottom: '1rem', color: '#FFFFFF' }}>
            Resume<br />Templates
          </h1>
          <p style={{ fontSize: '1.2rem', fontFamily: 'Georgia, serif', opacity: 0.9 }}>
            Flip through to find your ideal design
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
    const previewData = templateMockData[template.id] || mockResumeData;

    return (
      <div
        onClick={() => onPreview(template)}
        style={{
          width: '100%', height: '100%',
          background: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        title={`Preview ${template.name}`}
      >
        {/* Template Name Header Badge Overlay */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          zIndex: 20,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          color: '#FFFFFF',
          padding: '0.4rem 1rem',
          borderRadius: '9999px',
          fontSize: '0.85rem',
          fontWeight: 700,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          pointerEvents: 'none'
        }}>
          <span>✨</span>
          <span>{template.name}</span>
        </div>

        <div 
          ref={contentRef}
          style={{
          width: `${TEMPLATE_WIDTH}px`,
          height: 'max-content',
          minHeight: `${TEMPLATE_HEIGHT}px`,
          transform: `scale(${scaleX}, ${scaleY})`,
          transformOrigin: 'center center',
          backgroundColor: '#FFFFFF',
          pointerEvents: 'none'
        }}>
          <TemplateRenderer templateId={template.id} resumeData={previewData} />
        </div>
        
        {/* Reshaped Accessible Button Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '0',
          right: '0',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 20
        }}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template.id);
            }}
            style={{
              pointerEvents: 'auto',
              padding: '0.75rem 2.25rem',
              background: '#059669',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(5, 150, 105, 0.35)',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
          >
            Use Template
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

const Sheet = ({ index, currentSheetIndex, sheet, onSelect, onPreview }) => {
  const isFlipped = index < currentSheetIndex;
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
        <FaceContent face={sheet.front} onSelect={onSelect} onPreview={onPreview} />
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
        <FaceContent face={sheet.back} onSelect={onSelect} onPreview={onPreview} />
      </div>
    </motion.div>
  );
};

const FlipBook = ({ templates, onSelect }) => {
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
  const bookWrapperRef = useRef(null);
  const [bookScale, setBookScale] = useState(1);

  useEffect(() => {
    setCurrentSheetIndex(1);
  }, [templates]);

  useEffect(() => {
    const handleBookResize = () => {
      const parentWidth = bookWrapperRef.current ? bookWrapperRef.current.offsetWidth : window.innerWidth;
      const screenW = Math.min(parentWidth, window.innerWidth);
      const targetW = 1040; // Book (920px) + Buttons & padding
      if (screenW < targetW) {
        const calculatedScale = Math.max(0.32, (screenW - 20) / targetW);
        setBookScale(calculatedScale);
      } else {
        setBookScale(1);
      }
    };

    handleBookResize();
    window.addEventListener('resize', handleBookResize);
    return () => window.removeEventListener('resize', handleBookResize);
  }, []);

  const handleNext = () => {
    if (currentSheetIndex < sheets.length) {
      setCurrentSheetIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSheetIndex > 1) {
      setCurrentSheetIndex(prev => prev - 1);
    }
  };

  const isBookClosed = false;

  const activeSheet = sheets[currentSheetIndex - 1];
  const frontName = activeSheet?.front?.template?.name;
  const backName = activeSheet?.back?.template?.name;
  const pageLabel = frontName && backName ? `${frontName} & ${backName}` : (frontName || backName || 'Cover');

  return (
    <div 
      ref={bookWrapperRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '1rem 0 2rem 0',
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      {/* Scaled Container for Mobile & Tablet Screen Widths */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `scale(${bookScale})`,
        transformOrigin: 'top center',
        marginBottom: `${-(1 - bookScale) * (BOOK_HEIGHT + 70)}px`,
        transition: 'transform 0.1s ease'
      }}>
        {/* Main 3D Book Controls Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', width: '100%', position: 'relative', zIndex: 10 }}>

        {/* Left Side Navigation Button */}
        <button
          onClick={handlePrev}
          disabled={currentSheetIndex <= 1}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '64px', height: '64px', borderRadius: '50%',
            background: currentSheetIndex > 1 
              ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' 
              : '#E2E8F0',
            color: currentSheetIndex > 1 ? '#FFFFFF' : '#94A3B8',
            border: 'none', cursor: currentSheetIndex > 1 ? 'pointer' : 'not-allowed',
            boxShadow: currentSheetIndex > 1 
              ? '0 12px 25px -5px rgba(5, 150, 105, 0.45), 0 0 0 3px rgba(16, 185, 129, 0.25)' 
              : 'none',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 100
          }}
          onMouseOver={(e) => { if (currentSheetIndex > 1) e.currentTarget.style.transform = 'scale(1.08) translateX(-2px)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1) translateX(0)'; }}
          title="Previous Page"
        >
          <ChevronLeft size={34} />
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
          transform: 'rotateX(0deg)',
          transformStyle: 'preserve-3d',
          marginBottom: '1rem'
        }}>

          {/* Isometric Left Page Stack (Bulk) */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: 0, width: `${PAGE_WIDTH}px`,
            backgroundColor: '#ffffff',
            borderRadius: '8px 0 0 8px',
            transform: 'translateZ(-50px)',
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
            transform: 'translateZ(-50px)',
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

          {/* The spine container */}
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
                onSelect={onSelect}
                onPreview={setPreviewTemplate}
              />
            ))}
          </motion.div>

          {/* Inner Spine Shadow */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '60px',
            background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)',
            pointerEvents: 'none',
            zIndex: 10000
          }} />
        </div>

        {/* Right Side Navigation Button */}
        <button
          onClick={handleNext}
          disabled={currentSheetIndex >= sheets.length}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '64px', height: '64px', borderRadius: '50%',
            background: currentSheetIndex < sheets.length 
              ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' 
              : '#E2E8F0',
            color: currentSheetIndex < sheets.length ? '#FFFFFF' : '#94A3B8',
            border: 'none', cursor: currentSheetIndex < sheets.length ? 'pointer' : 'not-allowed',
            boxShadow: currentSheetIndex < sheets.length 
              ? '0 12px 25px -5px rgba(5, 150, 105, 0.45), 0 0 0 3px rgba(16, 185, 129, 0.25)' 
              : 'none',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 100
          }}
          onMouseOver={(e) => { if (currentSheetIndex < sheets.length) e.currentTarget.style.transform = 'scale(1.08) translateX(2px)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1) translateX(0)'; }}
          title="Next Page"
        >
          <ChevronRight size={34} />
        </button>

      </div>

      {/* Page Navigation Jump Dots & Selector Down Near Bottom of Book */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '2rem',
        position: 'relative',
        zIndex: 20
      }}>
        {sheets.map((sheet, index) => {
          const sheetNum = index + 1;
          const isActive = currentSheetIndex === sheetNum;
          return (
            <button
              key={index}
              onClick={() => setCurrentSheetIndex(sheetNum)}
              style={{
                padding: isActive ? '0.45rem 1.25rem' : '0.4rem 0.75rem',
                borderRadius: '9999px',
                border: 'none',
                background: isActive 
                  ? 'linear-gradient(135deg, #059669, #10B981)' 
                  : '#E2E8F0',
                color: isActive ? '#FFFFFF' : '#334155',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isActive ? '0 4px 14px rgba(5, 150, 105, 0.45)' : 'none'
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(5, 150, 105, 0.15)';
                  e.currentTarget.style.color = '#059669';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = '#E2E8F0';
                  e.currentTarget.style.color = '#334155';
                }
              }}
            >
              {index === 0 ? 'Cover' : `Page ${index}`}
            </button>
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
                    const previewData = templateMockData[previewTemplate] || mockResumeData;
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
