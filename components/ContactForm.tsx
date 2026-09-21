"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Mail,
  MessageCircle,
} from "lucide-react";
import { company } from "@/data/company";

const serviceOptions = [
  "ingeniería y diseño de herramientas",
  "metrología y mecanizado",
  "fabricación de estructuras",
  "arenado y pintura industrial",
  "otro requerimiento",
];

type Fields = {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  servicio: string;
  mensaje: string;
};

const empty: Fields = {
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  servicio: "",
  mensaje: "",
};

function validate(f: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (f.nombre.trim().length < 2) errors.nombre = "tu nombre";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    errors.email = "un correo válido";
  if (!f.servicio) errors.servicio = "el servicio";
  if (f.mensaje.trim().length < 10)
    errors.mensaje = "más detalle (mín. 10 caracteres)";
  return errors;
}

function buildMessage(f: Fields) {
  return [
    `Hola Brinell, quiero solicitar una cotización.`,
    ``,
    `*Nombre:* ${f.nombre}`,
    f.empresa && `*Empresa:* ${f.empresa}`,
    `*Correo:* ${f.email}`,
    f.telefono && `*Teléfono:* ${f.telefono}`,
    `*Servicio:* ${f.servicio}`,
    ``,
    `*Detalle:*`,
    f.mensaje,
  ]
    .filter((line): line is string => typeof line === "string")
    .join("\n");
}

/* Input que crece con el texto, embebido en la frase */
function Blank({
  value,
  placeholder,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
  error?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <span className="relative mx-1 inline-grid max-w-full align-baseline">
      <span
        aria-hidden
        className="invisible col-start-1 row-start-1 whitespace-pre px-2 font-semibold"
      >
        {value || placeholder}
      </span>
      <input
        type={type}
        size={1}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`col-start-1 row-start-1 w-full min-w-0 border-b-2 bg-transparent px-2 font-semibold text-brinell-yellow outline-none transition-colors duration-300 placeholder:font-normal placeholder:text-white/25 focus:border-brinell-yellow ${
          error
            ? "border-red-400"
            : value
              ? "border-brinell-yellow/60"
              : "border-white/25"
        }`}
      />
    </span>
  );
}

