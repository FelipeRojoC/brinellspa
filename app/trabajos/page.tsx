import type { Metadata } from "next";
import { company } from "@/data/company";
import { servicePages } from "@/data/services-pages";
import PageHeader from "@/components/PageHeader";
import PageTransition from "@/components/PageTransition";
import Work from "@/components/Work";
import CtaBand from "@/components/CtaBand";
import Reveal, { RevealItem } from "@/components/Reveal";
import JsonLd, { breadcrumbLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Trabajos realizados",
  description:
    "Piezas y componentes fabricados, mecanizados y recuperados en el taller de Brinell SpA en La Chimba, Antofagasta.",
  alternates: { canonical: "/trabajos" },
  openGraph: {
    title: "Trabajos realizados · Maestranza Brinell",
    description:
      "Lo que sale del taller de La Chimba: piezas mecanizadas, componentes recuperados y estructura.",
    url: "/trabajos",
  },
};

/*
 * TODO cliente: cuando lleguen las fotografías de los trabajos, esta página
 * pasa a ser una galería. Las fotos van en public/images/trabajos/ y se
 * enganchan en el mapa `photos` de components/Work.tsx. Mientras tanto la
 * página se sostiene en los planos técnicos y en el listado de piezas, que
 * es información real y útil para quien busca.
 */

export default function TrabajosPage() {
  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbLd([
          { label: "Inicio", href: "/" },
          { label: "Trabajos", href: "/trabajos" },
        ])}
      />

      <PageHeader
        eyebrow="El taller"
        title="Trabajos"
        accent="realizados"
        lead="Lo que entra y sale de la planta de La Chimba: piezas fabricadas desde plano, componentes recuperados que vuelven a faena y estructura hecha a medida."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Trabajos" }]}
      />

      <Work withHeading={false} withTopStrip={false} showDescription />

      {/* PIEZAS TÍPICAS: sirve al visitante y le da a Google el vocabulario
          concreto con que la gente busca este tipo de trabajo. */}
      <section className="bg-white py-20 text-[#151a24] lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-14 max-w-3xl">
            <h2 className="heading-hard text-3xl sm:text-4xl lg:text-5xl">
              Piezas que salen de{" "}
              <em className="text-brinell-blue">este taller</em>
            </h2>
            <p className="mt-5 text-base leading-7 text-[#687386]">
              Si lo que necesitas está en esta lista, es trabajo habitual. Si no
              está, igual conviene preguntar: buena parte de lo que hacemos
              llega como un problema, no como un plano.
            </p>
          </Reveal>

          <Reveal
            stagger={0.08}
            amount={0.1}
            className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
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
