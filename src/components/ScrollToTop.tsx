import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8 no-print"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Scroll back to top"
            title="Scroll to top"
            className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-gold/40 bg-background/85 text-gold shadow-2xl backdrop-blur-md transition-colors hover:border-gold hover:bg-gold hover:text-background hover:shadow-gold/30 cursor-pointer"
          >
            {/* Glowing ring pulse on hover */}
            <span className="absolute -inset-1 rounded-full bg-gold/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
