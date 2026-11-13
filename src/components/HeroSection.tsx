import React, { useEffect, useRef, useState } from 'react';
import { MENU_ITEMS } from '../data/menuItems';
import './HeroSection.css';

interface HeroSectionProps {
  isBagOpen: boolean;
  onOpenBag: () => void;
  onCloseBag: () => void;
  onNavigate: (path: string) => void;
}

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
const bagOpenSrc = '/assets/photos/bag-open-cutout.png';
const bagOpenWebp = '/assets/photos/bag-open-cutout.webp';

const decorations = [
  // Back-layer enlarged parchment sheet behind the portrait triad & supporting clippings
  { file: 'parchment.png', className: 'cw-deco--parchment-ground', layer: 'back' },
  { file: 'parchment-pink.png', className: 'cw-deco--parchment-bag', layer: 'back' },
  { file: 'young-beautiful.png', className: 'cw-deco--young', layer: 'back' },

  // Front-layer transparent cutouts, torn leopard/polka adhesive tapes & editorial transition line marks
  { file: 'halftone-eye.png', className: 'cw-deco--eye', layer: 'front' },
  { file: 'pink-glitter-star.png', className: 'cw-deco--pink-star', layer: 'front' },
  { file: 'chrome-butterfly.png', className: 'cw-deco--butterfly', layer: 'front' },
  { file: 'satin-bow.png', className: 'cw-deco--satin-bow', layer: 'front' },
  { file: 'tape-leopard.svg', className: 'cw-deco--tape-leopard-center', layer: 'front' },
  { file: 'polka-strip.svg', className: 'cw-deco--polka-center', layer: 'back' },
  { file: 'tape-leopard.svg', className: 'cw-deco--tape-leopard-bag', layer: 'front' },
  { file: 'tape-polka.svg', className: 'cw-deco--tape-polka-bag', layer: 'front' },
  { file: 'lines-lime.svg', className: 'cw-deco--lines-lime', layer: 'front' },
  { file: 'lines-bridge-upper.svg', className: 'cw-deco--lines-bridge-upper', layer: 'front' },
  { file: 'lines-cream.svg', className: 'cw-deco--lines-cream', layer: 'front' },
  { file: 'lines-bridge-lower.svg', className: 'cw-deco--lines-bridge-lower', layer: 'front' },
];

