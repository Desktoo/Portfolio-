import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroAboutSection from "./components/sections/HeroAboutSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ContactSection from "./components/sections/ContactSection";
import SystemArchitectureHeroSvg from "./components/svg/SystemArchitectureHeroSvg";
import VinylMusicPlayer from "./components/svg/VinylMusicPlayer";
import { ThemeProvider } from "./context/ThemeContext";

export default function Home() {
  return (
    <ThemeProvider>
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
          className="mx-auto max-w-7xl px-6 sm:px-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-14"
        >
          {/* Scrollable Editorial Content Column */}
          <div className="lg:col-span-7">
            <HeroAboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
          </div>

          {/* Sticky Right Viewport Column: Scaled-Up Botanical & Celestial Illustration + Vinyl Record Player */}
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
    </ThemeProvider>
  );
}
