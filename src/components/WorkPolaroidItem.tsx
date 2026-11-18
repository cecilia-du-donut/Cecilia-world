import React from 'react';
import type { WorkSkeletonProject } from '../data/selectedWork';

interface WorkPolaroidItemProps {
  project: WorkSkeletonProject;
  slotDelta: number;
  isActiveSpotlight: boolean;
  isWrapping: boolean;
  onSelect: () => void;
}

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
            <circle cx="100" cy="108" r="50" fill={secondary} fillOpacity="0.22" />
            <path
              d="M144 36 L149 52 L165 57 L149 62 L144 78 L139 62 L123 57 L139 52 Z"
              fill={primary}
            />
            <rect x="28" y="128" width="144" height="36" fill={ink} fillOpacity="0.18" />
          </g>
        );
      case 'halo':
        return (
          <g>
            <circle cx="100" cy="94" r="58" fill={primary} fillOpacity="0.24" />
            <circle cx="100" cy="94" r="34" fill={primary} fillOpacity="0.52" />
            <circle cx="100" cy="94" r="14" fill="#FFFDF4" fillOpacity="0.9" />
            <path d="M52 84 Q100 42 148 84" stroke={secondary} strokeWidth="3" fill="none" opacity="0.8" />
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
    <svg viewBox="0 0 200 200" className="cw-arc-cover__svg" aria-hidden="true">
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
        opacity="0.88"
      >
        {project.code}
      </text>

      <text
        x="100"
        y="180"
        textAnchor="middle"
        fill={ink}
        fontFamily="Playfair Display, Georgia, serif"
        fontStyle="italic"
        fontSize="14.5"
        fontWeight="700"
        opacity="0.95"
      >
        {project.label}
      </text>
    </svg>
  );
};

export const WorkPolaroidItem: React.FC<WorkPolaroidItemProps> = ({
  project,
  slotDelta,
  isActiveSpotlight,
  isWrapping,
  onSelect,
}) => {
  // Arc angular steps spread wider and lower across the upper vinyl semicircle:
  // -2 (-90deg left), -1 (-45deg mid-left), 0 (0deg top apex), +1 (+45deg mid-right), +2 (+90deg right)
  const angleDeg = slotDelta * 45;
  const scale = isActiveSpotlight ? 1.06 : Math.abs(slotDelta) === 1 ? 0.94 : 0.88;
  const zIndex = isActiveSpotlight ? 18 : 14 - Math.abs(slotDelta) * 2;

  return (
    <div
      className={`cw-arc-slot${isActiveSpotlight ? ' cw-arc-slot--active' : ''}${
        isWrapping ? ' cw-arc-slot--wrapping' : ''
      }`}
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
          <SquareCoverArt project={project} />
        </span>

        {/* Clean Unboxed Label for Spotlight / Hover Clarity */}
        <span className="cw-arc-item__label">{project.label}</span>
      </button>
    </div>
  );
};
