import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
  shape: 'heart' | 'circle' | 'strip';
}

interface ConfettiCanvasProps {
  active: boolean;
  intensity?: 'subtle' | 'celebration';
}

export const ConfettiCanvas: React.FC<ConfettiCanvasProps> = ({ active, intensity = 'subtle' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      '#f43f5e', // rose-500
      '#fb7185', // rose-400
      '#ec4899', // pink-500
      '#f472b6', // pink-400
      '#fda4af', // rose-300
      '#fbcfe8', // pink-200
      '#fbbf24', // amber-400 gold
      '#ffffff', // white
      '#c084fc', // purple-400
    ];

    const particles: Particle[] = [];

    const spawnParticle = (forceBurst = false) => {
      const isCelebration = intensity === 'celebration' || forceBurst;
      const isHeart = Math.random() > 0.4;
      const shape = isHeart ? 'heart' : Math.random() > 0.5 ? 'circle' : 'strip';

      if (isCelebration) {
        // Explode from center or bottom
        const startX = forceBurst ? width / 2 : Math.random() * width;
        const startY = forceBurst ? height * 0.55 : Math.random() * height * 0.3;
        const angle = Math.random() * Math.PI * 2;
        const speed = forceBurst ? Math.random() * 12 + 6 : Math.random() * 4 + 2;

        particles.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (forceBurst ? 4 : 0),
          size: Math.random() * 14 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          alpha: 1,
          shape,
        });
      } else {
        // Gentle ambient floating hearts upward
        particles.push({
          x: Math.random() * width,
          y: height + 20,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -(Math.random() * 1.5 + 0.8),
          size: Math.random() * 10 + 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          alpha: Math.random() * 0.6 + 0.3,
          shape: 'heart',
        });
      }
    };

    // If celebration just started, burst 80 particles
    if (intensity === 'celebration') {
      for (let i = 0; i < 90; i++) {
        spawnParticle(true);
      }
    }

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.save();
      c.translate(x, y);
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.2);
      c.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Keep ambient count steady
      const targetCount = intensity === 'celebration' ? 120 : 25;
      if (particles.length < targetCount && active) {
        spawnParticle();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (intensity === 'celebration') {
          p.vy += 0.15; // gravity
          p.vx *= 0.985;
          p.alpha -= 0.005;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        if (p.shape === 'heart') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          drawHeart(ctx, 0, 0, p.size);
        } else if (p.shape === 'strip') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Removal condition
        if (
          p.alpha <= 0 ||
          p.y < -50 ||
          (intensity === 'celebration' && p.y > height + 50)
        ) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full"
    />
  );
};
