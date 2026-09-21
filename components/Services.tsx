"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  Boxes,
  Ruler,
  Shapes,
  SprayCan,
} from "lucide-react";
import { useState } from "react";

const services = [
  {
    number: "01",
    title: "Ingeniería y diseño",
    subtitle: "Herramientas especiales",
    description:
      "Diseñamos soluciones personalizadas para responder a requerimientos específicos de la industria, apoyándonos en nuestra experiencia técnica y conocimiento del rubro.",
    icon: Shapes,
  },
  {
    number: "02",
    title: "Metrología y fabricación",
    subtitle: "Procesos de mecanizado",
    description:
      "Fabricamos elementos roscados, pernos especiales y componentes a medida, además de realizar recuperación de roscas y extracción de pernos cortados.",
    icon: Ruler,
  },
  {
    number: "03",
    title: "Fabricación y reparación",
    subtitle: "Estructuras metálicas",
    description:
      "Fabricamos y reparamos componentes estructurales según los requerimientos de cada proyecto, incluyendo plataformas, soportes, jaulas, bases y estructuras de izaje.",
    icon: Boxes,
  },
  {
    number: "04",
    title: "Arenado y granallado",
    subtitle: "Pintura industrial",
    description:
      "Complementamos nuestros trabajos con preparación superficial y pintura industrial para estructuras fabricadas o reparadas.",
    icon: SprayCan,
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);

  const active = services[activeService];
  const ActiveIcon = active.icon;

  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-[#f5f6f8] py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 flex items-baseline justify-between gap-6">
          <h2 className="text-lg font-medium text-[#687386]">Servicios</h2>
          <p className="font-mono text-xs text-[#9aa3b2]">04 líneas de trabajo</p>
        </div>

        {/* CONTENIDO */}
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* LISTA DE SERVICIOS */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="border-t border-[#dfe3e9]"
          >
            {services.map((service, index) => {
              const isActive = activeService === index;

              return (
                <button
                  key={service.number}
                  type="button"
                  onMouseEnter={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                  onClick={() => setActiveService(index)}
                  className={`
                    group relative flex w-full items-center gap-5
                    border-b border-[#dfe3e9]
                    px-2 py-7 text-left
                    transition-all duration-300
                    sm:py-8
                    ${
                      isActive
                        ? "bg-white px-5 shadow-[0_12px_35px_rgba(20,30,45,0.06)]"
                        : "hover:bg-white/60"
                    }
                  `}
                >
                  {/* NÚMERO */}
                  <span
                    className={`
                      min-w-[32px] text-xs font-semibold tracking-[0.15em]
                      transition-colors duration-300
                      ${
                        isActive
                          ? "text-brinell-blue"
                          : "text-[#a3aab5]"
                      }
                    `}
                  >
                    {service.number}
                  </span>

                  {/* TEXTO */}
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`
                        text-lg font-semibold tracking-[-0.02em]
                        transition-colors duration-300 sm:text-xl
                        ${
                          isActive
                            ? "text-[#151a24]"
                            : "text-[#596273]"
                        }
                      `}
                    >
                      {service.title}
                    </h3>

                    <p
                      className={`
                        mt-1 text-xs uppercase tracking-[0.16em]
                        transition-colors duration-300
                        ${
                          isActive
                            ? "text-brinell-blue"
                            : "text-[#9aa3b2]"
                        }
                      `}
                    >
                      {service.subtitle}
                    </p>
                  </div>

                  {/* FLECHA */}
                  <div
                    className={`
                      flex h-10 w-10 shrink-0 items-center justify-center
                      rounded-full border
                      transition-all duration-300
                      ${
                        isActive
                          ? "border-brinell-blue bg-brinell-blue text-white"
                          : "border-[#dfe3e9] text-[#9aa3b2]"
                      }
                    `}
                  >
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>

                  {/* INDICADOR */}
                  <span
                    className={`
                      absolute left-0 top-0 h-full w-[3px]
                      bg-brinell-blue
                      transition-transform duration-300
                      ${
                        isActive
                          ? "scale-y-100"
                          : "scale-y-0"
                      }
                    `}
                  />
                </button>
              );
            })}
          </motion.div>

          {/* PANEL VISUAL */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative min-h-[470px] overflow-hidden bg-[#0b1019]"
          >
            {/* DECORACIÓN TÉCNICA */}
            <div
              className="absolute inset-0 opacity-[0.055]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #ffffff 1px, transparent 1px),
                  linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                `,
                backgroundSize: "65px 65px",
              }}
            />

            {/* BRILLO */}
            <motion.div
              key={active.number}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute -right-24 -top-24 h-[350px] w-[350px] rounded-full bg-brinell-blue/20 blur-[100px]"
            />

            <div className="relative z-10 flex h-full min-h-[470px] flex-col justify-between p-8 sm:p-10 lg:p-12">
              {/* SUPERIOR */}
              <div className="flex items-start justify-between">
                <motion.div
                  key={`number-${active.number}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-mono text-sm text-brinell-yellow"
                >
                  {active.subtitle}
                </motion.div>

                <motion.div
                  key={`icon-${active.number}`}
                  initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.45 }}
                  className="flex h-14 w-14 items-center justify-center border border-white/15 bg-white/[0.04] text-brinell-blue"
                >
                  <ActiveIcon size={25} strokeWidth={1.4} />
                </motion.div>
              </div>

              {/* CENTRO */}
              <div className="max-w-2xl">
                <motion.div
                  key={`title-${active.number}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  <h3 className="text-3xl font-bold leading-[1] tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    {active.title}
                  </h3>

                  <p className="mt-7 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                    {active.description}
                  </p>
                </motion.div>
              </div>

              {/* INFERIOR */}
              <div className="flex items-end justify-between gap-6 border-t border-white/10 pt-6">
                <div>
                  <span className="font-mono text-xs text-white/30">
                    {active.number} / 04
                  </span>
                </div>

                <div className="flex gap-1.5">
                  {services.map((service, index) => (
                    <span
                      key={service.number}
                      className={`
                        h-1.5 transition-all duration-300
                        ${
                          activeService === index
                            ? "w-8 bg-brinell-blue"
                            : "w-3 bg-white/20"
                        }
                      `}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}