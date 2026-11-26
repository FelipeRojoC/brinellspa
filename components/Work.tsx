"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/data/company";
import { slugOf } from "@/data/services-pages";
import { featuredWorks } from "@/data/works";
import Reveal, { RevealItem } from "./Reveal";
import TiltCard from "./TiltCard";

/**
 * Anticipo de los trabajos en la portada: seis fotografías reales del
 * taller, una por línea de trabajo, en la grilla apretada donde la
 * plancha sólo asoma por las juntas.
 */
export default function Work({
  footer,
}: {
  footer?: { href: string; label: string };
} = {}) {
  return (
    <section id="trabajos" className="relative bg-[#070a10] text-white">
      {/* Franja de plancha como remate superior, sin texto encima */}
      <div aria-hidden className="plate-strip plate-strip-top h-28 w-full" />

      <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-32">
        <Reveal className="mb-12 max-w-3xl lg:mb-14">
          <h2 className="heading-hard text-[clamp(2rem,7vw,3.75rem)]">
            Trabajos <em className="text-brinell-yellow">realizados</em>
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-white/55 sm:text-base">
            Piezas y componentes fabricados, mecanizados y recuperados en
            nuestro taller de La Chimba.
          </p>
        </Reveal>

        <Reveal
          stagger={0.09}
          amount={0.12}
          className="plate grid gap-[3px] sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuredWorks.map((work) => {
            const service = company.services.find(
              (s) => s.number === work.service,
            );
            return (
              <RevealItem key={work.image} className="group">
                <Link
                  href={`/servicios/${slugOf(work.service)}`}
                  transitionTypes={["nav-forward"]}
                  className="block h-full"
                >
                  <TiltCard className="relative flex aspect-[4/3] flex-col justify-end overflow-hidden bg-[#0b0e14] p-5 sm:p-6">
                    <Image
                      src={`/images/trabajos/${work.image}`}
                      alt={work.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[#070a10] via-[#070a10]/45 to-transparent"
                    />

                    <div className="relative">
                      {service && (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brinell-yellow/80">
                          {service.short}
                        </span>
                      )}
                      <h3 className="mt-1.5 text-base font-semibold leading-snug tracking-[-0.02em] sm:text-lg">
                        {work.title}
                      </h3>
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
              className="group inline-flex items-center gap-3 border border-white/20 px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.05em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-brinell-yellow hover:text-brinell-yellow sm:px-7 sm:text-sm"
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
