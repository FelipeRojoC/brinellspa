"use client";

import { useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/data/company";

export function prefillContact(servicio: string, mensaje: string) {
  window.dispatchEvent(
    new CustomEvent("brinell:prefill", { detail: { servicio, mensaje } }),
  );
  const target = document.querySelector<HTMLElement>("#contacto form");
  if (!target) return;
  if (window.__lenis) window.__lenis.scrollTo(target, { offset: -140, duration: 1.6 });
  else target.scrollIntoView({ behavior: "smooth", block: "center" });
}

export default function Capabilities() {
  const [hovered, setHovered] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 300, damping: 30, mass: 0.3 });
  const y = useSpring(my, { stiffness: 300, damping: 30, mass: 0.3 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section
      id="capacidades"
      onMouseMove={onMove}
      className="relative overflow-hidden bg-[#070a10] py-24 text-white sm:py-28 lg:py-32"
    >
      {/* Etiqueta que sigue al cursor */}
      <motion.div
        style={{ x, y }}
        className={`pointer-events-none absolute left-0 top-0 z-20 hidden -translate-y-1/2 items-center gap-2 bg-brinell-yellow px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#070a10] transition-opacity duration-200 lg:flex ${
          hovered === null ? "opacity-0" : "opacity-100"
        }`}
      >
        Cotizar <ArrowUpRight size={14} />
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-lg font-medium text-white/50">
            Lo que sale del taller
          </h2>
          <p className="font-mono text-xs text-white/35">
            {company.capabilities.length} líneas · clic para cotizar
          </p>
        </div>

        <ul className="border-t border-white/10">
          {company.capabilities.map((c, i) => (
            <motion.li
              key={c.item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <button
                type="button"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() =>
                  prefillContact(c.service, `Necesito cotizar: ${c.item.toLowerCase()}.`)
                }
                className="group flex w-full items-center gap-6 border-b border-white/10 py-5 text-left transition-colors duration-300 sm:py-6 lg:cursor-none"
              >
                <span className="w-8 shrink-0 font-mono text-xs text-white/30 transition-colors group-hover:text-brinell-yellow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`flex-1 text-3xl font-bold tracking-[-0.03em] transition-all duration-300 sm:text-5xl lg:text-6xl ${
                    hovered !== null && hovered !== i
                      ? "text-white/25"
                      : "text-white"
                  } group-hover:translate-x-3 group-hover:text-brinell-yellow`}
                >
                  {c.item}
                </span>
                <span className="hidden shrink-0 text-xs text-white/35 transition-colors group-hover:text-white/70 sm:block">
                  {c.service}
                </span>
                <ArrowUpRight
                  size={22}
                  className="shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brinell-yellow lg:hidden"
                />
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
