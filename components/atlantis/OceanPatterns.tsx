'use client';

import { motion } from 'framer-motion';

export function LightRays({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[1, 2, 3, 4, 5].map((ray) => (
        <motion.line
          key={ray}
          x1={40 * ray}
          y1="0"
          x2={40 * ray + 20}
          y2="400"
          stroke="rgba(112, 200, 220, 0.15)"
          strokeWidth="2"
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: ray * 0.2,
          }}
        />
      ))}
    </svg>
  );
}

export function WaterCaustics({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="causticFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {[0, 1, 2, 3].map((circle) => (
        <motion.circle
          key={circle}
          cx={100 + circle * 100}
          cy="200"
          r={60}
          stroke="rgba(112, 200, 220, 0.2)"
          strokeWidth="1"
          opacity="0.4"
          animate={{
            r: [40, 80, 40],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: circle * 0.5,
          }}
          filter="url(#causticFilter)"
        />
      ))}
    </svg>
  );
}

export function FloatingParticles({ count = 10, className }: { count?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 400 600"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[...Array(count)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 400}
          cy={Math.random() * 600}
          r={1 + Math.random() * 2}
          fill="rgba(112, 200, 220, 0.6)"
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </svg>
  );
}

export function BioluminescentGlow({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
      }}
    >
      {/* Outer rings */}
      <circle cx="100" cy="100" r="80" stroke="rgba(112, 200, 220, 0.4)" strokeWidth="1" />
      <circle cx="100" cy="100" r="60" stroke="rgba(112, 200, 220, 0.3)" strokeWidth="1" />
      <circle cx="100" cy="100" r="40" stroke="rgba(112, 200, 220, 0.2)" strokeWidth="1" />

      {/* Center glow */}
      <circle cx="100" cy="100" r="20" fill="rgba(112, 200, 220, 0.5)" filter="url(#glowFilter)" />

      <defs>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </motion.svg>
  );
}

export function TurbulentWater({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 200"
      className={className}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="turbulence">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" result="noise" seed="2" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
        </filter>
      </defs>

      <motion.path
        d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z"
        fill="url(#waterGrad)"
        filter="url(#turbulence)"
        animate={{
          d: [
            'M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z',
            'M0,110 Q300,60 600,110 T1200,110 L1200,200 L0,200 Z',
            'M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z',
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <defs>
        <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(112, 200, 220, 0.3)" />
          <stop offset="100%" stopColor="rgba(112, 200, 220, 0.1)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AncientRunes({ className }: { className?: string }) {
  const runes = ['Ⱦ', 'Ҁ', 'Ѡ', 'Ҁ', 'Ⱦ'];

  return (
    <svg
      viewBox="0 0 300 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {runes.map((rune, i) => (
        <motion.text
          key={i}
          x={30 + i * 60}
          y="50"
          fontSize="32"
          textAnchor="middle"
          fill="currentColor"
          className="text-accent/40"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            y: [50, 45, 50],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          {rune}
        </motion.text>
      ))}
    </svg>
  );
}
