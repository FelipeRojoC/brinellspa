"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

function LenisBridge() {
  const lenis = useLenis();
  const pathname = usePathname();

  /** Marca la navegación que viene del botón atrás del navegador. */
  const fromHistory = useRef(false);

  useEffect(() => {
    window.__lenis = lenis;
    return () => {
      window.__lenis = undefined;
    };
  }, [lenis]);

  useEffect(() => {
    const onPopState = () => {
      fromHistory.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  /**
   * Al cambiar de página hay que volver arriba. Lenis se adueña del scroll
   * de la ventana, así que el reinicio del router no le llega: sin esto, la
   * página nueva aparece a mitad de camino.
   *
   * No se aplica si la URL trae un ancla (#contacto), ni al volver con el
   * botón atrás: ahí lo correcto es devolver al visitante donde estaba.
   */
  useEffect(() => {
    if (!lenis) return;

    if (fromHistory.current) {
      fromHistory.current = false;
      return;
    }
    if (window.location.hash) return;

    const toTop = () => lenis.scrollTo(0, { immediate: true, force: true });
    toTop();

    // El navegador puede restaurar la posición anterior justo después de
    // montar la página; se vuelve a fijar en el cuadro siguiente.
    const frame = requestAnimationFrame(toTop);
    return () => cancelAnimationFrame(frame);
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        wheelMultiplier: 0.95,
        anchors: { offset: -80 },
      }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}
