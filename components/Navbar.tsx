"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-50
          transition-all duration-500 ease-out
          ${
            scrolled
              ? "border-b border-white/10 bg-[#0b1019]/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
              : "bg-transparent"
          }
        `}
      >
        <div
          className={`
            mx-auto flex max-w-7xl items-center justify-between
            px-6 transition-all duration-500 lg:px-8
            ${scrolled ? "h-20" : "h-24"}
          `}
        >
          {/* LOGO */}
          <a
            href="#inicio"
            onClick={closeMenu}
            className="group relative z-10 shrink-0"
            aria-label="Brinell - Inicio"
          >
            <Image
              src="/images/logo/brinell-logo.png"
              alt="Brinell Maestranza Metalmecánica"
              width={220}
              height={80}
              priority
              className={`
                h-auto transition-all duration-500
                ${
                  scrolled
                    ? "w-[170px] sm:w-[185px]"
                    : "w-[190px] sm:w-[205px]"
                }
                group-hover:scale-[1.02]
              `}
            />
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="
                  group relative py-3
                  text-[14px] font-medium tracking-wide
                  text-white/70
                  transition-all duration-300
                  hover:text-white
                "
              >
                {item.label}

                {/* Línea animada */}
                <span
                  className="
                    absolute bottom-1 left-0 h-[2px] w-full
                    origin-left scale-x-0
                    bg-brinell-yellow
                    transition-transform duration-300 ease-out
                    group-hover:scale-x-100
                  "
                />
              </a>
            ))}
          </nav>

          {/* CTA DESKTOP */}
          <a
            href="#contacto"
            className="
              group hidden items-center gap-3
              overflow-hidden rounded-sm
              bg-brinell-blue
              px-6 py-3.5
              text-[14px] font-semibold tracking-wide text-white
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-[#5b86ed]
              hover:shadow-[0_12px_35px_rgba(70,113,225,0.30)]
              lg:flex
            "
          >
            <span>Solicitar cotización</span>

            <span
              className="
                flex h-5 w-5 items-center justify-center
                transition-transform duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            >
              <ArrowUpRight size={17} strokeWidth={2} />
            </span>
          </a>

          {/* MOBILE */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              relative z-10 flex h-11 w-11
              items-center justify-center
              rounded-full
              border border-white/20
              bg-white/5
              text-white
              backdrop-blur-md
              transition-all duration-300
              hover:border-white/40
              hover:bg-white/10
              lg:hidden
            "
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`
            absolute inset-x-0 top-full overflow-hidden
            border-b border-white/10
            bg-[#0b1019]/95 backdrop-blur-2xl
            transition-all duration-500
            lg:hidden
            ${
              menuOpen
                ? "pointer-events-auto max-h-[520px] opacity-100"
                : "pointer-events-none max-h-0 opacity-0"
            }
          `}
        >
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="
                  group flex items-center justify-between
                  border-b border-white/10
                  py-4
                  text-[15px] font-medium
                  text-white/75
                  transition-colors
                  hover:text-white
                "
              >
                <span>{item.label}</span>

                <ArrowUpRight
                  size={16}
                  className="
                    opacity-0
                    transition-all duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                    group-hover:opacity-100
                  "
                />
              </a>
            ))}

            <a
              href="#contacto"
              onClick={closeMenu}
              className="
                group mt-5 flex items-center justify-center gap-3
                rounded-sm
                bg-brinell-blue
                px-5 py-4
                text-sm font-semibold text-white
                transition-all duration-300
                hover:bg-[#5b86ed]
                hover:shadow-[0_12px_30px_rgba(70,113,225,0.25)]
              "
            >
              Solicitar cotización

              <ArrowUpRight
                size={17}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}