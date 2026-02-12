'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Jellyfish } from './MarineSVGs';

const timelineEvents = [
  {
    date: 'March 1-3',
    phase: 'Opening Ceremony',
    description: 'Dive into the mystical world as gates of Atlantis open',
  },
  {
    date: 'March 4-6',
    phase: 'Main Events',
    description: 'Experience the grand events across all categories',
  },
  {
    date: 'March 7',
    phase: 'Pro Shows',
    description: 'Witness extraordinary performances by renowned artists',
  },
  {
    date: 'March 8',
    phase: 'Closing Ceremony',
    description: 'Treasure reveal and celebration of champions',
  },
];

export default function JellyfishTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const jellyfishProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="timeline" ref={containerRef} className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            The Deep Chronicle
          </h2>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Festival Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow the jellyfish through the depths as it guides you through each phase of Pratishruti
          </p>
        </motion.div>

        {/* Vertical timeline with jellyfish indicator */}
        <div className="relative">
          {/* Background line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent/30 to-accent/10" />

          {/* Animated jellyfish following scroll */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 z-20 -translate-y-1/2"
            style={{
              top: jellyfishProgress,
            }}
          >
            <Jellyfish className="w-12 h-16 text-accent drop-shadow-lg" />
          </motion.div>

          {/* Timeline events */}
          <div className="space-y-12 md:space-y-20">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className={`flex items-center gap-8 md:gap-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content side */}
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className={`p-6 rounded-lg border border-accent/30 bg-gradient-to-br from-primary/10 to-secondary/5 hover:border-accent/60 transition-all group cursor-pointer`}
                  >
                    <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-1">
                      {event.date}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {event.phase}
                    </h3>
                    <p className="text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Center dot/indicator */}
                <div className="hidden md:flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="w-6 h-6 rounded-full bg-accent border-4 border-deep-ocean/80 cursor-pointer transition-all"
                    style={{
                      boxShadow: '0 0 0 0 rgba(112, 200, 220, 0)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(112, 200, 220, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 0 0 rgba(112, 200, 220, 0)';
                    }}
                  />
                </div>

                {/* Spacing for layout */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Don't miss any moment of the festival
          </p>
          <button className="px-8 py-3 bg-accent text-deep-ocean font-semibold rounded-lg hover:bg-accent/90 transition-all transform hover:scale-105">
            Mark Your Calendar
          </button>
        </motion.div>
      </div>
    </section>
  );
}
