import React, { memo } from 'react';
import { EMBLEM_PATHS } from './logoPaths';

const PaulaEmblem = memo(function PaulaEmblem({
  className = 'w-10 h-10',
  goldColor = '#CBB68B',
  title = 'Emblema Oficial Dra. Paula Feliciano',
  ...props
}) {
  return (
    <svg
      viewBox="500 30 490 490"
      className={`aspect-square shrink-0 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      {...props}
    >
      <title>{title}</title>
      <g id="paula-emblem-paths">
        {EMBLEM_PATHS.map((p, idx) => (
          <path
            key={idx}
            d={p.d}
            fill={goldColor}
            opacity={p.opacity}
          />
        ))}
      </g>
    </svg>
  );
});

export default PaulaEmblem;
