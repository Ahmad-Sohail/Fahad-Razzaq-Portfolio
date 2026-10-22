import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PERSONAL_INFO,
  EXPERIENCES,
  SKILLS,
  EDUCATION,
  CERTIFICATIONS,
  LANGUAGES,
} from '../data/portfolioData';
import { downloadExecutiveCV } from '../utils/downloadCV';

interface ExecutiveResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveResumeModal: React.FC<ExecutiveResumeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadExecutiveCV();
    } finally {
      setTimeout(() => setIsDownloading(false), 1200);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="executive-cv-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex justify-center p-3 sm:p-6 lg:p-10"
        >
          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative bg-surface w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-border overflow-hidden my-auto"
          >
        {/* Modal Action Bar (Sticky, Hidden in Print) */}
        <div className="no-print bg-background/95 text-foreground px-4 py-3 sm:px-6 sm:py-4 flex flex-wrap items-center justify-between gap-3 border-b border-border sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gold font-display">
              Executive Curriculum Vitae
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Primary: Real PDF Download Button */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="rounded-full bg-gold hover:bg-glow text-background px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md hover:shadow-gold/20 active:scale-95 disabled:opacity-75"
              title="Download PDF file"
            >
              <svg
                className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
            </button>

            {/* Direct Open / View Original PDF */}
            <a
              href="/assets/aistudio/Fahad_Pak_Cv_daa15f95.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold hover:bg-gold hover:text-background transition-colors"
              title="Open Official 3-Page PDF"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>View Full PDF</span>
            </a>

            {/* Direct fallback anchor link */}
            <a
              href="/assets/aistudio/Fahad_Pak_Cv_daa15f95.pdf"
              download="Fahad_Razzaq_Executive_CV.pdf"
              className="hidden md:inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors"
              title="Direct link to PDF"
            >
              <span>Direct Link</span>
            </a>

            {/* Print / Save via Browser */}
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex rounded-full border border-border bg-surface px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors cursor-pointer items-center gap-1.5"
              title="Print document or save using browser dialog"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              <span>Print</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-elevated transition-colors cursor-pointer"
              aria-label="Close CV Modal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Printable Resume Document Body */}
        <div className="p-6 sm:p-10 lg:p-12 text-foreground bg-surface space-y-8 font-sans print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-border pb-6 print:border-black">
            <h1
              id="executive-cv-title"
              className="text-2xl sm:text-4xl font-display font-bold text-foreground print:text-black tracking-tight mb-1"
            >
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-sm sm:text-base font-semibold text-gold print:text-gray-800 mb-3">
              {PERSONAL_INFO.title}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground print:text-gray-600">
              <span>{PERSONAL_INFO.location}</span>
              <span aria-hidden="true">·</span>
              <span>{PERSONAL_INFO.phone}</span>
              <span aria-hidden="true">·</span>
              <span>{PERSONAL_INFO.email}</span>
              <span aria-hidden="true">·</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-gold print:text-black underline underline-offset-2"
              >
                {PERSONAL_INFO.linkedinDisplay}
              </a>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gold print:text-black border-b border-border print:border-black pb-1 mb-2">
              Executive Summary
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground print:text-gray-800">
              {PERSONAL_INFO.summaryParagraph1}
            </p>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gold print:text-black border-b border-border print:border-black pb-1 mb-4">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <span className="text-sm font-bold text-foreground print:text-black">
                        {exp.role}
                      </span>
                      <span className="text-xs text-muted-foreground print:text-gray-600 font-medium ml-1.5">
                        — {exp.company} ({exp.location})
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground print:text-gray-600 tabular-nums">
                      {exp.period}
                    </span>
                  </div>
                  {exp.project && (
                    <div className="text-xs text-gold print:text-gray-800 font-semibold">
                      Project: {exp.project}
                    </div>
                  )}
                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-muted-foreground print:text-gray-700 leading-normal">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies Matrix */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gold print:text-black border-b border-border print:border-black pb-1 mb-3">
              Core Competencies & Capabilities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-muted-foreground print:text-gray-700">
              {SKILLS.map((skill) => (
                <div key={skill.id} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold print:bg-black" />
                  <span className="font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Credentials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gold print:text-black border-b border-border print:border-black pb-1 mb-2">
                Education
              </h2>
              <div className="space-y-2 text-xs">
                {EDUCATION.map((edu) => (
                  <div key={edu.degree}>
                    <div className="font-bold text-foreground print:text-black">{edu.degree}</div>
                    <div className="text-muted-foreground print:text-gray-600">
                      {edu.institution} ({edu.period})
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gold print:text-black border-b border-border print:border-black pb-1 mb-2">
                Certifications & Languages
              </h2>
              <div className="space-y-2 text-xs">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.title}>
                    <div className="font-bold text-foreground print:text-black">{cert.title}</div>
                    <div className="text-muted-foreground print:text-gray-600">
                      {cert.issuer} · {cert.date}
                    </div>
                  </div>
                ))}
                <div className="pt-1 text-xs text-muted-foreground print:text-gray-700">
                  <span className="font-semibold text-foreground print:text-black">Languages: </span>
                  {LANGUAGES.map((l) => `${l.language} (${l.level})`).join(' · ')}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Download CTA Bar inside modal */}
          <div className="no-print pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              Official executive curriculum vitae of Fahad Razzaq.
            </p>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                href="/assets/aistudio/Fahad_Pak_Cv_daa15f95.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none justify-center rounded-full border border-border bg-surface hover:bg-elevated px-4 py-2.5 text-xs sm:text-sm font-semibold text-foreground transition-colors flex items-center gap-1.5"
              >
                <span>View Full 3-Page PDF ↗</span>
              </a>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 sm:flex-none justify-center rounded-full bg-gold hover:bg-glow text-background px-6 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>{isDownloading ? 'Downloading...' : 'Download Official PDF'}</span>
              </button>
            </div>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
