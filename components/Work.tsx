"use client";

import { motion } from "motion/react";
import { Camera } from "lucide-react";
import { company } from "@/data/company";
import TiltCard from "./TiltCard";

export default function Work() {
  return (
    <section
      id="trabajos"
      className="plate plate-veil relative overflow-hidden py-24 text-white sm:py-28 lg:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 flex items-baseline justify-between gap-6">
          <h2 className="heading-hard text-4xl sm:text-5xl lg:text-6xl">
            Trabajos <em className="text-brinell-yellow">realizados</em>
          </h2>
          <p className="font-mono text-xs text-white/35">Antofagasta</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {company.services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group"
            >
              <TiltCard className="relative flex aspect-[4/3] flex-col justify-end overflow-hidden border border-white/10 bg-[#0b0e14]/85 p-6 backdrop-blur-sm hover:border-brinell-yellow">
                <div className="absolute inset-0 flex items-center justify-center text-white/[0.07] transition-colors duration-500 group-hover:text-white/15">
                  <Camera size={56} strokeWidth={1} />
                </div>

                <div className="relative">
                  <span className="font-mono text-xs text-brinell-yellow">
                    {service.number}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.02em]">
                    {service.short}
                  </h3>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 font-mono text-xs text-white/30">
          Galería pendiente de fotografías del taller.
        </p>
      </div>
    </section>
  );
}
