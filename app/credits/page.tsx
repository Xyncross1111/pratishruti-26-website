'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import localFont from 'next/font/local';
import DeepSeaFooter from '@/components/atlantis/Footer';
import { useMemo } from 'react';

// ──────────────────────────────────────────────
interface Contributor {
  name: string;
  role: string;
  epitaph?: string;
}

const CONTRIBUTORS: Contributor[] = [
  { name: `Dr. Gaurav\nGoyal`, role: `Director,\nStudents' Welfare` },
  { name: 'Dr. Devishree\nNaidu', role: 'Pratishruti\nIncharge' },
  { name: 'Dr. Shubham\nAnjankar', role: 'Pratishruti\nCo-Incharge'},
  { name: 'Dr. Alok Jha ', role: `Overall Incharge,\nStudents' Welfare`},
  { name: 'Pranav Soni', role: 'SRC'},
  { name: 'Rishi Pande', role: 'SRC'},
  { name: 'Anas Khan', role: 'SRC' },
  { name: `Sanskar\nKrishnani`, role: 'SRC' },
  { name: 'Vallaki\nMandaogane', role: 'SRC' },
  { name: 'Devansh Goel', role: 'Developer' },
  { name: 'Soumya\nAgrawal', role: 'Developer' },
  { name: 'Vyakhya\nGoyal', role: 'Developer' },
  { name: 'Diyansh\nWasnik', role: 'Developer' },
  { name: 'Abbas Nadir', role: 'Developer' },
  { name: 'Shamit\nBundela', role: 'Developer' },
  { name: 'Tejas\nSawjiyani', role: 'Developer' },
  { name: 'Khilendra\nPorgade', role: 'Developer' },
];

// ──────────────────────────────────────────────

function SeashellCard({ contributor, index }: { contributor: Contributor; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative flex flex-col items-center"
    >
      <motion.div 
        // whileHover={{ y: -10 }}
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
          {/* <h3 className="text-amber-100 font-bold text-lg sm:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-20 whitespace-pre-line">
            {contributor.name}
          </h3> */}

           <motion.h1
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration:5,
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
          <p className="italic bold text-cyan-200/70 text-sm sm:text-sm uppercase tracking-widest mt-15 font-medium whitespace-pre-line ">
            {contributor.role}
          </p>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-cyan-500/10 blur-[60px] rounded-full opacity-0 transition-opacity duration-500" />
      </motion.div>
    </motion.div>
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