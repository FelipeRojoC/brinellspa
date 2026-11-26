import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PageTransition from "@/components/PageTransition";
import ServicesGrid from "@/components/ServicesGrid";
import CtaBand from "@/components/CtaBand";
import JsonLd, { breadcrumbLd } from "@/components/JsonLd";
import Clients from "@/components/Clients";

export const metadata: Metadata = {
  title: "Servicios de maestranza en Antofagasta",
  description:
    "Las seis líneas de trabajo de Brinell SpA: diseño de herramientas, mecanizado CNC, recuperación de componentes hidráulicos, balanceo dinámico, estructuras metálicas y ensamble por interferencia.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios · Maestranza Brinell, Antofagasta",
    description:
      "Seis líneas de trabajo para la minería e industria del norte de Chile.",
    url: "/servicios",
  },
};

export default function ServiciosPage() {
  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbLd([
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
        ])}
      />

      <PageHeader
        eyebrow="Qué hacemos"
        title="Servicios de"
        accent="maestranza"
        lead="Seis líneas de trabajo que cubren el ciclo completo de una pieza industrial: diseñarla, fabricarla, recuperarla cuando se desgasta y montarla de vuelta en el equipo."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
      />

      <section className="bg-[#f5f6f8] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ServicesGrid />

          <div className="mt-20 grid gap-10 border-t border-[#dfe3e9] pt-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <h2 className="heading-hard text-3xl text-[#151a24] sm:text-4xl">
              Un solo taller para{" "}
              <em className="text-brinell-blue">todo el trabajo</em>
            </h2>
            <div className="space-y-5 text-base leading-7 text-[#687386]">
              <p>
                Un componente que falla rara vez necesita una sola cosa. Un
                cilindro hidráulico que llega con el vástago rayado puede
                además tener el alojamiento fuera de medida y la estructura que
                lo sostiene trizada. Resolverlo en tres proveedores distintos
                significa tres cotizaciones, tres plazos y tres traslados.
              </p>
              <p>
                Brinell trabaja las seis líneas en la misma planta de La
                Chimba, en Antofagasta. La pieza entra una vez y sale resuelta,
                y el plazo que te damos es el plazo completo, no el de una
                etapa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Clients />
      <CtaBand />
    </PageTransition>
  );
}
