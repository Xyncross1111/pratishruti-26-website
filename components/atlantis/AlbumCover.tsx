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
            className="relative cursor-pointer select-none w-full max-w-[220px] md:max-w-[350px] lg:max-w-[400px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Album Cover Container */}
            <div className="relative w-full aspect-square mb-6">
                {/* Vinyl Disc - Behind the album cover */}
                <motion.div
                    className="absolute top-0 right-0 w-full aspect-square z-0"
                    animate={{
                        x: isActive ? '50%' : '0%',
                    }}
                    transition={{ type: 'spring', stiffness: 213, damping: 33, mass: 1 }}
                >
                    {/* Vinyl background */}
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black">
                        {/* Vinyl grooves effect */}
                        <div className="absolute inset-0 opacity-30">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute rounded-full border border-gray-700"
                                    style={{
                                        top: `${5 + i * 4.5}%`,
                                        left: `${5 + i * 4.5}%`,
                                        right: `${5 + i * 4.5}%`,
                                        bottom: `${5 + i * 4.5}%`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Center label with artist image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34%] aspect-square rounded-full overflow-hidden border-4 border-black/40 shadow-xl">
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
                    className="relative w-full h-full rounded-lg overflow-hidden z-10"
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
                </motion.div>
            </div>

            {/* Text Information */}
            <div className="text-center space-y-1">
                <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight">
                    {title}
                </h3>
                <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground/60">
                    <span>{type}</span>
                    <span>•</span>
                    <span>{year}</span>
                </div>
            </div>
        </motion.div>
    );
}
