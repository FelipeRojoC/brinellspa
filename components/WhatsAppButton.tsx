"use client";

import { MessageCircle } from "lucide-react";
import { company } from "@/data/company";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${company.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="
        group
        fixed
        bottom-6
        right-6
        z-[100]
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-xl
        transition-all
        duration-300
        hover:scale-110
        hover:shadow-2xl
        sm:bottom-8
        sm:right-8
        sm:h-16
        sm:w-16
      "
    >
      <MessageCircle
        size={28}
        strokeWidth={1.8}
        className="transition-transform duration-300 group-hover:scale-110"
      />
    </a>
  );
}