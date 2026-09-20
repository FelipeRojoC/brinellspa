"use client";

import { ReactLenis } from "lenis/react";

/** Scroll suave con inercia (Lenis). `anchors` intercepta los links #hash. */
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
      {children}
    </ReactLenis>
  );
}
