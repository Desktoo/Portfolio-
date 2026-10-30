import {
  ExperienceItem,
  PaletteDefinition,
  PaletteId,
  ProjectItem,
  SideProjectItem,
} from "../types/portfolio";

export const PALETTES: Record<PaletteId, PaletteDefinition> = {
  terracotta: {
    id: "terracotta",
    name: "Earthy Terracotta",
    subtitle: "Warm clay & architectural stone",
    swatches: ["#E8DCC6", "#B7A89A", "#733F37", "#2B1E1B"],
    light: {
      bg: "#E8DCC6",
      surface: "#D5C6B0",
      accent: "#733F37",
      textPrimary: "#2B1E1B",
      textSecondary: "#5A423C",
      border: "#C2B19C",
    },
    dark: {
      bg: "#211715",
      surface: "#2E211E",
      accent: "#C87D65",
      textPrimary: "#E8DCC6",
      textSecondary: "#B7A89A",
      border: "#3D2C28",
    },
  },
  matcha: {
    id: "matcha",
    name: "Kyoto Matcha & Hinoki",
    subtitle: "Botanical forest, warm washi & cedar",
    swatches: ["#F3EFE6", "#D8D2C5", "#3B5E47", "#1C261F"],
    light: {
      bg: "#F3EFE6",
      surface: "#E4DECF",
      accent: "#3B5E47",
      textPrimary: "#1C261F",
      textSecondary: "#4A5D50",
      border: "#CFC8B8",
    },
    dark: {
      bg: "#151D17",
      surface: "#1F2B23",
      accent: "#88B093",
      textPrimary: "#EFECE4",
      textSecondary: "#A3B1A6",
      border: "#2B3A30",
    },
  },
  nordic: {
    id: "nordic",
    name: "Nordic Fjord & Cashmere",
    subtitle: "Alabaster linen, coastal slate & Baltic blue (Default)",
    swatches: ["#F4F6F8", "#DCE3EB", "#2C5270", "#16202B"],
    light: {
      bg: "#F4F6F8",
      surface: "#E5EBF1",
      accent: "#2C5270",
      textPrimary: "#16202B",
      textSecondary: "#4B5E71",
      border: "#CFD8E3",
    },
    dark: {
      bg: "#11171F",
      surface: "#1A232E",
      accent: "#7BA7CC",
      textPrimary: "#EEF2F6",
      textSecondary: "#9AB0C4",
      border: "#263342",
    },
  },
  champagne: {
    id: "champagne",
    name: "Atelier Noir & Champagne",
    subtitle: "Gallery ivory, smoked velvet & brushed gold",
    swatches: ["#F8F6F1", "#E6E1D6", "#8C6D46", "#1A1816"],
    light: {
      bg: "#F8F6F1",
      surface: "#ECE7DD",
      accent: "#8C6D46",
      textPrimary: "#1A1816",
      textSecondary: "#57524B",
      border: "#D8D1C4",
    },
    dark: {
      bg: "#151412",
      surface: "#211F1C",
      accent: "#D2B282",
      textPrimary: "#F4F1EA",
      textSecondary: "#A8A196",
      border: "#302D28",
    },
  },
  velvet: {
    id: "velvet",
    name: "Tuscan Fig & Dusty Rose",
    subtitle: "Soft limestone blush, muted plum & vintage rose",
    swatches: ["#F6F1F3", "#E4D7DC", "#7E3F56", "#26161C"],
    light: {
      bg: "#F6F1F3",
      surface: "#EAE0E4",
      accent: "#7E3F56",
      textPrimary: "#26161C",
      textSecondary: "#5E434E",
      border: "#D6C5CC",
    },
    dark: {
      bg: "#1A1216",
      surface: "#261B21",
      accent: "#D48CA4",
      textPrimary: "#F3EBEF",
      textSecondary: "#B69FA8",
      border: "#382830",
    },
  },
};

export const PALETTE_LIST: PaletteDefinition[] = Object.values(PALETTES);

