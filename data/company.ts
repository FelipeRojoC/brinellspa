/**
 * Datos de la empresa (fuente: brinell.cl).
 * Cualquier cambio de teléfono, correo o dirección se hace solo aquí.
 */
export const company = {
  name: "Brinell SpA",
  tagline: "Maestranza metalmecánica",
  founded: 2020,

  address: {
    street: "MZ 61, Sitio N° 2, Sector La Chimba",
    city: "Antofagasta",
    country: "Chile",
    /** Coordenadas aproximadas del sector industrial La Chimba. Ajustar si es necesario. */
    lat: -23.5562,
    lng: -70.3878,
  },

  phone: "+56 9 4570 3762",
  /** Solo dígitos, formato internacional, para wa.me (número que ya usaba el botón flotante) */
  whatsapp: "56988077712",

  emails: {
    maestranza: "maestranza@brinell.cl",
    administracion: "administracion@brinell.cl",
  },

  hours: "Lunes a viernes · 08:30 – 18:00",

  mission:
    "Ser para nuestros clientes un verdadero aliado estratégico, dando la confianza necesaria y el respaldo adecuado en cada proyecto realizado.",
  vision:
    "Posicionarnos como una de las maestranzas metalmecánicas más competentes de la Segunda Región, creciendo en capital humano y nuevas tecnologías.",

  clients: ["United", "GR", "Elecmetal", "DyR", "Servisab"],
} as const;

export const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${company.address.lat},${company.address.lng}`;