function StickerFilters() {
  return (
    <svg className="cw-filter-defs" aria-hidden="true" focusable="false">
      <defs>
        <filter id="cutout-sticker" x="-18%" y="-14%" width="136%" height="132%" colorInterpolationFilters="sRGB">
          {/* Outer jagged deckled paper core rim (exposed white-cream torn fiber edge) */}
          <feMorphology in="SourceAlpha" operator="dilate" radius="8" result="outer-dilate" />
          <feTurbulence type="fractalNoise" baseFrequency=".021 .027" numOctaves="4" seed="8" result="tear-macro" />
          <feDisplacementMap in="outer-dilate" in2="tear-macro" scale="9" xChannelSelector="R" yChannelSelector="G" result="torn-outer" />
          <feFlood floodColor="#fff9f0" result="paper-core" />
          <feComposite in="paper-core" in2="torn-outer" operator="in" result="deckle-outer" />

          {/* Inner aged cream paper matte & subtle paper fiber grain */}
          <feMorphology in="SourceAlpha" operator="dilate" radius="4.5" result="inner-dilate" />
          <feDisplacementMap in="inner-dilate" in2="tear-macro" scale="4.8" xChannelSelector="G" yChannelSelector="B" result="torn-inner" />
          <feTurbulence type="fractalNoise" baseFrequency=".42" numOctaves="3" seed="14" result="paper-tooth" />
          <feColorMatrix
            type="matrix"
            values="0.12 0 0 0 0.86  0 0.11 0 0 0.77  0 0 0.1 0 0.65  0 0 0 0 1"
            in="paper-tooth"
            result="textured-cream"
          />
          <feComposite in="textured-cream" in2="torn-inner" operator="in" result="deckle-inner" />

          {/* Soft lifted paper shadow */}
          <feGaussianBlur in="torn-outer" stdDeviation="7" result="blurred-shadow" />
          <feOffset in="blurred-shadow" dx="1.5" dy="8.5" result="offset-shadow" />
          <feFlood floodColor="#210817" floodOpacity=".36" result="shadow-color" />
          <feComposite in="shadow-color" in2="offset-shadow" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="deckle-outer" />
            <feMergeNode in="deckle-inner" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="cutout-sticker-orange" x="-18%" y="-14%" width="136%" height="132%" colorInterpolationFilters="sRGB">
          <feComponentTransfer in="SourceAlpha" result="solid-alpha">
            <feFuncA type="linear" slope="12" intercept="-9.6" />
          </feComponentTransfer>
          <feComposite in="SourceGraphic" in2="solid-alpha" operator="in" result="clean-graphic" />

          {/* Outer jagged deckled paper core rim (exposed white-cream torn fiber edge) */}
          <feMorphology in="solid-alpha" operator="dilate" radius="8" result="outer-dilate" />
          <feTurbulence type="fractalNoise" baseFrequency=".021 .027" numOctaves="4" seed="12" result="tear-macro" />
          <feDisplacementMap in="outer-dilate" in2="tear-macro" scale="9" xChannelSelector="R" yChannelSelector="G" result="torn-outer" />
          <feFlood floodColor="#fff9f0" result="paper-core" />
          <feComposite in="paper-core" in2="torn-outer" operator="in" result="deckle-outer" />

          {/* Inner aged cream paper matte & subtle paper fiber grain */}
          <feMorphology in="solid-alpha" operator="dilate" radius="4.5" result="inner-dilate" />
          <feDisplacementMap in="inner-dilate" in2="tear-macro" scale="4.8" xChannelSelector="G" yChannelSelector="B" result="torn-inner" />
          <feTurbulence type="fractalNoise" baseFrequency=".42" numOctaves="3" seed="18" result="paper-tooth" />
          <feColorMatrix
            type="matrix"
            values="0.12 0 0 0 0.86  0 0.11 0 0 0.77  0 0 0.1 0 0.65  0 0 0 0 1"
            in="paper-tooth"
            result="textured-cream"
          />
          <feComposite in="textured-cream" in2="torn-inner" operator="in" result="deckle-inner" />

          {/* Soft lifted paper shadow */}
          <feGaussianBlur in="torn-outer" stdDeviation="7" result="blurred-shadow" />
          <feOffset in="blurred-shadow" dx="1.5" dy="8.5" result="offset-shadow" />
          <feFlood floodColor="#210817" floodOpacity=".36" result="shadow-color" />
          <feComposite in="shadow-color" in2="offset-shadow" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="deckle-outer" />
            <feMergeNode in="deckle-inner" />
            <feMergeNode in="clean-graphic" />
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
  const renderDecorations = (layer: 'back' | 'front') =>
    decorations
      .filter((item) => item.layer === layer)
      .map((item) => (
        <img
          key={`${item.file}-${item.className}`}
          className={`cw-deco ${item.className}`}
          src={`/assets/stickers/${item.file}`}
          alt=""
        />
      ));

  return (
    <div className={mobile ? 'cw-decorations-host cw-decorations-host--mobile' : 'cw-decorations-host'} aria-hidden="true">
      <div className="cw-decorations cw-decorations--back">{renderDecorations('back')}</div>
      <div className="cw-decorations cw-decorations--front">{renderDecorations('front')}</div>
    </div>
  );
}

function BagCollage({
  mobile = false,
  isBagOpen,
  onOpenBag,
}: {
  mobile?: boolean;
  isBagOpen: boolean;
  onOpenBag: () => void;
}) {
  return (
    <section className={`cw-bag-collage${mobile ? ' cw-bag-collage--mobile' : ''}`} aria-label="What's in my bag">
      <h2 className="cw-bag-collage__title">
        <span className="cw-bag-collage__title-a cw-serif">WHAT&apos;S IN</span>
        <span className="cw-bag-collage__title-b cw-serif"><em>MY BAG?</em></span>
      </h2>
      <figure className="cw-bag-art">
        <button
          type="button"
          className="cw-bag-trigger"
          onClick={onOpenBag}
          tabIndex={isBagOpen ? -1 : 0}
          aria-expanded={isBagOpen}
          aria-label="Open handbag to explore What's in my bag"
        >
          <picture>
            <source srcSet={bagWebp} type="image/webp" />
            <img src={bagSrc} alt="Cream watercolour quilted flap bag with gold chain and clasp" />
          </picture>
        </button>
      </figure>
    </section>
  );
}

function BagTrails() {
  return (
    <div className="cw-bag-trails" aria-hidden="true">
      {/* Desktop & tablet hand-drawn trajectories from centered open bag (500,485) behind bag & items */}
      <svg
        className="cw-bag-trails__svg cw-bag-trails__svg--desktop"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        {/* 01 -> Sunglasses (255, 475): irregular curved cream dash-dot ribbon + faint rose sketch echo */}
        <path
          className="cw-trail cw-trail--about"
          d="M 442 478 C 402 512, 355 506, 326 482 C 304 464, 282 472, 265 476"
          fill="none"
          stroke="#FFF7EE"
          strokeOpacity="0.72"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeDasharray="11 7 2 7"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="cw-trail cw-trail--echo"
          d="M 436 488 C 392 520, 352 514, 322 490"
          fill="none"
          stroke="#A85E74"
          strokeOpacity="0.34"
          strokeWidth="1.25"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* 04 -> Camera (535, 198): soft wavy burgundy sketch trail rising from top flap */}
        <path
          className="cw-trail cw-trail--work"
          d="M 505 398 C 538 355, 558 315, 526 276 C 504 248, 522 222, 535 204"
          fill="none"
          stroke="#7E3950"
          strokeOpacity="0.52"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeDasharray="14 6 4 6"
          vectorEffect="non-scaling-stroke"
        />

        {/* 02 -> Lipstick (780, 325): sweeping dusty-rose dashed arc + soft cream trace */}
        <path
          className="cw-trail cw-trail--services"
          d="M 575 438 C 632 426, 668 386, 705 352 C 730 330, 756 326, 774 326"
          fill="none"
          stroke="#B5657B"
          strokeOpacity="0.56"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="8 6"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="cw-trail cw-trail--echo"
          d="M 588 446 C 642 432, 682 396, 718 362"
          fill="none"
          stroke="#FFF7EE"
          strokeOpacity="0.52"
          strokeWidth="1.2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* 03 -> Notebook (250, 735): relaxed looped burgundy wave curving below left chain */}
        <path
          className="cw-trail cw-trail--experience"
          d="M 426 558 C 392 612, 378 652, 328 666 C 288 677, 272 706, 254 730"
          fill="none"
          stroke="#7E3950"
          strokeOpacity="0.5"
          strokeWidth="1.75"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="cw-trail cw-trail--echo"
          d="M 382 628 C 350 658, 312 668, 286 694"
          fill="none"
          stroke="#FFF7EE"
          strokeOpacity="0.48"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="4 7"
          vectorEffect="non-scaling-stroke"
        />

        {/* 05 -> Perfume (555, 775): fluid cream S-curve trailing down from bag bottom */}
        <path
          className="cw-trail cw-trail--canvas"
          d="M 512 582 C 492 632, 504 672, 542 698 C 568 716, 562 746, 556 768"
          fill="none"
          stroke="#FFF7EE"
          strokeOpacity="0.72"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeDasharray="12 6 3 6"
          vectorEffect="non-scaling-stroke"
        />

        {/* 06 -> Phone (775, 650): gentle hand-sketched dusty-rose curve toward lower right */}
        <path
          className="cw-trail cw-trail--contact"
          d="M 588 538 C 636 588, 668 628, 712 634 C 738 637, 756 644, 770 649"
          fill="none"
          stroke="#A85C72"
          strokeOpacity="0.54"
          strokeWidth="1.75"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Mobile hand-drawn trajectories matching responsive radial item coordinates */}
      <svg
        className="cw-bag-trails__svg cw-bag-trails__svg--mobile"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path
          className="cw-trail cw-trail--about"
          d="M 440 412 C 385 385, 342 356, 316 320 C 302 302, 288 294, 278 287"
          fill="none"
          stroke="#FFF7EE"
          strokeOpacity="0.72"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeDasharray="9 6 2 6"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="cw-trail cw-trail--work"
          d="M 548 402 C 598 378, 646 342, 678 302 C 694 282, 706 274, 718 268"
          fill="none"
          stroke="#7E3950"
          strokeOpacity="0.5"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeDasharray="11 6"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="cw-trail cw-trail--services"
          d="M 596 520 C 655 538, 702 562, 742 595 C 762 612, 774 622, 785 628"
          fill="none"
          stroke="#B5657B"
          strokeOpacity="0.56"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeDasharray="7 6"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="cw-trail cw-trail--experience"
          d="M 418 548 C 362 588, 315 612, 274 646 C 254 662, 242 674, 234 682"
          fill="none"
          stroke="#7E3950"
          strokeOpacity="0.48"
          strokeWidth="1.65"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="cw-trail cw-trail--canvas"
          d="M 494 576 C 472 642, 488 698, 466 752 C 458 774, 454 792, 451 804"
          fill="none"
          stroke="#FFF7EE"
          strokeOpacity="0.7"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeDasharray="10 6 3 6"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="cw-trail cw-trail--contact"
          d="M 558 568 C 618 638, 668 692, 714 745 C 732 766, 744 782, 752 794"
          fill="none"
          stroke="#A85C72"
          strokeOpacity="0.52"
          strokeWidth="1.65"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

function BagOpenStage({
  isBagOpen,
  onCloseBag,
  onNavigate,
}: {
  isBagOpen: boolean;
  onCloseBag: () => void;
  onNavigate: (path: string) => void;
}) {
  const [poppingKey, setPoppingKey] = useState<string | null>(null);
  const popTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isBagOpen) {
      setPoppingKey(null);
    }
  }, [isBagOpen]);

  useEffect(() => {
    return () => {
      if (popTimerRef.current !== null) {
        window.clearTimeout(popTimerRef.current);
      }
    };
  }, []);

  const handleItemClick = (key: string, path: string) => {
    if (poppingKey) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onNavigate(path);
      return;
    }
    setPoppingKey(key);
    popTimerRef.current = window.setTimeout(() => {
      popTimerRef.current = null;
      setPoppingKey(null);
      onNavigate(path);
    }, 185);
  };

  return (
    <div
      className="cw-bag-stage"
      aria-hidden={!isBagOpen}
      role="region"
      aria-label="What's in my bag interactive contents"
    >
      {/* Delicate irregular hand-drawn trajectory lines connecting bag to items */}
      <BagTrails />

      {/* Editorial torn-paper title strip framing the expanded view */}
      <div className="cw-stage-title" aria-hidden="true">
        <span className="cw-bag-collage__title-a cw-serif">WHAT&apos;S IN</span>
        <span className="cw-bag-collage__title-b cw-serif"><em>MY BAG?</em></span>
      </div>

      {/* Centered open quilted flap handbag (clicking puts everything back) */}
      <button
        type="button"
        className="cw-open-bag-btn"
        onClick={onCloseBag}
        tabIndex={isBagOpen ? 0 : -1}
        aria-label="Put everything back and return to homepage collage"
      >
        <picture>
          <source srcSet={bagOpenWebp} type="image/webp" />
          <img
            src={bagOpenSrc}
            alt="Opened cream quilted flap bag with pink satin ribbon"
            className="cw-open-bag-btn__img"
          />
        </picture>
      </button>

      {/* Six scattered clickable item stickers orbiting the open bag */}
      {MENU_ITEMS.map((item) => {
        const isPopping = poppingKey === item.bagItemKey;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleItemClick(item.bagItemKey, item.path)}
            tabIndex={isBagOpen ? 0 : -1}
            aria-label={`${item.bagItemLabel} — ${item.title}`}
            className={`cw-bag-item cw-bag-item--${item.bagItemKey}${isPopping ? ' cw-bag-item--popping' : ''}`}
          >
            <span className="cw-bag-item__float">
              <img
                src={item.bagItemImage}
                alt={item.bagItemAlt}
                className="cw-bag-item__img"
                draggable={false}
              />
            </span>
          </button>
        );
      })}

      {/* Explicit close button (empty backdrop clicks intentionally do not collapse) */}
      <button
        type="button"
        className="cw-stage-close cw-mono"
        onClick={onCloseBag}
        tabIndex={isBagOpen ? 0 : -1}
        aria-label="Put everything back and return to homepage"
      >
        PUT EVERYTHING BACK ↩
      </button>
    </div>
  );
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isBagOpen,
  onOpenBag,
  onCloseBag,
  onNavigate,
}) => {
  useEffect(() => {
    if (!isBagOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseBag();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBagOpen, onCloseBag]);

  return (
    <section
      className={`cw-world${isBagOpen ? ' cw-world--bag-open' : ''}`}
      aria-label="Cecilia's World homepage"
    >
      <StickerFilters />
      <div className="cw-bag-backdrop" aria-hidden="true" />
      <div className="cw-world__desktop" aria-hidden={isBagOpen}>
        <DecorationLayer />
        <NamePaper />
        <Portraits />
        <BagCollage isBagOpen={isBagOpen} onOpenBag={onOpenBag} />
      </div>
      <div className="cw-world__mobile" aria-hidden={isBagOpen}>
        <DecorationLayer mobile />
        <NamePaper />
        <Portraits mobile />
        <BagCollage mobile isBagOpen={isBagOpen} onOpenBag={onOpenBag} />
      </div>
      <BagOpenStage
        isBagOpen={isBagOpen}
        onCloseBag={onCloseBag}
        onNavigate={onNavigate}
      />
    </section>
  );
};
