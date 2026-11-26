import { ViewTransition } from "react";
import type { ReactNode } from "react";

/**
 * Envuelve el contenido de una página para que el cambio de ruta se anime
 * en lugar de saltar.
 *
 * Va en cada `page.tsx` y no en el layout: el layout sobrevive a la
 * navegación, así que sus animaciones de entrada y salida nunca se
 * dispararían.
 *
 * Los enlaces que entran "hacia adentro" (una tarjeta de servicio, por
 * ejemplo) se marcan con `transitionTypes={["nav-forward"]}` y los que
 * vuelven, con `nav-back`; el navegador desliza en el sentido que
 * corresponde. Una navegación sin marca —el menú, o el botón atrás del
 * navegador— se resuelve con un fundido.
 *
 * Si el navegador no soporta View Transitions, el cambio de página ocurre
 * igual, sólo sin animación.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "page-in",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "page-out",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
