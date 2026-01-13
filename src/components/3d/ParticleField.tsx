'use client';

// src/components/3d/ParticleField.tsx
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

// Particle component
// Optimized: Reduced default count from 2000 to 800 for better performance
function Particles({ count = 800 }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Generate random points in 3D space
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  // Cloud-themed colors
  const cloudColors = [
    [0.5, 0.8, 1.0], // Light blue
    [0.7, 0.9, 1.0], // Sky blue
    [0.9, 0.9, 1.0], // Nearly white
    [0.4, 0.7, 0.9], // Medium blue
    [0.3, 0.6, 0.9], // Deeper blue
  ];
  
  // Generate random positions and colors
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Generate in a sphere-like distribution
    const radius = 5 * Math.pow(Math.random(), 0.5);
    const theta = THREE.MathUtils.randFloatSpread(360);
    const phi = THREE.MathUtils.randFloatSpread(360);
    
    positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
    positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    positions[i3 + 2] = radius * Math.cos(theta);
    
    // Assign random color from the cloud palette
    const colorIndex = Math.floor(Math.random() * cloudColors.length);
    colors[i3] = cloudColors[colorIndex][0];
    colors[i3 + 1] = cloudColors[colorIndex][1];
    colors[i3 + 2] = cloudColors[colorIndex][2];
  }
  
  // Animation
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Subtle rotation
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    pointsRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.1;
  });
  
  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.12}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Main scene component
function Scene() {
  const { camera } = useThree();
  
  useEffect(() => {
    // Position camera for optimal view
    camera.position.setZ(10);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <Particles />
    </>
  );
}

// Main export
export default function ParticleField() {
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
