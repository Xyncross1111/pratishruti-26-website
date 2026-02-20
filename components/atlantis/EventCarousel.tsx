'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { registrationEvents } from '@/lib/events';

type Event = {
  id: number;
  slug: string;
  name: string;
  date: string;
  venue: string;
  category: string;
  posterSrc: string;
  prize?: string;
  access?: 'RBU only' | 'Open to all';
};

const posterBySlug: Record<string, string> = {
  naaqaab: '/images/events/naaqaab.jpg',
  footsteps: '/images/events/footsteps.jpg',
  vibrato: '/images/events/vibrato.jpg',
  'art-affairs': '/images/events/art-affairs.jpg',
  picasso: '/images/events/picasso.jpg',
  quizzeus: '/images/events/quizzeus.jpg',
  'minute-to-win-it': '/images/events/minute-to-win-it.jpg',
  'rbu-got-talent': '/images/events/rbu-got-talent.jpg',
  ingenium: '/images/events/ingenium.jpg',
  persona: '/images/events/persona.jpg',
  'virtual-gaming': '/images/events/virtual-gaming.jpg',
  'dalal-street': '/images/events/dalal-street.jpg',
  cinecrypt: '/images/events/cinecrypt.jpg',
  hyroxx: '/images/events/hyroxx.jpg',
  'escape-room': '/images/events/escape-room.jpg',
  'auto-expo': '/images/events/auto-expo.jpg',
  'movie-eve': '/images/events/movie-eve.jpg',
  traitors: '/images/events/traitors.jpg',
};

const events: Event[] = registrationEvents.map((event) => ({
  id: event.id,
  slug: event.slug,
  name: event.name,
  date: event.date ?? 'Date TBA',
  venue: event.venue ?? 'Venue TBA',
  category: event.category ?? 'General',
  posterSrc: posterBySlug[event.slug] ?? '/placeholder.jpg',
  prize: event.prize,
  access: event.access,
}));

