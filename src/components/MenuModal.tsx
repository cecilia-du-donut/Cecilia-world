import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuItems';
import './MenuModal.css';

interface MenuModalProps {
  activePath: string;
  onNavigate: (path: string) => void;
  onClose: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  activePath,
  onNavigate,
  onClose,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    setHoveredId(null);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <section
      className="cw-menu-sheet flex flex-col justify-between overflow-x-hidden px-5 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10 lg:px-20 lg:py-11 select-none"
      aria-label="Site Navigation Menu"
    >
      {/* Top Editorial Spread Header: CECILIA'S WORLD® (left) and CLOSE × (right) */}
      <header className="cw-menu-sheet__inner w-full max-w-6xl mx-auto flex items-center justify-between border-b border-[#583A38]/22 pb-4 sm:pb-5 shrink-0">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            onClose();
          }}
          className="font-sans text-sm sm:text-base font-extrabold tracking-wide text-[#3A1222] hover:text-[#F000D8] transition-colors duration-200 uppercase"
        >
          CECILIA&apos;S WORLD<span className="align-super text-[0.62em] tracking-normal">&reg;</span>
        </a>

        <span className="hidden md:inline-block cw-mono text-[11px] tracking-[0.22em] text-[#7D665D] uppercase">
          INDEX / CONTENTS
        </span>

        <button
          type="button"
          onClick={onClose}
          className="cw-mono text-xs sm:text-sm font-bold tracking-[0.16em] text-[#3A1222] hover:text-[#F000D8] transition-colors duration-200 cursor-pointer uppercase py-1"
          aria-label="Close menu and return to homepage"
        >
          CLOSE ×
        </button>
      </header>

      {/* Six-Item Y2K × Vintage Editorial Magazine Directory */}
      <div className="cw-menu-sheet__inner w-full max-w-5xl mx-auto my-auto py-6 sm:py-8 md:py-9">
        <nav
          aria-label="Primary sections"
          className="w-full flex flex-col divide-y divide-[#583A38]/20 border-y border-[#583A38]/20"
        >
          {MENU_ITEMS.map((item) => {
            const isCurrentRoute = activePath === item.path;
            const isHovered = hoveredId === item.id;
            const isHighlighted = isCurrentRoute || isHovered;

            return (
              <a
                key={item.id}
                href={item.path}
                aria-current={isCurrentRoute ? 'page' : undefined}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId((prev) => (prev === item.id ? null : prev))}
                onFocus={() => setHoveredId(item.id)}
                onBlur={() => setHoveredId((prev) => (prev === item.id ? null : prev))}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.path);
                }}
                className={`cw-menu-row group flex items-center justify-between gap-2 sm:gap-5 py-4 sm:py-5 md:py-[1.35rem] cursor-pointer focus:outline-none ${
                  isHighlighted ? 'cw-menu-row--active' : ''
                }`}
              >
                {/* Left: Small warm taupe-grey editorial folio number */}
                <span
                  className={`cw-menu-row-num w-9 sm:w-14 md:w-16 shrink-0 cw-mono text-xs sm:text-sm tracking-[0.16em] ${
                    isHighlighted ? 'text-[#F000D8]' : 'text-[#8B756A]'
                  }`}
                >
                  {item.id}
                </span>

                {/* Center: Wide geometric Y2K display title */}
                <span
                  className={`cw-menu-row-title cw-menu-y2k-title flex-1 min-w-0 text-[clamp(1.06rem,4.05vw,2.35rem)] ${
                    isHighlighted ? 'text-[#F000D8]' : 'text-[#3A1222]'
                  }`}
                >
                  {item.title}
                </span>

                {/* Right: Crisp editorial diagonal arrow */}
                <span className="w-7 sm:w-12 shrink-0 flex items-center justify-end">
                  <ArrowUpRight
                    strokeWidth={1.85}
                    className={`cw-menu-row-arrow w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${
                      isHighlighted ? 'text-[#F000D8] opacity-100' : 'text-[#5A3442]/55 opacity-80'
                    }`}
                  />
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Subtle magazine print folio footer margin */}
      <footer className="cw-menu-sheet__inner w-full max-w-6xl mx-auto flex items-center justify-between pt-3 text-[10px] sm:text-[11px] cw-mono tracking-[0.18em] text-[#8B756A] uppercase shrink-0">
        <span>ISSUE 01 — DIRECTORY</span>
        <span className="cw-serif italic normal-case tracking-normal text-xs sm:text-sm text-[#6E4D53]">
          Cecilia Du Studio
        </span>
      </footer>
    </section>
  );
};
