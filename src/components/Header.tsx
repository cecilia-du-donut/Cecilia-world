import React from 'react';

interface HeaderProps {
  onOpenMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8 md:px-10 md:py-5 bg-transparent pointer-events-none">
      <div className="pointer-events-auto">
        <span className="font-sans text-sm md:text-base font-extrabold tracking-wide text-[#FFF0D9] select-none">
          CECILIA&apos;S WORLD<span className="align-super text-[0.62em] tracking-normal">&reg;</span>
        </span>
      </div>

      <div className="pointer-events-auto">
        <button
          onClick={onOpenMenu}
          className="group relative font-sans text-xs md:text-sm font-semibold tracking-wider text-[#FFF0D9] transition-all hover:opacity-85 active:scale-95 cursor-pointer uppercase px-5 py-2 border border-[#FFF0D9]/55 rounded-full"
          aria-label="Open Navigation Menu"
        >
          <span>MENU</span>
          <span className="absolute bottom-1 left-1/2 h-px w-0 bg-[#FF39A9] transition-all duration-300 group-hover:left-5 group-hover:w-[calc(100%-2.5rem)]" />
        </button>
      </div>
    </header>
  );
};
