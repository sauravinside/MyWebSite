import { useState, useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Use3DObjectProps {
  initialPosition?: [number, number, number];
  initialRotation?: [number, number, number];
  initialScale?: number;
  animate?: boolean;
  floatIntensity?: number;
  rotationSpeed?: number;
}

export function use3DObject({
  initialPosition = [0, 0, 0],
  initialRotation = [0, 0, 0],
  initialScale = 1,
  animate = true,
  floatIntensity = 0.5,
  rotationSpeed = 0.1
}: Use3DObjectProps = {}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [position, setPosition] = useState<[number, number, number]>(initialPosition);
  const [rotation, setRotation] = useState<[number, number, number]>(initialRotation);
  const [scale, setScale] = useState<number>(initialScale);
  
  useFrame((state) => {
    if (!animate || !meshRef.current) return;
    
    // Animate rotation
    meshRef.current.rotation.y += rotationSpeed * 0.01;
    
    // Animate floating effect
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time) * floatIntensity * 0.1;
  });
  
  return {
    meshRef,
    position,
    setPosition,
    rotation,
    setRotation,
    scale,
    setScale
  };
}

export default use3DObject;