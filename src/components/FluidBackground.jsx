import React, { useEffect, useRef, useCallback } from 'react';

const FluidBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const mousePositionRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const profilePicCenterRef = useRef(null);
  const prefersReducedMotionRef = useRef(false);

  const getCssVariable = (varName, fallback) => {
    if (typeof window !== 'undefined') {
      const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      return value || fallback;
    }
    return fallback;
  };

  const parseColor = (colorString) => {
    if (colorString.startsWith('#')) {
      const hex = colorString.substring(1);
      const bigint = parseInt(hex, 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    }
    const match = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (match) {
      return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
    }
    return { r: 0, g: 0, b: 0 }; 
  };
  
  const blobColorsRef = useRef([]);
  const globalAlphaRef = useRef(0.22);

  const updateColorsAndAlphaFromCSS = useCallback(() => {
    blobColorsRef.current = [
      parseColor(getCssVariable('--c1', '#ff6bf7')),
      parseColor(getCssVariable('--c2', '#38b6ff')),
      parseColor(getCssVariable('--c3', '#ff9f43')),
      parseColor(getCssVariable('--c4', '#7dffb3')),
    ];
    globalAlphaRef.current = parseFloat(getCssVariable('--alpha-base', '0.22'));
  }, []);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    updateColorsAndAlphaFromCSS();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    const canvasOffset = { x: 0, y: 0 };

    class Blob {
      constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.baseRadius = radius;
        this.radius = radius;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      update() {
        if (profilePicCenterRef.current) {
          const dxToPic = profilePicCenterRef.current.x - this.x;
          const dyToPic = profilePicCenterRef.current.y - this.y;
          const distToPic = Math.sqrt(dxToPic * dxToPic + dyToPic * dyToPic);

          const attractionForce = 0.008; 
          this.vx += (dxToPic / (distToPic + 0.1)) * attractionForce * (this.baseRadius / 100) ; 
          this.vy += (dyToPic / (distToPic + 0.1)) * attractionForce * (this.baseRadius / 100);

          const maxDistFromPic = 140 + this.baseRadius * 0.5;
           if (distToPic > maxDistFromPic) {
             this.vx -= (dxToPic / distToPic) * (distToPic - maxDistFromPic) * 0.001;
             this.vy -= (dyToPic / distToPic) * (distToPic - maxDistFromPic) * 0.001;
           }
        }
        
        this.vx *= 0.98; 
        this.vy *= 0.98; 
        
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - this.radius < 0 || this.x + this.radius > width) this.vx *= -0.8;
        if (this.y - this.radius < 0 || this.y + this.radius > height) this.vy *= -0.8;

        this.x = Math.max(this.radius, Math.min(width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(height - this.radius, this.y));

        this.radius = this.baseRadius + Math.sin(Date.now() * 0.001 + this.baseRadius) * (this.baseRadius * 0.1);
      }

      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${globalAlphaRef.current})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const blobs = [];
    function initBlobs() {
      blobs.length = 0;
      const numBlobs = 4;
      const baseRadius = Math.min(width, height) / 3;
      for (let i = 0; i < numBlobs; i++) {
        blobs.push(
          new Blob(
            Math.random() * width,
            Math.random() * height,
            baseRadius * (Math.random() * 0.4 + 0.6), 
            blobColorsRef.current[i % blobColorsRef.current.length]
          )
        );
      }
    }
    initBlobs();

    const drawStaticFrame = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      blobs.forEach(blob => {
        const staticX = profilePicCenterRef.current ? profilePicCenterRef.current.x + (blob.x - profilePicCenterRef.current.x) * 0.5 : blob.x;
        const staticY = profilePicCenterRef.current ? profilePicCenterRef.current.y + (blob.y - profilePicCenterRef.current.y) * 0.5 : blob.y;
        const gradient = ctx.createRadialGradient(staticX, staticY, 0, staticX, staticY, blob.radius);
        gradient.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${globalAlphaRef.current})`);
        gradient.addColorStop(1, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(staticX, staticY, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';
    };
    

    function animate() {
      if (prefersReducedMotionRef.current) {
        if(!profilePicCenterRef.current) updateProfilePicPosition(); // ensure pic pos is known for static
        drawStaticFrame();
        return;
      }
      
      const targetCanvasOffsetX = (mousePositionRef.current.x - width / 2) * 0.05; // Max 20px drift approx
      const targetCanvasOffsetY = (mousePositionRef.current.y - height / 2) * 0.05;
      canvasOffset.x += (targetCanvasOffsetX - canvasOffset.x) * 0.1;
      canvasOffset.y += (targetCanvasOffsetY - canvasOffset.y) * 0.1;


      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(canvasOffset.x, canvasOffset.y);

      ctx.globalCompositeOperation = 'lighter';
      blobs.forEach(blob => {
        blob.update();
        blob.draw();
      });
      ctx.globalCompositeOperation = 'source-over';
      
      ctx.restore();

      animationFrameIdRef.current = requestAnimationFrame(animate);
    }

    const updateProfilePicPosition = () => {
      const picElement = document.getElementById('profilePic');
      if (picElement) {
        const rect = picElement.getBoundingClientRect();
        profilePicCenterRef.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      } else {
        profilePicCenterRef.current = null; // or some default like center of screen
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      updateProfilePicPosition();
      initBlobs(); 
      if (prefersReducedMotionRef.current) {
        drawStaticFrame();
      }
    };

    const handleMouseMove = (e) => {
      if (prefersReducedMotionRef.current) return;
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const observer = new MutationObserver(() => {
      updateProfilePicPosition();
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    updateProfilePicPosition();


    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotionChange = (event) => {
      prefersReducedMotionRef.current = event.matches;
      if (!prefersReducedMotionRef.current && !animationFrameIdRef.current) {
         animationFrameIdRef.current = requestAnimationFrame(animate);
      } else if (prefersReducedMotionRef.current && animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
        drawStaticFrame();
      }
    };
    mediaQuery.addEventListener('change', handleReducedMotionChange);


    if (prefersReducedMotionRef.current) {
      drawStaticFrame();
    } else {
      animationFrameIdRef.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
      observer.disconnect();
    };
  }, [updateColorsAndAlphaFromCSS]);

  return <canvas id="fluid-bg" ref={canvasRef} />;
};

export default FluidBackground;