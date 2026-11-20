import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Film,
  Images,
  Maximize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
  ZoomIn,
} from 'lucide-react';
import {
  WORK_DETAIL_SECTIONS,
  WORK_SKELETON_PROJECTS,
  type BeautyPersonalStyleCollection,
  type ImageCollabCase,
  type LocalDiscoveryCategorySlug,
  type LocalDiscoveryCollection,
  type PlatformPerformance,
  type RentalGuideCase,
  type RestaurantCollabCase,
  type RichWorkProjectDetail,
  type WorkSkeletonProject,
} from '../data/selectedWork';

interface WorkDetailOverlayProps {
  project: WorkSkeletonProject;
  projectIndex: number;
  onClose: () => void;
  onPrevProject: () => void;
  onNextProject: () => void;
  onSelectProject: (index: number) => void;
}

type MediaSlotMode = 'video' | 'gallery';

interface LightboxState {
  src: string;
  alt: string;
  caption: string;
  platformName: string;
}

const GALLERY_PLACEHOLDER_SLOTS = [
  { id: '01', label: 'Frame 01 · Hero Visual Slot' },
  { id: '02', label: 'Frame 02 · Detail Study Slot' },
  { id: '03', label: 'Frame 03 · Editorial Layout Slot' },
];

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

interface PortraitVideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  videoSrc: string;
  posterSrc: string;
  trackLabel: string;
  ariaLabel: string;
  resetKey: string;
}

const PortraitVideoPlayer: React.FC<PortraitVideoPlayerProps> = ({
  videoRef,
  videoSrc,
  posterSrc,
  trackLabel,
  ariaLabel,
  resetKey,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Reset UI controls cleanly whenever active video changes (key remount handles fresh media load)
  useEffect(() => {
    setIsPlaying(false);
    setIsBuffering(false);
    setHasError(false);
    setIsMuted(false);
    setCurrentTime(0);
    setDuration(0);
  }, [resetKey, videoSrc]);

  const togglePlayPause = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      setHasError(false);
      if (video.readyState < 3) {
        setIsBuffering(true);
      }
      try {
        await video.play();
        setIsPlaying(true);
        setIsBuffering(false);
      } catch {
        // Fallback if browser autoplay/audio policy blocks unmuted playback
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
          setIsPlaying(!video.paused);
        } catch {
          setHasError(true);
        } finally {
          setIsBuffering(false);
        }
      }
    } else {
      video.pause();
      setIsPlaying(false);
      setIsBuffering(false);
    }
  }, [videoRef]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  }, [videoRef]);

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const nextTime = Number(event.target.value);
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleFullscreen = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const webkitVideo = video as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
    };
    if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => {});
    } else if (webkitVideo.webkitEnterFullscreen) {
      webkitVideo.webkitEnterFullscreen();
    }
  }, [videoRef]);

  return (
    <div className="cw-video-card">
      <div className="cw-video-card__bar">
        <span className="cw-mono cw-video-card__track">{trackLabel}</span>
        <span className="cw-video-card__dot" aria-hidden="true" />
      </div>

      <div className="cw-video-frame" onClick={() => void togglePlayPause()}>
        <video
          key={`${resetKey}:${videoSrc}`}
          ref={videoRef}
          poster={posterSrc}
          muted={isMuted}
          playsInline
          preload="auto"
          className="cw-video-el"
          aria-label={ariaLabel}
          onPlay={() => {
            setIsPlaying(true);
            setIsBuffering(false);
            setHasError(false);
          }}
          onPlaying={() => {
            setIsPlaying(true);
            setIsBuffering(false);
            setHasError(false);
          }}
          onWaiting={() => setIsBuffering(true)}
          onLoadedData={() => {
            setIsBuffering(false);
            setHasError(false);
          }}
          onCanPlay={() => {
            setIsBuffering(false);
            setHasError(false);
          }}
          onPause={() => {
            setIsPlaying(false);
            setIsBuffering(false);
          }}
          onEnded={() => {
            setIsPlaying(false);
            setIsBuffering(false);
          }}
          onError={() => {
            setIsBuffering(false);
            setIsPlaying(false);
            setHasError(true);
          }}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime || 0)}
          onVolumeChange={(e) => setIsMuted(e.currentTarget.muted)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {isBuffering && (
          <div className="cw-video-status cw-mono" aria-live="polite">
            LOADING VIDEO...
          </div>
        )}

        {hasError && (
          <div className="cw-video-status cw-video-status--error cw-mono" role="alert">
            UNABLE TO PLAY VIDEO
          </div>
        )}

        {!isPlaying && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              void togglePlayPause();
            }}
            className="cw-video-play-overlay"
            aria-label="Play project video"
          >
            <span className="cw-video-play-badge">
              <Play className="w-6 h-6 translate-x-0.5" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>

      <div className="cw-video-controls" aria-label="Video player controls">
        <div className="cw-video-controls__top">
          <button
            type="button"
            onClick={() => void togglePlayPause()}
            className="cw-vc-btn"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" aria-hidden="true" />
                <span>PLAY</span>
              </>
            )}
          </button>

          <span className="cw-video-time cw-mono">
            {formatDuration(currentTime)} / {formatDuration(duration)}
          </span>

          <div className="cw-video-controls__right">
            <button
              type="button"
              onClick={toggleMute}
              className="cw-vc-btn"
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>MUTED</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>SOUND</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleFullscreen}
              className="cw-vc-btn cw-vc-btn--icon"
              aria-label="Enter fullscreen video"
              title="Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={duration > 0 ? duration : 100}
          step={0.1}
          value={duration > 0 ? currentTime : 0}
          onChange={handleSeek}
          className="cw-video-scrubber"
          aria-label="Seek video timeline"
        />
      </div>
    </div>
  );
};

