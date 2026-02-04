'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const events = [
  {
    id: 1,
    name: 'Underwater Dance Battle',
    venue: 'Grand Hall',
    time: '2:00 PM - 5:00 PM',
    category: 'Cultural',
  },
  {
    id: 2,
    name: 'Poetry Slam: Voices of the Abyss',
    venue: 'Theater',
    time: '6:00 PM - 8:00 PM',
    category: 'Literary',
  },
  {
    id: 3,
    name: 'Neon Glow Concert',
    venue: 'Main Stage',
    time: '8:00 PM - 11:00 PM',
    category: 'Pro Shows',
  },
  {
    id: 4,
    name: 'Coding Marathon',
    venue: 'Tech Lab',
    time: '10:00 AM - 6:00 PM',
    category: 'Tech Events',
  },
  {
    id: 5,
    name: 'Treasure Hunt Quest',
    venue: 'Beach & Ocean',
    time: '3:00 PM - 7:00 PM',
    category: 'Competitions',
  },
  {
    id: 6,
    name: 'Art & Craft Workshop',
    venue: 'Amphitheater',
    time: '11:00 AM - 1:00 PM',
    category: 'Workshops',
  },
];

const categories = ['All', 'Cultural', 'Literary', 'Pro Shows', 'Tech Events', 'Competitions', 'Workshops'];

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const containerRef = useRef<HTMLDivElement>(null);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + events.length) % events.length);
  };

  const getFilteredEvents = () => {
    if (activeCategory === 'All') {
      return events;
    }
    return events.filter((event) => event.category === activeCategory);
  };

  const getVisibleEvents = () => {
    const filteredEvents = getFilteredEvents();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const itemsToShow = isMobile ? 1 : 3;
    const visible = [];

    for (let i = 0; i < itemsToShow; i++) {
      visible.push(filteredEvents[(currentIndex + i) % filteredEvents.length]);
    }
    return visible;
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  return (
    <section id="events" className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Discover Events
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Explore Atlantis Events
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in the mystical events happening throughout the festival
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-accent text-deep-ocean shadow-lg'
                  : 'bg-accent/20 text-accent hover:bg-accent/40'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div ref={containerRef} className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {getVisibleEvents().map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-primary/20 to-secondary/10 border border-accent/30 rounded-lg p-6 hover:border-accent/60 transition-all duration-300 overflow-hidden"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/10 group-hover:to-accent/5 transition-all duration-300" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-accent text-xs font-semibold uppercase tracking-wider mb-1">
                          {event.category}
                        </p>
                        <h3 className="text-lg md:text-xl font-bold text-foreground">
                          {event.name}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-accent/20 pt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-accent text-sm">📍</span>
                        <p className="text-muted-foreground text-sm">{event.venue}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-accent text-sm">🕐</span>
                        <p className="text-muted-foreground text-sm">{event.time}</p>
                      </div>
                    </div>

                    <button className="mt-4 w-full py-2 px-4 bg-accent/20 hover:bg-accent/40 text-accent rounded-md text-sm font-semibold transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => paginate(-1)}
              className="p-3 rounded-full border border-accent/30 hover:bg-accent/10 hover:border-accent/60 transition-all"
              aria-label="Previous events"
            >
              <ChevronLeft size={20} className="text-accent" />
            </button>

            <div className="flex gap-2">
              {getFilteredEvents().map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-accent w-8' : 'bg-accent/30'
                  }`}
                  aria-label={`Go to event ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="p-3 rounded-full border border-accent/30 hover:bg-accent/10 hover:border-accent/60 transition-all"
              aria-label="Next events"
            >
              <ChevronRight size={20} className="text-accent" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
