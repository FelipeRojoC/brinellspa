"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { company } from "@/data/company";
import Reveal, { RevealItem } from "./Reveal";

const services = company.services;

/* Fotos del taller disponibles; las demás fichas usan tratamiento tipográfico. */
const panelPhoto: Record<string, string> = {
  "02": "/images/hero/hero-main.jpg",
  "05": "/images/about/about-main.jpg",
};

export default function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-[#f5f6f8] py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-14 max-w-3xl">
          <h2 className="heading-hard text-4xl text-[#151a24] sm:text-5xl lg:text-6xl">
            Nuestros <em className="text-brinell-blue">servicios</em>
          </h2>
          <p className="mt-5 text-base leading-7 text-[#687386]">
            Seis líneas de trabajo para la industria minera e industrial del
            norte de Chile.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* LISTA */}
          <Reveal stagger={0.07} amount={0.1} className="border-t border-[#dfe3e9]">
            {services.map((service, index) => {
              const isActive = active === index;
              return (
                <RevealItem key={service.number}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`group relative flex w-full items-center gap-5 border-b border-[#dfe3e9] py-6 text-left transition-all duration-300 ${
                    isActive
                      ? "bg-white px-5 shadow-[0_12px_35px_rgba(20,30,45,0.06)]"
                      : "px-2 hover:bg-white/60"
                  }`}
                >
                  <span
                    className={`min-w-[28px] text-sm font-semibold transition-colors duration-300 ${
                      isActive ? "text-brinell-blue" : "text-[#a3aab5]"
                    }`}
                  >
                    {service.number}
                  </span>

                  <h3
                    className={`min-w-0 flex-1 text-base font-semibold leading-snug tracking-[-0.02em] transition-colors duration-300 sm:text-lg ${
                      isActive ? "text-[#151a24]" : "text-[#596273]"
                    }`}
                  >
                    {service.title}
                  </h3>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isActive
                        ? "border-brinell-blue bg-brinell-blue text-white"
                        : "border-[#dfe3e9] text-[#9aa3b2]"
                    }`}
                  >
                    <ArrowUpRight size={16} />
                  </span>

                  <span
                    className={`absolute left-0 top-0 h-full w-[3px] bg-brinell-blue transition-transform duration-300 ${
                      isActive ? "scale-y-100" : "scale-y-0"
                    }`}
                  />
                </button>
                </RevealItem>
              );
            })}
          </Reveal>

          {/* PANEL */}
          <Reveal from="right" className="relative min-h-[460px] overflow-hidden bg-[#0b1019] lg:sticky lg:top-28 lg:self-start">
            {panelPhoto[current.number] && (
              <Image
                key={`photo-${current.number}`}
                src={panelPhoto[current.number]}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="animate-[fadeIn_600ms_ease-out] object-cover"
              />
            )}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-[#0b1019] via-[#0b1019]/92 to-[#0b1019]/75"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-[350px] w-[350px]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(54,120,228,0.22), transparent)",
              }}
            />

            <div className="relative flex min-h-[420px] flex-col justify-between p-8 sm:p-10 lg:p-12">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brinell-yellow">
                Servicio {current.number}
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.number}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="py-10"
                >
                  <h3 className="text-2xl font-bold leading-[1.1] tracking-[-0.035em] text-white sm:text-3xl lg:text-4xl">
                    {current.title}
                  </h3>
                  <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-end justify-between gap-6 border-t border-white/10 pt-6">
                <a
                  href="#contacto"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brinell-yellow"
                >
                  Solicitar cotización
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <div className="flex gap-1.5">
                  {services.map((s, index) => (
                    <span
                      key={s.number}
                      className={`h-1.5 transition-all duration-300 ${
                        active === index ? "w-8 bg-brinell-blue" : "w-3 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
