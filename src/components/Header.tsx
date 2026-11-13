import React from 'react';

interface HeaderProps {
  onOpenMenu: () => void;
  isLightBackdrop?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu, isLightBackdrop = false }) => {
  const wordmarkColor = isLightBackdrop ? 'text-[#481A34]' : 'text-[#FFF0D9]';
  const menuBtnColors = isLightBackdrop
    ? 'text-[#481A34] border-[#481A34]/45 hover:border-[#F000D8] hover:text-[#F000D8]'
    : 'text-[#FFF0D9] border-[#FFF0D9]/55';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8 md:px-10 md:py-5 bg-transparent pointer-events-none">
      <div className="pointer-events-auto">
        <span className={`font-sans text-sm md:text-base font-extrabold tracking-wide select-none transition-colors duration-500 ${wordmarkColor}`}>
          CECILIA&apos;S WORLD<span className="align-super text-[0.62em] tracking-normal">&reg;</span>
        </span>
      </div>

      <div className="pointer-events-auto">
        <button
          onClick={onOpenMenu}
          className={`group relative font-sans text-xs md:text-sm font-semibold tracking-wider transition-all duration-500 hover:opacity-85 active:scale-95 cursor-pointer uppercase px-5 py-2 border rounded-full ${menuBtnColors}`}
          aria-label="Open Navigation Menu"
        >
          <span>MENU</span>
          <span className="absolute bottom-1 left-1/2 h-px w-0 bg-[#FF39A9] transition-all duration-300 group-hover:left-5 group-hover:w-[calc(100%-2.5rem)]" />
        </button>
      </div>
    </header>
  );
};
