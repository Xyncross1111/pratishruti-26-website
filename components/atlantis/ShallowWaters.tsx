'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Coral, Starfish, Fish, Pearl, Seaweed } from './MarineSVGs';

const events = [
  { name: 'Cultural', description: 'Dance, Music & Art', icon: '🎭' },
  { name: 'Literary', description: 'Poetry & Debate', icon: '📖' },
  { name: 'Pro Shows', description: 'Live Performances', icon: '🎪' },
  { name: 'Workshops', description: 'Learn & Create', icon: '🛠️' },
  { name: 'Competitions', description: 'Games & Contests', icon: '🏆' },
  { name: 'Tech Events', description: 'Innovation Zone', icon: '💻' },
];

export default function ShallowWaters() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Animated separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* Ocean floor background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/images/ocean-floor.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Background glow and marine elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/10 blur-3xl opacity-20"
          style={{
            animation: 'float 6s ease-in-out infinite',
          }}
        />

        {/* Decorative SVG elements */}
        <Coral className="absolute w-20 h-32 opacity-40 bottom-10 left-8" />
        <Coral className="absolute w-16 h-24 opacity-30 bottom-16 right-12" />
        <Starfish className="absolute w-14 h-14 opacity-35 bottom-32 left-1/4" />
        <Starfish className="absolute w-12 h-12 opacity-25 bottom-20 right-1/3" />
        <Pearl className="absolute w-8 h-8 opacity-40 top-20 left-1/3" />
        <Pearl className="absolute w-6 h-6 opacity-30 top-32 right-1/4" />
        <Seaweed className="absolute w-6 h-24 opacity-35 bottom-24 left-1/2" />
        <Fish className="absolute w-10 h-6 opacity-40 top-1/4 right-20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          ref={sectionRef}
          style={{ opacity, y }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Explore The Shallow Depths
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Event Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover a variety of cultural, technical, and entertainment events designed to showcase your talents and passions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedCategory(event.name === selectedCategory ? null : event.name)}
              className={`group relative p-6 bg-gradient-to-br from-secondary/20 to-primary/10 border rounded-lg transition-all duration-300 cursor-pointer ${
                selectedCategory === event.name
                  ? 'border-accent/80 bg-accent/20'
                  : 'border-accent/30 hover:border-accent/60'
              }`}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/10 to-transparent blur" />

              <div className="relative z-10">
                <div className="text-4xl mb-4">{event.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{event.name}</h3>
                <p className="text-muted-foreground text-sm">{event.description}</p>

                <motion.div
                  className="mt-4 flex items-center gap-2 text-accent text-sm"
                  initial={{ x: 0, opacity: 0 }}
                  whileHover={{ x: 5, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles size={16} />
                  <span>Discover</span>
                </motion.div>
              </div>

              {/* Rune decoration */}
              <div className="absolute top-3 right-3 text-accent/20 text-2xl">Ⱦ</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}
