"use client";

import { motion } from "motion/react";
import { company } from "@/data/company";

const clients = [...company.clients];

function MarqueeRow({
  reverse = false,
  duration = 28,
}: {
  reverse?: boolean;
  duration?: number;
}) {
  const items = [...clients, ...clients, ...clients];

  return (
    <div className="marquee group flex overflow-hidden">
      <div
        className="marquee-track flex shrink-0 items-center"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="flex items-center gap-10 pr-10 text-4xl font-bold uppercase tracking-[-0.03em] text-white/15 transition-colors duration-500 group-hover:text-white/30 sm:text-6xl lg:text-7xl"
          >
            {name}
            <span className="h-2 w-2 rotate-45 bg-brinell-yellow/60" />
          </span>
        ))}
      </div>
      {/* Copia para el loop continuo */}
      <div
        aria-hidden
        className="marquee-track flex shrink-0 items-center"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {items.map((name, i) => (
          <span
            key={`${name}-dup-${i}`}
            className="flex items-center gap-10 pr-10 text-4xl font-bold uppercase tracking-[-0.03em] text-white/15 transition-colors duration-500 group-hover:text-white/30 sm:text-6xl lg:text-7xl"
          >
            {name}
            <span className="h-2 w-2 rotate-45 bg-brinell-yellow/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  return (
    <section
      id="clientes"
      className="relative overflow-hidden bg-[#0b1019] py-20 text-white sm:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brinell-blue/10 blur-[160px]" />

      <div className="mx-auto mb-12 max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-brinell-yellow" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brinell-yellow">
                Confían en nosotros
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-[1] tracking-[-0.04em] sm:text-4xl">
              Empresas que ya trabajan con Brinell.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/50 sm:text-right">
            Clientes de la industria minera, energética y metalmecánica de la
            Región de Antofagasta.
          </p>
        </motion.div>
      </div>

      {/* MARQUEE */}
      <div className="relative flex flex-col gap-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0b1019] to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0b1019] to-transparent sm:w-40" />

        <MarqueeRow duration={30} />
        <MarqueeRow reverse duration={36} />
      </div>
    </section>
  );
}
