import React, { useEffect, useRef } from 'react';

/**
 * EmbeddedThemeBackground - Quantum Matrix Grid & Ambient Light Orbs
 * Renders an executive perspective matrix grid with floating ambient light blooms
 * and pulsing micro-nodes that enhance visual depth without cluttering content.
 */
const EmbeddedThemeBackground = ({
  gridSpacing = 64,
  opacity = 0.85
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for subtle light lens flare response
    const mouse = {
      x: width / 2,
      y: height / 3,
      targetX: width / 2,
      targetY: height / 3
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initOrbs();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Floating Ambient Light Orbs
    class Orb {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 180 + 120;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.alpha = Math.random() * 0.08 + 0.04;
        this.colorType = Math.random() > 0.5 ? 'primary' : 'amber';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -this.radius || this.x > width + this.radius) this.vx *= -1;
        if (this.y < -this.radius || this.y > height + this.radius) this.vy *= -1;
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );

        const primaryHex = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#EA580C';

        if (this.colorType === 'primary') {
          gradient.addColorStop(0, `rgba(99, 102, 241, ${this.alpha * 1.5})`);
          gradient.addColorStop(0.5, `rgba(199, 210, 254, ${this.alpha * 0.6})`);
          gradient.addColorStop(1, 'rgba(248, 250, 255, 0)');
        } else {
          gradient.addColorStop(0, `rgba(139, 92, 246, ${this.alpha * 1.2})`);
          gradient.addColorStop(0.6, `rgba(99, 102, 241, ${this.alpha * 0.4})`);
          gradient.addColorStop(1, 'rgba(248, 250, 255, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let orbs = [];
    const initOrbs = () => {
      orbs = [];
      const count = Math.max(3, Math.min(6, Math.floor(width / 320)));
      for (let i = 0; i < count; i++) {
        orbs.push(new Orb());
      }
    };

    initOrbs();

    let time = 0;

    const render = () => {
      time += 0.02;

      // Smooth mouse spring movement for subtle lens flare
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Floating Light Orbs
      for (let i = 0; i < orbs.length; i++) {
        orbs[i].update();
        orbs[i].draw();
      }

      // Primary color or fallback
      const primaryHex = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#EA580C';

      // 2. Draw Quantum Matrix Perspective Grid Lines
      const cols = Math.ceil(width / gridSpacing) + 2;
      const rows = Math.ceil(height / gridSpacing) + 2;

      ctx.lineWidth = 0.8;

      // Vertical Grid Lines with sine wave breathing alpha
      for (let c = 0; c < cols; c++) {
        const x = c * gridSpacing;
        const lineAlpha = (Math.sin(x * 0.005 + time) * 0.02) + 0.035;

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.strokeStyle = primaryHex;
        ctx.globalAlpha = Math.max(0.01, lineAlpha);
        ctx.stroke();
      }

      // Horizontal Grid Lines
      for (let r = 0; r < rows; r++) {
        const y = r * gridSpacing;
        const lineAlpha = (Math.cos(y * 0.005 + time) * 0.02) + 0.035;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = primaryHex;
        ctx.globalAlpha = Math.max(0.01, lineAlpha);
        ctx.stroke();
      }

      // 3. Draw Micro Light Nodes at Grid Intersections
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const gx = c * gridSpacing;
          const gy = r * gridSpacing;

          const dx = mouse.x - gx;
          const dy = mouse.y - gy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const pulse = Math.sin(time * 2 + r * 0.5 + c * 0.5) * 0.5 + 0.5;
          let nodeRadius = 1.4 + pulse * 0.6;
          let nodeAlpha = 0.12 + pulse * 0.12;

          // Proximity brightness boost near cursor
          if (dist < 180) {
            const prox = (1 - dist / 180);
            nodeRadius += prox * 1.5;
            nodeAlpha += prox * 0.35;
          }

          ctx.beginPath();
          ctx.arc(gx, gy, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = primaryHex;
          ctx.globalAlpha = Math.min(0.65, nodeAlpha);
          ctx.fill();
        }
      }

      // 4. Subtle Cursor Light Flare Halo
      const cursorGrad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 200
      );
      cursorGrad.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
      cursorGrad.addColorStop(1, 'rgba(248, 250, 255, 0)');
      ctx.fillStyle = cursorGrad;
      ctx.globalAlpha = 1.0;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [gridSpacing]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity
      }}
    />
  );
};

export default EmbeddedThemeBackground;
