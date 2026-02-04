'use client';

import { motion } from 'framer-motion';

export function Coral({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Main coral stem */}
        <path d="M50 120 Q48 100 50 80 Q52 60 50 40" stroke="url(#coralGrad)" strokeWidth="3" />

        {/* Left branches */}
        <path d="M50 80 Q35 75 25 70" stroke="url(#coralGrad)" strokeWidth="2" />
        <path d="M50 60 Q30 55 15 50" stroke="url(#coralGrad)" strokeWidth="2" />
        <path d="M50 40 Q40 35 30 30" stroke="url(#coralGrad)" strokeWidth="2" />

        {/* Right branches */}
        <path d="M50 80 Q65 75 75 70" stroke="url(#coralGrad)" strokeWidth="2" />
        <path d="M50 60 Q70 55 85 50" stroke="url(#coralGrad)" strokeWidth="2" />
        <path d="M50 40 Q60 35 70 30" stroke="url(#coralGrad)" strokeWidth="2" />

        {/* Coral polyps */}
        <circle cx="50" cy="80" r="3" fill="#E8A55F" />
        <circle cx="35" cy="75" r="2" fill="#E8A55F" />
        <circle cx="65" cy="75" r="2" fill="#E8A55F" />
        <circle cx="50" cy="60" r="3" fill="#E8A55F" />
        <circle cx="30" cy="55" r="2" fill="#E8A55F" />
        <circle cx="70" cy="55" r="2" fill="#E8A55F" />

        <defs>
          <linearGradient id="coralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B4A" />
            <stop offset="100%" stopColor="#E8A55F" />
          </linearGradient>
        </defs>
      </motion.g>
    </svg>
  );
}

export function Starfish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g
        animate={{ rotate: [0, 5, 0, -5, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* Main body - 5 arms */}
        <path
          d="M50 10 Q60 30 70 40 L80 50 Q70 60 50 70 L30 60 Q20 50 10 50 L30 40 Q40 30 50 10 Z"
          fill="#E87E6E"
          opacity="0.8"
        />

        {/* Arm 1 */}
        <circle cx="50" cy="15" r="8" fill="#F59E8D" />

        {/* Arm 2 */}
        <circle cx="72" cy="42" r="8" fill="#F59E8D" />

        {/* Arm 3 */}
        <circle cx="52" cy="68" r="8" fill="#F59E8D" />

        {/* Arm 4 */}
        <circle cx="28" cy="68" r="8" fill="#F59E8D" />

        {/* Arm 5 */}
        <circle cx="15" cy="40" r="8" fill="#F59E8D" />

        {/* Center details */}
        <circle cx="50" cy="45" r="12" fill="url(#starfishGrad)" />

        <defs>
          <radialGradient id="starfishGrad">
            <stop offset="0%" stopColor="#FFB8A3" />
            <stop offset="100%" stopColor="#E87E6E" />
          </radialGradient>
        </defs>
      </motion.g>
    </svg>
  );
}

export function Bubble({ delay = 0, className }: { delay?: number; className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{
        y: [0, -200, -400],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        delay,
        ease: 'easeIn',
      }}
    >
      <circle cx="20" cy="20" r="18" stroke="rgba(112, 200, 220, 0.4)" strokeWidth="2" />
      <circle cx="26" cy="14" r="3" fill="rgba(255, 255, 255, 0.3)" />
    </motion.svg>
  );
}

export function Fish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Body */}
        <ellipse cx="50" cy="30" rx="25" ry="15" fill="#4A90E2" />

        {/* Head */}
        <circle cx="70" cy="30" r="12" fill="#5BA3F5" />

        {/* Tail */}
        <path
          d="M25 30 L10 15 L15 30 L10 45 Z"
          fill="#2E5C8A"
          opacity="0.8"
        />

        {/* Fin */}
        <path
          d="M50 15 Q55 10 58 15 L55 20 Z"
          fill="#5BA3F5"
          opacity="0.6"
        />

        {/* Eye */}
        <circle cx="72" cy="28" r="2" fill="white" />
        <circle cx="72" cy="28" r="1" fill="black" />

        {/* Gill */}
        <path
          d="M60 25 Q65 25 65 35"
          stroke="#2E5C8A"
          strokeWidth="1"
          opacity="0.5"
        />
      </motion.g>
    </svg>
  );
}

