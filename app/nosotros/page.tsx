import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PageTransition from "@/components/PageTransition";
import About from "@/components/About";
import Facts from "@/components/Facts";
import Clients from "@/components/Clients";
import CtaBand from "@/components/CtaBand";
import Reveal, { RevealItem } from "@/components/Reveal";
import JsonLd, { breadcrumbLd } from "@/components/JsonLd";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description: `Brinell SpA es una maestranza metalmecánica de Antofagasta fundada el ${company.founded}, con un equipo que suma más de 20 años en el rubro. Misión, visión y forma de trabajo.`,
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Quiénes somos · Maestranza Brinell, Antofagasta",
    description:
      "Maestranza metalmecánica de Antofagasta. Quiénes somos y cómo trabajamos.",
    url: "/nosotros",
  },
};

/** Las cuatro etapas por las que pasa cualquier trabajo que entra al taller. */
const etapas = [
  {
    n: "01",
    title: "Diagnóstico",
    text: "Vemos la pieza o vamos a terreno. Medimos el desgaste real antes de prometer nada: a veces el problema no es el que se pensaba.",
  },
  {
    n: "02",
    title: "Propuesta y plazo",
    text: "Cotizamos con el alcance claro, qué se repone y qué se recupera, y con un plazo que incluye todas las etapas, no sólo la primera.",
  },
  {
    n: "03",
    title: "Ejecución en taller",
    text: "El trabajo se hace en la planta de La Chimba. Las seis líneas están en el mismo lugar, así que la pieza no sale a dar vueltas.",
  },
  {
    n: "04",
    title: "Verificación y entrega",
    text: "Se comprueba contra la medida o el plano antes de devolverla. Si algo quedó fuera de tolerancia, no sale del taller.",
  },
];

export default function NosotrosPage() {
  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbLd([
          { label: "Inicio", href: "/" },
          { label: "Nosotros", href: "/nosotros" },
        ])}
      />

      <PageHeader
        eyebrow={`Maestranza metalmecánica · Antofagasta · desde ${company.founded}`}
        title="Quiénes"
        accent="somos"
        lead="Una maestranza chica en tamaño y larga en oficio: el equipo venía trabajando el metal mucho antes de que existiera la empresa."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Nosotros" }]}
      />

      <Facts />
      <About />

      {/* CÓMO TRABAJAMOS */}
      <section className="bg-[#f5f6f8] py-20 text-[#151a24] lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-14 max-w-3xl">
            <h2 className="heading-hard text-3xl sm:text-4xl lg:text-5xl">
              Cómo <em className="text-brinell-blue">trabajamos</em>
            </h2>
            <p className="mt-5 text-base leading-7 text-[#687386]">
              Todo trabajo que entra a la planta pasa por las mismas cuatro
              etapas, sea una pieza suelta o una estructura completa.
            </p>
          </Reveal>

          <Reveal
            stagger={0.1}
            amount={0.1}
            className="grid gap-px bg-[#dfe3e9] sm:grid-cols-2 lg:grid-cols-4"
          >
            {etapas.map((etapa) => (
              <RevealItem
                key={etapa.n}
                className="group relative bg-white p-7 transition-colors duration-500 hover:bg-[#151a24] hover:text-white sm:p-8"
              >
                <span className="font-mono text-xs font-semibold text-brinell-blue transition-colors group-hover:text-brinell-yellow">
                  {etapa.n}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.025em]">
                  {etapa.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#687386] transition-colors group-hover:text-white/60">
                  {etapa.text}
                </p>
                <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-brinell-yellow transition-all duration-500 group-hover:w-full" />
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <Clients />
      <CtaBand />
    </PageTransition>
  );
}
