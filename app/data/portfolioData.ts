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
    "I engineer software from the data layer up to the interface—focusing on high-reliability backends and effortless user experiences:",
  highlights: [
    {
      label: "Backend & Distributed Systems",
      text: "Architecting modular services in NestJS, background job queues with BullMQ, and Redlock distributed mutexes to eliminate race conditions.",
    },
    {
      label: "Multi-Database Architecture",
      text: "Structuring schemas by access pattern—PostgreSQL for relational models, DynamoDB for audit trails, and Redis/MongoDB for caching.",
    },
    {
      label: "Cloud & Automated GitOps",
      text: "Running containerized workloads on Google Kubernetes Engine (GKE) with Helm charts and ArgoCD zero-downtime releases.",
    },
    {
      label: "Modern Frontend Systems",
      text: "Building snappy Next.js 16 applications with TypeScript, Tailwind CSS, and isolated state (Zustand, Zod) to eliminate redundant re-renders.",
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
    bullets: [
      "Designed and normalized PostgreSQL schemas on Supabase for a job board platform, implementing composite indexes and foreign-key optimizations that reduced read query latency by 25%.",
      "Engineered an end-to-end authentication and checkout workflow integrating Clerk OTP verification and Razorpay webhooks, decreasing user onboarding and checkout drop-off by 40%.",
      "Built a modular, multi-step candidate application flow using React Hook Form, Zod, and Zustand, isolating input state to eliminate redundant component re-renders and improving form completion by 30%.",
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
      "Architected a full-stack Turborepo monorepo with Next.js, consolidating shared UI components, shared TypeScript configs, and NextAuth role-based access control (RBAC) across separate Admin and Candidate portals.",
      "Integrated an isolated code execution engine on AWS EC2 using Judge0 and Supabase (PostgreSQL) to evaluate custom programming submissions in real time, sustaining 99.9% system uptime.",
      "Optimized client-side data fetching and cache invalidation policies with SWR, improving admin dashboard load speeds by 40% during live candidate assessments and scoring rounds.",
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
    category: "Full-Stack Habit Platform & Cloud Infrastructure",
    architectureBreakdown:
      "Full-stack productivity engine partitioning data across databases by access pattern: PostgreSQL for relational entities, DynamoDB for append-only audit trails, and MongoDB with 30-day TTL indexes to prevent table bloat. Features 31-byte bitmasks for O(1) monthly heatmap reads, hourly BullMQ worker jobs bucketed by IANA timezones with Redlock mutexes to eliminate write race conditions, and a modular NestJS monolith deployed on GKE with ArgoCD GitOps.",
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
    category: "Job Board & Candidate Application Platform",
    architectureBreakdown:
      "Hiring platform featuring normalized PostgreSQL schemas on Supabase with composite indexes to minimize read query latency. Integrates Clerk OTP authentication, Razorpay webhook processing for payments, and a multi-step candidate application flow using React Hook Form, Zod validation, and Zustand state isolation to eliminate redundant re-renders.",
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
    category: "Real-Time Code Execution Platform",
    architectureBreakdown:
      "Coding assessment portal running inside a Next.js monorepo with distinct candidate and admin interfaces. Evaluates user code submissions in real time using an isolated Judge0 execution sandbox on AWS EC2, backed by Supabase PostgreSQL and SWR client-side caching.",
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
    vibe: "Scroll Performance & Motion Study",
    description:
      "Interactive Next.js 16 and React 19 interface experiment combining GSAP timeline animations with Lenis smooth scrolling, maintaining consistent 60fps rendering across desktop and mobile viewports.",
    techStack: ["Next.js 16", "React 19", "GSAP", "Lenis Smooth Scroll", "Tailwind CSS"],
    liveUrl: "https://tread-with-style-demo.vercel.app",
    githubUrl: "https://github.com/Desktoo/tread-with-style-demo",
    year: "2026",
  },
  {
    id: "veshmn",
    title: "Veshmn",
    vibe: "Interactive Frontend Engineering",
    description:
      "Interactive web application built with Next.js 16 and TypeScript, implementing Lenis smooth scroll inertia, custom GSAP scroll-triggered animations, and responsive component architecture with Tailwind CSS.",
    techStack: ["Next.js 16", "TypeScript", "GSAP", "Lenis", "Tailwind CSS"],
    liveUrl: "https://veshmn-modified.vercel.app",
    githubUrl: "https://github.com/Desktoo/Veshmn_modified",
    year: "2025",
  },
  {
    id: "rangoon-cafe",
    title: "Rangoon Cafe",
    vibe: "Responsive Web Application",
    description:
      "Mobile-first web application built with Next.js and TypeScript, featuring responsive grid layouts, dynamic menu filtering, and scroll-bound micro-interactions.",
    techStack: ["Next.js 16", "TypeScript", "GSAP", "Tailwind CSS"],
    liveUrl: "https://rangoon-demo.vercel.app",
    githubUrl: "https://github.com/Desktoo/rangoon-demo",
    year: "2025",
  },
  {
    id: "apple-clone",
    title: "Apple Product Showcase Study",
    vibe: "Scroll-Linked Animation Study",
    description:
      "Frontend reverse-engineering study recreating scroll-linked frame sequences and product reveal transitions using React, GSAP ScrollTrigger, and Tailwind CSS.",
    techStack: ["React", "GSAP", "ScrollTrigger", "Tailwind CSS"],
    liveUrl: "https://apple-website-clone-five-azure.vercel.app",
    githubUrl: "https://github.com/Desktoo/Apple_Website_Clone",
    year: "2025",
  },
  {
    id: "audio-video-dashboard",
    title: "Audio / Video Studio Dashboard",
    vibe: "Media Controls & State Architecture",
    description:
      "Audio and video studio dashboard built with React and TypeScript, handling media playback states, audio waveform timelines, and modular control panels.",
    techStack: ["TypeScript", "React", "Tailwind CSS"],
    liveUrl: "https://audio-video-dashboard.vercel.app",
    githubUrl: "https://github.com/Desktoo/audio_video_dashboard",
    year: "2025",
  },
  {
    id: "societyhub-promptify",
    title: "SocietyHub, Promptify & Talks",
    vibe: "Full-Stack Experiments",
    description:
      "Early full-stack applications exploring real-time WebSocket communication in Node.js, AI prompt directory indexing in Next.js, and community portal CRUD operations.",
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
