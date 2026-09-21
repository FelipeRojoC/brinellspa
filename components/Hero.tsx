"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowUpRight, MousePointer2 } from "lucide-react";
import { motion } from "motion/react";

// Escena WebGL solo en cliente (three.js no se renderiza en servidor)
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

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

      {/* GRID TÉCNICO */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "90px 90px",
          maskImage: "radial-gradient(ellipse at 70% 50%, black 30%, transparent 75%)",
        }}
      />

      {/* ESCENA 3D — piezas mecanizadas flotando con parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.3 }}
        className="absolute inset-0 opacity-55 lg:opacity-100"
      >
        <HeroScene />
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-32 lg:px-8">
        <div className="max-w-4xl">

          {/* EYEBROW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-7 flex items-center gap-3 font-mono text-sm text-brinell-yellow"
          >
            Maestranza metalmecánica
            <span className="text-white/40">/ Antofagasta / desde 2020</span>
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

      {/* INDICADOR DE SCROLL */}
      <motion.a
        href="#nosotros"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-6 z-10 hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-white lg:left-8 lg:flex"
      >
        <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-brinell-yellow"
          />
        </span>
        Desliza para explorar
      </motion.a>

      {/* HINT 3D */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-[3.1rem] right-32 z-10 hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 lg:flex"
      >
        <MousePointer2 size={13} />
        Mueve el cursor
      </motion.div>
    </section>
  );
}