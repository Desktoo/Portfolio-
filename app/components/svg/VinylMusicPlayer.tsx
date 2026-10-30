"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

export interface SoothingTrack {
  id: string;
  number: string;
  title: string;
  artist: string;
  src: string;
}

const SOOTHING_TRACKS: SoothingTrack[] = [
  {
    id: "gymnopedie-1",
    number: "01",
    title: "Gymnopédie No. 1",
    artist: "Erik Satie",
    src: "/audio/gymnopedie-1.ogg",
  },
  {
    id: "clair-de-lune",
    number: "02",
    title: "Clair de Lune",
    artist: "Claude Debussy",
    src: "/audio/clair-de-lune.ogg",
  },
  {
    id: "gnossienne-1",
    number: "03",
    title: "Gnossienne No. 1",
    artist: "Erik Satie",
    src: "/audio/gnossienne-1.ogg",
  },
  {
    id: "arabesque-1",
    number: "04",
    title: "Première Arabesque",
    artist: "Claude Debussy",
    src: "/audio/arabesque-1.ogg",
  },
  {
    id: "gnossienne-3",
    number: "05",
    title: "Gnossienne No. 3",
    artist: "Erik Satie",
    src: "/audio/gnossienne-3.ogg",
  },
];

type PlayerPhase = "idle" | "cueing" | "playing";

