import { MessageCircle } from "lucide-react";
import { company } from "@/data/company";

/**
 * Botón flotante de WhatsApp.
 *
 * El latido y el anillo van en elementos distintos del que crece al pasar
 * el cursor: una animación y una transición sobre la misma propiedad en el
 * mismo elemento se pisan, y ganaría siempre la animación.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${company.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      /* Anclado: no se desliza con el resto al cambiar de página */
      style={{ viewTransitionName: "whatsapp-fab" }}
      className="wa-button group fixed bottom-5 right-5 z-[100] block h-14 w-14 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
    >
      {/* Anillo que se expande cada pocos segundos */}
      <span
        aria-hidden
        className="wa-ring absolute inset-0 rounded-full bg-[#25D366]"
      />

      <span className="wa-breath absolute inset-0">
        <span className="flex h-full w-full items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_14px_40px_rgba(37,211,102,0.5)]">
          <MessageCircle
            size={26}
            strokeWidth={1.9}
            className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 sm:h-7 sm:w-7"
          />
        </span>
      </span>
    </a>
  );
}