export function Jellyfish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        {/* Bell */}
        <path
          d="M30 10 Q15 15 10 35 Q8 50 15 65 Q30 80 45 65 Q52 50 50 35 Q45 15 30 10"
          fill="url(#jellyfishGrad)"
        />

        {/* Tentacle 1 */}
        <path
          d="M22 65 Q18 75 15 90"
          stroke="url(#jellyfishGrad)"
          strokeWidth="2"
          opacity="0.8"
        />

        {/* Tentacle 2 */}
        <path
          d="M30 65 Q30 78 28 95"
          stroke="url(#jellyfishGrad)"
          strokeWidth="2"
          opacity="0.8"
        />

        {/* Tentacle 3 */}
        <path
          d="M38 65 Q42 75 45 90"
          stroke="url(#jellyfishGrad)"
          strokeWidth="2"
          opacity="0.8"
        />

        {/* Center glow */}
        <circle cx="30" cy="35" r="8" fill="rgba(112, 200, 220, 0.4)" />

        <defs>
          <linearGradient id="jellyfishGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#70C8DC" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4A8FB8" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </motion.g>
    </svg>
  );
}

export function Seaweed({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g
        animate={{
          x: [0, 2, 0, -2, 0],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Main stem */}
        <path
          d="M20 120 Q18 90 20 60 Q22 30 20 0"
          stroke="url(#seaweedGrad)"
          strokeWidth="2.5"
        />

        {/* Left leaves */}
        <path
          d="M20 80 Q10 78 8 85"
          stroke="url(#seaweedGrad)"
          strokeWidth="2"
          opacity="0.7"
        />
        <path
          d="M20 50 Q8 48 5 58"
          stroke="url(#seaweedGrad)"
          strokeWidth="2"
          opacity="0.7"
        />

        {/* Right leaves */}
        <path
          d="M20 80 Q30 78 32 85"
          stroke="url(#seaweedGrad)"
          strokeWidth="2"
          opacity="0.7"
        />
        <path
          d="M20 50 Q32 48 35 58"
          stroke="url(#seaweedGrad)"
          strokeWidth="2"
          opacity="0.7"
        />

        <defs>
          <linearGradient id="seaweedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E8B57" />
            <stop offset="100%" stopColor="#1A5C3A" />
          </linearGradient>
        </defs>
      </motion.g>
    </svg>
  );
}

export function TreasureChest({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g
        animate={{ rotateZ: [0, 2, 0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* Chest body */}
        <rect x="20" y="35" width="60" height="35" rx="4" fill="#8B7355" stroke="#5C4033" strokeWidth="2" />

        {/* Chest top/lid */}
        <path d="M20 35 Q50 20 80 35" fill="#A0826D" stroke="#5C4033" strokeWidth="2" />

        {/* Lock */}
        <rect x="47" y="45" width="6" height="8" fill="#D4AF37" rx="1" />
        <circle cx="50" cy="48" r="1.5" fill="#8B6F47" />

        {/* Bands */}
        <rect x="18" y="50" width="64" height="3" fill="#D4AF37" opacity="0.8" />

        {/* Shine effect */}
        <ellipse cx="35" cy="55" rx="8" ry="4" fill="rgba(255, 255, 255, 0.2)" />

        {/* Gold coins visible inside */}
        <circle cx="40" cy="60" r="3" fill="#FFD700" opacity="0.7" />
        <circle cx="55" cy="62" r="3" fill="#FFD700" opacity="0.7" />
        <circle cx="65" cy="58" r="3" fill="#FFD700" opacity="0.7" />
      </motion.g>
    </svg>
  );
}

export function Pearl({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{ duration: 2.5, repeat: Infinity }}
    >
      {/* Outer glow */}
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke="rgba(112, 200, 220, 0.3)"
        strokeWidth="1"
      />

      {/* Pearl body */}
      <circle cx="20" cy="20" r="12" fill="url(#pearlGrad)" />

      {/* Highlight */}
      <ellipse cx="16" cy="16" rx="5" ry="4" fill="rgba(255, 255, 255, 0.6)" />

      <defs>
        <radialGradient id="pearlGrad">
          <stop offset="0%" stopColor="#F0F8FF" />
          <stop offset="70%" stopColor="#E0E8F0" />
          <stop offset="100%" stopColor="#D0D8E8" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
}

export function Seahorse({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 50 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Head */}
        <circle cx="25" cy="20" r="8" fill="#E91E63" />

        {/* Snout */}
        <path d="M32 20 L40 22 L38 25 Z" fill="#E91E63" />

        {/* Eye */}
        <circle cx="28" cy="18" r="1.5" fill="white" />

        {/* Body */}
        <path d="M25 28 Q23 35 22 45 Q21 60 25 75" stroke="#E91E63" strokeWidth="4" />

        {/* Dorsal fin */}
        <path
          d="M25 30 Q28 28 30 32 Q28 35 25 33"
          fill="#F48FB1"
          opacity="0.8"
        />

        {/* Tail curve */}
        <path d="M25 75 Q30 78 28 85" stroke="#E91E63" strokeWidth="3" fill="none" />

        {/* Belly detail */}
        <path
          d="M25 40 Q26 45 25 50"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
        />
      </motion.g>
    </svg>
  );
}
