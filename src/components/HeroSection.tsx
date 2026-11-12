import React, { useState } from 'react';
import { PhotoLightbox } from './PhotoLightbox';

export const HeroSection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<{ src: string; caption: string } | null>(null);

  // The 6 authentic personal photos provided by Cecilia
  const photos = {
    // 1. Top-Left (Matches black hat/red flower portrait in reference)
    topLeft: {
      src: '/assets/aistudio/IMG_3545_dbaf3a3c.JPG',
      caption: 'Rome, Italy — Open-Back Yellow Dress by Colosseum',
    },
    // 2. Top Mid-Left (Matches car/gas station photo in reference)
    topMid: {
      src: '/assets/aistudio/IMG_6920_3_fcbe5670.JPG',
      caption: 'Outdoor Editorial — Trench Coat & Open Sky',
    },
    // 3. Top Mid-Right (Matches Janelle Monae yellow backdrop portrait in reference)
    topRight: {
      src: '/assets/aistudio/IMG_2032_a8118e6c.JPG',
      caption: 'Sun & Shadow — Lace Top & Summer Denim',
    },
    // 4. Center Focal Portrait (Matches Robert Pattinson center portrait in reference)
    center: {
      src: '/assets/aistudio/Facetune_12-09-2019-02-04-20_2_77477735.JPG',
      caption: 'Studio Fashion Portrait — Red Rubber Gloves & Black Jacket',
    },
    // 5. Mid-Right (Matches Oprah purple curtain portrait in reference)
    midRight: {
      src: '/assets/aistudio/IMG_7809_2_f659fcde.JPG',
      caption: 'Barcelona Rooftop — Iridescent Purple Dress & City View',
    },
    // 6. Right Edge / Accent (Matches cropped portrait entering right edge in reference)
    rightEdge: {
      src: '/assets/aistudio/IMG_3466_3_991e1ed1.JPG',
      caption: 'Garden Editorial — Crimson Dress & Heels',
    },
  };

  return (
    <section className="relative w-full min-h-screen bg-white select-none overflow-x-hidden">
      {/* ========================================================================= */}
      {/* DESKTOP FULL-SCREEN EDITORIAL COLLAGE                                     */}
      {/* Zoned composition: top photo strip → oversized typography → focal portrait */}
      {/* → supporting photos → clean identity block. No bottom bleed.              */}
      {/* ========================================================================= */}
      <div className="hidden md:block relative w-full h-screen overflow-hidden bg-white">

        {/* ----------------------------------------------------------------------- */}
        {/* LAYER 1: BACKGROUND PHOTOS — top strip, sitting behind typography (z-10) */}
        {/* ----------------------------------------------------------------------- */}

        {/* 1. TOP-LEFT PHOTO (Rome Alleyway / Yellow Backless Dress) */}
        <div
          onClick={() => setActivePhoto(photos.topLeft)}
          className="absolute z-10 cursor-pointer group transition-all duration-300 hover:z-35"
          style={{ left: '3%', top: '0%', width: '15vw', height: '25vh' }}
          title="Click to expand photo"
        >
          <div className="w-full h-full overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_30px_rgba(240,0,216,0.25)] transition-shadow">
            <img
              src={photos.topLeft.src}
              alt={photos.topLeft.caption}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />
          </div>
        </div>

        {/* 2. TOP MID-LEFT PHOTO (Trench Coat & Open Sky Landscape) */}
        <div
          onClick={() => setActivePhoto(photos.topMid)}
          className="absolute z-10 cursor-pointer group transition-all duration-300 hover:z-35"
          style={{ left: '33%', top: '0%', width: '12vw', height: '14vh' }}
          title="Click to expand photo"
        >
          <div className="w-full h-full overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)] group-hover:shadow-[0_8px_25px_rgba(240,0,216,0.25)] transition-shadow">
            <img
              src={photos.topMid.src}
              alt={photos.topMid.caption}
              className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />
          </div>
        </div>

        {/* 3. RIGHT EDGE CROPPED PHOTO (Crimson Dress Seated) — behind text, right edge */}
        <div
          onClick={() => setActivePhoto(photos.rightEdge)}
          className="absolute z-10 cursor-pointer group transition-all duration-300 hover:z-35"
          style={{ left: '91%', top: '14vh', width: '8.5vw', height: '34vh' }}
          title="Click to expand photo"
        >
          <div className="w-full h-full overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_30px_rgba(240,0,216,0.25)] transition-shadow">
            <img
              src={photos.rightEdge.src}
              alt={photos.rightEdge.caption}
              className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* LAYER 2: OVERSIZED TYPOGRAPHY IN ELECTRIC MAGENTA #F000D8 (z-20)         */}
        {/* Positioned in upper-middle zone — no bottom bleed, fully contained       */}
        {/* ----------------------------------------------------------------------- */}

        {/* Row 1: CECILIA — upper area, left-aligned, spanning wide */}
        <div className="absolute z-20 pointer-events-none overflow-hidden" style={{ left: '2%', top: '20vh' }}>
          <h1
            className="font-editorial font-extrabold text-[#F000D8] tracking-[-0.05em] leading-[0.82] select-none text-left whitespace-nowrap"
            style={{ fontSize: 'clamp(6rem, 13.5vw, 18rem)' }}
          >
            CECILIA
          </h1>
        </div>

        {/* Row 2: DU — below CECILIA, offset left, overlapping with focal portrait */}
        <div className="absolute z-20 pointer-events-none overflow-hidden" style={{ left: '2%', top: '46vh' }}>
          <div
            className="font-editorial font-extrabold text-[#F000D8] tracking-[-0.05em] leading-[0.80] select-none whitespace-nowrap"
            style={{ fontSize: 'clamp(6rem, 13.5vw, 18rem)' }}
          >
            DU
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* LAYER 3: FOCAL PORTRAIT — Red Rubber Gloves (z-30)                       */}
        {/* The primary visual anchor — largest photo, centered, strongest shadow     */}
        {/* ----------------------------------------------------------------------- */}
        <div
          onClick={() => setActivePhoto(photos.center)}
          className="absolute z-30 cursor-pointer group transition-all duration-300 hover:z-35"
          style={{ left: '37%', top: '36vh', width: '17vw', height: '42vh' }}
          title="Centerpiece Photo: Click to expand"
        >
          <div className="w-full h-full overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-black/5 group-hover:border-[#F000D8] group-hover:shadow-[0_14px_50px_rgba(240,0,216,0.35)] transition-all">
            <img
              src={photos.center.src}
              alt={photos.center.caption}
              className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* LAYER 3b: FOREGROUND SUPPORTING PHOTOS (z-30)                            */}
        {/* Framing the focal portrait from the sides                                */}
        {/* ----------------------------------------------------------------------- */}

        {/* 4. TOP MID-RIGHT PHOTO (Yellow Lace Top & Architectural Wall) */}
        <div
          onClick={() => setActivePhoto(photos.topRight)}
          className="absolute z-30 cursor-pointer group transition-all duration-300 hover:z-35"
          style={{ left: '66%', top: '2vh', width: '13vw', height: '30vh' }}
          title="Click to expand photo"
        >
          <div className="w-full h-full overflow-hidden shadow-[0_6px_25px_rgba(0,0,0,0.08)] group-hover:shadow-[0_10px_35px_rgba(240,0,216,0.3)] transition-shadow">
            <img
              src={photos.topRight.src}
              alt={photos.topRight.caption}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />
          </div>
        </div>

        {/* 5. MID-RIGHT PHOTO (Barcelona Rooftop / Iridescent Purple Dress) */}
        <div
          onClick={() => setActivePhoto(photos.midRight)}
          className="absolute z-30 cursor-pointer group transition-all duration-300 hover:z-35"
          style={{ left: '70%', top: '44vh', width: '14vw', height: '33vh' }}
          title="Click to expand photo"
        >
          <div className="w-full h-full overflow-hidden shadow-[0_6px_25px_rgba(0,0,0,0.08)] group-hover:shadow-[0_10px_35px_rgba(240,0,216,0.3)] transition-shadow">
            <img
              src={photos.midRight.src}
              alt={photos.midRight.caption}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* LAYER 4: IDENTITY BLOCK (z-40) — clean, unobstructed bottom-left         */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className="absolute z-40 pointer-events-auto flex flex-col gap-1 select-text"
          style={{ left: '4%', bottom: '5vh' }}
        >
          <h2 className="font-editorial font-extrabold text-2xl lg:text-3xl tracking-tight text-black leading-tight">
            CECILIA DU
          </h2>
          <p className="font-mono text-xs lg:text-sm font-bold text-[#F000D8] tracking-[0.2em] uppercase">
            CREATIVE MARKETER · CONTENT CREATOR
          </p>
        </div>

        {/* Editorial divider line above identity block */}
        <div
          className="absolute z-20 pointer-events-none"
          style={{ left: '4%', bottom: '12vh', width: '24vw', height: '1px', backgroundColor: '#D0D0D0' }}
        />
      </div>

      {/* ========================================================================= */}
      {/* MOBILE RESPONSIVE CANVAS (< 768px)                                        */}
      {/* Preserves the electric collage energy & oversized typography without overflow */}
      {/* ========================================================================= */}
      <div className="block md:hidden w-full min-h-screen px-5 pt-20 pb-14 flex flex-col justify-between bg-white">
        {/* Mobile Central Oversized Typography */}
        <div className="w-full pt-4 pb-2">
          <h1 className="font-editorial font-extrabold text-[#F000D8] text-[21vw] leading-[0.82] tracking-[-0.05em]">
            CECILIA
          </h1>
          <div className="font-editorial font-extrabold text-[#F000D8] text-[21vw] leading-[0.80] tracking-[-0.05em] -mt-2">
            DU
          </div>
        </div>

        {/* Mobile Editorial Collage Layout */}
        <div className="relative w-full my-6 min-h-[460px]">
          {/* Focal Portrait - Red Gloves */}
          <div
            onClick={() => setActivePhoto(photos.center)}
            className="absolute left-[10%] top-6 w-[80%] aspect-[3/4] z-20 shadow-xl overflow-hidden cursor-pointer border border-black/5"
          >
            <img
              src={photos.center.src}
              alt={photos.center.caption}
              className="w-full h-full object-cover object-[center_35%]"
            />
          </div>

          {/* Staggered satellite photos echoing reference composition */}
          <div
            onClick={() => setActivePhoto(photos.topLeft)}
            className="absolute -left-2 -top-4 w-[38%] aspect-[3/4] z-10 shadow-md overflow-hidden"
          >
            <img
              src={photos.topLeft.src}
              alt={photos.topLeft.caption}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div
            onClick={() => setActivePhoto(photos.topRight)}
            className="absolute -right-2 top-20 w-[42%] aspect-[3/4] z-25 shadow-lg overflow-hidden"
          >
            <img
              src={photos.topRight.src}
              alt={photos.topRight.caption}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div
            onClick={() => setActivePhoto(photos.midRight)}
            className="absolute left-2 bottom-0 w-[44%] aspect-[3/4] z-30 shadow-lg overflow-hidden"
          >
            <img
              src={photos.midRight.src}
              alt={photos.midRight.caption}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div
            onClick={() => setActivePhoto(photos.rightEdge)}
            className="absolute right-2 -bottom-4 w-[38%] aspect-[4/5] z-35 shadow-lg overflow-hidden"
          >
            <img
              src={photos.rightEdge.src}
              alt={photos.rightEdge.caption}
              className="w-full h-full object-cover object-[center_20%]"
            />
          </div>
        </div>

        {/* Mobile Identity Block */}
        <div className="pt-4 border-t border-[#D0D0D0] flex flex-col gap-1">
          <h2 className="font-editorial font-extrabold text-xl tracking-tight text-black">
            CECILIA DU
          </h2>
          <p className="font-mono text-xs font-bold tracking-[0.16em] text-[#F000D8] uppercase">
            CREATIVE MARKETER · CONTENT CREATOR
          </p>
        </div>
      </div>

      {/* Lightbox for full photo view */}
      <PhotoLightbox
        imageSrc={activePhoto?.src || null}
        caption={activePhoto?.caption}
        onClose={() => setActivePhoto(null)}
      />
    </section>
  );
};
