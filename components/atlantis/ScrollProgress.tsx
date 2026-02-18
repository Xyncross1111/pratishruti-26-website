'use client';

import { motion } from 'framer-motion';

interface ScrollProgressProps {
  progress: number;
}

export default function ScrollProgress({ progress }: ScrollProgressProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const depthLabels = ['Surface', 'Shallow', 'Ruins', 'Deep Sea', 'Abyss', 'Vault'];
  const depth = Math.floor((clampedProgress / 100) * (depthLabels.length - 1));

  return (
    <>
      {/* Side depth indicator */}
      <motion.div
        className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Depth gauge */}
          <div className="relative w-12 h-40 border-2 border-white/40 rounded-full bg-deep-ocean/50 backdrop-blur-sm overflow-hidden">
            {/* Depth bar fill */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-linear-to-b from-blue-400 via-glow-blue to-blue-1000"
              style={{
                height: `${clampedProgress}%`,
              }}
              transition={{ duration: 0.3 }}
            />
            {/* Depth marker */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground"
              style={{
                top: `calc(${clampedProgress}% - 6px)`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Depth text */}
          <motion.div
            className="text-center text-xs font-semibold text-white"
            key={depth}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>{depthLabels[depth]}</div>
            <div className="text-white text-[10px] mt-1">
              {clampedProgress.toFixed(0)}%
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Top progress bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-400 via-glow-blue to-blue-1000 z-50"
        style={{
          width: `${clampedProgress}%`,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
