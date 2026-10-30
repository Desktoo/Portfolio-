"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function SystemArchitectureHeroSvg() {
  // Smooth scroll parallax for subtle depth layering
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.35,
  });

  const scrollSunY = useTransform(smoothScroll, [0, 1], [0, -24]);
  const scrollAstrolabe = useTransform(smoothScroll, [0, 1], [0, 75]);
  const scrollHills = useTransform(smoothScroll, [0, 1], [0, -12]);
  const scrollBranch = useTransform(smoothScroll, [0, 1], [0, 4]);

  return (
    <div className="relative flex w-full items-center justify-center py-0 select-none">
      <svg
        viewBox="20 20 380 410"
        className="h-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[390px] overflow-visible will-change-transform"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Interactive geometric illustration with celestial motion and tranquil reflections"
      >
        <defs>
          <clipPath id="sanctuary-arch-clip">
            <path d="M62 400 V190 C62 102, 128 38, 210 38 C292 38, 358 102, 358 190 V400 Z" />
          </clipPath>
        </defs>

        {/* Outer Architectural Spandrel Frame */}
        <rect
          x="46"
          y="26"
          width="328"
          height="386"
          rx="4"
          stroke="var(--border)"
          strokeWidth="1"
          opacity="0.65"
        />

        {/* Horizontal Alignment Guides */}
        <line
          x1="46"
          y1="185"
          x2="62"
          y2="185"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <line
          x1="358"
          y1="185"
          x2="374"
          y2="185"
          stroke="var(--border)"
          strokeWidth="1"
        />

        {/* Top Left & Right Rosettes with subtle idle pulse */}
        <motion.g
          animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.8, 0.55] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "82px", originY: "64px" }}
        >
          <circle
            cx="82"
            cy="64"
            r="12"
            stroke="var(--accent)"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle cx="82" cy="64" r="2.5" fill="var(--accent)" />
        </motion.g>

        <motion.g
          animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.8, 0.55] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
          style={{ originX: "338px", originY: "64px" }}
        >
          <circle
            cx="338"
            cy="64"
            r="12"
            stroke="var(--accent)"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle cx="338" cy="64" r="2.5" fill="var(--accent)" />
        </motion.g>

        {/* Sanctuary Arch Backdrop Surface */}
        <path
          d="M62 400 V190 C62 102, 128 38, 210 38 C292 38, 358 102, 358 190 V400 Z"
          fill="var(--surface)"
          opacity="0.55"
        />

        {/* Clipped Interior Scene with Idle & Scroll-Linked Animations */}
        <g clipPath="url(#sanctuary-arch-clip)">
          {/* Subtle Vertical Meridian & Horizon Grid Lines */}
          <line
            x1="210"
            y1="38"
            x2="210"
            y2="400"
            stroke="var(--border)"
            strokeWidth="0.8"
            strokeDasharray="3 5"
            opacity="0.6"
          />
          <line
            x1="62"
            y1="168"
            x2="358"
            y2="168"
            stroke="var(--border)"
            strokeWidth="0.8"
            strokeDasharray="3 5"
            opacity="0.6"
          />

          {/* Continuous Rotating Celestial Astrolabe (Active when Idle!) */}
          <motion.g
            style={{
              originX: "210px",
              originY: "168px",
              y: scrollSunY,
            }}
          >
            {/* Infinite Idle Continuous Rotation Wrapper */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{
                duration: 52,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ originX: "210px", originY: "168px" }}
            >
              {/* Outer Dashed Orbit Ring */}
              <circle
                cx="210"
                cy="168"
                r="98"
                stroke="var(--accent)"
                strokeWidth="1"
                strokeDasharray="2 6"
                opacity="0.65"
              />
              {/* Inner Concentric Axis */}
              <circle
                cx="210"
                cy="168"
                r="82"
                stroke="var(--text-primary)"
                strokeWidth="0.8"
                opacity="0.32"
              />

              {/* Orbital Planet Nodes */}
              <circle cx="210" cy="70" r="3.5" fill="var(--accent)" />
              <circle
                cx="308"
                cy="168"
                r="3"
                fill="var(--text-primary)"
                opacity="0.7"
              />
              <circle
                cx="112"
                cy="168"
                r="3"
                fill="var(--text-primary)"
                opacity="0.7"
              />
              <circle
                cx="279"
                cy="99"
                r="2.5"
                fill="var(--accent)"
                opacity="0.8"
              />
              <circle
                cx="141"
                cy="237"
                r="2.5"
                fill="var(--accent)"
                opacity="0.8"
              />

              {/* Fine Sunburst Dial Ticks */}
              {[...Array(24)].map((_, idx) => {
                const angle = (idx * 360) / 24;
                return (
                  <line
                    key={idx}
                    x1="210"
                    y1="88"
                    x2="210"
                    y2={idx % 2 === 0 ? "75" : "81"}
                    stroke="var(--accent)"
                    strokeWidth={idx % 2 === 0 ? "1.3" : "0.9"}
                    transform={`rotate(${angle} 210 168)`}
                    opacity="0.75"
                  />
                );
              })}
            </motion.g>
          </motion.g>

          {/* Warm Sun & Crescent (Continuous Idle Floating Breathing + Scroll Parallax) */}
          <motion.g style={{ y: scrollSunY }}>
            <motion.g
              animate={{
                y: [-3.5, 3.5, -3.5],
                scale: [1, 1.025, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ originX: "210px", originY: "168px" }}
            >
              {/* Outer Atmosphere Glow */}
              <circle
                cx="210"
                cy="168"
                r="64"
                fill="var(--accent)"
                opacity="0.14"
              />
              {/* Core Sun Disc */}
              <circle
                cx="210"
                cy="168"
                r="50"
                fill="var(--accent)"
                opacity="0.94"
              />
              {/* Crescent Moon Cutout */}
              <circle
                cx="228"
                cy="154"
                r="34"
                fill="var(--bg)"
                opacity="0.9"
              />
              <circle
                cx="228"
                cy="154"
                r="34"
                stroke="var(--accent)"
                strokeWidth="1"
                opacity="0.4"
              />
            </motion.g>
          </motion.g>

          {/* Swallows / Birds Gliding in Idle Sky */}
          <motion.g
            animate={{
              x: [-4, 5, -4],
              y: [-2, 3, -2],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M118 118 Q126 110, 134 117 Q142 110, 150 118"
              stroke="var(--text-primary)"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M142 102 Q148 96, 154 101 Q160 96, 166 102"
              stroke="var(--accent)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          </motion.g>

          {/* Distant Dunes / Ridge Layer (Scroll Parallax) */}
          <motion.g style={{ y: scrollHills }}>
            {/* Back Hill */}
            <path
              d="M50 302 C110 256, 178 258, 246 292 C292 314, 330 282, 370 296 L370 405 L50 405 Z"
              fill="var(--bg)"
              opacity="0.88"
            />
            <path
              d="M50 302 C110 256, 178 258, 246 292 C292 314, 330 282, 370 296"
              stroke="var(--accent)"
              strokeWidth="1.3"
              opacity="0.7"
            />

            {/* Foreground Dune Ridge */}
            <path
              d="M50 322 C118 296, 185 318, 260 284 C308 262, 342 276, 370 290 L370 405 L50 405 Z"
              fill="var(--surface)"
              opacity="0.92"
            />
            <path
              d="M50 322 C118 296, 185 318, 260 284 C308 262, 342 276, 370 290"
              stroke="var(--text-primary)"
              strokeWidth="1.3"
              opacity="0.6"
            />
          </motion.g>

          {/* Reflecting Pool Basin */}
          <rect
            x="62"
            y="322"
            width="296"
            height="78"
            fill="var(--bg)"
            opacity="0.55"
          />
          <line
            x1="62"
            y1="322"
            x2="358"
            y2="322"
            stroke="var(--accent)"
            strokeWidth="1.2"
            opacity="0.75"
          />

          {/* Continuous Shimmering Water Reflections (Active when Idle!) */}
          {[
            { y: 334, w: 92, baseOp: 0.8 },
            { y: 344, w: 72, baseOp: 0.7 },
            { y: 354, w: 100, baseOp: 0.65 },
            { y: 364, w: 58, baseOp: 0.6 },
            { y: 374, w: 80, baseOp: 0.5 },
            { y: 384, w: 46, baseOp: 0.45 },
          ].map((ripple, idx) => (
            <motion.line
              key={idx}
              x1={210 - ripple.w / 2}
              y1={ripple.y}
              x2={210 + ripple.w / 2}
              y2={ripple.y}
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{
                opacity: [
                  ripple.baseOp * 0.6,
                  ripple.baseOp * 1.15,
                  ripple.baseOp * 0.6,
                ],
                scaleX: [0.96, 1.04, 0.96],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.35,
              }}
              style={{ originX: "210px", originY: `${ripple.y}px` }}
            />
          ))}

          {/* Stepped Architectural Terrace */}
          <path
            d="M112 400 L128 382 H292 L308 400"
            stroke="var(--text-primary)"
            strokeWidth="1.1"
            opacity="0.4"
          />
          <path
            d="M136 400 L148 390 H272 L284 400"
            stroke="var(--accent)"
            strokeWidth="1.1"
            opacity="0.55"
          />
        </g>

        {/* Arch Frames */}
        <path
          d="M62 400 V190 C62 102, 128 38, 210 38 C292 38, 358 102, 358 190 V400 Z"
          stroke="var(--text-primary)"
          strokeWidth="1.6"
          opacity="0.82"
        />
        <path
          d="M74 392 V190 C74 110, 134 50, 210 50 C286 50, 346 110, 346 190 V392"
          stroke="var(--accent)"
          strokeWidth="1.1"
          opacity="0.7"
        />

        {/* Botanical Branch (Continuous Gentle Breeze Swaying when Idle + Scroll Parallax) */}
        <motion.g
          style={{
            originX: "92px",
            originY: "396px",
            rotate: scrollBranch,
          }}
        >
          <motion.g
            animate={{ rotate: [-2.5, 3.2, -2.5] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ originX: "92px", originY: "396px" }}
          >
            {/* Main Stem */}
            <path
              d="M92 396 C118 308, 168 232, 266 138"
              stroke="var(--text-primary)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Secondary Offshoot */}
            <path
              d="M164 266 C198 258, 226 248, 256 226"
              stroke="var(--text-primary)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Botanical Leaves */}
            <path
              d="M122 338 C92 330, 82 304, 110 296 C130 302, 130 324, 122 338 Z"
              fill="var(--accent)"
            />
            <path
              d="M142 300 C172 304, 192 286, 172 270 C152 270, 144 286, 142 300 Z"
              fill="var(--text-primary)"
              opacity="0.9"
            />
            <path
              d="M166 254 C138 242, 130 214, 158 208 C176 218, 174 240, 166 254 Z"
              fill="var(--accent)"
            />
            <path
              d="M202 214 C232 218, 250 200, 232 184 C214 184, 204 200, 202 214 Z"
              fill="var(--text-primary)"
              opacity="0.9"
            />
            <path
              d="M226 178 C202 162, 198 136, 224 134 C238 144, 234 166, 226 178 Z"
              fill="var(--accent)"
            />
            <path
              d="M258 146 C256 120, 278 106, 290 122 C286 142, 270 146, 258 146 Z"
              fill="var(--accent)"
            />

            {/* Leaves on Offshoot */}
            <path
              d="M214 250 C226 266, 246 260, 238 244 C228 240, 218 244, 214 250 Z"
              fill="var(--accent)"
              opacity="0.9"
            />
            <path
              d="M248 232 C264 236, 276 222, 262 212 C252 214, 248 224, 248 232 Z"
              fill="var(--text-primary)"
              opacity="0.85"
            />

            {/* Berries / Botanical Accents */}
            <circle cx="144" cy="272" r="3.5" fill="var(--accent)" />
            <circle cx="196" cy="188" r="3" fill="var(--accent)" />
            <circle cx="246" cy="158" r="3" fill="var(--text-primary)" />
          </motion.g>
        </motion.g>

        {/* Twinkling Celestial Four-Point Stars (Active when Idle!) */}
        <motion.path
          d="M104 102 Q104 116, 90 116 Q104 116, 104 130 Q104 116, 118 116 Q104 116, 104 102 Z"
          fill="var(--text-primary)"
          animate={{ scale: [0.85, 1.18, 0.85], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "104px", originY: "116px" }}
        />
        <motion.path
          d="M316 218 Q316 229, 305 229 Q316 229, 316 240 Q316 229, 327 229 Q316 229, 316 218 Z"
          fill="var(--accent)"
          animate={{ scale: [0.85, 1.18, 0.85], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          style={{ originX: "316px", originY: "229px" }}
        />
      </svg>
    </div>
  );
}
