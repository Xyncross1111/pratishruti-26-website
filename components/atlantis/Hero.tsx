'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Bubble, Coral, Fish, Jellyfish, Seaweed } from './MarineSVGs';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExplore = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Layers with Parallax */}
      <div className="absolute inset-0 z-0">
        {/* Sky gradient to water */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, oklch(0.4 0.08 200) 0%, oklch(0.35 0.06 210) 30%, oklch(0.25 0.04 220) 70%, oklch(0.15 0.02 240) 100%)',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        {/* Light rays */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 200px,
                rgba(112, 200, 220, 0.1) 200px,
                rgba(112, 200, 220, 0.1) 400px
              )
            `,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />

        {/* Animated wave overlay */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-32 opacity-30"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,60 Q300,30 600,60 T1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                'M0,60 Q300,30 600,60 T1200,60 L1200,120 L0,120 Z',
                'M0,70 Q300,40 600,70 T1200,70 L1200,120 L0,120 Z',
                'M0,60 Q300,30 600,60 T1200,60 L1200,120 L0,120 Z',
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(112, 200, 220)" />
              <stop offset="100%" stopColor="rgb(70, 130, 180)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Animated Bubbles and Marine Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating bubbles */}
          {[...Array(8)].map((_, i) => (
            <Bubble
              key={`bubble-${i}`}
              delay={i * 0.3}
              className="absolute w-8 h-8"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 80}%`,
              }}
            />
          ))}

          {/* Coral decorations */}
          <Coral className="absolute w-16 h-24 opacity-40 bottom-20 left-5" />
          <Coral className="absolute w-12 h-20 opacity-30 bottom-32 right-10" />

          {/* Seaweed */}
          <Seaweed className="absolute w-8 h-32 opacity-35 bottom-20 left-1/4" />
          <Seaweed className="absolute w-8 h-24 opacity-25 bottom-24 right-1/3" />

          {/* Fish swimming effect */}
          <Fish className="absolute w-12 h-8 opacity-40 top-1/3 left-1/4" />
          <Fish className="absolute w-10 h-6 opacity-30 top-1/2 right-1/4" />

          {/* Jellyfish */}
          <Jellyfish className="absolute w-10 h-16 opacity-35 bottom-1/3 right-20" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-2"
        >
          <h2 className="text-accent text-sm font-semibold tracking-widest uppercase">
            Dive Deeper
          </h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl md:text-8xl font-bold text-foreground mb-4 tracking-tight"
        >
          Pratishruti
          <br />
          <span className="text-accent">2026</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Atlas of Atlantis
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm text-muted-foreground mb-12"
        >
          RCOEM • Nagpur
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleExplore}
            className="px-8 py-3 bg-accent text-deep-ocean font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(112, 200, 220, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)';
            }}
          >
            Explore Events
          </button>
          <button className="px-8 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors duration-300">
            Register Now
          </button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-accent"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={handleExplore}
        aria-label="Scroll to explore"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
}
