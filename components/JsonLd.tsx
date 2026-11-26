import { siteUrl } from "@/data/company";

/** Inserta un bloque de datos estructurados en la página. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Miga de pan para el buscador. Es lo que convierte la línea
 * "brinell.cl › servicios › balanceo-dinamico" del resultado de Google en
 * "Inicio › Servicios › Balanceo dinámico".
 */
export function breadcrumbLd(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    })),
  };
}
