"use client";

import { useEffect, useRef } from "react";

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hot: boolean;
};

/** Chispas que brotan donde pasa el cursor. */
export default function HeroSparks() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const parts: P[] = [];
    let px = -1;
    let py = -1;
    let moved = false;

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;

      const speed = moved ? Math.hypot(x - px, y - py) : 0;
      px = x;
      py = y;
      moved = true;

      const n = Math.min(10, 1 + Math.round(speed / 7));
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 0.6 + Math.random() * 4.5;
        parts.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s - 1.2,
          life: 0,
          maxLife: 350 + Math.random() * 650,
          size: 0.7 + Math.random() * 1.9,
          hot: Math.random() > 0.4,
        });
      }
      if (parts.length > 600) parts.splice(0, parts.length - 600);
    };

    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(now - last, 48);
      last = now;

      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life += dt;
        if (p.life > p.maxLife) {
          parts.splice(i, 1);
          continue;
        }
        p.vy += 0.028 * dt;
        p.vx *= 0.982;
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);

        const t = 1 - p.life / p.maxLife;

        ctx.globalAlpha = t * 0.4;
        ctx.strokeStyle = p.hot ? "#ffd56b" : "#e8891c";
        ctx.lineWidth = p.size * t;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 2.6, p.y - p.vy * 2.6);
        ctx.stroke();

        ctx.globalAlpha = t;
        ctx.fillStyle = p.hot ? "#fffaec" : "#ffb45a";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * t, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] hidden h-full w-full lg:block"
    />
  );
}
