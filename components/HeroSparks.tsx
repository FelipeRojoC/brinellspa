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

const MAX_PARTS = 260;

/** Chispas que brotan donde pasa el cursor. Se detienen fuera de pantalla. */
export default function HeroSparks() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;

    // Ni en táctil, ni con movimiento reducido, ni en equipos modestos
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ((navigator.hardwareConcurrency ?? 8) <= 4) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const parts: P[] = [];
    let px = -1;
    let py = -1;
    let moved = false;
    let pending: { x: number; y: number } | null = null;

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      pending = { x, y };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Sólo dibuja mientras el hero está a la vista y la pestaña está activa
    let visible = true;
    let running = false;
    let raf = 0;
    let last = 0;

    const emit = () => {
      if (!pending) return;
      const { x, y } = pending;
      pending = null;
      const speed = moved ? Math.hypot(x - px, y - py) : 0;
      px = x;
      py = y;
      moved = true;
      if (parts.length >= MAX_PARTS) return;

      const n = Math.min(6, 1 + Math.round(speed / 10));
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 0.6 + Math.random() * 4.5;
        parts.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s - 1.2,
          life: 0,
          maxLife: 350 + Math.random() * 600,
          size: 0.7 + Math.random() * 1.9,
          hot: Math.random() > 0.4,
        });
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(now - last, 48);
      last = now;
      emit();

      ctx.clearRect(0, 0, w, h);
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

      // Sin partículas ni cursor pendiente no hay nada que dibujar: duerme
      if (parts.length === 0 && !pending) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, w, h);
    };

    const wake = () => start();
    window.addEventListener("mousemove", wake, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) {
          parts.length = 0;
          stop();
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", wake);
      document.removeEventListener("visibilitychange", onVisibility);
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
