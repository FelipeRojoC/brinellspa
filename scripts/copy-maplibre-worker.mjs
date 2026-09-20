// Copia el worker de MapLibre a /public para que el navegador lo cargue
// desde el mismo origen (Turbopack no resuelve `new URL(..., import.meta.url)`).
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, "node_modules/maplibre-gl/dist");
const dest = join(root, "public/vendor/maplibre");

mkdirSync(dest, { recursive: true });
for (const file of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  copyFileSync(join(src, file), join(dest, file));
}
console.log("maplibre worker copiado a public/vendor/maplibre");
