'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Jellyfish } from './MarineSVGs';

const timelineEvents = [
  {
    date: '25 February 2026 · 11:00 AM · Dome',
    phase: 'Inaugural Function',
    description: 'Chief Guest: Mr. Sarang Dewaikar. Presided by Shri Satyanarayan Nuwal in presence of Shri Rajendra Purohit.',
  },
  {
    date: '25 February 2026 · 12:30 PM · IT Square',
    phase: 'Aarambh – The Fete',
    description: 'Festive kickoff event as part of the opening day schedule.',
  },
  {
    date: '25 February 2026 · 5:00 PM · Dome',
    phase: 'Cultural Night',
    description: 'Evening cultural showcase on day one of Pratishruti 2026.',
  },
  {
    date: '26 February 2026 · 11:00 AM Onwards',
    phase: 'Pratishruti Lunch (Girls & Boys)',
    description: 'Traditional Day gathering and lunch program.',
  },
  {
    date: '26 February 2026 · 10:00 AM · Dome',
    phase: 'Under 25 Summit',
    description: 'Summit session scheduled on Traditional Day.',
  },
  {
    date: '26 February 2026 · 5:00 PM · EN Parking',
    phase: 'Bollywood Musical Band',
    description: 'Live band performance in the evening.',
  },
  {
    date: '27 February 2026 · 11:00 AM · Dome',
    phase: 'Valedictory & Prize Distribution',
    description: 'Chief Guest: Mr. Kuldeep Vij with valedictory and awards ceremony.',
  },
  {
    date: '27 February 2026 · 5:00 PM · Dome',
    phase: 'City Performer',
    description: 'Featured city performance event.',
  },
  {
    date: '27 February 2026 · 6:00 PM · Dome',
    phase: 'Performance by Music Producer',
    description: 'Closing evening performance to conclude the festival schedule.',
  },
];

export default function JellyfishTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState(0);

  useEffect(() => {
    const trackElement = trackRef.current;
    if (!trackElement) return;

    const updateTrackHeight = () => {
      setTrackHeight(trackElement.offsetHeight);
    };

    updateTrackHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateTrackHeight();
    });

    resizeObserver.observe(trackElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const jellyfishY = useTransform(scrollYProgress, [0, 1], [0, Math.max(trackHeight - 64, 0)]);
  const smoothJellyfishY = useSpring(jellyfishY, {
    stiffness: 120,
    damping: 25,
    mass: 0.4,
  });

  return (
    <section id="timeline" ref={containerRef} className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-accent/5 to-transparent" />

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
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Festival Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow the jellyfish through the depths as it guides you through each phase of Pratishruti
          </p>
        </motion.div>

        {/* Vertical timeline with jellyfish indicator */}
        <div ref={trackRef} className="relative">
          {/* Background line */}
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-1 h-full bg-linear-to-b from-accent/30 to-accent/10" />

          {/* Animated jellyfish following scroll */}
          <motion.div
            className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-20 -translate-y-1/2"
            style={{
              top: 0,
              y: smoothJellyfishY,
            }}
          >
            <Jellyfish className="w-10 h-14 md:w-12 md:h-16 text-accent drop-shadow-lg" />
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
                className={`relative flex items-start md:items-center gap-4 md:gap-16 pl-10 md:pl-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Mobile dot/indicator */}
                <div className="absolute left-4 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-2 border-deep-ocean/80 md:hidden" />

                {/* Content side */}
                <div className={`flex-1 text-left ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="group relative overflow-hidden rounded-2xl border border-accent/30 bg-card/40 p-6 md:p-7 backdrop-blur-md hover:border-accent/65 transition-all cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-primary/10 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute -top-10 -right-8 h-28 w-28 rounded-full bg-accent/20 blur-2xl" />
                    <div className="absolute -bottom-12 -left-8 h-24 w-24 rounded-full bg-primary/25 blur-2xl" />

                    <div className="relative z-10 flex flex-wrap items-center gap-2 mb-4">
                      <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] md:text-xs font-semibold tracking-[0.14em] uppercase text-accent">
                        Stage Event
                      </span>
                      <span className="inline-flex items-center rounded-full border border-border/60 bg-background/50 px-3 py-1 text-[10px] md:text-xs font-medium tracking-wide text-muted-foreground">
                        Slot {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <p className="relative z-10 text-accent text-sm font-semibold uppercase tracking-wider mb-2">
                      {event.date}
                    </p>
                    <h3 className="relative z-10 text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight">
                      {event.phase}
                    </h3>
                    <p className="relative z-10 text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>

                    <div className={`relative z-10 mt-5 pt-3 border-t border-accent/20 flex items-center ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
                      <span className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-accent/90">
                        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                        Fest Flow
                      </span>
                    </div>
                  </motion.div>
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
                <div className="hidden md:block flex-1" />
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
