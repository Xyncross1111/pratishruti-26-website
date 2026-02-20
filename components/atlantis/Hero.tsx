'use client';

import { motion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Corrected mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 25,
        y: (e.clientY - window.innerHeight / 2) / 25,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []); // This ensures the closing bracket on line 46 is correct

  // update scrollY on scroll (no audio)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExplore = (targetId?: string) => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const handleMenuNavigate = (targetId?: string) => {
    // close menu first
    setMenuOpen(false);
    // allow the close animation / overlay removal to start
    setTimeout(() => {
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      // fallback: scroll to next section
      handleExplore();
    }, 60);
  };  

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-20 pb-20"
    >
      <div className="absolute inset-0 z-0 overflow-hidden bg-black sm:hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero_mobile.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden bg-black hidden sm:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-contain md:object-cover md:object-center"
        >
          <source src="/hero_desktop.MP4" type="video/mp4" />
        </video>
        {/* Optional: Add a dark overlay here if the video makes text hard to read */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto hidden sm:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-2"
        >
          <h2 className="text-accent text-sm font-semibold tracking-widest uppercase">
            PRATISHRUTI ’26
          </h2>
        </motion.div>

      {/* ================= MENU PAGE (NEW, SEPARATE) ================= */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/0 z-90"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: menuOpen ? '0%' : '100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed top-0 right-0 h-screen w-2/5 bg-[#001e2f]/75 backdrop-blur-xs z-100 flex flex-col"
        style={{ borderStartStartRadius: 30, borderEndStartRadius: 30, boxShadow: '0 0 20px black/50' }}
      >
        <button
          className="absolute top-5 right-5 text-white"
          onClick={() => setMenuOpen(false)}
        >
          <X size={32} />
        </button>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Central India&apos;s Largest Cultural Festival
        </motion.h2>

        <motion.p
          className="text-lg md:text-2xl font-medium mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            color: 'white',
            textShadow: '0 0 10px oklch(60% 0.2 200 / 0.5)',
            letterSpacing: '0.2em'
          }}
        >
          RIGHT THINGS, RIGHT WAY.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={() => handleExplore('events')}
            className="px-8 py-3 text-deep-ocean font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'oklch(65% 0.18 220)',
              color: 'oklch(95% 0.01 240)',
              boxShadow: '0 10px 25px oklch(60% 0.18 220 / 0.35)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                '0 20px 35px oklch(65% 0.20 220 / 0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                '0 10px 25px oklch(60% 0.18 220 / 0.35)';
            }}
          >
            Explore Events
          </button>
        </motion.div>
      </motion.div>

      </div>

      {/* Scroll hint */}
      <motion.button
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-accent hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => handleExplore('events')}
        aria-label="Scroll to explore"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
}
