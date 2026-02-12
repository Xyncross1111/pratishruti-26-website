'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Jellyfish, Seahorse, Pearl, Bubble } from './MarineSVGs';

export default function DeepSea() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setScrollY(Math.max(0, -rect.top));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const darkness = Math.min(scrollY / 300, 0.7);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Atlantis structure background image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/images/atlantis-structure.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Deep ocean background that darkens on scroll */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: `linear-gradient(to bottom, oklch(0.15 0.02 250), oklch(${0.08 + darkness * 0.07} 0.01 250))`,
        }}
      />

      {/* Bioluminescent glow orbs and marine elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            initial={{
              opacity: 0,
              x: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              width: 200 + i * 50 + 'px',
              height: 200 + i * 50 + 'px',
              background: i % 2 === 0 ? 'rgba(112, 200, 220, 0.1)' : 'rgba(100, 180, 220, 0.08)',
            }}
          />
        ))}

        {/* Jellyfish decorations */}
        <Jellyfish className="absolute w-16 h-24 opacity-40 top-1/4 left-10" />
        <Jellyfish className="absolute w-12 h-20 opacity-30 top-1/3 right-20" />

        {/* Seahorse elements */}
        <Seahorse className="absolute w-8 h-16 opacity-35 top-1/2 left-1/4" />
        <Seahorse className="absolute w-6 h-14 opacity-25 bottom-1/4 right-1/3" />

        {/* Pearl accents */}
        <Pearl className="absolute w-10 h-10 opacity-40 top-40 right-40" />
        <Pearl className="absolute w-8 h-8 opacity-30 bottom-40 left-1/3" />

        {/* Floating bubbles */}
        {[...Array(5)].map((_, i) => (
          <Bubble
            key={`bubble-${i}`}
            delay={i * 0.4}
            className="absolute w-6 h-6"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}

          />
        ))}
      </div>

      {/* Sponsors strip */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          style={{ opacity }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Blessed by Atlantean Powers
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
            Sponsors & Partners
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sponsor) => (
            <motion.div
              key={sponsor}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-8 bg-primary/10 border border-accent/20 rounded-lg flex items-center justify-center hover:border-accent/50 transition-colors duration-300"
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/30 to-accent/10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-accent font-bold">S{sponsor}</span>
                </div>
                <p className="text-xs text-muted-foreground">Sponsor {sponsor}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* About theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-secondary/20 to-primary/10 border border-accent/30 rounded-lg p-8 md:p-12 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-foreground mb-4">
            The Legend of Atlantis
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            In the depths of ancient history lies Atlantis, a civilization of unimaginable brilliance and mystery. As we gather to celebrate Pratishruti, we dive into this legendary world—exploring the intersection of art, culture, and innovation just as the Atlanteans once bridged the mundane and the magical.
          </p>
          <p className="text-accent text-sm font-semibold">
            Unearth the treasures of knowledge, creativity, and connection.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
