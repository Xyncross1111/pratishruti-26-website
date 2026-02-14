'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface GalleryImageProps {
    imagePath: string;
    position: [number, number, number];
    rotation: [number, number, number];
    index: number;
}

export function GalleryImage({ imagePath, position, rotation, index }: GalleryImageProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    // Subtle floating animation
    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + index) * 0.07;

            // Scale on hover
            const targetScale = hovered ? 1.05 : 1;
            meshRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                0.1
            );

            // Subtle sway
            meshRef.current.rotation.z = Math.sin(time * 0.25 + index) * 0.03;
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={rotation}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <planeGeometry args={[3.2, 2.25]} />
            <meshStandardMaterial
                color={hovered ? '#f4f6f4' : '#dfe6e1'}
                emissive={hovered ? '#9aac9f' : '#000000'}
                emissiveIntensity={hovered ? 0.12 : 0}
                toneMapped={false}
                roughness={0.95}
            />

            {/* Image overlay using HTML */}
            <Html
                transform
                distanceFactor={1.5}
                position={[0, 0, 0.01]}
                style={{
                    width: '320px',
                    height: '225px',
                    pointerEvents: 'none',
                }}
            >
                <div
                    className="w-full h-full overflow-hidden transition-all duration-300"
                    style={{
                        border: hovered ? '1px solid rgba(245, 250, 246, 0.5)' : '1px solid rgba(210, 222, 214, 0.2)',
                        boxShadow: hovered
                            ? '0 16px 35px rgba(0, 0, 0, 0.35)'
                            : '0 8px 24px rgba(0, 0, 0, 0.2)',
                        filter: 'grayscale(1) contrast(0.9) brightness(0.8)',
                    }}
                >
                    <img
                        src={imagePath}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Html>
        </mesh>
    );
}
