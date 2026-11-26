import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { company } from "@/data/company";
import Reveal from "./Reveal";

/**
 * Cierre de las páginas interiores: la invitación a cotizar, con el camino
 * corto por WhatsApp al lado. Va antes del pie de página.
 */
export default function CtaBand({
  title = "¿Necesitas cotizar un trabajo?",
  lead = "Cuéntanos qué hay que fabricar, mecanizar o recuperar y te respondemos a la brevedad.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brinell-blue text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(240,204,66,0.22), transparent)",
        }}
      />

      <Reveal
        amount={0.2}
        className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-24"
      >
        <div>
          <h2 className="heading-hard max-w-2xl text-[clamp(1.9rem,4.5vw,3.2rem)]">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
            {lead}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-4 sm:flex-row lg:pb-2">
          <Link
            href="/contacto"
            transitionTypes={["nav-forward"]}
            className="group inline-flex items-center justify-center gap-3 bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.05em] text-[#0a0d12] transition-all duration-300 hover:-translate-y-1 hover:bg-brinell-yellow"
          >
            Solicitar cotización
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 border border-white/40 px-8 py-4 text-sm font-bold uppercase tracking-[0.05em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/10"
          >
            <MessageCircle size={18} strokeWidth={2} />
            WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  );
}
