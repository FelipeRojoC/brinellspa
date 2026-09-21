"use client";

import dynamic from "next/dynamic";
import { useRef, type MouseEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { company, googleMapsUrl } from "@/data/company";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const ContactMap = dynamic(() => import("./ContactMap"), { ssr: false });

export default function Contact() {
  const spotRef = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    spotRef.current?.style.setProperty("--mx", `${e.clientX - r.left}px`);
    spotRef.current?.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="contacto"
      onMouseMove={onMove}
      className="relative overflow-hidden bg-[#070a10] text-white"
    >
      {/* Fondo: grilla técnica + foco que sigue el cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 100%)",
        }}
      />
      <div
        ref={spotRef}
        aria-hidden
        className="section-spot pointer-events-none absolute inset-0 transition-opacity duration-700"
      />
      <div className="pointer-events-none absolute -right-40 top-40 h-[600px] w-[600px] rounded-full bg-brinell-yellow/[0.05] blur-[160px]" />

      {/* CABECERA */}
      <div className="relative mx-auto max-w-7xl px-6 pt-24 sm:pt-28 lg:px-8 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-brinell-yellow">
              Contacto
            </p>
            <h2 className="text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
              Hablemos de
              <br />
              <span className="text-brinell-blue">tu próximo proyecto.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-white/40 lg:pb-1 lg:text-right">
            Cuéntanos qué necesitas fabricar, mecanizar o reparar y te
            contactamos a la brevedad.
          </p>
        </motion.div>
      </div>

      {/* MAPA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="relative h-[420px] overflow-hidden border-y border-white/[0.07] sm:h-[500px]"
      >
        <ContactMap />
        <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-sm">
          <div className="pointer-events-auto border border-white/10 bg-[#0b1019]/90 p-6 backdrop-blur-xl">
            <p className="mb-3 font-mono text-xs text-brinell-yellow">
              La Chimba · Antofagasta
            </p>
            <p className="text-base font-semibold tracking-[-0.02em]">
              {company.address.street}
            </p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-white"
            >
              Cómo llegar
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </motion.div>

      {/* FORMULARIO FRASE */}
      <div className="relative mx-auto max-w-7xl px-6 pt-20 lg:px-8 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <p className="mb-8 font-mono text-xs text-brinell-yellow">
            Solicitar cotización
          </p>
          <ContactForm />
        </motion.div>
      </div>

      {/* INFO */}
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
        <p className="mb-8 font-mono text-xs text-brinell-yellow">
          Contacto directo
        </p>
        <ContactInfo />
      </div>
    </section>
  );
}
