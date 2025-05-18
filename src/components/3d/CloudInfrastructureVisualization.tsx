import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Html, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// CloudPlatform component represents a cloud provider with label
const CloudPlatform = ({ 
  name, 
  position, 
  color, 
  selected = false,
  onClick,
  children
}) => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Animation
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Floating animation
    groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    
    // Rotation animation
    if (selected) {
      groupRef.current.rotation.y += 0.01;
    }
  });
  
  // Event handlers
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);
  const handleClick = () => onClick && onClick(name);
  
  return (
    <Float 
      speed={1} 
      rotationIntensity={0.2} 
      floatIntensity={0.5}
      position={position}
    >
      <group 
        ref={groupRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Platform sphere */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={0.2} 
            wireframe={false}
            emissive={color}
            emissiveIntensity={selected ? 0.5 : 0.1}
          />
        </mesh>
        
        {/* Wire sphere */}
        <mesh>
          <sphereGeometry args={[1.05, 16, 16]} />
          <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={0.3} 
            wireframe={true}
          />
        </mesh>
        
        {/* Label */}
        <Text
          position={[0, 1.3, 0]}
          fontSize={0.3}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#282a36"
        >
          {name}
        </Text>
        
        {/* Hover info */}
        {hovered && (
          <Html position={[0, 0, 0]} center>
            <div className="bg-terminal-black/90 text-white p-2 rounded-md shadow-md text-xs min-w-[120px] text-center pointer-events-none">
              {name}
              <div className="mt-1 text-[10px] text-terminal-gray">Click to select</div>
            </div>
          </Html>
        )}
        
        {/* Child components */}
        {children}
      </group>
    </Float>
  );
};

// Connection line between two points
const ConnectionLine = ({ start, end, color, thickness = 0.03, selected = false, animated = false }) => {
  const lineRef = useRef();
  
  // Calculate vector between points
  const direction = new THREE.Vector3().subVectors(
    new THREE.Vector3(...end),
    new THREE.Vector3(...start)
  );
  
  // Calculate length
  const length = direction.length();
  
  // Calculate position (midpoint)
  const position = new THREE.Vector3(
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2
  );
  
  // Calculate rotation to point from start to end
  const axis = new THREE.Vector3(0, 1, 0);
  direction.normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, direction);
  const euler = new THREE.Euler().setFromQuaternion(quaternion);
  
  // Animation
  useFrame((state) => {
    if (!lineRef.current || !animated) return;
    
    // Pulse animation for selected lines
    if (selected) {
      const material = lineRef.current.material;
      material.opacity = 0.4 + Math.sin(state.clock.getElapsedTime() * 2) * 0.3;
      material.emissiveIntensity = 0.5 + Math.sin(state.clock.getElapsedTime() * 2) * 0.3;
    }
  });
  
  return (
    <mesh 
      ref={lineRef}
      position={position}
      rotation={[Math.PI / 2 + euler.x, euler.y, euler.z]}
    >
      <cylinderGeometry args={[thickness, thickness, length, 8]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={selected ? 0.8 : 0.3}
        emissive={color}
        emissiveIntensity={selected ? 0.5 : 0.2}
      />
    </mesh>
  );
};

