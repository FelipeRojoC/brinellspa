/**
 * Trabajos realizados, con las fotografías de la presentación oficial de
 * Brinell (Presentacion_Brinell_2026_v4.pptx, noviembre 2025).
 *
 * Los títulos y descripciones salen textualmente de esa presentación: son
 * trabajos que la empresa ya muestra a sus clientes, no ejemplos
 * inventados. Las fotos se recortaron y comprimieron, nada más.
 *
 * ⚠ Los tres análisis de ingeniería nombran la faena y la minera a la que
 * pertenecen, tal como aparecen en la presentación. Conviene que Brinell
 * confirme que puede publicarlos en abierto antes de pasar a producción.
 */

export type Work = {
  /** Archivo en public/images/trabajos/. */
  image: string;
  /** Medidas reales del archivo, para que la grilla no salte al cargar. */
  w: number;
  h: number;
  title: string;
  /** Qué se hizo. Vacío cuando el título ya lo dice todo. */
  detail?: string;
  /** Faena o cliente final, cuando la presentación lo indica. */
  client?: string;
  /** Número del servicio en `company.services`. */
  service: string;
};

export const works: Work[] = [
  // 01 · Ingeniería y diseño
  {
    image: "analisis-cfd-datacenter.jpg",
    w: 764,
    h: 674,
    title: "Análisis CFD de datacenter",
    detail:
      "Simulación del flujo de aire y la disipación térmica dentro de la sala.",
    client: "Spence · BHP",
    service: "01",
  },
  {
    image: "analisis-cfd-valvula.jpg",
    w: 764,
    h: 674,
    title: "Análisis CFD de válvula de mariposa",
    detail: "Línea de ácido sulfuroso.",
    client: "Chuquicamata · Codelco",
    service: "01",
  },
  {
    image: "analisis-estructural-antigiros.jpg",
    w: 764,
    h: 674,
    title: "Análisis estructural de antigiros",
    detail: "Pala eléctrica 7495 HR, por elementos finitos.",
    client: "Codelco",
    service: "01",
  },

  // 02 · Fabricación mecánica
  {
    image: "cabezal-perforadora.jpg",
    w: 1421,
    h: 752,
    title: "Cabezal de perforadora recuperado",
    detail:
      "Modelos COP 1638, 1838 ME/HE y 2238, en sus versiones HD, mediante encamisado de acero inoxidable.",
    service: "02",
  },
  {
    image: "bujes-de-bronce.jpg",
    w: 1417,
    h: 752,
    title: "Bujes de bronce",
    detail: "Fabricados a medida en torno.",
    service: "02",
  },
  {
    image: "pernos-especiales.jpg",
    w: 1424,
    h: 752,
    title: "Pernos especiales",
    detail:
      "Elementos roscados a medida, con recuperación de roscas por inserto fabricado o recoil.",
    service: "02",
  },
  {
    image: "elementos-roscados.jpg",
    w: 1420,
    h: 752,
    title: "Elementos roscados",
    detail: "Fabricación de todo tipo de elementos roscados.",
    service: "02",
  },
  {
    image: "rueda-movil.jpg",
    w: 1424,
    h: 752,
    title: "Conjunto rueda móvil de alto tonelaje",
    service: "02",
  },
  {
    image: "ejes-y-vastagos.jpg",
    w: 1424,
    h: 752,
    title: "Ejes y vástagos",
    detail: "Tornería de precisión sobre eje con engranaje montado.",
    service: "02",
  },

  // 03 · Componentes hidráulicos
  {
    image: "unidad-de-rotacion.jpg",
    w: 824,
    h: 1364,
    title: "Unidad de rotación",
    detail:
      "Desarme y evaluación, inspección dimensional, cambio de sellos, montaje, pintura y prueba de estanqueidad y funcionamiento.",
    service: "03",
  },
  {
    image: "brazo-toma-barra.jpg",
    w: 824,
    h: 1364,
    title: "Brazo toma barra",
    detail:
      "Reparación estructural, rectificado de alojamientos, cambio de bujes, pasadores y piezas de desgaste, reparación de cilindros y reacondicionamiento.",
    service: "03",
  },
  {
    image: "martillo-hidraulico.jpg",
    w: 824,
    h: 1364,
    title: "Martillo hidráulico",
    detail:
      "Mecanizado de carcasa, fabricación de camisas a medida estándar y verificación dimensional.",
    service: "03",
  },
  {
    image: "cilindro-hidraulico-1.jpg",
    w: 824,
    h: 1364,
    title: "Fabricación de cilindros hidráulicos",
    detail: "Vástago terminado, listo para montaje.",
    service: "03",
  },
  {
    image: "cilindro-hidraulico-2.jpg",
    w: 824,
    h: 1362,
    title: "Cilindro hidráulico en proceso",
    detail: "Mecanizado del vástago en torno.",
    service: "03",
  },
  {
    image: "cilindro-hidraulico-3.jpg",
    w: 824,
    h: 1364,
    title: "Cilindro hidráulico en montaje",
    service: "03",
  },

  // 05 · Estructuras
  {
    image: "plataforma-industrial.jpg",
    w: 1424,
    h: 752,
    title: "Plataforma industrial",
    detail: "Fabricada, armada y pintada en taller.",
    service: "05",
  },
  {
    image: "base-de-traslado.jpg",
    w: 1424,
    h: 752,
    title: "Base de traslado para transmisión 797B",
    detail: "817 kg de base para una transmisión de 8.229 kg.",
    service: "05",
  },
  {
    image: "estructura-metalica.jpg",
    w: 1424,
    h: 752,
    title: "Estructura metálica",
    detail: "Fabricación completa según plano.",
    service: "05",
  },
  {
    image: "soporte-industrial.jpg",
    w: 821,
    h: 1364,
    title: "Soporte industrial",
    service: "05",
  },
  {
    image: "soportes-fabricados.jpg",
    w: 821,
    h: 1346,
    title: "Soportes fabricados",
    detail: "Bancadas de apoyo para componentes de gran porte.",
    service: "05",
  },
  {
    image: "canastillo.jpg",
    w: 817,
    h: 1364,
    title: "Canastillo",
    detail: "Canastillo de izaje fabricado a medida.",
    service: "05",
  },
];

/** Los trabajos de un servicio. */
export function worksOf(serviceNumber: string) {
  return works.filter((w) => w.service === serviceNumber);
}

/** La primera fotografía de un servicio, para usarla de portada. */
export function coverOf(serviceNumber: string) {
  return works.find((w) => w.service === serviceNumber)?.image;
}

/**
 * Una selección para la portada: una foto por línea de trabajo que tenga
 * fotografías, completando hasta seis con las que mejor representan.
 */
export const featuredWorks: Work[] = [
  works.find((w) => w.image === "bujes-de-bronce.jpg")!,
  works.find((w) => w.image === "unidad-de-rotacion.jpg")!,
  works.find((w) => w.image === "base-de-traslado.jpg")!,
  works.find((w) => w.image === "cabezal-perforadora.jpg")!,
  works.find((w) => w.image === "cilindro-hidraulico-2.jpg")!,
  works.find((w) => w.image === "analisis-cfd-valvula.jpg")!,
];