interface RichCaseStudyViewProps {
  project: WorkSkeletonProject;
  detail: RichWorkProjectDetail;
  onZoomScreenshot: (platform: PlatformPerformance) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

const RichCaseStudyView: React.FC<RichCaseStudyViewProps> = ({
  project,
  detail,
  onZoomScreenshot,
  videoRef,
}) => {
  return (
    <div className="cw-case">
      {/* Upper Spread: 9:16 Video Centerpiece + Project Story */}
      <div className="cw-case-spread">
        {/* Left Column: Prominent 9:16 Portrait Video Player */}
        <div className="cw-case-video-col">
          <PortraitVideoPlayer
            videoRef={videoRef}
            videoSrc={detail.videoSrc}
            posterSrc={detail.posterSrc}
            trackLabel={`${project.code} · 9:16 ORIGINAL CUT`}
            ariaLabel={`${detail.title} vertical short-form video`}
            resetKey={project.id}
          />
        </div>

        {/* Right Column: Editorial Headline, Subtitle & Story Sections */}
        <div className="cw-case-story-col">
          <header className="cw-case-header">
            <span className="cw-detail-info__index cw-mono">
              {project.id} / SELECTED WORK · {project.editionTag}
            </span>
            <h1 id="cw-detail-heading" className="cw-case-title">
              {detail.title}
            </h1>
            <p className="cw-case-subtitle">{detail.subtitle}</p>
          </header>

          <div className="cw-case-sections">
            <section className="cw-case-block" aria-label="Project Introduction">
              <div className="cw-case-prose">
                {detail.introParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </section>

            <section className="cw-case-block" aria-labelledby="cw-approach-heading">
              <h2 id="cw-approach-heading" className="cw-case-block__heading">
                The Creative Approach
              </h2>
              <div className="cw-case-prose">
                {detail.creativeApproachParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </section>

            <section className="cw-case-block" aria-labelledby="cw-role-heading">
              <h2 id="cw-role-heading" className="cw-case-block__heading">
                My Role
              </h2>
              <div className="cw-case-prose">
                <p>{detail.myRole}</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Cross-Platform Metrics & Original Screenshots Band */}
      <section className="cw-case-metrics-band" aria-labelledby="cw-metrics-heading">
        <div className="cw-band-header">
          <span className="cw-mono cw-band-kicker">CROSS-PLATFORM PERFORMANCE</span>
          <h2 id="cw-metrics-heading" className="cw-band-title">
            Verified Reach &amp; Platform Screenshots
          </h2>
        </div>

        <div className="cw-platforms-grid">
          {detail.platforms.map((platform) => (
            <article key={platform.id} className="cw-platform-card">
              <header className="cw-platform-card__head">
                <div className="cw-platform-card__title-wrap">
                  <span
                    className="cw-platform-swatch"
                    style={{ backgroundColor: platform.accentColor }}
                    aria-hidden="true"
                  />
                  <h3 className="cw-platform-card__name">{platform.name}</h3>
                </div>
                <span className="cw-mono cw-platform-card__badge">PLATFORM RECORD</span>
              </header>

              {/* Numeric Highlights First (2-column responsive metric tiles) */}
              <div className="cw-platform-stats">
                {platform.stats.map((stat) => (
                  <div key={stat.label} className="cw-stat-tile">
                    <span className="cw-stat-tile__value">{stat.value}</span>
                    <span className="cw-stat-tile__label cw-mono">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Accompanying Click-to-Enlarge Original Screenshot */}
              <button
                type="button"
                onClick={() => onZoomScreenshot(platform)}
                className="cw-screenshot-trigger"
                aria-label={`Enlarge ${platform.name} original screenshot`}
              >
                <span className="cw-screenshot-thumb-wrap">
                  <img
                    src={platform.screenshotSrc}
                    alt={platform.screenshotAlt}
                    className="cw-screenshot-thumb"
                    loading="lazy"
                  />
                </span>
                <span className="cw-screenshot-meta">
                  <span className="cw-screenshot-caption">{platform.screenshotCaption}</span>
                  <span className="cw-screenshot-cta cw-mono">
                    <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>CLICK TO ENLARGE</span>
                  </span>
                </span>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Audience Response & External Links */}
      <section className="cw-case-response-band" aria-labelledby="cw-response-heading">
        <div className="cw-response-box">
          <div className="cw-response-copy">
            <h2 id="cw-response-heading" className="cw-case-block__heading">
              Audience Response
            </h2>
            <p className="cw-response-lead">{detail.audienceResponse.lead}</p>
            <blockquote className="cw-response-quote">
              {detail.audienceResponse.quote}
            </blockquote>
          </div>

          <div className="cw-external-links" aria-label="Watch original posts on platforms">
            {detail.externalLinks.map((ext) => (
              <a
                key={ext.url}
                href={ext.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cw-ext-btn"
              >
                <span>{ext.label}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

interface LocalDiscoveryCollectionViewProps {
  collection: LocalDiscoveryCollection;
  activeCategorySlug: LocalDiscoveryCategorySlug | null;
  activeRestaurantIdx: number | null;
  activeImageCollabIdx: number | null;
  activeRentalIdx: number | null;
  onSelectCategory: (slug: LocalDiscoveryCategorySlug | null) => void;
  onSelectRestaurant: (idx: number | null) => void;
  onSelectImageCollab: (idx: number | null) => void;
  onSelectRental: (idx: number | null) => void;
  onZoomImage: (lightbox: LightboxState) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

const LocalDiscoveryCollectionView: React.FC<LocalDiscoveryCollectionViewProps> = ({
  collection,
  activeCategorySlug,
  activeRestaurantIdx,
  activeImageCollabIdx,
  activeRentalIdx,
  onSelectCategory,
  onSelectRestaurant,
  onSelectImageCollab,
  onSelectRental,
  onZoomImage,
  videoRef,
}) => {
  const activeCategory =
    activeCategorySlug !== null
      ? collection.categories.find((cat) => cat.slug === activeCategorySlug) ?? null
      : null;

  // LEVEL 2: Barcelona Local Discovery Overview (4 clickable category cards)
  if (!activeCategory) {
    return (
      <div className="cw-disco">
        <header className="cw-disco-hero">
          <div className="cw-disco-hero__top">
            <span className="cw-mono cw-disco-kicker">{collection.overviewKicker}</span>
            <span className="cw-mono cw-disco-count">
              0{collection.categories.length} CONTENT CATEGORIES
            </span>
          </div>

          <h1 id="cw-detail-heading" className="cw-disco-title">
            {collection.overviewTitle}
          </h1>
          <p className="cw-disco-lead">{collection.overviewDescription}</p>
        </header>

        <div className="cw-disco-cat-grid" aria-label="Barcelona Local Discovery categories">
          {collection.categories.map((cat) => (
            <article key={cat.slug} className="cw-disco-cat-card">
              <button
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`cw-disco-cat-card__btn${
                  cat.coverSrc ? ' cw-disco-cat-card__btn--with-media' : ''
                }`}
                aria-label={`Open ${cat.title} category`}
              >
                {cat.coverSrc && (
                  <div className="cw-disco-cat-card__media-col">
                    <span className="cw-disco-card__index cw-disco-cat-card__num cw-mono">
                      {cat.id}
                    </span>
                    <div className="cw-disco-cat-card__media">
                      <img
                        src={cat.coverSrc}
                        alt={cat.coverAlt ?? `${cat.title} category cover`}
                        className="cw-disco-card__img"
                        loading="eager"
                      />
                    </div>
                  </div>
                )}

                <div className="cw-disco-cat-card__content">
                  <div className="cw-disco-cat-card__top">
                    {!cat.coverSrc && (
                      <span className="cw-disco-card__index cw-disco-cat-card__num cw-mono">
                        {cat.id}
                      </span>
                    )}
                    <div className="cw-disco-cat-card__badges">
                      <span
                        className={`cw-disco-tag cw-mono${
                          cat.isCommercial ? ' cw-disco-tag--pink' : ' cw-disco-tag--indie'
                        }`}
                      >
                        {cat.classification}
                      </span>
                      <span className="cw-disco-tag cw-mono">{cat.statusLabel}</span>
                    </div>
                  </div>

                  <h2 className="cw-disco-cat-card__title">{cat.title}</h2>
                  <p className="cw-disco-cat-card__desc">{cat.overviewDescription}</p>

                  <span className="cw-disco-card__cta cw-mono">
                    <span>OPEN CATEGORY</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>
    );
  }

  // Shared Level 3 Category Sub-navigation (Back to Series Overview + Category Tabs)
  const renderCategorySubnav = () => (
    <div className="cw-disco-subnav">
      <button
        type="button"
        onClick={() => onSelectCategory(null)}
        className="cw-vc-btn cw-disco-back-btn"
      >
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        <span>BACK TO BARCELONA LOCAL DISCOVERY</span>
      </button>

      <div className="cw-disco-switcher" role="tablist" aria-label="Switch discovery category">
        {collection.categories.map((cat) => {
          const isActive = cat.slug === activeCategory.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(cat.slug)}
              className={`cw-disco-tab cw-mono${isActive ? ' cw-disco-tab--active' : ''}`}
            >
              {cat.id} · {cat.title}
            </button>
          );
        })}
      </div>
    </div>
  );

  const restaurants = activeCategory.restaurants ?? [];

  // LEVEL 3 (Complete Independent Category Detail, e.g. Vintage Shopping — Barcelona Vintage Hunt)
  if (activeCategory.independentCase) {
    const item = activeCategory.independentCase;
    return (
      <div className="cw-case cw-disco-detail">
        {renderCategorySubnav()}

        <div className="cw-case-spread">
          <div className="cw-case-video-col">
            <PortraitVideoPlayer
              videoRef={videoRef}
              videoSrc={item.videoSrc}
              posterSrc={item.coverSrc}
              trackLabel={`${activeCategory.title} · ${item.title}`}
              ariaLabel={`${item.title} vertical short-form video`}
              resetKey={item.slug}
            />
          </div>

          <div className="cw-case-story-col">
            <header className="cw-case-header">
              <div className="cw-disco-card__tags cw-disco-card__tags--detail">
                <span className="cw-disco-tag cw-disco-tag--indie cw-mono">
                  {item.projectType}
                </span>
                <span className="cw-disco-tag cw-mono">{item.platform}</span>
                <span className="cw-disco-tag cw-mono">{item.locationFeatured}</span>
              </div>

              <h1 id="cw-detail-heading" className="cw-case-title">
                {item.title}
              </h1>
              <p className="cw-case-subtitle">{item.subtitle}</p>
            </header>

            <div className="cw-case-sections">
              <section className="cw-case-block" aria-labelledby="cw-indie-overview">
                <h2 id="cw-indie-overview" className="cw-case-block__heading">
                  Project Overview
                </h2>
                <div className="cw-case-prose">
                  <p>{item.projectOverview}</p>
                </div>
              </section>

              <section className="cw-case-block" aria-labelledby="cw-indie-approach">
                <h2 id="cw-indie-approach" className="cw-case-block__heading">
                  Creative Approach
                </h2>
                <div className="cw-case-prose">
                  <p>{item.creativeApproach}</p>
                </div>
              </section>

              <section className="cw-case-block" aria-labelledby="cw-indie-role">
                <h2 id="cw-indie-role" className="cw-case-block__heading">
                  My Role
                </h2>
                <div className="cw-case-prose">
                  <p>{item.myRole}</p>
                </div>
              </section>

              <section className="cw-case-block" aria-labelledby="cw-indie-performance">
                <h2 id="cw-indie-performance" className="cw-case-block__heading">
                  Performance
                </h2>

                <div className="cw-platform-stats">
                  {item.stats.map((stat) => (
                    <div key={stat.label} className="cw-stat-tile">
                      <span className="cw-stat-tile__value">{stat.value}</span>
                      <span className="cw-stat-tile__label cw-mono">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onZoomImage({
                      src: item.screenshotSrc,
                      alt: item.screenshotAlt,
                      caption: item.screenshotCaption,
                      platformName: item.platform,
                    })
                  }
                  className="cw-screenshot-trigger cw-disco-screenshot"
                  aria-label={`Enlarge ${item.title} Xiaohongshu performance screenshot`}
                >
                  <span className="cw-screenshot-thumb-wrap">
                    <img
                      src={item.screenshotSrc}
                      alt={item.screenshotAlt}
                      className="cw-screenshot-thumb"
                      loading="lazy"
                    />
                  </span>
                  <span className="cw-screenshot-meta">
                    <span className="cw-screenshot-caption">{item.screenshotCaption}</span>
                    <span className="cw-screenshot-cta cw-mono">
                      <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>CLICK TO ENLARGE EVIDENCE</span>
                    </span>
                  </span>
                </button>
              </section>
            </div>

            <div className="cw-disco-actions">
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cw-ext-btn"
              >
                <span>{item.externalLabel}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LEVEL 3 (Commercial Image-Based Collaboration Series, e.g. Beauty, Wellness & Local Finds)
  if (activeCategory.imageCollabs && activeCategory.imageCollabs.length > 0) {
    const imageCollabs = activeCategory.imageCollabs;
    const selectedImageCase: ImageCollabCase | null =
      activeImageCollabIdx !== null ? imageCollabs[activeImageCollabIdx] ?? null : null;

    if (!selectedImageCase) {
      return (
        <div className="cw-disco">
          {renderCategorySubnav()}

          <header className="cw-disco-hero">
            <div className="cw-disco-hero__top">
              <div className="cw-disco-cat-card__badges">
                <span className="cw-disco-tag cw-disco-tag--pink cw-mono">
                  {activeCategory.classification}
                </span>
                <span className="cw-mono cw-disco-kicker">
                  SUBCATEGORY {activeCategory.id} · {activeCategory.title}
                </span>
              </div>
              <span className="cw-mono cw-disco-count">
                0{imageCollabs.length} IMAGE COLLABORATIONS
              </span>
            </div>

            <h1 id="cw-detail-heading" className="cw-disco-title">
              Beauty, Wellness &amp; Local Finds
            </h1>
            <p className="cw-disco-lead">{activeCategory.editorialIntro}</p>
          </header>

          <div
            className="cw-beauty-grid"
            aria-label="Beauty, Wellness and Local Finds commercial image collaborations"
          >
            {imageCollabs.map((item, idx) => (
              <article key={item.slug} className="cw-beauty-card">
                <button
                  type="button"
                  onClick={() => onSelectImageCollab(idx)}
                  className="cw-beauty-card__btn"
                  aria-label={`Open ${item.title} commercial image collaboration`}
                >
                  <div className="cw-beauty-card__media">
                    <img
                      src={item.screenshotSrc}
                      alt={item.screenshotAlt}
                      className="cw-beauty-card__img"
                      loading="eager"
                    />
                    <span className="cw-disco-card__index cw-mono">{item.id}</span>
                  </div>

                  <div className="cw-beauty-card__body">
                    <div className="cw-disco-card__tags">
                      <span className="cw-disco-tag cw-disco-tag--pink cw-mono">
                        {item.collaborationType}
                      </span>
                      <span className="cw-disco-tag cw-mono">{item.platform}</span>
                      <span className="cw-disco-tag cw-mono">{item.formatLabel}</span>
                    </div>

                    <h2 className="cw-beauty-card__title">{item.title}</h2>
                    <p className="cw-beauty-card__topic">{item.topicTitle}</p>
                    <p className="cw-beauty-card__focus">{item.focusLabel}</p>

                    <span className="cw-disco-card__cta cw-mono">
                      <span>OPEN PROJECT</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      );
    }

    const nextImageIdx = (activeImageCollabIdx! + 1) % imageCollabs.length;
    const nextImageCase = imageCollabs[nextImageIdx];

    return (
      <div className="cw-case cw-disco-detail">
        <div className="cw-disco-subnav">
          <button
            type="button"
            onClick={() => onSelectImageCollab(null)}
            className="cw-vc-btn cw-disco-back-btn"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>BACK TO BEAUTY, WELLNESS &amp; LOCAL FINDS</span>
          </button>

          <div className="cw-disco-switcher" role="tablist" aria-label="Switch image collaboration">
            {imageCollabs.map((item, idx) => {
              const isActive = idx === activeImageCollabIdx;
              return (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectImageCollab(idx)}
                  className={`cw-disco-tab cw-mono${isActive ? ' cw-disco-tab--active' : ''}`}
                >
                  {item.id} · {item.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="cw-case-spread">
          <div className="cw-case-video-col">
            <div className="cw-beauty-detail-frame">
              <div className="cw-video-card__bar">
                <span className="cw-mono cw-video-card__track">
                  {selectedImageCase.formatLabel} · {selectedImageCase.id} / 0{imageCollabs.length}
                </span>
                <span className="cw-video-card__dot" aria-hidden="true" />
              </div>

              <button
                type="button"
                onClick={() =>
                  onZoomImage({
                    src: selectedImageCase.screenshotSrc,
                    alt: selectedImageCase.screenshotAlt,
                    caption: selectedImageCase.screenshotCaption,
                    platformName: selectedImageCase.platform,
                  })
                }
                className="cw-beauty-detail-shot-btn"
                aria-label={`Enlarge ${selectedImageCase.title} original Xiaohongshu screenshot`}
              >
                <span className="cw-beauty-detail-shot-wrap">
                  <img
                    src={selectedImageCase.screenshotSrc}
                    alt={selectedImageCase.screenshotAlt}
                    className="cw-beauty-detail-shot-img"
                    loading="eager"
                  />
                </span>
                <span className="cw-disco-audience__shot-bar cw-mono">
                  <span>ORIGINAL XIAOHONGSHU POST</span>
                  <span className="cw-disco-audience__zoom">
                    <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>CLICK TO ENLARGE</span>
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div className="cw-case-story-col">
            <header className="cw-case-header">
              <div className="cw-disco-card__tags cw-disco-card__tags--detail">
                <span className="cw-disco-tag cw-disco-tag--pink cw-mono">
                  {selectedImageCase.collaborationType}
                </span>
                <span className="cw-disco-tag cw-mono">{selectedImageCase.platform}</span>
                <span className="cw-disco-tag cw-mono">{selectedImageCase.formatLabel}</span>
              </div>

              <h1 id="cw-detail-heading" className="cw-case-title">
                {selectedImageCase.title}
              </h1>
              <p className="cw-case-subtitle">{selectedImageCase.topicTitle}</p>
            </header>

            <div className="cw-case-sections">
              <section className="cw-case-block" aria-labelledby="cw-beauty-overview">
                <h2 id="cw-beauty-overview" className="cw-case-block__heading">
                  Project Overview
                </h2>
                <div className="cw-case-prose">
                  <p>{selectedImageCase.summary}</p>
                </div>
              </section>

              <section className="cw-case-block" aria-labelledby="cw-beauty-scope">
                <h2 id="cw-beauty-scope" className="cw-case-block__heading">
                  Format &amp; Creative Scope
                </h2>
                <div className="cw-case-prose">
                  <p>{selectedImageCase.scopeOfWork}</p>
                </div>
              </section>

              <section className="cw-case-block" aria-labelledby="cw-beauty-analytics">
                <h2 id="cw-beauty-analytics" className="cw-case-block__heading">
                  Performance &amp; Analytics
                </h2>
                <div className="cw-beauty-analytics-slot">
                  <span className="cw-media-slot__kicker cw-mono">
                    ANALYTICS ARCHIVE · RESERVED
                  </span>
                  <p className="cw-beauty-analytics-slot__text">
                    {selectedImageCase.analyticsNote}
                  </p>
                </div>
              </section>
            </div>

            <div className="cw-disco-actions">
              <a
                href={selectedImageCase.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cw-ext-btn"
              >
                <span>{selectedImageCase.externalLabel}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>

              {nextImageCase && nextImageCase.slug !== selectedImageCase.slug && (
                <button
                  type="button"
                  onClick={() => onSelectImageCollab(nextImageIdx)}
                  className="cw-disco-switch-cta cw-mono"
                >
                  <span>NEXT PROJECT: {nextImageCase.title.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LEVEL 3 (Independent Short-Form Video Series: Barcelona Rental Guide)
  if (activeCategory.rentalGuides && activeCategory.rentalGuides.length > 0) {
    const rentalGuides = activeCategory.rentalGuides;
    const selectedRentalCase: RentalGuideCase | null =
      activeRentalIdx !== null ? rentalGuides[activeRentalIdx] ?? null : null;

    if (!selectedRentalCase) {
      return (
        <div className="cw-disco">
          {renderCategorySubnav()}

          <header className="cw-disco-hero">
            <div className="cw-disco-hero__top">
              <div className="cw-disco-cat-card__badges">
                <span className="cw-disco-tag cw-disco-tag--indie cw-mono">
                  {activeCategory.classification}
                </span>
                <span className="cw-mono cw-disco-kicker">
                  SUBCATEGORY {activeCategory.id} · {activeCategory.title}
                </span>
              </div>
              <span className="cw-mono cw-disco-count">
                0{rentalGuides.length} INDEPENDENT VIDEOS
              </span>
            </div>

            <h1 id="cw-detail-heading" className="cw-disco-title">
              Barcelona Rental Guide
            </h1>
            {activeCategory.editorialSubtitle && (
              <p className="cw-case-subtitle cw-rental-hero-sub">
                {activeCategory.editorialSubtitle}
              </p>
            )}
            <p className="cw-disco-lead">{activeCategory.editorialIntro}</p>
          </header>

          <div
            className="cw-disco-grid"
            aria-label="Barcelona Rental Guide independent video projects"
          >
            {rentalGuides.map((item, idx) => (
              <article key={item.slug} className="cw-disco-card">
                <button
                  type="button"
                  onClick={() => onSelectRental(idx)}
                  className="cw-disco-card__btn"
                  aria-label={`Open ${item.title} independent video project`}
                >
                  <div className="cw-disco-card__media cw-rental-card__media">
                    <img
                      src={item.coverSrc}
                      alt={item.coverAlt}
                      className="cw-rental-card__img"
                      loading="eager"
                    />
                    <span className="cw-disco-card__index cw-mono">{item.id}</span>
                  </div>

                  <div className="cw-disco-card__body">
                    <div className="cw-disco-card__tags">
                      <span className="cw-disco-tag cw-disco-tag--indie cw-mono">
                        {item.contentType}
                      </span>
                      <span className="cw-disco-tag cw-mono">{item.platform}</span>
                    </div>

                    <h2 className="cw-disco-card__title">{item.title}</h2>
                    <p className="cw-disco-card__desc">{item.summary}</p>

                    <ul className="cw-rental-highlights" aria-label={item.highlightsLabel}>
                      {item.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>

                    <div className="cw-disco-card__stats">
                      {item.stats.map((stat) => (
                        <div key={stat.label} className="cw-disco-mini-stat">
                          <span className="cw-disco-mini-stat__val">{stat.value}</span>
                          <span className="cw-disco-mini-stat__lbl cw-mono">{stat.label}</span>
                        </div>
                      ))}
                    </div>

                    <span className="cw-disco-card__cta cw-mono">
                      <span>OPEN PROJECT</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      );
    }

    const otherRentalIdx = activeRentalIdx === 0 ? 1 : 0;
    const otherRentalCase = rentalGuides[otherRentalIdx];

    return (
      <div className="cw-case cw-disco-detail">
        <div className="cw-disco-subnav">
          <button
            type="button"
            onClick={() => onSelectRental(null)}
            className="cw-vc-btn cw-disco-back-btn"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>BACK TO BARCELONA RENTAL GUIDE</span>
          </button>

          <div
            className="cw-disco-switcher"
            role="tablist"
            aria-label="Switch rental guide project"
          >
            {rentalGuides.map((item, idx) => {
              const isActive = idx === activeRentalIdx;
              return (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectRental(idx)}
                  className={`cw-disco-tab cw-mono${isActive ? ' cw-disco-tab--active' : ''}`}
                >
                  {item.id} · {item.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="cw-case-spread">
          <div className="cw-case-video-col">
            <div className="cw-rental-cover-frame">
              <div className="cw-video-card__bar">
                <span className="cw-mono cw-video-card__track">
                  9:16 VIDEO COVER · {selectedRentalCase.id} / 0{rentalGuides.length}
                </span>
                <span className="cw-video-card__dot" aria-hidden="true" />
              </div>

              <button
                type="button"
                onClick={() =>
                  onZoomImage({
                    src: selectedRentalCase.coverSrc,
                    alt: selectedRentalCase.coverAlt,
                    caption: selectedRentalCase.coverCaption,
                    platformName: selectedRentalCase.platform,
                  })
                }
                className="cw-beauty-detail-shot-btn"
                aria-label={`Enlarge ${selectedRentalCase.title} 9:16 video cover`}
              >
                <span className="cw-rental-cover-wrap">
                  <img
                    src={selectedRentalCase.coverSrc}
                    alt={selectedRentalCase.coverAlt}
                    className="cw-rental-cover-img"
                    loading="eager"
                  />
                </span>
                <span className="cw-disco-audience__shot-bar cw-mono">
                  <span>ORIGINAL 9:16 VIDEO COVER</span>
                  <span className="cw-disco-audience__zoom">
                    <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>CLICK TO ENLARGE</span>
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div className="cw-case-story-col">
            <header className="cw-case-header">
              <div className="cw-disco-card__tags cw-disco-card__tags--detail">
                <span className="cw-disco-tag cw-disco-tag--indie cw-mono">
                  {selectedRentalCase.contentType}
                </span>
                <span className="cw-disco-tag cw-mono">{selectedRentalCase.platform}</span>
              </div>

              <h1 id="cw-detail-heading" className="cw-case-title">
                {selectedRentalCase.title}
              </h1>
              <p className="cw-case-subtitle">{selectedRentalCase.subtitle}</p>
            </header>

            <div className="cw-case-sections">
              <section className="cw-case-block" aria-labelledby="cw-rental-overview">
                <h2 id="cw-rental-overview" className="cw-case-block__heading">
                  Project Overview
                </h2>
                <div className="cw-case-prose">
                  <p>{selectedRentalCase.projectOverview}</p>
                </div>
              </section>

              <section className="cw-case-block" aria-labelledby="cw-rental-approach">
                <h2 id="cw-rental-approach" className="cw-case-block__heading">
                  Creative Approach
                </h2>
                <div className="cw-case-prose">
                  <p>{selectedRentalCase.creativeApproach}</p>
                </div>
              </section>

              <section className="cw-case-block" aria-labelledby="cw-rental-role">
                <h2 id="cw-rental-role" className="cw-case-block__heading">
                  My Role
                </h2>
                <div className="cw-case-prose">
                  <p>{selectedRentalCase.myRole}</p>
                </div>
              </section>

              <section className="cw-case-block" aria-labelledby="cw-rental-metrics">
                <h2 id="cw-rental-metrics" className="cw-case-block__heading">
                  Performance Metrics
                </h2>

                <div className="cw-platform-stats">
                  {selectedRentalCase.stats.map((stat) => (
                    <div key={stat.label} className="cw-stat-tile">
                      <span className="cw-stat-tile__value">{stat.value}</span>
                      <span className="cw-stat-tile__label cw-mono">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onZoomImage({
                      src: selectedRentalCase.screenshotSrc,
                      alt: selectedRentalCase.screenshotAlt,
                      caption: selectedRentalCase.screenshotCaption,
                      platformName: selectedRentalCase.platform,
                    })
                  }
                  className="cw-screenshot-trigger cw-disco-screenshot"
                  aria-label={`Enlarge ${selectedRentalCase.title} Xiaohongshu analytics screenshot`}
                >
                  <span className="cw-screenshot-thumb-wrap">
                    <img
                      src={selectedRentalCase.screenshotSrc}
                      alt={selectedRentalCase.screenshotAlt}
                      className="cw-screenshot-thumb"
                      loading="lazy"
                    />
                  </span>
                  <span className="cw-screenshot-meta">
                    <span className="cw-screenshot-caption">
                      {selectedRentalCase.screenshotCaption}
                    </span>
                    <span className="cw-screenshot-cta cw-mono">
                      <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>CLICK TO ENLARGE EVIDENCE</span>
                    </span>
                  </span>
                </button>
              </section>
            </div>

            <div className="cw-disco-actions">
              <a
                href={selectedRentalCase.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cw-ext-btn"
              >
                <span>{selectedRentalCase.externalLabel}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>

              {otherRentalCase && (
                <button
                  type="button"
                  onClick={() => onSelectRental(otherRentalIdx)}
                  className="cw-disco-switch-cta cw-mono"
                >
                  <span>
                    {otherRentalIdx > (activeRentalIdx ?? 0)
                      ? 'NEXT PROJECT'
                      : 'PREVIOUS PROJECT'}
                    : {otherRentalCase.title.toUpperCase()}
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LEVEL 3 (Independent Placeholder Categories awaiting real media)
  if (!activeCategory.restaurants) {
    const slots = activeCategory.placeholderSlots ?? [];
    return (
      <div className="cw-disco">
        {renderCategorySubnav()}

        <header className="cw-disco-hero">
          <div className="cw-disco-hero__top">
            <div className="cw-disco-cat-card__badges">
              <span className="cw-disco-tag cw-disco-tag--indie cw-mono">
                {activeCategory.classification}
              </span>
              <span className="cw-mono cw-disco-kicker">
                SUBCATEGORY {activeCategory.id} · {activeCategory.title}
              </span>
            </div>
            <span className="cw-mono cw-disco-count">{activeCategory.statusLabel}</span>
          </div>

          <h1 id="cw-detail-heading" className="cw-disco-title">
            {activeCategory.title}
          </h1>
          <p className="cw-disco-lead">{activeCategory.editorialIntro}</p>
        </header>

        <div className="cw-disco-slots-grid" aria-label={`${activeCategory.title} archive slots`}>
          {slots.map((slot) => (
            <article key={slot.slotCode} className="cw-disco-slot-card">
              <span className="cw-media-slot__kicker cw-mono">{slot.slotCode}</span>
              <div className="cw-disco-slot-card__body">
                <h2 className="cw-disco-slot-card__title">{slot.title}</h2>
                <p className="cw-disco-slot-card__desc">{slot.description}</p>
              </div>
              <span className="cw-media-slot__meta cw-mono">{slot.formatLabel}</span>
            </article>
          ))}
        </div>
      </div>
    );
  }

  const selectedCase: RestaurantCollabCase | null =
    activeRestaurantIdx !== null ? restaurants[activeRestaurantIdx] ?? null : null;

  // LEVEL 3 (Restaurants Category Overview: Preserved Season Tapas & Bodega Joan cards)
  if (!selectedCase) {
    return (
      <div className="cw-disco">
        {renderCategorySubnav()}

        <header className="cw-disco-hero">
          <div className="cw-disco-hero__top">
            <div className="cw-disco-cat-card__badges">
              <span className="cw-disco-tag cw-disco-tag--pink cw-mono">
                {activeCategory.classification}
              </span>
              <span className="cw-mono cw-disco-kicker">SUBCATEGORY · RESTAURANTS</span>
            </div>
            <span className="cw-mono cw-disco-count">
              0{restaurants.length} COMMERCIAL COLLABORATIONS
            </span>
          </div>

          <h1 id="cw-detail-heading" className="cw-disco-title">
            Restaurant Collaborations
          </h1>
          <p className="cw-disco-lead">{activeCategory.editorialIntro}</p>
        </header>

        <div className="cw-disco-grid" aria-label="Restaurant collaborations list">
          {restaurants.map((item, idx) => (
            <article key={item.slug} className="cw-disco-card">
              <button
                type="button"
                onClick={() => onSelectRestaurant(idx)}
                className="cw-disco-card__btn"
                aria-label={`Open ${item.title} commercial collaboration`}
              >
                <div className="cw-disco-card__media">
                  <img
                    src={item.coverSrc}
                    alt={item.coverAlt}
                    className="cw-disco-card__img"
                    loading="eager"
                  />
                  <span className="cw-disco-card__index cw-mono">{item.id}</span>
                </div>

                <div className="cw-disco-card__body">
                  <div className="cw-disco-card__tags">
                    <span className="cw-disco-tag cw-disco-tag--pink cw-mono">
                      {item.collaborationType}
                    </span>
                    <span className="cw-disco-tag cw-mono">{item.platform}</span>
                  </div>

                  <h2 className="cw-disco-card__title">{item.title}</h2>
                  <p className="cw-disco-card__desc">{item.summary}</p>

                  <div className="cw-disco-card__stats">
                    {item.stats.map((stat) => (
                      <div key={stat.label} className="cw-disco-mini-stat">
                        <span className="cw-disco-mini-stat__val">{stat.value}</span>
                        <span className="cw-disco-mini-stat__lbl cw-mono">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  <span className="cw-disco-card__cta cw-mono">
                    <span>OPEN COLLABORATION</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>
    );
  }

  const otherIdx = activeRestaurantIdx === 0 ? 1 : 0;
  const otherCase = restaurants[otherIdx];

  return (
    <div className="cw-case cw-disco-detail">
      {/* Restaurant Sub-navigation & Switcher */}
      <div className="cw-disco-subnav">
        <button
          type="button"
          onClick={() => onSelectRestaurant(null)}
          className="cw-vc-btn cw-disco-back-btn"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>BACK TO RESTAURANTS</span>
        </button>

        <div className="cw-disco-switcher" role="tablist" aria-label="Switch restaurant case">
          {restaurants.map((item, idx) => {
            const isActive = idx === activeRestaurantIdx;
            return (
              <button
                key={item.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectRestaurant(idx)}
                className={`cw-disco-tab cw-mono${isActive ? ' cw-disco-tab--active' : ''}`}
              >
                {item.id} · {item.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Editorial Spread: 9:16 Video Centerpiece + Commercial Story & Xiaohongshu Metrics */}
      <div className="cw-case-spread">
        <div className="cw-case-video-col">
          <PortraitVideoPlayer
            videoRef={videoRef}
            videoSrc={selectedCase.videoSrc}
            posterSrc={selectedCase.coverSrc}
            trackLabel={`RESTAURANTS · ${selectedCase.id} · ${selectedCase.title.toUpperCase()}`}
            ariaLabel={`${selectedCase.title} vertical collaboration video`}
            resetKey={selectedCase.slug}
          />
        </div>

        <div className="cw-case-story-col">
          <header className="cw-case-header">
            <div className="cw-disco-card__tags cw-disco-card__tags--detail">
              <span className="cw-disco-tag cw-disco-tag--pink cw-mono">
                {selectedCase.collaborationType}
              </span>
              <span className="cw-disco-tag cw-mono">
                {selectedCase.platform}
              </span>
            </div>

            <h1 id="cw-detail-heading" className="cw-case-title">
              {selectedCase.title}
            </h1>
            <p className="cw-case-subtitle">
              Barcelona Local Discovery · Restaurant Collaboration
            </p>
          </header>

          <div className="cw-case-sections">
            <section className="cw-case-block" aria-labelledby="cw-disco-overview">
              <h2 id="cw-disco-overview" className="cw-case-block__heading">
                Project Overview
              </h2>
              <div className="cw-case-prose">
                <p>{selectedCase.summary}</p>
              </div>
            </section>

            <section className="cw-case-block" aria-labelledby="cw-disco-role">
              <h2 id="cw-disco-role" className="cw-case-block__heading">
                Scope &amp; Creative Role
              </h2>
              <div className="cw-case-prose">
                <p>{selectedCase.scopeOfWork}</p>
              </div>
            </section>

            <section className="cw-case-block" aria-labelledby="cw-disco-metrics">
              <h2 id="cw-disco-metrics" className="cw-case-block__heading">
                {selectedCase.platform} Performance
              </h2>

              <div className="cw-platform-stats">
                {selectedCase.stats.map((stat) => (
                  <div key={stat.label} className="cw-stat-tile">
                    <span className="cw-stat-tile__value">{stat.value}</span>
                    <span className="cw-stat-tile__label cw-mono">{stat.label}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  onZoomImage({
                    src: selectedCase.screenshotSrc,
                    alt: selectedCase.screenshotAlt,
                    caption: selectedCase.screenshotCaption,
                    platformName: selectedCase.platform,
                  })
                }
                className="cw-screenshot-trigger cw-disco-screenshot"
                aria-label={`Enlarge ${selectedCase.title} Xiaohongshu analytics screenshot`}
              >
                <span className="cw-screenshot-thumb-wrap">
                  <img
                    src={selectedCase.screenshotSrc}
                    alt={selectedCase.screenshotAlt}
                    className="cw-screenshot-thumb"
                    loading="lazy"
                  />
                </span>
                <span className="cw-screenshot-meta">
                  <span className="cw-screenshot-caption">{selectedCase.screenshotCaption}</span>
                  <span className="cw-screenshot-cta cw-mono">
                    <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>CLICK TO ENLARGE EVIDENCE</span>
                  </span>
                </span>
              </button>
            </section>
          </div>

          <div className="cw-disco-actions">
            <a
              href={selectedCase.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cw-ext-btn"
            >
              <span>{selectedCase.externalLabel}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>

            {otherCase && (
              <button
                type="button"
                onClick={() => onSelectRestaurant(otherIdx)}
                className="cw-disco-switch-cta cw-mono"
              >
                <span>
                  {otherIdx > (activeRestaurantIdx ?? 0) ? 'NEXT CASE' : 'PREVIOUS CASE'}:{' '}
                  {otherCase.title.toUpperCase()}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Season Tapas Editorial Audience Response (Original Screenshot + English Translation) */}
      {selectedCase.audienceResponse && (
        <section className="cw-disco-audience" aria-labelledby="cw-disco-audience-heading">
          <div className="cw-band-header">
            <span className="cw-mono cw-band-kicker">AUDIENCE RESPONSE</span>
            <h2 id="cw-disco-audience-heading" className="cw-band-title">
              {selectedCase.audienceResponse.leadCopy}
            </h2>
          </div>

          <div className="cw-disco-audience__grid">
            <button
              type="button"
              onClick={() =>
                onZoomImage({
                  src: selectedCase.audienceResponse!.screenshotSrc,
                  alt: selectedCase.audienceResponse!.screenshotAlt,
                  caption: selectedCase.audienceResponse!.screenshotCaption,
                  platformName: selectedCase.platform,
                })
              }
              className="cw-disco-audience__shot-btn"
              aria-label="Enlarge original Xiaohongshu viewer comment screenshot"
            >
              <span className="cw-disco-audience__img-wrap">
                <img
                  src={selectedCase.audienceResponse.screenshotSrc}
                  alt={selectedCase.audienceResponse.screenshotAlt}
                  className="cw-disco-audience__img"
                  loading="lazy"
                />
              </span>
              <span className="cw-disco-audience__shot-bar cw-mono">
                <span>ORIGINAL XIAOHONGSHU COMMENT</span>
                <span className="cw-disco-audience__zoom">
                  <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>ENLARGE</span>
                </span>
              </span>
            </button>

            <div className="cw-disco-audience__quotes">
              {selectedCase.audienceResponse.excerpts.map((item, idx) => (
                <article key={idx} className="cw-disco-quote-card">
                  <span className="cw-disco-quote-card__speaker cw-mono">{item.speaker}</span>
                  <blockquote className="cw-disco-quote-card__text">{item.quote}</blockquote>
                </article>
              ))}
              <p className="cw-disco-audience__note cw-mono">
                {selectedCase.audienceResponse.contextNote}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

interface BeautyPersonalStyleCollectionViewProps {
  collection: BeautyPersonalStyleCollection;
  activeSubIdx: number | null;
  onSelectSubProject: (idx: number | null) => void;
}

const BeautyPersonalStyleCollectionView: React.FC<BeautyPersonalStyleCollectionViewProps> = ({
  collection,
  activeSubIdx,
  onSelectSubProject,
}) => {
  const [subMediaTab, setSubMediaTab] = useState<'video' | 'cover'>('video');

  const selectedSub =
    activeSubIdx !== null ? collection.subProjects[activeSubIdx] ?? null : null;

  useEffect(() => {
    setSubMediaTab('video');
  }, [activeSubIdx]);

  // OVERVIEW: 03 — BEAUTY & PERSONAL STYLE (two independent clickable sub-projects)
  if (!selectedSub) {
    return (
      <div className="cw-disco">
        <header className="cw-disco-hero">
          <div className="cw-disco-hero__top">
            <span className="cw-mono cw-disco-kicker">{collection.overviewKicker}</span>
            <span className="cw-mono cw-disco-count">
              0{collection.subProjects.length} INDEPENDENT SUB-PROJECTS
            </span>
          </div>

          <h1 id="cw-detail-heading" className="cw-disco-title">
            {collection.overviewTitle}
          </h1>
          <p className="cw-case-subtitle cw-rental-hero-sub">{collection.overviewSubtitle}</p>
          <p className="cw-disco-lead">{collection.overviewDescription}</p>
        </header>

        <div
          className="cw-disco-grid"
          aria-label="Beauty and Personal Style independent sub-projects"
        >
          {collection.subProjects.map((sub, idx) => (
            <article key={sub.slug} className="cw-disco-card">
              <button
                type="button"
                onClick={() => onSelectSubProject(idx)}
                className="cw-disco-card__btn"
                aria-label={`Open ${sub.fullTitle}`}
              >
                <div
                  className="cw-disco-card__media cw-style-card__cover"
                  style={{ backgroundColor: sub.accentBg }}
                >
                  <div className="cw-style-card__cover-inner">
                    <span className="cw-style-card__kicker cw-mono">{sub.formatTag}</span>
                    <span className="cw-style-card__cover-title">{sub.title}</span>
                    <span className="cw-style-card__cover-status cw-mono">
                      {sub.coverStatus}
                    </span>
                  </div>
                  <span className="cw-disco-card__index cw-mono">{sub.id}</span>
                </div>

                <div className="cw-disco-card__body">
                  <div className="cw-disco-card__tags">
                    <span className="cw-disco-tag cw-disco-tag--pink cw-mono">
                      {sub.categoryTag}
                    </span>
                    <span className="cw-disco-tag cw-mono">{sub.formatTag}</span>
                  </div>

                  <h2 className="cw-disco-card__title">{sub.fullTitle}</h2>
                  <p className="cw-beauty-card__topic">{sub.subtitle}</p>
                  <p className="cw-disco-card__desc">{sub.cardSummary}</p>

                  <span className="cw-disco-card__cta cw-mono">
                    <span>OPEN SUB-PROJECT</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>
    );
  }

  const otherSubIdx = activeSubIdx === 0 ? 1 : 0;
  const otherSub = collection.subProjects[otherSubIdx];

  // INDEPENDENT SUB-PROJECT DETAIL: 01 — THE RETRO PERM or 02 — BEAUTY REVIEW
  return (
    <div className="cw-case cw-disco-detail">
      <div className="cw-disco-subnav">
        <button
          type="button"
          onClick={() => onSelectSubProject(null)}
          className="cw-vc-btn cw-disco-back-btn"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>BACK TO BEAUTY &amp; PERSONAL STYLE</span>
        </button>

        <div className="cw-disco-switcher" role="tablist" aria-label="Switch sub-project">
          {collection.subProjects.map((sub, idx) => {
            const isActive = idx === activeSubIdx;
            return (
              <button
                key={sub.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectSubProject(idx)}
                className={`cw-disco-tab cw-mono${isActive ? ' cw-disco-tab--active' : ''}`}
              >
                {sub.id} · {sub.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="cw-case-spread">
        {/* Independent Media Column (Dedicated Video & Cover Slots) */}
        <div className="cw-case-video-col">
          <div className="cw-detail-media__tabs cw-style-media-tabs" role="tablist" aria-label="Sub-project media format">
            <button
              type="button"
              role="tab"
              aria-selected={subMediaTab === 'video'}
              onClick={() => setSubMediaTab('video')}
              className={`cw-media-tab${subMediaTab === 'video' ? ' cw-media-tab--active' : ''}`}
            >
              <Film className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Video</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={subMediaTab === 'cover'}
              onClick={() => setSubMediaTab('cover')}
              className={`cw-media-tab${subMediaTab === 'cover' ? ' cw-media-tab--active' : ''}`}
            >
              <Images className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Cover</span>
            </button>
          </div>

          <div className="cw-video-card">
            <div className="cw-video-card__bar">
              <span className="cw-mono cw-video-card__track">
                {selectedSub.code} · {selectedSub.title}
              </span>
              <span
                className="cw-video-card__dot"
                style={{ backgroundColor: selectedSub.accentPrimary }}
                aria-hidden="true"
              />
            </div>

            <div
              className="cw-style-media-frame"
              style={{ backgroundColor: selectedSub.accentBg }}
            >
              <div className="cw-style-media-frame__inner">
                <span className="cw-media-slot__kicker cw-mono">
                  {subMediaTab === 'video'
                    ? 'INDEPENDENT VIDEO SLOT · 9:16'
                    : 'INDEPENDENT COVER SLOT · 9:16'}
                </span>

                <div className="cw-style-media-frame__center">
                  <span className="cw-media-slot__title">{selectedSub.fullTitle}</span>
                  <p className="cw-media-slot__desc">
                    {subMediaTab === 'video'
                      ? 'Dedicated vertical video container reserved for this independent project.'
                      : 'Dedicated cover frame reserved for this independent project.'}
                  </p>
                </div>

                <span className="cw-media-slot__meta cw-mono">
                  {subMediaTab === 'video' ? selectedSub.videoStatus : selectedSub.coverStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Independent Detail Story Column */}
        <div className="cw-case-story-col">
          <header className="cw-case-header">
            <div className="cw-disco-card__tags cw-disco-card__tags--detail">
              <span className="cw-disco-tag cw-disco-tag--pink cw-mono">
                {selectedSub.categoryTag}
              </span>
              <span className="cw-disco-tag cw-mono">{selectedSub.code}</span>
              <span className="cw-disco-tag cw-mono">{selectedSub.formatTag}</span>
            </div>

            <h1 id="cw-detail-heading" className="cw-case-title">
              {selectedSub.fullTitle}
            </h1>
            <p className="cw-case-subtitle">{selectedSub.subtitle}</p>
          </header>

          <div className="cw-case-sections">
            <section className="cw-case-block" aria-labelledby="cw-style-overview">
              <h2 id="cw-style-overview" className="cw-case-block__heading">
                Project Overview
              </h2>
              <div className="cw-case-prose">
                <p>{selectedSub.overview}</p>
              </div>
            </section>

            <section className="cw-case-block" aria-labelledby="cw-style-role">
              <h2 id="cw-style-role" className="cw-case-block__heading">
                My Role
              </h2>
              <div className="cw-case-prose">
                <p>{selectedSub.myRole}</p>
              </div>
            </section>

            <section className="cw-case-block" aria-labelledby="cw-style-performance">
              <h2 id="cw-style-performance" className="cw-case-block__heading">
                Performance
              </h2>
              <div className="cw-platform-stats">
                {selectedSub.performanceMetricsLabels.map((metricLabel) => (
                  <div key={metricLabel} className="cw-stat-tile">
                    <span className="cw-stat-tile__value">—</span>
                    <span className="cw-stat-tile__label cw-mono">{metricLabel}</span>
                  </div>
                ))}
              </div>
              <div className="cw-beauty-analytics-slot cw-style-perf-note">
                <span className="cw-media-slot__kicker cw-mono">
                  PERFORMANCE SLOT · AWAITING VERIFIED METRICS
                </span>
                <p className="cw-beauty-analytics-slot__text">{selectedSub.performanceNote}</p>
              </div>
            </section>

            <section className="cw-case-block" aria-labelledby="cw-style-link">
              <h2 id="cw-style-link" className="cw-case-block__heading">
                External Platform Link
              </h2>
              <div className="cw-beauty-analytics-slot">
                <span className="cw-media-slot__kicker cw-mono">
                  {selectedSub.externalPlatformLabel}
                </span>
                <p className="cw-beauty-analytics-slot__text">
                  {selectedSub.externalStatusNote}
                </p>
              </div>
            </section>
          </div>

          {otherSub && (
            <div className="cw-disco-actions">
              <button
                type="button"
                onClick={() => onSelectSubProject(otherSubIdx)}
                className="cw-disco-switch-cta cw-mono"
              >
                <span>OPEN SUB-PROJECT: {otherSub.fullTitle}</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const WorkDetailOverlay: React.FC<WorkDetailOverlayProps> = ({
  project,
  projectIndex,
  onClose,
  onPrevProject,
  onNextProject,
  onSelectProject,
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [mediaMode, setMediaMode] = useState<MediaSlotMode>('video');
  const [activeGalleryIdx, setActiveGalleryIdx] = useState<number>(0);
  const [activeCategorySlug, setActiveCategorySlug] =
    useState<LocalDiscoveryCategorySlug | null>(null);
  const [activeRestaurantIdx, setActiveRestaurantIdx] = useState<number | null>(null);
  const [activeImageCollabIdx, setActiveImageCollabIdx] = useState<number | null>(null);
  const [activeRentalIdx, setActiveRentalIdx] = useState<number | null>(null);
  const [activeStyleSubIdx, setActiveStyleSubIdx] = useState<number | null>(null);
  const [zoomedScreenshot, setZoomedScreenshot] = useState<LightboxState | null>(null);

  const prevIdx =
    (projectIndex - 1 + WORK_SKELETON_PROJECTS.length) % WORK_SKELETON_PROJECTS.length;
  const nextIdx = (projectIndex + 1) % WORK_SKELETON_PROJECTS.length;
  const prevProject = WORK_SKELETON_PROJECTS[prevIdx];
  const nextProject = WORK_SKELETON_PROJECTS[nextIdx];

  // Lock body scroll smoothly without losing window scrollY behind overlay
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Move focus cleanly to CLOSE button on mount
  useEffect(() => {
    closeBtnRef.current?.focus({ preventScroll: true });
  }, []);

  // Reset overlay sub-states on project switch
  useEffect(() => {
    setActiveGalleryIdx(0);
    setActiveCategorySlug(null);
    setActiveRestaurantIdx(null);
    setActiveImageCollabIdx(null);
    setActiveRentalIdx(null);
    setActiveStyleSubIdx(null);
    setZoomedScreenshot(null);
    overlayRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  // Switch between Level 2 Overview and Level 3 Categories
  const handleSelectCategory = useCallback((slug: LocalDiscoveryCategorySlug | null) => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
    setActiveCategorySlug(slug);
    setActiveRestaurantIdx(null);
    setActiveImageCollabIdx(null);
    setActiveRentalIdx(null);
    setZoomedScreenshot(null);
    overlayRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Scroll overlay sheet to top when entering/switching restaurant case inside Restaurants category
  const handleSelectRestaurant = useCallback((idx: number | null) => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
    setActiveRestaurantIdx(idx);
    setZoomedScreenshot(null);
    overlayRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Scroll overlay sheet to top when entering/switching image collaboration inside Beauty, Wellness & Local Finds
  const handleSelectImageCollab = useCallback((idx: number | null) => {
    setActiveImageCollabIdx(idx);
    setZoomedScreenshot(null);
    overlayRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Scroll overlay sheet to top when entering/switching video guide inside Barcelona Rental Guide
  const handleSelectRental = useCallback((idx: number | null) => {
    setActiveRentalIdx(idx);
    setZoomedScreenshot(null);
    overlayRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Switch between 03 — Beauty & Personal Style overview and independent sub-projects
  const handleSelectStyleSubProject = useCallback((idx: number | null) => {
    setActiveStyleSubIdx(idx);
    setZoomedScreenshot(null);
    overlayRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenZoom = useCallback((lightbox: LightboxState) => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
    setZoomedScreenshot(lightbox);
  }, []);

  const handleOpenPlatformZoom = useCallback(
    (platform: PlatformPerformance) => {
      handleOpenZoom({
        src: platform.screenshotSrc,
        alt: platform.screenshotAlt,
        caption: platform.screenshotCaption,
        platformName: platform.name,
      });
    },
    [handleOpenZoom]
  );

  // Escape closes Lightbox -> Sub-case Detail -> Category / Style Overview -> Overlay
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (zoomedScreenshot) {
          setZoomedScreenshot(null);
        } else if (project.collection && activeRestaurantIdx !== null) {
          handleSelectRestaurant(null);
        } else if (project.collection && activeImageCollabIdx !== null) {
          handleSelectImageCollab(null);
        } else if (project.collection && activeRentalIdx !== null) {
          handleSelectRental(null);
        } else if (project.collection && activeCategorySlug !== null) {
          handleSelectCategory(null);
        } else if (project.styleCollection && activeStyleSubIdx !== null) {
          handleSelectStyleSubProject(null);
        } else {
          onClose();
        }
      } else if (!zoomedScreenshot && event.key === 'ArrowLeft') {
        const targetTag = (event.target as HTMLElement | null)?.tagName;
        if (targetTag === 'INPUT') return;
        event.preventDefault();
        onPrevProject();
      } else if (!zoomedScreenshot && event.key === 'ArrowRight') {
        const targetTag = (event.target as HTMLElement | null)?.tagName;
        if (targetTag === 'INPUT') return;
        event.preventDefault();
        onNextProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeCategorySlug,
    activeImageCollabIdx,
    activeRentalIdx,
    activeRestaurantIdx,
    activeStyleSubIdx,
    handleSelectCategory,
    handleSelectImageCollab,
    handleSelectRental,
    handleSelectRestaurant,
    handleSelectStyleSubProject,
    onClose,
    onNextProject,
    onPrevProject,
    project.collection,
    project.styleCollection,
    zoomedScreenshot,
  ]);

  const activeCategory =
    project.collection && activeCategorySlug !== null
      ? project.collection.categories.find((cat) => cat.slug === activeCategorySlug) ?? null
      : null;

  const activeRestaurant =
    activeCategory?.restaurants && activeRestaurantIdx !== null
      ? activeCategory.restaurants[activeRestaurantIdx] ?? null
      : null;

  const activeImageCollab =
    activeCategory?.imageCollabs && activeImageCollabIdx !== null
      ? activeCategory.imageCollabs[activeImageCollabIdx] ?? null
      : null;

  const activeRental =
    activeCategory?.rentalGuides && activeRentalIdx !== null
      ? activeCategory.rentalGuides[activeRentalIdx] ?? null
      : null;

  const activeStyleSubProject =
    project.styleCollection && activeStyleSubIdx !== null
      ? project.styleCollection.subProjects[activeStyleSubIdx] ?? null
      : null;

  const topbarCrumb = project.collection
    ? activeCategory
      ? activeRestaurant
        ? `${activeCategory.breadcrumb} · ${activeRestaurant.title.toUpperCase()}`
        : activeImageCollab
          ? `${activeCategory.breadcrumb} · ${activeImageCollab.title.toUpperCase()}`
          : activeRental
            ? `${activeCategory.breadcrumb} · ${activeRental.title.toUpperCase()}`
            : activeCategory.breadcrumb
      : project.collection.overviewCrumb
    : project.styleCollection
      ? activeStyleSubProject
        ? `${project.styleCollection.overviewCrumb} · ${activeStyleSubProject.fullTitle}`
        : project.styleCollection.overviewCrumb
      : project.detail
        ? `${project.id} / SELECTED WORK · ${project.detail.title}`
        : `SELECTED WORK / ${project.fullTitle}`;

  return (
    <>
      <div
        ref={overlayRef}
        className="cw-work-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cw-detail-heading"
      >
        <div className="cw-work-overlay__sheet">
          {/* Detail Top Utility Bar */}
          <header className="cw-detail-topbar">
            <div className="cw-detail-topbar__crumb cw-mono">{topbarCrumb}</div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="cw-detail-close"
              aria-label="Close project detail and return to Creative Archive"
            >
              <span>CLOSE</span>
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </header>

          {/* Main Project Body: Collection Archive (01), Rich Case Study (02), Style Series (03), or Skeleton (04) */}
          {project.collection ? (
            <LocalDiscoveryCollectionView
              collection={project.collection}
              activeCategorySlug={activeCategorySlug}
              activeRestaurantIdx={activeRestaurantIdx}
              activeImageCollabIdx={activeImageCollabIdx}
              activeRentalIdx={activeRentalIdx}
              onSelectCategory={handleSelectCategory}
              onSelectRestaurant={handleSelectRestaurant}
              onSelectImageCollab={handleSelectImageCollab}
              onSelectRental={handleSelectRental}
              onZoomImage={handleOpenZoom}
              videoRef={videoRef}
            />
          ) : project.styleCollection ? (
            <BeautyPersonalStyleCollectionView
              collection={project.styleCollection}
              activeSubIdx={activeStyleSubIdx}
              onSelectSubProject={handleSelectStyleSubProject}
            />
          ) : project.detail ? (
            <RichCaseStudyView
              project={project}
              detail={project.detail}
              onZoomScreenshot={handleOpenPlatformZoom}
              videoRef={videoRef}
            />
          ) : (
            <div className="cw-detail-body">
              {/* Left Column: Dual-Mode Neutral Media Slot Skeleton (Video + Image Gallery) */}
              <div className="cw-detail-media">
                <div className="cw-detail-media__tabs" role="tablist" aria-label="Media format slot">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mediaMode === 'video'}
                    onClick={() => setMediaMode('video')}
                    className={`cw-media-tab${mediaMode === 'video' ? ' cw-media-tab--active' : ''}`}
                  >
                    <Film className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Video</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={mediaMode === 'gallery'}
                    onClick={() => setMediaMode('gallery')}
                    className={`cw-media-tab${mediaMode === 'gallery' ? ' cw-media-tab--active' : ''}`}
                  >
                    <Images className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Image Gallery</span>
                  </button>
                </div>

                {mediaMode === 'video' ? (
                  <div className="cw-media-slot cw-media-slot--video">
                    <span className="cw-media-slot__kicker cw-mono">
                      MEDIA SLOT 01 · VIDEO CONTAINER
                    </span>
                    <div className="cw-media-slot__center">
                      <span className="cw-media-slot__title">Video Placeholder</span>
                      <p className="cw-media-slot__desc">
                        Neutral container reserved for real MP4 playback or embedded project film.
                      </p>
                    </div>
                    <span className="cw-media-slot__meta cw-mono">
                      {project.code} · AWAITING VIDEO ASSET
                    </span>
                  </div>
                ) : (
                  <div className="cw-media-slot cw-media-slot--gallery">
                    <span className="cw-media-slot__kicker cw-mono">
                      MEDIA SLOT 02 · IMAGE GALLERY
                    </span>

                    <div className="cw-media-slot__center">
                      <span className="cw-media-slot__title">
                        {GALLERY_PLACEHOLDER_SLOTS[activeGalleryIdx]?.label}
                      </span>
                      <p className="cw-media-slot__desc">
                        Neutral multi-frame gallery container ready for final photography and stills.
                      </p>
                    </div>

                    <div
                      className="cw-gallery-thumbs"
                      role="tablist"
                      aria-label="Placeholder gallery frames"
                    >
                      {GALLERY_PLACEHOLDER_SLOTS.map((slot, idx) => (
                        <button
                          key={slot.id}
                          type="button"
                          role="tab"
                          aria-selected={idx === activeGalleryIdx}
                          onClick={() => setActiveGalleryIdx(idx)}
                          className={`cw-gallery-thumb${
                            idx === activeGalleryIdx ? ' cw-gallery-thumb--active' : ''
                          }`}
                        >
                          FRAME {slot.id}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Project Title + 4 Structured Placeholder Blocks */}
              <div className="cw-detail-info">
                <div className="cw-detail-info__header">
                  <span className="cw-detail-info__index cw-mono">
                    {project.editionTag} · {project.label}
                  </span>
                  <h1 id="cw-detail-heading" className="cw-detail-info__title">
                    {project.fullTitle}
                  </h1>
                  {project.summarySubtitle && (
                    <p className="cw-case-subtitle cw-rental-hero-sub">
                      {project.summarySubtitle}
                    </p>
                  )}
                </div>

                <div className="cw-detail-sections">
                  {WORK_DETAIL_SECTIONS.map((section) => (
                    <article key={section.key} className="cw-detail-section">
                      <h2 className="cw-detail-section__heading">{section.heading}</h2>
                      <p className="cw-detail-section__placeholder">{section.placeholder}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer: Previous Project / Project Quick Index / Next Project */}
          <nav className="cw-detail-footer" aria-label="Project sequence navigation">
            <button
              type="button"
              onClick={onPrevProject}
              className="cw-detail-nav-btn"
              aria-label={`Previous project: ${prevProject.fullTitle}`}
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <div>
                <span className="cw-detail-nav-btn__kicker">Previous Project</span>
                <span className="cw-detail-nav-btn__label">{prevProject.fullTitle}</span>
              </div>
            </button>

            <div className="cw-detail-dots" role="tablist" aria-label="Jump to project">
              {WORK_SKELETON_PROJECTS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === projectIndex}
                  onClick={() => onSelectProject(idx)}
                  className={`cw-detail-dot${idx === projectIndex ? ' cw-detail-dot--active' : ''}`}
                >
                  {item.id}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onNextProject}
              className="cw-detail-nav-btn"
              aria-label={`Next project: ${nextProject.fullTitle}`}
            >
              <div>
                <span className="cw-detail-nav-btn__kicker">Next Project</span>
                <span className="cw-detail-nav-btn__label">{nextProject.fullTitle}</span>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>

      {/* Screenshot Lightbox Modal (click backdrop, CLOSE, or Escape to return to Detail) */}
      {zoomedScreenshot && (
        <div
          className="cw-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${zoomedScreenshot.platformName} enlarged screenshot`}
          onClick={() => setZoomedScreenshot(null)}
        >
          <div className="cw-lightbox__panel" onClick={(e) => e.stopPropagation()}>
            <div className="cw-lightbox__head">
              <span className="cw-mono cw-lightbox__caption">{zoomedScreenshot.caption}</span>
              <button
                type="button"
                onClick={() => setZoomedScreenshot(null)}
                className="cw-detail-close"
                aria-label="Close enlarged screenshot"
                autoFocus
              >
                <span>CLOSE</span>
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="cw-lightbox__img-wrap">
              <img
                src={zoomedScreenshot.src}
                alt={zoomedScreenshot.alt}
                className="cw-lightbox__img"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
