"use client";

import { motion } from "motion/react";

/**
 * Planos técnicos en lugar de fotografías para los servicios que aún no
 * tienen imagen. Se dibujan solos al entrar en pantalla.
 */

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.1, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] as const },
      opacity: { duration: 0.2, delay: i * 0.12 },
    },
  }),
};

function L({ d, i = 0, accent }: { d: string; i?: number; accent?: boolean }) {
  return (
    <motion.path
      d={d}
      variants={draw}
      custom={i}
      fill="none"
      stroke={accent ? "var(--brinell-yellow)" : "currentColor"}
      strokeWidth={accent ? 1.6 : 1.1}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

const shapes: Record<string, React.ReactNode> = {
  // Herramienta especial con cotas
  "01": (
    <>
      <L i={0} d="M70 52 h100 v24 h-100 z" />
      <L i={1} d="M96 76 v44 l14 20 h20 l14 -20 v-44" />
      <L i={2} d="M110 76 v38" />
      <L i={3} d="M130 76 v38" />
      <L i={4} d="M70 40 h100" accent />
      <L i={5} d="M70 36 v8 M170 36 v8" accent />
      <L i={6} d="M186 52 v88 M182 52 h8 M182 140 h8" />
      <L i={7} d="M54 140 h132" />
    </>
  ),
  // Cilindro hidráulico en corte
  "03": (
    <>
      <L i={0} d="M44 62 h96 v66 h-96 z" />
      <L i={1} d="M140 84 h56 v22 h-56" />
      <L i={2} d="M196 80 h10 v30 h-10 z" accent />
      <L i={3} d="M110 62 v66" />
      <L i={4} d="M30 95 h176" />
      <L i={5} d="M58 50 v12 M58 50 h-4 M58 50 h4" />
      <L i={6} d="M58 128 v12" />
      <L i={7} d="M52 62 l14 14 M62 62 l14 14 M72 62 l14 14 M82 62 l14 14" />
    </>
  ),
  // Rotor sobre ejes con marcas de equilibrado
  "04": (
    <>
      <L i={0} d="M30 95 h180" />
      <L i={1} d="M86 95 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0" />
      <L i={2} d="M108 95 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0" />
      <L i={3} d="M48 84 h38 v22 h-38 z" />
      <L i={4} d="M154 84 h38 v22 h-38 z" />
      <L i={5} d="M120 61 v10 M143 72 l7 -7 M97 72 l-7 -7" accent />
      <L i={6} d="M150 52 a42 42 0 0 1 14 20" accent />
      <L i={7} d="M164 72 l2 -9 l-9 3" accent />
    </>
  ),
  // Ensamble por interferencia: eje entrando en cubo, con prensa
  "06": (
    <>
      <L i={0} d="M118 56 h74 v78 h-74 z" />
      <L i={1} d="M118 80 h74 M118 110 h74" />
      <L i={2} d="M40 82 h78 v26 h-78 z" />
      <L i={3} d="M30 95 h180" />
      <L i={4} d="M126 60 l10 10 M136 60 l10 10 M146 60 l10 10 M156 60 l10 10 M166 60 l10 10" />
      <L i={5} d="M126 118 l10 10 M136 118 l10 10 M146 118 l10 10 M156 118 l10 10 M166 118 l10 10" />
      <L i={6} d="M74 95 h34" accent />
      <L i={7} d="M108 95 l-9 -5 v10 z" accent />
    </>
  ),
};

export default function ServiceBlueprint({ number }: { number: string }) {
  const shape = shapes[number];
  if (!shape) return null;

  return (
    <motion.svg
      viewBox="0 0 240 180"
      aria-hidden
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className="absolute inset-0 h-full w-full text-white/35 transition-colors duration-500 group-hover:text-white/60"
    >
      {/* Retícula de plano */}
      <defs>
        <pattern id={`grid-${number}`} width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M12 0 H0 V12" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.25" />
        </pattern>
      </defs>
      <rect width="240" height="180" fill={`url(#grid-${number})`} />
      {shape}
    </motion.svg>
  );
}
