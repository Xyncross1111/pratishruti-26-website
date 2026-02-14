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

            // Log hierarchy to see what's inside
            console.log('Model hierarchy:', scene);
            let meshCount = 0;
            scene.traverse((child: any) => {
                if (child.isMesh) {
                    meshCount++;
                    console.log(`Mesh found: ${child.name}`, {
                        geometry: child.geometry,
                        material: child.material,
                        scale: child.scale,
                        position: child.position,
                        visible: child.visible
                    });
                }
            });
            console.log(`Total meshes found: ${meshCount}`);

            // Center all geometry so the model rotates around its own center
            scene.traverse((child: any) => {
                if (child.isMesh && child.geometry) {
                    child.geometry.center();
                }
            });
            scene.position.set(0, 0, 0);
            console.log('Model geometry centered at origin');

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

                            // Ensure it's not completely black
                            if (mat.color && mat.color.r < 0.1 && mat.color.g < 0.1 && mat.color.b < 0.1) {
                                mat.color.setHex(0x4a9fd8); // Ocean blue
                            }

                            // Set metalness and roughness for better visibility
                            if (mat.metalness !== undefined) mat.metalness = 0.5;
                            if (mat.roughness !== undefined) mat.roughness = 0.5;
                            
                            // Enable double-sided rendering
                            mat.side = THREE.DoubleSide;
                        });
                    }
                }
            });
        }
    }, [scene, error]);

    // Animate based on scroll progress - full 360° rotation
    useFrame(() => {
        if (modelRef.current) {
            // Full rotation - model completes 360° and returns to center
            modelRef.current.rotation.y = scrollProgress * Math.PI * 2;
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
            {/* Model geometry is now centered, so rotation happens around its center */}
            <primitive object={scene} scale={0.1} rotation={[-Math.PI / 2, 0, 0]} />
        </group>
    );
}

// Preload the model
useGLTF.preload('/models/posideon.glb');