export default function VinylMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cueTimer1 = useRef<NodeJS.Timeout | null>(null);
  const cueTimer2 = useRef<NodeJS.Timeout | null>(null);
  const cueTimer3 = useRef<NodeJS.Timeout | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<PlayerPhase>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [cueStep, setCueStep] = useState<1 | 2 | 3 | 4>(1);
  const [dismissed, setDismissed] = useState(false);

  const currentTrack = SOOTHING_TRACKS[currentIndex];
  const isSpinning = phase === "playing" && !isMuted;

  const clearAllTimers = () => {
    if (cueTimer1.current) clearTimeout(cueTimer1.current);
    if (cueTimer2.current) clearTimeout(cueTimer2.current);
    if (cueTimer3.current) clearTimeout(cueTimer3.current);
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  // Sync track when index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = currentTrack.src;
    audio.volume = 0.35;
    audio.muted = isMuted;

    if (phase === "playing") {
      audio.play().catch(() => {
        setPhase("idle");
      });
    }
  }, [currentIndex]);

  // Handle Play/Pause with the 2.5-second sequence
  const handlePlayClick = () => {
    if (phase === "playing") {
      clearAllTimers();
      if (audioRef.current) audioRef.current.pause();
      setPhase("idle");
      setCueStep(1);
      return;
    }

    if (phase === "cueing") {
      clearAllTimers();
      if (audioRef.current) audioRef.current.pause();
      setPhase("idle");
      setCueStep(1);
      return;
    }

    // Prime audio during user gesture so browser autoplay policy allows delayed playback
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        audioRef.current?.pause();
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.volume = 0.35;
        }
      }).catch(() => {});
    }

    // Start 1.5-second sequence:
    // 0.0s: Vinyl appears from bottom right
    setDismissed(false);
    setPhase("cueing");
    setCueStep(1);

    // 0.4s: Tonearm swings smoothly from cradle to vinyl lead-in groove
    cueTimer1.current = setTimeout(() => {
      setCueStep(2);

      // 0.9s: Needle pin drops & settles onto the vinyl groove
      cueTimer2.current = setTimeout(() => {
        setCueStep(3);

        // 1.5s: Exactly at 1.5s, pin is settled, vinyl revolves, audio plays!
        cueTimer3.current = setTimeout(() => {
          setCueStep(4);
          setPhase("playing");
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0.35;
            audioRef.current.play().catch(() => {
              setPhase("idle");
            });
          }
        }, 600); // 0.9s + 0.6s = 1.5s total
      }, 500); // 0.4s + 0.5s = 0.9s
    }, 400); // 0.4s
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? SOOTHING_TRACKS.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SOOTHING_TRACKS.length);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
        onEnded={handleNext}
      />

      {/* 1. CONTROLS POSITIONED DIRECTLY UNDER THE SVG */}
      <div
        className="mx-auto mt-4 flex w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[390px] flex-col gap-2.5 border-t pt-3 select-none"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Track title & status */}
          <div className="min-w-0 flex-1">
            <div
              className="truncate font-display text-sm font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {currentTrack.number}. {currentTrack.title}
            </div>
            <div
              className="truncate font-mono text-[11px]"
              style={{ color: "var(--text-secondary)" }}
            >
              {phase === "cueing" ? (
                <span style={{ color: "var(--accent)" }} className="animate-pulse">
                  ✦ {cueStep === 1
                    ? "Vinyl emerging (1.5s cue)..."
                    : cueStep === 2
                    ? "Tonearm swinging in..."
                    : "Needle pin settling on groove..."}
                </span>
              ) : phase === "playing" ? (
                <span style={{ color: "var(--accent)" }}>
                  ● Spinning at 10 RPM · {currentTrack.artist}
                </span>
              ) : (
                <span>{currentTrack.artist} · Click Play</span>
              )}
            </div>
          </div>

          {/* Prev, Play/Pause, Next & Mute buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous tune"
              className="cursor-pointer rounded-full p-2 transition-transform hover:scale-108 active:scale-95"
              style={{ color: "var(--text-secondary)" }}
              title="Previous tune"
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handlePlayClick}
              aria-label={
                phase === "playing"
                  ? "Pause music"
                  : phase === "cueing"
                  ? "Cancel cueing"
                  : "Play music (Vinyl emerges from bottom right in 1.5s)"
              }
              className="relative flex cursor-pointer items-center justify-center rounded-full p-2.5 transition-transform hover:scale-106 active:scale-95 shadow-sm"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg)",
              }}
              title={
                phase === "playing"
                  ? "Pause"
                  : phase === "cueing"
                  ? "Cueing..."
                  : "Play (1.5s cue)"
              }
            >
              {phase === "playing" ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 translate-x-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next tune"
              className="cursor-pointer rounded-full p-2 transition-transform hover:scale-108 active:scale-95"
              style={{ color: "var(--text-secondary)" }}
              title="Next tune"
            >
              <SkipForward className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="cursor-pointer rounded-full p-2 transition-opacity hover:opacity-75"
              style={{
                color: isMuted ? "var(--text-secondary)" : "var(--accent)",
              }}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. THE FLOATING VINYL RECORD APPEARING FROM THE BOTTOM RIGHT CORNER */}
      <AnimatePresence>
        {phase !== "idle" && !dismissed && (
          <motion.div
            initial={{ x: 100, y: 100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, y: 100, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-3 bottom-3 z-50 pointer-events-auto sm:right-5 sm:bottom-5"
          >
            {/* Transparent Floating Record Stage with Soft Drop Shadow */}
            <div className="group relative drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)] select-none">
              {/* Optional dismiss button on hover */}
              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Hide floating vinyl record"
                className="absolute -top-1.5 -right-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full border bg-black/80 text-white/70 opacity-0 transition-opacity hover:opacity-100 hover:text-white group-hover:opacity-100 shadow-md cursor-pointer"
                style={{ borderColor: "var(--border)" }}
                title="Hide vinyl record view"
              >
                <X className="h-3 w-3" />
              </button>

              <svg
                viewBox="0 0 280 280"
                className="h-36 w-36 sm:h-40 sm:w-40 overflow-visible will-change-transform"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Turntable Platter Outer Base Ring */}
                <circle
                  cx="120"
                  cy="150"
                  r="106"
                  fill="#000000"
                  fillOpacity="0.4"
                />
                <circle
                  cx="120"
                  cy="150"
                  r="103"
                  stroke="var(--accent)"
                  strokeWidth="0.8"
                  strokeOpacity="0.35"
                />

                {/* THE VINYL LP: Strictly centered and rotating on (0, 0) inside a translate(120, 150) group */}
                <g transform="translate(120, 150)">
                  <motion.g
                    animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
                    transition={
                      isSpinning
                        ? { duration: 10, repeat: Infinity, ease: "linear" }
                        : { duration: 0.5, ease: "easeOut" }
                    }
                  >
                    {/* Real Vinyl Disc Body: Deep Obsidian Black centered at (0, 0) */}
                    <circle
                      cx="0"
                      cy="0"
                      r="100"
                      fill="#101013"
                      stroke="#222228"
                      strokeWidth="1.5"
                    />

                    {/* High-Precision Concentric Vinyl Sound Grooves */}
                    {[95, 89, 83, 77, 71, 65, 59, 53].map((r, i) => (
                      <circle
                        key={r}
                        cx="0"
                        cy="0"
                        r={r}
                        stroke="#ffffff"
                        strokeWidth="0.5"
                        strokeOpacity={i % 2 === 0 ? "0.08" : "0.04"}
                      />
                    ))}

                    {/* Dual Vinyl Sheen Butterflies (Light Shimmer Reflection) */}
                    <path
                      d="M-55 -55 A78 78 0 0 1 -14 -76 L0 0 Z"
                      fill="#ffffff"
                      fillOpacity="0.05"
                    />
                    <path
                      d="M55 55 A78 78 0 0 1 14 76 L0 0 Z"
                      fill="#ffffff"
                      fillOpacity="0.05"
                    />

                    {/* Clean Minimalist Vinyl Center Label (No text) */}
                    <circle
                      cx="0"
                      cy="0"
                      r="40"
                      fill="var(--accent)"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="37"
                      stroke="#ffffff"
                      strokeWidth="0.6"
                      strokeOpacity="0.35"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="24"
                      stroke="#ffffff"
                      strokeWidth="0.5"
                      strokeOpacity="0.2"
                    />

                    {/* Center Spindle Hole (Exact axis of rotation) */}
                    <circle cx="0" cy="0" r="4" fill="#000000" />
                    <circle
                      cx="0"
                      cy="0"
                      r="5.2"
                      stroke="var(--bg)"
                      strokeWidth="0.8"
                      strokeOpacity="0.6"
                    />
                  </motion.g>
                </g>

                {/* TONEARM ASSEMBLY & PIVOT BASE */}
                {/* Resting Cradle */}
                <path
                  d="M228 80 L236 80 M232 76 L232 84"
                  stroke="var(--border)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />

                {/* Heavy Pivot Gimbal at (240, 58) */}
                <circle
                  cx="240"
                  cy="58"
                  r="13"
                  fill="#1c1c20"
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                />
                <circle cx="240" cy="58" r="4" fill="var(--accent)" />

                {/* TONEARM + STYLUS PIN: Perfectly aligned and in sync with 1.5s sequence */}
                <motion.g
                  initial={{ rotate: -22 }}
                  animate={{
                    // Step 1 (0-0.4s): Parked on cradle (-22deg)
                    // Step 2 (0.4-0.9s): Swings over vinyl lead-in groove (0deg)
                    // Step 3 (0.9-1.5s): Settles onto groove with needle dip (y: 2.5)
                    rotate: cueStep === 1 ? -22 : 0,
                    y: cueStep >= 3 ? 2.5 : 0,
                  }}
                  transition={{
                    duration: cueStep === 2 ? 0.5 : 0.35,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  style={{ originX: "240px", originY: "58px" }}
                >
                  {/* Polished Metallic S-Curved Tonearm Tube extending from (240, 58) to (192, 110) */}
                  <path
                    d="M240 58 C236 82, 222 102, 192 110"
                    stroke="var(--accent)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M240 58 C236 82, 222 102, 192 110"
                    stroke="#ffffff"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeOpacity="0.45"
                    fill="none"
                  />

                  {/* Angled Headshell Cartridge: Aligned along the groove at (178, 108) */}
                  <rect
                    x="180"
                    y="90"
                    width="15"
                    height="8"
                    rx="2"
                    transform="rotate(62 178 108)"
                    fill="#18181c"
                    stroke="var(--accent)"
                    strokeWidth="1.2"
                  />

                  {/* Stylus Cantilever Pin & Diamond Tip (Lands directly on groove at radius ~58) */}
                  <line
                    x1="178"
                    y1="112"
                    x2="173"
                    y2="124"
                    stroke="var(--accent)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <circle cx="173" cy="124" r="1.5" fill="#ffffff" />
                  <circle
                    cx="173"
                    cy="124"
                    r="2.8"
                    stroke="var(--accent)"
                    strokeWidth="0.6"
                    strokeOpacity="0.7"
                    fill="none"
                  />
                </motion.g>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
