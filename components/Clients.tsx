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
            className="flex items-center gap-10 pr-10 text-4xl font-bold uppercase tracking-[-0.03em] text-[#151a24]/25 transition-colors duration-500 group-hover:text-[#151a24]/55 sm:text-6xl lg:text-7xl"
          >
            {name}
            <span className="h-2 w-2 rotate-45 bg-brinell-blue/50" />
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
            className="flex items-center gap-10 pr-10 text-4xl font-bold uppercase tracking-[-0.03em] text-[#151a24]/25 transition-colors duration-500 group-hover:text-[#151a24]/55 sm:text-6xl lg:text-7xl"
          >
            {name}
            <span className="h-2 w-2 rotate-45 bg-brinell-blue/50" />
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
      className="relative overflow-hidden bg-white py-16 text-[#151a24] sm:py-20"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brinell-blue/[0.07] blur-[160px]" />

      <div className="mx-auto mb-12 max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <h2 className="text-lg font-medium text-[#687386]">Confían en Brinell</h2>
          <p className="font-mono text-xs text-[#9aa3b2]">{clients.length} clientes</p>
        </motion.div>
      </div>

      {/* MARQUEE */}
      <div className="relative flex flex-col gap-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent sm:w-40" />

        <MarqueeRow duration={30} />
        <MarqueeRow reverse duration={36} />
      </div>
    </section>
  );
}
