'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface PoseidonModelProps {
    scrollProgress: number;
}

export function PoseidonModel({ scrollProgress }: PoseidonModelProps) {
    const modelRef = useRef<THREE.Group>(null);

    // Load the model with error handling - trying non-compressed version
    const { scene, error } = useGLTF('/models/posideon.glb') as any;

    useEffect(() => {
        if (error) {
            console.error('Error loading Poseidon model:', error);
        }
        if (scene) {
            console.log('Poseidon model loaded successfully!', scene);

            // Calculate bounding box to see actual model size
            const box = new THREE.Box3().setFromObject(scene);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            console.log('--- MODEL DEBUG INFO ---');
            console.log('Model size:', size);
            console.log('Model center:', center);

            // Keep a lightweight mesh count debug
            let meshCount = 0;
            scene.traverse((child: any) => {
                if (child.isMesh) {
                    meshCount++;
                }
            });
            console.log(`Total meshes found: ${meshCount}`);

            // Center geometry at origin so the model stays perfectly centered in viewport
            scene.position.set(-center.x, -center.y, -center.z);
            console.log('Model centered! New position:', scene.position);

            // Ensure materials are visible
            scene.traverse((child: any) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;

                    // Force materials to be visible
                    if (child.material) {
                        const materials = Array.isArray(child.material) ? child.material : [child.material];

                        materials.forEach((mat: any) => {
                            mat.needsUpdate = true;
                            mat.transparent = false;
                            mat.opacity = 1;
                            mat.visible = true;

                            // Statue-like white material look
                            if (mat.color) {
                                mat.color.setHex(0xe7ece9);
                            }

                            // Marble/plaster finish
                            if (mat.metalness !== undefined) mat.metalness = 0.05;
                            if (mat.roughness !== undefined) mat.roughness = 0.55;
                            
                            // Enable double-sided rendering
                            mat.side = THREE.DoubleSide;
                        });
                    }
                }
            });
        }
    }, [scene, error]);

    // Animate based on scroll progress - only rotation, position stays fixed
    useFrame(() => {
        if (modelRef.current) {
            // Smooth eased parallax rotation (clockwise)
            const eased = 1 - Math.pow(1 - scrollProgress, 2);
            modelRef.current.rotation.y = eased * Math.PI * 2.25;
        }
    });

    if (error) {
        console.error('Failed to load model');
        return null;
    }

    if (!scene) {
        console.log('Model still loading...');
        return null;
    }

    return (
        <group ref={modelRef} position={[0, 0, 0]}>
            {/* Keep model centered, scaled, and upright (vertical) */}
            <primitive object={scene} scale={0.027} position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        </group>
    );
}

// Preload the model
useGLTF.preload('/models/posideon.glb');
