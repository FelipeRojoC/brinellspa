import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PageTransition from "@/components/PageTransition";
import ServicesGrid from "@/components/ServicesGrid";
import ServiceBlueprint from "@/components/ServiceBlueprint";
import WorkGallery from "@/components/WorkGallery";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import JsonLd, { breadcrumbLd } from "@/components/JsonLd";
import { company, siteUrl } from "@/data/company";
import { getServicePage, servicePages } from "@/data/services-pages";
import { worksOf } from "@/data/works";

/** Las seis páginas se generan al compilar: salen estáticas y cargan al instante. */
export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata(
  props: PageProps<"/servicios/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const data = getServicePage(slug);
  if (!data) return {};

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.keywords,
    alternates: { canonical: `/servicios/${data.slug}` },
    openGraph: {
      title: `${data.h1} · ${company.name}`,
      description: data.metaDescription,
      url: `/servicios/${data.slug}`,
    },
  };
}

export default async function ServicioPage(
  props: PageProps<"/servicios/[slug]">,
) {
  const { slug } = await props.params;
  const data = getServicePage(slug);
  if (!data) notFound();

  /* La primera fotografía hace de portada; el resto arma la galería. */
  const trabajos = worksOf(data.service.number);
  const [portada, ...galeria] = trabajos;

  const index = servicePages.findIndex((p) => p.slug === data.slug);
  const prev = servicePages[index - 1];
  const next = servicePages[index + 1];

  const label = (n?: string) =>
    company.services.find((s) => s.number === n)?.short ?? "";

  return (
    <PageTransition>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: data.service.title,
          description: data.metaDescription,
          serviceType: data.service.short,
          url: `${siteUrl}/servicios/${data.slug}`,
          provider: { "@id": `${siteUrl}/#empresa` },
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Región de Antofagasta",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: data.service.short,
            itemListElement: data.incluye.map((item) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: item },
            })),
          },
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: data.service.short, href: `/servicios/${data.slug}` },
        ])}
      />

      <PageHeader
        eyebrow={`Servicio ${data.service.number}`}
        title={data.h1}
        lead={data.intro}
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: data.service.short },
        ]}
      />

      {/* QUÉ INCLUYE / DÓNDE SE APLICA */}
      <section className="bg-white py-20 text-[#151a24] lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <Reveal amount={0.15}>
              <h2 className="heading-hard text-3xl sm:text-4xl">
                Qué <em className="text-brinell-blue">incluye</em>
              </h2>
              <ul className="mt-9 border-t border-[#e2e6ec]">
                {data.incluye.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 border-b border-[#e2e6ec] py-5"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-brinell-blue text-white">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span className="text-base leading-7 text-[#3b4454]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal from="right" amount={0.15} className="lg:pt-4">
              {/* Si hay fotografía del trabajo, manda la fotografía. Donde
                  todavía no la hay, el plano técnico sostiene la ficha. */}
              <div className="group relative aspect-[4/3] overflow-hidden bg-[#0b1019]">
                {portada ? (
                  <Image
                    src={`/images/trabajos/${portada.image}`}
                    alt={portada.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                ) : (
                  <ServiceBlueprint number={data.service.number} />
                )}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b1019] via-[#0b1019]/70 to-transparent"
                />
                <p className="absolute bottom-0 left-0 p-6 font-mono text-[11px] uppercase tracking-[0.2em] text-brinell-yellow sm:p-7">
                  {data.service.number} · {data.service.short}
                </p>
              </div>

              <h2 className="heading-hard mt-14 text-3xl sm:text-4xl">
                Dónde se <em className="text-brinell-blue">aplica</em>
              </h2>
              <ul className="mt-8 space-y-4">
                {data.aplicaciones.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base leading-7 text-[#3b4454]"
                  >
                    <span
                      aria-hidden
                      className="mt-3 h-1.5 w-1.5 shrink-0 bg-brinell-yellow"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRABAJOS DE ESTA LÍNEA */}
      {galeria.length > 0 && (
        <section className="relative overflow-hidden bg-[#070a10] text-white">
          <div
            aria-hidden
            className="plate-strip plate-strip-top pointer-events-none absolute inset-x-0 top-0 h-24 opacity-70"
          />
          <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <Reveal className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
              <h2 className="heading-hard max-w-xl text-[clamp(1.75rem,5vw,2.75rem)]">
                Trabajos de{" "}
                <em className="text-brinell-yellow">esta línea</em>
              </h2>
              <Link
                href="/trabajos"
                transitionTypes={["nav-forward"]}
                className="group inline-flex shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-brinell-yellow sm:pb-2"
              >
                Ver todos los trabajos
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </Reveal>

            <WorkGallery items={galeria} />
          </div>
        </section>
      )}

      {/* QUÉ MANDAR PARA COTIZAR */}
      <section
        className={`relative overflow-hidden bg-[#070a10] text-white ${
          galeria.length > 0 ? "border-t border-white/[0.07]" : ""
        }`}
      >
        {galeria.length === 0 && (
          <div
            aria-hidden
            className="plate-strip plate-strip-top pointer-events-none absolute inset-x-0 top-0 h-24 opacity-70"
          />
        )}
        <div className="relative mx-auto max-w-7xl px-6 py-18 lg:px-8 lg:py-28">
          <Reveal amount={0.2} className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <h2 className="heading-hard text-3xl sm:text-4xl lg:text-5xl">
                Para cotizar,{" "}
                <em className="text-brinell-yellow">mándanos esto</em>
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-white/55">
                Con estos datos la cotización sale a la primera. Si te falta
                alguno, escríbenos igual y lo vemos: muchas veces basta una
                foto.
              </p>

              <Link
                href="/contacto"
                transitionTypes={["nav-forward"]}
                className="group mt-9 inline-flex items-center gap-3 bg-brinell-yellow px-8 py-4 text-sm font-bold uppercase tracking-[0.05em] text-[#0a0d12] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Cotizar este servicio
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <ol className="border-t border-white/10">
              {data.paraCotizar.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-5 border-b border-white/10 py-6"
                >
                  <span className="font-mono text-sm font-semibold text-brinell-yellow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base leading-7 text-white/70">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* SERVICIO ANTERIOR / SIGUIENTE */}
      <nav
        aria-label="Otros servicios"
        className="border-b border-[#e2e6ec] bg-white"
      >
        <div className="mx-auto grid max-w-7xl gap-px bg-[#e2e6ec] sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/servicios/${prev.slug}`}
              className="group flex items-center gap-4 bg-white px-6 py-8 transition-colors hover:bg-[#f5f6f8] lg:px-8"
            >
              <ArrowLeft
                size={18}
                className="shrink-0 text-brinell-blue transition-transform duration-300 group-hover:-translate-x-1"
              />
              <span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9aa3b2]">
                  Servicio {prev.number}
                </span>
                <span className="mt-1.5 block text-base font-semibold tracking-[-0.02em] text-[#151a24]">
                  {label(prev.number)}
                </span>
              </span>
            </Link>
          ) : (
            <span className="hidden bg-white sm:block" />
          )}

          {next && (
            <Link
              href={`/servicios/${next.slug}`}
              className="group flex items-center justify-end gap-4 bg-white px-6 py-8 text-right transition-colors hover:bg-[#f5f6f8] lg:px-8"
            >
              <span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9aa3b2]">
                  Servicio {next.number}
                </span>
                <span className="mt-1.5 block text-base font-semibold tracking-[-0.02em] text-[#151a24]">
                  {label(next.number)}
                </span>
              </span>
              <ArrowRight
                size={18}
                className="shrink-0 text-brinell-blue transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>
      </nav>

      {/* RESTO DE LOS SERVICIOS */}
      <section className="bg-[#f5f6f8] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-12">
            <h2 className="heading-hard text-3xl text-[#151a24] sm:text-4xl">
              Los otros <em className="text-brinell-blue">servicios</em>
            </h2>
          </Reveal>
          <ServicesGrid exclude={data.service.number} />
        </div>
      </section>

      <CtaBand
        title={`¿Necesitas ${data.service.short.toLowerCase()}?`}
        lead="Escríbenos con los datos de la pieza y te respondemos a la brevedad."
      />
    </PageTransition>
  );
}
