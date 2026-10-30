"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PALETTES } from "../data/portfolioData";
import { PaletteDefinition, PaletteId, ThemeMode } from "../types/portfolio";

interface ThemeContextValue {
  paletteId: PaletteId;
  mode: ThemeMode;
  currentPalette: PaletteDefinition;
  setPaletteId: (id: PaletteId) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always default to Nordic Fjord in Light Mode whenever a user opens the portfolio
  const [paletteId, setPaletteIdState] = useState<PaletteId>("nordic");
  const [mode, setModeState] = useState<ThemeMode>("light");

  // Apply CSS variables instantaneously to :root without layout recalculation
  useEffect(() => {
    const palette = PALETTES[paletteId] ?? PALETTES.nordic;
    const colors = palette[mode];
    const root = document.documentElement;

    root.style.setProperty("--bg", colors.bg);
    root.style.setProperty("--surface", colors.surface);
    root.style.setProperty("--text-primary", colors.textPrimary);
    root.style.setProperty("--text-secondary", colors.textSecondary);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--border", colors.border);
    root.setAttribute("data-theme-mode", mode);
    root.setAttribute("data-theme-palette", paletteId);
  }, [paletteId, mode]);

  const setPaletteId = (id: PaletteId) => {
    setPaletteIdState(id);
  };

  const setMode = (nextMode: ThemeMode) => {
    setModeState(nextMode);
  };

  const toggleMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        paletteId,
        mode,
        currentPalette: PALETTES[paletteId],
        setPaletteId,
        setMode,
        toggleMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
