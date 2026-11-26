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
      {/* Plancha a sangre, apagándose antes del borde inferior */}
      <div
        aria-hidden
        className="plate-fade pointer-events-none absolute inset-0 opacity-45"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] sm:-right-32 sm:h-[560px] sm:w-[560px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(54,120,228,0.18), transparent)",
        }}
      />
      {/* Oscurece la mitad baja: el texto nunca cae sobre la textura cruda */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#070a10] via-[#070a10]/85 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-32 sm:pb-20 sm:pt-40 lg:px-8 lg:pb-24 lg:pt-44">
        {crumbs.length > 0 && (
          <nav aria-label="Ruta de navegación" className="mb-7 sm:mb-8">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] uppercase tracking-[0.14em] text-white/40 sm:text-[11px] sm:tracking-[0.16em]">
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
            <p className="mb-4 text-[11px] font-semibold uppercase leading-5 tracking-[0.14em] text-brinell-yellow sm:mb-5 sm:text-sm sm:tracking-[0.18em]">
              {eyebrow}
            </p>
          )}

          <h1 className="heading-hard max-w-4xl text-[clamp(1.85rem,7vw,4.1rem)] [text-wrap:balance]">
            {title}
            {accent && (
              <>
                {" "}
                <em className="text-brinell-yellow">{accent}</em>
              </>
            )}
          </h1>

          {lead && (
            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/60 sm:mt-7 sm:text-lg sm:leading-8">
              {lead}
            </p>
          )}

          {children}
        </Reveal>
      </div>
    </header>
  );
}
