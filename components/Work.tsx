"use client";

import Image from "next/image";
import { company } from "@/data/company";
import Reveal, { RevealItem } from "./Reveal";
import TiltCard from "./TiltCard";

/* Fotos disponibles del taller. El resto queda con tratamiento tipográfico
   hasta que lleguen las fotografías reales de cada trabajo. */
const photos: Record<string, string> = {
  "02": "/images/hero/hero-main.jpg",
  "05": "/images/about/about-main.jpg",
};

export default function Work() {
  return (
    <section
      id="trabajos"
      className="plate plate-veil relative overflow-hidden py-24 text-white sm:py-28 lg:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-14 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="heading-hard text-4xl sm:text-5xl lg:text-6xl">
            Trabajos <em className="text-brinell-yellow">realizados</em>
          </h2>
          <p className="font-mono text-xs text-white/35">
            Antofagasta · La Chimba
          </p>
        </Reveal>

        <Reveal stagger={0.09} amount={0.15} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {company.services.map((service) => {
            const photo = photos[service.number];
            return (
              <RevealItem key={service.number} className="group">
                <TiltCard className="relative flex aspect-[4/3] flex-col justify-end overflow-hidden border border-white/10 bg-[#0b0e14]/85 p-6 hover:border-brinell-yellow">
                  {photo ? (
                    <>
                      <Image
                        src={photo}
                        alt={service.short}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070a10] via-[#070a10]/45 to-transparent" />
                    </>
                  ) : (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-4 -top-6 select-none text-[9rem] font-bold leading-none tracking-[-0.06em] text-white/[0.04] transition-colors duration-500 group-hover:text-white/[0.08]"
                    >
                      {service.number}
                    </span>
                  )}

                  <div className="relative">
                    <span className="font-mono text-xs text-brinell-yellow">
                      {service.number}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.02em]">
                      {service.short}
                    </h3>
                    <span className="mt-3 block h-px w-10 bg-brinell-yellow transition-all duration-500 group-hover:w-20" />
                  </div>
                </TiltCard>
              </RevealItem>
            );
          })}
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <p className="font-mono text-xs text-white/30">
            Fotografías de referencia del taller. Galería por completar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
