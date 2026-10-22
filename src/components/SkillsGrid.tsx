import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILLS } from '../data/portfolioData';

export const SkillsGrid: React.FC = () => {
  const [showDetailedGrid, setShowDetailedGrid] = useState(false);

  // 10 Core Skills from CV
  const skillNames = [
    'Leadership',
    'Critical Thinking',
    'Business Development',
    'Project Management',
    'Time Management',
    'Customer Services',
    'Fleet Management',
    'Procurement Management',
    'Budget Management',
    'Administrative Operations',
  ];

  // Repeat for smooth infinite marquee
  const row1Skills = [...skillNames, ...skillNames, ...skillNames];
  const row2Skills = [...skillNames.slice().reverse(), ...skillNames.slice().reverse(), ...skillNames.slice().reverse()];

  return (
    <section id="skills" className="scroll-mt-24 overflow-hidden bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <span className="font-display text-sm tracking-normal">03</span>
              <span className="h-px w-10 bg-gold/50" />
              Expertise
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Core skills.
            </h2>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.04 }}
            onClick={() => setShowDetailedGrid(!showDetailedGrid)}
            className="self-start sm:self-auto rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/40 hover:text-foreground cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <span>{showDetailedGrid ? 'Hide Descriptions' : 'View Skill Details'}</span>
            <span className="text-gold">✦</span>
          </motion.button>
        </motion.div>

        {/* Detailed Grid if toggled */}
        <AnimatePresence>
          {showDetailedGrid && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden"
            >
              {SKILLS.map((skill, idx) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -4, borderColor: 'rgba(201, 162, 39, 0.5)' }}
                  className="rounded-2xl border border-border bg-surface p-6 transition-colors shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">
                      {skill.category}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1.5">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-xs text-muted-foreground">
                    {skill.keywords.map((kw, i) => (
                      <span key={kw}>
                        {kw}{i < skill.keywords.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dual Infinite Marquee Ribbons */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="marquee-paused mt-14 space-y-5"
      >
        {/* Row 1: Marquee Left */}
        <div className="flex w-max animate-marquee-left gap-5">
          {row1Skills.map((skill, idx) => (
            <span
              key={`r1-${idx}`}
              className="flex items-center gap-3 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-medium whitespace-nowrap text-foreground transition-colors hover:border-gold/50 cursor-default"
            >
              <span className="h-2 w-2 rounded-full bg-gold" />
              {skill}
            </span>
          ))}
        </div>

        {/* Row 2: Marquee Right */}
        <div className="flex w-max animate-marquee-right gap-5">
          {row2Skills.map((skill, idx) => (
            <span
              key={`r2-${idx}`}
              className="flex items-center gap-3 rounded-full bg-gold/10 px-6 py-3.5 text-sm font-medium whitespace-nowrap text-gold transition-colors hover:bg-gold hover:text-background cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
