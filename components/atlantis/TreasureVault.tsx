'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { TreasureChest, Pearl, Starfish, Coral } from './MarineSVGs';

export default function TreasureVault() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end center'],
  });

  const chestOpen = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const glowIntensity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Treasure chest background image */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'url(/images/treasure-chest.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Very dark ocean bed */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-ocean to-oklch(0.05 0 250)" />

      {/* Intense bioluminescent glow with marine elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          opacity: glowIntensity,
        }}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-glow-blue blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent blur-3xl opacity-15" />

        {/* Treasure-themed SVG elements */}
        <TreasureChest className="absolute w-24 h-20 opacity-30 top-20 right-20" />
        <TreasureChest className="absolute w-20 h-16 opacity-25 bottom-32 left-16" />

        {/* Pearl accents around treasure */}
        <Pearl className="absolute w-12 h-12 opacity-35 top-1/3 left-1/4" />
        <Pearl className="absolute w-10 h-10 opacity-30 top-2/3 right-1/4" />
        <Pearl className="absolute w-8 h-8 opacity-25 bottom-1/3 left-1/3" />

        {/* Starfish decorations */}
        <Starfish className="absolute w-16 h-16 opacity-30 bottom-40 right-1/3" />
        <Starfish className="absolute w-12 h-12 opacity-25 top-40 left-1/2" />

        {/* Coral */}
        <Coral className="absolute w-14 h-20 opacity-25 bottom-20 right-10" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            The Final Descent
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Unearth the Treasure
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            At the ocean bed lies the greatest treasure of Atlantis. Register now to unlock your destiny.
          </p>
        </motion.div>

        {/* Treasure chest reveal */}
        <div className="relative w-full max-w-md mx-auto h-64 md:h-80 flex items-center justify-center my-20">
          {/* Treasure chest base */}
          <motion.div
            className="absolute"
            style={{
              rotateX: chestOpen,
            }}
          >
            {/* Chest body */}
            <div className="relative w-48 h-32 bg-gradient-to-b from-gold-accent to-oklch(0.55 0.15 40) rounded-lg shadow-2xl border-4 border-gold-accent/50 flex items-end justify-center overflow-hidden">
              {/* Chest lid */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gold-accent to-oklch(0.55 0.15 40) rounded-t-lg origin-bottom border-b-2 border-gold-accent/50"
                style={{
                  rotateX: chestOpen,
                }}
              />

              {/* Glowing treasure inside */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: chestOpen,
                }}
              >
                <div className="absolute inset-4 bg-gradient-to-t from-glow-blue to-accent rounded-lg blur-2xl opacity-80" />
                <div className="relative text-5xl animate-bounce">💎</div>
              </motion.div>

              {/* Decorative gems */}
              {[1, 2, 3].map((gem) => (
                <motion.div
                  key={gem}
                  className="absolute text-2xl"
                  initial={{
                    x: -20 + gem * 20,
                    y: -10,
                    opacity: 0,
                  }}
                  animate={{
                    opacity: chestOpen,
                    y: [0, -30, -50],
                    x: [-20 + gem * 20, -30 + gem * 20, -40 + gem * 20],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: gem * 0.2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Light rays from treasure */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: glowIntensity,
            }}
          >
            {[1, 2, 3, 4].map((ray) => (
              <motion.div
                key={ray}
                className="absolute w-1 h-48 bg-gradient-to-b from-accent to-transparent opacity-60"
                style={{
                  rotate: (ray * 90).toString() + 'deg',
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Register CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="text-muted-foreground mb-6 text-sm">
            Limited slots available. Secure your place in history now.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-accent to-glow-blue text-deep-ocean font-bold text-lg rounded-lg transition-all duration-300"
            style={{
              boxShadow: '0 10px 15px -3px rgba(112, 200, 220, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(112, 200, 220, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(112, 200, 220, 0.3)';
            }}
          >
            Register For Pratishruti 2026
          </motion.button>
        </motion.div>

        {/* Sponsors footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-accent/30"
        >
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-6">
            Media Partners & Collaborators
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((partner) => (
              <div
                key={partner}
                className="px-4 py-3 rounded bg-accent/5 border border-accent/20 text-xs text-muted-foreground"
              >
                Partner {partner}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
