'use client';

import { motion } from 'framer-motion';
import { Waves } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 lg:py-24 md:py-32 px-4 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-linear-to-b from-deep-ocean/20 via-transparent to-deep-ocean/20" />

      <div className="relative z-10 max-w-275 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Pratishruti ’26 Brochure
          </h2>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            About RBU, SRC & Pratishruti
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
              <Waves className="w-8 h-8 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  About Ramdeobaba University (RBU)
                </h3>
                <p className="text-muted-foreground">
                  Ramdeobaba University (formerly Shri Ramdeobaba College of Engineering and Management, RCOEM), Nagpur, established in 1984, is a reputed institution focused on nurturing ethical and competent professionals through innovation, research, and real-world learning.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Waves className="w-8 h-8 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  About Students’ Representative Council (SRC)
                </h3>
                <p className="text-muted-foreground">
                  SRC is the apex student body of Ramdeobaba University and the key link between students and administration. Through mentorship, leadership opportunities, and co-curricular initiatives, SRC fosters an inclusive campus culture of excellence and collaboration.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Waves className="w-8 h-8 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  About Pratishruti – 29ᵗʰ Edition
                </h3>
                <p className="text-muted-foreground">
                  Pratishruti is Central India&apos;s largest cultural festival where art, ideas, and youth energy come together through competitions, showcases, literary and fine arts programs, film, photography, pop-culture events, informals, workshops, and campus engagement activities.
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
                Footfall
              </h4>
              <p className="text-foreground font-semibold">
                8,000+
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Students and visitors across all days
              </p>
            </div>

            <div className="p-6 rounded-lg border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors">
              <h4 className="text-accent text-sm font-semibold uppercase mb-2">
                Events & Activities
              </h4>
              <p className="text-foreground font-semibold">
                35+
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Competitions and events across multiple categories
              </p>
            </div>

            <div className="p-6 rounded-lg border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors">
              <h4 className="text-accent text-sm font-semibold uppercase mb-2">
                Brand Associations
              </h4>
              <p className="text-foreground font-semibold">
                30+
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Sponsors, partners, and collaborators with strong digital reach
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
