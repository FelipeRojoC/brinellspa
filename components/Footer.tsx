import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/data/company";
import { mainRoutes, serviceRoutes } from "@/data/routes";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#05070a] text-white">
      {/* Remate de plancha, sin texto encima */}
      <div aria-hidden className="plate-strip plate-strip-top h-24 w-full" />

      {/* Marca de agua gigante */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-6 select-none text-center text-[22vw] font-bold leading-none tracking-[-0.06em] text-white/[0.025]"
      >
        BRINELL
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_1fr_1fr]">
          {/* MARCA */}
          <div>
            <Link href="/" aria-label="Brinell · Inicio">
              <Image
                src="/images/logo/brinell-logo.png"
                alt={company.name}
                width={200}
                height={72}
                className="h-auto w-[180px]"
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/50">
              Maestranza metalmecánica en Antofagasta. Ingeniería, fabricación,
              mecanizado y reparación para la industria minera e industrial.
            </p>

            <Link
              href="/contacto"
              transitionTypes={["nav-forward"]}
              className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-brinell-yellow"
            >
              Solicitar cotización
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-brinell-yellow group-hover:bg-brinell-yellow group-hover:text-[#070a10]">
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </div>

          {/* NAV */}
          <nav aria-label="Navegación del sitio">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-brinell-yellow">
              Navegación
            </p>
            <ul className="space-y-3">
              {mainRoutes.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* SERVICIOS */}
          <nav aria-label="Servicios">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-brinell-yellow">
              Servicios
            </p>
            <ul className="space-y-3">
              {serviceRoutes.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    transitionTypes={["nav-forward"]}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CONTACTO */}
          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-brinell-yellow">
              Contacto
            </p>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                {company.address.street}
                <br />
                {company.address.city}, {company.address.country}
              </li>
              <li>
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.emails.maestranza}`}
                  className="transition-colors hover:text-white"
                >
                  {company.emails.maestranza}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.emails.administracion}`}
                  className="transition-colors hover:text-white"
                >
                  {company.emails.administracion}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* LÍNEA INFERIOR */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.18em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name} · Antofagasta, Chile
          </p>
          <p>Precisión que mueve la industria.</p>
        </div>
      </div>
    </footer>
  );
}
