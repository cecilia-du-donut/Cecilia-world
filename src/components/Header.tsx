import React from 'react';

interface HeaderProps {
  onOpenMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 sm:px-8 md:px-10 md:py-6 bg-transparent pointer-events-none">
      {/* Brand logo: CECILIA'S WORLD in Electric Hot Pink #F000D8 */}
      <div className="pointer-events-auto">
        <span className="font-editorial text-lg md:text-xl font-black tracking-tight text-[#F000D8] select-none">
          CECILIA&apos;S WORLD
        </span>
      </div>

      {/* Menu button: MENU in Electric Hot Pink #F000D8 */}
      <div className="pointer-events-auto">
        <button
          onClick={onOpenMenu}
          className="group relative font-editorial text-base md:text-lg font-bold tracking-wider text-[#F000D8] transition-all hover:opacity-85 active:scale-95 cursor-pointer uppercase py-1"
          aria-label="Open Navigation Menu"
        >
          <span>MENU</span>
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F000D8] transition-all duration-300 group-hover:w-full" />
        </button>
      </div>
    </header>
  );
};
