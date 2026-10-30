"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { CONTACT_DATA, PALETTE_LIST } from "../../data/portfolioData";
import QuickAccessMenu from "./QuickAccessMenu";

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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setTimeout(() => {
        const headerOffset = 64;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        window.history.pushState(null, "", href);
      }, 60);
    }
  };

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
          onClick={(e) => handleNavClick(e, "#about")}
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
              onClick={(e) => handleNavClick(e, link.href)}
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

        {/* Right Controls: Animated Quick Access, 5-Palette Switcher & Light/Dark Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <QuickAccessMenu />

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
                  key="palette-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setDropdownOpen(false)}
                  aria-hidden="true"
                  className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] sm:hidden"
                />
              )}
              {dropdownOpen && (
                <motion.div
                  key="palette-dropdown"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  role="listbox"
                  aria-label="Color palettes"
                  className="fixed left-4 right-4 top-18 z-50 origin-top rounded-xl border p-3 shadow-2xl max-h-[85vh] overflow-y-auto sm:absolute sm:top-full sm:left-auto sm:right-0 sm:mt-3 sm:w-72 sm:origin-top-right sm:max-h-none"
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
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-display text-base font-medium py-1 transition-opacity active:opacity-60"
                  style={{ color: "var(--text-primary)" }}
                >
                  {link.label}
                </a>
              ))}

              {/* Quick Access Mobile Shortcut Box */}
              <div
                className="mt-3 border-t pt-3"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--accent)" }}
                >
                  Quick Access Links
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={CONTACT_DATA.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border p-2 text-xs font-semibold"
                    style={{
                      borderColor: "var(--accent)",
                      backgroundColor:
                        "color-mix(in srgb, var(--accent) 12%, var(--surface))",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span>Resume (PDF)</span>
                    <ArrowUpRight
                      className="h-3 w-3"
                      style={{ color: "var(--accent)" }}
                    />
                  </a>
                  <a
                    href={CONTACT_DATA.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border p-2 text-xs font-semibold"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--surface)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span>GitHub</span>
                    <ArrowUpRight
                      className="h-3 w-3"
                      style={{ color: "var(--accent)" }}
                    />
                  </a>
                  <a
                    href={CONTACT_DATA.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border p-2 text-xs font-semibold"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--surface)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight
                      className="h-3 w-3"
                      style={{ color: "var(--accent)" }}
                    />
                  </a>
                  <a
                    href={CONTACT_DATA.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border p-2 text-xs font-semibold"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--surface)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span>Twitter / X</span>
                    <ArrowUpRight
                      className="h-3 w-3"
                      style={{ color: "var(--accent)" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
