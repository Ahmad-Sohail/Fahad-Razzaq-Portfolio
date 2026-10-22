import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent no-print pointer-events-none">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-gold/80 via-glow to-gold shadow-[0_0_10px_rgba(201,162,39,0.7)]"
        style={{ scaleX }}
      />
    </div>
  );
};
