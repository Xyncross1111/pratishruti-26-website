'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Music, X } from 'lucide-react';
import { Pearl, Starfish } from './MarineSVGs';
import TiltedCard from '../TiltedCard';

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
    description: 'Featured Song Title',
    songTitle: 'Song Name Here', // Optional: specific song name
  },
  {
    id: '2',
    name: 'Artist Name 2',
    genre: 'Genre 2',
    image: '/placeholder-user.jpg',
    spotifyUri: 'track/0VjIjW4GlUZAMYd2vXMi3b', // Example track - Replace with actual
    description: 'Featured Song Title',
    songTitle: 'Song Name Here',
  },
  {
    id: '3',
    name: 'Artist Name 3',
    genre: 'Genre 3',
    image: '/placeholder-user.jpg',
    spotifyUri: 'track/7qiZfU4dY1lWllzX7mPBI', // Example track - Replace with actual
    description: 'Featured Song Title',
    songTitle: 'Song Name Here',
  },
  {
    id: '4',
    name: 'Artist Name 4',
    genre: 'Genre 4',
    image: '/placeholder-user.jpg',
    spotifyUri: 'track/4LRPiXqCikLlN15c3yImP7', // Example track - Replace with actual
    description: 'Featured Song Title',
    songTitle: 'Song Name Here',
  },
];

interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
  spotifyUri: string; // Should be track/TRACK_ID format
  description?: string;
  songTitle?: string; // Optional: specific song name
}

export default function ArtistSection() {
  const [expandedArtist, setExpandedArtist] = useState<string | null>(null);

  const handleArtistClick = (artistId: string) => {
    setExpandedArtist(expandedArtist === artistId ? null : artistId);
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
          className="text-center mb-16"
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

        {/* Artist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PLACEHOLDER_ARTISTS.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative cursor-pointer"
              onClick={() => handleArtistClick(artist.id)}
            >
              <TiltedCard
                imageSrc={artist.image}
                altText={artist.name}
                captionText={`Click to play ${artist.name}`}
                containerHeight="350px"
                containerWidth="100%"
                imageHeight="300px"
                imageWidth="100%"
                scaleOnHover={1.05}
                rotateAmplitude={12}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <>
                    <div className="w-full h-full flex flex-col justify-end p-4 bg-gradient-to-t from-deep-ocean via-deep-ocean/80 to-transparent">
                      <h3 className="text-2xl font-bold text-foreground">{artist.name}</h3>
                    </div>
                  </>
                }
              />
            </motion.div>
          ))}
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
                className="relative w-full max-w-2xl bg-transparent border-0 rounded-lg p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setExpandedArtist(null)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-accent transition-colors"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>

                {PLACEHOLDER_ARTISTS.find((a) => a.id === expandedArtist) && (
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {PLACEHOLDER_ARTISTS.find((a) => a.id === expandedArtist)?.name}
                    </h3>
                    <p className="text-accent text-sm mb-4">
                      {PLACEHOLDER_ARTISTS.find((a) => a.id === expandedArtist)?.genre}
                    </p>

                    {/* Spotify Embed */}
                    <div className="rounded-lg overflow-hidden">
                      <iframe
                        src={`https://open.spotify.com/embed/${PLACEHOLDER_ARTISTS.find((a) => a.id === expandedArtist)?.spotifyUri
                          }?utm_source=generator&theme=0`}
                        width="100%"
                        height="380"
                        frameBorder="0"
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
