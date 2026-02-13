'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { PoseidonModel } from './PoseidonModel';
import { GalleryImage } from './GalleryImage';

interface SpiralGalleryProps {
    images?: string[];
}

const defaultImages = [
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=1000&fit=crop', // Underwater scene
    'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=1000&fit=crop', // Ocean
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=1000&fit=crop', // Underwater
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=1000&fit=crop', // Sea life
    'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&h=1000&fit=crop', // Ocean depths
    'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=1000&fit=crop&sat=-100', // Blue ocean
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=1000&fit=crop&sat=-50', // Underwater 2
    'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&h=1000&fit=crop', // Deep sea
    'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&h=1000&fit=crop&sat=-50', // Ocean 2
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=1000&fit=crop&sat=-50', // Marine
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=1000&fit=crop&sat=-50', // Underwater 3
    'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&h=1000&fit=crop&sat=-50', // Deep ocean
];

export function SpiralGallery({ images = defaultImages }: SpiralGalleryProps) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const panelImages = images.slice(0, 6);

    const panelLayout = useMemo(
        () => [
            { x: -5.8, y: 0.8, z: -1.4, ry: 0.2, rz: 0.03, scale: 1.22, drift: 1 },
            { x: 5.9, y: -0.2, z: -1.0, ry: -0.22, rz: -0.02, scale: 0.92, drift: -1 },
            { x: -3.9, y: -2.8, z: -2.8, ry: 0.5, rz: 0.04, scale: 0.82, drift: 1 },
            { x: 3.8, y: -3.0, z: -2.6, ry: -0.48, rz: -0.04, scale: 0.8, drift: -1 },
            { x: 0.8, y: -2.1, z: -3.5, ry: -0.1, rz: 0.03, scale: 0.72, drift: 1 },
            { x: -0.9, y: -1.8, z: -3.8, ry: 0.14, rz: -0.02, scale: 0.68, drift: -1 },
        ],
        []
    );

    // Track scroll progress
    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const scrollTop = window.scrollY;
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
                setScrollProgress(progress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Floating side panels (reference-style composition)
    const getImagePosition = (index: number, total: number): [number, number, number] => {
        const layout = panelLayout[index % panelLayout.length];
        const eased = 1 - Math.pow(1 - scrollProgress, 2);
        const verticalDrift = (eased - 0.5) * 2.8 * layout.drift;
        const depthDrift = (eased - 0.5) * 0.8;

        return [layout.x, layout.y + verticalDrift, layout.z + depthDrift];
    };

    // Match the editorial tilted panel look from the reference
    const getImageRotation = (index: number, total: number): [number, number, number] => {
        const layout = panelLayout[index % panelLayout.length];
        const eased = 1 - Math.pow(1 - scrollProgress, 2);
        const yawParallax = eased * 0.22 * layout.drift;
        return [0, layout.ry + yawParallax, layout.rz];
    };

    return (
        <div ref={containerRef} className="relative w-full">
            {/* 3D Canvas - Fixed position */}
            <div className="fixed inset-0 w-full h-screen">
                <Canvas shadows>
                    {/* Camera centered on model */}
                    <PerspectiveCamera makeDefault position={[0, 1.1, 11.6]} fov={40} />

                    {/* Atmospheric fog like the reference */}
                    <fog attach="fog" args={['#5d7a63', 7, 24]} />

                    {/* Soft cinematic lighting */}
                    <ambientLight intensity={0.48} color="#c8d6c8" />
                    <directionalLight position={[4, 8, 6]} intensity={1.15} color="#edf3ef" />
                    <directionalLight position={[-5, 2, -4]} intensity={0.35} color="#95ab98" />
                    <spotLight
                        position={[0, 10, 6]}
                        angle={0.55}
                        penumbra={0.4}
                        intensity={0.8}
                        color="#e7f0eb"
                    />

                    {/* Poseidon Model - Medium parallax */}
                    <PoseidonModel scrollProgress={scrollProgress} />

                    {/* Floating monochrome side panels */}
                    {panelImages.map((imagePath, index) => (
                        <GalleryImage
                            key={index}
                            imagePath={imagePath}
                            position={getImagePosition(index, panelImages.length)}
                            rotation={getImageRotation(index, panelImages.length)}
                            index={index}
                            scale={panelLayout[index % panelLayout.length].scale}
                        />
                    ))}

                    {/* Keep model centered in viewport while still allowing orbit inspection */}
                    <OrbitControls target={[0, 0, 0]} enablePan={false} enableZoom={false} enableRotate={false} />
                </Canvas>
            </div>

            {/* Scroll spacer - creates scrollable height */}
            <div
                className="relative pointer-events-none"
                style={{ height: `${panelImages.length * 130}vh` }}
            />

            {/* Background gradient - Slowest parallax */}
            <div
                className="fixed inset-0 -z-10 transition-opacity duration-1000"
                style={{
                    background: `linear-gradient(
            to bottom,
                        #5d7a63 0%,
                        #56725c ${scrollProgress * 35}%,
                        #4a654f ${scrollProgress * 70}%,
                        #3b5341 100%
          )`,
                    opacity: 0.95,
                }}
            />
        </div>
    );
}
