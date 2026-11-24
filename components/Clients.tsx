"use client";

import Image from "next/image";
import Reveal, { RevealItem } from "./Reveal";
import { company } from "@/data/company";
import TiltCard from "./TiltCard";

export default function Clients() {
  return (
    <section
      id="clientes"
      className="relative overflow-hidden bg-white py-20 text-[#151a24] sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(54,120,228,0.08), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="heading-hard text-4xl sm:text-5xl lg:text-6xl">
            Nuestros <em className="text-brinell-blue">clientes</em>
          </h2>
          <p className="max-w-sm text-sm leading-6 text-[#687386] sm:text-right">
            Minería, energía eólica y metalurgia de la Región de Antofagasta.
          </p>
        </Reveal>

        <Reveal stagger={0.08} amount={0.15} className="grid grid-cols-2 gap-px bg-[#e2e6ec] sm:grid-cols-3">
          {company.clients.map((client) => (
            <RevealItem key={client.name} className="group">
              <TiltCard
                max={5}
                className="relative flex h-36 items-center justify-center overflow-hidden bg-white px-6 [--logo-h:56px] sm:h-44 sm:px-10 sm:[--logo-h:64px]"
              >
                <Image
                src={client.logo}
                alt={client.name}
                width={320}
                height={120}
                style={{ maxHeight: `calc(var(--logo-h) * ${client.scale})` }}
                className="w-auto object-contain opacity-70 transition-opacity duration-500 group-hover:opacity-100"
              />

                <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-brinell-blue transition-all duration-500 group-hover:w-full" />
              </TiltCard>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