export const HERO_DATA = {
  name: "Akshat Krishan",
  tagline: "Full-Stack & Cloud-Native Engineer building resilient backends and thoughtful products.",
  intro:
    "I build resilient backends and clean user interfaces—focusing on reliable systems and straightforward user experiences:",
  highlights: [
    {
      label: "Backend & Queues",
      text: "Modular NestJS services, BullMQ background queues, and Redlock distributed locks.",
    },
    {
      label: "Database Design",
      text: "Relational modeling in PostgreSQL, append-only logs in DynamoDB, and Redis/MongoDB caching.",
    },
    {
      label: "Cloud & GitOps",
      text: "Containerized workloads on Google Kubernetes Engine (GKE) with Helm and ArgoCD.",
    },
    {
      label: "Modern Frontend",
      text: "Fast Next.js 16 applications with TypeScript, Tailwind CSS, and isolated state (Zustand).",
    },
  ],
  bio: "Full-Stack & Cloud-Native Engineer specializing in TypeScript, Next.js, NestJS, and scalable backend infrastructure.",
  secondBio: "Experienced in multi-database architectures, distributed BullMQ task processing, and Kubernetes (GKE) GitOps deployments.",
  terminalStatus: {
    availability: "Open to full-stack, backend & cloud-native engineering roles",
    location: "Kota, India / Remote",
    whatILikeToBuild:
      "Distributed backend systems, multi-database architectures, automated GitOps pipelines & polished Next.js applications",
    beyondCode:
      "System architecture design, exploring Kubernetes primitives, and turning complex domain logic into clean software",
  },
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Freelance",
    role: "Full-Stack Engineer",
    period: "Dec 2025 — Jan 2026",
    location: "Remote",
    logo: "/images/freelance.svg",
    bullets: [
      "Modeled and indexed PostgreSQL schemas on Supabase, cutting read query latency by 25%.",
      "Implemented Clerk OTP authentication and Razorpay payment webhooks, reducing user onboarding drop-off by 40%.",
      "Built multi-step candidate application flows using React Hook Form, Zod, and Zustand to eliminate redundant re-renders.",
    ],
    skills: [
      "PostgreSQL",
      "Supabase",
      "Clerk OTP",
      "Razorpay Webhooks",
      "React Hook Form",
      "Zod",
      "Zustand",
      "TypeScript",
    ],
  },
  {
    id: "exp-2",
    company: "Intern Labs",
    role: "Software Engineer Intern",
    period: "July 2025 — Sept 2025",
    location: "Remote",
    logo: "/images/intern-labs.webp",
    bullets: [
      "Structured a Turborepo Next.js monorepo with shared UI configs and NextAuth role-based access control (RBAC).",
      "Integrated isolated Judge0 code execution on AWS EC2 with Supabase, maintaining 99.9% uptime.",
      "Streamlined data fetching and cache invalidation with SWR, accelerating dashboard loads by 40%.",
    ],
    skills: [
      "Turborepo",
      "Next.js",
      "TypeScript",
      "NextAuth (RBAC)",
      "AWS EC2",
      "Judge0",
      "Supabase (PostgreSQL)",
      "SWR",
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "ascend",
    title: "Ascend",
    logo: "/images/projects/ascend.svg",
    category: "Habit Engine & Cloud Infrastructure",
    architectureBreakdown:
      "Full-stack habit engine partitioning data across PostgreSQL, DynamoDB, and MongoDB. Uses 31-byte bitmasks for O(1) monthly heatmaps, BullMQ timezone queues with Redlock mutexes, and GKE GitOps deployment via ArgoCD.",
    techStack: [
      "Next.js 16",
      "NestJS",
      "PostgreSQL",
      "DynamoDB",
      "MongoDB",
      "BullMQ & Redlock",
      "GKE (Helm & ArgoCD)",
    ],
    liveUrl: "https://github.com/Desktoo/Ascend",
    githubUrl: "https://github.com/Desktoo/Ascend",
    diagramType: "analytics",
    metricsBadge: "O(1) Bitmasks • GKE & GitOps",
  },
  {
    id: "workezy",
    title: "WorkEzy",
    logo: "/images/projects/workezy.png",
    category: "Job Board & Candidate Platform",
    architectureBreakdown:
      "Hiring platform featuring indexed PostgreSQL schemas on Supabase, Clerk OTP authentication, Razorpay payment webhooks, and a multi-step candidate application workflow.",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Supabase (PostgreSQL)",
      "Prisma",
      "Clerk OTP",
      "Razorpay",
      "Zustand & Zod",
    ],
    liveUrl: "https://github.com/Desktoo/WorkEzy-demo",
    githubUrl: "https://github.com/Desktoo/WorkEzy-demo",
    diagramType: "queue",
    metricsBadge: "Multi-Step Flow • Clerk & Razorpay",
  },
  {
    id: "code-zen",
    title: "CodeZen",
    logo: "/images/projects/codezen.svg",
    category: "Real-Time Code Evaluation Engine",
    architectureBreakdown:
      "Real-time coding assessment portal running isolated Judge0 sandbox instances on AWS EC2, backed by Supabase PostgreSQL and SWR client-side caching.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Judge0 Engine",
      "AWS EC2",
      "Supabase",
      "SWR",
      "Tailwind CSS",
    ],
    liveUrl: "https://github.com/Desktoo/code-zen",
    githubUrl: "https://github.com/Desktoo/code-zen",
    diagramType: "mesh",
    metricsBadge: "Live Code Runner • Judge0",
  },
];

