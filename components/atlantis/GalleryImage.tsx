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
    scale?: number;
}

export function GalleryImage({ imagePath, position, rotation, index, scale = 1 }: GalleryImageProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    // Subtle floating animation
    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + index) * 0.07;

            // Scale on hover
            const targetScale = hovered ? scale * 1.03 : scale;
            meshRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                0.1
            );

            // Subtle sway
            meshRef.current.rotation.z = rotation[2] + Math.sin(time * 0.2 + index) * 0.02;
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
                color={hovered ? '#edf1ee' : '#dae2dc'}
                emissive={hovered ? '#8fa193' : '#000000'}
                emissiveIntensity={hovered ? 0.08 : 0}
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
                        border: hovered ? '1px solid rgba(245, 250, 246, 0.45)' : '1px solid rgba(210, 222, 214, 0.16)',
                        boxShadow: hovered
                            ? '0 14px 30px rgba(0, 0, 0, 0.35)'
                            : '0 8px 22px rgba(0, 0, 0, 0.22)',
                        filter: 'grayscale(1) contrast(0.8) brightness(0.78)',
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
