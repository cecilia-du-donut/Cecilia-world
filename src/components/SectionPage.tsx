import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MENU_ITEMS, type MenuItem } from '../data/menuItems';

interface SectionPageProps {
  section: MenuItem;
  onNavigate: (path: string) => void;
  onOpenMenu: () => void;
}

export const SectionPage: React.FC<SectionPageProps> = ({
  section,
  onNavigate,
  onOpenMenu,
}) => {
  const currentIndex = MENU_ITEMS.findIndex((item) => item.id === section.id);
  const nextSection = MENU_ITEMS[(currentIndex + 1) % MENU_ITEMS.length];

  return (
    <section
      className="min-h-screen bg-[#16070F] text-[#FFF0D9] pt-28 pb-16 px-6 sm:px-10 md:px-16 lg:px-20 flex flex-col justify-between"
      aria-label={`${section.title} placeholder page`}
    >
      <div className="w-full max-w-5xl mx-auto my-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#FFF0D9]/15 pb-6">
          <div className="cw-mono text-xs sm:text-sm tracking-[0.18em] uppercase text-[#F000D8]">
            {section.id} / 06 — SECTION PLACEHOLDER
          </div>
          <div className="flex flex-wrap items-center gap-5 sm:gap-7">
            <button
              type="button"
              onClick={() => onNavigate('/?bag=open')}
              className="inline-flex items-center gap-2 cw-mono text-xs tracking-[0.14em] uppercase text-[#FFF0D9] hover:text-[#F000D8] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO BAG</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 cw-mono text-xs tracking-[0.14em] uppercase text-[#FFF0D9]/65 hover:text-[#F000D8] transition-colors cursor-pointer"
            >
              <span>BACK TO HOME</span>
            </button>
          </div>
        </div>

        <div className="py-10 sm:py-14 border-b border-[#FFF0D9]/15">
          <h1 className="font-editorial font-extrabold uppercase tracking-[-0.03em] leading-[0.98] text-[clamp(2.2rem,6vw,4.75rem)] text-[#FFF0D9]">
            {section.title}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#FFF0D9]/65 max-w-xl">
            {section.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-b border-[#FFF0D9]/15">
          {section.modules.map((moduleTitle, idx) => (
            <div
              key={moduleTitle}
              className="border border-[#FFF0D9]/15 p-5 sm:p-6 bg-[#FFF0D9]/[0.02]"
            >
              <div className="cw-mono text-[11px] tracking-[0.16em] text-[#FFF0D9]/45">
                MODULE 0{idx + 1}
              </div>
              <div className="mt-3 font-editorial font-bold text-lg sm:text-xl tracking-tight text-[#FFF0D9]">
                {moduleTitle}
              </div>
              <div className="mt-4 cw-mono text-[11px] tracking-[0.12em] uppercase text-[#F000D8]">
                Content Forthcoming
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onOpenMenu}
            className="cw-mono text-xs sm:text-sm tracking-[0.14em] uppercase px-5 py-2.5 border border-[#FFF0D9]/35 text-[#FFF0D9] hover:border-[#F000D8] hover:text-[#F000D8] transition-colors cursor-pointer"
          >
            INDEX MENU
          </button>

          <a
            href={nextSection.path}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(nextSection.path);
            }}
            className="inline-flex items-center gap-2 cw-mono text-xs sm:text-sm tracking-[0.14em] uppercase text-[#FFF0D9]/80 hover:text-[#F000D8] transition-colors"
          >
            <span>
              NEXT: {nextSection.id} — {nextSection.title}
            </span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
