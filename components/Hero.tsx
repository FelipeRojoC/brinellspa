"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { company } from "@/data/company";

const HeroSparks = dynamic(() => import("./HeroSparks"), { ssr: false });

const facts = [
  { value: String(company.founded), label: "Año de fundación" },
  { value: "+20 años", label: "Experiencia del equipo" },
  { value: "06", label: "Líneas de servicio" },
  { value: "Antofagasta", label: "La Chimba" },
];

export default function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    photoRef.current?.style.setProperty(
      "transform",
      `scale(1.08) translate3d(${dx * -22}px, ${dy * -16}px, 0)`,
    );
  };

  return (
    <section
      id="inicio"
      onMouseMove={onMove}
      className="relative min-h-screen overflow-hidden bg-[#0a0d12]"
    >
      {/* Fotografía con paralaje */}
      <div
        ref={photoRef}
        className="absolute inset-0 transition-transform duration-[400ms] ease-out will-change-transform"
        style={{ transform: "scale(1.08)" }}
      >
        <Image
          src="/images/hero/hero-main.jpg"
          alt="Maestranza metalmecánica Brinell"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 bg-[#0a0d12]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d12] via-[#0a0d12]/80 to-[#0a0d12]/30" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0a0d12] to-transparent" />

      {/* Plancha estriada en el borde inferior, enlaza con el resto */}
      <div className="plate absolute inset-x-0 bottom-0 h-40 opacity-30 [mask-image:linear-gradient(to_top,#000,transparent)]" />

      <HeroSparks />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-28 pt-32 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-7 font-mono text-sm text-brinell-yellow"
        >
          Maestranza metalmecánica
          <span className="text-white/40"> / Antofagasta / desde {company.founded}</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading-hard max-w-5xl text-5xl text-white sm:text-6xl md:text-7xl lg:text-[5.6rem]"
        >
          Mecanizado de precisión y{" "}
          <em className="text-brinell-blue">recuperación de componentes</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-8 max-w-2xl text-lg leading-8 text-white/70"
        >
          Fabricamos, mecanizamos y recuperamos piezas críticas para la
          industria minera e industrial del norte de Chile.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#contacto"
            className="group inline-flex items-center justify-center gap-3 bg-brinell-yellow px-8 py-4 text-sm font-bold uppercase tracking-[0.05em] text-[#0a0d12] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_45px_rgba(238,205,95,0.3)]"
          >
            Solicitar cotización
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          <a
            href="#servicios"
            className="group inline-flex items-center justify-center gap-3 border border-white/25 px-8 py-4 text-sm font-bold uppercase tracking-[0.05em] text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/5"
          >
            Ver servicios
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>

        {/* Datos */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-16 grid max-w-4xl grid-cols-2 gap-px border border-white/10 bg-white/10 backdrop-blur-md sm:grid-cols-4"
        >
          {facts.map((f) => (
            <div
              key={f.label}
              className="group bg-[#0a0d12]/80 px-5 py-5 transition-colors duration-300 hover:bg-[#0a0d12]/40"
            >
              <dt className="text-xl font-bold tracking-[-0.03em] text-brinell-blue transition-colors duration-300 group-hover:text-brinell-yellow sm:text-2xl">
                {f.value}
              </dt>
              <dd className="mt-1 font-mono text-[11px] leading-4 text-white/45">
                {f.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.a
        href="#nosotros"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 font-mono text-xs text-white/35 transition-colors hover:text-white lg:right-8 lg:flex"
      >
        <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-brinell-yellow"
          />
        </span>
        Desliza
      </motion.a>
    </section>
  );
}
