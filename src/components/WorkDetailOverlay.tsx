import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Film, Images, X } from 'lucide-react';
import {
  WORK_DETAIL_SECTIONS,
  WORK_SKELETON_PROJECTS,
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

const GALLERY_PLACEHOLDER_SLOTS = [
  { id: '01', label: 'Frame 01 · Hero Visual Slot' },
  { id: '02', label: 'Frame 02 · Detail Study Slot' },
  { id: '03', label: 'Frame 03 · Editorial Layout Slot' },
];

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
  const [mediaMode, setMediaMode] = useState<MediaSlotMode>('video');
  const [activeGalleryIdx, setActiveGalleryIdx] = useState<number>(0);

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

  // Move focus cleanly to CLOSE button on mount & scroll overlay container to top on project switch
  useEffect(() => {
    closeBtnRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    setActiveGalleryIdx(0);
    overlayRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  // Escape closes overlay cleanly back to exact Archive state; ArrowLeft/Right switch projects
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrevProject();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNextProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNextProject, onPrevProject]);

  return (
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
          <div className="cw-detail-topbar__crumb cw-mono">
            SELECTED WORK / {project.fullTitle}
          </div>

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

        {/* Main Detail Skeleton Body */}
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

                <div className="cw-gallery-thumbs" role="tablist" aria-label="Placeholder gallery frames">
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
                {project.editionTag} · {project.code}
              </span>
              <h1 id="cw-detail-heading" className="cw-detail-info__title">
                {project.fullTitle}
              </h1>
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

          <div className="cw-detail-dots" role="tablist" aria-label="Jump to project skeleton">
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
  );
};
