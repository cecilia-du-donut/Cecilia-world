import React from 'react';
import { X } from 'lucide-react';

interface PhotoLightboxProps {
  imageSrc: string | null;
  caption?: string;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ imageSrc, caption, onClose }) => {
  if (!imageSrc) return null;

  return (
    <div 
      className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/80 hover:text-[#F000B8] transition-colors p-2 rounded-full border border-white/20 hover:border-[#F000B8] z-10 cursor-pointer"
        aria-label="Close photo view"
      >
        <X className="w-6 h-6" />
      </button>

      <div 
        className="relative max-w-5xl max-h-[88vh] overflow-hidden rounded-sm shadow-2xl cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageSrc}
          alt={caption || "Cecilia Du Editorial Photograph"}
          className="w-auto h-auto max-h-[82vh] max-w-[90vw] object-contain mx-auto"
        />
        {caption && (
          <div className="bg-black/80 text-white text-xs md:text-sm font-mono py-2.5 px-4 text-center tracking-wider text-[#F000B8]">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
};
