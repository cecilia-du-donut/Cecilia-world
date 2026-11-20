import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { SELECTED_WORK_INTRO, WORK_SKELETON_PROJECTS } from '../data/selectedWork';
import { VinylRecordAnchor } from './VinylRecordAnchor';
import { WorkPolaroidItem } from './WorkPolaroidItem';
import { WorkDetailOverlay } from './WorkDetailOverlay';
import './WorkPage.css';

// Scattered pastel lavender stars inspired by the reference composition
const BACKDROP_STARS = [
  { top: '7%', left: '16%', size: 30, rot: -14 },
  { top: '18%', left: '4%', size: 46, rot: 12 },
  { top: '34%', left: '18%', size: 34, rot: -8 },
  { top: '48%', left: '5%', size: 28, rot: 22 },
  { top: '6%', left: '31%', size: 18, rot: 18 },
  { top: '8%', right: '26%', size: 36, rot: -18 },
  { top: '11%', right: '11%', size: 22, rot: 10 },
  { top: '17%', right: '2%', size: 42, rot: -12 },
  { top: '28%', right: '7%', size: 48, rot: 14 },
  { top: '49%', right: '6%', size: 26, rot: -20 },
];

export const WorkPage: React.FC = () => {
  // Balanced 4-record upper-arc arrangement (01..04) with spotlight stepping cleanly across tracks
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHoveringStage, setIsHoveringStage] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef<number | null>(null);
  const dragTriggeredRef = useRef<boolean>(false);
  const totalCount = WORK_SKELETON_PROJECTS.length;
  const activeProject = WORK_SKELETON_PROJECTS[activeIndex];

  const stepCarousel = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((prev) => (prev + direction + totalCount) % totalCount);
    },
    [totalCount]
  );

  const jumpCarouselTo = useCallback(
    (targetIndex: number) => {
      if (targetIndex === activeIndex) return;
      setActiveIndex(targetIndex);
    },
    [activeIndex]
  );

  // Subtle turntable carousel auto-advance (paused on hover, detail view, or reduced motion)
  useEffect(() => {
    if (!isAutoPlaying || isHoveringStage || detailOpen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      stepCarousel(1);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [detailOpen, isAutoPlaying, isHoveringStage, stepCarousel]);

  // Keyboard arrows step carousel smoothly while on Archive view
  useEffect(() => {
    if (detailOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      const targetTag = (event.target as HTMLElement | null)?.tagName;
      if (targetTag === 'INPUT' || targetTag === 'TEXTAREA') return;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        stepCarousel(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        stepCarousel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [detailOpen, stepCarousel]);

  const handleOpenProject = useCallback((index: number) => {
    if (dragTriggeredRef.current) {
      dragTriggeredRef.current = false;
      return;
    }
    setActiveIndex(index);
    setDetailOpen(true);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailOpen(false);
    const activeId = WORK_SKELETON_PROJECTS[activeIndex]?.id;
    window.requestAnimationFrame(() => {
      if (!activeId || !stageRef.current) return;
      const btns = stageRef.current.querySelectorAll<HTMLButtonElement>('.cw-arc-item');
      btns[activeIndex]?.focus({ preventScroll: true });
    });
  }, [activeIndex]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragStartXRef.current = event.clientX;
    dragTriggeredRef.current = false;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    const dx = event.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 42) {
      dragTriggeredRef.current = true;
      stepCarousel(dx < 0 ? 1 : -1);
      dragStartXRef.current = null;
    }
  };

  const handlePointerEnd = () => {
    dragStartXRef.current = null;
    window.setTimeout(() => {
      dragTriggeredRef.current = false;
    }, 60);
  };

  return (
    <>
      <section className="cw-work" aria-label="Selected Work — The Creative Archive">
        {/* Decorative Scattered Lavender Stars */}
        <div className="cw-work__stars" aria-hidden="true">
          {BACKDROP_STARS.map((star, idx) => (
            <svg
              key={idx}
              viewBox="0 0 40 40"
              className="cw-work__star"
              style={{
                top: star.top,
                left: star.left,
                right: star.right,
                width: `${star.size}px`,
                height: `${star.size}px`,
                transform: `rotate(${star.rot}deg)`,
              }}
            >
              <path
                d="M20 2 L25.2 13.8 L38 15.2 L28.4 23.8 L31.2 36.4 L20 29.8 L8.8 36.4 L11.6 23.8 L2 15.2 L14.8 13.8 Z"
                fill="#B8A8F8"
                stroke="#B8A8F8"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          ))}
        </div>

        <div className="cw-work__container">
          {/* Playful Arched Pink Title + Editorial Subtitle */}
          <header className="cw-work__hero">
            <h1 className="sr-only">
              {SELECTED_WORK_INTRO.titlePrimary} — {SELECTED_WORK_INTRO.titleSecondary}
            </h1>

            <svg
              viewBox="0 0 820 126"
              className="cw-work__arched-svg"
              aria-hidden="true"
            >
              <defs>
                <path id="cw-title-arch" d="M 48,116 Q 410,16 772,116" />
              </defs>
              <text className="cw-work__arched-text">
                <textPath href="#cw-title-arch" startOffset="50%" textAnchor="middle">
                  {SELECTED_WORK_INTRO.titlePrimary}
                </textPath>
              </text>
            </svg>

            <div className="cw-work__sublock">
              <span className="cw-work__sub-title">
                {SELECTED_WORK_INTRO.titleSecondary}
              </span>
              <p className="cw-work__subtitle">{SELECTED_WORK_INTRO.subtitle}</p>
            </div>
          </header>

          {/* Giant Rising Vinyl LP + Orbiting 4 Colored-Border Square Artworks */}
          <div
            ref={stageRef}
            className="cw-turntable-stage"
            onMouseEnter={() => setIsHoveringStage(true)}
            onMouseLeave={() => setIsHoveringStage(false)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            role="region"
            aria-label="Rotating vinyl record archive carousel"
          >
            <div className="cw-turntable-hub">
              <VinylRecordAnchor />

              {WORK_SKELETON_PROJECTS.map((project, index) => (
                <WorkPolaroidItem
                  key={project.id}
                  project={project}
                  slotIndex={index}
                  isActiveSpotlight={index === activeIndex}
                  onSelect={() => handleOpenProject(index)}
                />
              ))}
            </div>

            {/* Crisp Carousel Controls Dock anchored along bottom rim of turntable */}
            <div className="cw-carousel-bar">
              <button
                type="button"
                onClick={() => stepCarousel(-1)}
                className="cw-carousel-btn"
                aria-label="Rotate carousel to previous project"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span>PREV</span>
              </button>

              <div className="cw-carousel-dots" role="tablist" aria-label="Select vinyl track">
                {WORK_SKELETON_PROJECTS.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => jumpCarouselTo(idx)}
                      className={`cw-carousel-dot${isActive ? ' cw-carousel-dot--active' : ''}`}
                      aria-label={`Highlight ${item.fullTitle}`}
                    >
                      {item.id}
                    </button>
                  );
                })}
              </div>

              <div className="cw-carousel-right">
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying((prev) => !prev)}
                  className="cw-carousel-btn cw-carousel-btn--quiet"
                  aria-label={isAutoPlaying ? 'Pause carousel rotation' : 'Resume carousel rotation'}
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>AUTO</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => stepCarousel(1)}
                  className="cw-carousel-btn"
                  aria-label="Rotate carousel to next project"
                >
                  <span>NEXT</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preserved Full-Viewport Detail Skeleton Overlay */}
      {detailOpen && (
        <WorkDetailOverlay
          project={activeProject}
          projectIndex={activeIndex}
          onClose={handleCloseDetail}
          onPrevProject={() => stepCarousel(-1)}
          onNextProject={() => stepCarousel(1)}
          onSelectProject={(idx) => setActiveIndex(idx)}
        />
      )}
    </>
  );
};
