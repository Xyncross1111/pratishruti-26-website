'use client';

import { motion } from 'framer-motion';
import { Waves } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-ocean/20 via-transparent to-deep-ocean/20" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            The Legend
          </h2>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            About Pratishruti
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left content */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <Waves className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Realm of Poseidon
                </h3>
                <p className="text-muted-foreground">
                  Pratishruti, the annual festival of ancient wisdom and modern celebration, draws inspiration from the legendary underwater kingdoms ruled by Poseidon himself. Dive deep into a realm where mythology meets reality.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Waves className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Atlantis Reborn
                </h3>
                <p className="text-muted-foreground">
                  Every year, the hidden city of Atlantis awakens once more. Through immersive events, competitions, and performances, we recreate the grandeur of this mystical civilization, revealing treasures of talent and culture.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Waves className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Cultural Odyssey
                </h3>
                <p className="text-muted-foreground">
                  From dance and music to technology and innovation, Pratishruti celebrates the boundless creativity of its participants. Join thousands of explorers on this oceanic journey of discovery.
                </p>
              </div>
            </div>
          </div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="p-6 rounded-lg border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors">
              <h4 className="text-accent text-sm font-semibold uppercase mb-2">
                📅 When
              </h4>
              <p className="text-foreground font-semibold">
                March 1-8, 2026
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                A week-long celebration of art, culture, and innovation
              </p>
            </div>

            <div className="p-6 rounded-lg border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors">
              <h4 className="text-accent text-sm font-semibold uppercase mb-2">
                🌊 Scale
              </h4>
              <p className="text-foreground font-semibold">
                5000+ Participants
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                From across the globe, united in celebration
              </p>
            </div>

            <div className="p-6 rounded-lg border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors">
              <h4 className="text-accent text-sm font-semibold uppercase mb-2">
                🎭 Diversity
              </h4>
              <p className="text-foreground font-semibold">
                30+ Events
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Spanning culture, technology, sports, and arts
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom highlight */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-lg border border-accent/30 bg-gradient-to-r from-primary/10 to-secondary/10 text-center"
        >
          <p className="text-lg md:text-xl text-foreground mb-4">
            <span className="text-accent font-bold">Pratishruti</span> is more than a festival—it's a portal to ancient wonder, a celebration of human talent, and a gathering of minds united by passion.
          </p>
          <p className="text-muted-foreground">
            Come explore the depths of Atlantis. Discover your true potential. Leave your mark on legend.
          </p>
        </motion.div> */}
      </div>
    </section>
  );
}
