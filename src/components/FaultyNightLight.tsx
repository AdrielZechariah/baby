import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { BearPaw } from './BearPaw';

interface FaultyNightLightProps {
  onReplayUnfold?: () => void;
  wideHorizontal?: boolean;
}

/**
 * Interactive video-like handwritten "Powered / by / baby" installation
 * faithfully modeled on the user's Samsung Notes sketch.
 * Stretched horizontally to fill the full page width with high-voltage
 * polychromatic faulty-light filaments.
 */
export const FaultyNightLight: React.FC<FaultyNightLightProps> = ({
  onReplayUnfold,
  wideHorizontal = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [surgeCount, setSurgeCount] = useState(0);
  const [isOverdriven, setIsOverdriven] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: 50, y: 50 });

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPointerPos({ x, y });
  };

  const triggerVoltageSurge = () => {
    setSurgeCount((c) => c + 1);
    setIsOverdriven(true);
    if (onReplayUnfold) {
      onReplayUnfold();
    }
    window.setTimeout(() => {
      setIsOverdriven(false);
    }, 950);
  };

  return (
    <div className="relative w-full">
      {/* Anti-Culture Multi-Color Stacked Offset Backing Plates */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 bg-[#0038FF] border-[3px] border-[#0A0A0A]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -translate-x-2 translate-y-2 sm:-translate-x-3 sm:translate-y-3 bg-[#FFD600] border-[3px] border-[#0A0A0A]"
      />

      {/* Main Interactive Night-Light Box — Stretched Horizontally Across Full Width */}
      <div
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onClick={triggerVoltageSurge}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerVoltageSurge();
          }
        }}
        aria-label="Interactive Powered by baby faulty night light — click to spark voltage and unfold words"
        className={`relative z-10 w-full ${
          wideHorizontal
            ? 'h-[480px] sm:h-[570px] lg:h-[645px]'
            : 'aspect-[4/5]'
        } bg-[#0D0C12] border-[3.5px] border-[#0A0A0A] overflow-hidden select-none cursor-pointer group`}
      >
        {/* Polychromatic Corner Calibration Marks */}
        <div className="pointer-events-none absolute top-0 left-0 w-3.5 h-3.5 bg-[#FF2A00] z-30" />
        <div className="pointer-events-none absolute top-0 right-0 w-3.5 h-3.5 bg-[#FFD600] z-30" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-3.5 h-3.5 bg-[#00C853] z-30" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#D500F9] z-30" />

        {/* Subtle Film Scanlines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30 z-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)',
          }}
        />

        {/* Interactive Multi-Spectrum Pointer Glow Spill */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-150 z-0"
          style={{
            background: `radial-gradient(460px circle at ${pointerPos.x}% ${pointerPos.y}%, rgba(255, 214, 0, ${
              isOverdriven ? 0.45 : 0.22
            }), rgba(255, 42, 0, 0.14) 45%, rgba(0, 56, 255, 0.08) 70%, transparent 90%)`,
          }}
        />

        {/* Breathing Faulty Halo */}
        <div
          className={`pointer-events-none absolute inset-8 rounded-full bg-gradient-to-tr from-[#FF2A00]/25 via-[#FFD600]/20 to-[#D500F9]/20 blur-2xl faulty-halo ${
            isOverdriven ? 'scale-110 opacity-100' : ''
          }`}
        />

        {/* Handwritten "powered / by / baby" SVG Sketch — Strictly lowercase + BearPaw after */}
        <div className="relative z-10 w-full h-full flex items-center justify-center px-6 sm:px-14 pb-10 pt-4">
          <svg
            key={surgeCount}
            viewBox="0 0 360 440"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Unlit Glass Tube Structure */}
            <g
              stroke="rgba(250, 246, 238, 0.16)"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            >
              {/* "powered" backing (strictly lowercase 'p') */}
              <path d="M 44 106 L 38 176 M 43 112 C 66 104, 70 132, 42 134" />
              <path d="M 78 116 C 68 118, 66 132, 78 132 C 90 132, 92 116, 78 116 Z" />
              <path d="M 102 114 L 110 132 L 122 118 L 134 132 L 148 110" />
              <path d="M 168 122 C 184 122, 188 110, 174 110 C 162 110, 160 130, 184 128" />
              <path d="M 206 112 L 204 130 C 206 118, 214 110, 224 110" />
              <path d="M 244 120 C 258 120, 260 108, 248 108 C 238 108, 238 128, 258 128" />
              <path d="M 302 114 C 282 112, 280 132, 298 132 C 306 130, 310 72, 312 36 L 304 132 L 320 116" />

              {/* "by" backing */}
              <path d="M 136 168 C 130 202, 128 232, 128 248 C 134 234, 158 232, 156 246 C 154 258, 132 258, 128 248" />
              <path d="M 174 234 L 190 252 M 208 230 C 194 258, 178 292, 154 298 C 142 300, 136 296, 134 292" />

              {/* "baby" backing */}
              <path d="M 68 312 C 64 348, 62 380, 62 398 C 70 380, 96 378, 94 394 C 92 406, 68 406, 62 398" />
              <path d="M 138 378 C 116 378, 112 402, 128 402 C 138 402, 142 386, 142 378 L 146 402" />
              <path d="M 174 306 C 168 344, 166 378, 166 396 C 174 378, 198 376, 196 392 C 194 404, 172 404, 166 396" />
              <path d="M 212 374 L 228 394 M 244 368 C 238 400, 228 430, 196 434 C 184 435, 178 430, 176 426" />
            </g>

            {/* WORD 1: "powered" — Strictly lowercase 'p' High-Voltage Gold/Amber Filament */}
            <g
              className={
                isOverdriven
                  ? 'drop-shadow-[0_0_24px_#FFD600]'
                  : 'faulty-glow-tube'
              }
              stroke={isOverdriven ? '#FFFFFF' : '#FFD600'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            >
              <motion.path
                d="M 44 106 L 38 176 M 43 112 C 66 104, 70 132, 42 134"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
              />
              <motion.path
                d="M 78 116 C 68 118, 66 132, 78 132 C 90 132, 92 116, 78 116 Z"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut', delay: 0.2 }}
              />
              <motion.path
                d="M 102 114 L 110 132 L 122 118 L 134 132 L 148 110"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.3 }}
              />
              <motion.path
                d="M 168 122 C 184 122, 188 110, 174 110 C 162 110, 160 130, 184 128"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut', delay: 0.45 }}
              />
              <motion.path
                d="M 206 112 L 204 130 C 206 118, 214 110, 224 110"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut', delay: 0.55 }}
              />
              <motion.path
                d="M 244 120 C 258 120, 260 108, 248 108 C 238 108, 238 128, 258 128"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut', delay: 0.65 }}
              />
              <motion.path
                d="M 302 114 C 282 112, 280 132, 298 132 C 306 130, 310 72, 312 36 L 304 132 L 320 116"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.75 }}
              />
            </g>

            {/* WORD 2: "by" — Acid Emerald / Cyan Faulty Filament */}
            <g
              className={
                isOverdriven
                  ? 'drop-shadow-[0_0_24px_#00E676]'
                  : 'faulty-glow-tube-delayed'
              }
              stroke={isOverdriven ? '#FFFFFF' : '#00E676'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            >
              <motion.path
                d="M 136 168 C 130 202, 128 232, 128 248 C 134 234, 158 232, 156 246 C 154 258, 132 258, 128 248"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 1.0 }}
              />
              <motion.path
                d="M 174 234 L 190 252 M 208 230 C 194 258, 178 292, 154 298 C 142 300, 136 296, 134 292"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 1.2 }}
              />
            </g>

            {/* WORD 3: "baby" + Bear Paw AFTER — Vermilion Red Faulty Filament */}
            <g
              className={
                isOverdriven
                  ? 'drop-shadow-[0_0_28px_#FF2A00]'
                  : 'faulty-glow-tube-fast'
              }
              stroke={isOverdriven ? '#FFFFFF' : '#FF4D00'}
              strokeWidth="4.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            >
              <motion.path
                d="M 68 312 C 64 348, 62 380, 62 398 C 70 380, 96 378, 94 394 C 92 406, 68 406, 62 398"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut', delay: 1.45 }}
              />
              <motion.path
                d="M 138 378 C 116 378, 112 402, 128 402 C 138 402, 142 386, 142 378 L 146 402"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 1.65 }}
              />
              <motion.path
                d="M 174 306 C 168 344, 166 378, 166 396 C 174 378, 198 376, 196 392 C 194 404, 172 404, 166 396"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut', delay: 1.85 }}
              />
              <motion.path
                d="M 212 374 L 228 394 M 244 368 C 238 400, 228 430, 196 434 C 184 435, 178 430, 176 426"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 2.05 }}
              />
              {/* Clawless Bear Paw Filament following "powered by baby" */}
              <motion.path
                d="M 278 392 C 272 392, 268 384, 272 378 C 276 372, 286 372, 290 378 C 294 384, 290 392, 284 392 Z M 266 368 C 264 364, 266 358, 270 358 C 274 358, 274 364, 270 368 Z M 277 362 C 275 358, 277 352, 281 352 C 285 352, 285 358, 281 362 Z M 289 364 C 287 360, 289 354, 293 354 C 297 354, 297 360, 293 364 Z M 298 374 C 296 370, 298 364, 302 364 C 306 364, 306 370, 302 374 Z"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 2.25 }}
              />
            </g>
          </svg>
        </div>

        {/* Bottom Bar Inside Frame */}
        <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-[#FAF6EE]/15 bg-[#0D0C12] px-5 py-3 flex items-center justify-end">
          <div className="inline-flex items-center gap-1.5 text-[#FFD600] font-hand text-xl font-bold lowercase">
            <span>powered by baby_</span>
            <BearPaw size={15} color="#FF2A00" rotation={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
