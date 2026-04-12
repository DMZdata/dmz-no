import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

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

    const draw = () => {
      time += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle moving gradient orbs
      const orbs = [
        { x: canvas.width * 0.3 + Math.sin(time) * 80, y: canvas.height * 0.4 + Math.cos(time * 0.7) * 60, r: 300 },
        { x: canvas.width * 0.7 + Math.cos(time * 0.8) * 100, y: canvas.height * 0.6 + Math.sin(time * 0.5) * 70, r: 250 },
      ];

      const alpha = theme === "dark" ? 0.04 : 0.03;

      orbs.forEach((orb) => {
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        const color = theme === "dark" ? "255,255,255" : "0,0,0";
        grad.addColorStop(0, `rgba(${color}, ${alpha})`);
        grad.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default BackgroundEffect;
