import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/data/company";
import { servicePages } from "@/data/services-pages";
import Reveal, { RevealItem } from "./Reveal";
import ServiceBlueprint from "./ServiceBlueprint";

/**
 * Las seis puertas de entrada. Cada tarjeta es el enlace a la página del
 * servicio: es lo que recorre el buscador para descubrirlas y lo que usa
 * el visitante para llegar a la que le sirve.
 */
export default function ServicesGrid({
  /** Oculta un servicio de la grilla, para no repetirlo en su propia página. */
  exclude,
}: { exclude?: string } = {}) {
  const items = servicePages
    .filter((page) => page.number !== exclude)
    .map((page) => ({
      page,
      service: company.services.find((s) => s.number === page.number)!,
    }));

  return (
    <Reveal
      stagger={0.08}
      amount={0.1}
      className="grid gap-px bg-[#dfe3e9] sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map(({ page, service }) => (
        <RevealItem key={page.slug} className="group bg-[#f5f6f8]">
          <Link
            href={`/servicios/${page.slug}`}
            transitionTypes={["nav-forward"]}
            className="relative flex h-full flex-col justify-between gap-8 p-7 transition-colors duration-500 hover:bg-white sm:p-8"
          >
            {/* Plano técnico tenue de fondo, sólo decorativo */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.06] transition-opacity duration-700 group-hover:opacity-[0.13]"
            >
              <ServiceBlueprint number={service.number} />
            </div>

            <div className="relative">
              <span className="font-mono text-xs font-semibold text-brinell-blue">
                {service.number}
              </span>
              <h2 className="mt-5 text-xl font-semibold leading-snug tracking-[-0.025em] text-[#151a24]">
                {service.short}
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#687386]">
                {service.description}
              </p>
            </div>

            <span className="relative flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#151a24]">
              Ver el servicio
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="absolute -bottom-2 left-0 h-[2px] w-10 bg-brinell-yellow transition-all duration-500 group-hover:w-24" />
            </span>
          </Link>
        </RevealItem>
      ))}
    </Reveal>
  );
}
