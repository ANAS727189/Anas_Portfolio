"use client";

import React, { useEffect, useRef } from "react";

const COLORS = [
  "rgba(127,119,221,", // purple
  "rgba(93,202,165,", // teal
  "rgba(55,138,221,", // blue
  "rgba(216,90,48,", // coral
];

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  col: string;
  alpha: number;
}

interface ConstellationProps {
  nodeCount?: number;
  maxDist?: number;
}

export default function Constellation({
  nodeCount = 120,
  maxDist = 0.22,
}: ConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const nodes = useRef<Node[]>([]);
  const rafId = useRef<number>(0);
  const t = useRef(0);

  useEffect(() => {
    nodes.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00028,
      vy: (Math.random() - 0.5) * 0.00028,
      r: Math.random() * 1.8 + 0.8,
      col: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.45 + 0.25,
    }));

    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = (e.clientY - rect.top) / rect.height;
    };
    canvas.parentElement?.addEventListener("mousemove", onMouseMove);

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      t.current += 0.004;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      nodes.current.forEach((n) => {
        n.x += n.vx + Math.sin(t.current + n.y * 9) * 0.00007;
        n.y += n.vy + Math.cos(t.current + n.x * 9) * 0.00007;
        if (n.x < 0) n.x = 1;
        if (n.x > 1) n.x = 0;
        if (n.y < 0) n.y = 1;
        if (n.y > 1) n.y = 0;

        const dx = n.x - mouse.current.x;
        const dy = n.y - mouse.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 0.12) {
          n.x += dx * 0.006;
          n.y += dy * 0.006;
        }
      });

      for (let i = 0; i < nodes.current.length; i++) {
        for (let j = i + 1; j < nodes.current.length; j++) {
          const a = nodes.current[i];
          const b = nodes.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.3;
            ctx.beginPath();
            ctx.moveTo(a.x * W, a.y * H);
            ctx.lineTo(b.x * W, b.y * H);
            ctx.strokeStyle = a.col + opacity + ")";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.current.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x * W, n.y * H, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.col + n.alpha + ")";
        ctx.fill();
      });

      const cx = W / 2;
      const cy = H / 2;
      const pulse = 0.5 + Math.sin(t.current * 1.4) * 0.08;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.42 * pulse);
      grad.addColorStop(0, "rgba(83,74,183,0.14)");
      grad.addColorStop(0.5, "rgba(29,158,117,0.05)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      rafId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("mousemove", onMouseMove);
    };
  }, [maxDist, nodeCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 0 }}
    />
  );
}