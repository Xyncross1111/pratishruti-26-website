"use client";

import { useEffect, useRef, useState } from 'react';
import Hero from '@/components/atlantis/Hero';
import Navigation from '@/components/atlantis/Navigation';
import AboutSection from '@/components/atlantis/AboutSection';
import EventCarousel from '@/components/atlantis/EventCarousel';
import EventsTimeline from "@/components/atlantis/EventsTimeline";
import ArtistSection from '@/components/atlantis/ArtistSection';
import JellyfishTimeline from '@/components/atlantis/JellyfishTimeline';
import SponsorsCarousel from '@/components/atlantis/SponsorsCarousel';
import AnimatedTreasureBox from '@/components/atlantis/AnimatedTreasureBox';
import Footer from '@/components/atlantis/Footer';
import ScrollProgress from '@/components/atlantis/ScrollProgress';
import InfiniteScroll from '@/components/infinite-scroll';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;


      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-x-hidden bg-deep-ocean"
    >
      <Navigation scrollProgress={scrollProgress} />
      <ScrollProgress progress={scrollProgress} />


      <main className="relative">
        <Hero />
        <AboutSection />
        <EventCarousel />
        <EventsTimeline />
        <ArtistSection />
        <JellyfishTimeline />
        <SponsorsCarousel />
        <InfiniteScroll/>
        <AnimatedTreasureBox />
      </main>


      <Footer />
    </div>
  );
}
