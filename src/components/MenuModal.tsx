import React, { useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  title: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: '01', title: 'ABOUT' },
  { id: '02', title: 'SERVICES' },
  { id: '03', title: 'SELECTED WORK' },
  { id: '04', title: 'PLAYGROUND' },
  { id: '05', title: 'SCRAPBOOK' },
];

export const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState<string>('01');
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleItemClick = (title: string) => {
    setFeedback(`${title} will be launched in the next stage.`);
    setTimeout(() => {
      setFeedback(null);
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-14 select-none animate-in fade-in duration-200">
      {/* Top Bar: Brand and Close */}
      <div className="w-full flex items-center justify-between border-b border-[#D0D0D0] pb-5">
        <span className="font-editorial text-lg md:text-xl font-black tracking-tight text-[#F000D8]">
          CECILIA&apos;S WORLD
        </span>
        <button
          onClick={onClose}
          className="group flex items-center gap-2 font-editorial text-sm md:text-base font-bold tracking-widest text-[#F000D8] hover:opacity-80 transition-opacity cursor-pointer uppercase py-1"
          aria-label="Close menu"
        >
          <span>CLOSE ×</span>
        </button>
      </div>

      {/* Five Unified Editorial Rows (Fit entirely in 1 Desktop Viewport without scrolling) */}
      <div className="my-auto w-full max-w-5xl mx-auto py-2">
        <nav className="w-full flex flex-col divide-y divide-[#D0D0D0]">
          {MENU_ITEMS.map((item) => {
            const isSelected = activeItem === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveItem(item.id)}
                onClick={() => handleItemClick(item.title)}
                className="group flex items-center justify-between py-4 sm:py-5 md:py-6 lg:py-7 cursor-pointer transition-colors duration-200"
              >
                {/* Left: Aligned Number */}
                <span
                  className={`w-12 sm:w-16 md:w-20 font-mono text-sm sm:text-base md:text-lg font-medium tracking-wider transition-colors duration-200 ${
                    isSelected ? 'text-[#F000D8]' : 'text-[#D0D0D0]'
                  }`}
                >
                  {item.id}
                </span>

                {/* Center: Scaled Title (Single line, ~10-15% reduced for optimal balance) */}
                <div className="flex-1 min-w-0 pr-4 flex items-center overflow-hidden">
                  <span
                    className={`font-editorial font-extrabold tracking-tight whitespace-nowrap transition-colors duration-200 text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] ${
                      isSelected ? 'text-[#F000D8]' : 'text-black'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>

                {/* Right: Clean minimal directional arrow */}
                <div className="w-12 sm:w-16 md:w-20 flex-shrink-0 flex items-center justify-end">
                  <ArrowUpRight
                    className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-all duration-200 ${
                      isSelected
                        ? 'opacity-100 text-[#F000D8] translate-x-1 -translate-y-1'
                        : 'opacity-25 text-black group-hover:opacity-100 group-hover:text-[#F000D8]'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Bar: Clean identity & credit */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#D0D0D0] pt-5 gap-2 text-xs md:text-sm font-medium text-black/60">
        <div>
          <span className="font-bold text-black">CECILIA DU</span>
          <span className="mx-2 text-black/30">|</span>
          <span className="text-[#F000D8] font-semibold">CREATIVE MARKETER · CONTENT CREATOR</span>
        </div>
        <div className="font-mono text-[11px] tracking-wider text-black/40">
          CECILIA&apos;S WORLD
        </div>
      </div>

      {/* Temporary Feedback Notification */}
      {feedback && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs md:text-sm font-medium px-5 py-2.5 rounded-none shadow-xl border-l-2 border-[#F000D8] transition-all">
          {feedback}
        </div>
      )}
    </div>
  );
};
