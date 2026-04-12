import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const BackgroundEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Floating particles
    const particles: Particle[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 3 + 1,
    }));

    const draw = () => {
      time += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = theme === "dark";

      // Slow gradient orbs
      const orbs = [
        { x: canvas.width * 0.25 + Math.sin(time) * 100, y: canvas.height * 0.35 + Math.cos(time * 0.7) * 60, r: 350 },
        { x: canvas.width * 0.75 + Math.cos(time * 0.6) * 120, y: canvas.height * 0.65 + Math.sin(time * 0.5) * 80, r: 280 },
      ];

      const orbAlpha = isDark ? 0.08 : 0.06;
      orbs.forEach((orb) => {
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        const color = isDark ? "255,255,255" : "0,0,0";
        grad.addColorStop(0, `rgba(${color}, ${orbAlpha})`);
        grad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Floating dots
      const dotColor = isDark ? "255,255,255" : "0,0,0";
      const dotAlpha = isDark ? 0.18 : 0.12;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${dotAlpha})`;
        ctx.fill();
      });

      // Subtle connection lines between nearby particles
      const lineAlpha = isDark ? 0.08 : 0.05;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${dotColor}, ${lineAlpha * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
};

export default BackgroundEffect;
