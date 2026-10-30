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

    // Start 2.5-second sequence:
    // 0.0s: Vinyl appears from bottom right
    setDismissed(false);
    setPhase("cueing");
    setCueStep(1);

    // 0.9s: Tonearm swings smoothly from cradle to vinyl lead-in groove
    cueTimer1.current = setTimeout(() => {
      setCueStep(2);

      // 1.8s: Needle pin drops & settles onto the vinyl groove
      cueTimer2.current = setTimeout(() => {
        setCueStep(3);

        // 2.5s: Exactly at 2.5s, pin is settled, vinyl revolves on its center axis, audio plays!
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
        }, 700); // 1.8s + 0.7s = 2.5s total
      }, 900); // 0.9s + 0.9s = 1.8s
    }, 900); // 0.9s
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
        className="mt-4 flex w-full max-w-[460px] flex-col gap-2.5 border-t pt-3 select-none"
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
                    ? "Vinyl emerging (2.5s cue)..."
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
                  : "Play music (Vinyl emerges from bottom right in 2.5s)"
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
                  : "Play"
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

      {/* 2. THE BIG VINYL RECORD APPEARING FROM THE BOTTOM RIGHT CORNER */}
      <AnimatePresence>
        {phase !== "idle" && !dismissed && (
          <motion.div
            initial={{ x: 140, y: 140, opacity: 0, scale: 0.75 }}
            animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            exit={{ x: 140, y: 140, opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-3 bottom-3 z-50 pointer-events-auto sm:right-6 sm:bottom-6"
          >
            {/* Transparent Floating Record Stage with Soft Drop Shadow */}
            <div className="relative drop-shadow-[0_20px_45px_rgba(0,0,0,0.65)] select-none">
              <svg
                viewBox="0 0 280 280"
                className="h-56 w-56 sm:h-64 sm:w-64 overflow-visible will-change-transform"
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
                {/* Heavy Pivot Gimbal at (245, 60) */}
                <circle
                  cx="245"
                  cy="60"
                  r="13"
                  fill="#1c1c20"
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                />
                <circle cx="245" cy="60" r="4" fill="var(--accent)" />

                

                {/* TONEARM + STYLUS PIN: Perfectly aligned to outer groove at (179, 126) */}
                <motion.g
                  initial={{ rotate: -24 }}
                  animate={{
                    // Step 1 (0-0.9s): Parked on cradle (-24deg)
                    // Step 2 (0.9-1.8s): Swings over vinyl groove (0deg)
                    // Step 3 (1.8-2.5s+): Settles onto the groove (0deg with needle dip)
                    rotate: cueStep === 1 ? -24 : 0,
                    y: cueStep >= 3 ? 3.5 : 0,
                  }}
                  transition={{
                    duration: cueStep === 2 ? 0.9 : 0.45,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  style={{ originX: "245px", originY: "60px" }}
                >
                  

                  {/* Polished Metallic S-Curved Tonearm Tube extending from (245, 60) to (195, 110) */}
                  <path
                    d="M245 60 C240 85, 230 102, 195 110"
                    stroke="var(--accent)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M245 60 C240 85, 230 102, 195 110"
                    stroke="#ffffff"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeOpacity="0.45"
                    fill="none"
                  />

                  {/* Angled Headshell Cartridge: Aligned along the groove at (180, 108) */}
                  <rect
                    x="183"
                    y="90"
                    width="16"
                    height="9"
                    rx="2"
                    transform="rotate(62 180 108)"
                    fill="#18181c"
                    stroke="var(--accent)"
                    strokeWidth="1.2"
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
