"use client";

import { motion } from "motion/react";
import { Camera } from "lucide-react";
import { company } from "@/data/company";

export default function Work() {
  return (
    <section
      id="trabajos"
      className="relative overflow-hidden bg-[#070a10] py-24 text-white sm:py-28 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 flex items-baseline justify-between gap-6">
          <h2 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            Trabajos realizados
          </h2>
          <p className="font-mono text-xs text-white/35">Antofagasta</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {company.services.map((service, i) => (
            <motion.article
              key={service.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden border border-white/10 bg-white/[0.02] p-6 transition-colors duration-500 hover:border-brinell-yellow/40"
            >
              <div className="absolute inset-0 flex items-center justify-center text-white/[0.07] transition-colors duration-500 group-hover:text-white/15">
                <Camera size={56} strokeWidth={1} />
              </div>

              <div className="relative">
                <span className="font-mono text-xs text-brinell-yellow">
                  {service.number}
                </span>
                <h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.02em]">
                  {service.short}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 font-mono text-xs text-white/30">
          Galería pendiente de fotografías del taller.
        </p>
      </div>
    </section>
  );
}
