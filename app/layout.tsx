import type { Metadata, Viewport } from "next";
import { Archivo, Barlow, IBM_Plex_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import WeldIntro from "@/components/WeldIntro";
import { company } from "@/data/company";
import "./globals.css";

/* Archivo para titulares: grotesca ancha y pesada, de señalética industrial. */
const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

/* Barlow para texto: grotesca algo cuadrada, de origen técnico. */
const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${company.name} · Maestranza Metalmecánica en Antofagasta`,
  description:
    "Ingeniería, fabricación, mecanizado, reparación de estructuras, arenado y pintura industrial para la minería e industria del norte de Chile.",
  keywords: [
    "maestranza",
    "metalmecánica",
    "Antofagasta",
    "mecanizado",
    "fabricación de estructuras",
    "arenado",
    "granallado",
    "pintura industrial",
    "minería",
  ],
  openGraph: {
    title: `${company.name} · Maestranza Metalmecánica`,
    description: "Precisión que mueve la industria. Antofagasta, Chile.",
    locale: "es_CL",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1019",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${barlow.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <WeldIntro />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
