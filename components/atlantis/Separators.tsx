'use client';

import { motion } from 'framer-motion';

export function WaveSeparator({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 60"
      className={className}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M0,30 Q300,10 600,30 T1200,30 L1200,60 L0,60 Z"
        fill="url(#waveSepGrad)"
        animate={{
          d: [
            'M0,30 Q300,10 600,30 T1200,30 L1200,60 L0,60 Z',
            'M0,35 Q300,15 600,35 T1200,35 L1200,60 L0,60 Z',
            'M0,30 Q300,10 600,30 T1200,30 L1200,60 L0,60 Z',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <defs>
        <linearGradient id="waveSepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(112, 200, 220)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="rgb(70, 130, 180)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function DecorationDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Center glyph */}
      <motion.circle
        cx="100"
        cy="20"
        r="4"
        fill="currentColor"
        className="text-accent"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Left and right lines */}
      <line x1="20" y1="20" x2="85" y2="20" stroke="currentColor" strokeWidth="1" className="text-accent/50" />
      <line x1="115" y1="20" x2="180" y2="20" stroke="currentColor" strokeWidth="1" className="text-accent/50" />

      {/* Decorative dots */}
      <circle cx="35" cy="20" r="1.5" fill="currentColor" className="text-accent/40" opacity="0.6" />
      <circle cx="165" cy="20" r="1.5" fill="currentColor" className="text-accent/40" opacity="0.6" />
    </svg>
  );
}

export function RunePattern({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Atlantean rune pattern */}
      <motion.g
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <text x="50" y="28" fontSize="24" textAnchor="middle" fill="currentColor" className="text-accent">
          Ⱦ
        </text>
      </motion.g>
    </svg>
  );
}

export function CoralFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        {/* Curved flourish lines */}
        <path d="M20 40 Q60 20 100 40" stroke="currentColor" strokeWidth="1.5" className="text-accent/60" />
        <path d="M20 40 Q60 60 100 40" stroke="currentColor" strokeWidth="1.5" className="text-accent/60" />

        {/* Decorative branches */}
        <circle cx="35" cy="30" r="2" fill="currentColor" className="text-accent/50" />
        <circle cx="65" cy="20" r="2" fill="currentColor" className="text-accent/50" />
        <circle cx="85" cy="35" r="2" fill="currentColor" className="text-accent/50" />
        <circle cx="65" cy="60" r="2" fill="currentColor" className="text-accent/50" />
        <circle cx="35" cy="50" r="2" fill="currentColor" className="text-accent/50" />
      </motion.g>
    </svg>
  );
}

export function GlowingDots({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 20"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle
          key={i}
          cx={15 + i * 20}
          cy="10"
          r="2"
          fill="currentColor"
          className="text-accent"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </svg>
  );
}
