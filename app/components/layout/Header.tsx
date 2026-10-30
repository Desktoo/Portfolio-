"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { PALETTE_LIST } from "../../data/portfolioData";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const { paletteId, mode, currentPalette, setPaletteId, toggleMode } =
    useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-250"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg) 90%, transparent)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10">
        {/* Clean Google-Style Sans Masthead */}
        <a
          href="#about"
          className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight transition-opacity hover:opacity-80 sm:text-xl"
          style={{ color: "var(--text-primary)" }}
        >
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <span>Akshat Krishan</span>
        </a>

        {/* Clean Geometric Sans Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-normal transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls: 5-Palette Switcher & Light/Dark Toggle */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              aria-haspopup="listbox"
              aria-label="Select color palette"
              className="flex items-center gap-2.5 border-b pb-1 text-xs font-medium tracking-wide transition-opacity hover:opacity-80"
              style={{
                borderColor: "var(--accent)",
                color: "var(--text-primary)",
              }}
            >
              <span className="hidden sm:inline">{currentPalette.name}</span>
              <span className="flex items-center gap-1">
                {currentPalette.swatches.map((hex, i) => (
                  <span
                    key={i}
                    className="h-2.5 w-2.5 rounded-full border border-black/15"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  role="listbox"
                  aria-label="Color palettes"
                  className="absolute right-0 mt-3 w-72 rounded-xl border p-3 shadow-2xl"
                  style={{
                    backgroundColor: "var(--bg)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div
                    className="mb-2 flex items-center justify-between border-b pb-1.5 font-mono text-[10px] uppercase tracking-wider"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <span>5 Color Palettes</span>
                    <span>{mode}</span>
                  </div>

                  <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                    {PALETTE_LIST.map((p) => {
                      const active = p.id === paletteId;
                      const previewColors = p[mode];
                      return (
                        <button
                          key={p.id}
                          type="button"
                          role="option"
                          aria-selected={active}
                          onClick={() => {
                            setPaletteId(p.id);
                            setDropdownOpen(false);
                          }}
                          className="flex w-full items-center justify-between py-2.5 text-left transition-opacity hover:opacity-80"
                        >
                          <div>
                            <div
                              className="flex items-center gap-1.5 font-display text-sm font-semibold"
                              style={{ color: "var(--text-primary)" }}
                            >
                              <span>{p.name}</span>
                              {active && (
                                <Check
                                  className="h-3.5 w-3.5"
                                  style={{ color: "var(--accent)" }}
                                />
                              )}
                            </div>
                            <div
                              className="text-[11px]"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {p.subtitle}
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <span
                              className="h-3.5 w-3.5 rounded-full border border-black/20"
                              style={{ backgroundColor: previewColors.bg }}
                              title={`BG: ${previewColors.bg}`}
                            />
                            <span
                              className="h-3.5 w-3.5 rounded-full border border-black/20"
                              style={{ backgroundColor: previewColors.surface }}
                              title={`Surface: ${previewColors.surface}`}
                            />
                            <span
                              className="h-3.5 w-3.5 rounded-full border border-black/20"
                              style={{ backgroundColor: previewColors.accent }}
                              title={`Accent: ${previewColors.accent}`}
                            />
                            <span
                              className="h-3.5 w-3.5 rounded-full border border-black/20"
                              style={{ backgroundColor: previewColors.textPrimary }}
                              title={`Text: ${previewColors.textPrimary}`}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleMode}
            aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
            className="p-1.5 transition-transform hover:scale-110 active:scale-95"
            style={{ color: "var(--accent)" }}
            title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
          >
            {mode === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation drawer"
            aria-expanded={mobileMenuOpen}
            className="p-1 md:hidden"
            style={{ color: "var(--text-primary)" }}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile Navigation"
            className="overflow-hidden border-t md:hidden"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex flex-col space-y-3 px-6 py-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-base font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
