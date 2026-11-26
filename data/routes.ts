/**
 * Mapa de las páginas del sitio. Única fuente para el menú, el pie de
 * página y el sitemap: si se agrega una página, se agrega aquí y aparece
 * sola en los tres lugares.
 */

import { company } from "./company";
import { servicePages } from "./services-pages";

export type Route = {
  href: string;
  label: string;
  /** Prioridad en el sitemap: 1 es la portada. */
  priority: number;
};

export const mainRoutes: Route[] = [
  { href: "/", label: "Inicio", priority: 1 },
  { href: "/servicios", label: "Servicios", priority: 0.9 },
  { href: "/trabajos", label: "Trabajos", priority: 0.7 },
  { href: "/nosotros", label: "Nosotros", priority: 0.7 },
  { href: "/contacto", label: "Contacto", priority: 0.8 },
];

/** Las seis páginas de servicio, con el nombre corto para el menú. */
export const serviceRoutes: Route[] = servicePages.map((page) => ({
  href: `/servicios/${page.slug}`,
  label:
    company.services.find((s) => s.number === page.number)?.short ?? page.h1,
  priority: 0.8,
}));

/** Todas las URL indexables, para el sitemap. */
export const allRoutes: Route[] = [...mainRoutes, ...serviceRoutes];
