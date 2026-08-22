import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Detects if the current device is running iOS (iPhone / iPad / iPod)
 */
const isIOSDevice = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /Macintosh/.test(navigator.userAgent))
  );
};

/**
 * Captures an HTML element and downloads it as a standardized A4 PDF.
 * @param {string} elementId - The ID of the HTML element to capture.
 * @param {string} filename - The name of the downloaded file.
 */
export const downloadPDF = async (elementId, filename = 'resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found.`);
    return;
  }

  // Clear any user text selection to avoid selection highlights in the capture
  try {
    const sel = window.getSelection && window.getSelection();
    if (sel && sel.removeAllRanges) sel.removeAllRanges();
  } catch (e) {}

  // Await font loading to prevent text rendering jumps in canvas capture
  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  } catch (e) {}

  // Create an off-screen clone of the element to avoid transform/parent scaling issues
  const clone = element.cloneNode(true);
  clone.id = 'resume-pdf-clone';
  clone.style.position = 'absolute';
  clone.style.left = '-10000px';
  clone.style.top = '-10000px';
  clone.style.width = '800px';
  clone.style.transform = 'none';
  clone.style.transformOrigin = 'top left';
  clone.style.boxShadow = 'none';
  clone.style.margin = '0';
  clone.style.zIndex = '-99999';
  clone.style.background = '#ffffff';

  // Ensure inner wrapper doesn't retain CSS transform
  const wrapper = clone.querySelector('.customized-resume-wrapper');
  if (wrapper) {
    wrapper.style.transform = 'none';
  }

  // Strip selection styles and box shadows from cloned nodes
  try {
    clone.style.userSelect = 'none';
    const allNodes = clone.querySelectorAll('*');
    allNodes.forEach((node) => {
      try {
        node.style.userSelect = 'none';
        node.style.boxShadow = 'none';
      } catch (e) {}
    });
    const selStyle = document.createElement('style');
    selStyle.innerHTML = '::selection { background: transparent !important; color: inherit !important; }';
    clone.appendChild(selStyle);
  } catch (e) {}

  document.body.appendChild(clone);

  // Exact A4 height at 800px width: 800 * (297 / 210) = 1131.42857px
  const A4_PX_HEIGHT = 1131.42857;

  // Clear any artificial minHeight on root clone to measure true content height
  clone.style.minHeight = 'auto';

  // Measure initial clone content height
  let measuredContentHeight = Math.max(clone.scrollHeight, clone.offsetHeight);
  let rawContentHeight = measuredContentHeight;

  // If content is within 1.2x of 1 A4 page (up to ~1350px), auto-fit smoothly to 1 single crisp page:
  if (rawContentHeight > A4_PX_HEIGHT && rawContentHeight <= A4_PX_HEIGHT * 1.22) {
    const scaleFactor = A4_PX_HEIGHT / rawContentHeight;
    clone.style.transform = `scale(${scaleFactor})`;
    clone.style.transformOrigin = 'top left';
    clone.style.width = `${Math.round(800 / scaleFactor)}px`;
    
    // Wrap clone in a parent to constrain height exactly to 1 A4 page
    const parentHolder = document.createElement('div');
    parentHolder.style.position = 'absolute';
    parentHolder.style.left = '-10000px';
    parentHolder.style.top = '-10000px';
    parentHolder.style.width = '800px';
    parentHolder.style.height = `${A4_PX_HEIGHT}px`;
    parentHolder.style.overflow = 'hidden';
    parentHolder.appendChild(clone);
    document.body.appendChild(parentHolder);
    rawContentHeight = A4_PX_HEIGHT;
  } else if (rawContentHeight > A4_PX_HEIGHT * 1.22) {
    // True multi-page resume (>1380px)
    // Inspect block elements and inject smart breaks to avoid cutting through lines
    const breakableSelector = 'h1, h2, h3, h4, p, li, tr, .experience-item, .education-item, .project-item, .section-block, .bullet-point, [data-section]';
    const breakableNodes = Array.from(clone.querySelectorAll(breakableSelector));
    
    const cloneRect = clone.getBoundingClientRect();
    const sortedNodes = breakableNodes
      .map(node => ({
        node,
        top: node.getBoundingClientRect().top - cloneRect.top,
        bottom: node.getBoundingClientRect().bottom - cloneRect.top,
        height: node.getBoundingClientRect().height
      }))
      .filter(item => item.height > 0 && item.height < A4_PX_HEIGHT * 0.75)
      .sort((a, b) => a.top - b.top);

    let currentOffsetY = 0;
    let pageCount = Math.ceil(rawContentHeight / A4_PX_HEIGHT);

    for (let page = 1; page < pageCount; page++) {
      const pageBoundaryY = page * A4_PX_HEIGHT;
      
      const straddlingItem = sortedNodes.find(item => {
        const itemTop = item.top + currentOffsetY;
        const itemBottom = item.bottom + currentOffsetY;
        return itemTop < pageBoundaryY - 15 && itemBottom > pageBoundaryY + 15;
      });

      if (straddlingItem) {
        const itemTop = straddlingItem.top + currentOffsetY;
        const pushDistance = pageBoundaryY - itemTop + 12;
        
        if (pushDistance > 0 && pushDistance < A4_PX_HEIGHT * 0.45) {
          const spacer = document.createElement('div');
          spacer.className = 'pdf-page-break-spacer';
          spacer.style.display = 'block';
          spacer.style.width = '100%';
          spacer.style.height = `${pushDistance}px`;
          spacer.style.clear = 'both';
          straddlingItem.node.parentNode.insertBefore(spacer, straddlingItem.node);
          currentOffsetY += pushDistance;
        }
      }
    }

    rawContentHeight = Math.max(A4_PX_HEIGHT, clone.scrollHeight, clone.offsetHeight);
  } else {
    // Fits on 1 page comfortably
    rawContentHeight = A4_PX_HEIGHT;
  }

  clone.style.height = `${rawContentHeight}px`;

  // Create overlay feedback during generation
  const overlay = document.createElement('div');
  overlay.id = 'pdf-gen-overlay';
  overlay.style.position = 'fixed';
  overlay.style.left = '0';
  overlay.style.top = '0';
  overlay.style.right = '0';
  overlay.style.bottom = '0';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.background = 'rgba(15, 23, 42, 0.45)';
  overlay.style.backdropFilter = 'blur(4px)';
  overlay.style.webkitBackdropFilter = 'blur(4px)';
  overlay.style.zIndex = '999999';
  overlay.style.color = '#ffffff';
  overlay.style.fontWeight = '600';
  overlay.style.fontSize = '1.05rem';
  overlay.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  overlay.innerText = isIOSDevice() ? 'Generating PDF for iOS...' : 'Preparing standard A4 PDF...';
  document.body.appendChild(overlay);

  try {
    // Brief layout settle wait
    await new Promise((resolve) => setTimeout(resolve, 220));

    // Ensure all internal images are fully loaded
    const imgs = Array.from(clone.querySelectorAll('img'));
    await Promise.all(
      imgs.map(
        (img) =>
          new Promise((res) => {
            if (img.complete && img.naturalWidth !== 0) return res();
            img.addEventListener('load', res);
            img.addEventListener('error', res);
          })
      )
    );

    const isIOS = isIOSDevice();
    // Dynamically calculate canvas scale to stay within iOS WebKit canvas memory limits (~3800px max height)
    let canvasScale = 2;
    if (isIOS) {
      canvasScale = Math.min(1.5, Math.max(1, 3800 / rawContentHeight));
    }

    const canvas = await html2canvas(clone, {
      scale: canvasScale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 800,
      height: rawContentHeight,
      windowWidth: 800,
      windowHeight: rawContentHeight,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const cleanTitle = filename.replace(/\.pdf$/i, '');
    pdf.setProperties({
      title: cleanTitle,
      creator: 'LED — Learning Experience Delivery',
      subject: 'Resume'
    });

    const totalPages = Math.ceil(rawContentHeight / A4_PX_HEIGHT);
    const canvasWidth = canvas.width;
    const canvasTotalHeight = canvas.height;
    const sliceHeightPx = Math.round(A4_PX_HEIGHT * canvasScale);

    for (let page = 0; page < totalPages; page++) {
      const sourceY = page * sliceHeightPx;
      const currentSliceHeight = Math.min(sliceHeightPx, canvasTotalHeight - sourceY);

      // Skip empty or tiny phantom trailing slice
      if (page > 0 && currentSliceHeight < 25 * canvasScale) {
        continue;
      }

      if (page > 0) {
        pdf.addPage('a4', 'portrait');
      }

      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvasWidth;
      pageCanvas.height = sliceHeightPx;
      const ctx = pageCanvas.getContext('2d');

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvasWidth, sliceHeightPx);

      if (currentSliceHeight > 0) {
        ctx.drawImage(
          canvas,
          0,
          sourceY,
          canvasWidth,
          currentSliceHeight,
          0,
          0,
          canvasWidth,
          currentSliceHeight
        );
      }

      const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);
      // addImage with (0, 0, 210, 297) maintains exact 1:1 A4 physical proportions
      pdf.addImage(pageImgData, 'JPEG', 0, 0, 210, 297);
    }

    // Handle PDF saving/sharing for desktop vs iOS/iPhone
    const pdfBlob = pdf.output('blob');
    const pdfFile = new File([pdfBlob], filename, { type: 'application/pdf' });

    if (isIOS) {
      // Native iOS Share Sheet (iOS 15+ Safari Web Share API)
      if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        try {
          await navigator.share({
            files: [pdfFile],
            title: cleanTitle,
            text: `Download ${cleanTitle} PDF`
          });
        } catch (shareErr) {
          // If user cancels share sheet or fails, open blob URL as fallback
          if (shareErr.name !== 'AbortError') {
            const blobUrl = URL.createObjectURL(pdfBlob);
            window.open(blobUrl, '_blank');
          }
        }
      } else {
        // Fallback for older iOS Safari: Open PDF Blob URL in new tab
        const blobUrl = URL.createObjectURL(pdfBlob);
        const newWindow = window.open(blobUrl, '_blank');
        if (!newWindow) {
          // If popup blocked, navigate current window to blobUrl
          window.location.href = blobUrl;
        }
      }
    } else {
      // Desktop / Android direct download
      pdf.save(filename);
    }
  } catch (error) {
    console.error('Failed to generate PDF:', error);
  } finally {
    // Clean up clone and overlay
    if (document.body.contains(clone)) {
      document.body.removeChild(clone);
    }
    const pdfClone = document.getElementById('resume-pdf-clone');
    if (pdfClone && document.body.contains(pdfClone)) {
      document.body.removeChild(pdfClone);
    }
    if (document.body.contains(overlay)) {
      document.body.removeChild(overlay);
    }
  }
};


