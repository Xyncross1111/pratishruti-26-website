'use client';

import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { PoseidonModel } from './PoseidonModel';
import * as THREE from 'three';
import { TextureLoader } from 'three';

interface SpiralGalleryProps {
    images?: string[];
}

const defaultImages = [
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1485550409059-9afb054cada4?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&h=1000&fit=crop',
];

// Smooth easing function - ease in-out sine (very smooth)
function easeInOutSine(t: number): number {
    return -(Math.cos(Math.PI * t) - 1) / 2;
}

// Animated camera that pans in on load
function AnimatedCamera({ isIntroComplete, isMobile }: { isIntroComplete: boolean; isMobile: boolean }) {
    const { camera } = useThree();
    const startZ = isMobile ? 58 : 50; // Start far away
    const endZ = isMobile ? 26 : 20;   // End position
    const startY = 10; // Start above
    const endY = 0;    // End at center
    const duration = 2.5; // Duration in seconds
    const elapsedRef = useRef(0);
    
    useFrame((_, delta) => {
        if (elapsedRef.current < duration) {
            elapsedRef.current += delta;
            
            // Clamp to 0-1 range
            const t = Math.min(elapsedRef.current / duration, 1);
            
            // Very smooth easing
            const eased = easeInOutSine(t);
            
            // Smoothly interpolate camera position using lerp
            const targetZ = startZ + (endZ - startZ) * eased;
            const targetY = startY + (endY - startY) * eased;
            
            // Use lerp for extra smoothness
            camera.position.z += (targetZ - camera.position.z) * 0.1;
            camera.position.y += (targetY - camera.position.y) * 0.1;
            camera.lookAt(0, 0, 0);
        } else {
            // Ensure final position is exact
            camera.position.z = endZ;
            camera.position.y = endY;
            camera.lookAt(0, 0, 0);
        }
    });
    
    return null;
}

// Single helix image - animates along vertical spiral path
function HelixImage({ 
    index, 
    total,
    imagePath,
    scrollProgress,
    isMobile,
}: { 
    index: number; 
    total: number;
    imagePath: string;
    scrollProgress: number;
    isMobile: boolean;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const visibleWindow = 2.8;
    
    // Load texture
    const texture = useLoader(TextureLoader, imagePath);
    
    // Each image gets a portion of the scroll
    // Offset by 1 so first image starts off-screen (below) at scroll=0
    const scrollSpeed = 0.8;
    const imageProgress = scrollProgress * (total + 1) * scrollSpeed - index - 1;
    
    // Clamp to useful range: larger window shows more images at once
    const clampedProgress = Math.max(-visibleWindow, Math.min(visibleWindow, imageProgress));
    
    // Vertical position: enters from below, exits above
    const y = clampedProgress * 2.25;
    
    // Spiral angle based on progress (one full rotation per image transition)
    const spiralAngle = clampedProgress * Math.PI * 1.5;
    
    // Radius - closer when at center (progress = 0)
    const baseRadius = isMobile ? 6 : 8;
    const radiusVariation = Math.abs(clampedProgress) * 4;
    const radius = baseRadius + radiusVariation;
    
    // Position on spiral
    const x = Math.sin(spiralAngle) * radius;
    const z = Math.cos(spiralAngle) * radius;
    
    // Opacity: fully visible at center, fades at edges
    const opacity = 1 - Math.abs(clampedProgress) * 0.7;
    
    // Scale: larger when centered
    const scale = 1 - Math.abs(clampedProgress) * 0.3;
    
    // Only render if within visible range
    const isVisible = imageProgress > -visibleWindow && imageProgress < visibleWindow;
    
    // Image size - smaller on mobile
    const width = isMobile ? 3.5 : 6;
    const height = isMobile ? 2.2 : 3.8;

    if (!isVisible) return null;

    return (
        <mesh
            ref={meshRef}
            position={[x, y, z]}
            rotation={[0, spiralAngle + Math.PI, 0]} // Face outward
            scale={[scale, scale, scale]}
        >
            <planeGeometry args={[width, height]} />
            <meshStandardMaterial 
                map={texture}
                side={THREE.DoubleSide}
                transparent={true}
                opacity={opacity}
            />
        </mesh>
    );
}

// Helix group - contains all images
function HelixGroup({ 
    images, 
    scrollProgress,
    isMobile,
}: { 
    images: string[]; 
    scrollProgress: number;
    isMobile: boolean;
}) {
    return (
        <group position={[0, 0, 0]}>
            {images.map((imagePath, index) => (
                <HelixImage
                    key={index}
                    index={index}
                    total={images.length}
                    imagePath={imagePath}
                    scrollProgress={scrollProgress}
                    isMobile={isMobile}
                />
            ))}
        </group>
    );
}

export function SpiralGallery({ images = defaultImages }: SpiralGalleryProps) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isIntroComplete, setIsIntroComplete] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mark intro as complete after animation duration
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsIntroComplete(true);
        }, 3000); // 3 seconds for pan-in animation
        return () => clearTimeout(timer);
    }, []);

    // Detect mobile screen
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full">
            {/* 3D Canvas */}
            <div className="fixed inset-0 w-full h-screen z-0">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 10, isMobile ? 58 : 50]} fov={isMobile ? 46 : 40} />
                    <AnimatedCamera isIntroComplete={isIntroComplete} isMobile={isMobile} />
                    <fog attach="fog" args={['#001428', 15, 60]} />

                    <ambientLight intensity={0.6} color="#70c8dc" />
                    <directionalLight position={[5, 10, 7]} intensity={1.2} color="#b4e0e8" />
                    <directionalLight position={[-6, 3, -5]} intensity={0.4} color="#5da9c0" />

                    {/* Model in center */}
                    <PoseidonModel scrollProgress={scrollProgress} />

                    {/* Helix images - proper 3D planes with depth */}
                    <Suspense fallback={null}>
                        <HelixGroup images={images} scrollProgress={scrollProgress} isMobile={isMobile} />
                    </Suspense>

                    <OrbitControls target={[0, 0, 0]} enablePan={false} enableZoom={false} enableRotate={false} />
                </Canvas>
            </div>

            {/* Scroll spacer */}
            <div className="relative pointer-events-none" style={{ height: '500vh' }} />

            {/* Background */}
            <div
                className="fixed inset-0 -z-10"
                style={{
                    background: 'linear-gradient(to bottom, #001428 0%, #002040 35%, #001a35 70%, #00101f 100%)',
                }}
            />
        </div>
    );
}