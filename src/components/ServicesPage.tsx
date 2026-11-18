import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import './ServicesPage.css';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

interface ServicePillar {
  id: '01' | '02' | '03' | '04';
  title: string;
  shortLabel: string;
  tagline: string;
  description: string;
  keywords: string;
  archiveImage: string;
  archiveImageAlt: string;
  archiveCaption: string;
  tapeAsset: string;
}

const SERVICE_HEADLINE =
  'I bring strategy and creativity together to help brands connect with people.';

const SERVICE_INTRO =
  'With a background in brand marketing, content and digital experiences, I bring ideas from strategy to execution. Having worked across different industries and cultures, I offer a perspective that connects audiences, markets and stories.';

const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: '01',
    title: '01 — Social Media & Content Creation',
    shortLabel: 'SERVICE 01',
    tagline: 'Create content people actually want to engage with.',
    description:
      'From social media concepts to short-form videos, I help brands turn ideas into engaging content that feels relevant to their audience. I work across platforms and formats, combining creative storytelling with an understanding of what makes people stop, watch and connect.',
    keywords:
      'Social media content · Short-form video · Content production · Platform adaptation',
    archiveImage: '/assets/aistudio/ChatGPT_Image_Nov_17__2026__04_03_11_AM_1531e8e4.png',
    archiveImageAlt:
      'Colorful retro creative collage featuring vintage portraits, WORK typography cutouts, lightning bolts, brain illustration, lightbulb, and dot-matrix computer',
    archiveCaption: 'PLATE 01 · CREATIVE ARCHIVE',
    tapeAsset: '/assets/stickers/tape-leopard.svg',
  },
  {
    id: '02',
    title: '02 — Brand Storytelling & Creative Direction',
    shortLabel: 'SERVICE 02',
    tagline: 'Make your brand story worth remembering.',
    description:
      'Every brand has something that makes it different. I help bring that to life through storytelling, creative concepts and visual direction — making sure the message feels distinctive, consistent and true to the brand.',
    keywords:
      'Brand storytelling · Creative concepts · Visual direction · Brand communication',
    archiveImage: '/assets/aistudio/ChatGPT_Image_Nov_17__2026__04_03_17_AM_b630f1ee.png',
    archiveImageAlt:
      'Black and white digital culture collage featuring smartphones, laptops, hands typing, and blue social notification icons',
    archiveCaption: 'ROLL 02 · VISUAL ARCHIVE',
    tapeAsset: '/assets/stickers/tape-polka.svg',
  },
  {
    id: '03',
    title: '03 — Influencer & Creator Partnerships',
    shortLabel: 'SERVICE 03',
    tagline: 'Find the right people to tell your story.',
    description:
      'I help brands identify relevant creators, develop collaboration ideas and connect with voices that resonate with their target audiences. With an understanding of different social media cultures, I can bring a broader perspective to creator partnerships and campaigns.',
    keywords:
      'Creator research · Influencer partnerships · Campaign concepts · Outreach',
    archiveImage: '/assets/photos/red-glove-studio.jpg',
    archiveImageAlt:
      'Full vertical studio editorial portrait featuring vivid crimson glove styling against warm ochre backdrop',
    archiveCaption: 'FRAME 03 · ART DIRECTION',
    tapeAsset: '/assets/stickers/tape-polka.svg',
  },
  {
    id: '04',
    title: '04 — Marketing Strategy & Content Planning',
    shortLabel: 'SERVICE 04',
    tagline: 'Turn marketing goals into a clear plan.',
    description:
      'I help brands make sense of their audience, sharpen their messaging and build content strategies around real business objectives. From audience insights and positioning to campaign planning and platform-specific content, I connect the bigger picture with the details of execution.',
    keywords:
      'Marketing strategy · Audience insights · Content planning · Campaign development',
    archiveImage: '/assets/services/retro-computer-ui.png',
    archiveImageAlt:
      'Retro beige desktop computer running classic Photoshop interface with creative sticky notes and keyboard typing hands',
    archiveCaption: 'ISSUE 04 · DIGITAL ARCHIVE',
    tapeAsset: '/assets/stickers/tape-leopard.svg',
  },
];

const TOTAL_SPREADS = SERVICE_PILLARS.length + 1; // 4 service spreads + 1 closing spread
const TOTAL_SINGLE_PAGES = TOTAL_SPREADS * 2; // 10 single pages on mobile

interface FlipTransition {
  direction: 'forward' | 'backward';
  fromIndex: number;
  toIndex: number;
}

