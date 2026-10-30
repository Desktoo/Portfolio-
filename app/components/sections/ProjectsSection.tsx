"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { PROJECTS_DATA, SIDE_PROJECTS_DATA } from "../../data/portfolioData";
import ProjectArchitectureDiagram from "../svg/ProjectArchitectureDiagram";

export default function ProjectsSection() {
  const [openSideId, setOpenSideId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenSideId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="projects"
      aria-label="Projects, Renders and Side Explorations"
      className="scroll-mt-20 border-b py-16 sm:py-24"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Part 1: Flagship Full-Stack Products */}
      <div
        className="mb-12 border-b pb-6"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="mb-2 font-mono text-xs font-medium uppercase tracking-wider"
          style={{ color: "var(--accent)" }}
        >
          03 / Featured Builds
        </div>
        <h2
          className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ color: "var(--text-primary)" }}
        >
          Full-Stack Products &amp; Systems
        </h2>
      </div>

      {/* Open Unboxed Blog-Style Project Articles */}
      <div className="divide-y" style={{ borderColor: "var(--border)" }}>
        {PROJECTS_DATA.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="group grid grid-cols-1 items-center gap-8 py-12 first:pt-2 last:pb-2 sm:grid-cols-12"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Left Side: Unboxed Artistic Non-Tech Visual Vignette */}
            <div className="sm:col-span-4">
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                <ProjectArchitectureDiagram type={project.diagramType} />
              </div>
            </div>

            {/* Right Side: Clean Google-Style Sans Typography */}
            <div className="sm:col-span-8">
              <div className="flex items-center gap-3">
                {project.logo && (
                  <div
                    className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-white p-1 shadow-xs"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <Image
                      src={project.logo}
                      alt={`${project.title} logo`}
                      width={32}
                      height={32}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <h3
                    className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                  </h3>
                  <div
                    className="font-mono text-xs font-medium"
                    style={{ color: "var(--accent)" }}
                  >
                    {project.category}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p
                className="mt-3 font-sans text-sm leading-[1.8] sm:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.architectureBreakdown}
              </p>

              {/* Inline Tech Stack List (No Boxes) */}
              <div
                className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.techStack.map((tech, tIdx) => (
                  <React.Fragment key={tech}>
                    <span
                      className="font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {tech}
                    </span>
                    {tIdx < project.techStack.length - 1 && (
                      <span style={{ color: "var(--accent)" }}>•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Clean Underlined Action Links */}
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border-b pb-0.5 font-display text-sm font-medium tracking-tight transition-opacity hover:opacity-75"
                  style={{
                    borderColor: "var(--accent)",
                    color: "var(--text-primary)",
                  }}
                >
                  <span>GitHub Repository</span>
                  <ArrowUpRight
                    className="h-4 w-4"
                    style={{ color: "var(--accent)" }}
                  />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Part 2: Side Projects & Interactive Experiments (Accordion) */}
      <div className="mt-20 pt-4">
        <div
          className="mb-8 border-b pb-6"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="mb-2 font-mono text-xs font-medium uppercase tracking-wider"
            style={{ color: "var(--accent)" }}
          >
            03.B / Side Projects
          </div>
          <h3
            className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            Side Projects &amp; Experiments
          </h3>
        </div>

        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {SIDE_PROJECTS_DATA.map((item) => {
            const isOpen = openSideId === item.id;

            return (
              <div
                key={item.id}
                className="py-5 first:pt-2 last:pb-2"
                style={{ borderColor: "var(--border)" }}
              >
                {/* Compact Header Row: Title (Accordion Trigger) + Live Render & GitHub Links */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    className="group flex cursor-pointer items-center gap-2.5 text-left transition-opacity hover:opacity-80"
                  >
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      style={{ color: "var(--accent)" }}
                    />
                    {item.logo && (
                      <div
                        className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-white p-0.5 shadow-xs"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <Image
                          src={item.logo}
                          alt={`${item.title} logo`}
                          width={24}
                          height={24}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                    <span
                      className="font-display text-lg font-semibold tracking-tight sm:text-xl"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.title}
                    </span>
                    <span
                      className="hidden font-mono text-xs sm:inline"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      ({item.year})
                    </span>
                  </button>

                  <div className="flex items-center gap-5 pl-7 sm:pl-0">
                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 border-b pb-0.5 font-display text-xs font-medium tracking-tight transition-opacity hover:opacity-75 sm:text-sm"
                        style={{
                          borderColor: "var(--accent)",
                          color: "var(--text-primary)",
                        }}
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5"
                          style={{ color: "var(--accent)" }}
                        />
                      </a>
                    )}

                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 border-b pb-0.5 font-display text-xs font-medium tracking-tight transition-opacity hover:opacity-75 sm:text-sm"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Collapsible Accordion Body: Vibe, Description & Tech Stack */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 pl-6.5 sm:pl-12.5">
                        <div
                          className="font-mono text-[11px] font-medium uppercase tracking-wider"
                          style={{ color: "var(--accent)" }}
                        >
                          {item.vibe}
                        </div>

                        <p
                          className="mt-1.5 font-sans text-sm leading-[1.75] sm:text-base"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {item.description}
                        </p>

                        <div
                          className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {item.techStack.map((t, i) => (
                            <React.Fragment key={t}>
                              <span
                                className="font-medium"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {t}
                              </span>
                              {i < item.techStack.length - 1 && (
                                <span style={{ color: "var(--accent)" }}>•</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
