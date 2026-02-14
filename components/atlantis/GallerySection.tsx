'use client';

import { motion } from 'framer-motion';
import { Coral, Seaweed, Bubble, Pearl, Starfish } from './MarineSVGs';

// Gallery images - replace these with your actual event/team photos
// Place your images in /public/images/gallery/ and update the paths below
const GALLERY_IMAGES = [
    {
        src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
        alt: 'College Festival Event - Cultural Performance'
    },
    {
        src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=800&fit=crop',
        alt: 'Tech Competition - Students Coding'
    },
    {
        src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&h=800&fit=crop',
        alt: 'Team Celebration - Award Ceremony'
    },
    {
        src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&h=800&fit=crop',
        alt: 'Workshop Session - Learning Together'
    },
    {
        src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=800&fit=crop',
        alt: 'Stage Performance - Music Concert'
    },
    {
        src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop',
        alt: 'Festival Moments - Group Photo'
    },
    {
        src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=800&fit=crop',
        alt: 'Innovation Showcase - Project Exhibition'
    },
];

export default function GallerySection() {
    return (
        <section id="gallery" className="relative py-20 md:py-32 px-4 overflow-hidden bg-deep-ocean">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent opacity-30" />

            {/* Marine decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Top left coral */}
                <Coral className="absolute w-24 h-32 md:w-32 md:h-40 opacity-20 top-10 left-5 md:left-10" />

                {/* Top right seaweed */}
                <Seaweed className="absolute w-16 h-40 md:w-20 md:h-48 opacity-25 top-20 right-8 md:right-16" />

                {/* Bottom left seaweed */}
                <Seaweed className="absolute w-20 h-44 md:w-24 md:h-52 opacity-20 bottom-10 left-12 md:left-20" />

                {/* Bottom right coral */}
                <Coral className="absolute w-20 h-28 md:w-28 md:h-36 opacity-25 bottom-16 right-10 md:right-14" />

                {/* Floating bubbles */}
                <Bubble className="absolute w-8 h-8 opacity-30 top-1/4 left-1/4" />
                <Bubble className="absolute w-6 h-6 opacity-25 top-1/3 right-1/3" />
                <Bubble className="absolute w-10 h-10 opacity-20 bottom-1/3 left-1/3" />
                <Bubble className="absolute w-7 h-7 opacity-30 bottom-1/4 right-1/4" />

                {/* Pearl accents */}
                <Pearl className="absolute w-12 h-12 opacity-40 top-1/2 left-8 md:left-16" />
                <Pearl className="absolute w-10 h-10 opacity-35 top-2/3 right-12 md:right-20" />

                {/* Starfish decorations */}
                <Starfish className="absolute w-16 h-16 opacity-30 bottom-20 left-1/4" />
                <Starfish className="absolute w-14 h-14 opacity-25 top-1/3 right-1/4" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
                        Explore Memories
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                        Gallery of Atlantis
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
                        Dive into the magical moments captured beneath the waves of Pratishruti 2026
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {GALLERY_IMAGES.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group overflow-hidden rounded-2xl"
                            style={{
                                background: 'linear-gradient(135deg, rgba(0, 20, 40, 0.8) 0%, rgba(0, 40, 80, 0.6) 100%)',
                                boxShadow: '0 0 20px rgba(112, 200, 220, 0.2)',
                            }}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