function ServicePicker({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <span ref={ref} className="relative z-40 mx-1 inline-block align-baseline">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-2 border-b-2 px-2 font-semibold transition-colors duration-300 ${
          error
            ? "border-red-400"
            : value
              ? "border-brinell-yellow/60 text-brinell-yellow"
              : "border-white/25 text-white/25"
        } hover:border-brinell-yellow`}
      >
        {value || "elegir servicio"}
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full z-50 mt-3 w-max max-w-[85vw] border border-white/10 bg-[#0d1220] p-2 text-base font-medium shadow-2xl shadow-black/60"
          >
            {serviceOptions.map((opt) => (
              <button
                key={opt}
                role="option"
                aria-selected={value === opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                  value === opt
                    ? "bg-brinell-yellow text-[#070a10]"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="h-1.5 w-1.5 rotate-45 bg-current" />
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const [sent, setSent] = useState<"whatsapp" | "email" | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const set = (key: keyof Fields) => (v: string) => {
    setFields((f) => ({ ...f, [key]: v }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { servicio, mensaje } = (
        e as CustomEvent<{ servicio: string; mensaje: string }>
      ).detail;
      setSent(null);
      setFields((f) => ({ ...f, servicio, mensaje }));
    };
    window.addEventListener("brinell:prefill", onPrefill);
    return () => window.removeEventListener("brinell:prefill", onPrefill);
  }, []);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${el.scrollHeight}px`;
  }, [fields.mensaje]);

  const required: (keyof Fields)[] = ["nombre", "email", "servicio", "mensaje"];
  const filled = required.filter((k) => fields[k].trim().length > 0).length;
  const progress = filled / required.length;

  const send = (via: "whatsapp" | "email") => {
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const body = buildMessage(fields);

    if (via === "whatsapp") {
      window.open(
        `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(body)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      const subject = `Cotización · ${fields.servicio} · ${fields.nombre}`;
      window.location.href = `mailto:${company.emails.maestranza}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body.replace(/\*/g, ""))}`;
    }
    setSent(via);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send("whatsapp");
  };

  const missing = Object.values(errors).filter(Boolean);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex min-h-[380px] flex-col items-start justify-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brinell-yellow text-[#070a10]">
              <Check size={28} strokeWidth={2.5} />
            </div>
            <h3 className="mt-8 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
              Listo, {fields.nombre.split(" ")[0]}.
            </h3>
            <p className="mt-4 max-w-md text-base leading-7 text-white/50">
              {sent === "whatsapp"
                ? "Se abrió WhatsApp con tu solicitud redactada. Solo presiona enviar."
                : "Se abrió tu correo con la solicitud redactada. Solo presiona enviar."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(null);
                setFields(empty);
              }}
              className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-brinell-yellow hover:underline"
            >
              Enviar otra solicitud
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={onSubmit}
            noValidate
          >
            {/* Progreso */}
            <div className="mb-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10">
                <motion.div
                  className="h-px bg-brinell-yellow"
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
                {filled}/{required.length} completado
              </span>
            </div>

            {/* La frase */}
            <div className="relative z-20 text-2xl font-light leading-[1.8] tracking-[-0.02em] text-white/85 sm:text-3xl sm:leading-[1.75] lg:text-[2.6rem] lg:leading-[1.7]">
              Hola Brinell, soy
              <Blank
                value={fields.nombre}
                placeholder="tu nombre"
                onChange={set("nombre")}
                error={!!errors.nombre}
                autoComplete="name"
              />
              de
              <Blank
                value={fields.empresa}
                placeholder="tu empresa"
                onChange={set("empresa")}
                autoComplete="organization"
              />
              . Necesito
              <ServicePicker
                value={fields.servicio}
                onChange={set("servicio")}
                error={!!errors.servicio}
              />
              . Escríbanme a
              <Blank
                value={fields.email}
                placeholder="tu correo"
                onChange={set("email")}
                error={!!errors.email}
                type="email"
                autoComplete="email"
              />
              o al
              <Blank
                value={fields.telefono}
                placeholder="tu teléfono"
                onChange={set("telefono")}
                type="tel"
                autoComplete="tel"
              />
              .
            </div>

            {/* Detalle */}
            <div className="relative mt-10">
              <textarea
                ref={textareaRef}
                rows={1}
                value={fields.mensaje}
                onChange={(e) => set("mensaje")(e.target.value)}
                placeholder="Detalle: piezas, cantidades, planos, plazos…"
                className={`min-h-[5.5rem] w-full resize-none overflow-hidden border-b-2 bg-transparent pb-4 pt-2 text-lg font-light leading-8 text-white outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-brinell-yellow sm:text-xl ${
                  errors.mensaje ? "border-red-400" : "border-white/20"
                }`}
              />
            </div>

            <AnimatePresence>
              {missing.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-sm text-red-400"
                >
                  Falta {missing.join(", ")}.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Acciones */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton type="submit" primary>
                <MessageCircle size={17} />
                Enviar por WhatsApp
                <ArrowUpRight size={16} />
              </MagneticButton>
              <MagneticButton type="button" onClick={() => send("email")}>
                <Mail size={17} />
                Enviar por correo
              </MagneticButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function MagneticButton({
  children,
  primary,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { primary?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      animate={offset}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setOffset({
          x: (e.clientX - (r.left + r.width / 2)) * 0.25,
          y: (e.clientY - (r.top + r.height / 2)) * 0.35,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className={`inline-flex items-center justify-center gap-3 px-7 py-4 text-sm font-bold transition-colors duration-300 ${
        primary
          ? "bg-brinell-yellow text-[#070a10] hover:bg-white"
          : "border border-white/20 text-white/70 hover:border-white hover:text-white"
      }`}
      {...(props as object)}
    >
      {children}
    </motion.button>
  );
}
