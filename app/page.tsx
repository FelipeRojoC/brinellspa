import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Facts from "@/components/Facts";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Maestranza metalmecánica en Antofagasta",
  description:
    "Brinell SpA: mecanizado de precisión, recuperación de componentes hidráulicos, balanceo dinámico y estructuras metálicas para la minería e industria del norte de Chile.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Brinell SpA · Maestranza metalmecánica en Antofagasta",
    description: "Precisión que mueve la industria. Antofagasta, Chile.",
    url: "/",
  },
};

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Facts />
      <About moreHref="/nosotros" />
      <Services />
      <Work footer={{ href: "/trabajos", label: "Ver todos los trabajos" }} />
      <Clients />
      <Contact />
    </PageTransition>
  );
}