const AUTO_SCROLL_MS = 8000;

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRafRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const filteredEvents = events;
  const desktopItemsToShow = 3;
  const desktopStep = 3;
  const desktopPageCount = Math.ceil(filteredEvents.length / desktopItemsToShow);

  const getVisibleEvents = () => {
    if (filteredEvents.length === 0) return [];
    if (isMobile) return [filteredEvents[currentIndex % filteredEvents.length]];

    const itemsToShow = desktopItemsToShow;
    const visible = [];

    for (let i = 0; i < itemsToShow; i++) {
      visible.push(filteredEvents[(currentIndex + i) % filteredEvents.length]);
    }
    return visible;
  };

  const getMobileSlideWidth = (container: HTMLDivElement) => {
    const firstCard = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth ?? container.clientWidth;
    const computedStyle = window.getComputedStyle(container);
    const gap = Number.parseFloat(computedStyle.columnGap || computedStyle.gap || '0') || 0;
    return cardWidth + gap;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, [mounted]);

  useEffect(() => {
    if (!mounted || isAutoPaused || filteredEvents.length <= 1) return;

    const interval = setInterval(() => {
      if (isMobile) {
        setCurrentIndex((prev) => {
          const nextIndex = (prev + 1) % filteredEvents.length;
          const container = mobileScrollRef.current;
          if (container) {
            const slideWidth = getMobileSlideWidth(container);
            container.scrollTo({ left: slideWidth * nextIndex, behavior: 'smooth' });
          }
          return nextIndex;
        });
        return;
      }

      setCurrentIndex((prev) => (prev + desktopStep) % filteredEvents.length);
    }, AUTO_SCROLL_MS);

    return () => clearInterval(interval);
  }, [mounted, isAutoPaused, filteredEvents.length, isMobile]);

  useEffect(() => {
    return () => {
      if (mobileScrollRafRef.current) {
        window.cancelAnimationFrame(mobileScrollRafRef.current);
      }
    };
  }, []);

  const renderEventCard = (event: Event, idx: number) => (
    <motion.div
      key={`${event.slug}-${event.id}-${idx}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      className="group relative h-full w-[95%] md:w-full mx-auto"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-accent/20 bg-linear-to-b from-primary/30 via-background/80 to-secondary/30 p-4 md:p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/45">
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-accent/10 opacity-70" />
        <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-xl font-extrabold text-foreground md:text-2xl">
              {event.name}
            </h3>
          </div>

              <div className="mb-4 w-[92%] md:w-full mx-auto overflow-hidden rounded-xl border border-accent/20 bg-black/15">
            <div className="relative">
              <Image
                src={event.posterSrc}
                alt={`${event.name} poster`}
                width={1080}
                height={1350}
                sizes="(max-width: 768px) 80vw, 320px"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
                priority={idx === 0}
              />
            </div>
          </div>

          <div className="mb-4 rounded-xl border border-accent/15 bg-background/45 p-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-start justify-between gap-3 border-b border-accent/10 pb-2">
                <span className="text-muted-foreground">Date</span>
                <p className="text-right font-medium text-foreground/90">{event.date}</p>
              </div>
              <div className="flex items-start justify-between gap-3 border-b border-accent/10 pb-2">
                <span className="text-muted-foreground">Venue</span>
                <p className="text-right font-medium text-foreground/90">{event.venue}</p>
              </div>
              {event.prize ? (
                <div className="flex items-start justify-between gap-3">
                  <span className="text-muted-foreground">Prize Pool</span>
                  <p className="text-right font-semibold text-accent">{event.prize}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mb-4 mt-auto">
            <span className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs text-accent/90">
              {event.access ?? 'Open to all'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const activeDesktopPage = Math.floor(currentIndex / desktopItemsToShow) % Math.max(desktopPageCount, 1);

  return (
    <section id="events" className="relative py-16 lg:py-16 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-accent/5 to-transparent opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Explore Pratishruti Events
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Music, dance, drama, fashion, literary, fine arts, film, photography, pop-culture, informals, and workshops.
          </p>
        </motion.div>

        <div className="relative">
          {isMobile ? (
            <div
              ref={mobileScrollRef}
              className="mb-8 flex snap-x snap-mandatory gap-0 overflow-x-auto pb-2 scrollbar-hide"
              style={{ touchAction: 'pan-x' }}
              onScroll={(event) => {
                const target = event.currentTarget;
                if (mobileScrollRafRef.current) {
                  window.cancelAnimationFrame(mobileScrollRafRef.current);
                }

                mobileScrollRafRef.current = window.requestAnimationFrame(() => {
                  const slideWidth = getMobileSlideWidth(target);
                  const nextIndex = Math.round(target.scrollLeft / Math.max(slideWidth, 1));
                  const boundedIndex = Math.min(Math.max(nextIndex, 0), filteredEvents.length - 1);
                  setCurrentIndex((prev) => (prev === boundedIndex ? prev : boundedIndex));
                });
              }}
            >
              {filteredEvents.map((event, idx) => (
                <div key={`${event.slug}-${event.id}-${idx}`} className="min-w-full snap-start px-1.5 md:px-0">
                  {renderEventCard(event, idx)}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {(mounted ? getVisibleEvents() : filteredEvents.slice(0, 3)).map((event, idx) => renderEventCard(event, idx))}
            </div>
          )}

          <div className="mx-auto max-w-md rounded-full border border-accent/20 bg-background/60 px-4 py-3 backdrop-blur">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{isAutoPaused ? 'Paused' : 'Now showing'}</span>
              <span>
                {isMobile
                  ? `${filteredEvents.length > 0 ? currentIndex + 1 : 0}/${filteredEvents.length}`
                  : `${desktopPageCount > 0 ? activeDesktopPage + 1 : 0}/${desktopPageCount}`}
              </span>
            </div>
            <div
              className="h-1 overflow-hidden rounded-full bg-accent/15"
              onPointerDown={() => setIsAutoPaused(true)}
              onPointerUp={() => setIsAutoPaused(false)}
              onPointerCancel={() => setIsAutoPaused(false)}
              onPointerLeave={() => setIsAutoPaused(false)}
            >
              <motion.div
                key={`${currentIndex}-${isAutoPaused ? 'paused' : 'running'}`}
                className="h-full rounded-full bg-accent"
                initial={{ width: '0%' }}
                animate={{ width: isAutoPaused ? '0%' : '100%' }}
                transition={{ duration: AUTO_SCROLL_MS / 1000, ease: 'linear' }}
              />
            </div>

            <div className="mt-2 flex justify-center gap-1.5">
              {(isMobile
                ? filteredEvents.map((_, idx) => idx)
                : Array.from({ length: desktopPageCount }, (_, idx) => idx)
              ).map((idx) => (
                <span
                  key={`event-indicator-${idx}`}
                  className={`h-1.5 rounded-full transition-all ${
                    (isMobile ? idx === currentIndex : idx === activeDesktopPage)
                      ? 'w-6 bg-accent'
                      : 'w-1.5 bg-accent/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}