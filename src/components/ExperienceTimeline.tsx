import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const [filterCountry, setFilterCountry] = useState<string>('All');

  const filteredExperiences = filterCountry === 'All'
    ? EXPERIENCES
    : EXPERIENCES.filter((exp) => exp.country === filterCountry);

  const filterOptions = [
    { label: 'All', value: 'All' },
    { label: 'Saudi Arabia (NEOM)', value: 'Saudi Arabia' },
    { label: 'Pakistan', value: 'Pakistan' },
    { label: 'UAE', value: 'UAE' },
  ];

  return (
    <section id="experience" className="scroll-mt-24 bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <span className="font-display text-sm tracking-normal">02</span>
              <span className="h-px w-10 bg-gold/50" />
              Career
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Where I've delivered.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex max-w-full flex-wrap items-center gap-2">
            {filterOptions.map((opt) => {
              const isActive = filterCountry === opt.value;
              return (
                <motion.button
                  key={opt.label}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterCountry(opt.value)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gold text-background font-semibold shadow-sm'
                      : 'border border-border bg-background/50 text-muted-foreground hover:border-gold/40 hover:text-foreground'
                  }`}
                >
                  {opt.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Experience Cards */}
        <motion.div layout className="mt-12 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((exp, idx) => (
              <motion.article
                layout
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -4, borderColor: 'rgba(201, 162, 39, 0.4)' }}
                className="group relative min-w-0 rounded-3xl border border-border bg-card p-5 transition-colors shadow-lg hover:shadow-xl hover:shadow-black/20 sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                        {exp.role}
                      </h3>
                      {exp.isCurrent && (
                        <span className="flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold text-gold">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm font-semibold text-gold">
                      {exp.company} {exp.project ? `(${exp.project})` : ''}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
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
                        className="lucide lucide-map-pin h-3.5 w-3.5 text-gold"
                        aria-hidden="true"
                      >
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {exp.location}
                    </p>
                  </div>

                  <span className="rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium whitespace-nowrap text-muted-foreground tabular-nums">
                    {exp.period}
                  </span>
                </div>

                {/* 2-Column Bullets Grid */}
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {exp.bullets.map((bullet, bulletIdx) => (
                    <li
                      key={bulletIdx}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
