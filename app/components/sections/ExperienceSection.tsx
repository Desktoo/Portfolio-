"use client";

import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCE_DATA } from "../../data/portfolioData";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Work Experience"
      className="scroll-mt-20 border-b py-16 sm:py-24"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Section Header */}
      <div
        className="mb-12 border-b pb-6"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="mb-2 font-mono text-xs font-medium uppercase tracking-wider"
          style={{ color: "var(--accent)" }}
        >
          02 / Experience
        </div>
        <h2
          className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ color: "var(--text-primary)" }}
        >
          Engineering &amp; Architecture
        </h2>
      </div>

      {/* Open Unboxed Blog Entries */}
      <div className="divide-y" style={{ borderColor: "var(--border)" }}>
        {EXPERIENCE_DATA.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="grid grid-cols-1 gap-6 py-10 first:pt-2 last:pb-2 md:grid-cols-12"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Left Margin Metadata */}
            <div className="md:col-span-4">
              <div
                className="font-mono text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--accent)" }}
              >
                {item.period}
              </div>
              <div
                className="mt-1.5 font-display text-lg font-semibold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {item.company}
              </div>
              <div
                className="mt-0.5 font-sans text-xs font-normal"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.location}
              </div>
            </div>

            {/* Right Column Content */}
            <div className="md:col-span-8">
              <h3
                className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
                style={{ color: "var(--text-primary)" }}
              >
                {item.role}
              </h3>

              {/* Bullet Points */}
              <ul className="mt-4 space-y-3">
                {item.bullets.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 font-sans text-sm leading-[1.75] sm:text-base"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--accent)" }}
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Inline Typography Tags (No Boxes) */}
              <div
                className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.skills.map((skill, sIdx) => (
                  <React.Fragment key={skill}>
                    <span
                      className="font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {skill}
                    </span>
                    {sIdx < item.skills.length - 1 && (
                      <span style={{ color: "var(--accent)" }}>•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
