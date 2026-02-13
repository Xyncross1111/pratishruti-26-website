'use client';

import { motion } from 'framer-motion';

interface NavigationProps {
  scrollProgress: number;
}

export default function Navigation({ scrollProgress }: NavigationProps) {

  const bgOpacity = Math.min(scrollProgress / 30, 0.95);
  const blurAmount = Math.min(scrollProgress / 20, 15);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6 transition-all duration-300"
      style={{
        backgroundColor: `rgba(21, 35, 60, ${bgOpacity})`,
        backdropFilter: `blur(${blurAmount}px)`,
        borderBottom: `1px solid rgba(112, 200, 220, ${Math.min(scrollProgress / 40, 0.2)})`,
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div className="flex items-center text-yellow-400 font-bold gap-3"
        style = {{ }}>
          <div className="flex flex-col">Pratishruti 2026</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-8"
        >
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => {
                const element = document.getElementById('events');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs text-white font-medium text-foreground/70 hover:text-blue-300 transition-colors"
            >
              Events
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('timeline');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs text-white font-medium text-foreground/70 hover:text-blue-300 transition-colors"
            >
              Timeline
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('register');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs text-white font-medium text-foreground/70 hover:text-blue-300 transition-colors"
            >
              Register
            </button>
          </div>


        </motion.div>
      </div>
    </motion.nav>
  );
}
