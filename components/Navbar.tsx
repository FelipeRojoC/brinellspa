"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { mainRoutes, serviceRoutes } from "@/data/routes";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // El menú abierto no debe dejar que el fondo siga haciendo scroll
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  /** Al seguir un enlace el menú se cierra; así no queda tapando la página nueva. */
  const closeAll = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  /** Activo también en las subpáginas: /servicios/... marca "Servicios". */
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openServices = () => {
    window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  /** Pequeña demora para poder bajar el cursor hasta el desplegable. */
  const closeServices = () => {
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 140);
  };

  return (
    <header
      /* Anclado: durante la transición de página la barra no se mueve */
      style={{ viewTransitionName: "site-header" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        scrolled || menuOpen
          ? "border-b border-white/10 bg-[#0b1019]/85 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 lg:px-8 ${
          scrolled ? "h-20" : "h-24"
        }`}
      >
        {/* LOGO */}
        <Link
          href="/"
          className="group relative z-10 shrink-0"
          aria-label="Brinell · Inicio"
        >
          <Image
            src="/images/logo/brinell-logo.png"
            alt="Brinell Maestranza Metalmecánica"
            width={220}
            height={80}
            priority
            className={`h-auto transition-all duration-500 group-hover:scale-[1.02] ${
              scrolled ? "w-[170px] sm:w-[185px]" : "w-[190px] sm:w-[205px]"
            }`}
          />
        </Link>

        {/* NAV ESCRITORIO */}
        <nav className="hidden items-center gap-8 lg:flex">
          {mainRoutes.map((item) => {
            const active = isActive(item.href);

            // "Servicios" despliega las seis páginas
            if (item.href === "/servicios") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={closeServices}
                >
                  <Link
                    href={item.href}
                    className={`group relative flex items-center gap-1.5 py-3 text-[14px] font-medium tracking-wide transition-colors duration-300 ${
                      active ? "text-white" : "text-white/70 hover:text-white"
                    }`}
                    aria-expanded={servicesOpen}
                    onClick={closeAll}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    />
                    <span
                      className={`absolute bottom-1 left-0 h-[2px] w-[calc(100%-18px)] origin-left bg-brinell-yellow transition-transform duration-300 ease-out ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>

                  <div
                    className={`absolute left-1/2 top-full w-[320px] -translate-x-1/2 pt-3 transition-all duration-300 ${
                      servicesOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="border border-white/10 bg-[#0d1220] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                      {serviceRoutes.map((s, i) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          transitionTypes={["nav-forward"]}
                          onClick={closeAll}
                          className="group flex items-center gap-3 px-3 py-2.5 text-[13px] text-white/65 transition-colors hover:bg-white/[0.06] hover:text-white"
                        >
                          <span className="font-mono text-[11px] text-brinell-yellow/70">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1">{s.label}</span>
                          <ArrowUpRight
                            size={13}
                            className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeAll}
                className={`group relative py-3 text-[14px] font-medium tracking-wide transition-colors duration-300 ${
                  active ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-1 left-0 h-[2px] w-full origin-left bg-brinell-yellow transition-transform duration-300 ease-out ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA ESCRITORIO */}
        <Link
          href="/contacto"
          onClick={closeAll}
          className="group hidden items-center gap-3 overflow-hidden rounded-sm bg-brinell-blue px-6 py-3.5 text-[14px] font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5b86ed] hover:shadow-[0_12px_35px_rgba(70,113,225,0.30)] lg:flex"
        >
          <span>Solicitar cotización</span>
          <span className="flex h-5 w-5 items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
            <ArrowUpRight size={17} strokeWidth={2} />
          </span>
        </Link>

        {/* BOTÓN DE CELULAR */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 lg:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* MENÚ DE CELULAR */}
      <div
        className={`absolute inset-x-0 top-full overflow-y-auto overscroll-contain border-b border-white/10 bg-[#0b1019] backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          menuOpen
            ? "pointer-events-auto max-h-[calc(100dvh-5rem)] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-6 py-5">
          {mainRoutes.map((item) => (
            <div key={item.href} className="border-b border-white/10">
              <div className="flex items-center">
                <Link
                  href={item.href}
                  onClick={closeAll}
                  className={`flex-1 py-4 text-[15px] font-medium transition-colors ${
                    isActive(item.href) ? "text-brinell-yellow" : "text-white/75"
                  }`}
                >
                  {item.label}
                </Link>

                {item.href === "/servicios" && (
                  <button
                    type="button"
                    onClick={() => setServicesOpen((v) => !v)}
                    aria-label="Ver los servicios"
                    aria-expanded={servicesOpen}
                    className="flex h-10 w-10 items-center justify-center text-white/55"
                  >
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>

              {item.href === "/servicios" && (
                <div
                  className={`overflow-hidden transition-all duration-400 ${
                    servicesOpen ? "max-h-[420px] pb-3" : "max-h-0"
                  }`}
                >
                  {serviceRoutes.map((s, i) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      transitionTypes={["nav-forward"]}
                      onClick={closeAll}
                      className="flex items-center gap-3 border-l border-white/10 py-2.5 pl-4 text-[14px] text-white/60 transition-colors hover:text-white"
                    >
                      <span className="font-mono text-[11px] text-brinell-yellow/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href="/contacto"
            onClick={closeAll}
            className="group mt-5 flex items-center justify-center gap-3 rounded-sm bg-brinell-blue px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#5b86ed]"
          >
            Solicitar cotización
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}
