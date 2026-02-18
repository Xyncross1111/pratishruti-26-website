'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  registrationStatus?: 'open' | 'closed' | 'soon';
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
  registrationStatus: event.registrationStatus,
}));

const AUTO_SCROLL_MS = 8000;

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const filteredEvents = events;

  const getVisibleEvents = () => {
    if (filteredEvents.length === 0) return [];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const itemsToShow = isMobile ? 1 : 3;
    const visible = [];

    for (let i = 0; i < itemsToShow; i++) {
      visible.push(filteredEvents[(currentIndex + i) % filteredEvents.length]);
    }
    return visible;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isAutoPaused || filteredEvents.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredEvents.length);
    }, AUTO_SCROLL_MS);

    return () => clearInterval(interval);
  }, [mounted, isAutoPaused, filteredEvents.length]);

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

        <div
          ref={containerRef}
          className="relative"
          onMouseEnter={() => setIsAutoPaused(true)}
          onMouseLeave={() => setIsAutoPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {(mounted ? getVisibleEvents() : filteredEvents.slice(0, 3)).map((event, idx) => (
              <motion.div
                key={`${event.slug}-${event.id}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-full"
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-accent/20 bg-linear-to-b from-primary/30 via-background/80 to-secondary/30 p-4 md:p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/45">
                  <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-accent/10 opacity-70" />
                  <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-accent/10 blur-3xl" />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-3 flex items-center justify-end gap-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                          event.registrationStatus === 'closed'
                            ? 'bg-destructive/20 text-destructive'
                            : event.registrationStatus === 'soon'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {event.registrationStatus === 'closed'
                          ? 'Closed'
                          : event.registrationStatus === 'soon'
                            ? 'Soon'
                            : 'Open'}
                      </span>
                    </div>

                    <div className="mb-4 overflow-hidden rounded-xl border border-accent/20 bg-black/15">
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

                    <h3 className="mb-2 line-clamp-2 text-xl font-extrabold text-foreground md:text-2xl">
                      {event.name}
                    </h3>

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

                    <Link
                      href={`/register?event=${event.id}`}
                      className="block w-full rounded-xl border border-accent/30 bg-accent/20 px-4 py-2.5 text-center text-sm font-semibold text-accent transition-colors hover:bg-accent/35"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mx-auto max-w-md rounded-full border border-accent/20 bg-background/60 px-4 py-3 backdrop-blur">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{isAutoPaused ? 'Paused' : 'Now showing'}</span>
              <span>
                {filteredEvents.length > 0 ? currentIndex + 1 : 0}/{filteredEvents.length}
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-accent/15">
              <motion.div
                key={`${currentIndex}-${isAutoPaused ? 'paused' : 'running'}`}
                className="h-full rounded-full bg-accent"
                initial={{ width: '0%' }}
                animate={{ width: isAutoPaused ? '0%' : '100%' }}
                transition={{ duration: AUTO_SCROLL_MS / 1000, ease: 'linear' }}
              />
            </div>

            <div className="mt-2 flex justify-center gap-1.5">
              {filteredEvents.map((event, idx) => (
                <span
                  key={`${event.slug}-${event.id}-${idx}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentIndex ? 'w-6 bg-accent' : 'w-1.5 bg-accent/30'
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