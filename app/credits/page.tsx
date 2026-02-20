'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import DeepSeaFooter from '@/components/atlantis/Footer';

// ──────────────────────────────────────────────
// Add / remove contributors here
// image: path to a tombstone image in /public/images/credits/
//        when provided, the image is shown instead of the CSS tombstone
// ──────────────────────────────────────────────
interface Contributor {
  name: string;
  role: string;
  epitaph?: string; // fun one-liner on the tombstone
  image?: string;   // e.g. '/images/credits/devansh-goel.png'
}

const CONTRIBUTORS: Contributor[] = [
  { name: 'Devansh Goel', role: 'Lead Developer', epitaph: 'Coded till the ocean dried', image: '/images/credits/devansh-goel.png' },
  { name: 'Contributor 2', role: 'Designer', epitaph: 'Made pixels dance underwater' },
  { name: 'Contributor 3', role: 'Backend Sorcerer', epitaph: 'REST in peace… literally' },
  { name: 'Contributor 4', role: 'Frontend Wizard', epitaph: 'CSS was their last spell' },
  { name: 'Contributor 5', role: 'Content Writer', epitaph: 'Words lost in the deep' },
  { name: 'Contributor 6', role: 'Coordinator', epitaph: 'Managed the tides' },
];

// ──────────────────────────────────────────────

function Tombstone({ contributor, index }: { contributor: Contributor; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
      className="group flex flex-col items-center"
    >
      <motion.div
        whileHover={{ scale: 1.04, y: -6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative cursor-default select-none"
      >
        {/* Glow on hover */}
        <div className="absolute -inset-4 rounded-full bg-accent/0 group-hover:bg-accent/10 blur-2xl transition-all duration-700 pointer-events-none" />

        {contributor.image ? (
          /* ── Image-based tombstone ── */
          <div className="relative w-60 sm:w-72 md:w-80 flex flex-col items-center">
            <div className="relative w-full aspect-square">
              <Image
                src={contributor.image}
                alt={`R.I.P. ${contributor.name}`}
                fill
                className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
              />
            </div>
            {/* Role tag below image */}
            <p className="text-center text-amber-200/60 text-sm mt-3 tracking-wider uppercase">
              {contributor.role}
            </p>
            {contributor.epitaph && (
              <p className="text-center text-white/30 text-xs mt-1.5 italic leading-snug">
                &ldquo;{contributor.epitaph}&rdquo;
              </p>
            )}
          </div>
        ) : (
          /* ── CSS fallback tombstone ── */
          <div className="relative w-48 sm:w-56 md:w-60">
            {/* Arch top */}
            <div className="relative mx-auto rounded-t-[50%] bg-gradient-to-b from-[#3a3d42] via-[#2b2e33] to-[#22252a] border border-white/10 px-6 pt-10 pb-6 shadow-[0_0_30px_rgba(0,0,0,0.6),inset_0_2px_8px_rgba(255,255,255,0.05)]">
              {/* Stone texture */}
              <div className="absolute inset-0 rounded-t-[50%] opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
              <p className="text-center text-amber-200/90 text-sm tracking-[0.25em] font-semibold mb-2 drop-shadow-[0_0_6px_rgba(215,174,69,0.4)]">
                R.I.P.
              </p>
              <h3 className="text-center text-amber-100/95 text-lg sm:text-xl font-bold leading-tight drop-shadow-[0_0_8px_rgba(215,174,69,0.3)]"
                style={{ fontFamily: 'serif' }}>
                {contributor.name}
              </h3>
              <p className="text-center text-amber-200/60 text-xs mt-2 tracking-wider uppercase">
                {contributor.role}
              </p>
              {contributor.epitaph && (
                <p className="text-center text-white/30 text-[10px] mt-3 italic leading-snug">
                  &ldquo;{contributor.epitaph}&rdquo;
                </p>
              )}
            </div>
            {/* Pedestal */}
            <div className="relative mx-auto">
              <div className="h-3 bg-gradient-to-b from-[#2b2e33] to-[#1e2025] border-x border-b border-white/5" />
              <div className="h-4 -mx-2 bg-gradient-to-b from-[#25282d] to-[#1a1c20] border border-white/5 shadow-md" />
              <div className="h-3 -mx-4 bg-gradient-to-b from-[#1f2125] to-[#15171a] border border-white/5 shadow-lg" />
            </div>
            {/* Flowers */}
            <div className="flex justify-center -mt-1 gap-1">
              <span className="text-red-500/80 text-xs">🌹</span>
              <span className="text-red-500/80 text-xs">🥀</span>
              <span className="text-red-500/80 text-xs">🌹</span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Floating underwater particles (deterministic to avoid hydration mismatch)
// ──────────────────────────────────────────────
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  w: [3.2, 4.8, 2.5, 5.1, 3.9, 2.1, 4.3, 3.6, 5.5, 2.8, 4.1, 3.3, 5.8, 2.3, 4.6, 3.0, 5.3, 2.7][i],
  h: [4.1, 3.5, 5.2, 2.9, 4.7, 3.1, 5.6, 2.4, 4.4, 3.8, 5.0, 2.6, 4.9, 3.4, 5.4, 2.2, 4.2, 3.7][i],
  x: [8, 52, 27, 71, 15, 89, 43, 63, 34, 5, 78, 95, 20, 58, 47, 83, 11, 37][i],
  y: [12, 68, 35, 82, 50, 24, 91, 7, 73, 45, 60, 18, 87, 30, 55, 3, 77, 42][i],
  travel: [32, 48, 25, 55, 38, 22, 45, 30, 52, 28, 42, 35, 50, 26, 40, 33, 47, 29][i],
  dur: [5.2, 7.8, 4.5, 9.1, 6.3, 8.0, 5.8, 7.1, 9.5, 4.8, 6.9, 8.4, 5.1, 7.5, 9.8, 6.0, 8.7, 4.3][i],
  delay: [0.5, 2.1, 1.3, 3.5, 0.8, 2.7, 1.9, 3.1, 0.3, 2.4, 1.6, 3.8, 0.6, 2.9, 1.1, 3.3, 0.9, 2.0][i],
  bg: i % 3 === 0
    ? 'rgba(112, 200, 220, 0.3)'
    : i % 3 === 1
      ? 'rgba(215, 174, 69, 0.2)'
      : 'rgba(255, 255, 255, 0.1)',
}));

function GraveyardParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.w,
            height: p.h,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.bg,
          }}
          animate={{
            y: [0, -p.travel, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────
export default function CreditsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden footer-bg-texture">
      {/* Back button */}
      <div className="fixed top-8 left-8 z-50">
        <Link
          href="/"
          className="group flex items-center gap-2 px-6 py-3 rounded-full border border-accent/30 bg-deep-ocean/80 backdrop-blur-sm text-accent hover:text-white hover:border-accent/60 transition-all duration-300"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>

      <main className="relative py-32 px-4 sm:px-8">
        <GraveyardParticles />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-100 to-amber-300/60 drop-shadow-lg">
            The Fallen Crew
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-white/40 text-sm sm:text-base max-w-xl mx-auto mb-20 leading-relaxed"
        >
          These brave souls poured their hearts into bringing Atlantis to life.
          <br />
          They may rest now, but their code lives on in the deep.
        </motion.p>

        {/* Tombstone grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 sm:gap-12 justify-items-center">
          {CONTRIBUTORS.map((contributor, i) => (
            <Tombstone key={contributor.name} contributor={contributor} index={i} />
          ))}
        </div>

        {/* Bottom fog effect */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none" />
      </main>

      <DeepSeaFooter />
    </div>
  );
}
