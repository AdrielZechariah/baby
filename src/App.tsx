import React, { useState, useEffect } from 'react';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BearPaw, BearPawTrail } from './components/BearPaw';
import { FaultyNightLight } from './components/FaultyNightLight';
import {
  STUDIO_VALUES,
  PROCESS_STAGES,
  THREE_PILLARS,
  SERVICES_LIST,
} from './data/studioData';

type PageRoute = 'home' | 'about' | 'code' | 'process' | 'contact';

/**
 * Intro Sequence Stages:
 * 0 ('blackout'): 0s -> 3.0s — Whole page is blank absolute black (#000000)
 * 1 ('appear'):   3.0s -> 4.3s — Interactive image appears higher up in the darkness
 * 2 ('drop'):     4.3s -> 5.35s — Interactive image falls to its real position with a landing impact while everything else loads simultaneously, finishing together
 */
type IntroStage = 'blackout' | 'appear' | 'drop';

const lineOneWords = ['Build', 'your', 'website'];
const lineTwoWords = ['And', 'let', 'it', 'be'];
const lineThreeWords = ['powered', 'by', 'baby'];

// Coherent 5-Color Anti-Culture Palette mapped to the 5 Values & Pillars
const VALUE_COLORS = [
  { bg: 'bg-[#FF2A00]', text: 'text-[#FAF6EE]', hex: '#FF2A00', shadow: 'shadow-brutal-vermilion' }, // Authenticity — Vermilion
  { bg: 'bg-[#0038FF]', text: 'text-[#FAF6EE]', hex: '#0038FF', shadow: 'shadow-brutal-cobalt' },    // Arete — Cobalt
  { bg: 'bg-[#00C853]', text: 'text-[#0A0A0A]', hex: '#00C853', shadow: 'shadow-brutal-emerald' },   // abundance — Acid Emerald
  { bg: 'bg-[#FFD600]', text: 'text-[#0A0A0A]', hex: '#FFD600', shadow: 'shadow-brutal-gold' },      // Creativity — Signal Gold
  { bg: 'bg-[#D500F9]', text: 'text-[#FAF6EE]', hex: '#D500F9', shadow: 'shadow-brutal-black' },     // integrity — Electric Violet
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [introStage, setIntroStage] = useState<IntroStage>('blackout');
  const [unfoldKey, setUnfoldKey] = useState<number>(0);
  const [activeValueIndex, setActiveValueIndex] = useState<number>(0);
  const [activeProcessIndex, setActiveProcessIndex] = useState<number>(0);

  // Contact Page Form State
  const [selectedPillar, setSelectedPillar] = useState<string>('-We build');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Website Design',
    'Website Development',
  ]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    dream: '',
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    dream?: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);

  // Orchestrate the 3-second absolute black intro -> appear higher up -> drop with impact while everything else loads simultaneously
  useEffect(() => {
    const tAppear = window.setTimeout(() => {
      setIntroStage('appear');
    }, 3000); // 3 seconds of blank absolute black

    const tDropAndLoad = window.setTimeout(() => {
      setIntroStage('drop');
      setUnfoldKey((k) => k + 1);
    }, 4300); // Image begins falling from higher up while everything else loads in sync

    return () => {
      window.clearTimeout(tAppear);
      window.clearTimeout(tDropAndLoad);
    };
  }, []);

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const replayUnfold = () => {
    setUnfoldKey((k) => k + 1);
  };

  const toggleService = (title: string) => {
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; email?: string; dream?: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Please share your name.';
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.dream.trim() || formData.dream.length < 5) {
      errors.dream = 'Tell us a few words about what you want to construct.';
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
    }
  };

  const isRevealed = introStage === 'drop';

  return (
    <div
      className={`min-h-screen flex flex-col justify-between relative overflow-x-hidden selection:bg-[#FF2A00] selection:text-[#FAF6EE] transition-colors duration-700 ${
        isRevealed
          ? 'bg-anticulture-canvas text-[#0A0A0A]'
          : 'bg-[#000000] text-[#FAF6EE]'
      }`}
    >
      {/* Full-Screen Absolute Black Curtain during 'blackout' and 'appear' */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            key="absolute-black-curtain"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#000000] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Polychromatic Top Spectrum Rule (Shows up on reveal) */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 1.05 }}
        className="relative z-40 w-full h-2 grid grid-cols-5 border-b-2 border-[#0A0A0A]"
      >
        <div className="bg-[#FF2A00]" />
        <div className="bg-[#0038FF]" />
        <div className="bg-[#FFD600]" />
        <div className="bg-[#00C853]" />
        <div className="bg-[#D500F9]" />
      </motion.div>

      {/* =====================================================================
          1. HEADER (Fits cleanly on a single bar across all mobile & desktop displays)
          baby    About    code   process   contact
      ===================================================================== */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{
          opacity: isRevealed ? 1 : 0,
          y: isRevealed ? 0 : -24,
        }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-40 w-full border-b-[3px] border-[#0A0A0A] bg-[#FAF6EE]/95 backdrop-blur-md ${
          !isRevealed ? 'pointer-events-none' : ''
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-2.5 sm:px-8 lg:px-16 h-14 sm:h-20 flex items-center justify-between gap-1.5 sm:gap-6">
          {/* Zone 1: Brand Title ("baby") */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('home');
              replayUnfold();
            }}
            className="font-display text-2xl xs:text-3xl sm:text-5xl font-black tracking-tight text-[#0A0A0A] hover:text-[#FF2A00] transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            baby
          </a>

          {/* Zone 2: Dedicated Page Navigation Links (About, code, process, contact) — Fitted for all mobile screens */}
          <nav
            aria-label="Primary Navigation"
            className="flex items-center justify-end gap-1 sm:gap-5 md:gap-10 text-[11px] sm:text-sm font-mono-tech font-bold tracking-tight sm:tracking-wider min-w-0"
          >
            <button
              type="button"
              onClick={() => navigateTo('about')}
              className={`px-1.5 sm:px-3 py-1 sm:py-1.5 border-2 transition-all duration-150 cursor-pointer whitespace-nowrap ${
                currentPage === 'about'
                  ? 'bg-[#FF2A00] text-[#FAF6EE] border-[#0A0A0A] shadow-brutal-black -translate-y-0.5'
                  : 'border-transparent text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-[#FFD600]'
              }`}
            >
              About
            </button>

            <button
              type="button"
              onClick={() => navigateTo('code')}
              className={`px-1.5 sm:px-3 py-1 sm:py-1.5 border-2 transition-all duration-150 cursor-pointer whitespace-nowrap ${
                currentPage === 'code'
                  ? 'bg-[#0038FF] text-[#FAF6EE] border-[#0A0A0A] shadow-brutal-black -translate-y-0.5'
                  : 'border-transparent text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-[#00C853]'
              }`}
            >
              code
            </button>

            <button
              type="button"
              onClick={() => navigateTo('process')}
              className={`px-1.5 sm:px-3 py-1 sm:py-1.5 border-2 transition-all duration-150 cursor-pointer whitespace-nowrap ${
                currentPage === 'process'
                  ? 'bg-[#FFD600] text-[#0A0A0A] border-[#0A0A0A] shadow-brutal-black -translate-y-0.5'
                  : 'border-transparent text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-[#D500F9] hover:text-[#FAF6EE]'
              }`}
            >
              process
            </button>

            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className={`px-1.5 sm:px-3 py-1 sm:py-1.5 border-2 transition-all duration-150 cursor-pointer whitespace-nowrap ${
                currentPage === 'contact'
                  ? 'bg-[#00C853] text-[#0A0A0A] border-[#0A0A0A] shadow-brutal-black -translate-y-0.5'
                  : 'border-transparent text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-[#FF2A00] hover:text-[#FAF6EE]'
              }`}
            >
              contact
            </button>
          </nav>

          {/* Zone 3: Desktop Primary Action */}
          <div className="hidden lg:flex items-center shrink-0">
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#0A0A0A] text-[#FAF6EE] border-2 border-[#0A0A0A] text-xs font-mono-tech font-bold uppercase tracking-widest hover:bg-[#FF2A00] shadow-brutal-cobalt transition-all duration-150 cursor-pointer whitespace-nowrap"
            >
              <span>Let&apos;s build</span>
              <BearPaw
                size={14}
                color="#FFD600"
                rotation={22}
                className="group-hover:rotate-12 transition-transform duration-150"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* =====================================================================
          2. MAIN VIEWPORT
      ===================================================================== */}
      <main
        id="top"
        className="flex-1 flex items-center justify-center relative py-12 sm:py-16 lg:py-20 px-6 sm:px-12 lg:px-16"
      >
        {/* Architectural Exposed Grid Coordinates */}
        {isRevealed && (
          <div
            aria-hidden="true"
            className="hidden xl:flex fixed left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-left items-center gap-3 text-[11px] font-mono-tech font-bold uppercase tracking-[0.25em] text-[#0A0A0A]/45 select-none pointer-events-none z-20"
          >
            <span className="text-[#FF2A00]">●</span>
            <span>EST 07.10.2026 // PAGE: {currentPage.toUpperCase()}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* -----------------------------------------------------------------
              DEDICATED PAGE 1: HOME (Hero)
              Choreography:
              1. 0–3s: Blank absolute black
              2. 3.0s: Interactive FaultyNightLight appears elevated in darkness
              3. 4.3s: Interactive FaultyNightLight drops down into full-width bottom position
              4. 5.15s: Everything else reveals & words unfold above it
          ----------------------------------------------------------------- */}
          {currentPage === 'home' && (
            <motion.section
              key="page-home"
              initial={{ opacity: 1 }}
              animate={
                introStage === 'drop'
                  ? {
                      y: [0, 0, 12, -5, 2, 0],
                    }
                  : { y: 0 }
              }
              exit={{ opacity: 0, y: -18 }}
              transition={{
                y: {
                  duration: 1.05,
                  times: [0, 0.72, 0.82, 0.9, 0.96, 1],
                  ease: 'easeOut',
                },
              }}
              className="max-w-[1440px] w-full mx-auto flex flex-col gap-16 sm:gap-20"
            >
              {/* Top Hero Content (Loads while the interactive image is dropping, finishing together on impact) */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{
                  opacity: isRevealed ? 1 : 0,
                  y: isRevealed ? 0 : 28,
                }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full space-y-10 sm:space-y-12 ${
                  !isRevealed ? 'pointer-events-none' : ''
                }`}
              >
                {/* Unfolding Monumental Headline — Timed to finish unfolding at ~1.05s right as the drop lands */}
                {isRevealed && (
                  <div key={unfoldKey} className="space-y-2 sm:space-y-3">
                    <h1>
                      {/* Line 1: Build your website */}
                      <span className="flex flex-wrap items-baseline gap-x-4 sm:gap-x-6 overflow-hidden py-1 font-display uppercase text-6xl sm:text-8xl md:text-[7rem] xl:text-[8.2rem] font-black tracking-tight leading-[0.88] text-[#0A0A0A]">
                        {lineOneWords.map((word, idx) => (
                          <motion.span
                            key={word}
                            initial={{ opacity: 0, y: 65, skewY: 6 }}
                            animate={{ opacity: 1, y: 0, skewY: 0 }}
                            transition={{
                              duration: 0.45,
                              delay: 0.04 + idx * 0.09,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`inline-block ${
                              idx === 0
                                ? 'bg-[#FFD600] px-3 border-[3px] border-[#0A0A0A] shadow-brutal-black -rotate-1'
                                : ''
                            }`}
                          >
                            {word}
                          </motion.span>
                        ))}
                      </span>

                      {/* Line 2: And let it be */}
                      <span className="flex flex-wrap items-baseline gap-x-4 sm:gap-x-5 overflow-hidden py-2 font-serif-editorial italic text-5xl sm:text-7xl md:text-8xl font-normal tracking-normal leading-[0.95] text-[#0038FF]">
                        {lineTwoWords.map((word, idx) => (
                          <motion.span
                            key={word}
                            initial={{ opacity: 0, x: -30, rotate: -4 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{
                              duration: 0.45,
                              delay: 0.28 + idx * 0.08,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="inline-block"
                          >
                            {word}
                          </motion.span>
                        ))}
                      </span>

                      {/* Line 3: powered by baby_ (strictly lowercase + handwritten font + bear paw AFTER) */}
                      <span className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 pt-2 font-hand lowercase text-6xl sm:text-8xl md:text-[7.2rem] xl:text-[8.4rem] font-bold tracking-normal leading-[0.95]">
                        {lineThreeWords.map((word, idx) => {
                          const wordStyle =
                            idx === 0
                              ? 'text-[#FF2A00]'
                              : idx === 1
                              ? 'text-[#0A0A0A]'
                              : 'bg-[#0A0A0A] text-[#FAF6EE] px-5 py-1 border-[3px] border-[#0A0A0A] shadow-brutal-vermilion faulty-glow-tube inline-flex items-center';

                          return (
                            <motion.span
                              key={word}
                              initial={{ opacity: 0, y: 55, scale: 0.92 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{
                                duration: 0.48,
                                delay: 0.52 + idx * 0.1,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className={`inline-block font-hand lowercase ${wordStyle}`}
                            >
                              <span>{word}</span>
                              {idx === lineThreeWords.length - 1 && (
                                <>
                                  <span
                                    aria-hidden="true"
                                    className="inline-block text-[#00C853] blink-underscore ml-0.5"
                                  >
                                    _
                                  </span>
                                  <BearPaw
                                    size={38}
                                    color="#FFD600"
                                    rotation={20}
                                    className="ml-3 shrink-0"
                                  />
                                </>
                              )}
                            </motion.span>
                          );
                        })}
                      </span>
                    </h1>
                  </div>
                )}

                {/* Manifesto Statement */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-2">
                  <div className="lg:col-span-7 space-y-6">
                    <p className="text-lg sm:text-2xl font-mono-tech font-bold text-[#0A0A0A] max-w-2xl leading-snug border-l-[6px] border-[#0038FF] pl-5">
                      A place where we construct your dreams into the real
                      world.
                    </p>
                  </div>

                  {/* Primary CTA */}
                  <div className="lg:col-span-5 flex flex-wrap lg:justify-end items-center gap-5">
                    <button
                      type="button"
                      onClick={() => navigateTo('contact')}
                      className="group inline-flex items-center gap-4 px-8 py-4 bg-[#0A0A0A] text-[#FAF6EE] border-[3px] border-[#0A0A0A] font-display text-2xl sm:text-3xl font-black uppercase tracking-wide shadow-brutal-gold hover:bg-[#FF2A00] hover:text-[#FAF6EE] transition-all duration-150 cursor-pointer whitespace-nowrap"
                    >
                      <span>CONSTRUCT YOUR DREAM →</span>
                      <BearPaw
                        size={20}
                        color="#FFD600"
                        rotation={25}
                        className="group-hover:translate-x-1 group-hover:rotate-12 transition-transform duration-150"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Full-Width Horizontally Stretched Interactive Faulty Night-Light Image (1.5x taller)
                  - Hidden during 3s blackout ('blackout')
                  - Appears higher up (-420px) in the black screen at 3s ('appear')
                  - Drops down to its real position at 4.3s ('drop') while everything else loads, landing with a heavy physical impact right as loading finishes */}
              <motion.div
                initial={{ opacity: 0, y: -420, scaleX: 1, scaleY: 1 }}
                animate={
                  introStage === 'blackout'
                    ? { opacity: 0, y: -420, scaleX: 1, scaleY: 1 }
                    : introStage === 'appear'
                    ? { opacity: 1, y: -420, scaleX: 1, scaleY: 1 }
                    : {
                        opacity: 1,
                        y: [-420, 26, -14, 5, 0],
                        scaleX: [1, 1.025, 0.99, 1.005, 1],
                        scaleY: [1, 0.94, 1.02, 0.995, 1],
                      }
                }
                transition={
                  introStage === 'drop'
                    ? {
                        duration: 1.05,
                        times: [0, 0.72, 0.85, 0.94, 1],
                        ease: [0.22, 1, 0.36, 1],
                      }
                    : {
                        opacity: { duration: 0.65, ease: 'easeOut' },
                        y: { duration: 0.65, ease: 'easeOut' },
                      }
                }
                className="relative z-40 w-full origin-bottom"
              >
                {introStage !== 'blackout' && (
                  <FaultyNightLight
                    onReplayUnfold={replayUnfold}
                    wideHorizontal={true}
                  />
                )}
              </motion.div>

              {/* Multi-Color Triad Strip placed at the bottom right after the interactive image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isRevealed ? 1 : 0,
                  y: isRevealed ? 0 : 20,
                }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono-tech font-bold pt-2 ${
                  !isRevealed ? 'pointer-events-none' : ''
                }`}
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD600] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-brutal-black -rotate-1">
                  <span className="text-[#FF2A00]">●</span>Dream it
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00C853] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-brutal-black rotate-1">
                  <span className="text-[#0A0A0A]">●</span>Express it
                </span>
                <span className="font-hand text-xl text-[#0038FF] px-1">
                  AND
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF2A00] text-[#FAF6EE] border-2 border-[#0A0A0A] shadow-brutal-black -rotate-1">
                  <span className="text-[#FFD600]">●</span>
                  <span>Let it be</span>
                  <span className="font-hand text-xl sm:text-2xl lowercase font-bold underline decoration-[#FFD600] underline-offset-4">
                    powered by baby
                  </span>
                  <BearPaw size={15} color="#FFD600" rotation={18} />
                </span>
              </motion.div>
            </motion.section>
          )}

          {/* -----------------------------------------------------------------
              DEDICATED PAGE 2: ABOUT
          ----------------------------------------------------------------- */}
          {currentPage === 'about' && (
            <motion.section
              key="page-about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="max-w-[1440px] w-full mx-auto py-8 sm:py-14 space-y-20 sm:space-y-24"
            >
              {/* Top Page Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b-[3px] border-[#0A0A0A]">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 bg-[#FF2A00] text-[#FAF6EE] border-2 border-[#0A0A0A] font-mono-tech text-xs font-bold tracking-widest shadow-brutal-black">
                    About
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF6EE] border-2 border-[#0A0A0A] font-mono-tech text-xs font-bold uppercase hover:bg-[#FFD600] shadow-brutal-black transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Hero</span>
                </button>
              </div>

              {/* Monumental About Headline */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD600] border-2 border-[#0A0A0A] font-hand text-xl font-bold mb-6 shadow-brutal-black -rotate-1">
                    <span className="lowercase">powered by baby</span>
                    <BearPaw size={15} color="#FF2A00" rotation={18} />
                  </div>
                  <h1 className="font-display text-6xl sm:text-8xl xl:text-[6.8rem] font-black uppercase tracking-tight leading-[0.88] text-[#0A0A0A]">
                    A PLACE WHERE WE CONSTRUCT YOUR{' '}
                    <span className="bg-[#FF2A00] text-[#FAF6EE] px-4 border-[3px] border-[#0A0A0A] inline-block -rotate-2 shadow-brutal-black my-1">
                      DREAMS
                    </span>{' '}
                    INTO THE{' '}
                    <span className="bg-[#0038FF] text-[#FAF6EE] px-4 border-[3px] border-[#0A0A0A] inline-block mt-2 shadow-brutal-gold">
                      REAL WORLD.
                    </span>
                  </h1>
                </div>

                <div className="lg:col-span-4 bg-white border-[3px] border-[#0A0A0A] p-7 shadow-brutal-vermilion space-y-4">
                  <div className="font-mono-tech text-xs font-bold uppercase tracking-widest text-[#FF2A00]">
                    trifecta
                  </div>
                  <div className="font-display text-3xl font-black space-y-1">
                    <div>●Dream it</div>
                    <div>●Express it</div>
                    <div className="font-serif-editorial italic text-2xl text-[#0038FF]">
                      AND
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span>●Let it be</span>
                      <span className="inline-flex items-center gap-1.5 font-hand text-2xl font-bold lowercase bg-[#0A0A0A] text-[#FAF6EE] px-2.5 py-0.5">
                        <span>powered by baby</span>
                        <BearPaw size={16} color="#FF2A00" rotation={18} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Three Pillars Grid (-We build / -We maintain / -We scale) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {THREE_PILLARS.map((pillar, idx) => {
                  const styleSet =
                    idx === 0
                      ? 'bg-[#FF2A00] text-[#FAF6EE] shadow-brutal-black'
                      : idx === 1
                      ? 'bg-[#0038FF] text-[#FAF6EE] shadow-brutal-gold'
                      : 'bg-[#00C853] text-[#0A0A0A] shadow-brutal-vermilion';
                  return (
                    <div
                      key={pillar.label}
                      className={`p-8 border-[3px] border-[#0A0A0A] flex flex-col justify-between min-h-[320px] ${styleSet}`}
                    >
                      <div>
                        <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-current/25">
                          <span className="font-mono-tech text-xs font-bold uppercase tracking-widest">
                            {['A', 'B', 'C'][idx]}
                          </span>
                          <BearPaw
                            size={18}
                            color="currentColor"
                            rotation={idx * 20 - 10}
                          />
                        </div>
                        <h2 className="font-display text-5xl font-black uppercase tracking-tight mb-4">
                          {pillar.label}
                        </h2>
                        <p className="font-mono-tech text-sm leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t-2 border-current/25 flex items-center justify-between gap-2">
                        {idx === 2 ? (
                          <span className="inline-flex items-center gap-1.5 font-hand text-2xl font-bold">
                            <span>Let it be</span>
                            <span className="lowercase">powered by baby</span>
                            <BearPaw size={16} color="currentColor" rotation={18} />
                          </span>
                        ) : (
                          <span className="font-hand text-2xl font-bold">
                            {pillar.annotation}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPillar(pillar.label);
                            navigateTo('contact');
                          }}
                          className="px-3 py-1 bg-[#0A0A0A] text-[#FAF6EE] font-mono-tech text-xs font-bold uppercase hover:bg-[#FFD600] hover:text-[#0A0A0A] transition-colors cursor-pointer"
                        >
                          Select →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Capabilities / Services Overview */}
              <div className="bg-white border-[3px] border-[#0A0A0A] p-8 sm:p-10 shadow-brutal-cobalt">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b-[3px] border-[#0A0A0A]">
                  <h2 className="font-display text-4xl sm:text-5xl font-black uppercase">
                    WHAT WE CONSTRUCT
                  </h2>
                  <div className="inline-flex items-center gap-2 font-hand text-xl font-bold lowercase bg-[#FFD600] px-3 py-1 border-2 border-[#0A0A0A]">
                    <span>powered by baby</span>
                    <BearPaw size={15} color="#0A0A0A" rotation={18} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SERVICES_LIST.map((srv, idx) => {
                    const colorBadge = VALUE_COLORS[idx % VALUE_COLORS.length];
                    return (
                      <div
                        key={srv.number}
                        className="p-6 bg-[#FAF6EE] border-2 border-[#0A0A0A] flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span
                              className={`px-2.5 py-0.5 border-2 border-[#0A0A0A] font-display text-2xl font-black ${colorBadge.bg} ${colorBadge.text}`}
                            >
                              {srv.number}
                            </span>
                            <span className="font-mono-tech text-xs font-bold uppercase text-[#0038FF]">
                              -{srv.pillar}
                            </span>
                          </div>
                          <h3 className="font-display text-3xl font-black uppercase mb-2">
                            {srv.title}
                          </h3>
                          <p className="font-mono-tech text-xs text-[#333230] leading-relaxed">
                            {srv.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.section>
          )}

          {/* -----------------------------------------------------------------
              DEDICATED PAGE 3: CODE (Our Values)
          ----------------------------------------------------------------- */}
          {currentPage === 'code' && (
            <motion.section
              key="page-code"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="max-w-[1440px] w-full mx-auto py-8 sm:py-14 space-y-20 sm:space-y-24"
            >
              {/* Top Page Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b-[3px] border-[#0A0A0A]">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 bg-[#0038FF] text-[#FAF6EE] border-2 border-[#0A0A0A] font-mono-tech text-xs font-bold tracking-widest shadow-brutal-black">
                    code
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF6EE] border-2 border-[#0A0A0A] font-mono-tech text-xs font-bold uppercase hover:bg-[#FFD600] shadow-brutal-black transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Hero</span>
                </button>
              </div>

              {/* Code Header */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div>
                  <span className="font-hand text-3xl text-[#FF2A00] block">
                    Our values
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0A0A0A] text-[#FAF6EE] border-2 border-[#0A0A0A] font-hand text-xl font-bold lowercase self-start lg:self-end shadow-brutal-emerald">
                  <span>powered by baby</span>
                  <BearPaw size={16} color="#00C853" rotation={18} />
                </div>
              </div>

              {/* Interactive Split Values Architecture */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left 6 Columns: 5 Polychromatic Value Selector Plates */}
                <div className="lg:col-span-6 space-y-4">
                  {STUDIO_VALUES.map((val, idx) => {
                    const colorObj = VALUE_COLORS[idx];
                    const isSelected = activeValueIndex === idx;
                    const exactName =
                      val.name === 'Abundance'
                        ? 'abundance'
                        : val.name === 'Integrity'
                        ? 'integrity'
                        : val.name;

                    return (
                      <button
                        key={val.name}
                        type="button"
                        onClick={() => setActiveValueIndex(idx)}
                        onMouseEnter={() => setActiveValueIndex(idx)}
                        className={`w-full p-5 border-[3px] border-[#0A0A0A] text-left flex items-center justify-between transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? `${colorObj.bg} ${colorObj.text} shadow-brutal-black -translate-y-1`
                            : 'bg-white text-[#0A0A0A] hover:bg-[#FAF6EE]'
                        }`}
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono-tech text-xs font-bold opacity-75">
                            {val.number}
                          </span>
                          <span className="font-display text-4xl sm:text-5xl font-black tracking-tight">
                            *{exactName}
                          </span>
                        </div>
                        <BearPaw
                          size={20}
                          color="currentColor"
                          rotation={18}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Right 6 Columns: Active Value Monumental Dossier */}
                <div className="lg:col-span-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={STUDIO_VALUES[activeValueIndex].name}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2 }}
                      className={`p-8 sm:p-12 bg-white border-[4px] border-[#0A0A0A] ${VALUE_COLORS[activeValueIndex].shadow} space-y-8`}
                    >
                      <div className="flex items-center justify-between pb-5 border-b-[3px] border-[#0A0A0A]">
                        <span
                          className={`px-3 py-1 border-2 border-[#0A0A0A] font-mono-tech text-xs font-bold uppercase ${VALUE_COLORS[activeValueIndex].bg} ${VALUE_COLORS[activeValueIndex].text}`}
                        >
                          VALUE {STUDIO_VALUES[activeValueIndex].number} // 05
                        </span>
                        <span className="font-mono-tech text-xs font-bold uppercase text-[#0A0A0A]">
                          {STUDIO_VALUES[activeValueIndex].greekOrOrigin}
                        </span>
                      </div>

                      <div className="font-display text-6xl sm:text-7xl font-black tracking-tight text-[#0A0A0A]">
                        <span className="text-[#FF2A00]">*</span>
                        {STUDIO_VALUES[activeValueIndex].name === 'Abundance'
                          ? 'abundance'
                          : STUDIO_VALUES[activeValueIndex].name === 'Integrity'
                          ? 'integrity'
                          : STUDIO_VALUES[activeValueIndex].name}
                      </div>

                      <p className="font-serif-editorial italic text-3xl sm:text-4xl text-[#0038FF] leading-tight">
                        “{STUDIO_VALUES[activeValueIndex].statement}”
                      </p>

                      <p className="font-mono-tech text-sm sm:text-base text-[#0A0A0A] leading-relaxed">
                        {STUDIO_VALUES[activeValueIndex].detail}
                      </p>

                      <div className="pt-6 border-t-[3px] border-[#0A0A0A] flex flex-wrap items-center justify-between gap-4">
                        <div className="inline-flex items-center gap-2 font-hand text-xl font-bold lowercase bg-[#0A0A0A] text-[#FAF6EE] px-3 py-1">
                          <span>powered by baby</span>
                          <BearPaw size={15} color="#FFD600" rotation={18} />
                        </div>

                        <button
                          type="button"
                          onClick={() => navigateTo('contact')}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF2A00] text-[#FAF6EE] border-2 border-[#0A0A0A] font-mono-tech text-xs font-bold uppercase hover:bg-[#0A0A0A] transition-colors cursor-pointer"
                        >
                          <span>Build with us</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.section>
          )}

          {/* -----------------------------------------------------------------
              DEDICATED PAGE 4: PROCESS
          ----------------------------------------------------------------- */}
          {currentPage === 'process' && (
            <motion.section
              key="page-process"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="max-w-[1440px] w-full mx-auto py-8 sm:py-14 space-y-20 sm:space-y-24"
            >
              {/* Top Page Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b-[3px] border-[#0A0A0A]">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 bg-[#FFD600] text-[#0A0A0A] border-2 border-[#0A0A0A] font-mono-tech text-xs font-bold tracking-widest shadow-brutal-black">
                    process
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF6EE] border-2 border-[#0A0A0A] font-mono-tech text-xs font-bold uppercase hover:bg-[#FFD600] shadow-brutal-black transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Hero</span>
                </button>
              </div>

              {/* Process Heading */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div>
                  <div className="inline-flex flex-wrap items-center gap-2 font-mono-tech text-xs font-bold mb-3">
                    <span className="px-2.5 py-1 bg-[#00C853] border-2 border-[#0A0A0A]">
                      ●Dream it · ●Express it
                    </span>
                    <span>AND</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0A0A0A] text-[#FAF6EE] border-2 border-[#0A0A0A]">
                      <span>●let it be</span>
                      <span className="font-hand text-lg font-bold lowercase text-[#FFD600]">
                        powered by baby
                      </span>
                      <BearPaw size={14} color="#FFD600" rotation={18} />
                    </span>
                  </div>
                  <h1 className="font-display text-6xl sm:text-8xl font-black uppercase tracking-tight leading-[0.88]">
                    FROM IDEA TO{' '}
                    <span className="bg-[#FF2A00] text-[#FAF6EE] px-4 border-[3px] border-[#0A0A0A] shadow-brutal-black inline-block">
                      LIVE.
                    </span>
                  </h1>
                </div>

                <p className="font-mono-tech text-xs sm:text-sm font-bold max-w-md border-l-4 border-[#0A0A0A] pl-4">
                  Four deliberate stages to construct your dreams into the real
                  world—then maintain and scale them.
                </p>
              </div>

              {/* 4-Stage Polychromatic Process Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {PROCESS_STAGES.map((stage, idx) => {
                  const colorObj = VALUE_COLORS[idx];
                  const isActive = activeProcessIndex === idx;
                  return (
                    <div
                      key={stage.number}
                      onClick={() => setActiveProcessIndex(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveProcessIndex(idx);
                        }
                      }}
                      className={`p-7 border-[3px] border-[#0A0A0A] flex flex-col justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0A0A0A] text-[#FAF6EE] shadow-brutal-vermilion -translate-y-1.5'
                          : 'bg-white text-[#0A0A0A] shadow-brutal-black hover:-translate-y-1'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-current/20">
                          <span
                            className={`px-3 py-0.5 border-2 border-[#0A0A0A] font-display text-3xl font-black ${colorObj.bg} ${colorObj.text}`}
                          >
                            {stage.number}
                          </span>
                          {idx === 3 ? (
                            <span className="inline-flex items-center gap-1.5 font-hand text-xl font-bold lowercase">
                              <span>● powered by baby</span>
                              <BearPaw
                                size={14}
                                color="#FF2A00"
                                rotation={18}
                              />
                            </span>
                          ) : (
                            <span className="font-mono-tech text-xs font-bold">
                              {stage.subtitle}
                            </span>
                          )}
                        </div>

                        <h2 className="font-display text-4xl font-black uppercase tracking-tight mb-3">
                          {stage.title}
                        </h2>

                        <p className="font-mono-tech text-xs leading-relaxed opacity-90 mb-6">
                          {stage.description}
                        </p>
                      </div>

                      <div className="pt-5 border-t-2 border-current/20 space-y-2">
                        {stage.artifacts.map((art) => (
                          <div
                            key={art}
                            className="flex items-center gap-2 font-mono-tech text-[11px] font-bold"
                          >
                            <span className="w-2 h-2 bg-[#FF2A00] shrink-0" />
                            <span>{art}</span>
                          </div>
                        ))}

                        <div className="pt-4 flex items-center justify-between">
                          {idx === 3 ? (
                            <span className="inline-flex items-center gap-1.5 font-hand text-xl font-bold lowercase text-[#FFD600] bg-[#0A0A0A] px-2.5 py-0.5">
                              <span>powered by baby</span>
                              <BearPaw
                                size={15}
                                color="#FF2A00"
                                rotation={18}
                              />
                            </span>
                          ) : (
                            <>
                              <span className="font-hand text-xl font-bold text-[#FFD600] bg-[#0A0A0A] px-2 py-0.5">
                                {stage.annotation}
                              </span>
                              <BearPaw
                                size={16}
                                color="#FF2A00"
                                rotation={idx * 18}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* -----------------------------------------------------------------
              DEDICATED PAGE 5: CONTACT
          ----------------------------------------------------------------- */}
          {currentPage === 'contact' && (
            <motion.section
              key="page-contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="max-w-[1440px] w-full mx-auto py-8 sm:py-14 space-y-20 sm:space-y-24"
            >
              {/* Top Page Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b-[3px] border-[#0A0A0A]">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 bg-[#00C853] text-[#0A0A0A] border-2 border-[#0A0A0A] font-mono-tech text-xs font-bold tracking-widest shadow-brutal-black">
                    contact
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF6EE] border-2 border-[#0A0A0A] font-mono-tech text-xs font-bold uppercase hover:bg-[#FFD600] shadow-brutal-black transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Hero</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left 5 Columns: Contact Manifesto */}
                <div className="lg:col-span-5 space-y-8">
                  <div>
                    <span className="font-hand text-3xl text-[#FF2A00] block mb-2">
                      ●Dream it · ●Express it
                    </span>
                    <h1 className="font-display text-6xl sm:text-7xl font-black uppercase tracking-tight leading-[0.88]">
                      BUILD YOUR WEBSITE...
                    </h1>
                    <div className="mt-3 inline-flex items-center gap-2.5 px-4 py-2 bg-[#0A0A0A] text-[#FAF6EE] border-[3px] border-[#0A0A0A] shadow-brutal-gold">
                      <span className="font-hand text-3xl sm:text-4xl font-bold lowercase">
                        powered by baby_
                      </span>
                      <BearPaw size={22} color="#FFD600" rotation={18} />
                    </div>
                  </div>

                  <p className="font-mono-tech text-sm sm:text-base font-bold text-[#0A0A0A] leading-relaxed border-l-[6px] border-[#FF2A00] pl-4">
                    A place where we construct your dreams into the real world.
                    Tell us what you are dreaming up and we will build,
                    maintain, and scale it with you.
                  </p>

                  <div className="p-6 bg-white border-[3px] border-[#0A0A0A] shadow-brutal-black space-y-3 font-mono-tech text-xs font-bold">
                    <div className="flex items-center justify-between border-b-2 border-[#0A0A0A]/15 pb-2">
                      <span className="text-[#0038FF]">ESTABLISHED</span>
                      <span>Est 07.10.2026</span>
                    </div>
                    <div className="flex items-center justify-between border-b-2 border-[#0A0A0A]/15 pb-2">
                      <span className="text-[#FF2A00]">PILLARS</span>
                      <span>-We build · -We maintain · -We scale</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#00C853]">SIGNATURE</span>
                      <span className="inline-flex items-center gap-1.5 font-hand text-xl font-bold lowercase">
                        <span>powered by baby</span>
                        <BearPaw size={14} color="#FF2A00" rotation={18} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right 7 Columns: Polychromatic Anti-Culture Form */}
                <div className="lg:col-span-7 bg-white border-[4px] border-[#0A0A0A] p-8 sm:p-12 shadow-brutal-cobalt">
                  {submitted ? (
                    <div className="py-10 space-y-6">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00C853] border-2 border-[#0A0A0A] text-[#0A0A0A] text-xs font-mono-tech font-bold uppercase tracking-widest shadow-brutal-black">
                        <Check className="w-4 h-4" />
                        <span>DREAM RECEIVED</span>
                      </div>
                      <h2 className="font-display text-5xl sm:text-6xl font-black uppercase">
                        WE&apos;RE READY, {formData.name}.
                      </h2>
                      <p className="text-sm font-mono-tech text-[#0A0A0A] max-w-lg leading-relaxed">
                        Your brief ({selectedPillar} ·{' '}
                        {selectedServices.join(', ')}) is in our hands. We will
                        reach out to{' '}
                        <span className="underline font-bold">
                          {formData.email}
                        </span>{' '}
                        so your website can be{' '}
                        <span className="inline-flex items-center gap-1.5 font-hand text-2xl font-bold lowercase align-middle">
                          <span>powered by baby</span>
                          <BearPaw size={15} color="#FF2A00" rotation={18} />
                        </span>
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            brand: '',
                            dream: '',
                          });
                        }}
                        className="px-5 py-2.5 bg-[#FFD600] border-2 border-[#0A0A0A] text-xs font-mono-tech font-bold uppercase tracking-widest text-[#0A0A0A] shadow-brutal-black cursor-pointer"
                      >
                        Send another brief
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleContactSubmit}
                      noValidate
                      className="space-y-6"
                    >
                      {/* Step 1: Pillar */}
                      <div>
                        <label className="block text-xs font-mono-tech font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">
                          01. CHOOSE YOUR PILLAR
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {['-We build', '-We maintain', '-We scale'].map(
                            (p, idx) => {
                              const active = selectedPillar === p;
                              const activeColors =
                                idx === 0
                                  ? 'bg-[#FF2A00] text-[#FAF6EE]'
                                  : idx === 1
                                  ? 'bg-[#0038FF] text-[#FAF6EE]'
                                  : 'bg-[#00C853] text-[#0A0A0A]';
                              return (
                                <button
                                  key={p}
                                  type="button"
                                  onClick={() => setSelectedPillar(p)}
                                  className={`py-3 px-3 text-xs font-mono-tech font-bold border-2 border-[#0A0A0A] transition-all cursor-pointer whitespace-nowrap ${
                                    active
                                      ? `${activeColors} shadow-brutal-black -translate-y-0.5`
                                      : 'bg-[#FAF6EE] text-[#0A0A0A] hover:bg-[#FFD600]'
                                  }`}
                                >
                                  {p}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>

                      {/* Step 2: Services */}
                      <div>
                        <label className="block text-xs font-mono-tech font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">
                          02. WHAT ARE WE CONSTRUCTING?
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {SERVICES_LIST.map((s) => {
                            const active = selectedServices.includes(s.title);
                            return (
                              <button
                                key={s.number}
                                type="button"
                                onClick={() => toggleService(s.title)}
                                className={`px-3 py-2 text-[11px] font-mono-tech font-bold uppercase border-2 border-[#0A0A0A] text-left truncate cursor-pointer transition-colors ${
                                  active
                                    ? 'bg-[#0A0A0A] text-[#FAF6EE]'
                                    : 'bg-[#FAF6EE] text-[#0A0A0A] hover:bg-[#FFD600]'
                                }`}
                              >
                                {s.title}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 3: Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono-tech font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">
                            YOUR NAME *
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Your name"
                            className="w-full px-4 py-3 bg-[#FAF6EE] border-2 border-[#0A0A0A] text-sm font-mono-tech text-[#0A0A0A] focus:bg-[#FFD600]/25 focus:outline-none"
                          />
                          {formErrors.name && (
                            <p className="mt-1 text-xs font-mono-tech font-bold text-[#FF2A00]">
                              {formErrors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-mono-tech font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">
                            EMAIL *
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            placeholder="you@domain.com"
                            className="w-full px-4 py-3 bg-[#FAF6EE] border-2 border-[#0A0A0A] text-sm font-mono-tech text-[#0A0A0A] focus:bg-[#FFD600]/25 focus:outline-none"
                          />
                          {formErrors.email && (
                            <p className="mt-1 text-xs font-mono-tech font-bold text-[#FF2A00]">
                              {formErrors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono-tech font-bold uppercase tracking-widest text-[#0A0A0A] mb-2">
                          ●DREAM IT · ●EXPRESS IT *
                        </label>
                        <textarea
                          rows={4}
                          value={formData.dream}
                          onChange={(e) =>
                            setFormData({ ...formData, dream: e.target.value })
                          }
                          placeholder="Tell us about the dream you want to construct into the real world..."
                          className="w-full px-4 py-3 bg-[#FAF6EE] border-2 border-[#0A0A0A] text-sm font-mono-tech text-[#0A0A0A] focus:bg-[#FFD600]/25 focus:outline-none"
                        />
                        {formErrors.dream && (
                          <p className="mt-1 text-xs font-mono-tech font-bold text-[#FF2A00]">
                            {formErrors.dream}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#0A0A0A] text-[#FAF6EE] border-2 border-[#0A0A0A] font-display text-2xl sm:text-3xl font-black tracking-wide shadow-brutal-vermilion hover:bg-[#FF2A00] transition-colors cursor-pointer"
                      >
                        <span>LET IT BE</span>
                        <span className="font-hand text-3xl sm:text-4xl font-bold lowercase text-[#FFD600]">
                          powered by baby_
                        </span>
                        <BearPaw size={18} color="#FFD600" rotation={20} />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* =====================================================================
          3. FOOTER (Shows up after interactive image drops down)
      ===================================================================== */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isRevealed ? 1 : 0,
          y: isRevealed ? 0 : 20,
        }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-30 w-full border-t-[3px] border-[#0A0A0A] bg-[#FAF6EE] ${
          !isRevealed ? 'pointer-events-none' : ''
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left Signature: powered by baby (lowercase + handwritten font) + BearPaw AFTER + Est 07.10.2026 + copyleft 2026 */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono-tech font-bold text-[#0A0A0A]">
            <span className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#FAF6EE] px-3 py-1 font-hand text-xl font-bold lowercase">
              <span>powered by baby_</span>
              <BearPaw size={15} color="#FF2A00" rotation={16} />
            </span>
            <span>·</span>
            <span className="text-[#0038FF]">Est 07.10.2026</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FFD600] border-2 border-[#0A0A0A] text-[#0A0A0A]">
              <span
                aria-hidden="true"
                className="inline-block -scale-x-100 font-bold"
              >
                ©
              </span>
              <span>copyleft 2026</span>
            </span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
