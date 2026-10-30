"use client";

import React from "react";
import { DiagramType } from "../../types/portfolio";

export default function ProjectArchitectureDiagram({
  type,
}: {
  type: DiagramType;
  badge?: string;
}) {
  return (
    <div className="flex items-center justify-start py-2">
      <svg
        viewBox="0 0 180 72"
        className="h-16 w-40 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {type === "queue" && (
          <g>
            {/* Lunar Phases Vignette */}
            <line
              x1="8"
              y1="36"
              x2="172"
              y2="36"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <circle cx="32" cy="36" r="10" stroke="var(--text-primary)" strokeWidth="1.25" />
            <circle cx="68" cy="36" r="13" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.25" />
            <circle cx="108" cy="36" r="16" fill="var(--accent)" />
            <path
              d="M150 24 A12 12 0 1 0 150 48 A9 12 0 1 1 150 24 Z"
              fill="var(--text-primary)"
            />
          </g>
        )}

        {type === "analytics" && (
          <g>
            {/* Rising Sun Over Organic Waves */}
            <path
              d="M42 44 A36 36 0 0 1 114 44"
              fill="var(--accent)"
              opacity="0.85"
            />
            <path
              d="M10 44 Q45 34, 80 44 T150 44"
              stroke="var(--text-primary)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M22 54 Q57 44, 92 54 T162 54"
              stroke="var(--accent)"
              strokeWidth="1.25"
              fill="none"
            />
            <circle cx="142" cy="20" r="3.5" fill="var(--text-primary)" />
          </g>
        )}

        {type === "mesh" && (
          <g>
            {/* Interlocking Botanical / Sacred Geometry Petals */}
            <circle
              cx="62"
              cy="36"
              r="20"
              stroke="var(--text-primary)"
              strokeWidth="1.25"
            />
            <circle
              cx="90"
              cy="36"
              r="20"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <circle
              cx="118"
              cy="36"
              r="20"
              stroke="var(--text-primary)"
              strokeWidth="1.25"
            />
            <path
              d="M90 16 Q90 36, 70 36 Q90 36, 90 56 Q90 36, 110 36 Q90 36, 90 16 Z"
              fill="var(--accent)"
            />
          </g>
        )}

        {type === "edge" && (
          <g>
            {/* Bauhaus Balance Arch & Floating Sphere */}
            <path
              d="M36 58 A34 34 0 0 1 104 58"
              stroke="var(--text-primary)"
              strokeWidth="1.5"
              fill="var(--surface)"
            />
            <circle cx="70" cy="24" r="9" fill="var(--accent)" />
            <line
              x1="20"
              y1="58"
              x2="156"
              y2="58"
              stroke="var(--accent)"
              strokeWidth="1.25"
            />
            <path
              d="M134 18 L148 58 L120 58 Z"
              stroke="var(--text-primary)"
              strokeWidth="1.25"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
