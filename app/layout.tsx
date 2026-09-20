import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { company } from "@/data/company";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
