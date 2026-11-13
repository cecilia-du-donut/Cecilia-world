import React from 'react';
import './HeroSection.css';

const portraits = {
  orange: {
    src: '/assets/cutouts/cecilia-orange.png',
    webp: '/assets/cutouts/cecilia-orange.webp',
    alt: 'Cecilia seated in an orange outfit',
  },
  red: {
    src: '/assets/cutouts/cecilia-red-top.png',
    webp: '/assets/cutouts/cecilia-red-top.webp',
    alt: 'Cecilia wearing a red top',
  },
  trench: {
    src: '/assets/cutouts/cecilia-trench.png',
    webp: '/assets/cutouts/cecilia-trench.webp',
    alt: 'Cecilia wearing a cream trench coat',
  },
};

const bagSrc = '/assets/photos/bag-cutout.png';
const bagWebp = '/assets/photos/bag-cutout.webp';

const decorations = [
  { file: 'bows/satin-pink-bow.svg', className: 'cw-deco--bow', layer: 'front' },
  { file: 'butterflies/chrome-butterfly.svg', className: 'cw-deco--butterfly', layer: 'front' },
  { file: 'pearls/pearl-necklace.svg', className: 'cw-deco--pearls', layer: 'back' },
  { file: 'crystals/pink-gem.svg', className: 'cw-deco--crystal', layer: 'front' },
  { file: 'stars/glitter-star.svg', className: 'cw-deco--star', layer: 'front' },
  { file: 'doodles/handdrawn-arrows.svg', className: 'cw-deco--arrow', layer: 'front' },
  { file: 'paper/magazine-paper-scrap.svg', className: 'cw-deco--scrap', layer: 'back' },
  { file: 'crystals/diamond-sparkle.svg', className: 'cw-deco--sparkle', layer: 'front' },
];

const maskedDecorations = [
  { file: 'doodles/scribble-lines.svg', className: 'cw-deco--scribble', color: '#ff86c8' },
];

function StickerFilters() {
  return (
    <svg className="cw-filter-defs" aria-hidden="true" focusable="false">
      <defs>
        <filter id="cutout-sticker" x="-16%" y="-12%" width="132%" height="128%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="paper-matte" />
          <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="8" result="paper-grain" />
          <feDisplacementMap in="paper-matte" in2="paper-grain" scale="2.5" xChannelSelector="R" yChannelSelector="G" result="torn-matte" />
          <feFlood floodColor="#fff0d9" result="cream" />
          <feComposite in="cream" in2="torn-matte" operator="in" result="paper-edge" />
          <feGaussianBlur in="paper-matte" stdDeviation="7" result="blurred-shadow" />
          <feOffset in="blurred-shadow" dx="1" dy="8" result="offset-shadow" />
          <feFlood floodColor="#210817" floodOpacity=".34" result="shadow-color" />
          <feComposite in="shadow-color" in2="offset-shadow" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="paper-edge" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function NamePaper() {
  return (
    <div className="cw-name-paper">
      <h1 aria-label="CECILIA DU">
        <span className="cw-name-paper__cecilia cw-serif">CECILIA</span>
        <span className="cw-name-paper__du cw-serif">DU</span>
      </h1>
    </div>
  );
}

function Portraits({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={`cw-portraits${mobile ? ' cw-portraits--mobile' : ''}`}>
      <div className="cw-portraits__paper cw-portraits__paper--one" aria-hidden="true" />
      <div className="cw-portraits__paper cw-portraits__paper--two" aria-hidden="true" />
      <div className="cw-portraits__paper cw-portraits__paper--three" aria-hidden="true" />
      <picture className="cw-person-slot cw-person-slot--orange">
        <source srcSet={portraits.orange.webp} type="image/webp" />
        <img src={portraits.orange.src} alt={portraits.orange.alt} />
      </picture>
      <picture className="cw-person-slot cw-person-slot--red">
        <source srcSet={portraits.red.webp} type="image/webp" />
        <img src={portraits.red.src} alt={portraits.red.alt} />
      </picture>
      <picture className="cw-person-slot cw-person-slot--trench">
        <source srcSet={portraits.trench.webp} type="image/webp" />
        <img src={portraits.trench.src} alt={portraits.trench.alt} />
      </picture>
    </div>
  );
}

function DecorationLayer({ mobile = false }: { mobile?: boolean }) {
  const renderDecorations = (layer: 'back' | 'front') => decorations
    .filter((item) => item.layer === layer)
    .map((item) => <img key={item.file} className={`cw-deco ${item.className}`} src={`/assets/decorations/${item.file}`} alt="" />);

  return (
    <div className={mobile ? 'cw-decorations-host cw-decorations-host--mobile' : 'cw-decorations-host'} aria-hidden="true">
      <div className="cw-decorations cw-decorations--back">
        {renderDecorations('back')}
        <img className="cw-deco cw-deco--cream-paper" src="/assets/decorations/paper/cream-torn-paper.svg" alt="" />
        <img className="cw-deco cw-deco--pink-paper" src="/assets/decorations/paper/pink-torn-paper.svg" alt="" />
      </div>
      <div className="cw-decorations cw-decorations--front">
        {renderDecorations('front')}
        {maskedDecorations.map((item) => (
          <span
            key={item.file}
            className={`cw-deco cw-deco--mask ${item.className}`}
            style={{ '--cw-mask': `url(/assets/decorations/${item.file})`, '--cw-mask-color': item.color } as React.CSSProperties}
          />
        ))}
        <img className="cw-deco cw-deco--pink-washi" src="/assets/decorations/paper/pink-washi-tape.svg" alt="" />
      </div>
    </div>
  );
}

function BagCollage({ mobile = false }: { mobile?: boolean }) {
  return (
    <section className={`cw-bag-collage${mobile ? ' cw-bag-collage--mobile' : ''}`} aria-label="What's in my bag">
      <div className="cw-bag-collage__paper" aria-hidden="true" />
      <h2 className="cw-bag-collage__title">
        <span className="cw-bag-collage__title-a cw-serif">WHAT&apos;S IN</span>
        <span className="cw-bag-collage__title-b cw-serif"><em>MY BAG?</em></span>
      </h2>
      <figure className="cw-bag-art">
        <picture>
          <source srcSet={bagWebp} type="image/webp" />
          <img src={bagSrc} alt="Cream watercolour quilted flap bag with gold chain and clasp" />
        </picture>
      </figure>
    </section>
  );
}

export const HeroSection: React.FC = () => (
  <section className="cw-world" aria-label="Cecilia's World homepage">
    <StickerFilters />
    <div className="cw-world__desktop">
      <DecorationLayer />
      <NamePaper />
      <Portraits />
      <BagCollage />
    </div>
    <div className="cw-world__mobile">
      <DecorationLayer mobile />
      <NamePaper />
      <Portraits mobile />
      <BagCollage mobile />
    </div>
  </section>
);
