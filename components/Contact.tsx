"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { company, googleMapsUrl } from "@/data/company";
import ContactForm from "./ContactForm";

// MapLibre usa WebGL y window: solo cliente
const ContactMap = dynamic(() => import("./ContactMap"), { ssr: false });

const info = [
  {
    icon: MapPin,
    label: "Dirección",
    lines: [company.address.street, `${company.address.city}, ${company.address.country}`],
    href: googleMapsUrl,
  },
  {
    icon: Phone,
    label: "Teléfono",
    lines: [company.phone],
    href: `tel:${company.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: "Correo",
    lines: [company.emails.maestranza, company.emails.administracion],
    href: `mailto:${company.emails.maestranza}`,
  },
  {
    icon: Clock,
    label: "Horario",
    lines: [company.hours],
  },
];

export default function Contact() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-[#f5f6f8] py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* CABECERA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-brinell-blue">
              Contacto
            </p>

            <h2 className="text-4xl font-bold leading-[0.95] tracking-[-0.045em] text-[#151a24] sm:text-5xl lg:text-6xl">
              Hablemos de
              <br />
              <span className="text-brinell-blue">tu próximo proyecto.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#687386] lg:pb-1 lg:text-right">
            Cuéntanos qué necesitas fabricar, reparar o mecanizar. Respondemos
            cotizaciones en menos de 24 horas hábiles.
          </p>
        </motion.div>

        {/* MAPA 3D */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative h-[420px] overflow-hidden border border-[#dfe3e9] bg-[#e9ecf1] sm:h-[520px]"
        >
          <ContactMap />

          {/* TARJETA SOBRE EL MAPA */}
          <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-sm">
            <div className="pointer-events-auto border border-white/10 bg-[#0b1019]/90 p-6 text-white backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-brinell-yellow" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brinell-yellow">
                  Sector La Chimba · Antofagasta
                </span>
              </div>

              <p className="text-lg font-semibold tracking-[-0.02em]">
                {company.address.street}
              </p>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
              >
                Cómo llegar
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </motion.div>

        {/* INFO + FORMULARIO */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="grid gap-px border border-[#dfe3e9] bg-[#dfe3e9] sm:grid-cols-2 lg:grid-cols-1"
          >
            {info.map((item) => {
              const Icon = item.icon;
              const Wrapper = item.href ? "a" : "div";
              return (
                <Wrapper
                  key={item.label}
                  {...(item.href
                    ? {
                        href: item.href,
                        target: item.href.startsWith("http") ? "_blank" : undefined,
                        rel: item.href.startsWith("http") ? "noopener noreferrer" : undefined,
                      }
                    : {})}
                  className="group relative flex gap-5 bg-white p-6 transition-colors duration-300 hover:bg-[#fafbfc]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#e2e6ec] bg-[#f5f6f8] text-brinell-blue transition-all duration-300 group-hover:border-brinell-blue group-hover:bg-brinell-blue group-hover:text-white">
                    <Icon size={18} strokeWidth={1.6} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9aa3b2]">
                      {item.label}
                    </p>
                    {item.lines.map((line) => (
                      <p
                        key={line}
                        className="mt-1 truncate text-sm font-medium text-[#151a24]"
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-brinell-blue transition-all duration-500 group-hover:w-full" />
                </Wrapper>
              );
            })}
          </motion.div>

          {/* FORMULARIO */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="border border-[#dfe3e9] bg-white p-7 sm:p-10"
          >
            <div className="mb-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brinell-blue">
                Solicitar cotización
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[#151a24]">
                Completa el formulario
              </h3>
            </div>

            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
