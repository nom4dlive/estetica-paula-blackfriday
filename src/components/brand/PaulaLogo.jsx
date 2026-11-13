import React, { memo } from 'react';
import PaulaEmblem from './PaulaEmblem';
import { EMBLEM_PATHS, TEXT_PATHS } from './logoPaths';

/**
 * PaulaLogo - Compound component representing official brand vectors.
 * Pattern: <PaulaLogo.Vertical />, <PaulaLogo.Horizontal />, <PaulaLogo.Emblem />
 */
const PaulaLogoVertical = memo(function PaulaLogoVertical({
  className = 'w-64 max-w-full h-auto',
  textColor = '#F8FAFC',
  goldColor = '#CBB68B',
  title = 'Dra. Paula Feliciano Estética Avançada',
  ...props
}) {
  return (
    <svg
      viewBox="0 0 1530 1016"
      className={`aspect-[1530/1016] ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      {...props}
    >
      <title>{title}</title>
      {/* Emblem Section */}
      <g id="vertical-emblem">
        {EMBLEM_PATHS.map((p, idx) => (
          <path
            key={`emb-${idx}`}
            d={p.d}
            fill={goldColor}
            opacity={p.opacity}
          />
        ))}
      </g>
      {/* Typography Section */}
      <g id="vertical-typography">
        {TEXT_PATHS.map((p, idx) => (
          <path
            key={`txt-${idx}`}
            d={p.d}
            fill={textColor}
            opacity={p.opacity}
          />
        ))}
      </g>
    </svg>
  );
});

const PaulaLogoHorizontal = memo(function PaulaLogoHorizontal({
  className = 'h-11',
  textColor = 'text-white',
  goldColor = '#CBB68B',
  subtitleColor = 'text-champagne-400',
  showCredentials = true,
  onClick,
  ...props
}) {
  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      role="banner"
      {...props}
    >
      {/* Vector Floral Emblem */}
      <div className="relative shrink-0 flex items-center justify-center p-0.5">
        <div className="absolute inset-0 bg-[#CBB68B]/15 blur-md rounded-full pointer-events-none" />
        <PaulaEmblem className="w-9 h-9 sm:w-11 sm:h-11 relative z-10 transition-transform duration-300 hover:scale-105" goldColor={goldColor} />
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center leading-tight">
        <span className={`font-serif font-bold tracking-wider text-sm sm:text-base ${textColor}`}>
          DRA. PAULA FELICIANO
        </span>
        {showCredentials && (
          <span className={`text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase font-semibold text-[#CBB68B]`}>
            Estética Avançada • Biomédica
          </span>
        )}
      </div>
    </div>
  );
});

// Root object as compound component
const PaulaLogo = {
  Vertical: PaulaLogoVertical,
  Horizontal: PaulaLogoHorizontal,
  Emblem: PaulaEmblem,
};

export default PaulaLogo;
export { PaulaLogoVertical, PaulaLogoHorizontal, PaulaEmblem };
