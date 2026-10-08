import React from 'react';

interface BearPawProps {
  className?: string;
  size?: number;
  rotation?: number;
  color?: string;
  opacity?: number;
}

/**
 * Minimal, sophisticated clawless Bear Paw print.
 * Designed strictly with soft organic pad geometry:
 * - One larger kidney-shaped central metacarpal pad
 * - Four smaller rounded oval toe pads arranged in a gentle arc
 * - Strictly NO claws, NO sharp points, NO cartoon animal tropes
 */
export const BearPaw: React.FC<BearPawProps> = ({
  className = '',
  size = 24,
  rotation = 0,
  color = 'currentColor',
  opacity = 1,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 select-none ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        opacity,
      }}
      aria-hidden="true"
    >
      {/* Outer Left Toe Pad */}
      <ellipse
        cx="13.5"
        cy="25.5"
        rx="5.2"
        ry="7.2"
        transform="rotate(-22 13.5 25.5)"
        fill={color}
      />
      {/* Inner Left Toe Pad */}
      <ellipse
        cx="25.2"
        cy="16.5"
        rx="5.6"
        ry="7.8"
        transform="rotate(-8 25.2 16.5)"
        fill={color}
      />
      {/* Inner Right Toe Pad */}
      <ellipse
        cx="38.8"
        cy="16.5"
        rx="5.6"
        ry="7.8"
        transform="rotate(8 38.8 16.5)"
        fill={color}
      />
      {/* Outer Right Toe Pad */}
      <ellipse
        cx="50.5"
        cy="25.5"
        rx="5.2"
        ry="7.2"
        transform="rotate(22 50.5 25.5)"
        fill={color}
      />
      {/* Soft Organic Central Pad (Metacarpal Pad) - No Claws */}
      <path
        d="M32 29.5C22.5 29.5 15.5 35.8 15.5 43.8C15.5 49.4 19.8 53.2 25.2 52.4C28.1 52.0 29.9 50.8 32 50.8C34.1 50.8 35.9 52.0 38.8 52.4C44.2 53.2 48.5 49.4 48.5 43.8C48.5 35.8 41.5 29.5 32 29.5Z"
        fill={color}
      />
    </svg>
  );
};

interface PawTrailProps {
  steps?: number;
  direction?: 'right' | 'down-right' | 'up-right' | 'down';
  className?: string;
  pawSize?: number;
  accentLastStep?: boolean;
  darkSurface?: boolean;
}

/**
 * A subtle sequence of clawless bear paw steps that suggest movement,
 * progress, confidence, and craftsmanship.
 */
export const BearPawTrail: React.FC<PawTrailProps> = ({
  steps = 4,
  direction = 'right',
  className = '',
  pawSize = 20,
  accentLastStep = true,
  darkSurface = false,
}) => {
  const getStepTransform = (index: number) => {
    const isLeftFoot = index % 2 === 0;
    if (direction === 'right') {
      return {
        x: index * (pawSize * 1.65),
        y: isLeftFoot ? -6 : 6,
        rotate: isLeftFoot ? 78 : 96,
      };
    }
    if (direction === 'down-right') {
      return {
        x: index * (pawSize * 1.35),
        y: index * (pawSize * 0.95) + (isLeftFoot ? -5 : 5),
        rotate: isLeftFoot ? 122 : 138,
      };
    }
    if (direction === 'up-right') {
      return {
        x: index * (pawSize * 1.4),
        y: -index * (pawSize * 0.75) + (isLeftFoot ? -5 : 5),
        rotate: isLeftFoot ? 52 : 68,
      };
    }
    // down
    return {
      x: isLeftFoot ? -8 : 8,
      y: index * (pawSize * 1.55),
      rotate: isLeftFoot ? 172 : 188,
    };
  };

  const baseColor = darkSurface ? '#F6F5F0' : '#0A0A0A';
  const accentColor = '#FF3B00';

  return (
    <div
      className={`relative inline-flex items-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: steps }).map((_, idx) => {
        const pos = getStepTransform(idx);
        const isLast = idx === steps - 1;
        const stepOpacity = 0.22 + ((idx + 1) / steps) * 0.68;

        return (
          <div
            key={idx}
            className="transition-transform duration-200"
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`,
            }}
          >
            <BearPaw
              size={pawSize}
              rotation={pos.rotate}
              color={isLast && accentLastStep ? accentColor : baseColor}
              opacity={isLast && accentLastStep ? 0.95 : stepOpacity}
            />
          </div>
        );
      })}
    </div>
  );
};
