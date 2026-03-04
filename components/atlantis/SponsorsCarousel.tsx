'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const sponsors = [
  { id: 1, name: 'Barcode', category: 'Sponsor', logo: '/images/sponsors/barcode.png' },
  { id: 2, name: 'Bento', category: 'Sponsor', logo: '/images/sponsors/bento.jpeg' },
  { id: 3, name: 'Burghar', category: 'Sponsor', logo: '/images/sponsors/Burghar.jpeg' },
  { id: 4, name: 'JRNY', category: 'Sponsor', logo: '/images/sponsors/jrny.jpeg' },
  { id: 5, name: 'RIch Drive', category: 'Sponsor', logo: '/images/sponsors/RIch%20Drive_page-0001.jpg' },
  { id: 6, name: 'Snackify', category: 'Sponsor', logo: '/images/sponsors/snackify.jpeg' },
  { id: 7, name: 'UCO Bank', category: 'Sponsor', logo: '/images/sponsors/UCO%20Bank.avif' },
  { id: 8, name: 'Venus Suzuki', category: 'Sponsor', logo: '/images/sponsors/venus.png' },
  { id: 9, name: 'Hypehaus', category: 'Sponsor', logo: '/images/sponsors/hypehaus.png' },
];

export default function SponsorsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 4;
  const totalItems = sponsors.length;

  const paginate = (direction: number) => {
    setCurrentIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return totalItems - itemsPerView;
      if (newIndex > totalItems - itemsPerView) return 0;
      return newIndex;
    });
  };

  return (
    <section className="relative py-16 lg:py-16 md:py-32 px-4 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-ocean/20 via-transparent to-deep-ocean/20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Our Partners
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Sponsors of Atlantis
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted partners making Pratishruti possible
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Sponsors grid with carousel */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4 md:gap-6"
              animate={{ x: -currentIndex * (100 / itemsPerView) + '%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {sponsors.map((sponsor, idx) => (
                <motion.div
                  key={sponsor.id}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / itemsPerView}% - ${(4 * (itemsPerView - 1)) / itemsPerView}px)` }}
                >
                  <div className="group relative h-40 rounded-lg border border-accent/30 bg-gradient-to-br from-primary/10 to-secondary/5 hover:border-accent/60 transition-all overflow-hidden cursor-pointer flex items-center justify-center"
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/10 group-hover:to-accent/5 transition-all duration-300" />

                    <div className="relative z-10 text-center p-4">
                      <div className="relative w-16 h-12 mx-auto mb-3">
                        <Image
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          fill
                          sizes="64px"
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-bold text-foreground mb-1">
                        {sponsor.name}
                      </h3>
                      <p className="text-xs text-accent uppercase tracking-wider">
                        {sponsor.category}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => paginate(-1)}
              className="p-3 rounded-full border border-accent/30 hover:bg-accent/10 hover:border-accent/60 transition-all"
              aria-label="Previous sponsors"
            >
              <ChevronLeft size={20} className="text-accent" />
            </button>

            <div className="flex gap-2">
              {[...Array(Math.ceil(totalItems / itemsPerView))].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx * itemsPerView)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    Math.floor(currentIndex / itemsPerView) === idx
                      ? 'bg-accent w-8'
                      : 'bg-accent/30'
                  }`}
                  aria-label={`Go to sponsor batch ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="p-3 rounded-full border border-accent/30 hover:bg-accent/10 hover:border-accent/60 transition-all"
              aria-label="Next sponsors"
            >
              <ChevronRight size={20} className="text-accent" />
            </button>
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 p-6 text-center border-t border-accent/20 pt-8"
        >
          <p className="text-muted-foreground mb-4">
            Interested in sponsoring Pratishruti?
          </p>
          <button className="px-6 py-2 bg-accent/20 hover:bg-accent/40 text-accent rounded-lg text-sm font-semibold transition-colors">
            Become a Sponsor
          </button>
        </motion.div>
      </div>
    </section>
  );
}