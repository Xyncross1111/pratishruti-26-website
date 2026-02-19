'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Hero from '@/components/atlantis/Hero';
import AboutSection from '@/components/atlantis/AboutSection';
import EventCarousel from '@/components/atlantis/EventCarousel';
import ArtistSection from '@/components/atlantis/ArtistSection';
import EventsTimeline from "@/components/atlantis/EventsTimeline";
import JellyfishTimeline from '@/components/atlantis/JellyfishTimeline';
// import SponsorsCarousel from '@/components/atlantis/SponsorsCarousel';
import DeepSeaFooter from '@/components/atlantis/Footer';
import ScrollProgress from '@/components/atlantis/ScrollProgress';
import InfiniteScroll from '@/components/infinite-scroll';
import Header from '@/components/header';
import LoadingScreen from '@/components/atlantis/LoadingScreen';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingFinished = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden footer-bg-texture">
      <Header/>
      {/* <Navigation scrollProgress={scrollProgress} /> */}
      <ScrollProgress progress={scrollProgress} />

      <main className="relative">
        <Hero />
        <div className="relative">
          <AboutSection />
          <EventCarousel />
          <ArtistSection />
          <JellyfishTimeline />
          {/* <SponsorsCarousel /> */}
          <InfiniteScroll />
        </div>
      </main>

      <DeepSeaFooter />
    </div>
  );
}
