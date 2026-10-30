"use client";

import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import HeroAboutSection from "../sections/HeroAboutSection";
import ExperienceSection from "../sections/ExperienceSection";
import ProjectsSection from "../sections/ProjectsSection";
import ContactSection from "../sections/ContactSection";
import SystemArchitectureHeroSvg from "../svg/SystemArchitectureHeroSvg";
import VinylMusicPlayer from "../svg/VinylMusicPlayer";

export default function DesktopLayout() {
  return (
    <div
      className="min-h-screen w-full transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text-primary)",
      }}
    >
      <Header />

      <main
        id="main-content"
        className="mx-auto max-w-7xl px-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-14 lg:px-10"
      >
        {/* Scrollable Editorial Content Column */}
        <div className="lg:col-span-7">
          <HeroAboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
        </div>

        {/* Sticky Right Viewport Column: Illustration + Vinyl Record Player */}
        <aside
          aria-label="Featured Illustration and Vinyl Music Player"
          className="flex flex-col items-center justify-center py-10 lg:sticky lg:top-16 lg:col-span-5 lg:h-[calc(100vh-4rem)] lg:py-0 lg:pl-4"
        >
          <div className="w-full">
            <SystemArchitectureHeroSvg />
            <VinylMusicPlayer />
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
