import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { company } from "@/data/company";

/**
 * La imagen que aparece cuando alguien pega el enlace en WhatsApp,
 * LinkedIn o un correo. Sin esto el enlace llega como un recuadro gris.
 *
 * Se genera al compilar, así que no cuesta nada en cada visita.
 */
export const alt = `${company.name} · Maestranza metalmecánica en Antofagasta`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(
    join(process.cwd(), "public/images/logo/brinell-logo.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          /* Satori dibuja los degradados radiales con bordes duros, así que
             el fondo se arma con uno lineal en diagonal. */
          backgroundImage:
            "linear-gradient(120deg, #070a10 0%, #0a1020 48%, #16294f 100%)",
          padding: "70px 80px",
          position: "relative",
        }}
      >

        <img src={logoSrc} alt="" width={340} style={{ objectFit: "contain" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#f0cc42",
              textTransform: "uppercase",
              maxWidth: 900,
            }}
          >
            Maestranza metalmecánica
          </div>
          <div
            style={{
              fontSize: 34,
              marginTop: 18,
              color: "rgba(255,255,255,0.62)",
              letterSpacing: "-0.01em",
            }}
          >
            Mecanizado de precisión y recuperación de componentes
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            paddingTop: 34,
            borderTop: "3px solid #3678e4",
            fontSize: 26,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          <span>{company.address.city}, Chile</span>
          <span style={{ color: "#3678e4" }}>·</span>
          <span>Desde {company.founded}</span>
          <span style={{ color: "#3678e4" }}>·</span>
          <span>brinell.cl</span>
        </div>
      </div>
    ),
    size,
  );
}
