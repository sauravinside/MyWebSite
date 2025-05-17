'use client';

// src/components/3d/CloudScene.tsx
import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// Cloud model component
function CloudModel({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Animation
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Subtle floating animation
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
  });
  
  // Use a simple geometric shape as a placeholder for the actual cloud model
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position as [number, number, number]}
        rotation={rotation as [number, number, number]}
        scale={scale}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.3} 
          metalness={0.2} 
          emissive="#6272a4"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

// Server rack component
function ServerRack() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Subtle floating animation
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });
  
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={meshRef} position={[0, -1, 0]} scale={0.5}>
        {/* Main server rack */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3, 4, 1]} />
          <meshStandardMaterial color="#282a36" metalness={0.7} roughness={0.2} />
        </mesh>
        
        {/* Server units */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[0, -1.5 + i * 0.7, 0.51]}>
            <boxGeometry args={[2.8, 0.6, 0.05]} />
            <meshStandardMaterial color="#44475a" metalness={0.5} roughness={0.1} />
            
            {/* Server lights */}
            <mesh position={[1.2, 0, 0.1]} scale={[0.1, 0.1, 0.1]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? "#50fa7b" : "#ff79c6"} 
                emissive={i % 2 === 0 ? "#50fa7b" : "#ff79c6"} 
                emissiveIntensity={1} 
              />
            </mesh>
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// Connection lines between clouds
function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null);
  
  // Create lines between cloud positions
  const linePositions = [
    { start: [-2, 0, 0], end: [0, 0, 2] },
    { start: [0, 0, 2], end: [2, 0, 0] },
    { start: [2, 0, 0], end: [0, 0, -2] },
    { start: [0, 0, -2], end: [-2, 0, 0] },
  ];
  
  useFrame(({ clock }) => {
    if (!linesRef.current) return;
    
    // Make lines pulsate
    const children = linesRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const line = children[i] as THREE.Mesh;
      const material = line.material as THREE.MeshStandardMaterial;
      material.opacity = THREE.MathUtils.lerp(
        0.3,
        0.7,
        (Math.sin(clock.getElapsedTime() * 2 + i) + 1) / 2
      );
    }
  });
  
  return (
    <group ref={linesRef}>
      {linePositions.map((line, index) => (
        <mesh key={index}>
          <mesh position={new THREE.Vector3(
            (line.start[0] + line.end[0]) / 2,
            (line.start[1] + line.end[1]) / 2,
            (line.start[2] + line.end[2]) / 2
          )}>
            {/* Calculate cylinder rotation to point from start to end */}
            <cylinderGeometry
              args={[
                0.02, // radiusTop
                0.02, // radiusBottom
                Math.sqrt(
                  Math.pow(line.end[0] - line.start[0], 2) +
                  Math.pow(line.end[1] - line.start[1], 2) +
                  Math.pow(line.end[2] - line.start[2], 2)
                ), // height
                16, // radialSegments
              ]}
              rotation={[
                Math.PI / 2,
                Math.atan2(
                  line.end[2] - line.start[2],
                  line.end[0] - line.start[0]
                ),
                Math.atan2(
                  line.end[1] - line.start[1],
                  Math.sqrt(
                    Math.pow(line.end[0] - line.start[0], 2) +
                    Math.pow(line.end[2] - line.start[2], 2)
                  )
                ),
              ]}
            />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#8be9fd" : "#bd93f9"}
              transparent
              opacity={0.5}
              emissive={index % 2 === 0 ? "#8be9fd" : "#bd93f9"}
              emissiveIntensity={0.5}
            />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}

// Scene component
function Scene() {
  const { camera } = useThree();
  
  useEffect(() => {
    // Set initial camera position
    camera.position.set(0, 1, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Central server */}
      <ServerRack />
      
      {/* Cloud instances around the server */}
      <CloudModel position={[-2, 0, 0]} scale={0.7} />
      <CloudModel position={[2, 0, 0]} scale={0.7} />
      <CloudModel position={[0, 0, 2]} scale={0.7} />
      <CloudModel position={[0, 0, -2]} scale={0.7} />
      
      {/* Connecting lines */}
      <ConnectionLines />
      
      {/* Environment lighting */}
      <Environment preset="night" />
    </>
  );
}

// Main export
export default function CloudScene() {
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}