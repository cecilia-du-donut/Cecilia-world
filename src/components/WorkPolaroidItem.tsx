import React from 'react';
import type { WorkSkeletonProject } from '../data/selectedWork';

interface WorkPolaroidItemProps {
  project: WorkSkeletonProject;
  slotIndex: number;
  isActiveSpotlight: boolean;
  onSelect: () => void;
}

const FOUR_RECORD_ANGLES = [-66, -22, 22, 66] as const;
const FOUR_RECORD_SCALES = [0.91, 0.97, 0.97, 0.91] as const;
const FOUR_RECORD_Z = [12, 15, 15, 12] as const;

const SquareCoverArt: React.FC<{ project: WorkSkeletonProject }> = ({ project }) => {
  const { bg, primary, secondary, ink, motif } = project.coverArt;

  const renderMotif = () => {
    switch (motif) {
      case 'portrait-abstract':
        return (
          <g>
            <circle cx="104" cy="96" r="56" fill={primary} fillOpacity="0.55" />
            <circle cx="136" cy="118" r="24" fill={secondary} fillOpacity="0.45" />
            <path d="M36 164 Q100 120 164 164" stroke={ink} strokeWidth="2" fill="none" opacity="0.55" />
          </g>
        );
      case 'wave':
        return (
          <g fill="none">
            <rect x="0" y="132" width="200" height="68" fill={secondary} fillOpacity="0.3" />
            <path
              d="M0 104 C50 74, 100 134, 150 96 C175 78, 190 92, 200 84"
              stroke={primary}
              strokeWidth="12"
            />
            <line x1="22" y1="36" x2="112" y2="36" stroke={ink} strokeWidth="2" strokeOpacity="0.7" />
          </g>
        );
      case 'star':
        return (
          <g>
            <circle cx="100" cy="96" r="54" fill={secondary} fillOpacity="0.24" />
            <circle cx="100" cy="96" r="32" fill={primary} fillOpacity="0.24" />
            <path
              d="M144 34 L149 50 L165 55 L149 60 L144 76 L139 60 L123 55 L139 50 Z"
              fill={primary}
            />
            <path
              d="M52 104 L55 113 L64 116 L55 119 L52 128 L49 119 L40 116 L49 113 Z"
              fill={secondary}
              opacity="0.88"
            />
          </g>
        );
      case 'halo':
        return (
          <g>
            <circle cx="100" cy="88" r="58" fill={primary} fillOpacity="0.24" />
            <circle cx="100" cy="88" r="34" fill={primary} fillOpacity="0.52" />
            <circle cx="100" cy="88" r="14" fill="#FFFDF4" fillOpacity="0.9" />
            <path d="M52 78 Q100 36 148 78" stroke={secondary} strokeWidth="3" fill="none" opacity="0.8" />
          </g>
        );
      case 'arch':
        return (
          <g>
            <path d="M26 184 A74 74 0 0 1 174 184 Z" fill={primary} fillOpacity="0.88" />
            <circle cx="144" cy="54" r="18" fill={secondary} fillOpacity="0.85" />
          </g>
        );
    }
  };

  return (
    <div className="cw-collage-cover" aria-hidden="true">
      <div className="cw-collage-cover__main-photo">
        <svg viewBox="0 0 200 200" className="cw-arc-cover__svg">
          <rect width="200" height="200" fill={bg} />
          {renderMotif()}

          <text
            x="16"
            y="24"
            fill={ink}
            fontFamily="Space Mono, monospace"
            fontSize="8.5"
            fontWeight="700"
            letterSpacing="1.6"
            opacity="0.9"
          >
            {project.code}
          </text>
        </svg>
      </div>

      <div className="cw-collage-cover__caption">
        <span className="cw-collage-cover__title">
          {project.coverTitle ?? project.label}
        </span>
      </div>
    </div>
  );
};

const EditorialCollageCover: React.FC<{ project: WorkSkeletonProject }> = ({ project }) => {
  const collage = project.coverCollage!;
  return (
    <div className="cw-collage-cover" aria-hidden="true">
      {/* Main full-bleed clean Season Tapas octopus plate photograph */}
      <div className="cw-collage-cover__main-photo">
        <img
          src={collage.primarySrc}
          alt=""
          className="cw-collage-cover__img cw-collage-cover__img--main"
          loading="eager"
          draggable={false}
        />
      </div>

      {/* Ultra-slim bottom title leaving the food photograph open */}
      <div className="cw-collage-cover__caption">
        <span className="cw-collage-cover__title">{collage.title}</span>
      </div>
    </div>
  );
};

export const WorkPolaroidItem: React.FC<WorkPolaroidItemProps> = ({
  project,
  slotIndex,
  isActiveSpotlight,
  onSelect,
}) => {
  // Balanced 4-record symmetric crescent across the upper vinyl semicircle (-66°, -22°, +22°, +66°)
  const safeSlot = Math.max(0, Math.min(3, slotIndex));
  const angleDeg = FOUR_RECORD_ANGLES[safeSlot];
  const scale = isActiveSpotlight ? 1.07 : FOUR_RECORD_SCALES[safeSlot];
  const zIndex = isActiveSpotlight ? 20 : FOUR_RECORD_Z[safeSlot];

  return (
    <div
      className={`cw-arc-slot${isActiveSpotlight ? ' cw-arc-slot--active' : ''}`}
      style={
        {
          zIndex,
          '--cw-arc-angle': `${angleDeg}deg`,
          '--cw-arc-scale': String(scale),
        } as React.CSSProperties
      }
    >
      <button
        type="button"
        onClick={onSelect}
        className="cw-arc-item"
        aria-label={`Open ${project.fullTitle}`}
      >
        {/* Bold Pink Index Number positioned cleanly to the left of each colored square */}
        <span className="cw-arc-item__num cw-mono" aria-hidden="true">
          {project.id}
        </span>

        {/* Square Cover with Reference Pastel Colored Border */}
        <span
          className="cw-arc-item__frame"
          style={{ borderColor: project.frameColor }}
        >
          {project.coverCollage ? (
            <EditorialCollageCover project={project} />
          ) : project.coverImage && project.coverCaption ? (
            <div className="cw-collage-cover">
              <div className="cw-collage-cover__main-photo">
                <img
                  src={project.coverImage}
                  alt={project.fullTitle}
                  className="cw-collage-cover__img"
                  style={{ objectPosition: project.coverCaption.imagePosition ?? 'center 25%' }}
                  loading="eager"
                  draggable={false}
                />
              </div>
              <div className="cw-collage-cover__caption" aria-hidden="true">
                <span className="cw-collage-cover__title">{project.coverCaption.title}</span>
              </div>
            </div>
          ) : project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.fullTitle}
              className="cw-arc-cover__img"
              loading="eager"
              draggable={false}
            />
          ) : (
            <SquareCoverArt project={project} />
          )}
        </span>

        {/* Clean Unboxed Subtitle / Label below the square frame */}
        <span className="cw-arc-item__label cw-arc-item__label--always">
          {project.label}
        </span>
      </button>
    </div>
  );
};
