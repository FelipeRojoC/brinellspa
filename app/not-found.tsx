import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { mainRoutes } from "@/data/routes";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#070a10] text-white">
      <div
        aria-hidden
        className="plate-strip plate-strip-bottom pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-20 h-[520px] w-[520px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(54,120,228,0.18), transparent)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-32 lg:px-8">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-brinell-yellow">
          Error 404
        </p>

        <h1 className="heading-hard mt-6 max-w-3xl text-[clamp(2.2rem,6vw,4.5rem)]">
          Esta página <em className="text-brinell-blue">no existe</em>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-7 text-white/55">
          Puede que el enlace esté mal escrito o que la página haya cambiado de
          dirección. Desde aquí llegas a todo lo demás.
        </p>

        <nav className="mt-12 flex flex-wrap gap-3">
          {mainRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              transitionTypes={["nav-back"]}
              className="group inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-brinell-yellow hover:text-brinell-yellow"
            >
              {route.label}
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
