'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import localFont from 'next/font/local';
import DeepSeaFooter from '@/components/atlantis/Footer';
import { Coral, Pearl, Starfish, Bubble } from '@/components/atlantis/MarineSVGs';
import { useMemo, useState } from 'react';
import Image from 'next/image';

// ──────────────────────────────────────────────
interface Contributor {
  name: string;
  role: string;
  epitaph?: string;
  image?: string;
  github?: string;
}

const CONTRIBUTORS: Contributor[] = [
  { name: `Dr. Gaurav\nGoyal`, role: `Director,\nStudents' Welfare` },
  { name: 'Dr. Devishree\nNaidu', role: 'Pratishruti\nIncharge' },
  { name: 'Dr. Shubham\nAnjankar', role: 'Pratishruti\nCo-Incharge' },
  { name: 'Dr. Alok Jha ', role: `Overall Incharge,\nStudents' Welfare` },
  { name: 'Pranav Soni', role: 'SRC' },
  { name: 'Rishi Pande', role: 'SRC' },
  { name: 'Anas Khan', role: 'SRC' },
  { name: `Sanskar\nKrishnani`, role: 'SRC' },
  { name: 'Vallaki\nMandaogane', role: 'SRC' },
  { name: 'Devansh Goel', role: 'Developer', image: '/images/main-credits/devansh-goel-pfp.jpeg', github: 'https://github.com/DevanshG0el' },
  { name: 'Soumya\nAgrawal', role: 'Developer', image: '/images/main-credits/soumya-main.jpeg', github: 'https://github.com/soumyyaagrawal' },
  { name: 'Vyakhya\nGoyal', role: 'Developer', image: '/images/main-credits/vyakhya-main.jpeg', github: 'https://github.com/vyakhyaagoyal' },
  { name: 'Diyansh\nWasnik', role: 'Developer', image: '/images/main-credits/diyansh-main1.jpeg', github: 'https://github.com/wasrick321' },
  { name: 'Abbas Nadir', role: 'Developer', image: '/images/main-credits/abbas.jpeg' },
  { name: 'Shamit\nBundela', role: 'Developer', image: '/images/main-credits/shamit.jpeg', github: 'https://github.com/Shamit248' },
  { name: 'Tejas\nSawjiyani', role: 'Developer', image: '/images/main-credits/tejas.jpeg', github: 'https://github.com/tejas231006' },
  { name: 'Khilendra\nPorgade', role: 'Developer', image: '/images/main-credits/khilendra.jpeg', github: 'https://github.com/khilendra17' },
];

// ──────────────────────────────────────────────