const renderLeftPage = (
  spreadIndex: number,
  onJumpToSpread: (target: number) => void
) => {
  if (spreadIndex < SERVICE_PILLARS.length) {
    const service = SERVICE_PILLARS[spreadIndex];
    return (
      <div className="cw-zine-page-surface cw-zine-page-surface--left">
        <div className="cw-zine-folio cw-mono">
          <span>CECILIA&apos;S WORLD · ARCHIVE</span>
          <span>P. {String(spreadIndex * 2 + 1).padStart(2, '0')}</span>
        </div>

        <div className="cw-zine-visual-stage">
          <div className={`cw-zine-collage cw-zine-collage--${service.id}`}>
            {(service.id === '02' || service.id === '03') && (
              <img
                className="cw-zine-collage__tape"
                src={service.tapeAsset}
                alt=""
                aria-hidden="true"
              />
            )}
            <img
              src={service.archiveImage}
              alt={service.archiveImageAlt}
              className="cw-zine-collage__img"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="cw-zine-left-caption cw-mono">
          <span>{service.archiveCaption}</span>
          <span>NO. {service.id}</span>
        </div>
      </div>
    );
  }

  // Spread 05 Left: Editorial Archive Index
  return (
    <div className="cw-zine-page-surface">
      <div className="cw-zine-folio cw-mono">
        <span>SERVICES / WHAT I BRING TO THE TABLE</span>
        <span>P. 09</span>
      </div>

      <div className="cw-zine-editorial cw-zine-editorial--index">
        <div>
          <span className="cw-zine-editorial__kicker cw-mono">SERVICES · INDEX</span>
          <h2 className="cw-zine-editorial__title">{SERVICE_HEADLINE}</h2>

          <ul className="cw-zine-index-list">
            {SERVICE_PILLARS.map((pillar, idx) => (
              <li key={pillar.id}>
                <button
                  type="button"
                  onClick={() => onJumpToSpread(idx)}
                  className="cw-zine-index-btn"
                >
                  <span className="cw-zine-index-btn__title">{pillar.title}</span>
                  <span className="cw-zine-index-btn__tag">{pillar.tagline}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="cw-zine-colophon-note cw-mono">
          SOCIAL · BRAND STORYTELLING · CREATORS · STRATEGY
        </p>
      </div>
    </div>
  );
};

const renderRightPage = (
  spreadIndex: number,
  onNavigate: (path: string) => void
) => {
  if (spreadIndex < SERVICE_PILLARS.length) {
    const service = SERVICE_PILLARS[spreadIndex];
    return (
      <div className="cw-zine-page-surface">
        <div className="cw-zine-folio cw-mono">
          <span>{service.shortLabel}</span>
          <span>P. {String(spreadIndex * 2 + 2).padStart(2, '0')}</span>
        </div>

        <div className="cw-zine-editorial">
          <div className="cw-zine-editorial__content">
            <span className="cw-zine-editorial__kicker cw-mono">
              ISSUE 02 · PILLAR {service.id}
            </span>
            <h2 className="cw-zine-editorial__title">{service.title}</h2>
            <p className="cw-zine-editorial__tagline">{service.tagline}</p>

            <div className="cw-zine-editorial__block">
              <p className="cw-zine-editorial__desc">{service.description}</p>
            </div>

            <div className="cw-zine-editorial__block cw-zine-editorial__block--keywords">
              <p className="cw-zine-editorial__keywords cw-mono">{service.keywords}</p>
            </div>
          </div>

          <div className="cw-zine-editorial__footer">
            <span className="cw-zine-editorial__note cw-mono">
              TURN PAGE FOR {spreadIndex < SERVICE_PILLARS.length - 1 ? `0${spreadIndex + 2}` : 'CONTACT'} →
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Spread 05 Right: Closing Contact Spread
  return (
    <div className="cw-zine-page-surface cw-zine-page-surface--closing-right">
      <div className="cw-zine-folio cw-mono">
        <span>BACK ISSUE · COLLABORATION</span>
        <span>P. 10</span>
      </div>

      <div className="cw-zine-closing-right">
        <span className="cw-zine-closing-right__eyebrow cw-mono">
          SERVICES / WHAT I BRING TO THE TABLE
        </span>
        <h2 className="cw-zine-closing-right__title">
          GOT AN IDEA?
          <span>Let&apos;s make it real.</span>
        </h2>
        <p className="cw-zine-closing-right__sub">
          Good things happen when strategy meets imagination.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/contact')}
          className="cw-zine-closing-right__btn"
        >
          <span>LET&apos;S TALK</span>
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [isMobileSingle, setIsMobileSingle] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 860px)').matches : false
  );
  const [spreadIndex, setSpreadIndex] = useState<number>(0);
  const [singlePageIndex, setSinglePageIndex] = useState<number>(0);
  const [flip, setFlip] = useState<FlipTransition | null>(null);

  const flipTimerRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)');
    const handleChange = () => {
      setIsMobileSingle(mq.matches);
    };
    handleChange();
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    return () => {
      if (flipTimerRef.current) {
        window.clearTimeout(flipTimerRef.current);
      }
    };
  }, []);

  const currentMaxIndex = isMobileSingle ? TOTAL_SINGLE_PAGES - 1 : TOTAL_SPREADS - 1;
  const activeIndex = isMobileSingle ? singlePageIndex : spreadIndex;

  const triggerTurn = useCallback(
    (targetIndex: number) => {
      if (flip) return;
      const bounded = Math.max(0, Math.min(currentMaxIndex, targetIndex));
      if (bounded === activeIndex) return;

      const direction: 'forward' | 'backward' = bounded > activeIndex ? 'forward' : 'backward';
      setFlip({ direction, fromIndex: activeIndex, toIndex: bounded });

      const duration = isMobileSingle ? 420 : 460;
      if (flipTimerRef.current) window.clearTimeout(flipTimerRef.current);

      flipTimerRef.current = window.setTimeout(() => {
        if (isMobileSingle) {
          setSinglePageIndex(bounded);
          setSpreadIndex(Math.floor(bounded / 2));
        } else {
          setSpreadIndex(bounded);
          setSinglePageIndex(bounded * 2);
        }
        setFlip(null);
      }, duration);
    },
    [activeIndex, currentMaxIndex, flip, isMobileSingle]
  );

  const goPrev = useCallback(() => {
    triggerTurn(activeIndex - 1);
  }, [activeIndex, triggerTurn]);

  const goNext = useCallback(() => {
    triggerTurn(activeIndex + 1);
  }, [activeIndex, triggerTurn]);

  const jumpToSpread = useCallback(
    (targetSpread: number) => {
      if (isMobileSingle) {
        triggerTurn(targetSpread * 2);
      } else {
        triggerTurn(targetSpread);
      }
    },
    [isMobileSingle, triggerTurn]
  );

  // Keyboard navigation: ArrowRight / ArrowLeft flip pages, Escape closes back to bag
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        onNavigate('/?bag=open');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, onNavigate]);

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0];
    if (touch) {
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  // Compute visible base left/right pages on desktop depending on active 3D turn direction
  const desktopLeftSpread =
    flip && !isMobileSingle
      ? flip.direction === 'forward'
        ? flip.fromIndex
        : flip.toIndex
      : spreadIndex;

  const desktopRightSpread =
    flip && !isMobileSingle
      ? flip.direction === 'forward'
        ? flip.toIndex
        : flip.fromIndex
      : spreadIndex;

  // Mobile single-page rendering helper
  const renderSinglePageContent = (pageIdx: number) => {
    const spIdx = Math.floor(pageIdx / 2);
    const isRightHalf = pageIdx % 2 === 1;
    return isRightHalf
      ? renderRightPage(spIdx, onNavigate)
      : renderLeftPage(spIdx, jumpToSpread);
  };

  const currentChapterLabel =
    spreadIndex < SERVICE_PILLARS.length
      ? SERVICE_PILLARS[spreadIndex].title
      : "CONTACT / LET'S TALK";

  return (
    <section
      className="cw-services"
      aria-label="Services Editorial Magazine — Cecilia's World"
    >
      {/* Independent Poster Background Layer: Oversized Brush Script */}
      <div className="cw-services__bg-type" aria-hidden="true">
        <span className="cw-services__bg-word cw-services__bg-word--top">Creative</span>
        <span className="cw-services__bg-word cw-services__bg-word--bottom">Stories</span>
      </div>

      {/* Balanced Desktop Workspace: Left Editorial Intro + Right Open Magazine */}
      <div className="cw-services__workspace">
        <aside className="cw-services__intro-col" aria-label="Services Overview">
          <span className="cw-services__intro-kicker cw-mono">SERVICES</span>
          <h1 className="cw-services__headline">{SERVICE_HEADLINE}</h1>
          <p className="cw-services__intro">{SERVICE_INTRO}</p>
        </aside>

        {/* Main 3D Open Magazine */}
        <div className="cw-zine-stage">
          <div className="cw-zine-topbar">
            <span className="cw-zine-topbar__kicker cw-mono">
              EDITORIAL ARCHIVE · ISSUES 01–04
            </span>

            <button
              type="button"
              onClick={() => onNavigate('/?bag=open')}
              className="cw-zine-close"
              aria-label="Close magazine and return to Services directory"
            >
              <span>CLOSE</span>
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div
            className="cw-zine-book-wrap"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
          <article
            className="cw-zine-book"
            aria-roledescription="interactive flipbook magazine"
            aria-label={currentChapterLabel}
          >
            <div className="cw-zine-spine" aria-hidden="true" />

            {!isMobileSingle ? (
              <>
                <div className="cw-zine-half cw-zine-half--left">
                  {renderLeftPage(desktopLeftSpread, jumpToSpread)}
                </div>

                <div className="cw-zine-half cw-zine-half--right">
                  {renderRightPage(desktopRightSpread, onNavigate)}
                </div>

                {/* Desktop 3D Turning Leaf & Cast Shadow */}
                {flip && (
                  <>
                    <div
                      className={`cw-zine-cast-shadow cw-zine-cast-shadow--${flip.direction}`}
                      aria-hidden="true"
                    />
                    <div
                      className={`cw-zine-leaf cw-zine-leaf--${flip.direction}`}
                      aria-hidden="true"
                    >
                      <div className="cw-zine-leaf__face cw-zine-leaf__face--front">
                        {renderRightPage(
                          flip.direction === 'forward' ? flip.fromIndex : flip.toIndex,
                          onNavigate
                        )}
                      </div>
                      <div className="cw-zine-leaf__face cw-zine-leaf__face--back">
                        {renderLeftPage(
                          flip.direction === 'forward' ? flip.toIndex : flip.fromIndex,
                          jumpToSpread
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {/* Mobile Single-Page Surface */}
                <div className="cw-zine-half cw-zine-half--single">
                  {renderSinglePageContent(
                    flip
                      ? flip.direction === 'forward'
                        ? flip.toIndex
                        : flip.fromIndex
                      : singlePageIndex
                  )}
                </div>

                {flip && (
                  <div
                    className={`cw-zine-leaf cw-zine-leaf--single cw-zine-leaf--${flip.direction}`}
                    aria-hidden="true"
                  >
                    <div className="cw-zine-leaf__face cw-zine-leaf__face--front">
                      {renderSinglePageContent(
                        flip.direction === 'forward' ? flip.fromIndex : flip.toIndex
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Direct Edge Click Triggers */}
            {activeIndex > 0 && (
              <button
                type="button"
                onClick={goPrev}
                className="cw-zine-edge-trigger cw-zine-edge-trigger--prev"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>
            )}

            {activeIndex < currentMaxIndex && (
              <>
                <button
                  type="button"
                  onClick={goNext}
                  className="cw-zine-edge-trigger cw-zine-edge-trigger--next"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-6 h-6" aria-hidden="true" />
                </button>
                <div className="cw-zine-corner-cue" aria-hidden="true" />
              </>
            )}
          </article>
        </div>

        {/* Bottom Spread Navigation & Chapter Indicator */}
        <nav className="cw-zine-controls" aria-label="Magazine page navigation">
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIndex <= 0 || Boolean(flip)}
            className="cw-zine-nav-btn"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>PREVIOUS PAGE</span>
          </button>

          <div className="cw-zine-chapters" role="tablist" aria-label="Service chapters">
            {SERVICE_PILLARS.map((pillar, idx) => {
              const isCurrent = isMobileSingle
                ? Math.floor(singlePageIndex / 2) === idx
                : spreadIndex === idx;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  onClick={() => jumpToSpread(idx)}
                  className={`cw-zine-chapter-btn${
                    isCurrent ? ' cw-zine-chapter-btn--active' : ''
                  }`}
                >
                  {pillar.id}
                </button>
              );
            })}
            <button
              type="button"
              role="tab"
              aria-selected={
                isMobileSingle
                  ? Math.floor(singlePageIndex / 2) === SERVICE_PILLARS.length
                  : spreadIndex === SERVICE_PILLARS.length
              }
              onClick={() => jumpToSpread(SERVICE_PILLARS.length)}
              className={`cw-zine-chapter-btn${
                (isMobileSingle
                  ? Math.floor(singlePageIndex / 2) === SERVICE_PILLARS.length
                  : spreadIndex === SERVICE_PILLARS.length)
                  ? ' cw-zine-chapter-btn--active'
                  : ''
              }`}
            >
              CONTACT
            </button>
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex >= currentMaxIndex || Boolean(flip)}
            className="cw-zine-nav-btn"
          >
            <span>NEXT PAGE</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </nav>

        <p className="cw-zine-hint cw-mono">
          {isMobileSingle
            ? `PAGE ${String(activeIndex + 1).padStart(2, '0')} / ${String(TOTAL_SINGLE_PAGES).padStart(2, '0')} · SWIPE OR TAP TO FLIP`
            : `SPREAD ${String(spreadIndex + 1).padStart(2, '0')} / ${String(TOTAL_SPREADS).padStart(2, '0')} · CLICK PAGE EDGES OR USE ← → KEYS`}
        </p>
        </div>
      </div>
    </section>
  );
};
