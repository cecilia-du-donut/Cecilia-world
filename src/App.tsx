import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MenuModal } from './components/MenuModal';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F3EEDF] text-[#171717] relative selection:bg-[#F000B8] selection:text-white">
      {/* Editorial Header */}
      <Header onOpenMenu={() => setIsMenuOpen(true)} />

      {/* Hero Section */}
      <main>
        <HeroSection />
      </main>

      {/* Full-screen Editorial Menu */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
}
