"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Compass, Handshake, ShieldCheck, Target, Wrench } from "lucide-react";
import { company } from "@/data/company";

const values = [
  {
    icon: ShieldCheck,
    title: "Calidad",
    text: "Cada pieza se fabrica bajo control dimensional y estándares industriales.",
  },
  {
    icon: Wrench,
    title: "Capacidad técnica",
    text: "Profesionales y técnicos con más de 20 años en maestranza metalmecánica.",
  },
  {
    icon: Handshake,
    title: "Compromiso",
    text: "Respuesta rápida y respaldo real en cada proyecto que asumimos.",
  },
];

export default function About() {
  return (
    <section
      id="nosotros"
      className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32"
    >
      {/* Brillo decorativo */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-brinell-blue/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* COLUMNA IZQUIERDA — sticky */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-brinell-blue">
                Quiénes somos
              </p>

              <h2 className="text-4xl font-bold leading-[0.95] tracking-[-0.045em] text-[#151a24] sm:text-5xl lg:text-6xl">
                Un aliado
                <br />
                <span className="text-brinell-blue">estratégico</span>
                <br />
                para tu operación.
              </h2>

              <p className="mt-8 max-w-lg text-base leading-7 text-[#687386] sm:text-lg">
                {company.name} es una maestranza metalmecánica fundada el{" "}
                {company.founded} en Antofagasta. Nacimos con un equipo de
                profesionales y técnicos con más de dos décadas en el rubro,
                enfocados en dar soluciones concretas a la industria minera e
                industrial del norte de Chile.
              </p>
            </motion.div>

            {/* IMAGEN */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative mt-12 aspect-[4/3] overflow-hidden"
            >
              <Image
                src="/images/about/about-main.jpg"
                alt="Equipo Brinell en maestranza"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1019]/70 to-transparent" />

              <div className="absolute bottom-5 left-5 flex items-center gap-3 text-white">
                <span className="text-4xl font-bold tracking-[-0.04em]">
                  {company.founded}
                </span>
                <span className="text-[10px] font-semibold uppercase leading-tight tracking-[0.2em] text-white/60">
                  Año de
                  <br />
                  fundación
                </span>
              </div>

              <div className="absolute -right-3 -top-3 h-20 w-20 border-r-2 border-t-2 border-brinell-yellow" />
            </motion.div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="flex flex-col gap-6">
            {/* MISIÓN */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="group relative overflow-hidden bg-[#0b1019] p-8 text-white sm:p-10"
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brinell-blue/25 blur-[90px] transition-transform duration-700 group-hover:scale-125" />

              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center border border-white/15 bg-white/[0.04] text-brinell-yellow">
                  <Target size={22} strokeWidth={1.5} />
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brinell-yellow">
                  Misión
                </p>

                <p className="mt-4 text-xl font-semibold leading-snug tracking-[-0.02em] sm:text-2xl">
                  “{company.mission}”
                </p>
              </div>
            </motion.article>

            {/* VISIÓN */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="group relative overflow-hidden border border-[#e2e6ec] bg-[#f5f6f8] p-8 sm:p-10"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-[#d5dae2] bg-white text-brinell-blue">
                <Compass size={22} strokeWidth={1.5} />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brinell-blue">
                Visión
              </p>

              <p className="mt-4 text-lg leading-relaxed text-[#151a24] sm:text-xl">
                {company.vision}
              </p>
            </motion.article>

            {/* VALORES */}
            <div className="grid gap-4 sm:grid-cols-3">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group relative border border-[#e2e6ec] bg-white p-6 transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(20,30,45,0.08)]"
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-brinell-blue"
                    />
                    <h3 className="mt-5 text-base font-semibold tracking-[-0.01em] text-[#151a24]">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#687386]">
                      {v.text}
                    </p>

                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-brinell-blue transition-all duration-500 group-hover:w-full" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
