"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Footer() {
  const { currentPalette, mode } = useTheme();

  return (
    <footer
      className="border-t py-10 transition-colors"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg)",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center sm:px-10">
        <div
          className="text-xs font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          © {new Date().getFullYear()} Akshat Krishan ·{" "}
          <span style={{ color: "var(--accent)" }}>
            {currentPalette.name} ({mode})
          </span>
        </div>

        <a
          href="#about"
          className="inline-flex items-center gap-1.5 border-b pb-0.5 font-mono text-xs font-medium uppercase tracking-wider transition-opacity hover:opacity-75"
          style={{
            borderColor: "var(--accent)",
            color: "var(--text-primary)",
          }}
          aria-label="Return to top"
        >
          <span>Back to Top</span>
          <ArrowUp
            className="h-3.5 w-3.5"
            style={{ color: "var(--accent)" }}
          />
        </a>
      </div>
    </footer>
  );
}
