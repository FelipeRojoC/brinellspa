import type { Metadata, Viewport } from "next";
import { Archivo, Barlow, IBM_Plex_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import WeldIntro from "@/components/WeldIntro";
import StructuredData from "@/components/StructuredData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { company, siteUrl } from "@/data/company";
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
  metadataBase: new URL(siteUrl),
  /**
   * Cada página pone su propio título; la plantilla le agrega la empresa.
   * Sin esto, Google muestra el mismo titular en las diez páginas y no
   * distingue cuál responde a cada búsqueda.
   */
  title: {
    default: `${company.name} · Maestranza Metalmecánica en Antofagasta`,
    template: `%s · ${company.name}`,
  },
  description:
    "Maestranza metalmecánica en Antofagasta: ingeniería y diseño de herramientas, mecanizado CNC, recuperación de componentes hidráulicos, balanceo dinámico, estructuras y ensamble por interferencia.",
  applicationName: company.name,
  authors: [{ name: company.name, url: siteUrl }],
  openGraph: {
    siteName: company.name,
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: {
    telephone: true,
    address: true,
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
        <StructuredData />
        <WeldIntro />

        <SmoothScroll>
          {/* Barra, pie y botón de WhatsApp viven en el layout: sobreviven al
              cambio de página, así que no se vuelven a montar ni parpadean. */}
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
