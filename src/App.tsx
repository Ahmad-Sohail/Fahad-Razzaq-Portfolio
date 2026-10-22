/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { CareerGlobe3D } from './components/CareerGlobe3D';
import { SkillsGrid } from './components/SkillsGrid';
import { EducationCertifications } from './components/EducationCertifications';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ExecutiveResumeModal } from './components/ExecutiveResumeModal';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgressBar } from './components/ScrollProgressBar';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-gold/20 selection:text-gold">
      {/* Scroll Progress Indicator Bar */}
      <ScrollProgressBar />

      {/* Sticky Executive Navbar */}
      <Navbar onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* Main Portfolio Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />

        {/* 2. About Me Section */}
        <About />

        {/* 3. Professional Experience (Timeline) */}
        <ExperienceTimeline />

        {/* 4. Three.js 3D Cross-Border Operations Hub */}
        <CareerGlobe3D />

        {/* 5. Core Skills Matrix */}
        <SkillsGrid />

        {/* 6. Education, Certifications & Languages */}
        <EducationCertifications />

        {/* 7. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Executive Printable CV Modal */}
      <ExecutiveResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
}
