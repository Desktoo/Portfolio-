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
    subtitle: "Warm clay & architectural stone (Default)",
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
    subtitle: "Alabaster linen, coastal slate & Baltic blue",
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
  tagline: "Full-Stack & Cloud-Native Engineer building resilient backends, distributed systems, and clean digital products.",
  bio: "Hi, I’m Akshat. I’m a software engineer who builds end-to-end—from multi-database storage architectures and distributed worker queues to crisp, responsive frontends in TypeScript and Next.js. Day to day, I spend most of my time designing modular backend services in NestJS, orchestrating high-concurrency tasks with BullMQ and Redis, and deploying containerized workloads onto Google Kubernetes Engine (GKE) through automated GitOps pipelines with Helm and ArgoCD.",
  secondBio:
    "I care deeply about how software performs under pressure and how it feels to the person using it. Under the hood, that means designing schemas around real access patterns—keeping relational entities in PostgreSQL, logging audit trails to DynamoDB, and using distributed mutexes (Redlock) to eliminate write race conditions before they ever happen. On the front, it means building interfaces that load in milliseconds, manage complex state cleanly with Zustand, and make complicated workflows feel natural and lightweight.",
  coreCapabilities: [
    {
      category: "Backend & Distributed Systems",
      description:
        "NestJS modular monoliths, BullMQ background queues, Redlock distributed locks, Socket.IO real-time sync with Redis Pub/Sub, REST APIs.",
    },
    {
      category: "Databases & Storage Strategy",
      description:
        "PostgreSQL schema normalization & indexing (Supabase/Prisma), AWS DynamoDB (Single-Table Design), MongoDB 30-day TTL indexes, Upstash Redis caching.",
    },
    {
      category: "Cloud, DevOps & GitOps",
      description:
        "Google Kubernetes Engine (GKE, HPA, PVC), Docker containers, Helm charts, ArgoCD zero-downtime deployments, GitHub Actions CI/CD.",
    },
    {
      category: "Modern Frontend Architecture",
      description:
        "Next.js 16 (App Router, Server Components), React, TypeScript, Tailwind CSS, Zustand isolated state, React Hook Form, Zod schema validation.",
    },
  ],
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
    category: "Habit & Productivity Platform (Full-Stack & Cloud)",
    architectureBreakdown:
      "Multi-database habit engine partitioning relational data in PostgreSQL, audit trails in DynamoDB, and 30-day TTL logs in MongoDB with 31-byte bitmasks for O(1) heatmap reads. Powered by IANA timezone-bucketed BullMQ + Redlock queues and a modular NestJS + Next.js monolith on GKE with ArgoCD GitOps.",
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
      "End-to-end hiring and candidate workflow platform featuring normalized PostgreSQL schemas on Supabase with composite indexing. Integrates Clerk OTP verification, Razorpay payment webhooks, and a modular multi-step application flow built with React Hook Form, Zod, and Zustand.",
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
    category: "Real-Time Code Execution & Assessment Portal",
    architectureBreakdown:
      "Interactive coding assessment platform with separate Admin and Candidate portals inside a shared Next.js monorepo. Evaluates custom programming submissions in real time through an isolated Judge0 execution engine on AWS EC2 backed by Supabase PostgreSQL and SWR caching.",
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
    vibe: "Creative Render & Editorial Showcase",
    description:
      "A fashion-forward interactive portfolio and footwear concept focused on fluid scroll physics, bold typography, and choreographed GSAP transitions.",
    techStack: ["Next.js 16", "React 19", "GSAP", "Lenis Smooth Scroll", "Tailwind CSS"],
    liveUrl: "https://tread-with-style-demo.vercel.app",
    githubUrl: "https://github.com/Desktoo/tread-with-style-demo",
    year: "2026",
  },
  {
    id: "veshmn",
    title: "Veshmn",
    vibe: "Architectural & Spatial Web Experience",
    description:
      "Modern home-building and architectural brand exploration blending spatial layouts, smooth Lenis scroll momentum, and subtle motion reveals.",
    techStack: ["Next.js 16", "TypeScript", "GSAP", "Lenis", "Tailwind CSS"],
    liveUrl: "https://veshmn-modified.vercel.app",
    githubUrl: "https://github.com/Desktoo/Veshmn_modified",
    year: "2025",
  },
  {
    id: "rangoon-cafe",
    title: "Rangoon Cafe",
    vibe: "Atmospheric Hospitality Concept",
    description:
      "Story-driven cafe and dining web render crafted around warm editorial storytelling, tactile menu layouts, and scroll-bound GSAP animations.",
    techStack: ["Next.js 16", "TypeScript", "GSAP", "Tailwind CSS"],
    liveUrl: "https://rangoon-demo.vercel.app",
    githubUrl: "https://github.com/Desktoo/rangoon-demo",
    year: "2025",
  },
  {
    id: "apple-clone",
    title: "Apple Product Showcase Study",
    vibe: "Interactive 3D & Scroll Motion Study",
    description:
      "A frontend motion study recreating Apple's signature hardware reveal choreography, scroll-linked frame transitions, and micro-interactions.",
    techStack: ["React", "GSAP", "ScrollTrigger", "Tailwind CSS"],
    liveUrl: "https://apple-website-clone-five-azure.vercel.app",
    githubUrl: "https://github.com/Desktoo/Apple_Website_Clone",
    year: "2025",
  },
  {
    id: "audio-video-dashboard",
    title: "Audio / Video Studio Dashboard",
    vibe: "Interface & Media Control Render",
    description:
      "A clean, tactile media control and creator analytics dashboard experiment built to explore dense interface hierarchy in TypeScript.",
    techStack: ["TypeScript", "React", "Tailwind CSS"],
    liveUrl: "https://audio-video-dashboard.vercel.app",
    githubUrl: "https://github.com/Desktoo/audio_video_dashboard",
    year: "2025",
  },
  {
    id: "societyhub-promptify",
    title: "SocietyHub, Promptify & Talks",
    vibe: "Early Full-Stack & Community Side Projects",
    description:
      "Earlier weekend builds and explorations—ranging from a neighborhood community portal (SocietyHub) and AI prompt directory (Promptify) to real-time chat apps (Talks & Yapp).",
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
