"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hot: boolean;
};

const WELD_MS = 2200;
const COOL_MS = 700;

/** En equipos modestos la soldadura lanza menos chispas. */
let lowPower = false;

export default function WeldIntro() {
  const [phase, setPhase] = useState<"weld" | "fly" | "done">(() => {
    if (typeof window === "undefined") return "weld";
    lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "done"
      : "weld";
  });
  const [progress, setProgress] = useState(0);
  const [flyTo, setFlyTo] = useState<{ x: number; y: number; scale: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const sparks = useRef<Spark[]>([]);

  // Bloquea el scroll mientras dura la intro
  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  // Soldadura: barre el logo de izquierda a derecha lanzando chispas
  useEffect(() => {
    if (phase !== "weld") return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();
    let raf = 0;

    const spawn = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 20;
        sparks.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          life: 0,
          maxLife: 500 + Math.random() * 900,
          size: 1.4 + Math.random() * 3.4,
          hot: Math.random() > 0.3,
        });
      }
    };

    let last = start;
    const frame = (now: number) => {
      const dt = Math.min(now - last, 48);
      last = now;
      const elapsed = now - start;
      const p = Math.min(elapsed / WELD_MS, 1);
      setProgress(p);

      const box = logoRef.current?.getBoundingClientRect();
      if (box && p < 1) {
        const wobble = Math.sin(elapsed / 55) * box.height * 0.1;
        spawn(box.left + box.width * p, box.top + box.height / 2 + wobble, lowPower ? 5 : 11);
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = "lighter";

      if (box && p < 1) {
        const px = box.left + box.width * p;
        const py = box.top + box.height / 2;
        const flicker = 0.75 + Math.random() * 0.25;
        const pool = ctx.createRadialGradient(px, py, 0, px, py, 110 * flicker);
        pool.addColorStop(0, "rgba(255,255,255,0.95)");
        pool.addColorStop(0.18, "rgba(190,220,255,0.55)");
        pool.addColorStop(0.5, "rgba(255,190,80,0.22)");
        pool.addColorStop(1, "rgba(255,150,30,0)");
        ctx.fillStyle = pool;
        ctx.beginPath();
        ctx.arc(px, py, 110 * flicker, 0, Math.PI * 2);
        ctx.fill();
      }

      sparks.current = sparks.current.filter((s) => {
        s.life += dt;
        if (s.life > s.maxLife) return false;
        s.vy += 0.035 * dt; // gravedad
        s.vx *= 0.985;
        s.x += s.vx * (dt / 16);
        s.y += s.vy * (dt / 16);

        const t = 1 - s.life / s.maxLife;

        // estela
        ctx.globalAlpha = t * 0.55;
        ctx.strokeStyle = s.hot ? "#ffd56b" : "#e8891c";
        ctx.lineWidth = s.size * t;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 3.2, s.y - s.vy * 3.2);
        ctx.stroke();

        // núcleo
        ctx.globalAlpha = t;
        ctx.fillStyle = s.hot ? "#fffdf2" : "#ffc266";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * t, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      if (p >= 1 && sparks.current.length === 0) {
        setPhase("fly");
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [phase]);

  // Vuelo: el logo viaja hasta su lugar en la navbar
  useEffect(() => {
    if (phase !== "fly") return;

    const from = logoRef.current?.getBoundingClientRect();
    const to = document
      .querySelector<HTMLElement>("[data-navbar-logo]")
      ?.getBoundingClientRect();

    if (from && to) {
      setFlyTo({
        x: to.left + to.width / 2 - (from.left + from.width / 2),
        y: to.top + to.height / 2 - (from.top + from.height / 2),
        scale: to.width / from.width,
      });
    }

    const t = setTimeout(() => setPhase("done"), 1100);
    return () => clearTimeout(t);
  }, [phase]);

  const welded = progress >= 1;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050709]"
        >
          {/* Resplandor del arco */}
          <motion.div
            aria-hidden
            animate={{ opacity: welded ? 0 : [0.35, 0.75, 0.4] }}
            transition={
              welded
                ? { duration: COOL_MS / 1000 }
                : { duration: 0.12, repeat: Infinity, repeatType: "mirror" }
            }
            className="pointer-events-none absolute h-[620px] w-[620px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(158,197,255,0.3), transparent)",
            }}
          />

          <div ref={logoRef} className="relative w-[min(78vw,520px)]">
            {/* Contorno apagado: guía la soldadura y desaparece al terminar */}
            <motion.div
              aria-hidden
              animate={{ opacity: welded ? 0 : 0.07 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src="/images/logo/brinell-logo.png"
                alt=""
                width={640}
                height={232}
                priority
                className="h-auto w-full brightness-0 invert"
              />
            </motion.div>

            {/* Logo que se revela a medida que avanza la soldadura */}
            <motion.div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)` }}
              animate={{
                filter: welded
                  ? "brightness(1) saturate(1)"
                  : "brightness(2.4) saturate(1.6)",
              }}
              transition={{ duration: COOL_MS / 1000, ease: "easeOut" }}
            >
              <motion.div
                animate={flyTo ? { x: flyTo.x, y: flyTo.y, scale: flyTo.scale } : {}}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              >
                <Image
                  src="/images/logo/brinell-logo.png"
                  alt="Brinell Maestranza Metalmecánica"
                  width={640}
                  height={232}
                  priority
                  className="h-auto w-full"
                />
              </motion.div>
            </motion.div>

            {/* Punto de arco */}
            {!welded && (
              <motion.span
                aria-hidden
                animate={{ opacity: [1, 0.55, 1], scale: [1, 1.35, 1] }}
                transition={{ duration: 0.09, repeat: Infinity }}
                className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_30px_14px_rgba(158,197,255,0.85),0_0_70px_30px_rgba(240, 204, 66,0.45)]"
                style={{ left: `${progress * 100}%` }}
              />
            )}
          </div>

          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 h-full w-full"
          />

          {/* Omitir */}
          {!welded && (
            <button
              type="button"
              onClick={() => setPhase("done")}
              className="absolute bottom-8 right-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-white"
            >
              Omitir
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
