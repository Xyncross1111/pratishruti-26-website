'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const timeline = [
  {
    date: 'March 1-3',
    phase: 'Opening Ceremony',
    description: 'Dive into the mystical world as gates of Atlantis open',
    alignment: 'left',
  },
  {
    date: 'March 4-6',
    phase: 'Main Events',
    description: 'Experience the grand events across all categories',
    alignment: 'right',
  },
  {
    date: 'March 7',
    phase: 'Pro Shows',
    description: 'Witness extraordinary performances by renowned artists',
    alignment: 'left',
  },
  {
    date: 'March 8',
    phase: 'Closing Ceremony',
    description: 'Treasure reveal and celebration of champions',
    alignment: 'right',
  },
];

export default function RuinsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Background image layer */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'url(/images/atlantis-ruins.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Darkening overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-ocean/40 via-deep-ocean/60 to-deep-ocean/40" />

      {/* Animated separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-accent/50 to-transparent" />

      {/* Ancient pillar decorations */}
      <motion.div
        className="absolute top-10 left-5 md:left-20 w-1 h-32 bg-gradient-to-b from-gold-accent/30 to-transparent opacity-50"
        style={{ y: bgY }}
      />
      <motion.div
        className="absolute top-32 right-5 md:right-20 w-1 h-32 bg-gradient-to-b from-accent/30 to-transparent opacity-50"
        style={{ y: bgY }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Chronicle of Atlantis
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Event Timeline
          </h2>
          <p className="text-muted-foreground">
            Follow the timeline as we descend through the ages of Atlantis
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: item.alignment === 'left' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true, margin: '-50px' }}
              className="relative"
            >
              <div className={`flex items-center ${item.alignment === 'right' ? 'flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className={`flex-1 ${item.alignment === 'right' ? 'text-right pr-12' : 'pl-12'}`}>
                  <motion.div
                    className="p-6 bg-gradient-to-br from-primary/20 to-secondary/10 border border-accent/30 rounded-lg hover:border-accent/60 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-accent text-sm font-semibold tracking-wider uppercase">
                      {item.date}
                    </p>
                    <h3 className="text-2xl font-bold text-foreground mt-2 mb-2">
                      {item.phase}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                </div>

                {/* Center marker */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    className="w-4 h-4 rounded-full bg-accent border-4 border-deep-ocean"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Connecting line */}
              {index < timeline.length - 1 && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-px h-12 bg-gradient-to-b from-accent/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
