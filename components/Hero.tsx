"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-[#10141c]"
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="Maestranza metalmecánica Brinell"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-[#10141c]/75" />

      {/* BLUE GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#10141c] via-[#10141c]/75 to-[#10141c]/35" />

      {/* SUBTLE BOTTOM GRADIENT */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#10141c] to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-32 lg:px-8">
        <div className="max-w-4xl">

          {/* EYEBROW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-brinell-yellow" />

            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-brinell-yellow">
              Maestranza metalmecánica
            </span>
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[5.8rem]"
          >
            Precisión que
            <br />

            <span className="text-brinell-blue">
              mueve la industria.
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl"
          >
            Soluciones de fabricación, mecanizado y reparación
            metalmecánica para proyectos industriales y mineros.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            {/* SERVICIOS */}
            <a
              href="#servicios"
              className="group inline-flex items-center justify-center gap-3 rounded-sm bg-brinell-blue px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brinell-blue-dark hover:shadow-xl hover:shadow-brinell-blue/20"
            >
              Conocer nuestros servicios

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            {/* COTIZACIÓN */}
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-3 rounded-sm border border-white/30 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/10 hover:shadow-xl hover:shadow-black/20"
            >
              Solicitar cotización

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}