function SeashellCard({ contributor, index }: { contributor: Contributor; index: number }) {
  const [showPopup, setShowPopup] = useState(false);
  const isClickable = !!contributor.image;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.1 }}
        className={`group relative flex flex-col items-center ${isClickable ? 'cursor-pointer' : ''}`}
        onClick={() => isClickable && setShowPopup(true)}
      >
        <motion.div
          className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center"
        >
          {/* The Seashell Video */}
          <video
            src="/seashell_final.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-contain mix-blend-screen brightness-110 transition-all"
          />

          {/* Text Overlay inside/on the shell */}
          <div className="relative z-10 text-center px-4 mt-4">
            <motion.h1
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                fontSize: "1rem",
                fontWeight: "bold"
              }}
              className='text-amber-200 font-bold text-xs sm:text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-20 whitespace-pre-line'
            >
              {contributor.name}
            </motion.h1>
            <p className="italic bold text-cyan-200/70 text-sm sm:text-sm uppercase tracking-widest mt-15 font-medium whitespace-pre-line">
              {contributor.role}
            </p>
          </div>

          {/* Glow Effect */}
          <div className="absolute inset-0 bg-cyan-500/10 blur-[60px] rounded-full opacity-0 transition-opacity duration-500" />
        </motion.div>
      </motion.div>

      {/* Popup overlay */}
      {showPopup && contributor.image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="relative w-full max-w-md sm:max-w-lg rounded-3xl p-8 sm:p-10 text-center overflow-hidden footer-bg-texture"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Deep ocean overlay */}
            <div className="absolute inset-0 bg-deep-ocean/80 pointer-events-none rounded-3xl" />

            {/* Aqua glow border */}
            <div className="absolute inset-0 rounded-3xl border border-accent/30 pointer-events-none" />

            {/* ── Animated Marine Decorations ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {/* Floating jellyfish */}
              <motion.img
                src="/footer/jellyfish.png"
                className="absolute -left-2 top-4 w-16 sm:w-20 opacity-50"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Swimming bio fish */}
              <motion.img
                src="/footer/bio.png"
                className="absolute right-2 top-6 w-12 sm:w-16 opacity-40"
                animate={{ y: [0, -8, 0], x: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Bottom plants */}
              <motion.img
                src="/footer/plant-left.png"
                className="absolute bottom-0 -left-2 w-20 sm:w-28 opacity-50"
                animate={{ rotate: [0, 3, -2, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.img
                src="/footer/plant-right.png"
                className="absolute bottom-0 -right-2 w-20 sm:w-28 opacity-50"
                animate={{ rotate: [2, -3, 2] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Swimming orange fish */}
              <motion.img
                src="/footer/orange.png"
                className="absolute bottom-16 w-10 sm:w-14 opacity-60"
                animate={{ x: ['-20%', '500%'], y: [0, -4, 2, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />

              {/* Marine SVG decorations */}
              <Coral className="absolute bottom-1 left-8 w-8 sm:w-10 opacity-40" />
              <Starfish className="absolute top-3 right-14 w-6 sm:w-8 opacity-30" />
              <Pearl className="absolute bottom-8 right-8 w-5 sm:w-7 opacity-35" />

              {/* Rising bubbles */}
              <Bubble delay={0} className="absolute bottom-4 left-[20%] w-3 opacity-30" />
              <Bubble delay={1.5} className="absolute bottom-8 left-[50%] w-2 opacity-25" />
              <Bubble delay={3} className="absolute bottom-2 left-[75%] w-4 opacity-20" />
            </div>

            {/* Top & bottom glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" />

            {/* ── Content ── */}
            <div className="relative z-10">
              {/* Close button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute -top-4 -right-4 sm:-top-2 sm:-right-2 w-8 h-8 flex items-center justify-center rounded-full bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 hover:text-white transition-all duration-300 text-sm"
              >
                ✕
              </button>

              {/* Photo with glowing ring */}
              <div className="relative mx-auto mb-6 w-56 h-56 sm:w-64 sm:h-64">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-accent/30 to-cyan-400/20 blur-lg" />
                <div className="absolute inset-1 rounded-full bg-gradient-to-b from-accent/40 via-cyan-300/25 to-accent/30 p-[3px]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-deep-ocean">
                    <Image
                      src={contributor.image}
                      alt={contributor.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-5" />

              {/* Name */}
              <h3 className="text-foreground font-bold text-2xl sm:text-3xl whitespace-pre-line mb-2 drop-shadow-[0_0_8px_rgba(215,174,69,0.3)]">
                {contributor.name}
              </h3>
              <p className="text-accent/60 text-sm sm:text-base uppercase tracking-[0.2em] font-medium mb-6 whitespace-pre-line">
                {contributor.role}
              </p>

              {/* GitHub link */}
              {contributor.github && (
                <motion.a
                  href={contributor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 hover:text-white transition-all duration-300 text-sm sm:text-base font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub Profile
                </motion.a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

// ──────────────────────────────────────────────

export default function CreditsPage() {
  // UseMemo prevents the "shuffle" from recalculating on every hover/re-render
  const { topCrew, remainingCrew } = useMemo(() => {
    const top = CONTRIBUTORS.slice(0, 4);

    const remaining = CONTRIBUTORS.slice(4);
    // keeps original order (SRC first, then Developers)

    return {
      topCrew: top,
      remainingCrew: remaining,
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden site-ocean-bg bg-[#020617]">
      {/* Back button */}
      <div className="fixed top-8 left-8 z-50">
        <Link
          href="/"
          className="group flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-500/30 bg-black/40 backdrop-blur-md text-cyan-400 hover:text-white hover:border-cyan-400 transition-all duration-300"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Surface Level</span>
        </Link>
      </div>

      <main className="relative py-32 px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-cyan-100 via-white to-cyan-300/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Treasures of the Deep
          </h1>
          <p className="mt-6 text-cyan-100/40 italic font-light max-w-xl mx-auto">
            The architects of Atlantis. Their contributions are etched into the pearls of the ocean floor.
          </p>
        </motion.div>

        {/* Seashell Grid */}
        {/* ───────────── Top 4 (Leadership) ───────────── */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-8 justify-items-center mb-20">
          {topCrew.map((contributor, i) => (
            <SeashellCard key={contributor.name} contributor={contributor} index={i} />
          ))}
        </div>

        {/* ───────────── SRC + Developers (Continuous Grid) ───────────── */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-8 justify-items-center">
          {remainingCrew.map((contributor, i) => (
            <SeashellCard key={contributor.name} contributor={contributor} index={i + 4} />
          ))}
        </div>

        {/* Bottom Sand/Mist Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      </main>

      <DeepSeaFooter />
    </div>
  );

}