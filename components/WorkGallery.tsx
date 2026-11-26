"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Work } from "@/data/works";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Galería de trabajos.
 *
 * Va en columnas de mampostería en lugar de una grilla: las fotos vienen
 * unas apaisadas y otras verticales, y forzarlas a un mismo recuadro
 * obligaría a recortar justo la pieza que se quiere mostrar. Así cada una
 * conserva su proporción.
 */
export default function WorkGallery({ items }: { items: Work[] }) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 sm:gap-6 lg:columns-3">
      {items.map((work, i) => (
        <motion.figure
          key={work.image}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="group mb-5 break-inside-avoid sm:mb-6"
        >
          <div className="relative overflow-hidden bg-[#0b0e14]">
            <Image
              src={`/images/trabajos/${work.image}`}
              alt={work.title}
              width={work.w}
              height={work.h}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              /* Las primeras entran en pantalla de inmediato */
              loading={i < 3 ? "eager" : "lazy"}
              className="h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />

            {work.client && (
              <span className="absolute left-0 top-0 bg-brinell-yellow px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0a0d12]">
                {work.client}
              </span>
            )}

            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-brinell-yellow/50"
            />
          </div>

          <figcaption className="pt-4">
            <h3 className="text-[15px] font-semibold leading-snug tracking-[-0.015em] text-white">
              {work.title}
            </h3>
            {work.detail && (
              <p className="mt-2 text-sm leading-6 text-white/45">
                {work.detail}
              </p>
            )}
            <span className="mt-3 block h-px w-10 bg-brinell-yellow transition-all duration-500 group-hover:w-20" />
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
