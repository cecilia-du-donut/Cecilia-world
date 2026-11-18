import React from 'react';

export const VinylRecordAnchor: React.FC = () => {
  // Dense concentric pressed vinyl groove radii
  const grooveRadii = [
    194, 190, 186, 182, 178, 174, 170, 166, 162, 158,
    154, 150, 145, 141, 137, 133, 129, 125, 121, 117,
    112, 108, 104, 100, 96, 92, 88, 84,
  ];
  const trackGaps = [164, 135, 110, 86];

  return (
    <div className="cw-vinyl-disc" aria-hidden="true">
      <div className="cw-vinyl-disc__spin">
        <svg viewBox="0 0 400 400" className="cw-vinyl-disc__svg">
          {/* Outer Pressed Vinyl Lip & Matte Obsidian Body */}
          <circle cx="200" cy="200" r="198" fill="#0F0D0E" />
          <circle cx="200" cy="200" r="196.5" fill="none" stroke="#302B2D" strokeWidth="1.4" />
          <circle cx="200" cy="200" r="192" fill="#141213" />

          {/* Concentric Micro-Grooves */}
          {grooveRadii.map((r) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke="#2C2729"
              strokeWidth="0.7"
              strokeOpacity="0.85"
            />
          ))}
          {trackGaps.map((r) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke="#070607"
              strokeWidth="2.1"
            />
          ))}

          {/* Inner Run-out Glossy Black Lead-out Margin */}
          <circle cx="200" cy="200" r="78" fill="#0B090A" />
          <circle cx="200" cy="200" r="74" fill="none" stroke="#221E20" strokeWidth="0.9" />

          {/* Signature Glossy Bubblegum Pink Center Vinyl Label (#F261A6) */}
          <circle cx="200" cy="200" r="64" fill="#F261A6" />
          <circle cx="200" cy="200" r="62" fill="none" stroke="#F9A8D0" strokeOpacity="0.6" strokeWidth="1.2" />

          {/* Subtle Raised Vinyl Pressing Ring on Pink Label */}
          <circle cx="200" cy="200" r="28" fill="none" stroke="#A6346C" strokeOpacity="0.4" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="27" fill="none" stroke="#FFD6EB" strokeOpacity="0.7" strokeWidth="1" />

          {/* Center Spindle Cut-Out */}
          <circle cx="200" cy="200" r="6.8" fill="#FAF59E" stroke="#3A1524" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Stationary Specular Studio Reflection Wedges Across Grooves & Pink Label */}
      <svg viewBox="0 0 400 400" className="cw-vinyl-disc__reflection">
        <defs>
          <clipPath id="giant-vinyl-clip">
            <circle cx="200" cy="200" r="196" />
          </clipPath>
        </defs>
        <g clipPath="url(#giant-vinyl-clip)">
          <polygon points="200,200 18,32 82,4" fill="#FFFFFF" fillOpacity="0.11" />
          <polygon points="200,200 382,368 318,396" fill="#FFFFFF" fillOpacity="0.09" />
          <polygon points="200,200 356,74 388,128" fill="#FFFFFF" fillOpacity="0.07" />
          <polygon points="200,200 44,326 12,272" fill="#FFFFFF" fillOpacity="0.06" />
        </g>
      </svg>
    </div>
  );
};
