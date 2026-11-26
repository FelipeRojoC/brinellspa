import type { MetadataRoute } from "next";
import { company } from "@/data/company";

/**
 * Datos de la aplicación web: el nombre y el color que usa el celular si
 * alguien guarda el sitio en su pantalla de inicio.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.name} · Maestranza metalmecánica`,
    short_name: "Brinell",
    description:
      "Maestranza metalmecánica en Antofagasta: mecanizado, recuperación de componentes y estructuras.",
    start_url: "/",
    display: "standalone",
    background_color: "#070a10",
    theme_color: "#0b1019",
    lang: "es-CL",
    icons: [
      { src: "/icon.png", sizes: "any", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
