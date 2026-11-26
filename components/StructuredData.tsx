import { company, openingHours, siteUrl } from "@/data/company";

/**
 * Datos estructurados para Google. Permiten que la ficha de búsqueda
 * muestre dirección, teléfono y servicios, y alimentan el resultado
 * local junto con el perfil de empresa.
 */
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#empresa`,
    name: company.name,
    alternateName: "Brinell Maestranza Metalmecánica",
    description:
      "Maestranza metalmecánica en Antofagasta: ingeniería y diseño de herramientas, mecanizado CNC, recuperación de componentes hidráulicos, balanceo dinámico, estructuras y ensamble por interferencia.",
    url: siteUrl,
    telephone: company.phone.replace(/\s/g, ""),
    email: company.emails.maestranza,
    foundingDate: String(company.founded),
    image: `${siteUrl}/images/logo/brinell-logo.png`,
    logo: `${siteUrl}/images/logo/brinell-logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: "Antofagasta",
      addressCountry: "CL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.address.lat,
      longitude: company.address.lng,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Región de Antofagasta",
    },
    // Sólo se publica cuando Brinell confirme el horario
    ...(openingHours.length > 0 ? { openingHours } : {}),
    knowsAbout: company.services.map((s) => s.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: company.services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