export const SIDE_PROJECTS_DATA: SideProjectItem[] = [
  {
    id: "tread-with-style",
    title: "Tread With Style",
    logo: "/images/projects/tread.svg",
    vibe: "Smooth Scroll & Motion Study",
    description:
      "Next.js 16 and React 19 motion experiment pairing Lenis smooth scrolling with GSAP timelines at 60fps.",
    techStack: ["Next.js 16", "React 19", "GSAP", "Lenis Smooth Scroll", "Tailwind CSS"],
    liveUrl: "https://tread-with-style-demo.vercel.app",
    githubUrl: "https://github.com/Desktoo/tread-with-style-demo",
    year: "2026",
  },
  {
    id: "veshmn",
    title: "Veshmn",
    logo: "/images/projects/veshmn.png",
    vibe: "Interactive Frontend Architecture",
    description:
      "Next.js 16 web application featuring Lenis scroll inertia, GSAP scroll triggers, and responsive layouts.",
    techStack: ["Next.js 16", "TypeScript", "GSAP", "Lenis", "Tailwind CSS"],
    liveUrl: "https://veshmn-modified.vercel.app",
    githubUrl: "https://github.com/Desktoo/Veshmn_modified",
    year: "2025",
  },
  {
    id: "rangoon-cafe",
    title: "Rangoon Cafe",
    logo: "/images/projects/rangoon.png",
    vibe: "Dining & Menu Application",
    description:
      "Mobile-first dining web application with dynamic menu filtering and responsive grid layouts.",
    techStack: ["Next.js 16", "TypeScript", "GSAP", "Tailwind CSS"],
    liveUrl: "https://rangoon-demo.vercel.app",
    githubUrl: "https://github.com/Desktoo/rangoon-demo",
    year: "2025",
  },
  {
    id: "apple-clone",
    title: "Apple Product Showcase Study",
    logo: "/images/projects/apple.svg",
    vibe: "Scroll-Linked Animation Study",
    description:
      "Frontend study recreating scroll-linked frame sequences and product reveals using GSAP ScrollTrigger.",
    techStack: ["React", "GSAP", "ScrollTrigger", "Tailwind CSS"],
    liveUrl: "https://apple-website-clone-five-azure.vercel.app",
    githubUrl: "https://github.com/Desktoo/Apple_Website_Clone",
    year: "2025",
  },
  {
    id: "audio-video-dashboard",
    title: "Audio / Video Studio Dashboard",
    logo: "/images/projects/audio.svg",
    vibe: "Media Controls & Audio State",
    description:
      "Interactive media dashboard managing real-time playback states, audio waveforms, and studio controls.",
    techStack: ["TypeScript", "React", "Tailwind CSS"],
    liveUrl: "https://audio-video-dashboard.vercel.app",
    githubUrl: "https://github.com/Desktoo/audio_video_dashboard",
    year: "2025",
  },
  {
    id: "societyhub-promptify",
    title: "SocietyHub, Promptify & Talks",
    logo: "/images/projects/societyhub.svg",
    vibe: "Full-Stack Web Experiments",
    description:
      "Full-stack experiments exploring real-time WebSockets, prompt directory indexing, and CRUD flows.",
    techStack: ["JavaScript", "Next.js", "React", "WebSockets", "Node.js"],
    liveUrl: "https://society-hub.vercel.app",
    githubUrl: "https://github.com/Desktoo/SocietyHub",
    year: "2024 — 2025",
  },
];

export const CONTACT_DATA = {
  email: "akshat.krishan.02@gmail.com",
  phone: "+91 9461863104",
  github: "https://github.com/desktoo/",
  linkedin: "https://www.linkedin.com/in/akshat-krishan-659216413/",
  twitter: "https://x.com/Akshat_krishan",
  resumeUrl: "/Akshat_Krishan_Resume.pdf",
};
