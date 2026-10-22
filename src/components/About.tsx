import React from 'react';
import { motion } from 'motion/react';
import profilePhoto from '../../public/assets/aistudio/ProfilePic_2ea40e30.jpg';

export const About: React.FC = () => {
  const locations = [
    { id: 1, name: 'Lahore, Pakistan' },
    { id: 2, name: 'NEOM, KSA' },
    { id: 3, name: 'Dubai, UAE' },
  ];

  const skills = [
    {
      id: 1,
      title: 'Leadership',
      description:
        'Leading administrative teams and large workforces with clarity and accountability.',
      icon: (
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
          className="h-5 w-5"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <path d="M16 3.128a4 4 0 0 1 0 7.744" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <circle cx="9" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Strategic Planning',
      description:
        'Aligning operations, budgets and resources with long-term business goals.',
      icon: (
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
          className="h-5 w-5"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Cross-Cultural Management',
      description:
        'Working effectively across teams in Pakistan, Saudi Arabia and the UAE.',
      icon: (
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
          className="h-5 w-5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-24 overflow-hidden bg-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <span className="font-display text-sm tracking-normal">01</span>
              <span className="h-px w-10 bg-gold/50" />
              About Me
            </p>

            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Systems over paperwork.
            </h2>
          </div>
        </motion.div>

        {/* Two-Column Grid */}
        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="min-w-0 space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            <p className="border-l-2 border-gold pl-5 text-foreground sm:pl-6">
              Over the past 14+ years, I have built a career on dedication,
              disciplined leadership and a hands-on approach to administration —
              from multi-branch operations in Lahore to mega-project sites in NEOM
              and the Gulf.
            </p>

            <p>
              I take ownership of the details that keep projects moving:
              procurement, logistics, budgets and the people behind them. I believe
              modern administration runs on systems, not paperwork — from workforce
              reporting and fleet tracking to vendor management, I have consistently
              integrated digital tools into daily operations, bringing transparency
              and speed to every team I lead.
            </p>

            {/* Location Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              {locations.map((location, idx) => (
                <motion.span
                  key={location.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/40 hover:text-foreground"
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
                    className="h-3.5 w-3.5 shrink-0 text-gold"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {location.name}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Profile Photo with Motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex min-w-0 justify-center lg:justify-end"
          >
            <div className="group relative">
              <div className="h-52 w-52 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full bg-linear-to-tr from-gold via-gold/50 to-border/40 p-1.5 shadow-2xl transition-transform duration-300 group-hover:scale-[1.03]">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-border/80 bg-surface/90 shadow-inner">
                  <img
                    src={profilePhoto}
                    alt="Fahad Razzaq - Administration Specialist"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              {/* Executive Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold/40 bg-background/95 px-3.5 py-1 text-[11px] font-semibold text-gold shadow-lg backdrop-blur-md"
              >
                Fahad Razzaq · 14+ Years
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Highlight Cards - Horizontal Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 overflow-x-auto overflow-y-hidden px-1 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max min-w-full items-stretch gap-4">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(201, 162, 39, 0.6)' }}
                className="group flex w-[280px] shrink-0 items-start gap-4 rounded-2xl border border-border bg-surface p-4 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 sm:w-[320px] sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-background">
                  {skill.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {skill.title}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {skill.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
