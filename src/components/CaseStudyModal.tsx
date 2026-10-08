import React, { useEffect } from 'react';
import { X, ArrowUpRight, Check } from 'lucide-react';
import { CaseStudy } from '../data/studioData';
import { BearPaw } from './BearPaw';

interface CaseStudyModalProps {
  project: CaseStudy | null;
  onClose: () => void;
  onStartSimilarProject: (projectName: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onStartSimilarProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/85 backdrop-blur-sm p-4 sm:p-6 md:p-10 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#F6F5F0] text-[#0A0A0A] border border-[#0A0A0A] my-auto max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#F6F5F0]/95 backdrop-blur-md border-b border-[#0A0A0A]/15">
          <div className="flex items-center gap-3 text-xs font-mono-tech uppercase tracking-wider text-[#52514E]">
            <span>CASE DOSSIER</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#0A0A0A] font-medium">{project.name}</span>
            <span aria-hidden="true">·</span>
            <span>{project.industry}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono-tech uppercase tracking-wider text-[#0A0A0A] hover:text-[#FF3B00] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF3B00]"
            aria-label="Close case study"
          >
            <span>ESC</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Image Showcase */}
        <div className="relative w-full aspect-[16/9] bg-[#141413] overflow-hidden border-b border-[#0A0A0A]/15">
          <img
            src={project.image}
            alt={`${project.name} — ${project.industry} website design by BABY`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-[#F6F5F0]">
            <div>
              <p className="font-hand text-2xl text-[#FF3B00] mb-1">
                {project.annotation}
              </p>
              <h2
                id="modal-project-title"
                className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight uppercase"
              >
                {project.name}
              </h2>
            </div>
            <div className="text-right font-mono-tech text-xs sm:text-sm text-[#F6F5F0]/90">
              <span>{project.liveUrlLabel}</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-6 sm:p-10 md:p-12">
          {/* Quantified Impact Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-10 mb-10 border-b border-[#0A0A0A]/15">
            <div className="md:col-span-7">
              <p className="text-xs font-mono-tech uppercase tracking-widest text-[#52514E] mb-2">
                VERIFIED CLIENT OUTCOME
              </p>
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#0A0A0A] tracking-tight">
                {project.impactMetric}
              </p>
              <p className="text-sm text-[#52514E] mt-1">
                {project.impactContext}
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col justify-center md:border-l md:border-[#0A0A0A]/15 md:pl-6">
              <p className="text-xs font-mono-tech uppercase tracking-widest text-[#52514E] mb-2">
                TECHNICAL BENCHMARK
              </p>
              <p className="font-mono-tech text-lg font-medium text-[#0A0A0A]">
                {project.secondaryMetric}
              </p>
            </div>
          </div>

          {/* Narrative Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#52514E] mb-3">
                  01. THE CHALLENGE
                </h3>
                <p className="text-base sm:text-lg text-[#0A0A0A] leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#52514E] mb-3">
                  02. THE EXECUTION
                </h3>
                <p className="text-base sm:text-lg text-[#0A0A0A] leading-relaxed">
                  {project.execution}
                </p>
              </div>

              {project.testimonial && (
                <div className="pt-6 border-t border-[#0A0A0A]/15">
                  <blockquote className="text-lg sm:text-xl font-medium italic text-[#0A0A0A] leading-relaxed mb-4">
                    “{project.testimonial.quote}”
                  </blockquote>
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-[#52514E]">
                    <span className="font-semibold text-[#0A0A0A]">
                      {project.testimonial.author}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.testimonial.role}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.testimonial.company}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Deliverables */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-[#EFEDE6] p-6 border border-[#0A0A0A]/10">
              <div>
                <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#52514E] mb-4">
                  SERVICES PROVIDED
                </h3>
                <ul className="space-y-3 mb-8">
                  {project.servicesProvided.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-2.5 text-sm font-medium text-[#0A0A0A]"
                    >
                      <Check className="w-4 h-4 text-[#FF3B00] shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-[#0A0A0A]/10">
                  <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-[#52514E]">
                    <BearPaw size={14} color="#FF3B00" rotation={18} />
                    <span>POWERED BY BABY.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#0A0A0A]/10">
                <button
                  onClick={() => onStartSimilarProject(project.name)}
                  className="w-full inline-flex items-center justify-between px-5 py-3.5 bg-[#0A0A0A] text-[#F6F5F0] text-sm font-semibold hover:bg-[#FF3B00] transition-colors duration-150 cursor-pointer whitespace-nowrap"
                >
                  <span>Build a site of this caliber</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
