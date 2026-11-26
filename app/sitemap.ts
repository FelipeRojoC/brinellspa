import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/company";
import { allRoutes } from "@/data/routes";

/**
 * El listado que Google lee para saber qué páginas existen. Se arma solo
 * desde data/routes.ts, así que una página nueva aparece aquí sin tocar
 * este archivo.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return allRoutes.map((route) => ({
    url: `${siteUrl}${route.href === "/" ? "" : route.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
