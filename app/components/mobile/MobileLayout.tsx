"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  FileText,
  FolderGit2,
  Loader2,
  Mail,
  Moon,
  Music2,
  Pause,
  Play,
  Send,
  SkipForward,
  Sparkles,
  Sun,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import {
  CONTACT_DATA,
  EXPERIENCE_DATA,
  HERO_DATA,
  PALETTE_LIST,
  PROJECTS_DATA,
  SIDE_PROJECTS_DATA,
} from "../../data/portfolioData";
import { PaletteId } from "../../types/portfolio";

const SOOTHING_TRACKS = [
  { id: "1", title: "Gymnopédie No. 1", artist: "Erik Satie", src: "/audio/gymnopedie-1.ogg" },
  { id: "2", title: "Clair de Lune", artist: "Claude Debussy", src: "/audio/clair-de-lune.ogg" },
  { id: "3", title: "Gnossienne No. 1", artist: "Erik Satie", src: "/audio/gnossienne-1.ogg" },
  { id: "4", title: "Première Arabesque", artist: "Claude Debussy", src: "/audio/arabesque-1.ogg" },
  { id: "5", title: "Gnossienne No. 3", artist: "Erik Satie", src: "/audio/gnossienne-3.ogg" },
];

const GithubIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61s.72 1.61 1.61 1.61 1.61-.72 1.61-1.61c0-.89-.72-1.61-1.61-1.61Z" />
  </svg>
);

const TwitterIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function MobileLayout() {
  const { paletteId, mode, setPaletteId, toggleMode } = useTheme();

  // Active section tracking for bottom dock & sticky pill bar
  const [activeTab, setActiveTab] = useState<"about" | "projects" | "experience" | "contact">("about");

  // Side Projects Accordion State
  const [openSideId, setOpenSideId] = useState<string | null>(null);

  const toggleSideAccordion = (id: string) => {
    setOpenSideId((prev) => (prev === id ? null : id));
  };

  // Theme Sheet & Audio Controls
  const [themeSheetOpen, setThemeSheetOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Email Copy State
  const [copied, setCopied] = useState(false);

  // Contact Form
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Audio Playback Handler
  const currentTrack = SOOTHING_TRACKS[currentTrackIdx];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIdx + 1) % SOOTHING_TRACKS.length;
    setCurrentTrackIdx(nextIdx);
    if (audioRef.current) {
      audioRef.current.src = SOOTHING_TRACKS[nextIdx].src;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_DATA.email);
    } catch {
      // fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (id: string, tab: "about" | "projects" | "experience" | "contact") => {
    setActiveTab(tab);
    const el = document.getElementById(id);
    if (el) {
      const offset = 68;
      const elPos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: elPos, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setFormError(data.error || "Failed to send message.");
      } else {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 4000);
      }
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full pb-28 font-sans transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text-primary)",
      }}
    >
      {/* Hidden Audio Element for Mobile Ambient Audio */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="none"
        onEnded={nextTrack}
      />

      {/* 1. Mobile App Top Bar */}
      <header
        className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b px-4 backdrop-blur-xl"
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg) 92%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg font-mono text-xs font-bold text-white shadow-xs"
            style={{ backgroundColor: "var(--accent)" }}
          >
            AK
          </div>
          <div>
            <div className="font-display text-sm font-semibold tracking-tight leading-tight">
              Akshat Krishan
            </div>
            <div
              className="font-mono text-[10px] font-medium leading-none"
              style={{ color: "var(--text-secondary)" }}
            >
              Full-Stack &amp; Cloud
            </div>
          </div>
        </div>

        {/* Quick Top Actions: Ambient Audio & Theme Switcher */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setAudioOpen((prev) => !prev)}
            aria-label="Toggle ambient music controls"
            className="flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium transition-transform active:scale-95"
            style={{
              borderColor: "var(--border)",
              backgroundColor: isPlaying
                ? "color-mix(in srgb, var(--accent) 15%, transparent)"
                : "color-mix(in srgb, var(--surface) 50%, transparent)",
              color: isPlaying ? "var(--accent)" : "var(--text-primary)",
            }}
          >
            <Music2 className={`h-3.5 w-3.5 ${isPlaying ? "animate-pulse" : ""}`} />
            <span className="font-mono text-[11px]">{isPlaying ? "Playing" : "Lo-Fi"}</span>
          </button>

          <button
            type="button"
            onClick={() => setThemeSheetOpen(true)}
            aria-label="Customize theme"
            className="flex h-8 w-8 items-center justify-center rounded-full border transition-transform active:scale-95"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "color-mix(in srgb, var(--surface) 50%, transparent)",
              color: "var(--text-primary)",
            }}
          >
            {mode === "dark" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
          </button>
        </div>
      </header>

      {/* Ambient Lo-Fi Mini Bar (Expands smoothly on Mobile) */}
      <AnimatePresence>
        {audioOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b px-4 py-2"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "color-mix(in srgb, var(--surface) 60%, transparent)",
            }}
          >
            <div className="flex items-center justify-between gap-3 text-xs">
              <div className="min-w-0 flex-1">
                <div
                  className="truncate font-mono text-[10px] uppercase tracking-wider"
                  style={{ color: "var(--accent)" }}
                >
                  Ambient Vinyl ({currentTrackIdx + 1}/{SOOTHING_TRACKS.length})
                </div>
                <div className="truncate font-medium text-xs">
                  {currentTrack.title} — {currentTrack.artist}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-white shadow-xs"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={nextTrack}
                  className="flex h-7 w-7 items-center justify-center rounded-full border"
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                >
                  <SkipForward className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="px-4 pt-4 space-y-8">
        {/* 2. Hero Card: High-Impact & Bite-Sized */}
        <section id="m-about" className="scroll-mt-16">
          <div
            className="rounded-2xl border p-5 shadow-xs"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "color-mix(in srgb, var(--surface) 35%, transparent)",
            }}
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-mono">
              <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: "var(--accent)" }} />
              <span className="font-medium" style={{ color: "var(--accent)" }}>
                Open to Full-Stack &amp; Cloud Roles
              </span>
            </div>

            <h1 className="mt-3.5 font-display text-2xl font-bold tracking-tight leading-tight">
              Akshat Krishan
            </h1>
            <p
              className="mt-1 font-sans text-xs leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Full-Stack &amp; Cloud-Native Engineer graduating B.Tech CSE in 2026. Building resilient backends, distributed queues, and polished interfaces.
            </p>

            {/* Quick Action Badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={CONTACT_DATA.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium shadow-xs transition-transform active:scale-95"
                style={{
                  backgroundColor: "var(--accent)",
                  borderColor: "var(--accent)",
                  color: "#FFFFFF",
                }}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Resume PDF</span>
              </a>

              <a
                href={CONTACT_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium shadow-xs transition-transform active:scale-95"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "color-mix(in srgb, var(--surface) 60%, transparent)",
                  color: "var(--text-primary)",
                }}
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={CONTACT_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium shadow-xs transition-transform active:scale-95"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "color-mix(in srgb, var(--surface) 60%, transparent)",
                  color: "var(--text-primary)",
                }}
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Core Tech Stack Mini Pills */}
            <div className="mt-4.5 border-t pt-3.5" style={{ borderColor: "var(--border)" }}>
              <div
                className="font-mono text-[10px] font-medium uppercase tracking-wider mb-2"
                style={{ color: "var(--accent)" }}
              >
                Core Stack
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {["Next.js 16", "NestJS", "TypeScript", "PostgreSQL", "BullMQ", "GKE GitOps", "DynamoDB"].map((s) => (
                  <span
                    key={s}
                    className="rounded-md border px-2 py-0.5"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "color-mix(in srgb, var(--surface) 40%, transparent)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Four Core Capabilities (Visual Chips, Zero Heavy Paragraphs) */}
        <section className="space-y-2.5">
          <div
            className="font-mono text-xs font-medium uppercase tracking-wider"
            style={{ color: "var(--accent)" }}
          >
            What I Build
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              {
                title: "Backend & Queues",
                desc: "Modular NestJS services, BullMQ queues, Redlock locks.",
              },
              {
                title: "Database Design",
                desc: "PostgreSQL models, DynamoDB logs, Redis/Mongo cache.",
              },
              {
                title: "Cloud & GitOps",
                desc: "GKE Kubernetes clusters, Helm charts, ArgoCD.",
              },
              {
                title: "Modern Frontend",
                desc: "Fast Next.js 16, TypeScript, Zustand state isolation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border p-3.5"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "color-mix(in srgb, var(--surface) 25%, transparent)",
                }}
              >
                <div
                  className="font-display text-xs font-semibold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </div>
                <div
                  className="mt-1 font-sans text-[11px] leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Featured Products (App-Style Cards with Logos) */}
        <section id="m-projects" className="scroll-mt-16 space-y-3.5">
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
            <div
              className="font-mono text-xs font-medium uppercase tracking-wider"
              style={{ color: "var(--accent)" }}
            >
              01 / Featured Projects
            </div>
            <span className="font-mono text-[10px]" style={{ color: "var(--text-secondary)" }}>
              {PROJECTS_DATA.length} Projects
            </span>
          </div>

          <div className="space-y-3.5">
            {PROJECTS_DATA.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl border p-4 shadow-xs"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "color-mix(in srgb, var(--surface) 35%, transparent)",
                }}
              >
                {/* Header Row: Logo Badge + Title & Category */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {proj.logo && (
                      <div
                        className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white p-1 shadow-xs"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <Image
                          src={proj.logo}
                          alt={`${proj.title} logo`}
                          width={36}
                          height={36}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h3
                        className="font-display text-lg font-bold tracking-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {proj.title}
                      </h3>
                      <div
                        className="font-mono text-[10px] font-medium"
                        style={{ color: "var(--accent)" }}
                      >
                        {proj.category}
                      </div>
                    </div>
                  </div>

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-transform active:scale-95"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-primary)",
                      backgroundColor: "color-mix(in srgb, var(--surface) 60%, transparent)",
                    }}
                    aria-label={`Open ${proj.title} repository`}
                  >
                    <ArrowUpRight className="h-4 w-4" style={{ color: "var(--accent)" }} />
                  </a>
                </div>

                {/* Metrics Pill Badge */}
                <div className="mt-2.5">
                  <span
                    className="inline-block rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium"
                    style={{
                      borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
                      backgroundColor: "color-mix(in srgb, var(--accent) 10%, transparent)",
                      color: "var(--accent)",
                    }}
                  >
                    {proj.metricsBadge}
                  </span>
                </div>

                {/* 1-Sentence Crisp Summary */}
                <p
                  className="mt-2 font-sans text-xs leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {proj.architectureBreakdown}
                </p>

                {/* Tech Chips */}
                <div className="mt-3 flex flex-wrap gap-1 font-mono text-[10px]">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border px-1.5 py-0.5"
                      style={{
                        borderColor: "var(--border)",
                        backgroundColor: "color-mix(in srgb, var(--surface) 30%, transparent)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Work Experience (Impact Cards with Logos) */}
        <section id="m-experience" className="scroll-mt-16 space-y-3.5">
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
            <div
              className="font-mono text-xs font-medium uppercase tracking-wider"
              style={{ color: "var(--accent)" }}
            >
              02 / Work Experience
            </div>
            <span className="font-mono text-[10px]" style={{ color: "var(--text-secondary)" }}>
              {EXPERIENCE_DATA.length} Roles
            </span>
          </div>

          <div className="space-y-3.5">
            {EXPERIENCE_DATA.map((exp) => (
              <div
                key={exp.id}
                className="rounded-2xl border p-4 shadow-xs"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "color-mix(in srgb, var(--surface) 35%, transparent)",
                }}
              >
                {/* Header: Logo + Role + Company + Period */}
                <div className="flex items-start gap-3">
                  {exp.logo && (
                    <div
                      className="relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-white p-1 shadow-xs"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={32}
                        height={32}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className="font-display text-base font-bold tracking-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {exp.company}
                      </div>
                      <span
                        className="font-mono text-[10px] font-medium"
                        style={{ color: "var(--accent)" }}
                      >
                        {exp.period}
                      </span>
                    </div>

                    <div className="font-sans text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                      {exp.role} • {exp.location}
                    </div>
                  </div>
                </div>

                {/* Bullets as Compact Impact Points */}
                <ul className="mt-3 space-y-2 border-t pt-2.5" style={{ borderColor: "var(--border)" }}>
                  {exp.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2 font-sans text-xs leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: "var(--accent)" }}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills tags */}
                <div className="mt-3 flex flex-wrap gap-1 font-mono text-[10px]">
                  {exp.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded border px-1.5 py-0.5"
                      style={{
                        borderColor: "var(--border)",
                        backgroundColor: "color-mix(in srgb, var(--surface) 25%, transparent)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Side Projects & Experiments (Mobile Accordion Cards with Descriptions) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "var(--border)" }}>
            <div
              className="font-mono text-xs font-medium uppercase tracking-wider"
              style={{ color: "var(--accent)" }}
            >
              03 / Side Projects &amp; Experiments
            </div>
            <span className="font-mono text-[10px]" style={{ color: "var(--text-secondary)" }}>
              {SIDE_PROJECTS_DATA.length} Projects
            </span>
          </div>

          <div className="space-y-2.5">
            {SIDE_PROJECTS_DATA.map((side) => {
              const isOpen = openSideId === side.id;

              return (
                <div
                  key={side.id}
                  className="rounded-xl border p-3.5 shadow-xs transition-colors"
                  style={{
                    borderColor: isOpen ? "var(--accent)" : "var(--border)",
                    backgroundColor: isOpen
                      ? "color-mix(in srgb, var(--surface) 40%, transparent)"
                      : "color-mix(in srgb, var(--surface) 22%, transparent)",
                  }}
                >
                  {/* Top Bar: Clickable Accordion Trigger + External Links */}
                  <div className="flex items-center justify-between gap-2.5">
                    <button
                      type="button"
                      onClick={() => toggleSideAccordion(side.id)}
                      aria-expanded={isOpen}
                      className="flex min-w-0 flex-1 items-center gap-2.5 text-left transition-opacity active:opacity-75 cursor-pointer"
                    >
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        style={{ color: "var(--accent)" }}
                      />

                      {side.logo && (
                        <div
                          className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-white p-0.5 shadow-xs"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <Image
                            src={side.logo}
                            alt={`${side.title} logo`}
                            width={28}
                            height={28}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="truncate font-display text-sm font-semibold tracking-tight">
                          {side.title}
                        </div>
                        <div
                          className="truncate font-mono text-[10px]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {side.vibe} ({side.year})
                        </div>
                      </div>
                    </button>

                    {/* External Action Links */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {side.liveUrl && (
                        <a
                          href={side.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md border px-2 py-1 font-mono text-[11px] font-medium"
                          style={{
                            borderColor: "var(--accent)",
                            color: "var(--accent)",
                            backgroundColor: "color-mix(in srgb, var(--accent) 10%, transparent)",
                          }}
                        >
                          Live
                        </a>
                      )}
                      <a
                        href={side.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-7 w-7 items-center justify-center rounded-md border transition-transform active:scale-95"
                        style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                        aria-label={`Open ${side.title} repository`}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Accordion Expandable Content: Description & Tech Stack */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 border-t pt-2.5 space-y-2" style={{ borderColor: "var(--border)" }}>
                          <p
                            className="font-sans text-xs leading-relaxed"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {side.description}
                          </p>

                          <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                            {side.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded border px-1.5 py-0.5"
                                style={{
                                  borderColor: "var(--border)",
                                  backgroundColor: "color-mix(in srgb, var(--surface) 30%, transparent)",
                                  color: "var(--text-primary)",
                                }}
                              >
                                {tech}
                              </span>
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
        </section>

        {/* 7. Contact Section (Direct 1-Tap Actions) */}
        <section id="m-contact" className="scroll-mt-16 space-y-3.5 pt-2">
          <div className="border-b pb-2" style={{ borderColor: "var(--border)" }}>
            <div
              className="font-mono text-xs font-medium uppercase tracking-wider"
              style={{ color: "var(--accent)" }}
            >
              04 / Get in Touch
            </div>
            <h2 className="mt-1 font-display text-xl font-bold tracking-tight">
              Let&apos;s Connect
            </h2>
          </div>

          <div
            className="rounded-2xl border p-4 shadow-xs space-y-4"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "color-mix(in srgb, var(--surface) 35%, transparent)",
            }}
          >
            {/* Quick 1-Tap Copy Email */}
            <div>
              <div
                className="font-mono text-[10px] uppercase tracking-wider mb-1"
                style={{ color: "var(--accent)" }}
              >
                Direct Email
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex w-full items-center justify-between rounded-xl border p-3 font-mono text-xs transition-transform active:scale-98"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "color-mix(in srgb, var(--surface) 50%, transparent)",
                }}
              >
                <span className="truncate font-medium">{CONTACT_DATA.email}</span>
                <span className="flex items-center gap-1 shrink-0 font-medium" style={{ color: "var(--accent)" }}>
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Quick Message Form */}
            <form onSubmit={handleSubmit} className="space-y-3 border-t pt-3" style={{ borderColor: "var(--border)" }}>
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-xl border px-3 py-2 text-xs focus:outline-none"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "color-mix(in srgb, var(--bg) 80%, transparent)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-xl border px-3 py-2 text-xs focus:outline-none"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "color-mix(in srgb, var(--bg) 80%, transparent)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <div>
                <textarea
                  required
                  rows={3}
                  placeholder="Your Message..."
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full rounded-xl border px-3 py-2 text-xs focus:outline-none"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "color-mix(in srgb, var(--bg) 80%, transparent)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              {formError && (
                <div className="font-mono text-[11px] text-red-500">{formError}</div>
              )}

              {isSubmitted && (
                <div className="font-mono text-[11px]" style={{ color: "var(--accent)" }}>
                  ✓ Message sent! I&apos;ll get back to you shortly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 font-mono text-xs font-semibold text-white shadow-xs transition-transform active:scale-98 disabled:opacity-50"
                style={{ backgroundColor: "var(--accent)" }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

            {/* Social Icons Row */}
            <div className="flex items-center justify-center gap-5 border-t pt-3" style={{ borderColor: "var(--border)" }}>
              <a
                href={CONTACT_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-75"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={CONTACT_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-75"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={CONTACT_DATA.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-75"
                aria-label="Twitter / X Profile"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${CONTACT_DATA.email}`}
                className="transition-opacity hover:opacity-75"
                aria-label="Send Email"
              >
                <Mail className="h-4 w-4" style={{ color: "var(--text-secondary)" }} />
              </a>
            </div>
          </div>
        </section>

        {/* Footer info */}
        <footer className="text-center font-mono text-[11px] pb-4" style={{ color: "var(--text-secondary)" }}>
          <div>© {new Date().getFullYear()} Akshat Krishan</div>
          <div className="mt-0.5">Designed with Nordic Fjord &amp; Next.js 16</div>
        </footer>
      </main>

      {/* 8. Pinned Floating Mobile Dock at Bottom */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-3 left-4 right-4 z-50 flex h-13 items-center justify-around rounded-2xl border px-2 shadow-lg backdrop-blur-xl"
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg) 88%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        {[
          { id: "m-about", tab: "about" as const, label: "About" },
          { id: "m-projects", tab: "projects" as const, label: "Projects" },
          { id: "m-experience", tab: "experience" as const, label: "Experience" },
          { id: "m-contact", tab: "contact" as const, label: "Contact" },
        ].map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              type="button"
              onClick={() => scrollTo(item.id, item.tab)}
              className="flex flex-col items-center justify-center rounded-xl px-2.5 py-1 text-center transition-transform active:scale-95"
            >
              <span
                className={`font-display text-xs tracking-tight ${
                  isActive ? "font-bold" : "font-medium"
                }`}
                style={{
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                }}
              >
                {item.label}
              </span>
              {isActive && (
                <span
                  className="mt-0.5 h-1 w-1 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              )}
            </button>
          );
        })}

        <a
          href={CONTACT_DATA.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-xl px-2.5 py-1 font-mono text-[11px] font-semibold text-white shadow-xs"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <FileText className="h-3 w-3" />
          <span>Resume</span>
        </a>
      </nav>

      {/* 9. Theme Palette Selector Sheet (Modal) */}
      <AnimatePresence>
        {themeSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setThemeSheetOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Modal Sheet Content */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-full max-w-lg rounded-t-3xl border-t p-5 shadow-2xl"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
              }}
            >
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full opacity-30" style={{ backgroundColor: "var(--text-secondary)" }} />

              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: "var(--border)" }}>
                <div>
                  <h3 className="font-display text-base font-bold">Theme &amp; Appearance</h3>
                  <p className="font-mono text-[10px]" style={{ color: "var(--text-secondary)" }}>
                    Nordic Fjord is default
                  </p>
                </div>

                {/* Dark/Light Mode Switcher */}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-medium"
                  style={{ borderColor: "var(--border)" }}
                >
                  {mode === "dark" ? (
                    <>
                      <Moon className="h-3.5 w-3.5" />
                      <span>Dark</span>
                    </>
                  ) : (
                    <>
                      <Sun className="h-3.5 w-3.5" />
                      <span>Light</span>
                    </>
                  )}
                </button>
              </div>

              {/* Palette List */}
              <div className="mt-4 space-y-2">
                {PALETTE_LIST.map((palette) => {
                  const isSelected = palette.id === paletteId;
                  return (
                    <button
                      key={palette.id}
                      type="button"
                      onClick={() => {
                        setPaletteId(palette.id as PaletteId);
                        setThemeSheetOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-xl border p-3 text-left transition-transform active:scale-98"
                      style={{
                        borderColor: isSelected ? "var(--accent)" : "var(--border)",
                        backgroundColor: isSelected
                          ? "color-mix(in srgb, var(--accent) 10%, transparent)"
                          : "color-mix(in srgb, var(--surface) 30%, transparent)",
                      }}
                    >
                      <div>
                        <div className="font-display text-xs font-semibold">
                          {palette.name} {palette.id === "nordic" && "★"}
                        </div>
                        <div className="font-mono text-[10px]" style={{ color: "var(--text-secondary)" }}>
                          {palette.subtitle}
                        </div>
                      </div>

                      {/* Swatches */}
                      <div className="flex items-center gap-1">
                        {palette.swatches.map((color, i) => (
                          <span
                            key={i}
                            className="h-4 w-4 rounded-full border border-black/10"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
