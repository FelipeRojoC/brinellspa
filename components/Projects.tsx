"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "Fabricación y mecanizado",
    category: "Metalmecánica",
    image: "/images/projects/project-01.jpg",
    size: "large",
  },
  {
    number: "02",
    title: "Estructuras metálicas",
    category: "Fabricación",
    image: "/images/projects/project-02.jpg",
    size: "small",
  },
  {
    number: "03",
    title: "Reparación industrial",
    category: "Mantenimiento",
    image: "/images/projects/project-03.jpg",
    size: "small",
  },
  {
    number: "04",
    title: "Soluciones para minería",
    category: "Industria minera",
    image: "/images/projects/project-04.jpg",
    size: "large",
  },
];

export default function Projects() {
  return (
    <section
      id="proyectos"
      className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* CABECERA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col gap-7 lg:mb-20 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-brinell-blue">
              Trabajos realizados
            </p>

            <h2 className="text-4xl font-bold leading-[0.95] tracking-[-0.045em] text-[#151a24] sm:text-5xl lg:text-6xl">
              El trabajo
              <br />
              <span className="text-brinell-blue">
                habla por nosotros.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#687386] lg:pb-1 lg:text-right">
            Una selección de trabajos y soluciones desarrolladas para
            requerimientos industriales y metalmecánicos.
          </p>
        </motion.div>

        {/* PROYECTOS */}
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.a
              key={project.number}
              href="#contacto"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
              className={`
                group relative overflow-hidden
                bg-[#111722]
                ${
                  project.size === "large"
                    ? "min-h-[460px] sm:min-h-[560px]"
                    : "min-h-[360px] sm:min-h-[420px]"
                }
              `}
            >
              {/* IMAGEN */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="
                  object-cover
                  transition-transform duration-700 ease-out
                  group-hover:scale-105
                "
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1019]/95 via-[#0b1019]/25 to-transparent" />

              {/* OVERLAY HOVER */}
              <div className="absolute inset-0 bg-brinell-blue/0 transition-colors duration-500 group-hover:bg-brinell-blue/10" />

              {/* BORDE */}
              <div className="absolute inset-0 border border-black/5 transition-colors duration-500 group-hover:border-brinell-blue/60" />

              {/* NÚMERO */}
              <div className="absolute left-6 top-6 sm:left-8 sm:top-8">
                <span className="text-xs font-semibold tracking-[0.2em] text-white/60">
                  {project.number}
                </span>
              </div>

              {/* FLECHA */}
              <div
                className="
                  absolute right-6 top-6
                  flex h-11 w-11 items-center justify-center
                  rounded-full
                  border border-white/25
                  bg-white/5
                  text-white
                  backdrop-blur-md
                  transition-all duration-500
                  group-hover:-translate-y-1
                  group-hover:bg-brinell-blue
                  group-hover:border-brinell-blue
                  sm:right-8 sm:top-8
                "
              >
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>

              {/* INFORMACIÓN */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-8 bg-brinell-yellow transition-all duration-500 group-hover:w-12" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brinell-yellow">
                    {project.category}
                  </span>
                </div>

                <h3 className="max-w-xl text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                  {project.title}
                </h3>

                <div className="mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 group-hover:text-white">
                  Ver proyecto
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CIERRE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="
            mt-10 flex flex-col gap-5
            border-t border-[#e2e6ec]
            pt-7
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <p className="text-sm text-[#687386]">
            Soluciones diseñadas para responder a las exigencias de la
            industria.
          </p>

          <a
            href="#contacto"
            className="
              group inline-flex items-center gap-3
              text-sm font-semibold text-[#151a24]
              transition-colors duration-300
              hover:text-brinell-blue
            "
          >
            Solicitar información

            <span
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full
                border border-[#d9dee6]
                transition-all duration-300
                group-hover:border-brinell-blue
                group-hover:bg-brinell-blue
                group-hover:text-white
              "
            >
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}