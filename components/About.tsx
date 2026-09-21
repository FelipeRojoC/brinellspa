"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { company } from "@/data/company";

const sheet = [
  { k: "Empresa", v: company.name },
  { k: "Rubro", v: "Maestranza metalmecánica" },
  { k: "Fundación", v: String(company.founded) },
  { k: "Equipo", v: "Profesionales y técnicos con más de 20 años en el rubro" },
  { k: "Planta", v: `${company.address.street}, ${company.address.city}` },
  { k: "Clientes", v: company.clients.join(" · ") },
];

export default function About() {
  const bandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="nosotros" className="relative bg-white text-[#151a24]">
      {/* Declaración editorial */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-8 lg:py-36">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="max-w-5xl text-3xl font-light leading-[1.3] tracking-[-0.03em] sm:text-4xl lg:text-[3.4rem] lg:leading-[1.2]"
        >
          Brinell es una maestranza metalmecánica de{" "}
          <em className="not-italic font-semibold text-brinell-blue">Antofagasta</em>.
          Nació el {company.founded} con un equipo de profesionales y técnicos
          que suma{" "}
          <em className="not-italic font-semibold text-brinell-blue">
            más de 20 años en el rubro
          </em>
          , y hoy fabrica, mecaniza y repara para la industria minera del norte
          de Chile.
        </motion.p>

        {/* Cajetín de plano */}
        <motion.dl
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-16 grid border-l border-t border-[#151a24] font-mono text-sm sm:grid-cols-2 lg:mt-24 lg:grid-cols-3"
        >
          {sheet.map((row, i) => (
            <div
              key={row.k}
              className="group relative border-b border-r border-[#151a24] p-5 transition-colors duration-300 hover:bg-[#151a24] hover:text-white"
            >
              <dt className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#687386] group-hover:text-brinell-yellow">
                {row.k}
                <span>{String(i + 1).padStart(2, "0")}</span>
              </dt>
              <dd className="mt-3 text-[15px] leading-6">{row.v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Banda misión / visión con foto parallax */}
      <div ref={bandRef} className="relative overflow-hidden bg-[#0b1019] text-white">
        <motion.div style={{ y }} className="absolute inset-[-15%_0]">
          <Image
            src="/images/about/about-main.jpg"
            alt="Taller Brinell"
            fill
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#0b1019]/85" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-32">
          <motion.blockquote
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-xs text-brinell-yellow">Misión</span>
            <p className="mt-5 text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl">
              {company.mission}
            </p>
          </motion.blockquote>

          <motion.blockquote
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:border-l lg:border-white/15 lg:pl-20"
          >
            <span className="font-mono text-xs text-brinell-yellow">Visión</span>
            <p className="mt-5 text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl">
              {company.vision}
            </p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
