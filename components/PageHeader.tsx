import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import Reveal from "./Reveal";

export type Crumb = { label: string; href?: string };

/**
 * Cabecera de las páginas interiores. Repite el lenguaje de la portada
 * —plancha estriada, titular pesado, acento amarillo— y deja la miga de
 * pan arriba, que le sirve igual al visitante y al buscador.
 */
export default function PageHeader({
  eyebrow,
  title,
  accent,
  lead,
  crumbs = [],
  children,
}: {
  /** Línea pequeña sobre el título. */
  eyebrow?: string;
  /** Título de la página. Es el único `h1`. */
  title: string;
  /** Tramo final del título, resaltado en amarillo. */
  accent?: string;
  lead?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-[#070a10] text-white">
      {/* Textura metálica, atenuada hacia abajo para que el texto se lea */}
      <div
        aria-hidden
        className="plate-strip plate-strip-bottom pointer-events-none absolute inset-x-0 top-0 h-[70%] opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-[560px] w-[560px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(54,120,228,0.18), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-36 sm:pb-20 sm:pt-40 lg:px-8 lg:pb-24 lg:pt-44">
        {crumbs.length > 0 && (
          <nav aria-label="Ruta de navegación" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-white/40">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight size={12} aria-hidden className="text-white/25" />
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      transitionTypes={["nav-back"]}
                      className="transition-colors hover:text-brinell-yellow"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/70">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Reveal amount={0.1}>
          {eyebrow && (
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-brinell-yellow">
              {eyebrow}
            </p>
          )}

          <h1 className="heading-hard max-w-4xl text-[clamp(2.1rem,5.5vw,4.1rem)]">
            {title}
            {accent && (
              <>
                {" "}
                <em className="text-brinell-yellow">{accent}</em>
              </>
            )}
          </h1>

          {lead && (
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              {lead}
            </p>
          )}

          {children}
        </Reveal>
      </div>
    </header>
  );
}
