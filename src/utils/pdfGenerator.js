import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Captures an HTML element and downloads it as a PDF.
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

  // Create an off-screen clone of the element to avoid transform/parent scaling issues
  const clone = element.cloneNode(true);
  clone.id = 'resume-pdf-clone';
  clone.style.position = 'fixed';
  clone.style.left = '-9999px';
  clone.style.top = '0';
  const actualHeight = Math.max(1131, element.scrollHeight);
  
  clone.style.width = '800px';
  clone.style.height = `${actualHeight}px`;
  clone.style.transform = 'none';
  clone.style.transformOrigin = 'top left';
  clone.style.boxShadow = 'none';
  clone.style.zIndex = '-9999';
  
  document.body.appendChild(clone);

  // Prevent selection styles from appearing in the cloned node
  try {
    clone.style.userSelect = 'none';
    const all = clone.querySelectorAll('*');
    all.forEach((n) => { try { n.style.userSelect = 'none'; } catch (e) {} });
    const selStyle = document.createElement('style');
    selStyle.innerHTML = '::selection { background: transparent !important; color: inherit !important; }';
    clone.appendChild(selStyle);
  } catch (e) {}

  // Create a small overlay so the user sees feedback during generation
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
  overlay.innerText = 'Preparing PDF...';
  document.body.appendChild(overlay);

  try {
    // Wait a brief moment for layout/rendering to settle
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Wait for images inside clone to load to avoid missing assets in PDF
    const imgs = Array.from(clone.querySelectorAll('img'));
    await Promise.all(imgs.map(img => new Promise(res => {
      if (img.complete && img.naturalWidth !== 0) return res();
      img.addEventListener('load', res);
      img.addEventListener('error', res);
    })));

    const canvas = await html2canvas(clone, {
      scale: 2, // High resolution capture
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

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    // Create dynamically sized PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [800, actualHeight]
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, 800, actualHeight);
    pdf.save(filename);
  } catch (error) {
    console.error('Failed to generate PDF:', error);
  } finally {
    // Clean up the clone
    if (document.body.contains(clone)) {
      document.body.removeChild(clone);
    }
    if (document.body.contains(overlay)) {
      document.body.removeChild(overlay);
    }
  }
};