// Server component with blinking lights
const Server = ({ position, scale = 1, selected = false, onClick }) => {
  const serverRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(0);
  
  // Animation
  useFrame((state) => {
    if (!serverRef.current) return;
    
    // Floating animation
    serverRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
    
    // Blinking lights
    if (selected) {
      // Faster blinking when selected
      setLightIntensity(0.5 + Math.sin(state.clock.getElapsedTime() * 5) * 0.5);
    } else {
      // Slower, more subtle blinking when not selected
      setLightIntensity(0.3 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2);
    }
    
    // Rotation when selected
    if (selected) {
      serverRef.current.rotation.y += 0.01;
    }
  });
  
  // Event handlers
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);
  const handleClick = () => onClick && onClick('server');
  
  return (
    <Float 
      speed={1} 
      rotationIntensity={0.1} 
      floatIntensity={0.2}
      position={position}
    >
      <group 
        ref={serverRef}
        scale={scale}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Server rack main body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 2, 0.8]} />
          <meshStandardMaterial 
            color="#282a36" 
            metalness={0.7} 
            roughness={0.2}
            emissive="#282a36"
            emissiveIntensity={selected ? 0.2 : 0}
          />
        </mesh>
        
        {/* Server units */}
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={i} position={[0, -0.75 + i * 0.4, 0.41]}>
            <boxGeometry args={[1.4, 0.3, 0.05]} />
            <meshStandardMaterial 
              color="#44475a" 
              metalness={0.5} 
              roughness={0.1}
            />
            
            {/* Server lights */}
            <pointLight
              position={[0.5, 0, 0.1]}
              color={i % 2 === 0 ? "#50fa7b" : "#ff79c6"}
              intensity={lightIntensity}
              distance={0.8}
            />
            <mesh position={[0.5, 0, 0.1]} scale={0.05}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#50fa7b" : "#ff79c6"}
                emissive={i % 2 === 0 ? "#50fa7b" : "#ff79c6"}
                emissiveIntensity={lightIntensity}
              />
            </mesh>
          </mesh>
        ))}
        
        {/* Info label */}
        <Text
          position={[0, 1.2, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#282a36"
        >
          Central Server
        </Text>
        
        {/* Hover info */}
        {hovered && (
          <Html position={[0, 0, 0]} center>
            <div className="bg-terminal-black/90 text-white p-2 rounded-md shadow-md text-xs min-w-[120px] text-center pointer-events-none">
              Central Server
              <div className="mt-1 text-[10px] text-terminal-gray">Infrastructure Hub</div>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
};

// Particle effect for the cloud platforms
const CloudParticles = ({ position, color, count = 50, radius = 1.2 }) => {
  const points = useRef();
  
  // Generate random points
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const r = radius * Math.random();
      const x = position[0] + r * Math.cos(angle);
      const y = position[1] + (Math.random() - 0.5) * radius;
      const z = position[2] + r * Math.sin(angle);
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
    }
    
    return positions;
  }, [count, radius, position]);
  
  // Animation
  useFrame((state) => {
    if (!points.current) return;
    
    points.current.rotation.y += 0.001;
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Main scene
const CloudInfrastructureScene = () => {
  const { camera } = useThree();
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Setup camera on mount
  useEffect(() => {
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Cloud platform positions
  const serverPos = [0, 0, 0];
  const awsPos = [-4, 0, -2];
  const gcpPos = [4, 0, -2];
  const azurePos = [0, 0, -5];
  const ociPos = [0, -4, -3];
  
  // Handle item selection
  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };
  
  // Info panel content based on selection
  const getInfoContent = () => {
    switch (selectedItem) {
      case 'AWS':
        return (
          <div className="bg-terminal-black/90 text-white p-3 rounded-md shadow-md text-sm w-64">
            <div className="text-aws font-bold text-lg border-b border-aws/30 pb-1 mb-2">AWS</div>
            <p className="mb-2">Amazon Web Services cloud platform with services for compute, storage, and more.</p>
            <div className="grid grid-cols-2 gap-1 text-xs mt-3">
              <div className="bg-terminal-black/50 p-1 rounded">EC2</div>
              <div className="bg-terminal-black/50 p-1 rounded">S3</div>
              <div className="bg-terminal-black/50 p-1 rounded">RDS</div>
              <div className="bg-terminal-black/50 p-1 rounded">Lambda</div>
            </div>
          </div>
        );
      case 'GCP':
        return (
          <div className="bg-terminal-black/90 text-white p-3 rounded-md shadow-md text-sm w-64">
            <div className="text-gcp font-bold text-lg border-b border-gcp/30 pb-1 mb-2">Google Cloud</div>
            <p className="mb-2">Google Cloud Platform with Compute Engine, Cloud Storage, and specialized ML services.</p>
            <div className="grid grid-cols-2 gap-1 text-xs mt-3">
              <div className="bg-terminal-black/50 p-1 rounded">GCE</div>
              <div className="bg-terminal-black/50 p-1 rounded">GKE</div>
              <div className="bg-terminal-black/50 p-1 rounded">BigQuery</div>
              <div className="bg-terminal-black/50 p-1 rounded">Cloud Run</div>
            </div>
          </div>
        );
      case 'Azure':
        return (
          <div className="bg-terminal-black/90 text-white p-3 rounded-md shadow-md text-sm w-64">
            <div className="text-azure font-bold text-lg border-b border-azure/30 pb-1 mb-2">Azure</div>
            <p className="mb-2">Microsoft's cloud platform with strong integration with Office 365 and Windows services.</p>
            <div className="grid grid-cols-2 gap-1 text-xs mt-3">
              <div className="bg-terminal-black/50 p-1 rounded">Virtual Machines</div>
              <div className="bg-terminal-black/50 p-1 rounded">Blob Storage</div>
              <div className="bg-terminal-black/50 p-1 rounded">AKS</div>
              <div className="bg-terminal-black/50 p-1 rounded">Functions</div>
            </div>
          </div>
        );
      case 'OCI':
        return (
          <div className="bg-terminal-black/90 text-white p-3 rounded-md shadow-md text-sm w-64">
            <div className="text-terminal-red font-bold text-lg border-b border-terminal-red/30 pb-1 mb-2">Oracle Cloud</div>
            <p className="mb-2">Oracle Cloud Infrastructure providing compute, storage, and database services.</p>
            <div className="grid grid-cols-2 gap-1 text-xs mt-3">
              <div className="bg-terminal-black/50 p-1 rounded">Compute</div>
              <div className="bg-terminal-black/50 p-1 rounded">Storage</div>
              <div className="bg-terminal-black/50 p-1 rounded">Autonomous DB</div>
              <div className="bg-terminal-black/50 p-1 rounded">Functions</div>
            </div>
          </div>
        );
      case 'server':
        return (
          <div className="bg-terminal-black/90 text-white p-3 rounded-md shadow-md text-sm w-64">
            <div className="text-terminal-purple font-bold text-lg border-b border-terminal-purple/30 pb-1 mb-2">Central Server</div>
            <p className="mb-2">Core infrastructure hub that manages connections to multiple cloud platforms.</p>
            <div className="grid grid-cols-2 gap-1 text-xs mt-3">
              <div className="bg-terminal-black/50 p-1 rounded">Load Balancer</div>
              <div className="bg-terminal-black/50 p-1 rounded">API Gateway</div>
              <div className="bg-terminal-black/50 p-1 rounded">Monitoring</div>
              <div className="bg-terminal-black/50 p-1 rounded">IAM</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.4} />
      
      {/* Point lights */}
      <pointLight position={[10, 10, 10]} intensity={0.6} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} />
      
      {/* Central Server */}
      <Server 
        position={serverPos} 
        scale={1} 
        selected={selectedItem === 'server'}
        onClick={handleItemClick}
      />
      
      {/* Cloud Platforms */}
      <CloudPlatform 
        name="AWS" 
        position={awsPos} 
        color="#FF9900" 
        selected={selectedItem === 'AWS'}
        onClick={handleItemClick}
      >
        <CloudParticles position={awsPos} color="#FF9900" count={30} />
      </CloudPlatform>
      
      <CloudPlatform 
        name="GCP" 
        position={gcpPos} 
        color="#4285F4" 
        selected={selectedItem === 'GCP'}
        onClick={handleItemClick}
      >
        <CloudParticles position={gcpPos} color="#4285F4" count={30} />
      </CloudPlatform>
      
      <CloudPlatform 
        name="Azure" 
        position={azurePos} 
        color="#0078D4" 
        selected={selectedItem === 'Azure'}
        onClick={handleItemClick}
      >
        <CloudParticles position={azurePos} color="#0078D4" count={30} />
      </CloudPlatform>
      
      <CloudPlatform 
        name="OCI" 
        position={ociPos} 
        color="#F80000" 
        selected={selectedItem === 'OCI'}
        onClick={handleItemClick}
      >
        <CloudParticles position={ociPos} color="#F80000" count={30} />
      </CloudPlatform>
      
      {/* Connection Lines */}
      <ConnectionLine 
        start={serverPos} 
        end={awsPos} 
        color="#FF9900" 
        selected={selectedItem === 'server' || selectedItem === 'AWS'}
        animated={true}
      />
      <ConnectionLine 
        start={serverPos} 
        end={gcpPos} 
        color="#4285F4" 
        selected={selectedItem === 'server' || selectedItem === 'GCP'}
        animated={true}
      />
      <ConnectionLine 
        start={serverPos} 
        end={azurePos} 
        color="#0078D4" 
        selected={selectedItem === 'server' || selectedItem === 'Azure'}
        animated={true}
      />
      <ConnectionLine 
        start={serverPos} 
        end={ociPos} 
        color="#F80000" 
        selected={selectedItem === 'server' || selectedItem === 'OCI'}
        animated={true}
      />
      
      {/* Info panel for selected item */}
      {selectedItem && (
        <Html position={[0, 6, 0]} center>
          {getInfoContent()}
        </Html>
      )}
      
      {/* Environment for better lighting */}
      <Environment preset="city" />
    </>
  );
};

// Main exported component with Canvas wrapper
const CloudInfrastructureVisualization = () => {
  const [helpVisible, setHelpVisible] = useState(true);
  
  // Hide help message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHelpVisible(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full h-full min-h-[500px] relative">
      {/* Help overlay */}
      {helpVisible && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-terminal-black/80 text-white py-2 px-4 rounded-md shadow-lg text-sm">
          Click and drag to rotate • Scroll to zoom • Click on elements to select
        </div>
      )}
      
      {/* Main Canvas */}
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
        <CloudInfrastructureScene />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={15}
        />
      </Canvas>
      
      {/* Caption */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-xs text-white/70">
        Multi-cloud infrastructure visualization • Click on elements to view details
      </div>
    </div>
  );
};

export default CloudInfrastructureVisualization;