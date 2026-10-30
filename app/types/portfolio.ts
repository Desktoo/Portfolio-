export type PaletteId =
  | "terracotta"
  | "matcha"
  | "nordic"
  | "champagne"
  | "velvet";

export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  bg: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  border: string;
}

export interface PaletteDefinition {
  id: PaletteId;
  name: string;
  subtitle: string;
  swatches: string[];
  light: ThemeColors;
  dark: ThemeColors;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  skills: string[];
}

export type DiagramType = "queue" | "analytics" | "mesh" | "edge";

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  architectureBreakdown: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  diagramType: DiagramType;
  metricsBadge: string;
}

export interface SideProjectItem {
  id: string;
  title: string;
  vibe: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl: string;
  year: string;
}
