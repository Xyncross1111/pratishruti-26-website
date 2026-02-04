'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Pearl } from './MarineSVGs';

export default function AnimatedTreasureBox() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end center'],
  });

  // Lid rotation - opens from 0 to -90 degrees
  const lidRotation = useTransform(scrollYProgress, [0.3, 0.7], [0, -75]);
  const lidY = useTransform(scrollYProgress, [0.3, 0.7], [0, -20]);

  // Gold shine effect
  const shineOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.6, 0.3]);

  // Register content fade in
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.5, 0.8], [20, 0]);

  // Gems floating
  const gem1Y = useTransform(scrollYProgress, [0.4, 0.8], [100, -50]);
  const gem2Y = useTransform(scrollYProgress, [0.45, 0.8], [100, -40]);
  const gem3Y = useTransform(scrollYProgress, [0.5, 0.8], [100, -30]);

  return (
    <section id="register" ref={sectionRef} className="relative py-20 md:py-40 px-4 overflow-hidden">
      {/* Very dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-ocean via-oklch(0.08 0.01 250) to-oklch(0.05 0 250)" />

      {/* Bioluminescent glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-glow-blue blur-3xl"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent blur-3xl"
          animate={{ opacity: [0.05, 0.2, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

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
            Scroll down to unveil the greatest treasure of Atlantis
          </p>
        </motion.div>

        {/* Treasure Box Container */}
        <div className="relative w-full max-w-md mx-auto h-96 md:h-[450px] flex items-center justify-center perspective">
          {/* Box shadow base */}
          <div className="absolute bottom-0 w-64 h-4 bg-black/30 rounded-full blur-2xl" />

          {/* TREASURE BOX STRUCTURE */}
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Box base/body */}
            <motion.div
              className="absolute inset-0 rounded-lg border-4 border-gold-accent/60 bg-gradient-to-b from-orange-600 to-amber-700 overflow-hidden"
              style={{
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.5), 0 0 30px rgba(215, 174, 69, 0.3)',
              }}
            >
              {/* Wood texture pattern */}
              <div className="absolute inset-0 opacity-30 bg-repeat" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 2px, transparent 2px, transparent 4px)',
              }} />

              {/* Locked symbol when closed */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20"
                style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5], [1, 0]) }}
              >
                <div className="text-5xl">🔒</div>
              </motion.div>

              {/* Treasure contents - appears as box opens */}
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-center opacity-0 pointer-events-none">
                {/* Gems peeking out */}
                <div className="flex gap-4 mb-4">
                  <div 
                    className="w-6 h-6 rounded-full bg-red-400" 
                    style={{ boxShadow: '0 0 10px rgba(244, 63, 94, 0.6)' }}
                  />
                  <div 
                    className="w-6 h-6 rounded-full bg-blue-400" 
                    style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)' }}
                  />
                  <div 
                    className="w-6 h-6 rounded-full bg-green-400" 
                    style={{ boxShadow: '0 0 10px rgba(74, 222, 128, 0.6)' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* LID - Opens upward */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 md:w-80 h-20 md:h-24 rounded-t-lg border-4 border-gold-accent/60 bg-gradient-to-b from-amber-500 to-orange-600 origin-bottom z-30 cursor-pointer"
              style={{
                rotateX: lidRotation,
                y: lidY,
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), 0 10px 30px rgba(215, 174, 69, 0.4)',
              }}
            >
              {/* Lid handle */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 border-2 border-gold-accent/80 shadow-lg" />

              {/* Decorative lock on lid */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-2xl">🔐</div>

              {/* Wood grain on lid */}
              <div className="absolute inset-0 opacity-20 bg-repeat rounded-t-lg" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 2px, transparent 2px, transparent 4px)',
              }} />
            </motion.div>

            {/* Shine effect on lid */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 md:w-80 h-20 md:h-24 rounded-t-lg pointer-events-none"
              style={{
                opacity: shineOpacity,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
                rotateX: lidRotation,
                y: lidY,
              }}
            />

            {/* Floating gems emerging from box */}
            <motion.div
              className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-red-400 z-40 pointer-events-none"
              style={{
                y: gem1Y,
                opacity: useTransform(scrollYProgress, [0.4, 0.8], [0, 1]),
                boxShadow: '0 0 12px rgba(244, 63, 94, 0.8)',
              }}
            />
            <motion.div
              className="absolute top-1/3 left-1/2 w-5 h-5 rounded-full bg-blue-400 z-40 pointer-events-none"
              style={{
                y: gem2Y,
                opacity: useTransform(scrollYProgress, [0.45, 0.8], [0, 1]),
                boxShadow: '0 0 12px rgba(59, 130, 246, 0.8)',
              }}
            />
            <motion.div
              className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-green-400 z-40 pointer-events-none"
              style={{
                y: gem3Y,
                opacity: useTransform(scrollYProgress, [0.5, 0.8], [0, 1]),
                boxShadow: '0 0 12px rgba(74, 222, 128, 0.8)',
              }}
            />
          </div>
        </div>

        {/* Register Content - appears as box opens */}
        <motion.div
          className="mt-16 max-w-2xl mx-auto"
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
        >
          <div className="p-8 rounded-lg border border-accent/40 bg-gradient-to-br from-primary/20 to-secondary/10 backdrop-blur-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Register Now
            </h3>
            <p className="text-muted-foreground mb-6">
              Secure your place in the legends of Atlantis. Join thousands of explorers on this oceanic journey.
            </p>
            <button className="px-8 py-4 bg-accent text-deep-ocean font-bold rounded-lg hover:bg-accent/90 transition-all transform hover:scale-105 text-lg">
              Claim Your Spot
            </button>
          </div>

          {/* Treasure value indicator */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">500</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Spots Left</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">∞</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Possibilities</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">1</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Destiny</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
