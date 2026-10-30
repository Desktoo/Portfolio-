"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { HERO_DATA } from "../../data/portfolioData";

export default function HeroAboutSection() {
  return (
    <section
      id="about"
      aria-label="About Akshat Krishan"
      className="scroll-mt-20 border-b py-16 sm:py-24"
      style={{ borderColor: "var(--border)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex flex-col space-y-7"
      >
        {/* Name & Personality Headline */}
        <div>
          <h1
            className="font-display text-4xl leading-[1.08] font-semibold tracking-tight sm:text-6xl lg:text-[4rem]"
            style={{ color: "var(--text-primary)" }}
          >
            {HERO_DATA.name}
          </h1>
          <p
            className="mt-3 font-display text-xl font-medium tracking-tight sm:text-2xl"
            style={{ color: "var(--accent)" }}
          >
            {HERO_DATA.tagline}
          </p>
        </div>

        {/* Personality & Creative Philosophy Paragraphs (Unboxed) */}
        <div className="space-y-4">
          <p
            className="font-sans text-base leading-[1.8] font-normal sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            {HERO_DATA.bio}
          </p>
          <p
            className="font-sans text-base leading-[1.8] font-normal sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            {HERO_DATA.secondBio}
          </p>
        </div>

        {/* Clean Google-Style Action Links */}
        <div className="flex flex-wrap items-center gap-8 pt-2">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 border-b-2 pb-1 font-display text-base font-medium tracking-tight transition-opacity hover:opacity-75"
            style={{
              borderColor: "var(--accent)",
              color: "var(--text-primary)",
            }}
          >
            <span>Explore Projects &amp; Renders</span>
            <ArrowDownRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              style={{ color: "var(--accent)" }}
            />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 border-b-2 border-transparent pb-1 font-display text-base font-medium tracking-tight transition-opacity hover:opacity-75"
            style={{ color: "var(--text-secondary)" }}
          >
            <span>Say Hello</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
