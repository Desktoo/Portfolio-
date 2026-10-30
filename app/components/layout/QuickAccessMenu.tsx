"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Download,
  FileText,
  Zap,
} from "lucide-react";
import { CONTACT_DATA } from "../../data/portfolioData";

export default function QuickAccessMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_DATA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const quickLinks = [
    {
      label: "GitHub",
      handle: "@desktoo",
      href: CONTACT_DATA.github,
      badge: "Code & Repos",
      icon: (
        <svg
          className="h-4 w-4 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      handle: "in/akshat-krishan",
      href: CONTACT_DATA.linkedin,
      badge: "Professional",
      icon: (
        <svg
          className="h-4 w-4 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61s.72 1.61 1.61 1.61 1.61-.72 1.61-1.61c0-.89-.72-1.61-1.61-1.61Z" />
        </svg>
      ),
    },
    {
      label: "Twitter / X",
      handle: "@Akshat_krishan",
      href: CONTACT_DATA.twitter,
      badge: "Updates & Thoughts",
      icon: (
        <svg
          className="h-4 w-4 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Animated Quick Access Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Toggle Quick Access menu (Resume, GitHub, LinkedIn, Twitter)"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="group relative inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 select-none cursor-pointer shadow-sm hover:shadow-md"
        style={{
          borderColor: isOpen ? "var(--accent)" : "var(--border)",
          backgroundColor: isOpen
            ? "color-mix(in srgb, var(--accent) 12%, var(--bg))"
            : "color-mix(in srgb, var(--surface) 60%, var(--bg))",
          color: "var(--text-primary)",
        }}
      >
        {/* Pulsing Beacon Dot */}
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
        </span>

        {/* Animated Icon & Label */}
        <span className="flex items-center gap-1.5">
          <Zap
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12"
            style={{ color: "var(--accent)" }}
          />
          <span className="hidden sm:inline font-display font-semibold">Quick Access</span>
          <span className="sm:hidden font-display font-semibold text-[11px]">Quick Access</span>
        </span>

        {/* Rotating Chevron */}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 opacity-60 group-hover:opacity-100 ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{ color: "var(--accent)" }}
        />
      </motion.button>

      {/* Popover Card & Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="quick-access-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] sm:hidden"
          />
        )}
        {isOpen && (
          <motion.div
            key="quick-access-popover"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            role="dialog"
            aria-label="Quick Access Links"
            className="fixed left-3 right-3 top-18 z-50 max-h-[85vh] overflow-y-auto origin-top rounded-2xl border p-4 shadow-2xl backdrop-blur-xl sm:absolute sm:top-full sm:left-auto sm:right-0 sm:mt-2.5 sm:w-88 sm:origin-top-right sm:max-h-none"
            style={{
              backgroundColor: "color-mix(in srgb, var(--bg) 96%, transparent)",
              borderColor: "var(--border)",
            }}
          >
            {/* Featured Primary Action: Resume PDF */}
            <div>
              <a
                href={CONTACT_DATA.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group relative flex items-center justify-between rounded-xl border p-3 transition-all duration-200 hover:shadow-md"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--accent) 8%, var(--surface))",
                  borderColor: "var(--accent)",
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-inner"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--bg)",
                    }}
                  >
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="font-display text-sm font-semibold tracking-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Resume / CV (PDF)
                    </div>
                    <div
                      className="truncate font-mono text-[11px]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Updated 2026 · Ready to Print / Save
                    </div>
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-transform group-hover:translate-x-0.5"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--bg)",
                  }}
                >
                  <span>View</span>
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </a>
            </div>

            {/* Social & Code Profiles */}
            <div className="mt-3 space-y-1.5">
              <div
                className="px-1 font-mono text-[10px] uppercase tracking-wider"
                style={{ color: "var(--text-secondary)" }}
              >
                Profiles &amp; Code
              </div>

              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors hover:opacity-90"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--surface) 40%, transparent)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "color-mix(in srgb, var(--accent) 12%, var(--surface))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "color-mix(in srgb, var(--surface) 40%, transparent)";
                  }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="transition-colors group-hover:scale-110"
                      style={{ color: "var(--accent)" }}
                    >
                      {link.icon}
                    </span>
                    <div className="min-w-0">
                      <div
                        className="font-display text-xs font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {link.label}
                      </div>
                      <div
                        className="truncate font-mono text-[10px]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {link.handle}
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight
                    className="h-3.5 w-3.5 shrink-0 opacity-50 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: "var(--accent)" }}
                  />
                </a>
              ))}
            </div>

            {/* Quick 1-Click Email Copy Action */}
            <div
              className="mt-3 border-t pt-2.5"
              style={{ borderColor: "var(--border)" }}
            >
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors cursor-pointer"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--surface) 35%, transparent)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "color-mix(in srgb, var(--accent) 12%, var(--surface))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "color-mix(in srgb, var(--surface) 35%, transparent)";
                }}
              >
                <div className="min-w-0 flex-1">
                  <div
                    className="font-mono text-[10px] uppercase tracking-wider"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Direct Email
                  </div>
                  <div
                    className="truncate font-sans text-xs font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {CONTACT_DATA.email}
                  </div>
                </div>

                <div
                  className="ml-2 inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[10px] font-medium transition-colors"
                  style={{
                    backgroundColor: copied
                      ? "var(--accent)"
                      : "color-mix(in srgb, var(--accent) 15%, transparent)",
                    color: copied ? "var(--bg)" : "var(--accent)",
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
