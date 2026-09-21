"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { company, googleMapsUrl } from "@/data/company";

const TZ = "America/Santiago";

function useAntofagastaClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const id = setInterval(tick, 1000);
    const first = requestAnimationFrame(tick);
    return () => {
      clearInterval(id);
      cancelAnimationFrame(first);
    };
  }, []);
  if (!now) return { time: "--:--:--", open: false, day: "" };

  const parts = new Intl.DateTimeFormat("es-CL", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const h = Number(get("hour"));
  const m = Number(get("minute"));
  const weekday = get("weekday");
  const minutes = h * 60 + m;
  const isWeekday = !["sábado", "domingo"].includes(weekday);
  const open = isWeekday && minutes >= 8 * 60 + 30 && minutes < 18 * 60;

  return {
    time: `${get("hour")}:${get("minute")}:${get("second")}`,
    open,
    day: weekday,
  };
}

function SpotlightCard({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const Tag = href ? "a" : "div";
  const extra = href
    ? {
        href,
        target: href.startsWith("http") ? "_blank" : undefined,
        rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
      }
    : {};

  return (
    <Tag
      {...extra}
      onMouseMove={onMove}
      className={`spotlight group relative block overflow-hidden border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-500 hover:border-brinell-yellow/40 sm:p-7 ${className}`}
    >
      <span className="spotlight__glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative block">{children}</span>
    </Tag>
  );
}

const Label = ({ children }: { children: ReactNode }) => (
  <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-brinell-yellow">
    {children}
  </p>
);

export default function ContactInfo() {
  const clock = useAntofagastaClock();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="grid gap-3 sm:grid-cols-2"
    >
      {/* Estado / reloj */}
      <SpotlightCard className="sm:col-span-2">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label>
              <span
                className={`relative flex h-2 w-2 ${clock.open ? "" : "opacity-60"}`}
              >
                {clock.open && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    clock.open ? "bg-emerald-400" : "bg-white/40"
                  }`}
                />
              </span>
              {clock.open ? "Taller abierto ahora" : "Taller cerrado"}
            </Label>
            <p className="font-mono text-5xl font-bold tabular-nums tracking-[-0.04em] sm:text-6xl">
              {clock.time}
            </p>
            <p className="mt-2 text-sm capitalize text-white/40">
              {clock.day && `${clock.day} · `}Hora Antofagasta
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
              Horario
            </p>
            <p className="mt-2 text-base font-medium text-white/80">Lunes a viernes</p>
            <p className="text-base font-medium text-white/80">08:30 – 18:00</p>
          </div>
        </div>
      </SpotlightCard>

      {/* Teléfono */}
      <SpotlightCard href={`tel:${company.phone.replace(/\s/g, "")}`}>
        <Label>
          <Phone size={12} /> Teléfono
        </Label>
        <p className="text-2xl font-bold tracking-[-0.03em] transition-colors group-hover:text-brinell-yellow sm:text-3xl">
          {company.phone}
        </p>
        <Arrow />
      </SpotlightCard>

      {/* Correo */}
      <SpotlightCard href={`mailto:${company.emails.maestranza}`}>
        <Label>
          <Mail size={12} /> Correo
        </Label>
        <p className="text-lg font-semibold transition-colors group-hover:text-brinell-yellow sm:text-xl">
          {company.emails.maestranza}
        </p>
        <p className="mt-1 text-sm text-white/45">{company.emails.administracion}</p>
        <Arrow />
      </SpotlightCard>

      {/* Dirección */}
      <SpotlightCard href={googleMapsUrl} className="sm:col-span-2">
        <Label>
          <MapPin size={12} /> Dirección
        </Label>
        <p className="text-lg font-semibold transition-colors group-hover:text-brinell-yellow sm:text-xl">
          {company.address.street}
        </p>
        <p className="mt-1 text-sm text-white/45">
          {company.address.city}, {company.address.country} · Coordenadas{" "}
          {company.address.lat.toFixed(4)}, {company.address.lng.toFixed(4)}
        </p>
        <Arrow />
      </SpotlightCard>
    </motion.div>
  );
}

function Arrow() {
  return (
    <span className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center border border-white/10 text-white/40 transition-all duration-300 group-hover:border-brinell-yellow group-hover:bg-brinell-yellow group-hover:text-[#070a10]">
      <ArrowUpRight size={14} />
    </span>
  );
}
