"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { company } from "@/data/company";
import TiltCard from "./TiltCard";

export default function Clients() {
  return (
    <section
      id="clientes"
      className="relative overflow-hidden bg-white py-20 text-[#151a24] sm:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brinell-blue/[0.06] blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <h2 className="heading-hard text-4xl sm:text-5xl lg:text-6xl">
            Nuestros <em className="text-brinell-blue">clientes</em>
          </h2>
          <p className="max-w-sm text-sm leading-6 text-[#687386] sm:text-right">
            Minería, energía eólica y metalurgia de la Región de Antofagasta.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-px bg-[#e2e6ec] sm:grid-cols-3">
          {company.clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group"
            >
              <TiltCard
                max={5}
                className="relative flex h-32 items-center justify-center overflow-hidden bg-white px-6 sm:h-40 sm:px-10"
              >
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={320}
                    height={120}
                    className="max-h-[56px] w-auto object-contain opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-[64px]"
                  />
                ) : (
                  <span className="text-center text-2xl font-bold uppercase leading-none tracking-[-0.03em] text-[#151a24]/35 transition-colors duration-500 group-hover:text-[#151a24] sm:text-3xl">
                    GR
                    <span className="mt-1 block text-[10px] font-semibold tracking-[0.2em]">
                      Ingeniería
                    </span>
                  </span>
                )}

                <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-brinell-blue transition-all duration-500 group-hover:w-full" />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
