'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import * as React from 'react';
import { X } from 'lucide-react';
import { Pearl, Starfish } from './MarineSVGs';
import AlbumCover from './AlbumCover';

// TODO: Replace with your actual artists and their songs when ready
// To get Spotify Track URI: Open Spotify → Right-click on a TRACK → Share → Copy Spotify URI
// Format: Use TRACK URIs only → spotify:track:TRACK_ID (remove 'spotify:' prefix, use 'track/TRACK_ID')
const PLACEHOLDER_ARTISTS = [
    {
        id: '1',
        name: 'Artist Name',
        genre: 'Genre 1',
        image: '/placeholder-user.jpg', // Replace with actual artist image
        spotifyUri: 'track/3n3Ppam7vgaVa1iaRUc9Lp', // Example track - Replace with actual
        year: '2024',
    },
    {
        id: '2',
        name: 'Artist Name 2',
        genre: 'Genre 2',
        image: '/placeholder-user.jpg',
        spotifyUri: 'track/0VjIjW4GlUZAMYd2vXMi3b', // Example track - Replace with actual
        year: '2024',
    },
    {
        id: '3',
        name: 'Artist Name 3',
        genre: 'Genre 3',
        image: '/placeholder-user.jpg',
        spotifyUri: 'track/7qiZfU4dY1lWllzX7mPBI', // Example track - Replace with actual
        year: '2024',
    },
];

interface Artist {
    id: string;
    name: string;
    genre: string;
    image: string;
    spotifyUri: string; // Should be track/TRACK_ID format
    year?: string;
}

export default function ArtistSection() {
    const [expandedArtist, setExpandedArtist] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = React.useRef<HTMLDivElement>(null);

    const handleArtistClick = (artistId: string) => {
        setExpandedArtist(expandedArtist === artistId ? null : artistId);
    };

    // Track scroll position to update active pagination dot
    const handleScroll = () => {
        if (carouselRef.current) {
            const scrollLeft = carouselRef.current.scrollLeft;
            const itemWidth = carouselRef.current.scrollWidth / PLACEHOLDER_ARTISTS.length;
            const index = Math.round(scrollLeft / itemWidth);
            setActiveIndex(index);
        }
    };

    return (
        <section id="artists" className="relative py-20 md:py-32 px-4 overflow-hidden">
            {/* Background with marine theme */}
            <div className="absolute inset-0 bg-gradient-to-b from-deep-ocean via-deep-ocean/95 to-deep-ocean" />

            {/* Decorative marine elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <Pearl className="absolute w-8 h-8 opacity-20 top-20 left-10" />
                <Pearl className="absolute w-6 h-6 opacity-15 top-40 right-20" />
                <Starfish className="absolute w-12 h-12 opacity-20 bottom-32 left-20" />
                <Starfish className="absolute w-10 h-10 opacity-15 bottom-20 right-32" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
                        Featured Performers
                    </p>
                    <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
                        Artists
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover the incredible talent performing at Pratishruti 2026. Click on any artist to listen to their music.
                    </p>
                </motion.div>

                {/* Artist Grid/Carousel */}
                <div className="relative overflow-visible">
                    {/* Mobile Carousel */}
                    <div className="md:hidden py-16">
                        <motion.div
                            ref={carouselRef}
                            onScroll={handleScroll}
                            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                        >
                            {PLACEHOLDER_ARTISTS.map((artist) => (
                                <div key={artist.id} className="flex-shrink-0 w-full flex justify-center snap-center px-8 py-4">
                                    <AlbumCover
                                        image={artist.image}
                                        title={artist.name}
                                        type={artist.genre}
                                        year={artist.year}
                                        onClick={() => handleArtistClick(artist.id)}
                                    />
                                </div>
                            ))}
                        </motion.div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            {PLACEHOLDER_ARTISTS.map((artist, index) => (
                                <div
                                    key={artist.id}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                            ? 'bg-accent w-8'
                                            : 'bg-accent/30'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Desktop Grid */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20 lg:gap-40 justify-items-center">
                        {PLACEHOLDER_ARTISTS.map((artist) => (
                            <AlbumCover
                                key={artist.id}
                                image={artist.image}
                                title={artist.name}
                                type={artist.genre}
                                year={artist.year}
                                onClick={() => handleArtistClick(artist.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Expanded Spotify Player Modal */}
                <AnimatePresence>
                    {expandedArtist && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                            onClick={() => setExpandedArtist(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: 'spring', duration: 0.5 }}
                                className="relative w-full max-w-2xl bg-transparent border-0 rounded-lg p-4 md:p-6"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setExpandedArtist(null)}
                                    className="absolute top-2 right-2 md:top-4 md:right-4 text-muted-foreground hover:text-accent transition-colors z-10 bg-deep-ocean/80 rounded-full p-2"
                                    aria-label="Close"
                                >
                                    <X size={20} className="md:w-6 md:h-6" />
                                </button>

                                {PLACEHOLDER_ARTISTS.find((a) => a.id === expandedArtist) && (
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2 pr-8">
                                            {PLACEHOLDER_ARTISTS.find((a) => a.id === expandedArtist)?.name}
                                        </h3>
                                        <p className="text-accent text-xs md:text-sm mb-3 md:mb-4">
                                            {PLACEHOLDER_ARTISTS.find((a) => a.id === expandedArtist)?.genre}
                                        </p>

                                        {/* Spotify Embed */}
                                        <div className="rounded-lg overflow-hidden">
                                            <iframe
                                                src={`https://open.spotify.com/embed/${PLACEHOLDER_ARTISTS.find((a) => a.id === expandedArtist)?.spotifyUri
                                                    }?utm_source=generator&theme=0`}
                                                width="100%"
                                                height="450"
                                                className="h-[450px] md:h-[380px]"
                                                frameBorder="0"
                                                scrolling="no"
                                                style={{ overflow: 'hidden' }}
                                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                                loading="lazy"
                                                title={`Spotify player for ${PLACEHOLDER_ARTISTS.find((a) => a.id === expandedArtist)?.name}`}
                                            />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
