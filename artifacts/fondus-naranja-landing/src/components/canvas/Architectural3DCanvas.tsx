import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Geometría flotante de vidrio esmerilado con física y reflejos
function FrostedGeometry({
  geometry,
  position,
  scale = 1,
  rotationSpeed = 0.4,
  floatIntensity = 1.5,
}: {
  geometry: 'torus' | 'sphere' | 'box' | 'octahedron';
  position: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
  floatIntensity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25 * rotationSpeed;
      meshRef.current.rotation.y += delta * 0.35 * rotationSpeed;
    }
  });

  return (
    <Float
      speed={1.4}
      rotationIntensity={floatIntensity}
      floatIntensity={floatIntensity}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
        {geometry === 'torus' && <torusGeometry args={[1.2, 0.4, 32, 64]} />}
        {geometry === 'sphere' && <sphereGeometry args={[1, 48, 48]} />}
        {geometry === 'box' && <boxGeometry args={[1.3, 1.3, 1.3]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1.2, 0]} />}

        <meshPhysicalMaterial
          roughness={0.18}
          transmission={0.92}
          thickness={1.5}
          ior={1.45}
          reflectivity={0.65}
          clearcoat={0.7}
          clearcoatRoughness={0.1}
          color="#e8f0fe"
          attenuationColor="#ff8533"
          attenuationDistance={2.5}
          transparent
          opacity={0.95}
        />
      </mesh>
    </Float>
  );
}

// Rig de cámara con efecto Parallax suave siguiendo el mouse
function CameraRig({ mouse }: { mouse: { x: number; y: number } }) {
  useFrame((state) => {
    const targetX = (mouse.x * 0.6);
    const targetY = (mouse.y * 0.4);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function Architectural3DCanvas() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return null;
  }

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-80"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <CameraRig mouse={mousePos} />

        <ambientLight intensity={0.65} color="#18263e" />
        
        {/* Luz naranja vibrante Naranja X */}
        <pointLight position={[5, 4, 3]} color="#ff5a00" intensity={4.5} distance={15} />
        
        {/* Luz celeste/menta fría Fondus */}
        <pointLight position={[-5, -3, 2]} color="#83bea3" intensity={3.8} distance={15} />
        
        {/* Luz de acento cyan de profundidad */}
        <pointLight position={[0, -4, -2]} color="#38bdf8" intensity={2.0} distance={12} />
        
        {/* Luz direccional especular */}
        <directionalLight position={[2, 6, 4]} intensity={1.2} color="#ffffff" />

        {/* Geometrías de cristal esmerilado */}
        <FrostedGeometry
          geometry="torus"
          position={[1.8, 0.4, -0.5]}
          scale={0.95}
          rotationSpeed={0.5}
          floatIntensity={1.2}
        />

        <FrostedGeometry
          geometry="sphere"
          position={[-2.4, 1.2, -1.2]}
          scale={0.8}
          rotationSpeed={0.3}
          floatIntensity={1.6}
        />

        <FrostedGeometry
          geometry="octahedron"
          position={[-1.6, -1.8, -0.8]}
          scale={0.7}
          rotationSpeed={0.6}
          floatIntensity={1.4}
        />

        <FrostedGeometry
          geometry="box"
          position={[2.8, -1.6, -2]}
          scale={0.65}
          rotationSpeed={0.4}
          floatIntensity={1.1}
        />
      </Canvas>
    </div>
  );
}
export default Architectural3DCanvas;
