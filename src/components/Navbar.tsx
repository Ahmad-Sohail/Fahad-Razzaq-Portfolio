import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 5 Clean nav links matching lovable.app reference (Executive Hub removed as requested)
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 no-print">
      <div
        className={`mx-auto flex min-w-0 max-w-4xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 sm:px-6 sm:py-2.5 ${
          isScrolled
            ? 'border-border/80 bg-background/85 shadow-lg shadow-black/25 backdrop-blur-md'
            : 'border-border/60 bg-background/30 backdrop-blur-md'
        }`}
      >
        {/* Brand Lockup — whitespace-nowrap and shrink-0 to prevent 'Fahad Razzaq' from ever breaking to a next line */}
        <a
          href="#top"
          className="flex min-w-0 items-center gap-2 sm:gap-2.5 shrink-0 whitespace-nowrap group"
        >
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-gold font-display text-[11px] sm:text-xs font-bold text-background transition-transform group-hover:scale-105">
            FR
          </span>
          <span className="max-w-[8rem] truncate font-display text-sm sm:max-w-none sm:text-base font-semibold tracking-tight text-foreground whitespace-nowrap shrink-0">
            {PERSONAL_INFO.name}
          </span>
        </a>

        {/* 5 Navigation Links (Exact 5 links from lovable.app) */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Executive CV Button (Available on lg+ to prevent navbar squeeze, and inside mobile drawer) */}
          <button
            onClick={onOpenResumeModal}
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-background cursor-pointer whitespace-nowrap"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>CV</span>
          </button>

          {/* Mail Quick Contact Button */}
          <a
            href="#contact"
            aria-label="Contact by email"
            className="hidden h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gold text-background transition-all hover:bg-glow sm:flex cursor-pointer shadow-sm shrink-0"
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
              className="lucide lucide-mail h-3.5 w-3.5 sm:h-4 sm:w-4"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
          </a>

          {/* Mobile Menu Toggle Button (Minimum 40px touch target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? (
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
                className="h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
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
                className="lucide lucide-menu h-4 w-4"
              >
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown / Drawer */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-4xl rounded-2xl border border-border/80 bg-background/95 p-4 shadow-2xl backdrop-blur-md md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 pt-2 border-t border-border/80 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                className="w-full text-center rounded-full bg-gold px-4 py-2.5 text-xs font-semibold text-background hover:bg-glow transition-all shadow cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>View & Download Executive CV</span>
              </button>
              <a
                href="/assets/Fahad_Razzaq_CV.pdf"
                download="Fahad_Razzaq_Executive_CV.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-semibold text-gold hover:bg-gold hover:text-background transition-colors flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Direct Download PDF</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full text-center rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Direct Contact
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
