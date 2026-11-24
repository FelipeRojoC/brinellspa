"use client";

import Reveal, { RevealItem } from "./Reveal";
import { company } from "@/data/company";

const facts = [
  { value: String(company.founded), label: "Año de fundación" },
  { value: "+20", label: "Años de experiencia del equipo" },
  { value: "06", label: "Líneas de servicio" },
  { value: "La Chimba", label: "Antofagasta, Chile" },
];

export default function Facts() {
  return (
    <section className="relative bg-brinell-blue text-white">
      <Reveal
        stagger={0.08}
        amount={0.4}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 py-14 lg:grid-cols-4 lg:px-8 lg:py-16"
      >
        {facts.map((f) => (
          <RevealItem key={f.label}>
            <p className="text-4xl font-bold leading-none tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              {f.value}
            </p>
            <p className="mt-3 max-w-[14ch] text-sm leading-5 text-white/70">
              {f.label}
            </p>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
