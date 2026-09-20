"use client";

import { useEffect, useRef, useState } from "react";
import {
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  Popup,
  setWorkerUrl,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { company } from "@/data/company";

// Worker servido desde /public (ver scripts/copy-maplibre-worker.mjs)
setWorkerUrl("/vendor/maplibre/maplibre-gl-worker.mjs");

// Tiles vectoriales gratuitos, sin API key (OpenFreeMap / OpenStreetMap)
const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

const TARGET = {
  center: [company.address.lng, company.address.lat] as [number, number],
  zoom: 16.3,
  pitch: 58,
  bearing: -28,
};

export default function ContactMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [ready, setReady] = useState(false);
  const [flown, setFlown] = useState(false);
  const [inView, setInView] = useState(false);

  // Detectar cuándo el mapa entra en pantalla para lanzar el "vuelo"
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Crear el mapa
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new MapLibreMap({
      container: containerRef.current,
      style: STYLE_URL,
      center: TARGET.center,
      zoom: 11.5,
      pitch: 0,
      bearing: 0,
      attributionControl: { compact: true },
      cooperativeGestures: true,
    });

    map.addControl(
      new NavigationControl({ visualizePitch: true }),
      "top-right",
    );

    map.on("error", (e) => console.error("[mapa]", e.error));

    map.on("load", () => {
      // Marcador personalizado con pulso
      const el = document.createElement("div");
      el.className = "brinell-marker";
      el.innerHTML = `
        <span class="brinell-marker__pulse"></span>
        <span class="brinell-marker__pin"></span>
      `;

      const popup = new Popup({
        offset: 34,
        closeButton: false,
        className: "brinell-popup",
      }).setHTML(`
        <strong>${company.name}</strong>
        <span>${company.address.street}</span>
        <span>${company.address.city}, ${company.address.country}</span>
      `);

      new Marker({ element: el, anchor: "bottom" })
        .setLngLat(TARGET.center)
        .setPopup(popup)
        .addTo(map);

      setReady(true);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Vuelo cinematográfico + rotación suave hasta que el usuario interactúe
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || !inView || flown) return;

    setFlown(true);

    map.flyTo({
      ...TARGET,
      duration: 3800,
      essential: true,
      curve: 1.4,
    });

    let rotating = false;
    let raf = 0;

    const spin = () => {
      if (!rotating) return;
      map.setBearing(map.getBearing() + 0.035);
      raf = requestAnimationFrame(spin);
    };

    const stop = () => {
      rotating = false;
      cancelAnimationFrame(raf);
    };

    map.once("moveend", () => {
      rotating = true;
      spin();
      map.once("mousedown", stop);
      map.once("touchstart", stop);
      map.once("wheel", stop);
    });

    return stop;
  }, [ready, inView, flown]);

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />

      {/* Loader */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-[#e9ecf1] transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#687386]">
          Cargando mapa…
        </span>
      </div>
    </div>
  );
}
