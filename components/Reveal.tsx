"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 38 },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -38 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 38 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1 },
  },
};

/** Aparición suave al entrar en pantalla. `stagger` escalona a los hijos con Reveal. */
export default function Reveal({
  children,
  as = "div",
  from = "up",
  delay = 0,
  duration = 0.75,
  stagger,
  amount = 0.25,
  className,
}: {
  children: ReactNode;
  as?: "div" | "section" | "li" | "article" | "p" | "h2";
  from?: keyof typeof variants;
  delay?: number;
  duration?: number;
  stagger?: number;
  amount?: number;
  className?: string;
}) {
  const Tag = motion[as];

  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: variants[from].hidden,
        show: {
          ...variants[from].show,
          transition: {
            duration,
            delay,
            ease: EASE,
            ...(stagger ? { staggerChildren: stagger, delayChildren: delay } : {}),
          },
        },
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Hijo de un Reveal con `stagger`: hereda el escalonado del padre. */
export function RevealItem({
  children,
  from = "up",
  className,
}: {
  children: ReactNode;
  from?: keyof typeof variants;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: variants[from].hidden,
        show: { ...variants[from].show, transition: { duration: 0.7, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
