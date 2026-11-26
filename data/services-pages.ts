/**
 * Contenido de las páginas de servicio.
 *
 * Cada servicio tiene su propia URL para que los buscadores puedan
 * encontrarlo por su nombre: "balanceo dinámico Antofagasta",
 * "reparación de cilindros hidráulicos Antofagasta", etc. Google necesita
 * texto propio en cada página; si todas dicen lo mismo, compiten entre
 * ellas y ninguna sube.
 *
 * ⚠ REVISAR CON EL CLIENTE
 * Los textos describen cada servicio a partir de lo que el propio servicio
 * es, sin afirmar capacidades que no estén confirmadas (no se mencionan
 * marcas de máquinas, tolerancias, certificaciones ni plazos). Conviene que
 * Brinell los lea y los corrija con lo que realmente tiene en el taller:
 * ahí es donde el texto se vuelve difícil de igualar por la competencia.
 */

import { company } from "./company";

export type ServicePage = {
  /** Último tramo de la URL: /servicios/<slug> */
  slug: string;
  /** Número del servicio en `company.services`. */
  number: string;
  /** Título de la página. Puede diferir del nombre oficial del servicio. */
  h1: string;
  /** Lo que se lee en la pestaña del navegador y en el resultado de Google. */
  metaTitle: string;
  /** El párrafo que Google muestra bajo el título. Entre 120 y 160 caracteres. */
  metaDescription: string;
  /** Búsquedas a las que apunta esta página. */
  keywords: string[];
  /** Un párrafo que explique el servicio en términos del problema que resuelve. */
  intro: string;
  /** Qué incluye el trabajo, paso a paso. */
  incluye: string[];
  /** Dónde se aplica. Ayuda al visitante a reconocer su propio caso. */
  aplicaciones: string[];
  /** Qué datos conviene mandar para que la cotización salga rápido. */
  paraCotizar: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "ingenieria-y-diseno-de-herramientas",
    number: "01",
    h1: "Ingeniería y diseño de herramientas especiales",
    metaTitle: "Ingeniería, análisis FEA y CFD en Antofagasta",
    metaDescription:
      "Diseño mecánico, análisis por elementos finitos (FEA) y análisis de fluidos (CFD) en Antofagasta, además del diseño y la fabricación de herramientas especiales a medida.",
    keywords: [
      "análisis por elementos finitos Antofagasta",
      "análisis FEA minería",
      "análisis CFD Chile",
      "diseño de herramientas especiales",
      "ingeniería mecánica Antofagasta",
    ],
    intro:
      "Diseñamos lo que no existe en catálogo y comprobamos que aguante antes de fabricarlo. Partimos del problema en terreno —un componente que hay que extraer, una estructura que falla, un flujo que no evacúa— y entregamos el cálculo, el plano y la pieza que lo resuelve.",
    incluye: [
      "Diseño mecánico de componentes y maquinaria",
      "Análisis por elementos finitos (FEA) de piezas y sistemas mecánicos",
      "Análisis de fluidos (CFD) térmico y de flujo",
      "Levantamiento de medidas y condiciones en terreno",
      "Planos de fabricación y selección de materiales según carga y uso",
      "Fabricación de la herramienta o el componente en nuestro taller",
    ],
    aplicaciones: [
      "Verificación estructural de componentes antes de fabricarlos",
      "Estudios térmicos y de flujo en salas y equipos",
      "Herramientas de extracción y montaje de componentes",
      "Dispositivos de izaje y manipulación de piezas",
      "Soportes, plantillas y utillaje de mecanizado",
    ],
    paraCotizar: [
      "Qué componente, estructura o maniobra necesitas resolver",
      "Planos, modelo 3D o croquis, si los tienes",
      "Las cargas, presiones o temperaturas de trabajo",
      "El plazo en que lo necesitas",
    ],
  },
  {
    slug: "mecanizado-cnc",
    number: "02",
    h1: "Mecanizado de precisión en máquinas convencionales y CNC",
    metaTitle: "Mecanizado CNC y torno en Antofagasta",
    metaDescription:
      "Fabricación mecánica de piezas en torno, fresa y control numérico en Antofagasta. Mecanizado de precisión y repuestos para minería e industria.",
    keywords: [
      "mecanizado CNC Antofagasta",
      "torno y fresa Antofagasta",
      "fabricación de piezas mecánicas",
      "repuestos mecanizados minería",
    ],
    intro:
      "Fabricamos piezas a partir de un plano, de una muestra o de la pieza desgastada que nos traen. Trabajamos tanto en máquinas convencionales —torno y fresa— como en control numérico, y elegimos una u otra según la geometría, la cantidad y el plazo.",
    incluye: [
      "Fabricación de piezas desde plano o desde muestra física",
      "Torneado, fresado, taladrado y roscado",
      "Mecanizado en control numérico para geometrías complejas o series",
      "Recuperación de roscas con inserto fabricado o recoil, y extracción de pernos cortados",
      "Fabricación de repuestos descontinuados o sin stock",
      "Metrología y verificación dimensional antes de la entrega",
    ],
    aplicaciones: [
      "Ejes, pernos, bujes y casquillos",
      "Cabezales de perforadora COP 1638, 1838 y 2238, recuperados por encamisado en acero inoxidable",
      "Bridas, acoples y adaptadores",
      "Piezas de recambio para equipo minero",
      "Repuestos que ya no tienen stock de fábrica",
    ],
    paraCotizar: [
      "El plano, o la pieza misma para copiarla",
      "El material requerido, si ya está definido",
      "Cantidad y plazo",
    ],
  },
  {
    slug: "componentes-hidraulicos",
    number: "03",
    h1: "Recuperación integral de componentes hidráulicos",
    metaTitle: "Reparación de cilindros hidráulicos en Antofagasta",
    metaDescription:
      "Reparación, rectificado y recuperación integral de cilindros y componentes hidráulicos en Antofagasta: desarme, diagnóstico, mecanizado y prueba.",
    keywords: [
      "reparación de cilindros hidráulicos Antofagasta",
      "recuperación de componentes hidráulicos",
      "rectificado de vástagos",
      "mantención hidráulica minería",
    ],
    intro:
      "Un cilindro hidráulico dañado casi nunca se cambia completo: se recupera. Lo desarmamos, medimos el desgaste real y reparamos lo que corresponde —camisa, vástago, tapas, alojamientos— para devolverlo a su medida de trabajo.",
    incluye: [
      "Desarme y diagnóstico del componente",
      "Medición del desgaste de camisa y vástago",
      "Rectificado y mecanizado a medida",
      "Recuperación de alojamientos e hilos dañados",
      "Fabricación de cilindros hidráulicos nuevos",
      "Mantención de sistemas hidráulicos industriales",
      "Armado, pintura y prueba de estanqueidad y funcionamiento antes de la entrega",
    ],
    aplicaciones: [
      "Cilindros de equipo minero y de movimiento de tierra",
      "Unidades de rotación y brazos toma barra de perforadoras",
      "Martillos hidráulicos: carcasa y camisas",
      "Vástagos rayados, torcidos o con desgaste",
      "Componentes con asientos y alojamientos fuera de medida",
    ],
    paraCotizar: [
      "Marca, modelo y medidas del cilindro, si las tienes",
      "Qué falla presenta: fuga, rayadura, pérdida de fuerza",
      "Si el equipo está detenido, para priorizar el plazo",
    ],
  },
  {
    slug: "balanceo-dinamico",
    number: "04",
    h1: "Balanceo dinámico de rotores y componentes rotativos",
    metaTitle: "Balanceo dinámico en Antofagasta",
    metaDescription:
      "Balanceo dinámico de rotores, impulsores, poleas y ejes en Antofagasta. Corregimos el desbalance que genera vibración y acorta la vida del rodamiento.",
    keywords: [
      "balanceo dinámico Antofagasta",
      "equilibrado de rotores",
      "balanceo de impulsores de bomba",
      "vibración en equipos rotativos",
    ],
    intro:
      "Una pieza que gira desbalanceada vibra, y esa vibración se come los rodamientos, los sellos y la estructura que la sostiene. El balanceo dinámico mide dónde está la masa sobrante y la corrige, por remoción de material o por contrapeso, hasta dejar la pieza dentro de tolerancia.",
    incluye: [
      "Medición del desbalance en máquina balanceadora",
      "Corrección por remoción de material o por contrapeso",
      "Verificación final de la pieza corregida",
      "Registro con los valores antes y después",
    ],
    aplicaciones: [
      "Rotores de motores y generadores",
      "Impulsores de bombas y de ventiladores",
      "Poleas, volantes y acoples",
      "Ejes y tambores de correas transportadoras",
    ],
    paraCotizar: [
      "Tipo de pieza, peso aproximado y diámetro",
      "Revoluciones de trabajo",
      "Si ya presenta vibración en operación",
    ],
  },
  {
    slug: "estructuras-metalicas",
    number: "05",
    h1: "Fabricación, reparación y rediseño de estructuras metálicas",
    metaTitle: "Estructuras metálicas en Antofagasta",
    metaDescription:
      "Fabricación, reparación y rediseño de estructuras metálicas en Antofagasta: plataformas, soportes, jaulas y portales de izaje para minería e industria.",
    keywords: [
      "estructuras metálicas Antofagasta",
      "fabricación de plataformas industriales",
      "reparación de estructuras mineras",
      "portales de izaje",
    ],
    intro:
      "Fabricamos estructura nueva y recuperamos la que ya está en faena. Cuando una estructura falla de forma repetida no la reponemos igual: revisamos por qué falló y la rediseñamos para que aguante la condición real de trabajo.",
    incluye: [
      "Fabricación de estructura nueva según plano",
      "Reparación y refuerzo de estructura en servicio",
      "Rediseño de piezas que fallan de forma recurrente",
      "Soldadura y armado en taller",
    ],
    aplicaciones: [
      "Plataformas y pasarelas de acceso",
      "Bases de traslado de componentes de gran tonelaje",
      "Canastillos y portales de izaje",
      "Soportes, bases y bancadas de equipos",
      "Protecciones, barandas y escalas",
    ],
    paraCotizar: [
      "Plano o croquis con medidas",
      "La carga que debe soportar",
      "Si es reposición de algo que ya falló, y cómo falló",
    ],
  },
  {
    slug: "ensamble-por-interferencia",
    number: "06",
    h1: "Ensamble y extracción por interferencia con equipos hidráulicos",
    metaTitle: "Ensamble y extracción por interferencia en Antofagasta",
    metaDescription:
      "Montaje y desmontaje de componentes con ajuste por interferencia mediante equipos hidráulicos de alta presión, en Antofagasta.",
    keywords: [
      "ensamble por interferencia",
      "extracción hidráulica de componentes",
      "montaje a presión de coronas y bujes",
      "maestranza Antofagasta",
    ],
    intro:
      "Los ajustes por interferencia —ruedas, coronas, bujes, acoples montados a presión— no se sacan a golpes sin dañar la pieza. Usamos equipos hidráulicos de alta presión para montar y desmontar de forma controlada, midiendo la fuerza y cuidando tanto el componente como su alojamiento.",
    incluye: [
      "Extracción controlada de componentes montados a presión",
      "Montaje por interferencia con control de la fuerza aplicada",
      "Verificación de medidas de eje y alojamiento",
      "Recuperación del asiento cuando queda fuera de medida",
    ],
    aplicaciones: [
      "Coronas, piñones y engranajes montados a presión",
      "Bujes, casquillos y pistas de rodamiento",
      "Acoples y poleas sobre eje",
      "Ruedas y tambores",
    ],
    paraCotizar: [
      "Qué componente hay que montar o extraer",
      "Medidas del eje y del alojamiento, si las tienes",
      "Si la pieza se debe conservar o es de reposición",
    ],
  },
];

/** Une el contenido de la página con el servicio oficial del mismo número. */
export function getServicePage(slug: string) {
  const page = servicePages.find((p) => p.slug === slug);
  if (!page) return null;

  const service = company.services.find((s) => s.number === page.number);
  if (!service) return null;

  return { ...page, service };
}

/** El slug de un servicio, para enlazar desde la portada y el pie. */
export function slugOf(number: string) {
  return servicePages.find((p) => p.number === number)?.slug ?? "";
}
