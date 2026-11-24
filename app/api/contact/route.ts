import { NextResponse } from "next/server";
import { company } from "@/data/company";

/**
 * Recibe el formulario y lo reenvía por correo.
 *
 * El destinatario vive en una variable de entorno, así que nunca viaja al
 * navegador ni queda expuesto a los rastreadores de direcciones.
 */

const TO = process.env.CONTACT_TO ?? company.emails.maestranza;

/**
 * Web3Forms responde en menos de un segundo. FormSubmit queda como
 * alternativa sin registro, pero tarda bastante más de lo que Vercel
 * permite a una función, así que conviene definir la clave.
 */
const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY;

/** Vercel corta las funciones del plan gratuito a los diez segundos. */
const UPSTREAM_TIMEOUT_MS = 8000;

const LIMITS = {
  nombre: 120,
  empresa: 120,
  email: 160,
  telefono: 40,
  servicio: 120,
  mensaje: 4000,
} as const;

type Field = keyof typeof LIMITS;

function clean(value: unknown, field: Field) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, LIMITS[field]);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  // Campo señuelo: los formularios automáticos lo rellenan, las personas no
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const nombre = clean(body.nombre, "nombre");
  const empresa = clean(body.empresa, "empresa");
  const email = clean(body.email, "email");
  const telefono = clean(body.telefono, "telefono");
  const servicio = clean(body.servicio, "servicio");
  const mensaje = clean(body.mensaje, "mensaje");

  if (nombre.length < 2 || mensaje.length < 10) {
    return NextResponse.json({ error: "Faltan datos." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Correo no válido." }, { status: 400 });
  }

  const payload = {
    _subject: `Cotización web · ${servicio || "Consulta"} · ${nombre}`,
    _replyto: email,
    _template: "table",
    Nombre: nombre,
    Empresa: empresa || "—",
    Correo: email,
    Teléfono: telefono || "—",
    Servicio: servicio || "—",
    Mensaje: mensaje,
  };

  const [url, upstreamBody] = WEB3FORMS_KEY
    ? [
        "https://api.web3forms.com/submit",
        JSON.stringify({ access_key: WEB3FORMS_KEY, to: TO, ...payload }),
      ]
    : [
        `https://formsubmit.co/ajax/${encodeURIComponent(TO)}`,
        JSON.stringify(payload),
      ];

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: upstreamBody,
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "No se pudo enviar el correo." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "El servicio de correo no respondió a tiempo." },
      { status: 504 },
    );
  }
}
