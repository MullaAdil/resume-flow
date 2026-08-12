import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

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

  // Calculate actual height
  const actualHeight = Math.max(1131, clone.scrollHeight, clone.offsetHeight);
  clone.style.height = `${actualHeight}px`;

  // Create a small overlay feedback during generation
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
  overlay.style.background = 'rgba(0,0,0,0.35)';
  overlay.style.zIndex = '999999';
  overlay.style.color = '#fff';
  overlay.style.fontWeight = '600';
  overlay.style.fontSize = '1.1rem';
  overlay.innerText = 'Preparing PDF...';
  document.body.appendChild(overlay);

  try {
    // Wait a brief moment for layout/rendering to settle
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Wait for images inside clone to load to avoid missing assets in PDF
    const imgs = Array.from(clone.querySelectorAll('img'));
    await Promise.all(imgs.map(img => new Promise(res => {
      if (img.complete && img.naturalWidth !== 0) return res();
      img.addEventListener('load', res);
      img.addEventListener('error', res);
    })));

    const canvasScale = 2; // High resolution capture
    const canvas = await html2canvas(clone, {
      scale: canvasScale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 800,
      height: actualHeight,
      windowWidth: 800,
      windowHeight: actualHeight,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0
    });

    // Standard A4 dimensions: 210mm x 297mm
    const a4PxHeight = 1131.42857;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    pdf.setProperties({
      title: filename.replace(/\.pdf$/i, ''),
      creator: 'LED — Learning Experience Delivery',
      subject: 'Resume'
    });

    // If actualHeight is within standard single-page resume range (up to 1450px),
    // scale to fit EXCLUSIVELY onto 1 Single A4 page (210mm x 297mm) perfectly!
    if (actualHeight <= 1450) {
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    } else {
      // Multi-page logic for genuinely multi-page documents (>1450px)
      const totalPages = Math.ceil(actualHeight / a4PxHeight);
      const sliceHeightPx = Math.round(a4PxHeight * canvasScale);
      const canvasWidth = canvas.width;
      const totalCanvasHeight = canvas.height;

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage('a4', 'portrait');
        }

        const sourceY = page * sliceHeightPx;
        const currentSliceHeight = Math.min(sliceHeightPx, totalCanvasHeight - sourceY);

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = sliceHeightPx;
        const ctx = pageCanvas.getContext('2d');

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvasWidth, sliceHeightPx);

        if (currentSliceHeight > 0) {
          ctx.drawImage(
            canvas,
            0, sourceY, canvasWidth, currentSliceHeight,
            0, 0, canvasWidth, currentSliceHeight
          );
        }

        const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);
        pdf.addImage(pageImgData, 'JPEG', 0, 0, 210, 297);
      }
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Failed to generate PDF:', error);
  } finally {
    // Clean up clone and overlay
    if (document.body.contains(clone)) {
      document.body.removeChild(clone);
    }
    if (document.body.contains(overlay)) {
      document.body.removeChild(overlay);
    }
  }
};

