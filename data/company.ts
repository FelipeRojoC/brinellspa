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

  mission:
    "Ser para nuestros clientes un verdadero aliado estratégico, dando la confianza necesaria y el respaldo adecuado en cada proyecto realizado.",
  vision:
    "Posicionarnos como una de las maestranzas metalmecánicas más competentes de la Segunda Región, creciendo en capital humano y nuevas tecnologías.",

  clients: [
    { name: "Molycop", logo: "/images/clients/molycop.png" },
    { name: "Finning", logo: "/images/clients/finning.png" },
    { name: "Vestas", logo: "/images/clients/vestas.png" },
    { name: "Nordex", logo: "/images/clients/nordex.png" },
    { name: "Elecmetal", logo: "/images/clients/elecmetal.png" },
    { name: "GR Ingeniería", logo: null },
  ],

  /** Los 6 servicios oficiales de Brinell. No modificar sin confirmación. */
  services: [
    {
      number: "01",
      title: "Ingeniería y diseño de herramientas especiales",
      short: "Ingeniería y diseño",
      description:
        "Desarrollo de herramientas especiales a medida para requerimientos específicos de la industria minera e industrial.",
    },
    {
      number: "02",
      title: "Fabricación mecánica en máquinas convencionales y CNC",
      short: "Fabricación mecánica",
      description:
        "Mecanizado de precisión en torno, fresa y centros CNC para la fabricación de piezas y componentes industriales.",
    },
    {
      number: "03",
      title: "Recuperación integral de componentes hidráulicos",
      short: "Componentes hidráulicos",
      description:
        "Reparación, rectificado y recuperación integral de cilindros y componentes hidráulicos.",
    },
    {
      number: "04",
      title: "Balanceo dinámico",
      short: "Balanceo dinámico",
      description:
        "Equilibrado de precisión de rotores, ejes y componentes rotativos para eliminar vibración.",
    },
    {
      number: "05",
      title: "Fabricación, reparación y rediseño estructural",
      short: "Estructuras",
      description:
        "Fabricación, reparación y rediseño de estructuras metálicas: plataformas, soportes, jaulas y portales de izaje.",
    },
    {
      number: "06",
      title: "Granallado y pintura industrial",
      short: "Granallado y pintura",
      description:
        "Preparación superficial mediante granallado y aplicación de recubrimientos y pintura industrial.",
    },
  ],
} as const;

export const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${company.address.lat},${company.address.lng}`;
