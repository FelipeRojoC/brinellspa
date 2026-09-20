"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, Mail, MessageCircle } from "lucide-react";
import { company } from "@/data/company";

const serviceOptions = [
  "Ingeniería y diseño de herramientas",
  "Metrología, fabricación y mecanizado",
  "Fabricación y reparación de estructuras",
  "Arenado, granallado y pintura industrial",
  "Otro requerimiento",
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
  servicio: serviceOptions[0],
  mensaje: "",
};

function validate(f: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (f.nombre.trim().length < 2) errors.nombre = "Ingresa tu nombre.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    errors.email = "Correo no válido.";
  if (f.mensaje.trim().length < 10)
    errors.mensaje = "Cuéntanos un poco más (mín. 10 caracteres).";
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

const inputClass =
  "peer w-full border-b border-[#d5dae2] bg-transparent px-0 pb-3 pt-6 text-[15px] text-[#151a24] outline-none transition-colors duration-300 placeholder:text-transparent focus:border-brinell-blue";

const labelClass =
  "pointer-events-none absolute left-0 top-6 text-[15px] text-[#9aa3b2] transition-all duration-300 peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-brinell-blue peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]";

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState<"whatsapp" | "email" | null>(null);

  const update =
    (key: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFields((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

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

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brinell-blue text-white">
              <Check size={28} />
            </div>
            <h3 className="mt-6 text-2xl font-bold tracking-[-0.03em] text-[#151a24]">
              ¡Mensaje preparado!
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#687386]">
              {sent === "whatsapp"
                ? "Se abrió WhatsApp con tu solicitud lista para enviar. Si no se abrió, revisa el bloqueador de ventanas."
                : "Se abrió tu cliente de correo con la solicitud lista para enviar."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(null);
                setFields(empty);
              }}
              className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-brinell-blue hover:underline"
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
            className="space-y-2"
          >
            <div className="grid gap-x-8 sm:grid-cols-2">
              <Field label="Nombre *" error={errors.nombre}>
                <input
                  className={inputClass}
                  placeholder="Nombre"
                  value={fields.nombre}
                  onChange={update("nombre")}
                  autoComplete="name"
                />
              </Field>

              <Field label="Empresa">
                <input
                  className={inputClass}
                  placeholder="Empresa"
                  value={fields.empresa}
                  onChange={update("empresa")}
                  autoComplete="organization"
                />
              </Field>

              <Field label="Correo *" error={errors.email}>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="Correo"
                  value={fields.email}
                  onChange={update("email")}
                  autoComplete="email"
                />
              </Field>

              <Field label="Teléfono">
                <input
                  type="tel"
                  className={inputClass}
                  placeholder="Teléfono"
                  value={fields.telefono}
                  onChange={update("telefono")}
                  autoComplete="tel"
                />
              </Field>
            </div>

            {/* SERVICIO */}
            <div className="pt-4">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9aa3b2]">
                ¿Qué necesitas?
              </p>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((opt) => {
                  const active = fields.servicio === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFields((f) => ({ ...f, servicio: opt }))}
                      className={`border px-3.5 py-2 text-xs font-medium transition-all duration-300 ${
                        active
                          ? "border-brinell-blue bg-brinell-blue text-white shadow-[0_8px_25px_rgba(73,120,222,0.25)]"
                          : "border-[#d5dae2] bg-white text-[#596273] hover:border-[#9aa3b2]"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <Field label="Cuéntanos tu requerimiento *" error={errors.mensaje}>
              <textarea
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Mensaje"
                value={fields.mensaje}
                onChange={update("mensaje")}
              />
            </Field>

            {/* ACCIONES */}
            <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-3 bg-brinell-blue px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brinell-blue-dark hover:shadow-xl hover:shadow-brinell-blue/25"
              >
                <MessageCircle size={17} />
                Enviar por WhatsApp
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>

              <button
                type="button"
                onClick={() => send("email")}
                className="group inline-flex items-center justify-center gap-3 border border-[#d5dae2] bg-white px-7 py-4 text-sm font-semibold text-[#151a24] transition-all duration-300 hover:-translate-y-1 hover:border-[#151a24]"
              >
                <Mail size={17} />
                Enviar por correo
              </button>
            </div>

            <p className="pt-4 text-[11px] leading-5 text-[#9aa3b2]">
              Sin servidores de por medio: tu mensaje se abre directo en
              WhatsApp o en tu correo, listo para enviar.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative pb-5">
      {children}
      <label className={labelClass}>{label}</label>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 text-[11px] font-medium text-red-500"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
