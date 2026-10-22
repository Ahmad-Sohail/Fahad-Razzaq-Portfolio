import React from 'react';
import { motion } from 'motion/react';
import { EDUCATION, CERTIFICATIONS } from '../data/portfolioData';

export const EducationCertifications: React.FC = () => {
  return (
    <section id="education" className="scroll-mt-24 bg-surface py-16 sm:py-24">
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
              <span className="font-display text-sm tracking-normal">04</span>
              <span className="h-px w-10 bg-gold/50" />
              Credentials
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Education &amp; training.
            </h2>
          </div>
        </motion.div>

        {/* 2-Column Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Card 1: Education */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            whileHover={{ y: -4, borderColor: 'rgba(201, 162, 39, 0.4)' }}
            className="rounded-3xl border border-border bg-card p-5 transition-colors shadow-lg sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Education
            </p>
            <div className="mt-7 space-y-7">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
                    {idx === 0 ? (
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
                        className="lucide lucide-graduation-cap h-5 w-5"
                      >
                        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                        <path d="M22 10v6" />
                        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                      </svg>
                    ) : (
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
                        className="lucide lucide-wrench h-5 w-5"
                      >
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{edu.degree}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="mt-1 text-xs text-muted-foreground/80 tabular-nums">{edu.period}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.15 }}
            whileHover={{ y: -4, borderColor: 'rgba(201, 162, 39, 0.4)' }}
            className="rounded-3xl border border-border bg-card p-5 transition-colors shadow-lg sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Certifications &amp; Licenses
            </p>
            <div className="mt-7 space-y-7">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
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
                      className="lucide lucide-shield-check h-5 w-5"
                    >
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{cert.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{cert.issuer}</p>
                    <p className="mt-1 text-xs text-muted-foreground/80 tabular-nums">{cert.date}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
