'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface AlbumCoverProps {
    image: string;
    title: string;
    type?: string;
    year?: string;
    onClick?: () => void;
}

export default function AlbumCover({
    image,
    title,
    type = 'Single',
    year = '2024',
    onClick
}: AlbumCoverProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        // On mobile, first tap shows vinyl, second tap opens Spotify
        if (isTouched) {
            onClick?.();
        } else {
            setIsTouched(true);
            // Auto-hide after 3 seconds
            setTimeout(() => setIsTouched(false), 3000);
        }
    };

    const isActive = isHovered || isTouched;

    return (
        <motion.div
            className="group relative cursor-pointer select-none w-full max-w-72 md:max-w-90 lg:max-w-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="absolute -inset-3 rounded-4xl bg-accent/20 blur-2xl"
                animate={{
                    opacity: isActive ? 0.6 : 0.25,
                    scale: isActive ? 1.04 : 1,
                }}
                transition={{ type: 'spring', stiffness: 180, damping: 28 }}
            />

            <div className="relative w-full aspect-square mb-6 rounded-[1.75rem] border border-accent/25 bg-card/35 p-3 backdrop-blur-md">
                {/* Vinyl Disc - Behind the album cover */}
                <motion.div
                    className="absolute top-3 right-3 w-[calc(100%-1.5rem)] aspect-square z-0"
                    animate={{
                        x: isActive ? '50%' : '0%',
                        rotate: isActive ? 360 : 0,
                    }}
                    transition={{
                        x: { type: 'spring', stiffness: 213, damping: 33, mass: 1 },
                        rotate: isActive
                            ? { duration: 9, ease: 'linear', repeat: Infinity }
                            : { duration: 0.35 },
                    }}
                >
                    {/* Vinyl background */}
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-linear-to-br from-foreground/30 via-foreground/20 to-black">
                        <div className="absolute inset-[4%] rounded-full border border-foreground/10" />
                        {/* Vinyl grooves effect */}
                        <div className="absolute inset-0 opacity-35">
                            {[...Array(24)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute rounded-full border border-foreground/10"
                                    style={{
                                        top: `${4 + i * 3.9}%`,
                                        left: `${4 + i * 3.9}%`,
                                        right: `${4 + i * 3.9}%`,
                                        bottom: `${4 + i * 3.9}%`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Center label with artist image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[33%] aspect-square rounded-full overflow-hidden border-4 border-background/60 shadow-lg">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Album Cover - In front */}
                <motion.div
                    className="relative w-full h-full rounded-2xl overflow-hidden z-10 border border-foreground/10"
                    style={{
                        boxShadow: isActive
                            ? '0px 0.7px 0.7px -0.3px rgba(0, 0, 0, 0.07), 0px 1.9px 1.9px -0.6px rgba(0, 0, 0, 0.08), 0px 4.3px 4.3px -0.9px rgba(0, 0, 0, 0.09), 0px 9.4px 9.4px -1.2px rgba(0, 0, 0, 0.11), 0px 24px 24px -1.5px rgba(0, 0, 0, 0.17), 0 0 40px rgba(112, 200, 220, 0.4), 0 0 80px rgba(112, 200, 220, 0.2)'
                            : '0px 0.7px 0.7px -0.3px rgba(0, 0, 0, 0.07), 0px 1.9px 1.9px -0.6px rgba(0, 0, 0, 0.08), 0px 4.3px 4.3px -0.9px rgba(0, 0, 0, 0.09), 0px 9.4px 9.4px -1.2px rgba(0, 0, 0, 0.11), 0px 24px 24px -1.5px rgba(0, 0, 0, 0.17), 0 0 20px rgba(112, 200, 220, 0.15)',
                    }}
                    animate={{
                        rotate: isActive ? -3 : 0,
                        scale: isActive ? 1.03 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 213, damping: 33, mass: 1 }}
                >
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />

                    <motion.div
                        className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent"
                        animate={{ opacity: isActive ? 0.95 : 0.7 }}
                        transition={{ duration: 0.35 }}
                    />

                    <motion.div
                        className="absolute left-4 right-4 bottom-4 flex items-center justify-between rounded-full border border-accent/30 bg-black/45 px-4 py-2 backdrop-blur-sm"
                        animate={{ y: isActive ? 0 : 10, opacity: isActive ? 1 : 0.55 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className="text-[10px] md:text-xs font-semibold tracking-[0.16em] uppercase text-accent">
                            Tap To Play
                        </span>
                        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Text Information */}
            <div className="mx-auto w-[92%] rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm px-4 py-3 text-center">
                <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight leading-tight truncate">
                    {title}
                </h3>
                <div className="mt-1 flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground/85">
                    <span className="truncate max-w-34 md:max-w-44">{type}</span>
                    <span className="opacity-70">•</span>
                    <span>{year}</span>
                </div>
            </div>
        </motion.div>
    );
}
