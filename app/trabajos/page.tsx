import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/data/company";
import { servicePages, slugOf } from "@/data/services-pages";
import { works, worksOf } from "@/data/works";
import PageHeader from "@/components/PageHeader";
import PageTransition from "@/components/PageTransition";
import WorkGallery from "@/components/WorkGallery";
import CtaBand from "@/components/CtaBand";
import Reveal, { RevealItem } from "@/components/Reveal";
import JsonLd, { breadcrumbLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Trabajos realizados",
  description:
    "Piezas, componentes y estructuras fabricados, mecanizados y recuperados en el taller de Brinell SpA en La Chimba, Antofagasta. Cilindros hidráulicos, bujes, cabezales de perforadora, bases de traslado y análisis de ingeniería.",
  alternates: { canonical: "/trabajos" },
  openGraph: {
    title: "Trabajos realizados · Maestranza Brinell",
    description:
      "Lo que sale del taller de La Chimba: piezas mecanizadas, componentes recuperados y estructura.",
    url: "/trabajos",
  },
};

/** Las líneas que hoy tienen fotografías, en el orden de los servicios. */
const conFotos = company.services.filter((s) => worksOf(s.number).length > 0);
const sinFotos = company.services.filter((s) => worksOf(s.number).length === 0);

export default function TrabajosPage() {
  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbLd([
          { label: "Inicio", href: "/" },
          { label: "Trabajos", href: "/trabajos" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "Trabajos realizados · Brinell SpA",
          numberOfItems: works.length,
        }}
      />

      <PageHeader
        eyebrow="El taller"
        title="Trabajos"
        accent="realizados"
        lead="Lo que entra y sale de la planta de La Chimba: piezas fabricadas desde plano, componentes recuperados que vuelven a faena y estructura hecha a medida."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Trabajos" }]}
      />

      {/* GALERÍA POR LÍNEA DE TRABAJO */}
      <div className="bg-[#070a10] text-white">
        {conFotos.map((service, i) => (
          <section
            key={service.number}
            className={i > 0 ? "border-t border-white/[0.07]" : ""}
          >
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
              <Reveal className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
                <div>
                  <span className="font-mono text-xs font-semibold text-brinell-yellow">
                    {service.number}
                  </span>
                  <h2 className="heading-hard mt-3 max-w-2xl text-[clamp(1.6rem,5vw,2.75rem)]">
                    {service.short}
                  </h2>
                </div>

                <Link
                  href={`/servicios/${slugOf(service.number)}`}
                  transitionTypes={["nav-forward"]}
                  className="group inline-flex shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-brinell-yellow sm:pb-2"
                >
                  Ver el servicio
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </Reveal>

              <WorkGallery items={worksOf(service.number)} />
            </div>
          </section>
        ))}
      </div>

      {/* LÍNEAS QUE AÚN NO TIENEN FOTOGRAFÍAS */}
      {sinFotos.length > 0 && (
        <section className="border-t border-white/[0.07] bg-[#070a10] text-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
            <Reveal className="mb-8">
              <h2 className="heading-hard text-[clamp(1.5rem,4.5vw,2.25rem)]">
                También hacemos
              </h2>
            </Reveal>

            <Reveal
              stagger={0.1}
              amount={0.2}
              className="grid gap-px bg-white/[0.07] sm:grid-cols-2"
            >
              {sinFotos.map((service) => (
                <RevealItem key={service.number} className="bg-[#070a10]">
                  <Link
                    href={`/servicios/${slugOf(service.number)}`}
                    transitionTypes={["nav-forward"]}
                    className="group flex h-full flex-col justify-between gap-6 p-7 transition-colors duration-500 hover:bg-white/[0.03] sm:p-8"
                  >
                    <div>
                      <span className="font-mono text-xs font-semibold text-brinell-yellow">
                        {service.number}
                      </span>
                      <h3 className="mt-4 text-lg font-semibold leading-snug tracking-[-0.025em]">
                        {service.short}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-white/45">
                        {service.description}
                      </p>
                    </div>
                    <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55 transition-colors group-hover:text-brinell-yellow">
                      Ver el servicio
                      <ArrowUpRight size={14} />
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* PIEZAS TÍPICAS: sirve al visitante y le da a Google el vocabulario
          concreto con que la gente busca este tipo de trabajo. */}
      <section className="bg-white py-18 text-[#151a24] sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-12 max-w-3xl lg:mb-14">
            <h2 className="heading-hard text-[clamp(1.75rem,5.5vw,3rem)]">
              Piezas que salen de{" "}
              <em className="text-brinell-blue">este taller</em>
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-[#687386] sm:text-base">
              Si lo que necesitas está en esta lista, es trabajo habitual. Si no
              está, igual conviene preguntar: buena parte de lo que hacemos
              llega como un problema, no como un plano.
            </p>
          </Reveal>

          <Reveal
            stagger={0.08}
            amount={0.1}
            className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-12"
          >
            {servicePages.map((page) => {
              const service = company.services.find(
                (s) => s.number === page.number,
              )!;
              return (
                <RevealItem key={page.slug}>
                  <p className="font-mono text-xs font-semibold text-brinell-blue">
                    {service.number}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em]">
                    {service.short}
                  </h3>
                  <ul className="mt-5 space-y-3 border-t border-[#e2e6ec] pt-5">
                    {page.aplicaciones.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-6 text-[#687386]"
                      >
                        <span
                          aria-hidden
                          className="mt-2.5 h-1 w-1 shrink-0 bg-brinell-yellow"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              );
            })}
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="¿Tienes una pieza que resolver?"
        lead="Mándanos una foto y las medidas que tengas. Con eso partimos."
      />
    </PageTransition>
  );
}
