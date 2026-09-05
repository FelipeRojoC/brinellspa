"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  CalendarDays,
  Award,
  Factory,
  MapPin,
} from "lucide-react";

const stats = [
  {
    value: "2020",
    label: "AÑO DE FUNDACIÓN",
    description: "Una empresa joven con experiencia consolidada.",
    icon: CalendarDays,
  },
  {
    value: "+20 años",
    label: "EXPERIENCIA DEL EQUIPO",
    description: "Profesionales y técnicos con amplia trayectoria.",
    icon: Award,
  },
  {
    value: "100%",
    label: "COMPROMISO INDUSTRIAL",
    description: "Soluciones orientadas a las necesidades de cada cliente.",
    icon: Factory,
  },
  {
    value: "Antofagasta",
    label: "NUESTRA UBICACIÓN",
    description: "Operaciones desde el corazón de la industria minera.",
    icon: MapPin,
  },
];

export default function Stats() {
  return (
    <section
      id="experiencia"
      className="relative overflow-hidden bg-[#0b1019] text-white"
    >
      {/* IMAGEN DE FONDO */}
      <div className="absolute inset-0">
        <Image
          src="/images/about/about-main.jpg"
          alt="Experiencia industrial Brinell"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* OSCURECER IMAGEN */}
      <div className="absolute inset-0 bg-[#0b1019]/85" />

      {/* GRADIENTE */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1019] via-[#0b1019]/90 to-[#0b1019]/65" />

      {/* BRILLO AZUL */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-brinell-blue/10 blur-[150px]" />

      {/* GRID TÉCNICO */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "90px 90px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 lg:px-8 lg:pt-28">
        {/* CONTENIDO SUPERIOR */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
          {/* TEXTO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* MARCA DE SECCIÓN */}
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-brinell-yellow" />

              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brinell-yellow">
                Nuestra experiencia
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Experiencia que
              <br />
              <span className="text-brinell-blue">transforma</span>
              <br />
              en resultados.
            </h2>

            <p className="mt-8 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
              Combinamos experiencia técnica, capacidad de respuesta y
              compromiso para desarrollar soluciones metalmecánicas de alto
              estándar.
            </p>
          </motion.div>

          {/* IMAGEN / BLOQUE VISUAL */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative hidden h-[360px] lg:block"
          >
            <div className="absolute inset-0 overflow-hidden border border-white/10">
              <Image
                src="/images/about/about-main.jpg"
                alt="Maestranza metalmecánica Brinell"
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1019]/80 via-transparent to-transparent" />
            </div>

            {/* MARCO DECORATIVO */}
            <div className="absolute -bottom-4 -left-4 h-20 w-20 border-b-2 border-l-2 border-brinell-blue" />
            <div className="absolute -right-4 -top-4 h-20 w-20 border-r-2 border-t-2 border-brinell-yellow" />

            {/* ETIQUETAS */}
            <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
              <span className="border border-white/15 bg-[#0b1019]/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 backdrop-blur-md">
                Precisión
              </span>

              <span className="border border-white/15 bg-[#0b1019]/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 backdrop-blur-md">
                Calidad
              </span>

              <span className="border border-white/15 bg-[#0b1019]/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 backdrop-blur-md">
                Confianza
              </span>
            </div>
          </motion.div>
        </div>

        {/* MÉTRICAS */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 grid border border-white/10 bg-[#0b1019]/55 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className={`group relative p-7 sm:p-8 ${
                  index !== 3
                    ? "border-b border-white/10 lg:border-b-0 lg:border-r"
                    : ""
                } ${
                  index === 1
                    ? "sm:border-r sm:border-white/10 lg:border-r"
                    : ""
                }`}
              >
                {/* ICONO */}
                <div className="mb-8 flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] text-brinell-blue transition-all duration-300 group-hover:border-brinell-blue/50 group-hover:bg-brinell-blue/10">
                  <Icon size={19} strokeWidth={1.5} />
                </div>

                {/* NÚMERO */}
                <div className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
                  {stat.value}
                </div>

                {/* LABEL */}
                <div className="mt-3 text-[10px] font-semibold tracking-[0.18em] text-brinell-yellow">
                  {stat.label}
                </div>

                {/* DESCRIPCIÓN */}
                <p className="mt-4 text-xs leading-5 text-white/40">
                  {stat.description}
                </p>

                {/* HOVER */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brinell-blue transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* UBICACIÓN */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-3 py-7 text-[10px] uppercase tracking-[0.25em] text-white/30"
        >
          <span className="h-px w-8 bg-white/20" />
          Antofagasta · Chile
        </motion.div>
      </div>
    </section>
  );
}