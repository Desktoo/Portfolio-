import DesktopLayout from "./components/desktop/DesktopLayout";
import MobileLayout from "./components/mobile/MobileLayout";
import { ThemeProvider } from "./context/ThemeContext";

export default function Home() {
  return (
    <ThemeProvider>
      {/* Mobile-First Experience (<768px): Touch-optimized, card-based, fast, zero text fatigue */}
      <div className="block md:hidden">
        <MobileLayout />
      </div>

      {/* Laptop & Tablet Experience (>=768px): Dual-column editorial with celestial SVG & vinyl player */}
      <div className="hidden md:block">
        <DesktopLayout />
      </div>
    </ThemeProvider>
  );
}
