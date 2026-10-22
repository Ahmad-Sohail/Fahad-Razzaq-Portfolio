import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import bannerPic from '../../public/assets/aistudio/hero.jpg';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Background Hero Image */}
      <motion.img
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        src={bannerPic}
        alt="Construction mega-project site at dusk"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/40" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Hero Content Container */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pt-28 pb-10 sm:px-6 sm:pt-32 sm:pb-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-gold"
        >
          <span className="h-px w-8 sm:w-12 bg-gold/60" />
          Administration Specialist
        </motion.p>

        <div className="mt-4 sm:mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-10">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-[clamp(2.75rem,12vw,6rem)] font-bold leading-[1.05] text-foreground"
            >
              Fahad<span className="block italic text-gold">Razzaq</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground"
            >
              14+ years driving administrative excellence across{' '}
              <span className="font-semibold text-foreground">Pakistan</span>,{' '}
              <span className="font-semibold text-foreground">Saudi Arabia</span> &amp; the{' '}
              <span className="font-semibold text-foreground">UAE</span> — leading workforces, procurement and operations on major project sites.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-7 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="#experience"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold text-background transition-colors hover:bg-glow shadow-lg shadow-gold/15 whitespace-nowrap cursor-pointer"
              >
                <span>View Experience</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/25 px-5 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-gold hover:text-gold whitespace-nowrap cursor-pointer"
              >
                Contact Me
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpenResumeModal}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-background cursor-pointer whitespace-nowrap shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download CV</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Stat strip with staggered Framer Motion entrance */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
        >
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 + idx * 0.08 }}
              whileHover={{ backgroundColor: 'rgba(201, 162, 39, 0.08)' }}
              className="bg-background/70 px-3 py-4 sm:px-5 sm:py-6 backdrop-blur-md transition-colors"
            >
              <p className="font-display text-2xl sm:text-3xl font-bold text-gold tabular-nums">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bouncing Scroll Down Button */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        href="#about"
        aria-label="Scroll to about section"
        className="absolute right-6 bottom-8 hidden h-12 w-12 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold lg:flex cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-down h-5 w-5 animate-bounce"
          aria-hidden="true"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </motion.a>
    </section>
  );
};
