"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

function LenisBridge() {
  const lenis = useLenis();
  useEffect(() => {
    window.__lenis = lenis;
    return () => {
      window.__lenis = undefined;
    };
  }, [lenis]);
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
