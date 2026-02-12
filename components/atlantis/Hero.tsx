'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
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
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full w-auto h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ objectFit: 'cover' }}
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        {/* Optional: Add a dark overlay here if the video makes text hard to read */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* ================= HAMBURGER MENU BUTTON ================= */}
      <button
        className="fixed top-5 right-5 z-50 text-white md:hidden"
        onClick={() => setMenuOpen(true)}
      >
        <Menu size={32} />
      </button>

      {/* ================= MENU PAGE (NEW, SEPARATE) ================= */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/0 z-[90]"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: menuOpen ? '0%' : '100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed top-0 right-0 h-screen w-2/5 bg-[#001e2f]/75 backdrop-blur-xs z-[100] flex flex-col"
        style={{ borderStartStartRadius: 30, borderEndStartRadius: 30, boxShadow: '0 0 20px black/50' }}
      >
        <button
          className="absolute top-5 right-5 text-white"
          onClick={() => setMenuOpen(false)}
        >
          <X size={32} />
        </button>

        <div className="flex flex-col justify-center items-center h-full backdrop-blur-h gap-10 text-3xl font-semibold" style={{ color: 'white', boxShadow: '0 0 20px black/50' }} >
          <button onClick={() => handleMenuNavigate('events')}>Events</button>
          <button onClick={() => handleMenuNavigate('timeline')}>Timeline</button>
          <button onClick={() => handleMenuNavigate()}>Register</button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-8 md:mt-0 md:-translate-y-10 top-70 md:top-120"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
          opacity: 1 - Math.min(scrollY * 0.0006, 0.4),
        }}>

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
          #SceneहैHatke
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
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
          <button className="px-8 py-3 border border-white backdrop-blur-sm font-semibold rounded-lg hover:bg-accent/10 transition-colors duration-300">
            Register Now
          </button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-accent"
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
