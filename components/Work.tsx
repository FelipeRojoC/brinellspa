"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/data/company";
import { slugOf } from "@/data/services-pages";
import Reveal, { RevealItem } from "./Reveal";
import TiltCard from "./TiltCard";
import ServiceBlueprint from "./ServiceBlueprint";

/* Fotos disponibles del taller. El resto queda con tratamiento tipográfico
   hasta que lleguen las fotografías reales de cada trabajo. */
const photos: Record<string, string> = {
  "02": "/images/hero/hero-main.jpg",
  "05": "/images/about/about-main.jpg",
};

export default function Work({
  /** La portada abre la sección con un titular; la página propia ya tiene el suyo. */
  withHeading = true,
  /** Franja de plancha como remate superior. Sobra si arriba ya hay cabecera oscura. */
  withTopStrip = true,
  /** En la página de trabajos cada tarjeta lleva además su descripción. */
  showDescription = false,
  /** Enlace al pie de la grilla. */
  footer,
}: {
  withHeading?: boolean;
  withTopStrip?: boolean;
  showDescription?: boolean;
  footer?: { href: string; label: string };
} = {}) {
  return (
    <section id="trabajos" className="relative bg-[#070a10] text-white">
      {withTopStrip && (
        /* Franja de plancha como remate superior, sin texto encima */
        <div aria-hidden className="plate-strip plate-strip-top h-28 w-full" />
      )}

      <div
        className={`mx-auto max-w-7xl px-6 pb-24 lg:px-8 lg:pb-32 ${
          withTopStrip ? "" : "pt-20 lg:pt-24"
        }`}
      >
        {withHeading && (
          <Reveal className="mb-14 max-w-3xl">
            <h2 className="heading-hard text-4xl sm:text-5xl lg:text-6xl">
              Trabajos <em className="text-brinell-yellow">realizados</em>
            </h2>
            <p className="mt-5 text-base leading-7 text-white/55">
              Piezas y componentes fabricados, mecanizados y recuperados en
              nuestro taller de La Chimba.
            </p>
          </Reveal>
        )}

        {/* La plancha sólo asoma por las juntas entre tarjetas */}
        <Reveal
          stagger={0.09}
          amount={0.15}
          className="plate grid gap-[3px] sm:grid-cols-2 lg:grid-cols-3"
        >
          {company.services.map((service) => {
            const photo = photos[service.number];
            return (
              <RevealItem key={service.number} className="group">
                <Link
                  href={`/servicios/${slugOf(service.number)}`}
                  transitionTypes={["nav-forward"]}
                  className="block h-full"
                >
                  <TiltCard
                    className={`relative flex flex-col justify-end overflow-hidden bg-[#0b0e14] p-6 ${
                      showDescription ? "min-h-[360px]" : "aspect-[4/3]"
                    }`}
                  >
                    {photo ? (
                      <>
                        <Image
                          src={photo}
                          alt={service.short}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070a10] via-[#070a10]/55 to-transparent" />
                      </>
                    ) : (
                      <>
                        <ServiceBlueprint number={service.number} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/55 to-transparent" />
                      </>
                    )}

                    <div className="relative">
                      <h3 className="text-lg font-semibold leading-snug tracking-[-0.02em]">
                        {service.short}
                      </h3>

                      {showDescription && (
                        <p className="mt-3 text-sm leading-6 text-white/55">
                          {service.description}
                        </p>
                      )}

                      <span className="mt-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brinell-yellow opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        Ver el servicio
                        <ArrowUpRight size={13} />
                      </span>
                      <span className="mt-3 block h-px w-10 bg-brinell-yellow transition-all duration-500 group-hover:w-24" />
                    </div>
                  </TiltCard>
                </Link>
              </RevealItem>
            );
          })}
        </Reveal>

        {footer && (
          <Reveal amount={0.4} className="mt-10">
            <Link
              href={footer.href}
              transitionTypes={["nav-forward"]}
              className="group inline-flex items-center gap-3 border border-white/20 px-7 py-4 text-sm font-semibold uppercase tracking-[0.05em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-brinell-yellow hover:text-brinell-yellow"
            >
              {footer.label}
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
