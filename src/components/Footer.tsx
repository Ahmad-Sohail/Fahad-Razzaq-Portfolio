import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-surface py-10 sm:py-12 no-print">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:gap-8 px-4 sm:px-6 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-display text-2xl font-bold text-gold">
            {PERSONAL_INFO.name}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {PERSONAL_INFO.title}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* LinkedIn */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:bg-gold hover:text-background"
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
              className="lucide lucide-linkedin h-4 w-4"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          {/* Email */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Send email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:bg-gold hover:text-background"
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
              className="lucide lucide-mail h-4 w-4"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
          </a>

          {/* Phone */}
          <a
            href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
            aria-label="Call"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:bg-gold hover:text-background"
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
              className="lucide lucide-phone h-4 w-4"
            >
              <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
            </svg>
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-border px-6 pt-6 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 Fahad Razzaq. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
