import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PageTransition from "@/components/PageTransition";
import Contact from "@/components/Contact";
import JsonLd, { breadcrumbLd } from "@/components/JsonLd";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Contacto y cotizaciones",
  description: `Cotiza un trabajo de maestranza en Antofagasta. Teléfono ${company.phone}, correo ${company.emails.maestranza}, planta en ${company.address.street}.`,
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto · Maestranza Brinell, Antofagasta",
    description:
      "Cuéntanos qué necesitas fabricar, mecanizar o recuperar y te respondemos a la brevedad.",
    url: "/contacto",
  },
};

export default function ContactoPage() {
  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbLd([
          { label: "Inicio", href: "/" },
          { label: "Contacto", href: "/contacto" },
        ])}
      />

      <PageHeader
        eyebrow="Cotizaciones"
        title="Hablemos de tu"
        accent="próximo proyecto"
        lead="Cuéntanos qué hay que fabricar, mecanizar o recuperar. Si tienes el plano, mándalo; si tienes sólo una foto de la pieza, con eso partimos igual."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
      />

      {/* El mapa, el formulario y los datos directos: los mismos de la
          portada, sin repetir el titular que ya puso la cabecera. */}
      <Contact withHeading={false} />
    </PageTransition>
  );
}
